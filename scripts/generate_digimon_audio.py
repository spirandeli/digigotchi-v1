from __future__ import annotations
from pathlib import Path
import math
import subprocess
import tempfile
import wave
import numpy as np

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'public'/'audio'/'digimon'
SR=22050
ACTIONS=['idle','feed','play','sleep','wake','clean','heal','attack','evolve']

PROFILES={
'agumon':('dino',145),'geogreymon':('dino',103),'wargreymon':('dino',82),
'etemon':('primate',190),'metaletemon':('metal-primate',132),
'gabumon':('wolf',205),'garurumon':('wolf',126),'weregarurumon':('wolf',108),
'veemon':('dragon',220),'flamedramon':('dragon',155),'xvmon':('dragon',125),
}

DURATION={'idle':0.42,'feed':0.48,'play':0.55,'sleep':0.82,'wake':0.52,'clean':0.48,'heal':0.62,'attack':0.78,'evolve':1.15}


def env(n:int, attack=.06, release=.18):
    e=np.ones(n,dtype=np.float32)
    a=max(1,int(n*attack)); r=max(1,int(n*release))
    e[:a]=np.linspace(0,1,a,dtype=np.float32)
    e[-r:]=np.linspace(1,0,r,dtype=np.float32)
    return e


def oscillator(freq, t, phase=0):
    return np.sin(2*np.pi*freq*t+phase)


def glide(f0,f1,t):
    # Integrate linear instantaneous frequency.
    dur=max(1e-6,float(t[-1]+1/SR))
    k=(f1-f0)/dur
    phase=2*np.pi*(f0*t+0.5*k*t*t)
    return np.sin(phase)


def make_sound(species:str, action:str):
    kind,base=PROFILES[species]
    dur=DURATION[action]
    n=int(SR*dur); t=np.arange(n,dtype=np.float32)/SR
    rng=np.random.default_rng(abs(hash((species,action,'digigotchi')))%(2**32))
    noise=rng.normal(0,1,n).astype(np.float32)

    pitch_mult={
        'idle':1.0,'feed':1.08,'play':1.25,'sleep':0.66,'wake':1.35,
        'clean':1.18,'heal':1.42,'attack':0.86,'evolve':0.72,
    }[action]
    f=base*pitch_mult

    if kind in {'dino','dragon'}:
        sig=0.52*oscillator(f,t)+0.25*oscillator(f*0.5,t)+0.14*oscillator(f*1.5,t)
        sig += 0.16*noise*np.sin(np.pi*np.clip(t/dur,0,1))
        if action in {'attack','evolve'}:
            sig += 0.42*glide(f*1.25,f*0.62,t)+0.12*oscillator(31,t)*noise
        elif action in {'play','wake','heal'}:
            sig += 0.28*glide(f*0.85,f*1.45,t)
        elif action=='sleep':
            sig=0.5*oscillator(f*0.48,t)*(0.55+0.45*np.sin(2*np.pi*3.2*t)**2)+0.10*noise
    elif kind=='wolf':
        if action in {'attack','evolve'}:
            sig=0.60*glide(f*0.75,f*1.45,t)+0.25*oscillator(f*0.5,t)+0.12*noise
        elif action=='sleep':
            sig=0.43*oscillator(f*0.35,t)*(0.55+0.45*np.sin(2*np.pi*2.5*t)**2)+0.09*noise
        else:
            sig=0.50*glide(f*0.92,f*1.2,t)+0.20*oscillator(f*1.9,t)+0.10*noise
    else: # primate / metallic primate
        pulse=(np.sin(2*np.pi*(4.5 if action!='sleep' else 2.1)*t)>-0.15).astype(np.float32)
        sig=(0.43*oscillator(f,t)+0.22*oscillator(f*2.05,t))*pulse + 0.10*noise
        if action in {'play','wake','heal'}:
            sig += 0.28*glide(f*0.8,f*1.55,t)
        if action in {'attack','evolve'}:
            sig += 0.31*oscillator(f*0.55,t)+0.18*noise*np.sin(np.pi*t/dur)
        if kind=='metal-primate':
            sig += 0.16*oscillator(f*3.2,t)*oscillator(27,t)

    # Action signatures: original synthetic foley layered with the creature voice.
    if action=='feed':
        clicks=np.zeros(n,dtype=np.float32)
        for at in [0.15,0.29,0.40]:
            i=int(at*SR)
            if i<n:
                length=min(int(.035*SR),n-i)
                tt=np.arange(length)/SR
                clicks[i:i+length]+=0.35*np.exp(-tt*55)*np.sin(2*np.pi*(620+base)*tt)
        sig += clicks
    elif action=='clean':
        sig += 0.10*noise*np.sin(2*np.pi*8*t)**2
    elif action=='heal':
        sig += 0.12*oscillator(660,t)+0.08*oscillator(880,t)
    elif action=='evolve':
        sig += 0.11*glide(220,980,t)

    e=env(n,attack=.045 if action!='sleep' else .12,release=.20)
    sig=sig*e
    # Gentle soft-clipping + normalization.
    sig=np.tanh(sig*1.15)
    peak=max(1e-6,float(np.max(np.abs(sig))))
    level=.55 if action in {'idle','sleep'} else (.82 if action in {'attack','evolve'} else .68)
    sig=(sig/peak*level).astype(np.float32)
    stereo=np.stack([sig, sig*(0.985+0.015*np.sin(2*np.pi*0.8*t))],axis=1)
    return stereo


def save_wav(path:Path, audio:np.ndarray):
    pcm=np.clip(audio,-1,1)
    pcm=(pcm*32767).astype('<i2')
    with wave.open(str(path),'wb') as wf:
        wf.setnchannels(2); wf.setsampwidth(2); wf.setframerate(SR); wf.writeframes(pcm.tobytes())


def main():
    OUT.mkdir(parents=True,exist_ok=True)
    for species in PROFILES:
        folder=OUT/species; folder.mkdir(parents=True,exist_ok=True)
        for action in ACTIONS:
            audio=make_sound(species,action)
            with tempfile.TemporaryDirectory() as td:
                wav=Path(td)/'sound.wav'; save_wav(wav,audio)
                ogg=folder/f'{action}.ogg'; mp3=folder/f'{action}.mp3'
                subprocess.run([
                    'ffmpeg','-hide_banner','-loglevel','error','-y','-i',str(wav),
                    '-c:a','libvorbis','-q:a','4',str(ogg),
                    '-c:a','libmp3lame','-q:a','5',str(mp3)
                ],check=True)
        print(species, 'generated', len(ACTIONS)*2, 'audio files')

if __name__=='__main__':
    main()
