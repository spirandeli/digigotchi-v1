import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Sparkles, c as HeartPulse, d as Bed, f as Bath, i as Store, l as Compass, n as Utensils, o as RotateCcw, s as Package, t as Volleyball, u as Coins } from "../_libs/lucide-react.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BhtfYPFP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ACTION_FRAME_COUNTS = {
	agumon: {
		idle: 8,
		eat: 10,
		play: 12,
		sleep: 6,
		wake: 8,
		clean: 10,
		heal: 10,
		evolve: 14,
		"attack-pepper-breath": 12
	},
	geogreymon: {
		idle: 10,
		eat: 10,
		play: 12,
		sleep: 6,
		wake: 8,
		clean: 10,
		heal: 10,
		evolve: 14,
		"attack-mega-flame": 12
	},
	wargreymon: {
		idle: 10,
		eat: 10,
		play: 12,
		sleep: 6,
		wake: 8,
		clean: 10,
		heal: 10,
		evolve: 14,
		"attack-terra-force": 12
	},
	etemon: {
		idle: 10,
		eat: 10,
		play: 12,
		sleep: 6,
		wake: 8,
		clean: 10,
		heal: 10,
		evolve: 14,
		"attack-love-serenade": 12
	},
	metaletemon: {
		idle: 10,
		eat: 10,
		play: 12,
		sleep: 6,
		wake: 8,
		clean: 10,
		heal: 10,
		evolve: 14,
		"attack-banana-slip": 12
	},
	gabumon: {
		idle: 10,
		eat: 10,
		play: 12,
		sleep: 6,
		wake: 8,
		clean: 10,
		heal: 10,
		evolve: 14,
		"attack-blue-blaster": 12
	},
	garurumon: {
		idle: 10,
		eat: 10,
		play: 12,
		sleep: 6,
		wake: 8,
		clean: 10,
		heal: 10,
		evolve: 14,
		"attack-howling-blaster": 12
	},
	weregarurumon: {
		idle: 10,
		eat: 10,
		play: 12,
		sleep: 6,
		wake: 8,
		clean: 10,
		heal: 10,
		evolve: 14,
		"attack-wolf-claw": 12
	},
	veemon: {
		idle: 14,
		eat: 8,
		play: 8,
		sleep: 8,
		wake: 8,
		clean: 8,
		heal: 8,
		evolve: 8,
		"attack-vee-headbutt": 8
	},
	flamedramon: {
		idle: 10,
		eat: 10,
		play: 12,
		sleep: 6,
		wake: 8,
		clean: 10,
		heal: 10,
		evolve: 14,
		"attack-fire-rocket": 12
	},
	xvmon: {
		idle: 8,
		eat: 8,
		play: 8,
		sleep: 8,
		wake: 8,
		clean: 8,
		heal: 8,
		evolve: 8,
		jump: 8,
		"attack-vee-laser": 8,
		attack: 8
	}
};
function animationFrames(species, action, fallbackCount) {
	const actualCount = ACTION_FRAME_COUNTS[species]?.[action] ?? fallbackCount;
	const loopCount = Math.max(1, actualCount, fallbackCount);
	const frameCycle = Math.max(1, actualCount);
	return Array.from({ length: loopCount }, (_, index) => {
		const frameIndex = index % frameCycle;
		return `/sprites/animated/${species}/${action}/${String(frameIndex).padStart(2, "0")}.png`;
	});
}
function animationSet(species, attackAction) {
	return {
		idle: {
			frames: animationFrames(species, "idle", 10),
			fps: 7,
			loop: true
		},
		eat: {
			frames: animationFrames(species, "eat", 10),
			fps: 9,
			loop: false
		},
		play: {
			frames: animationFrames(species, "play", 12),
			fps: 10,
			loop: false
		},
		sleep: {
			frames: animationFrames(species, "sleep", 6),
			fps: 5,
			loop: true
		},
		wake: {
			frames: animationFrames(species, "wake", 8),
			fps: 9,
			loop: false
		},
		clean: {
			frames: animationFrames(species, "clean", 10),
			fps: 9,
			loop: false
		},
		heal: {
			frames: animationFrames(species, "heal", 10),
			fps: 9,
			loop: false
		},
		evolve: {
			frames: animationFrames(species, "evolve", 14),
			fps: 11,
			loop: false
		},
		[attackAction]: {
			frames: animationFrames(species, attackAction, 12),
			fps: 12,
			loop: false
		}
	};
}
var SPECIES_ATTACK_ANIMATION = {
	agumon: "attack-pepper-breath",
	geogreymon: "attack-mega-flame",
	wargreymon: "attack-terra-force",
	etemon: "attack-love-serenade",
	metaletemon: "attack-banana-slip",
	gabumon: "attack-blue-blaster",
	garurumon: "attack-howling-blaster",
	weregarurumon: "attack-wolf-claw",
	veemon: "attack-vee-headbutt",
	flamedramon: "attack-fire-rocket",
	xvmon: "attack-vee-laser"
};
var SPRITE_ANIMATIONS = {
	agumon: animationSet("agumon", SPECIES_ATTACK_ANIMATION.agumon),
	geogreymon: animationSet("geogreymon", SPECIES_ATTACK_ANIMATION.geogreymon),
	wargreymon: animationSet("wargreymon", SPECIES_ATTACK_ANIMATION.wargreymon),
	etemon: animationSet("etemon", SPECIES_ATTACK_ANIMATION.etemon),
	metaletemon: animationSet("metaletemon", SPECIES_ATTACK_ANIMATION.metaletemon),
	gabumon: animationSet("gabumon", SPECIES_ATTACK_ANIMATION.gabumon),
	garurumon: animationSet("garurumon", SPECIES_ATTACK_ANIMATION.garurumon),
	weregarurumon: animationSet("weregarurumon", SPECIES_ATTACK_ANIMATION.weregarurumon),
	veemon: animationSet("veemon", SPECIES_ATTACK_ANIMATION.veemon),
	flamedramon: animationSet("flamedramon", SPECIES_ATTACK_ANIMATION.flamedramon),
	xvmon: animationSet("xvmon", SPECIES_ATTACK_ANIMATION.xvmon)
};
function animationDurationMs(species, action) {
	const animation = SPRITE_ANIMATIONS[species]?.[action];
	if (!animation) return 1e3;
	const frameMs = Math.max(70, Math.round(1e3 / animation.fps));
	return animation.frames.length * frameMs;
}
var SPRITE_STAGE_LAYOUT = {
	agumon: {
		scale: .9,
		x: 0,
		y: 1
	},
	geogreymon: {
		scale: .96,
		x: 1,
		y: 0
	},
	wargreymon: {
		scale: 1.07,
		x: 0,
		y: -2
	},
	etemon: {
		scale: .92,
		x: 0,
		y: 0
	},
	metaletemon: {
		scale: 1,
		x: 0,
		y: -1
	},
	gabumon: {
		scale: .9,
		x: 0,
		y: 1
	},
	garurumon: {
		scale: .91,
		x: 0,
		y: 2
	},
	weregarurumon: {
		scale: .99,
		x: 0,
		y: -1
	},
	veemon: {
		scale: .9,
		x: 0,
		y: 1
	},
	flamedramon: {
		scale: .94,
		x: 0,
		y: 0
	},
	xvmon: {
		scale: .94,
		x: 0,
		y: 0
	}
};
var LINES = {
	agumon: {
		id: "agumon",
		name: "Agumon",
		lineName: "Linha de Agumon",
		element: "fogo",
		blurb: "Parceiro corajoso e cheio de energia.",
		sprite: "/sprites/agumon.png",
		evolutions: [{
			id: "geogreymon",
			name: "GeoGreymon",
			level: 5,
			sprite: "/sprites/geogreymon.png"
		}, {
			id: "wargreymon",
			name: "WarGreymon",
			level: 12,
			sprite: "/sprites/wargreymon.png"
		}],
		phrases: {
			idle: [
				"Ola!",
				"Estou bem!",
				"Vamos treinar?"
			],
			hungry: ["Estou com fome...", "Quero carne digital!"],
			happy: [
				"Isso!",
				"Adoro isso!",
				"Voce e o melhor!"
			],
			tired: ["Estou cansado...", "Quero dormir..."],
			dirty: ["Estou sujo...", "Preciso de um banho!"],
			sick: ["Nao me sinto bem...", "Preciso de cuidado..."],
			sleep: ["Zzz...", "Sonhando em evoluir..."]
		}
	},
	etemon: {
		id: "etemon",
		name: "Etemon",
		lineName: "Linha de Etemon",
		element: "fogo",
		blurb: "Estrela do palco digital.",
		sprite: "/sprites/etemon.png",
		evolutions: [{
			id: "metaletemon",
			name: "MetalEtemon",
			level: 8,
			sprite: "/sprites/metaletemon.png"
		}],
		phrases: {
			idle: [
				"Show time!",
				"Sou uma estrela!",
				"Vamos dançar?"
			],
			hungry: ["Preciso de energia pro show!", "Quero banana digital!"],
			happy: [
				"Bravo!",
				"O publico ama!",
				"Mais uma!"
			],
			tired: ["O show acabou por hoje...", "Preciso descansar a voz..."],
			dirty: ["Nao posso subir no palco assim!", "Me limpe!"],
			sick: ["Cancelaram o show...", "Me ajuda!"],
			sleep: ["Zzz... bis..."]
		}
	},
	gabumon: {
		id: "gabumon",
		name: "Gabumon",
		lineName: "Linha de Gabumon",
		element: "gelo",
		blurb: "Fiel e protetor.",
		sprite: "/sprites/gabumon.png",
		evolutions: [{
			id: "garurumon",
			name: "Garurumon",
			level: 5,
			sprite: "/sprites/animated/garurumon/idle/00.png"
		}, {
			id: "weregarurumon",
			name: "WereGarurumon",
			level: 10,
			sprite: "/sprites/animated/weregarurumon/idle/00.png"
		}],
		phrases: {
			idle: [
				"Estou aqui!",
				"Confio em voce.",
				"Vamos juntos!"
			],
			hungry: ["Estou com fome...", "Tem algo para comer?"],
			happy: [
				"Obrigado!",
				"Fico feliz!",
				"Voce e especial!"
			],
			tired: ["Preciso descansar...", "Estou sonolento..."],
			dirty: ["Minha pele esta suja...", "Banho, por favor!"],
			sick: ["Estou fraco...", "Cuide de mim..."],
			sleep: ["Zzz... neve..."]
		}
	},
	veemon: {
		id: "veemon",
		name: "Veemon",
		lineName: "Linha de Veemon",
		element: "eletricidade",
		blurb: "Aventureiro e destemido.",
		sprite: "/sprites/veemon.png",
		evolutions: [{
			id: "flamedramon",
			name: "Flamedramon",
			level: 5,
			sprite: "/sprites/flamedramon.png"
		}, {
			id: "xvmon",
			name: "XV-mon",
			level: 10,
			sprite: "/sprites/xvmon.png"
		}],
		phrases: {
			idle: [
				"Vamos a aventura!",
				"Estou pronto!",
				"O que fazemos?"
			],
			hungry: ["Preciso de combustivel!", "Quero comer!"],
			happy: [
				"Legal!",
				"Isso e demais!",
				"Mais!"
			],
			tired: ["Ufa... descanso...", "Bateria baixa..."],
			dirty: ["Estou sujo da aventura!", "Banho!"],
			sick: ["Nao consigo voar...", "Ajuda!"],
			sleep: ["Zzz... voando..."]
		}
	}
};
var ITEMS = {
	carne_digital: {
		id: "carne_digital",
		name: "Carne Digital",
		category: "food",
		effects: {
			hunger: 25,
			happiness: 5
		},
		price: 15,
		desc: "Recupera fome"
	},
	fruta_digital: {
		id: "fruta_digital",
		name: "Fruta Digital",
		category: "food",
		effects: {
			hunger: 15,
			happiness: 15
		},
		price: 20,
		desc: "Fome e felicidade"
	},
	racao_especial: {
		id: "racao_especial",
		name: "Racao Especial",
		category: "food",
		effects: {
			hunger: 30,
			health: 10
		},
		price: 30,
		desc: "Fome e saude"
	},
	sabao: {
		id: "sabao",
		name: "Sabao Digital",
		category: "hygiene",
		effects: {
			hygiene: 40,
			happiness: 5
		},
		price: 12,
		desc: "Limpa bem"
	},
	medicina: {
		id: "medicina",
		name: "Medicina",
		category: "health",
		effects: {
			health: 35,
			energy: 5
		},
		price: 25,
		desc: "Cura doencas"
	},
	bola: {
		id: "bola",
		name: "Bola Digital",
		category: "toy",
		effects: {
			happiness: 20,
			energy: -10
		},
		price: 18,
		desc: "Diversao garantida"
	}
};
var INITIAL_INVENTORY = {
	carne_digital: 5,
	fruta_digital: 2,
	sabao: 2,
	medicina: 1
};
var SAVE_KEY = "digital_pet_save_v2";
var ELEMENT_LABEL = {
	fogo: "Fogo",
	gelo: "Gelo",
	eletricidade: "Eletricidade"
};
var SKILLS = {
	agumon: {
		id: "pepper_breath",
		name: "Pepper Breath / Baby Flame",
		speciesId: "agumon",
		energyCost: 7,
		xpGain: 11,
		animation: "attack-pepper-breath",
		sound: "/audio/digimon/agumon/attack.ogg",
		element: "fogo",
		description: "Agumon recua a cabeça e lança uma pequena bola de fogo."
	},
	geogreymon: {
		id: "mega_flame",
		name: "Mega Flame",
		speciesId: "geogreymon",
		energyCost: 9,
		xpGain: 14,
		animation: "attack-mega-flame",
		sound: "/audio/digimon/geogreymon/attack.ogg",
		element: "fogo",
		description: "GeoGreymon prepara a postura e dispara uma rajada de fogo maior."
	},
	wargreymon: {
		id: "terra_force",
		name: "Terra Force / Gaia Force",
		speciesId: "wargreymon",
		energyCost: 14,
		xpGain: 21,
		animation: "attack-terra-force",
		sound: "/audio/digimon/wargreymon/attack.ogg",
		element: "fogo",
		description: "WarGreymon concentra energia acima do corpo e a lança à frente."
	},
	etemon: {
		id: "love_serenade",
		name: "Love Serenade / Concert Crush",
		speciesId: "etemon",
		energyCost: 10,
		xpGain: 16,
		animation: "attack-love-serenade",
		sound: "/audio/digimon/etemon/attack.ogg",
		element: "som",
		description: "Etemon faz uma pose performática e libera uma onda sonora."
	},
	metaletemon: {
		id: "banana_slip",
		name: "Banana Slip",
		speciesId: "metaletemon",
		energyCost: 13,
		xpGain: 20,
		animation: "attack-banana-slip",
		sound: "/audio/digimon/metaletemon/attack.ogg",
		element: "som",
		description: "MetalEtemon arremessa uma casca de banana em um ataque cômico."
	},
	gabumon: {
		id: "blue_blaster",
		name: "Blue Blaster / Petit Fire",
		speciesId: "gabumon",
		energyCost: 7,
		xpGain: 11,
		animation: "attack-blue-blaster",
		sound: "/audio/digimon/gabumon/attack.ogg",
		element: "gelo",
		description: "Gabumon inspira e lança uma pequena chama azul."
	},
	garurumon: {
		id: "howling_blaster",
		name: "Howling Blaster / Fox Fire",
		speciesId: "garurumon",
		energyCost: 9,
		xpGain: 14,
		animation: "attack-howling-blaster",
		sound: "/audio/digimon/garurumon/attack.ogg",
		element: "gelo",
		description: "Garurumon rosna, avança a cabeça e dispara uma chama azul."
	},
	weregarurumon: {
		id: "wolf_claw",
		name: "Wolf Claw / Kaiser Nail",
		speciesId: "weregarurumon",
		energyCost: 11,
		xpGain: 17,
		animation: "attack-wolf-claw",
		sound: "/audio/digimon/weregarurumon/attack.ogg",
		element: "gelo",
		description: "WereGarurumon antecipa o corpo e executa um corte duplo de garras."
	},
	veemon: {
		id: "vee_headbutt",
		name: "Vee Headbutt",
		speciesId: "veemon",
		energyCost: 7,
		xpGain: 11,
		animation: "attack-vee-headbutt",
		sound: "/audio/digimon/veemon/attack.ogg",
		element: "eletricidade",
		description: "Veemon recua e dispara para frente em uma cabeçada curta."
	},
	flamedramon: {
		id: "fire_rocket",
		name: "Fire Rocket",
		speciesId: "flamedramon",
		energyCost: 9,
		xpGain: 14,
		animation: "attack-fire-rocket",
		sound: "/audio/digimon/flamedramon/attack.ogg",
		element: "fogo",
		description: "Flamedramon envolve o avanço em chamas e explode para frente."
	},
	xvmon: {
		id: "vee_laser",
		name: "Vee-Laser / X-Laser",
		speciesId: "xvmon",
		energyCost: 10,
		xpGain: 15,
		animation: "attack-vee-laser",
		sound: "/audio/digimon/xvmon/attack.ogg",
		element: "eletricidade",
		description: "XV-mon carrega o X do peito e dispara um feixe frontal."
	}
};
function getSkillForSpecies(speciesId) {
	return SKILLS[speciesId] ?? null;
}
function clamp(v, min = 0, max = 100) {
	return Math.max(min, Math.min(max, Math.round(v)));
}
function xpToNext(level) {
	return 50 + level * 40;
}
function createPet(lineId) {
	return {
		lineId,
		speciesId: lineId,
		nickname: LINES[lineId]?.name ?? "Parceiro",
		level: 1,
		experience: 0,
		hunger: 100,
		happiness: 80,
		energy: 100,
		hygiene: 100,
		health: 100,
		discipline: 50,
		coins: 100,
		inventory: { ...INITIAL_INVENTORY },
		isSleeping: false,
		lastSimulatedAt: Date.now(),
		createdAt: Date.now(),
		evolutionStage: -1
	};
}
function currentSprite(pet) {
	const line = LINES[pet.lineId];
	return (line?.evolutions[pet.evolutionStage])?.sprite ?? line?.sprite ?? "";
}
function currentName(pet) {
	const line = LINES[pet.lineId];
	return (line?.evolutions[pet.evolutionStage])?.name ?? line?.name ?? pet.nickname;
}
function getMood(pet) {
	if (pet.isSleeping) return "sleep";
	if (pet.health < 30) return "sick";
	if (pet.hunger < 25) return "hungry";
	if (pet.energy < 20) return "tired";
	if (pet.hygiene < 25) return "dirty";
	if (pet.happiness > 75) return "happy";
	return "idle";
}
function applyEffects(pet, effects) {
	if (!effects) return;
	if (effects.hunger) pet.hunger = clamp(pet.hunger + effects.hunger);
	if (effects.happiness) pet.happiness = clamp(pet.happiness + effects.happiness);
	if (effects.energy) pet.energy = clamp(pet.energy + effects.energy);
	if (effects.hygiene) pet.hygiene = clamp(pet.hygiene + effects.hygiene);
	if (effects.health) pet.health = clamp(pet.health + effects.health);
}
function addXp(pet, amount) {
	pet.experience += amount;
	while (pet.experience >= xpToNext(pet.level)) {
		pet.experience -= xpToNext(pet.level);
		pet.level += 1;
		pet.health = clamp(pet.health + 5);
		pet.happiness = clamp(pet.happiness + 10);
	}
}
function simulateTime(pet) {
	const next = {
		...pet,
		inventory: { ...pet.inventory }
	};
	const elapsedMs = Math.min(Date.now() - next.lastSimulatedAt, 864e5);
	if (next.isSleeping) {
		const sleepStepMs = 1e3;
		const sleepSteps = Math.floor(elapsedMs / sleepStepMs);
		if (sleepSteps <= 0) return next;
		next.energy = clamp(next.energy + sleepSteps * 8);
		next.lastSimulatedAt += sleepSteps * sleepStepMs;
		return next;
	}
	const ticks = Math.floor(elapsedMs / 3e5);
	if (ticks <= 0) return next;
	next.hunger = clamp(next.hunger - ticks * 1.2);
	next.energy = clamp(next.energy - ticks * .6);
	next.happiness = clamp(next.happiness - ticks * .5);
	next.hygiene = clamp(next.hygiene - ticks * .7);
	if (next.hunger < 20 || next.hygiene < 20 || next.energy < 15) next.health = clamp(next.health - ticks * .8);
	else if (next.hunger > 60 && next.hygiene > 60 && next.energy > 50) next.health = clamp(next.health + ticks * .3);
	next.lastSimulatedAt += ticks * 5 * 60 * 1e3;
	return next;
}
function feed(pet, itemId) {
	const next = {
		...pet,
		inventory: { ...pet.inventory }
	};
	const item = ITEMS[itemId];
	if (!item || item.category !== "food") return {
		pet: next,
		result: {
			ok: false,
			msg: "Item invalido"
		}
	};
	if ((next.inventory[itemId] ?? 0) <= 0) return {
		pet: next,
		result: {
			ok: false,
			msg: "Sem esse item no inventario"
		}
	};
	if (next.isSleeping) return {
		pet: next,
		result: {
			ok: false,
			msg: "Esta dormindo"
		}
	};
	if (next.hunger >= 100) return {
		pet: next,
		result: {
			ok: false,
			msg: "Ja esta satisfeito"
		}
	};
	next.inventory[itemId] -= 1;
	applyEffects(next, item.effects);
	addXp(next, 5);
	return {
		pet: next,
		result: {
			ok: true,
			msg: `${currentName(next)} comeu ${item.name}`,
			animation: "eat",
			durationMs: animationDurationMs(next.speciesId, "eat")
		}
	};
}
function feedAny(pet) {
	for (const id of [
		"carne_digital",
		"fruta_digital",
		"racao_especial"
	]) if ((pet.inventory[id] ?? 0) > 0) return feed(pet, id);
	return {
		pet,
		result: {
			ok: false,
			msg: "Sem comida. Abra a loja."
		}
	};
}
function play(pet, itemId) {
	const next = {
		...pet,
		inventory: { ...pet.inventory }
	};
	if (next.isSleeping) return {
		pet: next,
		result: {
			ok: false,
			msg: "Esta dormindo"
		}
	};
	if (next.energy < 15) return {
		pet: next,
		result: {
			ok: false,
			msg: "Muito cansado para brincar"
		}
	};
	if (itemId) {
		const item = ITEMS[itemId];
		if (!item || item.category !== "toy") return {
			pet: next,
			result: {
				ok: false,
				msg: "Nao e um brinquedo"
			}
		};
		if ((next.inventory[itemId] ?? 0) <= 0) return {
			pet: next,
			result: {
				ok: false,
				msg: "Sem esse item"
			}
		};
		next.inventory[itemId] -= 1;
		applyEffects(next, item.effects);
	} else {
		next.happiness = clamp(next.happiness + 15);
		next.energy = clamp(next.energy - 12);
		next.hygiene = clamp(next.hygiene - 5);
	}
	addXp(next, 8);
	next.coins += 3;
	return {
		pet: next,
		result: {
			ok: true,
			msg: `${currentName(next)} se divertiu`,
			animation: "play",
			durationMs: animationDurationMs(next.speciesId, "play")
		}
	};
}
function sleepToggle(pet) {
	const simulated = pet.isSleeping ? simulateTime(pet) : pet;
	const next = {
		...simulated,
		inventory: { ...simulated.inventory },
		isSleeping: !simulated.isSleeping,
		lastSimulatedAt: Date.now()
	};
	if (next.isSleeping) return {
		pet: next,
		result: {
			ok: true,
			msg: `${currentName(next)} foi dormir`,
			animation: "sleep",
			durationMs: animationDurationMs(next.speciesId, "sleep")
		}
	};
	return {
		pet: next,
		result: {
			ok: true,
			msg: `${currentName(next)} acordou`,
			animation: "wake",
			durationMs: animationDurationMs(next.speciesId, "wake")
		}
	};
}
function clean(pet, itemId = "sabao") {
	const next = {
		...pet,
		inventory: { ...pet.inventory }
	};
	if (next.isSleeping) return {
		pet: next,
		result: {
			ok: false,
			msg: "Esta dormindo"
		}
	};
	if (next.hygiene >= 100) return {
		pet: next,
		result: {
			ok: false,
			msg: "Ja esta limpo"
		}
	};
	const item = ITEMS[itemId];
	if (item && (next.inventory[itemId] ?? 0) > 0) {
		next.inventory[itemId] -= 1;
		applyEffects(next, item.effects);
	} else {
		next.hygiene = clamp(next.hygiene + 30);
		next.energy = clamp(next.energy - 5);
		next.happiness = clamp(next.happiness + 5);
	}
	addXp(next, 4);
	return {
		pet: next,
		result: {
			ok: true,
			msg: `${currentName(next)} tomou banho`,
			animation: "clean",
			durationMs: animationDurationMs(next.speciesId, "clean")
		}
	};
}
function heal(pet, itemId = "medicina") {
	const next = {
		...pet,
		inventory: { ...pet.inventory }
	};
	if (next.isSleeping) return {
		pet: next,
		result: {
			ok: false,
			msg: "Esta dormindo"
		}
	};
	if (next.health >= 100) return {
		pet: next,
		result: {
			ok: false,
			msg: "Ja esta saudavel"
		}
	};
	const item = ITEMS[itemId];
	if (!item || (next.inventory[itemId] ?? 0) <= 0) return {
		pet: next,
		result: {
			ok: false,
			msg: "Voce precisa de Medicina"
		}
	};
	next.inventory[itemId] -= 1;
	applyEffects(next, item.effects);
	addXp(next, 5);
	return {
		pet: next,
		result: {
			ok: true,
			msg: `${currentName(next)} se sente melhor`,
			animation: "heal",
			durationMs: animationDurationMs(next.speciesId, "heal")
		}
	};
}
function buy(pet, itemId) {
	const next = {
		...pet,
		inventory: { ...pet.inventory }
	};
	const item = ITEMS[itemId];
	if (!item) return {
		pet: next,
		result: {
			ok: false,
			msg: "Item nao existe"
		}
	};
	if (next.coins < item.price) return {
		pet: next,
		result: {
			ok: false,
			msg: "Moedas insuficientes"
		}
	};
	next.coins -= item.price;
	next.inventory[itemId] = (next.inventory[itemId] ?? 0) + 1;
	return {
		pet: next,
		result: {
			ok: true,
			msg: `Comprou ${item.name}`
		}
	};
}
function tryEvolve(pet) {
	const next = {
		...pet,
		inventory: { ...pet.inventory }
	};
	const evoList = LINES[next.lineId]?.evolutions ?? [];
	const nextIdx = next.evolutionStage + 1;
	if (nextIdx >= evoList.length) return {
		pet: next,
		result: {
			ok: false,
			msg: "Forma maxima alcancada"
		}
	};
	const evo = evoList[nextIdx];
	if (next.level < evo.level) return {
		pet: next,
		result: {
			ok: false,
			msg: `Precisa do nivel ${evo.level}`
		}
	};
	if (next.happiness < 50 || next.health < 60) return {
		pet: next,
		result: {
			ok: false,
			msg: "Precisa estar feliz e saudavel"
		}
	};
	next.evolutionStage = nextIdx;
	next.speciesId = evo.id;
	next.nickname = evo.name;
	addXp(next, 20);
	return {
		pet: next,
		result: {
			ok: true,
			msg: `Evoluiu para ${evo.name}!`,
			animation: "evolve",
			durationMs: animationDurationMs(next.speciesId, "evolve")
		}
	};
}
function trainSkill(pet) {
	const next = {
		...pet,
		inventory: { ...pet.inventory }
	};
	if (next.isSleeping) return {
		pet: next,
		result: {
			ok: false,
			msg: "Acorde antes de treinar"
		}
	};
	const skill = getSkillForSpecies(next.speciesId);
	if (!skill) return {
		pet: next,
		result: {
			ok: false,
			msg: "Habilidade nao configurada"
		}
	};
	if (next.energy < skill.energyCost) return {
		pet: next,
		result: {
			ok: false,
			msg: `Energia insuficiente para ${skill.name}`
		}
	};
	next.energy = clamp(next.energy - skill.energyCost);
	next.happiness = clamp(next.happiness + 3);
	next.hygiene = clamp(next.hygiene - 2);
	const gainedXp = skill.xpGain * 3;
	addXp(next, gainedXp);
	next.coins += 2;
	return {
		pet: next,
		result: {
			ok: true,
			msg: `${skill.name} · +${gainedXp} XP`,
			animation: skill.animation,
			durationMs: animationDurationMs(next.speciesId, skill.animation)
		}
	};
}
function useItem(pet, itemId) {
	const item = ITEMS[itemId];
	if (!item) return {
		pet,
		result: {
			ok: false,
			msg: "Item invalido"
		}
	};
	if (item.category === "food") return feed(pet, itemId);
	if (item.category === "hygiene") return clean(pet, itemId);
	if (item.category === "health") return heal(pet, itemId);
	if (item.category === "toy") return play(pet, itemId);
	return {
		pet,
		result: {
			ok: false,
			msg: "Nao pode usar agora"
		}
	};
}
var ACTION_VOLUME = {
	idle: .26,
	feed: .38,
	play: .42,
	sleep: .25,
	wake: .4,
	clean: .34,
	heal: .38,
	attack: .52,
	evolve: .58
};
var CACHE = /* @__PURE__ */ new Map();
var LAST_PLAYED = /* @__PURE__ */ new Map();
var activeAudio = null;
var masterVolume = .8;
var lastIdleAt = 0;
function audioPath(speciesId, action, ext) {
	return `/audio/digimon/${speciesId}/${action}.${ext}`;
}
function browserSupportsOgg() {
	if (typeof document === "undefined") return true;
	const audio = document.createElement("audio");
	return Boolean(audio.canPlayType("audio/ogg; codecs=\"vorbis\""));
}
function cachedAudio(speciesId, action) {
	if (typeof Audio === "undefined") return null;
	const ext = browserSupportsOgg() ? "ogg" : "mp3";
	const key = `${speciesId}:${action}:${ext}`;
	const existing = CACHE.get(key);
	if (existing) return existing;
	const audio = new Audio(audioPath(speciesId, action, ext));
	audio.preload = "auto";
	CACHE.set(key, audio);
	return audio;
}
function preloadDigimonAudio(speciesId) {
	[
		"idle",
		"feed",
		"play",
		"sleep",
		"wake",
		"clean",
		"heal",
		"attack",
		"evolve"
	].forEach((action) => cachedAudio(speciesId, action)?.load());
}
function playDigimonSound(speciesId, action) {
	if (typeof window === "undefined") return;
	const now = performance.now();
	const cooldownKey = `${speciesId}:${action}`;
	const last = LAST_PLAYED.get(cooldownKey) ?? -Infinity;
	const cooldown = action === "evolve" ? 700 : action === "attack" ? 450 : 300;
	if (now - last < cooldown) return;
	LAST_PLAYED.set(cooldownKey, now);
	const audio = cachedAudio(speciesId, action);
	if (!audio) return;
	if (activeAudio && activeAudio !== audio && !activeAudio.paused) {
		activeAudio.pause();
		activeAudio.currentTime = 0;
	}
	audio.currentTime = 0;
	audio.volume = Math.max(0, Math.min(1, ACTION_VOLUME[action] * masterVolume));
	activeAudio = audio;
	audio.play().catch(() => {});
}
function animationToSound(animation) {
	if (!animation) return null;
	if (animation.startsWith("attack-")) return "attack";
	return {
		eat: "feed",
		play: "play",
		sleep: "sleep",
		wake: "wake",
		clean: "clean",
		heal: "heal",
		evolve: "evolve",
		idle: "idle"
	}[animation] ?? null;
}
function maybePlayIdleSound(speciesId) {
	if (typeof window === "undefined") return;
	const now = Date.now();
	if (now - lastIdleAt < 22e3) return;
	lastIdleAt = now;
	playDigimonSound(speciesId, "idle");
}
var MAX_RUN_REWARDS = {
	xp: 500,
	coins: 250
};
function stableRunId() {
	if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
	return `digital-path-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
function boundedInteger(value, min, max) {
	if (typeof value !== "number" || !Number.isFinite(value)) return null;
	const integer = Math.floor(value);
	if (integer < min || integer > max) return null;
	return integer;
}
function createRunInput(pet) {
	const line = LINES[pet.lineId];
	if (!line || !pet.speciesId || pet.level < 1 || pet.evolutionStage < -1) return null;
	return Object.freeze({
		runId: stableRunId(),
		lineId: pet.lineId,
		speciesId: pet.speciesId,
		name: currentName(pet),
		level: pet.level,
		experience: pet.experience,
		evolutionStage: pet.evolutionStage,
		element: line.element,
		stats: Object.freeze({
			health: pet.health,
			attack: Math.max(1, pet.level * 2),
			defense: Math.max(1, Math.floor(pet.discipline / 10)),
			speed: 100
		})
	});
}
function validateRunResult(result) {
	if (!result || typeof result !== "object") return null;
	const candidate = result;
	if (typeof candidate.runId !== "string" || candidate.runId.length < 8 || candidate.runId.length > 120) return null;
	if (candidate.outcome !== "victory" && candidate.outcome !== "defeat" && candidate.outcome !== "abandoned") return null;
	const xp = boundedInteger(candidate.xp, 0, MAX_RUN_REWARDS.xp);
	const coins = boundedInteger(candidate.coins, 0, MAX_RUN_REWARDS.coins);
	if (xp === null || coins === null) return null;
	let itemsWon;
	if (candidate.itemsWon && typeof candidate.itemsWon === "object") {
		const rawItems = candidate.itemsWon;
		itemsWon = {};
		for (const [key, qty] of Object.entries(rawItems)) if (typeof key === "string" && typeof qty === "number" && qty > 0 && qty <= 99) itemsWon[key] = Math.floor(qty);
	}
	return Object.freeze({
		runId: candidate.runId,
		outcome: candidate.outcome,
		xp,
		coins,
		...itemsWon && Object.keys(itemsWon).length > 0 ? { itemsWon: Object.freeze(itemsWon) } : {}
	});
}
function addRunXp(pet, amount) {
	const next = { ...pet };
	next.experience += amount;
	while (next.experience >= xpToNext(next.level)) {
		next.experience -= xpToNext(next.level);
		next.level += 1;
		next.health = Math.min(100, next.health + 5);
		next.happiness = Math.min(100, next.happiness + 10);
	}
	return next;
}
function applyRunResult(pet, rawResult) {
	const result = validateRunResult(rawResult);
	if (!result) return {
		pet,
		applied: false
	};
	const appliedResults = pet.digitalPathResults ?? [];
	if (appliedResults.includes(result.runId)) return {
		pet,
		applied: false
	};
	const withLedger = {
		...pet,
		digitalPathResults: [...appliedResults, result.runId].slice(-50)
	};
	if (result.outcome !== "victory") return {
		pet: withLedger,
		applied: true
	};
	const rewarded = addRunXp(withLedger, result.xp);
	rewarded.coins += result.coins;
	if (result.itemsWon) {
		rewarded.inventory = { ...rewarded.inventory };
		for (const [key, qty] of Object.entries(result.itemsWon)) rewarded.inventory[key] = (rewarded.inventory[key] ?? 0) + qty;
	}
	return {
		pet: rewarded,
		applied: true
	};
}
function persist(pet) {
	try {
		localStorage.setItem(SAVE_KEY, JSON.stringify(pet));
	} catch {}
}
function loadSave() {
	try {
		const raw = localStorage.getItem(SAVE_KEY);
		if (!raw) return null;
		return JSON.parse(raw);
	} catch {
		return null;
	}
}
var useGame = create((set, get) => ({
	screen: "start",
	pet: null,
	panel: null,
	speech: "",
	anim: "",
	busyUntil: 0,
	animationRunId: 0,
	hasSave: () => Boolean(loadSave()),
	createDigitalPathRunInput: () => {
		const { pet } = get();
		return pet ? createRunInput(pet) : null;
	},
	applyDigitalPathResult: (result) => {
		const { pet } = get();
		if (!pet) return false;
		const applied = applyRunResult(pet, result);
		if (!applied.applied) return false;
		persist(applied.pet);
		set({
			pet: applied.pet,
			speech: "Resultado do Caminho Digital aplicado"
		});
		return true;
	},
	startNew: () => set({ screen: "choose" }),
	continueSave: () => {
		const saved = loadSave();
		if (!saved) return false;
		const pet = simulateTime(saved);
		persist(pet);
		set({
			pet,
			screen: "play",
			speech: "Bem-vindo de volta"
		});
		return true;
	},
	choose: (lineId) => {
		const pet = createPet(lineId);
		persist(pet);
		set({
			pet,
			screen: "play",
			speech: "Cuide de mim!"
		});
	},
	setScreen: (screen) => set({ screen }),
	setPanel: (panel) => set({ panel }),
	startDigitalPath: () => set({
		screen: "digital-path",
		panel: null
	}),
	exitDigitalPath: () => set({
		screen: "play",
		panel: null
	}),
	reset: () => {
		try {
			localStorage.removeItem(SAVE_KEY);
		} catch {}
		set({
			pet: null,
			screen: "start",
			panel: null,
			speech: "",
			anim: "",
			busyUntil: 0,
			animationRunId: 0
		});
	},
	tick: () => {
		const { pet } = get();
		if (!pet) return;
		const next = simulateTime(pet);
		persist(next);
		set({ pet: next });
	},
	apply: (fn) => {
		const { pet, busyUntil, animationRunId } = get();
		if (!pet) return null;
		if (Date.now() < busyUntil) {
			const result = {
				ok: false,
				msg: "Aguarde a animacao terminar"
			};
			set({ speech: result.msg });
			return result;
		}
		const { pet: next, result } = fn(pet);
		persist(next);
		const durationMs = result.durationMs ?? (result.animation ? 1300 : 900);
		const nextAnimationRunId = animationRunId + 1;
		set({
			pet: next,
			speech: result.msg,
			anim: result.animation ?? "",
			busyUntil: result.ok && result.animation ? Date.now() + durationMs : 0,
			animationRunId: nextAnimationRunId,
			panel: result.ok && result.animation ? null : get().panel
		});
		if (result.ok) {
			const sound = animationToSound(result.animation);
			if (sound) playDigimonSound(next.speciesId, sound);
		}
		if (typeof window !== "undefined") window.setTimeout(() => {
			const state = useGame.getState();
			if (state.animationRunId === nextAnimationRunId && state.speech === result.msg) useGame.setState({
				speech: "",
				anim: "",
				busyUntil: 0
			});
		}, durationMs);
		return result;
	}
}));
var actions = {
	feed: () => useGame.getState().apply(feedAny),
	play: () => useGame.getState().apply((p) => play(p)),
	sleep: () => useGame.getState().apply(sleepToggle),
	clean: () => useGame.getState().apply((p) => clean(p)),
	heal: () => useGame.getState().apply((p) => heal(p)),
	buy: (id) => useGame.getState().apply((p) => buy(p, id)),
	evolve: () => useGame.getState().apply(tryEvolve),
	train: () => useGame.getState().apply(trainSkill),
	startDigitalPath: () => useGame.getState().startDigitalPath(),
	exitDigitalPath: () => useGame.getState().exitDigitalPath(),
	createDigitalPathRunInput: () => useGame.getState().createDigitalPathRunInput(),
	use: (id) => useGame.getState().apply((p) => useItem(p, id))
};
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var ORDER = [
	"agumon",
	"etemon",
	"gabumon",
	"veemon"
];
function ChooseScreen() {
	const choose = useGame((s) => s.choose);
	const [selected, setSelected] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "flex min-h-dvh items-center justify-center px-4 py-5 sm:px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "ds-console ds-shell-padding mx-auto w-full max-w-5xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ds-top-bezel",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ds-lights",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ds-led is-on" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ds-led" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ds-led" })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ds-screen room-day ds-gridline px-4 py-6 sm:px-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-center font-display text-2xl font-semibold tracking-tight text-fg",
								children: "Escolha sua linha"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-center text-sm text-muted",
								children: "Voce comeca nesta forma e evolui cuidando bem."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4",
								children: ORDER.map((id) => {
									const line = LINES[id];
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setSelected(id),
										className: cn("ds-card flex flex-col items-center p-4 text-center transition-all duration-150", selected === id ? "ring-2 ring-accent border-[color:var(--color-accent)] translate-y-[-1px]" : "hover:translate-y-[-1px]"),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex h-28 w-full items-center justify-center rounded-xl border border-white/60 bg-white/35",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: line.sprite,
													alt: "",
													className: "pixel max-h-28 max-w-full object-contain"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
												className: "mt-3 text-sm font-semibold text-fg",
												children: line.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-[11px] font-medium uppercase tracking-wide text-muted",
												children: ELEMENT_LABEL[line.element]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 text-xs leading-snug text-subtle",
												children: line.blurb
											})
										]
									}, id);
								})
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "ds-hinge" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ds-bottom-panel px-4 pb-5 pt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "ds-slot px-3 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-muted",
						children: "Toque em uma linha e confirme abaixo"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: !selected,
							onClick: () => selected && choose(selected),
							className: "ds-button ds-button-primary h-12 w-full max-w-xs text-sm font-semibold disabled:opacity-40",
							children: "Confirmar escolha"
						})
					})]
				})
			]
		})
	});
}
var DIGITAL_PATH_MANIFESTS = { agumon: {
	id: "agumon",
	name: "Agumon",
	stage: "rookie",
	root: "rougue-like-character-sprites/agumon",
	spriteReady: true,
	status: "READY",
	movementStyle: "2-way",
	reason: "51 source frames passed second visual review. 2-way movement adaptation configured with lateral walk fallbacks for vertical movement and basic_2 casting pose with Mega Blast effect for special attack.",
	frame: {
		"width": 96,
		"height": 96,
		"originX": .5,
		"originY": .94
	},
	scale: 1,
	hitbox: {
		"width": 42,
		"height": 62,
		"offsetX": 27,
		"offsetY": 28
	},
	animations: {
		"idle": {
			"fps": 7,
			"loop": true,
			"frames": [
				"rougue-like-character-sprites/agumon/idle/idle_01.png",
				"rougue-like-character-sprites/agumon/idle/idle_02.png",
				"rougue-like-character-sprites/agumon/idle/idle_03.png",
				"rougue-like-character-sprites/agumon/idle/idle_04.png",
				"rougue-like-character-sprites/agumon/idle/idle_05.png",
				"rougue-like-character-sprites/agumon/idle/idle_06.png",
				"rougue-like-character-sprites/agumon/idle/idle_07.png",
				"rougue-like-character-sprites/agumon/idle/idle_08.png",
				"rougue-like-character-sprites/agumon/idle/idle_09.png"
			],
			"sourceIndices": [
				27,
				25,
				28,
				23,
				26,
				29,
				30,
				31,
				24
			]
		},
		"walk_left": {
			"fps": 10,
			"loop": true,
			"frames": [
				"rougue-like-character-sprites/agumon/walk/left/walk_left_01.png",
				"rougue-like-character-sprites/agumon/walk/left/walk_left_02.png",
				"rougue-like-character-sprites/agumon/walk/left/walk_left_03.png",
				"rougue-like-character-sprites/agumon/walk/left/walk_left_04.png",
				"rougue-like-character-sprites/agumon/walk/left/walk_left_05.png",
				"rougue-like-character-sprites/agumon/walk/left/walk_left_06.png",
				"rougue-like-character-sprites/agumon/walk/left/walk_left_07.png",
				"rougue-like-character-sprites/agumon/walk/left/walk_left_08.png",
				"rougue-like-character-sprites/agumon/walk/left/walk_left_09.png",
				"rougue-like-character-sprites/agumon/walk/left/walk_left_10.png",
				"rougue-like-character-sprites/agumon/walk/left/walk_left_11.png"
			],
			"sourceIndices": [
				103,
				98,
				88,
				82,
				87,
				99,
				84,
				78,
				79,
				93,
				89
			]
		},
		"walk_right": {
			"fps": 10,
			"loop": true,
			"frames": [
				"rougue-like-character-sprites/agumon/walk/right/walk_right_01.png",
				"rougue-like-character-sprites/agumon/walk/right/walk_right_02.png",
				"rougue-like-character-sprites/agumon/walk/right/walk_right_03.png",
				"rougue-like-character-sprites/agumon/walk/right/walk_right_04.png",
				"rougue-like-character-sprites/agumon/walk/right/walk_right_05.png",
				"rougue-like-character-sprites/agumon/walk/right/walk_right_06.png",
				"rougue-like-character-sprites/agumon/walk/right/walk_right_07.png",
				"rougue-like-character-sprites/agumon/walk/right/walk_right_08.png",
				"rougue-like-character-sprites/agumon/walk/right/walk_right_09.png",
				"rougue-like-character-sprites/agumon/walk/right/walk_right_10.png"
			],
			"sourceIndices": [
				59,
				64,
				60,
				51,
				65,
				56,
				54,
				55,
				43,
				57
			]
		},
		"attack_basic_1": {
			"fps": 12,
			"loop": false,
			"frames": [
				"rougue-like-character-sprites/agumon/attacks/basic_1/attacks_basic_1_01.png",
				"rougue-like-character-sprites/agumon/attacks/basic_1/attacks_basic_1_02.png",
				"rougue-like-character-sprites/agumon/attacks/basic_1/attacks_basic_1_03.png",
				"rougue-like-character-sprites/agumon/attacks/basic_1/attacks_basic_1_04.png",
				"rougue-like-character-sprites/agumon/attacks/basic_1/attacks_basic_1_05.png",
				"rougue-like-character-sprites/agumon/attacks/basic_1/attacks_basic_1_06.png"
			],
			"sourceIndices": [
				95,
				96,
				68,
				92,
				107,
				111
			]
		},
		"attack_basic_2": {
			"fps": 12,
			"loop": false,
			"frames": [
				"rougue-like-character-sprites/agumon/attacks/basic_2/attacks_basic_2_01.png",
				"rougue-like-character-sprites/agumon/attacks/basic_2/attacks_basic_2_02.png",
				"rougue-like-character-sprites/agumon/attacks/basic_2/attacks_basic_2_03.png",
				"rougue-like-character-sprites/agumon/attacks/basic_2/attacks_basic_2_04.png"
			],
			"sourceIndices": [
				110,
				102,
				90,
				80
			],
			"projectile": "projectile_dragon"
		},
		"hit": {
			"fps": 8,
			"loop": false,
			"frames": ["rougue-like-character-sprites/agumon/hit/hit_01.png"],
			"sourceIndices": [36]
		},
		"death": {
			"fps": 5,
			"loop": false,
			"frames": ["rougue-like-character-sprites/agumon/death/death_01.png"],
			"sourceIndices": [34]
		},
		"victory": {
			"fps": 5,
			"loop": false,
			"frames": ["rougue-like-character-sprites/agumon/victory/victory_01.png"],
			"sourceIndices": [35]
		},
		"heal": {
			"fps": 8,
			"loop": false,
			"frames": [
				"rougue-like-character-sprites/agumon/heal/heal_01.png",
				"rougue-like-character-sprites/agumon/heal/heal_02.png",
				"rougue-like-character-sprites/agumon/heal/heal_03.png",
				"rougue-like-character-sprites/agumon/heal/heal_04.png",
				"rougue-like-character-sprites/agumon/heal/heal_05.png"
			],
			"sourceIndices": [
				115,
				118,
				108,
				85,
				50
			]
		},
		"projectile_dragon": {
			"fps": 12,
			"loop": false,
			"frames": ["rougue-like-character-sprites/agumon/projectiles/dragon/projectiles_dragon_01.png"],
			"sourceIndices": [104]
		},
		"effect_mega_blast": {
			"fps": 10,
			"loop": false,
			"frames": ["rougue-like-character-sprites/agumon/effects/mega-blast/effects_mega_blast_01.png", "rougue-like-character-sprites/agumon/effects/mega-blast/effects_mega_blast_02.png"],
			"sourceIndices": [39, 38]
		}
	},
	tamagotchiActions: {
		"idle": "validated in source; distribution/migration still pending",
		"heal": "validated in source; distribution/migration still pending",
		"eat": "unknown",
		"sleep": "unknown",
		"wake": "unknown",
		"play": "unknown",
		"clean": "unknown",
		"evolve": "unknown"
	},
	roguelike: {
		"walk_left": "validated",
		"walk_right": "validated",
		"walk_up": "adapted: 2-way movement using lateral walk with directional flip",
		"walk_down": "adapted: 2-way movement using lateral walk with directional flip",
		"attack_basic_1": "validated",
		"attack_basic_2": "validated with a separate dragon projectile",
		"attack_special": "adapted: basic_2 casting pose combined with effect_mega_blast",
		"hit": "validated",
		"death": "validated",
		"victory": "validated"
	},
	secondReview: "screenshots/sprite-review/agumon-m1-second-review.png",
	pendingReview: [{
		"sourceIndices": [33],
		"reason": "Contains two independent Mega Blast cells; crop and review separately before use."
	}, {
		"sourceIndices": [
			32,
			37,
			40,
			41,
			42,
			44,
			45,
			46,
			47,
			48,
			49,
			52,
			53,
			58,
			61,
			62,
			63,
			66,
			67,
			69,
			70,
			71,
			72,
			73,
			75,
			76,
			77,
			81,
			83,
			86,
			91,
			94,
			97,
			100,
			101,
			105,
			106,
			109,
			112,
			113,
			114,
			116,
			117,
			119,
			120,
			121,
			122,
			123,
			124,
			125,
			126,
			127,
			128,
			129,
			130,
			131,
			132
		],
		"reason": "Not used by a validated runtime action in this pass; retain as unknown or review individually."
	}]
} };
function getDigitalPathManifest(speciesId) {
	return DIGITAL_PATH_MANIFESTS[speciesId] ?? null;
}
/**
* Centralized deterministic Pseudo-Random Number Generator (PRNG) for runs.
* Uses Mulberry32 algorithm for fast, high-quality 32-bit PRNG with seed reproducibility.
*/
var RunRNG = class {
	state;
	seed;
	constructor(seed) {
		this.seed = typeof seed === "number" && !Number.isNaN(seed) ? seed >>> 0 : Math.random() * 4294967295 >>> 0;
		this.state = this.seed;
	}
	/**
	* Returns a pseudo-random float in range [0, 1).
	*/
	next() {
		let t = this.state += 1831565813;
		t = Math.imul(t ^ t >>> 15, t | 1);
		t ^= t + Math.imul(t ^ t >>> 7, t | 61);
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	}
	/**
	* Returns a random integer between min and max (inclusive).
	*/
	int(min, max) {
		return Math.floor(this.next() * (max - min + 1)) + min;
	}
	/**
	* Returns true with given probability [0, 1].
	*/
	chance(probability) {
		return this.next() < probability;
	}
	/**
	* Picks a random element from an array.
	*/
	pick(items) {
		if (items.length === 0) throw new Error("Cannot pick from empty array");
		return items[Math.floor(this.next() * items.length)];
	}
	/**
	* Shuffles an array in place or returns a shuffled copy.
	*/
	shuffle(array) {
		const copy = [...array];
		for (let i = copy.length - 1; i > 0; i--) {
			const j = Math.floor(this.next() * (i + 1));
			[copy[i], copy[j]] = [copy[j], copy[i]];
		}
		return copy;
	}
};
var MAX_ROOM_GENERATION_ATTEMPTS = 10;
var ROOM_WIDTH = 24;
var ROOM_HEIGHT = 16;
/**
* Validates with BFS if there is an unobstructed walkable path from start to exit.
*/
function isPathConnected(tiles, start, exit, width = ROOM_WIDTH, height = ROOM_HEIGHT) {
	if (tiles[start.y]?.[start.x] !== "floor" || tiles[exit.y]?.[exit.x] !== "floor") return false;
	const queue = [[start.x, start.y]];
	const visited = /* @__PURE__ */ new Set([`${start.x},${start.y}`]);
	const directions = [
		[0, 1],
		[0, -1],
		[1, 0],
		[-1, 0]
	];
	while (queue.length > 0) {
		const [cx, cy] = queue.shift();
		if (cx === exit.x && cy === exit.y) return true;
		for (const [dx, dy] of directions) {
			const nx = cx + dx;
			const ny = cy + dy;
			const key = `${nx},${ny}`;
			if (nx >= 0 && nx < width && ny >= 0 && ny < height && !visited.has(key) && tiles[ny]?.[nx] === "floor") {
				visited.add(key);
				queue.push([nx, ny]);
			}
		}
	}
	return false;
}
/**
* Generates a fallback guaranteed safe room layout.
*/
function createSafeFallbackRoom(id, index, kind, title, biome, floor, width = ROOM_WIDTH, height = ROOM_HEIGHT) {
	return {
		id,
		index,
		kind,
		title,
		biome,
		floor,
		width,
		height,
		tiles: Array.from({ length: height }, (_, y) => Array.from({ length: width }, (_, x) => x === 0 || x === width - 1 || y === 0 || y === height - 1 ? "wall" : "floor")),
		spawn: {
			x: 3,
			y: Math.floor(height / 2)
		},
		exit: {
			x: width - 4,
			y: Math.floor(height / 2)
		},
		enemies: [],
		props: []
	};
}
/**
* Generates a single finite room arena with guaranteed spawn -> exit connectivity.
*/
function generateSingleRoom(id, index, kind, seed, biome = "digital", floor = 1, customWidth, customHeight) {
	const rng = new RunRNG(seed ^ index * 7919 ^ floor * 3571);
	const width = customWidth ?? rng.int(22, 26);
	const height = customHeight ?? rng.int(14, 18);
	const roomTitles = {
		start: "Portal de Entrada",
		combat: `Setor de Segurança 0${index + 1}`,
		treasure: "Câmara de Suprimentos",
		elite: "Portão da Sentinela de Elite",
		event: "Terminal de Dados Antigo",
		rest: "Nó de Regeneração",
		shop: "Mercador Digital",
		boss: floor === 1 ? "Covil de Kuwagamon" : floor === 2 ? "Fenda do GeoGreymon" : "Núcleo Mecânico"
	};
	for (let attempt = 1; attempt <= MAX_ROOM_GENERATION_ATTEMPTS; attempt += 1) {
		const tiles = Array.from({ length: height }, (_, y) => Array.from({ length: width }, (_, x) => {
			if (x === 0 || x === width - 1 || y === 0 || y === height - 1) return "wall";
			return "floor";
		}));
		const spawn = {
			x: 3,
			y: Math.floor(height / 2)
		};
		const exit = {
			x: width - 4,
			y: Math.floor(height / 2)
		};
		const numPillars = rng.int(1, 4);
		for (let p = 0; p < numPillars; p += 1) {
			const px = rng.int(5, width - 6);
			const py = rng.chance(.5) ? rng.int(2, spawn.y - 2) : rng.int(spawn.y + 2, height - 3);
			if (py > 0 && py < height - 1) {
				tiles[py][px] = "wall";
				if (rng.chance(.5) && px + 1 < width - 5) tiles[py][px + 1] = "wall";
			}
		}
		for (let x = 1; x < width - 1; x += 1) {
			tiles[spawn.y][x] = "floor";
			if (spawn.y > 1) tiles[spawn.y - 1][x] = "floor";
			if (spawn.y < height - 2) tiles[spawn.y + 1][x] = "floor";
		}
		if (isPathConnected(tiles, spawn, exit, width, height)) {
			const enemies = [];
			if (kind === "combat") {
				const count = index <= 1 ? 2 : 3;
				for (let e = 0; e < count; e += 1) {
					const ex = rng.int(8, width - 6);
					const ey = rng.int(2, height - 3);
					if (tiles[ey][ex] === "floor" && (ex !== spawn.x || ey !== spawn.y)) {
						const isRanged = e === 1;
						enemies.push({
							id: `${id}_enemy_${e + 1}`,
							name: isRanged ? "Betamon Atirador" : "Gazimon Selvagem",
							kind: isRanged ? "ranged" : "melee",
							tileX: ex,
							tileY: ey,
							hp: 40 + index * 10 + (floor - 1) * 20,
							maxHp: 40 + index * 10 + (floor - 1) * 20,
							attack: 8 + index * 2 + (floor - 1) * 4,
							defense: 2 + (floor - 1) * 2,
							speed: isRanged ? 55 : 65,
							xpReward: 35 + floor * 10,
							coinReward: 15 + floor * 5
						});
					}
				}
			} else if (kind === "elite") {
				enemies.push({
					id: `${id}_elite_1`,
					name: "Sentinela Blindado de Elite",
					kind: "elite",
					tileX: Math.floor(width / 2),
					tileY: Math.floor(height / 2),
					hp: 130 + (floor - 1) * 50,
					maxHp: 130 + (floor - 1) * 50,
					attack: 16 + (floor - 1) * 5,
					defense: 6 + (floor - 1) * 2,
					speed: 70,
					xpReward: 100 + floor * 30,
					coinReward: 50 + floor * 20
				});
				enemies.push({
					id: `${id}_minion_1`,
					name: "Drone de Apoio",
					kind: "ranged",
					tileX: Math.floor(width / 2) - 4,
					tileY: Math.floor(height / 2) - 2,
					hp: 35 + (floor - 1) * 15,
					maxHp: 35 + (floor - 1) * 15,
					attack: 8 + (floor - 1) * 2,
					defense: 2,
					speed: 60,
					xpReward: 25,
					coinReward: 10
				});
			} else if (kind === "boss") {
				const bossName = floor === 1 ? "Kuwagamon da Fenda Digital" : floor === 2 ? "GeoGreymon Flamejante" : "MetalGreymon Mecânico";
				enemies.push({
					id: `${id}_boss_1`,
					name: bossName,
					kind: "boss",
					tileX: Math.floor(width / 2) + 2,
					tileY: Math.floor(height / 2),
					hp: 260 + (floor - 1) * 120,
					maxHp: 260 + (floor - 1) * 120,
					attack: 20 + (floor - 1) * 6,
					defense: 8 + (floor - 1) * 3,
					speed: 80,
					xpReward: 250 + floor * 80,
					coinReward: 120 + floor * 40
				});
			}
			const props = [];
			if (kind === "treasure") props.push({
				id: `${id}_chest_1`,
				type: "chest",
				tileX: Math.floor(width / 2),
				tileY: Math.floor(height / 2)
			});
			else if (kind === "event") props.push({
				id: `${id}_event_terminal`,
				type: "event_terminal",
				tileX: Math.floor(width / 2),
				tileY: Math.floor(height / 2)
			});
			else if (kind === "rest") props.push({
				id: `${id}_rest_site`,
				type: "rest_site",
				tileX: Math.floor(width / 2),
				tileY: Math.floor(height / 2)
			});
			else if (kind === "shop") props.push({
				id: `${id}_shop_terminal`,
				type: "shop_terminal",
				tileX: Math.floor(width / 2),
				tileY: Math.floor(height / 2)
			});
			return {
				id,
				index,
				kind,
				title: roomTitles[kind],
				biome,
				floor,
				width,
				height,
				tiles,
				spawn,
				exit,
				enemies,
				props
			};
		}
	}
	console.warn(`[RoomGenerator] Max attempts reached for ${id}. Using safe fallback room.`);
	return createSafeFallbackRoom(id, index, kind, roomTitles[kind], biome, floor, width, height);
}
/**
* Creates a finite, complete run definition containing 6 rooms with variety based on seed and floor.
*/
function createFiniteRun(seed, floorNumber = 1) {
	const rng = new RunRNG(seed ^ floorNumber * 10007);
	const biomes = [
		"digital",
		"fire",
		"storm",
		"ice"
	];
	const biome = biomes[(floorNumber - 1) % biomes.length];
	const sequence = [
		"start",
		"combat",
		rng.chance(.4) ? "event" : "combat",
		rng.pick([
			"treasure",
			"rest",
			"shop"
		]),
		"elite",
		"boss"
	];
	const generatedRooms = /* @__PURE__ */ new Set();
	const rooms = [];
	sequence.forEach((kind, index) => {
		const id = `room_${String(index + 1).padStart(2, "0")}`;
		if (generatedRooms.has(id)) return;
		generatedRooms.add(id);
		const room = generateSingleRoom(id, index, kind, seed, biome, floorNumber);
		rooms.push(room);
	});
	return {
		runId: `run_${seed}_f${floorNumber}_${Date.now()}`,
		seed,
		floor: floorNumber,
		totalRooms: rooms.length,
		rooms
	};
}
function isWalkable(map, x, y) {
	return map.tiles[y]?.[x] === "floor";
}
var REQUIRED_ANIMATIONS = [
	"idle",
	"walk_down",
	"walk_up",
	"walk_left",
	"walk_right",
	"attack_basic_1",
	"attack_basic_2",
	"attack_special",
	"hit",
	"death"
];
function resolveManifestAnimation(manifest, key) {
	const direct = manifest.animations[key];
	if (direct?.frames?.length) return direct;
	if (manifest.movementStyle === "2-way" || !manifest.animations.walk_up && !manifest.animations.walk_down) {
		if (key === "walk_up" || key === "walk_down") return manifest.animations.walk_right ?? manifest.animations.walk_left;
	}
	if (key === "attack_special" && !manifest.animations.attack_special) return manifest.animations.attack_basic_2 ?? manifest.animations.attack_basic_1;
}
function validateSpriteManifest(manifest) {
	if (!manifest.spriteReady || !manifest.id || !manifest.root) return false;
	return REQUIRED_ANIMATIONS.every((key) => {
		const animation = resolveManifestAnimation(manifest, key);
		return Boolean(animation?.frames?.length && animation.frames.every((frame) => typeof frame === "string" && frame.length > 0 && !frame.includes("..")) && animation.fps > 0);
	});
}
var UPGRADES_CATALOG = [
	{
		id: "flame_core",
		name: "Núcleo de Chamas",
		category: "attack",
		rarity: "common",
		description: "+20% de dano em todos os ataques e projéteis",
		icon: "🔥",
		attackMultiplier: .2
	},
	{
		id: "rapid_data",
		name: "Dados Acelerados",
		category: "utility",
		rarity: "common",
		description: "-20% de tempo de recarga nas habilidades",
		icon: "⚡",
		cooldownReduction: .2
	},
	{
		id: "recovery_chip",
		name: "Chip de Reparo Automático",
		category: "defense",
		rarity: "rare",
		description: "Recupera +15 HP automaticamente ao entrar em cada nova sala",
		icon: "💚",
		roomEnterHeal: 15
	},
	{
		id: "iron_skin",
		name: "Blindagem de Dados",
		category: "defense",
		rarity: "common",
		description: "+35 de Vida Máxima e recupera 35 HP imediatamente",
		icon: "🛡️",
		maxHpBonus: 35,
		healImmediate: 35
	},
	{
		id: "agile_steps",
		name: "Passos Cibernéticos",
		category: "speed",
		rarity: "common",
		description: "+20% de velocidade de movimentação pelo mapa",
		icon: "👟",
		speedMultiplier: .2
	},
	{
		id: "crit_module",
		name: "Módulo de Precisão Crítica",
		category: "attack",
		rarity: "rare",
		description: "+15% de chance de causar Golpe Crítico com 2x de Dano",
		icon: "🎯",
		critChanceBonus: .15
	},
	{
		id: "thorn_armor",
		name: "Barreira Espinhosa",
		category: "defense",
		rarity: "epic",
		description: "Reflete 30% do dano sofrido de volta aos inimigos atacantes",
		icon: "⚔️",
		thornPercent: .3
	},
	{
		id: "greed_sensor",
		name: "Scanner de Bits",
		category: "utility",
		rarity: "common",
		description: "+50% de moedas de ouro coletadas dos inimigos e salas",
		icon: "💰",
		coinMultiplier: .5
	}
];
/**
* Returns 3 random upgrades without duplicates, influenced by seed RNG.
*/
function getUpgradeChoices(rng, excludeIds = []) {
	const available = UPGRADES_CATALOG.filter((u) => !excludeIds.includes(u.id));
	const pool = available.length >= 3 ? available : UPGRADES_CATALOG;
	return rng.shuffle(pool).slice(0, 3);
}
/**
* Compiles a list of applied upgrades into active stat modifiers.
*/
function calculateModifiers(upgrades) {
	let attackMult = 1;
	let cooldownReductionTotal = 0;
	let maxHpBonus = 0;
	let speedMult = 1;
	let critChance = .05;
	let thornPercent = 0;
	let roomEnterHeal = 0;
	let coinMultiplier = 1;
	for (const up of upgrades) {
		if (up.attackMultiplier) attackMult += up.attackMultiplier;
		if (up.cooldownReduction) cooldownReductionTotal = Math.min(.6, cooldownReductionTotal + up.cooldownReduction);
		if (up.maxHpBonus) maxHpBonus += up.maxHpBonus;
		if (up.speedMultiplier) speedMult += up.speedMultiplier;
		if (up.critChanceBonus) critChance += up.critChanceBonus;
		if (up.thornPercent) thornPercent += up.thornPercent;
		if (up.roomEnterHeal) roomEnterHeal += up.roomEnterHeal;
		if (up.coinMultiplier) coinMultiplier += up.coinMultiplier;
	}
	return {
		attackMultiplier: attackMult,
		cooldownMultiplier: Math.max(.4, 1 - cooldownReductionTotal),
		maxHpBonus,
		speedMultiplier: speedMult,
		critChance: Math.min(.75, critChance),
		thornPercent,
		roomEnterHeal,
		coinMultiplier
	};
}
var TILE_SIZE = 48;
var PLAYER_SCALE = .65;
var DigitalPathGame = class {
	game = null;
	run = null;
	currentRoomIndex = 0;
	generatedRoomIds = /* @__PURE__ */ new Set();
	activeScene = null;
	async start(options) {
		if (this.game) this.stop();
		if (options.input.speciesId !== options.manifest.id) throw new Error("Sprite manifest does not match the current Digimon");
		if (!validateSpriteManifest(options.manifest)) throw new Error("Digital Path sprite manifest is not runtime-ready");
		const Phaser = await import("../_libs/phaser.mjs").then((n) => n.t);
		this.run = createFiniteRun(options.seed, options.floorNumber || 1);
		this.currentRoomIndex = 0;
		this.generatedRoomIds.clear();
		const self = this;
		const runDefinition = this.run;
		const manifest = options.manifest;
		const runRng = new RunRNG(options.seed);
		class DigitalPathScene extends Phaser.Scene {
			player;
			playerHp = 100;
			playerMaxHp = 100;
			playerXp = 0;
			playerCoins = 0;
			invulnerableUntil = 0;
			activeUpgrades = [];
			modifiers = calculateModifiers([]);
			itemsWon = {};
			isPaused = false;
			cursors;
			keys;
			activeRoom;
			roomTileObjects = [];
			exitDoorSprite = null;
			doorLabel = null;
			isDoorUnlocked = false;
			isTransitioning = false;
			isFinished = false;
			enemies = [];
			projectiles = [];
			enemyProjectiles = [];
			chestSprite = null;
			chestPrompt = null;
			isChestOpened = false;
			interactivePropSprite = null;
			interactivePropPrompt = null;
			isInteractivePropUsed = false;
			isPlayerAttacking = false;
			facing = "right";
			basic1CooldownUntil = 0;
			basic2CooldownUntil = 0;
			specialCooldownUntil = 0;
			bossTelegraphCircle = null;
			constructor() {
				super({ key: "digital-path-scene" });
			}
			preload() {
				this.load.image("tile_stone", "/maps/tilesets/stone.png");
				this.load.image("tile_dark_stone", "/maps/tilesets/dark_stone.png");
				this.load.image("tile_circuit", "/maps/tilesets/circuit.png");
				this.load.image("tile_storm_stone", "/maps/tilesets/storm_stone.png");
				this.load.image("tile_cracked", "/maps/tilesets/cracked.png");
				this.load.image("tile_lightning", "/maps/tilesets/lightning.png");
				this.load.image("tile_charged", "/maps/tilesets/charged.png");
				this.load.image("door_closed", "/maps/tilesets/door_closed.png");
				this.load.image("door_open", "/maps/tilesets/door_open.png");
				this.load.image("chest_closed", "/maps/tilesets/chest_closed.png");
				this.load.image("chest_open", "/maps/tilesets/chest_open.png");
				const loadedKeys = /* @__PURE__ */ new Set();
				for (const [animKey, anim] of Object.entries(manifest.animations)) {
					if (!anim?.frames) continue;
					anim.frames.forEach((framePath, index) => {
						const textureKey = `${manifest.id}_${animKey}_${index}`;
						if (!loadedKeys.has(textureKey)) {
							loadedKeys.add(textureKey);
							const url = framePath.startsWith("/") ? framePath : `/${framePath}`;
							this.load.image(textureKey, url);
						}
					});
				}
				for (let i = 0; i < 10; i++) {
					const pad = String(i).padStart(2, "0");
					this.load.image(`enemy_gabumon_idle_${i}`, `/sprites/animated/gabumon/idle/${pad}.png`);
					this.load.image(`enemy_veemon_idle_${i}`, `/sprites/animated/veemon/idle/${pad}.png`);
					this.load.image(`enemy_etemon_idle_${i}`, `/sprites/animated/etemon/idle/${pad}.png`);
				}
			}
			create() {
				this.isFinished = false;
				this.isTransitioning = false;
				this.playerHp = options.input.stats.health || 100;
				this.playerMaxHp = options.input.stats.health || 100;
				this.playerXp = 0;
				this.playerCoins = 0;
				this.cameras.main.setBackgroundColor("#080c14");
				this.registerAnimations();
				if (this.input.keyboard) {
					this.cursors = this.input.keyboard.createCursorKeys();
					this.keys = {
						W: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
						A: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
						S: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
						D: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
						J: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J),
						K: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K),
						L: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L),
						Space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
						E: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
						Esc: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
					};
					this.keys.Esc.on("down", () => this.togglePause());
				}
				const defaultTexture = resolveManifestAnimation(manifest, "idle")?.frames?.[0] ? `${manifest.id}_idle_0` : "";
				this.player = this.add.sprite(0, 0, defaultTexture);
				this.player.setScale(PLAYER_SCALE);
				this.player.setOrigin(.5, .85);
				this.player.setDepth(10);
				if (this.anims.exists("player-idle")) this.player.play("player-idle");
				this.cameras.main.startFollow(this.player, true, .12, .12);
				this.cameras.main.setZoom(1.15);
				self.activeScene = this;
				this.loadRoom(self.currentRoomIndex);
			}
			registerAnimations() {
				const createAnim = (key, manifestKey, loop) => {
					const animDef = manifest.animations[manifestKey];
					if (!animDef?.frames?.length) return;
					const frames = animDef.frames.map((_, i) => ({ key: `${manifest.id}_${manifestKey}_${i}` }));
					if (!this.anims.exists(key)) this.anims.create({
						key,
						frames,
						frameRate: animDef.fps || 8,
						repeat: loop ? -1 : 0
					});
				};
				createAnim("player-idle", "idle", true);
				createAnim("player-walk-left", "walk_left", true);
				createAnim("player-walk-right", "walk_right", true);
				createAnim("player-attack-basic-1", "attack_basic_1", false);
				createAnim("player-attack-basic-2", "attack_basic_2", false);
				createAnim("player-hit", "hit", false);
				createAnim("player-death", "death", false);
				createAnim("player-victory", "victory", false);
				if (!this.anims.exists("enemy-gabumon-idle")) this.anims.create({
					key: "enemy-gabumon-idle",
					frames: Array.from({ length: 10 }, (_, i) => ({ key: `enemy_gabumon_idle_${i}` })),
					frameRate: 7,
					repeat: -1
				});
				if (!this.anims.exists("enemy-veemon-idle")) this.anims.create({
					key: "enemy-veemon-idle",
					frames: Array.from({ length: 10 }, (_, i) => ({ key: `enemy_veemon_idle_${i}` })),
					frameRate: 7,
					repeat: -1
				});
				if (!this.anims.exists("enemy-etemon-idle")) this.anims.create({
					key: "enemy-etemon-idle",
					frames: Array.from({ length: 10 }, (_, i) => ({ key: `enemy_etemon_idle_${i}` })),
					frameRate: 7,
					repeat: -1
				});
			}
			/**
			* Clean all entities of the active room to prevent memory leaks and ghost objects.
			*/
			cleanCurrentRoom() {
				for (const obj of this.roomTileObjects) obj.destroy();
				this.roomTileObjects = [];
				if (this.exitDoorSprite) {
					this.exitDoorSprite.destroy();
					this.exitDoorSprite = null;
				}
				this.doorLabel = null;
				if (this.chestSprite) {
					this.chestSprite.destroy();
					this.chestSprite = null;
				}
				this.chestPrompt = null;
				if (this.interactivePropSprite) {
					this.interactivePropSprite.destroy();
					this.interactivePropSprite = null;
				}
				this.interactivePropPrompt = null;
				this.isInteractivePropUsed = false;
				for (const enemy of this.enemies) {
					enemy.hpBar.destroy();
					enemy.sprite.destroy();
				}
				this.enemies = [];
				for (const proj of this.projectiles) proj.sprite.destroy();
				this.projectiles = [];
				for (const ep of this.enemyProjectiles) ep.sprite.destroy();
				this.enemyProjectiles = [];
				if (this.bossTelegraphCircle) {
					this.bossTelegraphCircle.destroy();
					this.bossTelegraphCircle = null;
				}
			}
			/**
			* Load a specific finite room arena.
			*/
			loadRoom(roomIndex) {
				if (!runDefinition) return;
				this.cleanCurrentRoom();
				const room = runDefinition.rooms[roomIndex];
				this.activeRoom = room;
				self.generatedRoomIds.add(room.id);
				if (this.modifiers.roomEnterHeal > 0) this.playerHp = Math.min(this.playerMaxHp, this.playerHp + this.modifiers.roomEnterHeal);
				const roomWidthPx = room.width * TILE_SIZE;
				const roomHeightPx = room.height * TILE_SIZE;
				this.cameras.main.setBounds(0, 0, roomWidthPx, roomHeightPx);
				for (let y = 0; y < room.height; y += 1) for (let x = 0; x < room.width; x += 1) {
					const posX = x * TILE_SIZE;
					const posY = y * TILE_SIZE;
					if (room.tiles[y][x] === "floor") {
						const isAccent = (x * 3 + y * 5) % 7 === 0;
						let textureKey = "tile_stone";
						if (room.biome === "fire") textureKey = isAccent ? "tile_circuit" : "tile_dark_stone";
						else if (room.biome === "storm") textureKey = isAccent ? "tile_lightning" : "tile_storm_stone";
						else if (room.biome === "ice") textureKey = isAccent ? "tile_charged" : "tile_storm_stone";
						else textureKey = isAccent ? "tile_circuit" : "tile_stone";
						const tile = this.add.image(posX + TILE_SIZE / 2, posY + TILE_SIZE / 2, textureKey);
						tile.setDisplaySize(TILE_SIZE, TILE_SIZE);
						tile.setDepth(0);
						if (!isAccent && (x + y) % 2 === 0) tile.setTint(room.biome === "fire" ? 16764074 : 14540253);
						this.roomTileObjects.push(tile);
					} else {
						const wallKey = room.biome === "fire" ? "tile_cracked" : "tile_dark_stone";
						const wall = this.add.image(posX + TILE_SIZE / 2, posY + TILE_SIZE / 2, wallKey);
						wall.setDisplaySize(TILE_SIZE, TILE_SIZE);
						wall.setDepth(2);
						this.roomTileObjects.push(wall);
						if (y + 1 < room.height && room.tiles[y + 1][x] === "floor") {
							const rim = this.add.graphics();
							rim.fillStyle(room.biome === "fire" ? 16729088 : 61695, .4);
							rim.fillRect(posX, posY + TILE_SIZE - 4, TILE_SIZE, 4);
							rim.setDepth(3);
							this.roomTileObjects.push(rim);
						}
					}
				}
				this.player.x = room.spawn.x * TILE_SIZE + TILE_SIZE / 2;
				this.player.y = room.spawn.y * TILE_SIZE + TILE_SIZE / 2;
				const spawnRing = this.add.graphics();
				spawnRing.lineStyle(2, 65416, .8);
				spawnRing.strokeCircle(this.player.x, this.player.y, 22);
				spawnRing.setDepth(1);
				this.roomTileObjects.push(spawnRing);
				const exitX = room.exit.x * TILE_SIZE + TILE_SIZE / 2;
				const exitY = room.exit.y * TILE_SIZE + TILE_SIZE / 2;
				const hasEnemies = room.enemies.length > 0;
				this.isDoorUnlocked = !hasEnemies;
				this.exitDoorSprite = this.add.sprite(exitX, exitY, this.isDoorUnlocked ? "door_open" : "door_closed");
				this.exitDoorSprite.setDisplaySize(TILE_SIZE, TILE_SIZE * 1.2);
				this.exitDoorSprite.setDepth(4);
				this.doorLabel = this.add.text(exitX, exitY - 32, this.isDoorUnlocked ? "SAIDA (ABERTA)" : "PORTAO TRANCADO", {
					fontSize: "11px",
					color: this.isDoorUnlocked ? "#00ffaa" : "#ff4444",
					fontStyle: "bold",
					stroke: "#000000",
					strokeThickness: 3
				}).setOrigin(.5);
				this.doorLabel.setDepth(5);
				this.roomTileObjects.push(this.doorLabel);
				this.isChestOpened = false;
				this.isInteractivePropUsed = false;
				const centerX = Math.floor(room.width / 2) * TILE_SIZE + TILE_SIZE / 2;
				const centerY = Math.floor(room.height / 2) * TILE_SIZE + TILE_SIZE / 2;
				if (room.kind === "treasure") {
					this.chestSprite = this.add.sprite(centerX, centerY, "chest_closed");
					this.chestSprite.setDisplaySize(TILE_SIZE, TILE_SIZE);
					this.chestSprite.setDepth(4);
					this.chestPrompt = this.add.text(centerX, centerY - 26, "[E] ABRIR BAÚ", {
						fontSize: "10px",
						color: "#ffdd44",
						fontStyle: "bold",
						stroke: "#000000",
						strokeThickness: 3
					}).setOrigin(.5);
					this.chestPrompt.setDepth(5);
					this.roomTileObjects.push(this.chestPrompt);
				} else if (room.kind === "event") {
					this.interactivePropSprite = this.add.sprite(centerX, centerY, "tile_circuit");
					this.interactivePropSprite.setDisplaySize(TILE_SIZE * 1.2, TILE_SIZE * 1.2);
					this.interactivePropSprite.setDepth(4);
					this.interactivePropSprite.setTint(61695);
					this.interactivePropPrompt = this.add.text(centerX, centerY - 28, "[E] TERMINAL DE DADOS", {
						fontSize: "10px",
						color: "#00f0ff",
						fontStyle: "bold",
						stroke: "#000000",
						strokeThickness: 3
					}).setOrigin(.5);
					this.interactivePropPrompt.setDepth(5);
					this.roomTileObjects.push(this.interactivePropPrompt);
				} else if (room.kind === "rest") {
					this.interactivePropSprite = this.add.sprite(centerX, centerY, "tile_charged");
					this.interactivePropSprite.setDisplaySize(TILE_SIZE * 1.2, TILE_SIZE * 1.2);
					this.interactivePropSprite.setDepth(4);
					this.interactivePropSprite.setTint(65416);
					this.interactivePropPrompt = this.add.text(centerX, centerY - 28, "[E] NÓ DE REGENERAÇÃO", {
						fontSize: "10px",
						color: "#00ff88",
						fontStyle: "bold",
						stroke: "#000000",
						strokeThickness: 3
					}).setOrigin(.5);
					this.interactivePropPrompt.setDepth(5);
					this.roomTileObjects.push(this.interactivePropPrompt);
				} else if (room.kind === "shop") {
					this.interactivePropSprite = this.add.sprite(centerX, centerY, "tile_circuit");
					this.interactivePropSprite.setDisplaySize(TILE_SIZE * 1.2, TILE_SIZE * 1.2);
					this.interactivePropSprite.setDepth(4);
					this.interactivePropSprite.setTint(16766720);
					this.interactivePropPrompt = this.add.text(centerX, centerY - 28, "[E] MERCADOR DIGITAL", {
						fontSize: "10px",
						color: "#ffd700",
						fontStyle: "bold",
						stroke: "#000000",
						strokeThickness: 3
					}).setOrigin(.5);
					this.interactivePropPrompt.setDepth(5);
					this.roomTileObjects.push(this.interactivePropPrompt);
				}
				for (const enemyDef of room.enemies) {
					const ex = enemyDef.tileX * TILE_SIZE + TILE_SIZE / 2;
					const ey = enemyDef.tileY * TILE_SIZE + TILE_SIZE / 2;
					let animKey = "enemy-gabumon-idle";
					let scale = .65;
					let tint = 16777215;
					if (enemyDef.kind === "boss") {
						animKey = "enemy-etemon-idle";
						scale = .95;
						tint = 16737894;
					} else if (enemyDef.kind === "elite") {
						animKey = "enemy-veemon-idle";
						scale = .8;
						tint = 16755268;
					} else if (enemyDef.id.includes("2")) {
						animKey = "enemy-veemon-idle";
						scale = .65;
						tint = 8965375;
					}
					const sprite = this.add.sprite(ex, ey, animKey);
					sprite.setScale(scale);
					sprite.setOrigin(.5, .85);
					sprite.setDepth(9);
					sprite.setTint(tint);
					if (this.anims.exists(animKey)) sprite.play(animKey);
					const hpBar = this.add.graphics();
					hpBar.setDepth(11);
					this.enemies.push({
						id: enemyDef.id,
						name: enemyDef.name,
						kind: enemyDef.kind,
						sprite,
						hpBar,
						currentHp: enemyDef.hp,
						maxHp: enemyDef.maxHp,
						attack: enemyDef.attack,
						defense: enemyDef.defense,
						speed: enemyDef.speed,
						xpReward: enemyDef.xpReward,
						coinReward: enemyDef.coinReward,
						isAttacking: false,
						attackCooldown: 0,
						state: "idle"
					});
				}
				options.onRoomChange?.(roomIndex + 1, runDefinition.totalRooms, room.title, room.biome, room.floor, room.kind === "boss");
				options.onPlayerStatsChange?.({
					currentHp: this.playerHp,
					maxHp: this.playerMaxHp,
					xp: this.playerXp,
					coins: this.playerCoins
				});
				const banner = this.add.text(this.player.x, this.player.y - 60, `SALA ${roomIndex + 1}/${runDefinition.totalRooms}: ${room.title.toUpperCase()}`, {
					fontSize: "14px",
					color: "#00f0ff",
					fontStyle: "bold",
					stroke: "#000000",
					strokeThickness: 4
				}).setOrigin(.5).setDepth(20);
				this.tweens.add({
					targets: banner,
					y: banner.y - 20,
					alpha: 0,
					duration: 1800,
					onComplete: () => banner.destroy()
				});
			}
			update(time, delta) {
				if (this.isFinished || this.isTransitioning || this.isPaused) return;
				const distToDoor = this.exitDoorSprite ? Phaser.Math.Distance.Between(this.player.x, this.player.y, this.exitDoorSprite.x, this.exitDoorSprite.y) : 999;
				if (this.isDoorUnlocked && distToDoor < 45) {
					this.advanceToNextRoom();
					return;
				}
				if (this.chestSprite && !this.isChestOpened) {
					if (Phaser.Math.Distance.Between(this.player.x, this.player.y, this.chestSprite.x, this.chestSprite.y) < 48 && this.keys?.E?.isDown) this.openChest();
				}
				if (this.interactivePropSprite && !this.isInteractivePropUsed) {
					if (Phaser.Math.Distance.Between(this.player.x, this.player.y, this.interactivePropSprite.x, this.interactivePropSprite.y) < 48 && this.keys?.E?.isDown) {
						if (this.activeRoom.kind === "event") this.openEvent();
						else if (this.activeRoom.kind === "rest") this.openRest();
						else if (this.activeRoom.kind === "shop") this.openShop();
					}
				}
				this.handlePlayerAttacks(time);
				this.handlePlayerMovement(delta);
				this.updateProjectiles(delta);
				this.updateEnemyProjectiles(delta);
				this.updateEnemies(time, delta);
			}
			togglePause() {
				this.isPaused = !this.isPaused;
				options.onPauseToggle?.(this.isPaused);
			}
			healPlayer(amount) {
				this.playerHp = Math.min(this.playerMaxHp, this.playerHp + amount);
				this.showFloatingText(this.player.x, this.player.y - 35, `+${amount} HP!`, "#00ff88");
				options.onPlayerStatsChange?.({
					currentHp: this.playerHp,
					maxHp: this.playerMaxHp,
					xp: this.playerXp,
					coins: this.playerCoins
				});
			}
			addCoins(amount) {
				this.playerCoins += amount;
				this.showFloatingText(this.player.x, this.player.y - 35, `+${amount} BITS!`, "#ffd700");
				options.onPlayerStatsChange?.({
					currentHp: this.playerHp,
					maxHp: this.playerMaxHp,
					xp: this.playerXp,
					coins: this.playerCoins
				});
			}
			handlePlayerAttacks(time) {
				if (this.isPlayerAttacking) return;
				if ((this.keys?.J?.isDown || this.keys?.Space?.isDown) && time >= this.basic1CooldownUntil) {
					this.performBasicAttack1(time);
					return;
				}
				if (this.keys?.K?.isDown && time >= this.basic2CooldownUntil) {
					this.performBasicAttack2(time);
					return;
				}
				if (this.keys?.L?.isDown && time >= this.specialCooldownUntil) {
					this.performSpecialAttack(time);
					return;
				}
			}
			performBasicAttack1(time) {
				this.isPlayerAttacking = true;
				this.basic1CooldownUntil = time + 450;
				options.onCooldownChange?.("basic_1", 450, 450);
				if (this.anims.exists("player-attack-basic-1")) this.player.play("player-attack-basic-1");
				const attackRange = 64;
				const attackOriginX = this.player.x + (this.facing === "right" ? 32 : -32);
				const attackOriginY = this.player.y - 16;
				const slash = this.add.graphics();
				slash.lineStyle(3, 16755200, .8);
				slash.strokeCircle(attackOriginX, attackOriginY, 20);
				slash.setDepth(15);
				this.tweens.add({
					targets: slash,
					alpha: 0,
					scale: 1.4,
					duration: 150,
					onComplete: () => slash.destroy()
				});
				for (const enemy of this.enemies) {
					if (enemy.state === "dead") continue;
					if (Phaser.Math.Distance.Between(attackOriginX, attackOriginY, enemy.sprite.x, enemy.sprite.y - 20) <= attackRange) this.damageEnemy(enemy, 24);
				}
				this.player.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
					this.isPlayerAttacking = false;
					if (this.anims.exists("player-idle")) this.player.play("player-idle");
				});
			}
			performBasicAttack2(time) {
				this.isPlayerAttacking = true;
				this.basic2CooldownUntil = time + 800;
				options.onCooldownChange?.("basic_2", 800, 800);
				if (this.anims.exists("player-attack-basic-2")) this.player.play("player-attack-basic-2");
				const projX = this.player.x + (this.facing === "right" ? 28 : -28);
				const projY = this.player.y - 20;
				const vx = this.facing === "right" ? 280 : -280;
				let projTexture = `${manifest.id}_projectile_dragon_0`;
				if (!this.textures.exists(projTexture)) projTexture = `${manifest.id}_attack_basic_2_0`;
				const projSprite = this.add.sprite(projX, projY, projTexture);
				projSprite.setScale(.7);
				projSprite.setFlipX(this.facing === "left");
				projSprite.setDepth(12);
				this.projectiles.push({
					sprite: projSprite,
					vx,
					vy: 0,
					damage: 32,
					distanceTraveled: 0,
					maxDistance: 380
				});
				this.player.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
					this.isPlayerAttacking = false;
					if (this.anims.exists("player-idle")) this.player.play("player-idle");
				});
			}
			performSpecialAttack(time) {
				this.isPlayerAttacking = true;
				this.specialCooldownUntil = time + 3e3;
				options.onCooldownChange?.("special", 3e3, 3e3);
				if (this.anims.exists("player-attack-basic-2")) this.player.play("player-attack-basic-2");
				this.cameras.main.shake(250, .01);
				const blastX = this.player.x;
				const blastY = this.player.y - 20;
				const blastGlow = this.add.graphics();
				blastGlow.fillStyle(16724736, .5);
				blastGlow.fillCircle(blastX, blastY, 90);
				blastGlow.lineStyle(4, 16776960, .9);
				blastGlow.strokeCircle(blastX, blastY, 95);
				blastGlow.setDepth(14);
				this.tweens.add({
					targets: blastGlow,
					scale: 1.3,
					alpha: 0,
					duration: 350,
					onComplete: () => blastGlow.destroy()
				});
				for (const enemy of this.enemies) {
					if (enemy.state === "dead") continue;
					if (Phaser.Math.Distance.Between(blastX, blastY, enemy.sprite.x, enemy.sprite.y - 20) <= 110) this.damageEnemy(enemy, 65);
				}
				this.player.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
					this.isPlayerAttacking = false;
					if (this.anims.exists("player-idle")) this.player.play("player-idle");
				});
			}
			updateProjectiles(delta) {
				const dt = delta / 1e3;
				for (let i = this.projectiles.length - 1; i >= 0; i--) {
					const proj = this.projectiles[i];
					const stepX = proj.vx * dt;
					proj.sprite.x += stepX;
					proj.distanceTraveled += Math.abs(stepX);
					const tileX = Math.floor(proj.sprite.x / TILE_SIZE);
					const tileY = Math.floor(proj.sprite.y / TILE_SIZE);
					const hitWall = !isWalkable({ tiles: this.activeRoom.tiles }, tileX, tileY);
					let hitEnemy = false;
					for (const enemy of this.enemies) {
						if (enemy.state === "dead") continue;
						if (Phaser.Math.Distance.Between(proj.sprite.x, proj.sprite.y, enemy.sprite.x, enemy.sprite.y - 20) < 32) {
							this.damageEnemy(enemy, proj.damage);
							hitEnemy = true;
							break;
						}
					}
					if (hitWall || hitEnemy || proj.distanceTraveled >= proj.maxDistance) {
						const burst = this.add.graphics();
						burst.fillStyle(16755200, .7);
						burst.fillCircle(proj.sprite.x, proj.sprite.y, 14);
						burst.setDepth(13);
						this.tweens.add({
							targets: burst,
							alpha: 0,
							scale: 1.5,
							duration: 100,
							onComplete: () => burst.destroy()
						});
						proj.sprite.destroy();
						this.projectiles.splice(i, 1);
					}
				}
			}
			damageEnemy(enemy, baseDamage) {
				const isCrit = Math.random() < this.modifiers.critChance;
				const rawDamage = Math.round(baseDamage * this.modifiers.attackMultiplier * (isCrit ? 2 : 1));
				const finalDamage = Math.max(1, rawDamage - enemy.defense);
				enemy.currentHp -= finalDamage;
				enemy.sprite.setTintFill(16777215);
				this.time.delayedCall(90, () => {
					if (enemy.sprite.active) {
						enemy.sprite.clearTint();
						if (enemy.isEnraged) enemy.sprite.setTint(16720418);
						else if (enemy.name.includes("Etemon") || enemy.name.includes("Kuwagamon")) enemy.sprite.setTint(16737894);
					}
				});
				this.showFloatingText(enemy.sprite.x, enemy.sprite.y - 45, isCrit ? `CRÍTICO! -${finalDamage}` : `-${finalDamage}`, isCrit ? "#ffd700" : "#ffffff");
				if (enemy.currentHp <= 0) this.killEnemy(enemy);
			}
			killEnemy(enemy) {
				enemy.state = "dead";
				enemy.hpBar.clear();
				const xpEarned = enemy.xpReward;
				const coinsEarned = Math.round(enemy.coinReward * this.modifiers.coinMultiplier);
				this.playerXp += xpEarned;
				this.playerCoins += coinsEarned;
				options.onPlayerStatsChange?.({
					currentHp: this.playerHp,
					maxHp: this.playerMaxHp,
					xp: this.playerXp,
					coins: this.playerCoins,
					isBossFighting: false
				});
				if (enemy.kind === "elite") {
					const choices = getUpgradeChoices(runRng, this.activeUpgrades.map((u) => u.id));
					options.onTriggerUpgradeDraft?.(choices, (up) => this.applyUpgrade(up));
				}
				this.tweens.add({
					targets: enemy.sprite,
					alpha: 0,
					scale: .1,
					angle: 180,
					duration: 350,
					onComplete: () => {
						enemy.sprite.destroy();
						enemy.hpBar.destroy();
						this.checkRoomCompletion();
					}
				});
			}
			checkRoomCompletion() {
				if (this.enemies.filter((e) => e.state !== "dead").length === 0 && !this.isDoorUnlocked) {
					this.isDoorUnlocked = true;
					if (this.exitDoorSprite) this.exitDoorSprite.setTexture("door_open");
					if (this.doorLabel) {
						this.doorLabel.setText("SAIDA (ABERTA)");
						this.doorLabel.setColor("#00ffaa");
					}
					const clearBanner = this.add.text(this.cameras.main.midPoint.x, this.cameras.main.midPoint.y - 50, "SETOR LIMPO! PORTÃO DESBLOQUEADO", {
						fontSize: "18px",
						color: "#00ff88",
						fontStyle: "bold",
						stroke: "#000000",
						strokeThickness: 4
					}).setOrigin(.5).setDepth(20);
					this.tweens.add({
						targets: clearBanner,
						scale: {
							from: .6,
							to: 1.1
						},
						duration: 400,
						yoyo: true,
						repeat: 1,
						onComplete: () => clearBanner.destroy()
					});
				}
			}
			openChest() {
				this.isChestOpened = true;
				if (this.chestSprite) this.chestSprite.setTexture("chest_open");
				if (this.chestPrompt) {
					this.chestPrompt.destroy();
					this.chestPrompt = null;
				}
				this.playerHp = Math.min(this.playerMaxHp, this.playerHp + 30);
				this.playerCoins += 40;
				this.playerXp += 20;
				options.onPlayerStatsChange?.({
					currentHp: this.playerHp,
					maxHp: this.playerMaxHp,
					xp: this.playerXp,
					coins: this.playerCoins
				});
				const choices = getUpgradeChoices(runRng, this.activeUpgrades.map((u) => u.id));
				options.onTriggerUpgradeDraft?.(choices, (selectedUpgrade) => {
					this.applyUpgrade(selectedUpgrade);
				});
			}
			openEvent() {
				this.isInteractivePropUsed = true;
				if (this.interactivePropPrompt) {
					this.interactivePropPrompt.destroy();
					this.interactivePropPrompt = null;
				}
				options.onTriggerEventModal?.([
					{
						id: "heal",
						title: "Recuperar Dados",
						description: "Nanobots reparam seu corpo digital restaurando +35 de Vida.",
						type: "heal"
					},
					{
						id: "coins",
						title: "Descarregar Bits",
						description: "Extrai arquivos criptografados rendendo +50 Moedas de Ouro.",
						type: "coins"
					},
					{
						id: "gamble",
						title: "Sobrecarga Experimental",
						description: "Arrisca integridade (-20 HP) em troca de um Módulo Raro de Combate.",
						type: "gamble"
					}
				], (choiceIdx) => {
					if (choiceIdx === 0) {
						this.playerHp = Math.min(this.playerMaxHp, this.playerHp + 35);
						this.showFloatingText(this.player.x, this.player.y - 35, "+35 HP!", "#00ff88");
					} else if (choiceIdx === 1) {
						this.playerCoins += 50;
						this.showFloatingText(this.player.x, this.player.y - 35, "+50 MOEDAS!", "#ffd700");
					} else if (choiceIdx === 2) {
						this.playerHp = Math.max(1, this.playerHp - 20);
						const choices = getUpgradeChoices(runRng, this.activeUpgrades.map((u) => u.id));
						if (choices.length > 0) this.applyUpgrade(choices[0]);
					}
					options.onPlayerStatsChange?.({
						currentHp: this.playerHp,
						maxHp: this.playerMaxHp,
						xp: this.playerXp,
						coins: this.playerCoins
					});
				});
			}
			openRest() {
				this.isInteractivePropUsed = true;
				if (this.interactivePropPrompt) {
					this.interactivePropPrompt.destroy();
					this.interactivePropPrompt = null;
				}
				options.onTriggerRestModal?.(() => {
					this.playerHp = Math.min(this.playerMaxHp, this.playerHp + 50);
					this.showFloatingText(this.player.x, this.player.y - 35, "+50 HP RECUPERADO!", "#00ff88");
					options.onPlayerStatsChange?.({
						currentHp: this.playerHp,
						maxHp: this.playerMaxHp,
						xp: this.playerXp,
						coins: this.playerCoins
					});
				}, () => {
					this.modifiers.attackMultiplier += .15;
					this.showFloatingText(this.player.x, this.player.y - 35, "+15% DANO TEMPORÁRIO!", "#ff8800");
				});
			}
			openShop() {
				options.onTriggerShopModal?.([
					{
						id: "shop_potion",
						name: "Cápsula de Reparo",
						price: 30,
						description: "Recupera +40 de Vida imediatamente",
						icon: "🧪",
						type: "heal"
					},
					{
						id: "shop_meat",
						name: "Carne Digital",
						price: 40,
						description: "Envia +1 Carne Digital para o inventário do Tamagotchi!",
						icon: "🍖",
						type: "tamagotchi_item",
						tamagotchiItemId: "carne_digital"
					},
					{
						id: "shop_fruit",
						name: "Fruta Digital",
						price: 35,
						description: "Envia +1 Fruta Digital para o inventário do Tamagotchi!",
						icon: "🍎",
						type: "tamagotchi_item",
						tamagotchiItemId: "fruta_digital"
					},
					{
						id: "shop_upgrade",
						name: "Chip Misterioso de Combate",
						price: 55,
						description: "Desbloqueia um upgrade de combate aleatório",
						icon: "💾",
						type: "upgrade"
					}
				], (item) => {
					if (this.playerCoins < item.price) return false;
					this.playerCoins -= item.price;
					if (item.type === "heal") {
						this.playerHp = Math.min(this.playerMaxHp, this.playerHp + 40);
						this.showFloatingText(this.player.x, this.player.y - 35, "+40 HP!", "#00ff88");
					} else if (item.type === "tamagotchi_item" && item.tamagotchiItemId) {
						this.itemsWon[item.tamagotchiItemId] = (this.itemsWon[item.tamagotchiItemId] || 0) + 1;
						this.showFloatingText(this.player.x, this.player.y - 35, `+1 ${item.name} SALVO!`, "#ffd700");
					} else if (item.type === "upgrade") {
						const available = getUpgradeChoices(runRng, this.activeUpgrades.map((u) => u.id));
						if (available.length > 0) this.applyUpgrade(available[0]);
					}
					options.onPlayerStatsChange?.({
						currentHp: this.playerHp,
						maxHp: this.playerMaxHp,
						xp: this.playerXp,
						coins: this.playerCoins
					});
					return true;
				}, () => {});
			}
			applyUpgrade(upgrade) {
				this.activeUpgrades.push(upgrade);
				this.modifiers = calculateModifiers(this.activeUpgrades);
				if (upgrade.maxHpBonus) this.playerMaxHp += upgrade.maxHpBonus;
				if (upgrade.healImmediate) this.playerHp = Math.min(this.playerMaxHp, this.playerHp + upgrade.healImmediate);
				options.onActiveUpgradesChange?.(this.activeUpgrades);
				options.onPlayerStatsChange?.({
					currentHp: this.playerHp,
					maxHp: this.playerMaxHp,
					xp: this.playerXp,
					coins: this.playerCoins
				});
				this.showFloatingText(this.player.x, this.player.y - 45, `+ UPGRADE: ${upgrade.name.toUpperCase()}`, "#ffff00");
			}
			showFloatingText(x, y, text, color = "#ffffff") {
				const label = this.add.text(x, y, text, {
					fontSize: "12px",
					color,
					fontStyle: "bold",
					stroke: "#000000",
					strokeThickness: 3
				}).setOrigin(.5).setDepth(25);
				this.tweens.add({
					targets: label,
					y: y - 28,
					alpha: 0,
					duration: 1e3,
					onComplete: () => label.destroy()
				});
			}
			spawnEnemyProjectile(x, y, targetX, targetY, damage) {
				const angle = Phaser.Math.Angle.Between(x, y, targetX, targetY);
				const speed = 190;
				const gfx = this.add.graphics();
				gfx.fillStyle(13369599, .9);
				gfx.fillCircle(0, 0, 7);
				gfx.lineStyle(2, 16711884, .8);
				gfx.strokeCircle(0, 0, 7);
				gfx.x = x;
				gfx.y = y;
				gfx.setDepth(12);
				this.enemyProjectiles.push({
					sprite: gfx,
					vx: Math.cos(angle) * speed,
					vy: Math.sin(angle) * speed,
					damage,
					distanceTraveled: 0,
					maxDistance: 450
				});
			}
			updateEnemyProjectiles(delta) {
				const dt = delta / 1e3;
				for (let i = this.enemyProjectiles.length - 1; i >= 0; i--) {
					const proj = this.enemyProjectiles[i];
					proj.sprite.x += proj.vx * dt;
					proj.sprite.y += proj.vy * dt;
					proj.distanceTraveled += Math.hypot(proj.vx * dt, proj.vy * dt);
					const tileX = Math.floor(proj.sprite.x / TILE_SIZE);
					const tileY = Math.floor(proj.sprite.y / TILE_SIZE);
					const hitWall = !isWalkable({ tiles: this.activeRoom.tiles }, tileX, tileY);
					const distToPlayer = Phaser.Math.Distance.Between(proj.sprite.x, proj.sprite.y, this.player.x, this.player.y);
					let hitPlayer = false;
					if (distToPlayer < 24) {
						hitPlayer = true;
						this.damagePlayer(proj.damage);
					}
					if (hitWall || hitPlayer || proj.distanceTraveled >= proj.maxDistance) {
						proj.sprite.destroy();
						this.enemyProjectiles.splice(i, 1);
					}
				}
			}
			updateEnemies(time, delta) {
				const dt = delta / 1e3;
				for (const enemy of this.enemies) {
					if (enemy.state === "dead" || !enemy.sprite.active) continue;
					enemy.hpBar.clear();
					const barWidth = enemy.kind === "boss" ? 54 : 36;
					const barHeight = enemy.kind === "boss" ? 6 : 4;
					const barX = enemy.sprite.x - barWidth / 2;
					const barY = enemy.sprite.y - (enemy.kind === "boss" ? 68 : 54);
					enemy.hpBar.fillStyle(3342336, .8);
					enemy.hpBar.fillRect(barX, barY, barWidth, barHeight);
					const hpRatio = Phaser.Math.Clamp(enemy.currentHp / enemy.maxHp, 0, 1);
					enemy.hpBar.fillStyle(enemy.isEnraged ? 16711680 : 16724787, 1);
					enemy.hpBar.fillRect(barX, barY, barWidth * hpRatio, barHeight);
					if (enemy.kind === "boss") {
						if (hpRatio <= .5 && !enemy.isEnraged) {
							enemy.isEnraged = true;
							enemy.speed = Math.floor(enemy.speed * 1.3);
							enemy.sprite.setTint(16720418);
							this.showFloatingText(enemy.sprite.x, enemy.sprite.y - 70, "FÚRIA DIGITAL!", "#ff0000");
						}
						options.onPlayerStatsChange?.({
							currentHp: this.playerHp,
							maxHp: this.playerMaxHp,
							xp: this.playerXp,
							coins: this.playerCoins,
							isBossFighting: true,
							bossHp: enemy.currentHp,
							bossMaxHp: enemy.maxHp,
							bossName: enemy.name,
							bossPhase: enemy.isEnraged ? 2 : 1
						});
					}
					const distToPlayer = Phaser.Math.Distance.Between(enemy.sprite.x, enemy.sprite.y, this.player.x, this.player.y);
					if (enemy.kind === "ranged") {
						if (distToPlayer < 360) {
							if (distToPlayer > 180) {
								const angle = Phaser.Math.Angle.Between(enemy.sprite.x, enemy.sprite.y, this.player.x, this.player.y);
								const nextX = enemy.sprite.x + Math.cos(angle) * enemy.speed * dt;
								const nextY = enemy.sprite.y + Math.sin(angle) * enemy.speed * dt;
								if (isWalkable({ tiles: this.activeRoom.tiles }, Math.floor(nextX / TILE_SIZE), Math.floor(nextY / TILE_SIZE))) {
									enemy.sprite.x = nextX;
									enemy.sprite.y = nextY;
								}
							} else if (distToPlayer < 90) {
								const angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, enemy.sprite.x, enemy.sprite.y);
								const nextX = enemy.sprite.x + Math.cos(angle) * enemy.speed * dt;
								const nextY = enemy.sprite.y + Math.sin(angle) * enemy.speed * dt;
								if (isWalkable({ tiles: this.activeRoom.tiles }, Math.floor(nextX / TILE_SIZE), Math.floor(nextY / TILE_SIZE))) {
									enemy.sprite.x = nextX;
									enemy.sprite.y = nextY;
								}
							}
							enemy.sprite.setFlipX(this.player.x < enemy.sprite.x);
							if (time >= enemy.attackCooldown && distToPlayer <= 300) {
								enemy.attackCooldown = time + 2e3;
								enemy.sprite.setTintFill(65535);
								this.time.delayedCall(200, () => {
									if (enemy.sprite.active) {
										enemy.sprite.clearTint();
										this.spawnEnemyProjectile(enemy.sprite.x, enemy.sprite.y - 10, this.player.x, this.player.y - 15, enemy.attack);
									}
								});
							}
						}
					} else if (distToPlayer < 360) {
						enemy.state = "chase";
						const angle = Phaser.Math.Angle.Between(enemy.sprite.x, enemy.sprite.y, this.player.x, this.player.y);
						const moveDist = enemy.speed * dt;
						const nextX = enemy.sprite.x + Math.cos(angle) * moveDist;
						const nextY = enemy.sprite.y + Math.sin(angle) * moveDist;
						const tileX = Math.floor(nextX / TILE_SIZE);
						const tileY = Math.floor(nextY / TILE_SIZE);
						if (isWalkable({ tiles: this.activeRoom.tiles }, tileX, tileY)) {
							enemy.sprite.x = nextX;
							enemy.sprite.y = nextY;
						}
						enemy.sprite.setFlipX(this.player.x < enemy.sprite.x);
						if (enemy.kind === "boss" && enemy.isEnraged && time >= enemy.attackCooldown - 400 && time < enemy.attackCooldown) {
							if (!this.bossTelegraphCircle) {
								this.bossTelegraphCircle = this.add.graphics();
								this.bossTelegraphCircle.lineStyle(2, 16711680, .7);
								this.bossTelegraphCircle.fillStyle(16711680, .2);
								this.bossTelegraphCircle.strokeCircle(enemy.sprite.x, enemy.sprite.y, 60);
								this.bossTelegraphCircle.fillCircle(enemy.sprite.x, enemy.sprite.y, 60);
								this.bossTelegraphCircle.setDepth(5);
								this.time.delayedCall(400, () => {
									this.bossTelegraphCircle?.destroy();
									this.bossTelegraphCircle = null;
								});
							}
						}
						if (distToPlayer < (enemy.kind === "boss" ? 58 : 42) && time >= enemy.attackCooldown) {
							enemy.attackCooldown = time + (enemy.kind === "boss" ? 1400 : 1200);
							this.damagePlayer(enemy.attack);
							if (enemy.kind === "boss" && enemy.isEnraged) for (const [ox, oy] of [
								[1, 0],
								[-1, 0],
								[0, 1],
								[0, -1]
							]) this.spawnEnemyProjectile(enemy.sprite.x, enemy.sprite.y, enemy.sprite.x + ox * 100, enemy.sprite.y + oy * 100, Math.round(enemy.attack * .8));
						}
					} else enemy.state = "idle";
				}
			}
			damagePlayer(damage) {
				if (this.time.now < this.invulnerableUntil || this.isFinished) return;
				this.invulnerableUntil = this.time.now + 800;
				this.playerHp = Math.max(0, this.playerHp - damage);
				this.player.setTint(16724787);
				this.time.delayedCall(120, () => {
					if (this.player.active) this.player.clearTint();
				});
				if (this.modifiers.thornPercent > 0) {
					const reflectDmg = Math.max(1, Math.round(damage * this.modifiers.thornPercent));
					for (const enemy of this.enemies) if (enemy.state !== "dead") {
						if (Phaser.Math.Distance.Between(enemy.sprite.x, enemy.sprite.y, this.player.x, this.player.y) < 120) {
							this.damageEnemy(enemy, reflectDmg);
							break;
						}
					}
				}
				this.cameras.main.shake(120, .006);
				options.onPlayerStatsChange?.({
					currentHp: this.playerHp,
					maxHp: this.playerMaxHp,
					xp: this.playerXp,
					coins: this.playerCoins
				});
				if (this.playerHp <= 0) this.triggerDefeat();
			}
			handlePlayerMovement(delta) {
				if (this.isPlayerAttacking) return;
				let dx = 0;
				let dy = 0;
				if (this.cursors?.left?.isDown || this.keys?.A?.isDown) dx -= 1;
				if (this.cursors?.right?.isDown || this.keys?.D?.isDown) dx += 1;
				if (this.cursors?.up?.isDown || this.keys?.W?.isDown) dy -= 1;
				if (this.cursors?.down?.isDown || this.keys?.S?.isDown) dy += 1;
				if (dx !== 0 && dy !== 0) {
					dx *= .7071;
					dy *= .7071;
				}
				const moveDist = (options.input.stats.speed || 100) * 2.2 * delta / 1e3;
				if (dx !== 0 || dy !== 0) {
					const nextX = this.player.x + dx * moveDist;
					const nextY = this.player.y + dy * moveDist;
					const margin = 12;
					const canMoveX = isWalkable({ tiles: this.activeRoom.tiles }, Math.floor((nextX - margin) / TILE_SIZE), Math.floor((this.player.y - margin) / TILE_SIZE)) && isWalkable({ tiles: this.activeRoom.tiles }, Math.floor((nextX + margin) / TILE_SIZE), Math.floor((this.player.y - margin) / TILE_SIZE)) && isWalkable({ tiles: this.activeRoom.tiles }, Math.floor((nextX - margin) / TILE_SIZE), Math.floor((this.player.y + margin) / TILE_SIZE)) && isWalkable({ tiles: this.activeRoom.tiles }, Math.floor((nextX + margin) / TILE_SIZE), Math.floor((this.player.y + margin) / TILE_SIZE));
					const canMoveY = isWalkable({ tiles: this.activeRoom.tiles }, Math.floor((this.player.x - margin) / TILE_SIZE), Math.floor((nextY - margin) / TILE_SIZE)) && isWalkable({ tiles: this.activeRoom.tiles }, Math.floor((this.player.x + margin) / TILE_SIZE), Math.floor((nextY - margin) / TILE_SIZE)) && isWalkable({ tiles: this.activeRoom.tiles }, Math.floor((this.player.x - margin) / TILE_SIZE), Math.floor((nextY + margin) / TILE_SIZE)) && isWalkable({ tiles: this.activeRoom.tiles }, Math.floor((this.player.x + margin) / TILE_SIZE), Math.floor((nextY + margin) / TILE_SIZE));
					if (canMoveX) this.player.x = nextX;
					if (canMoveY) this.player.y = nextY;
					if (dx < 0) {
						this.facing = "left";
						if (this.anims.exists("player-walk-left")) this.player.play("player-walk-left", true);
					} else if (dx > 0) {
						this.facing = "right";
						if (this.anims.exists("player-walk-right")) this.player.play("player-walk-right", true);
					} else {
						const walkKey = this.facing === "left" ? "player-walk-left" : "player-walk-right";
						if (this.anims.exists(walkKey)) this.player.play(walkKey, true);
					}
				} else if (this.anims.exists("player-idle") && this.player.anims.currentAnim?.key !== "player-idle") this.player.play("player-idle", true);
			}
			advanceToNextRoom() {
				if (this.isTransitioning) return;
				this.isTransitioning = true;
				this.cameras.main.fadeOut(250);
				this.time.delayedCall(250, () => {
					self.currentRoomIndex += 1;
					if (!runDefinition || self.currentRoomIndex >= runDefinition.totalRooms) this.triggerVictory();
					else {
						this.loadRoom(self.currentRoomIndex);
						this.cameras.main.fadeIn(250);
						this.isTransitioning = false;
					}
				});
			}
			triggerVictory() {
				this.isFinished = true;
				if (this.anims.exists("player-victory")) this.player.play("player-victory");
				const victoryText = this.add.text(this.cameras.main.midPoint.x, this.cameras.main.midPoint.y - 30, "CAMINHO DIGITAL CONCLUÍDO!\nVITÓRIA!", {
					fontSize: "26px",
					color: "#00ff88",
					fontStyle: "bold",
					align: "center",
					stroke: "#000000",
					strokeThickness: 5
				}).setOrigin(.5).setDepth(30);
				this.tweens.add({
					targets: victoryText,
					scale: {
						from: .7,
						to: 1.2
					},
					duration: 400,
					yoyo: true,
					repeat: 1,
					onComplete: () => {
						options.onFinish({
							runId: options.input.runId,
							outcome: "victory",
							xp: this.playerXp + 150,
							coins: this.playerCoins + 80,
							itemsWon: {
								...this.itemsWon,
								carne_digital: (this.itemsWon.carne_digital || 0) + 2,
								fruta_digital: (this.itemsWon.fruta_digital || 0) + 1
							}
						});
					}
				});
			}
			triggerDefeat() {
				this.isFinished = true;
				if (this.anims.exists("player-death")) this.player.play("player-death");
				this.add.text(this.cameras.main.midPoint.x, this.cameras.main.midPoint.y - 30, "EXPEDIÇÃO INTERROMPIDA\nDIGIMON EXAUSTO", {
					fontSize: "24px",
					color: "#ff3344",
					fontStyle: "bold",
					align: "center",
					stroke: "#000000",
					strokeThickness: 5
				}).setOrigin(.5).setDepth(30);
				this.time.delayedCall(1600, () => {
					options.onFinish({
						runId: options.input.runId,
						outcome: "defeat",
						xp: Math.floor(this.playerXp * .5),
						coins: Math.floor(this.playerCoins * .5)
					});
				});
			}
		}
		const config = {
			type: Phaser.AUTO,
			parent: options.parent,
			backgroundColor: "#080c14",
			scene: [DigitalPathScene],
			scale: {
				mode: Phaser.Scale.RESIZE,
				autoCenter: Phaser.Scale.CENTER_BOTH
			}
		};
		this.game = new Phaser.Game(config);
		return true;
	}
	stop() {
		if (this.game) {
			this.game.destroy(true);
			this.game = null;
			this.run = null;
			this.activeScene = null;
			this.currentRoomIndex = 0;
			this.generatedRoomIds.clear();
		}
	}
	togglePause() {
		if (this.activeScene && typeof this.activeScene.togglePause === "function") this.activeScene.togglePause();
	}
	skipRoom() {
		if (this.activeScene && typeof this.activeScene.advanceToNextRoom === "function") this.activeScene.advanceToNextRoom();
	}
	healPlayer(amount) {
		if (this.activeScene && typeof this.activeScene.healPlayer === "function") this.activeScene.healPlayer(amount);
	}
	addCoins(amount) {
		if (this.activeScene && typeof this.activeScene.addCoins === "function") this.activeScene.addCoins(amount);
	}
};
function DigitalPathScreen() {
	const pet = useGame((s) => s.pet);
	const exitDigitalPath = useGame((s) => s.exitDigitalPath);
	const containerRef = (0, import_react.useRef)(null);
	const gameRef = (0, import_react.useRef)(null);
	const [currentHp, setCurrentHp] = (0, import_react.useState)(100);
	const [maxHp, setMaxHp] = (0, import_react.useState)(100);
	const [xp, setXp] = (0, import_react.useState)(0);
	const [coins, setCoins] = (0, import_react.useState)(0);
	const [roomIndex, setRoomIndex] = (0, import_react.useState)(1);
	const [totalRooms, setTotalRooms] = (0, import_react.useState)(6);
	const [roomTitle, setRoomTitle] = (0, import_react.useState)("Portal de Entrada");
	const [biome, setBiome] = (0, import_react.useState)("digital");
	const [floorNumber, setFloorNumber] = (0, import_react.useState)(1);
	const [isBossRoom, setIsBossRoom] = (0, import_react.useState)(false);
	const [bossInfo, setBossInfo] = (0, import_react.useState)({
		isFighting: false,
		hp: 1,
		maxHp: 1,
		name: "",
		phase: 1
	});
	const [activeUpgrades, setActiveUpgrades] = (0, import_react.useState)([]);
	const [cooldowns, setCooldowns] = (0, import_react.useState)({
		basic_1: 0,
		basic_2: 0,
		special: 0
	});
	const [isPaused, setIsPaused] = (0, import_react.useState)(false);
	const [confirmAbandon, setConfirmAbandon] = (0, import_react.useState)(false);
	const [showDebug, setShowDebug] = (0, import_react.useState)(false);
	const [upgradeDraft, setUpgradeDraft] = (0, import_react.useState)(null);
	const [eventModal, setEventModal] = (0, import_react.useState)(null);
	const [restModal, setRestModal] = (0, import_react.useState)(null);
	const [shopModal, setShopModal] = (0, import_react.useState)(null);
	const [runResult, setRunResult] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!pet || !containerRef.current) return;
		let manifest = getDigitalPathManifest(pet.speciesId);
		let effectiveRunInput = createRunInput(pet);
		if (!effectiveRunInput) {
			exitDigitalPath();
			return;
		}
		if (!manifest || !manifest.spriteReady) {
			console.warn(`Manifest not ready for ${pet.speciesId}. Using agumon as visual proxy while manual spritesheet organization is pending.`);
			manifest = getDigitalPathManifest("agumon");
			if (!manifest || !manifest.spriteReady) {
				exitDigitalPath();
				return;
			}
			effectiveRunInput = {
				...effectiveRunInput,
				speciesId: manifest.id
			};
		}
		if (containerRef.current) containerRef.current.innerHTML = "";
		const game = new DigitalPathGame();
		gameRef.current = game;
		setCurrentHp(effectiveRunInput.stats.health || 100);
		setMaxHp(effectiveRunInput.stats.health || 100);
		game.start({
			parent: containerRef.current,
			input: effectiveRunInput,
			manifest,
			seed: (Date.now() ^ Math.floor(Math.random() * 1e5)) >>> 0,
			onRoomChange: (rIndex, total, title, rBiome, floor, boss) => {
				setRoomIndex(rIndex);
				setTotalRooms(total);
				setRoomTitle(title);
				setBiome(rBiome || "digital");
				setFloorNumber(floor || 1);
				setIsBossRoom(!!boss);
			},
			onPlayerStatsChange: (stats) => {
				setCurrentHp(stats.currentHp);
				setMaxHp(stats.maxHp);
				setXp(stats.xp);
				setCoins(stats.coins);
				if (stats.isBossFighting) setBossInfo({
					isFighting: true,
					hp: stats.bossHp || 0,
					maxHp: stats.bossMaxHp || 1,
					name: stats.bossName || "Guardião Digital",
					phase: stats.bossPhase || 1
				});
				else setBossInfo((prev) => prev.isFighting ? {
					...prev,
					isFighting: false
				} : prev);
			},
			onCooldownChange: (slot, remainingMs, _maxMs) => {
				setCooldowns((prev) => ({
					...prev,
					[slot]: remainingMs
				}));
				window.setTimeout(() => {
					setCooldowns((prev) => ({
						...prev,
						[slot]: 0
					}));
				}, remainingMs);
			},
			onActiveUpgradesChange: (upgrades) => {
				setActiveUpgrades([...upgrades]);
			},
			onTriggerUpgradeDraft: (choices, onSelect) => {
				setUpgradeDraft({
					choices,
					onSelect
				});
			},
			onTriggerEventModal: (choices, onSelect) => {
				setEventModal({
					choices,
					onSelect
				});
			},
			onTriggerRestModal: (onRestHp, onBuffAtk) => {
				setRestModal({
					onRestHp,
					onBuffAtk
				});
			},
			onTriggerShopModal: (items, onBuy, onClose) => {
				setShopModal({
					items,
					onBuy,
					onClose
				});
			},
			onPauseToggle: (paused) => {
				setIsPaused(paused);
			},
			onFinish: (result) => {
				useGame.getState().applyDigitalPathResult(result);
				setRunResult({
					outcome: result.outcome,
					xp: result.xp,
					coins: result.coins,
					itemsWon: result.itemsWon
				});
			}
		}).catch((err) => {
			console.error("Erro ao iniciar runtime do Caminho Digital:", err);
		});
		return () => {
			game.stop();
			gameRef.current = null;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (!upgradeDraft) return;
		const handleKeyDown = (e) => {
			if (e.key === "1" && upgradeDraft.choices[0]) {
				const choice = upgradeDraft.choices[0];
				setUpgradeDraft(null);
				upgradeDraft.onSelect(choice);
			} else if (e.key === "2" && upgradeDraft.choices[1]) {
				const choice = upgradeDraft.choices[1];
				setUpgradeDraft(null);
				upgradeDraft.onSelect(choice);
			} else if (e.key === "3" && upgradeDraft.choices[2]) {
				const choice = upgradeDraft.choices[2];
				setUpgradeDraft(null);
				upgradeDraft.onSelect(choice);
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [upgradeDraft]);
	const handleAbandon = () => {
		if (gameRef.current) {
			gameRef.current.stop();
			gameRef.current = null;
		}
		const result = {
			runId: `abandon_${Date.now()}`,
			outcome: "abandoned",
			xp: Math.floor(xp * .3),
			coins: Math.floor(coins * .3)
		};
		useGame.getState().applyDigitalPathResult(result);
		setRunResult(result);
	};
	const handleTogglePause = () => {
		if (gameRef.current) gameRef.current.togglePause();
	};
	if (!pet) return null;
	const hpPercent = Math.max(0, Math.min(100, currentHp / maxHp * 100));
	const bossHpPercent = Math.max(0, Math.min(100, bossInfo.hp / bossInfo.maxHp * 100));
	const biomeBadgeStyle = {
		digital: {
			label: "Setor Digital",
			color: "text-cyan-400 bg-cyan-950/60",
			border: "border-cyan-500/40"
		},
		fire: {
			label: "Fenda Vulcânica",
			color: "text-orange-400 bg-orange-950/60",
			border: "border-orange-500/40"
		},
		storm: {
			label: "Domínio da Tempestade",
			color: "text-yellow-400 bg-yellow-950/60",
			border: "border-yellow-500/40"
		},
		ice: {
			label: "Glaciar de Dados",
			color: "text-blue-300 bg-blue-950/60",
			border: "border-blue-400/40"
		}
	};
	const currentBiomeBadge = biomeBadgeStyle[biome] || biomeBadgeStyle.digital;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex h-screen w-screen flex-col overflow-hidden bg-slate-950 font-sans text-slate-100 select-none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "z-30 flex h-16 w-full items-center justify-between border-b border-cyan-500/20 bg-slate-950/90 px-4 backdrop-blur-md",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-950/50",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xl",
										children: "🦖"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold tracking-wide text-cyan-300",
										children: pet.nickname
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "rounded bg-cyan-500/20 px-1.5 py-0.5 text-xs font-semibold text-cyan-400",
										children: ["Nv. ", pet.level]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] text-slate-400",
									children: pet.evolutionStage <= -1 ? "Novato (Rookie)" : pet.evolutionStage === 0 ? "Campeão" : pet.evolutionStage === 1 ? "Ultimate" : "Mega"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "w-36 sm:w-52",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-[11px] font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-emerald-400",
										children: "HP"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-slate-300",
										children: [
											currentHp,
											"/",
											maxHp
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-2.5 w-full overflow-hidden rounded-full bg-slate-800",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `h-full transition-all duration-300 ${hpPercent <= 25 ? "bg-gradient-to-r from-red-600 to-rose-500 animate-pulse" : "bg-gradient-to-r from-emerald-500 to-teal-400"}`,
										style: { width: `${hpPercent}%` }
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hidden items-center gap-3 text-xs sm:flex",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded border border-purple-500/20 bg-purple-950/40 px-2 py-1 font-semibold text-purple-300",
									children: [
										"⚡ +",
										xp,
										" XP"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded border border-amber-500/20 bg-amber-950/40 px-2 py-1 font-semibold text-amber-300",
									children: [
										"🪙 ",
										coins,
										" Bits"
									]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden flex-col items-center md:flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `rounded-full border px-2.5 py-0.5 text-[11px] font-bold tracking-wider ${currentBiomeBadge.color} ${currentBiomeBadge.border}`,
								children: [
									currentBiomeBadge.label,
									" • ANDAR ",
									floorNumber
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `rounded-full border px-3 py-0.5 text-xs font-bold tracking-wider ${isBossRoom ? "border-red-500/50 bg-red-950/80 text-red-300 animate-pulse" : "border-cyan-500/30 bg-cyan-950/60 text-cyan-300"}`,
								children: isBossRoom ? "⚡ CONFRONTO FINAL" : `SALA ${roomIndex} / ${totalRooms}`
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-0.5 text-[11px] text-slate-400",
							children: roomTitle
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hidden items-center gap-1.5 lg:flex",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `flex items-center gap-1 rounded border px-2 py-1 text-xs transition-colors ${cooldowns.basic_1 > 0 ? "border-slate-700 bg-slate-900 text-slate-500 opacity-60" : "border-cyan-500/30 bg-cyan-950/40 text-cyan-300"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
											className: "rounded bg-black/40 px-1 text-[10px]",
											children: "J/Espaço"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Golpe" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `flex items-center gap-1 rounded border px-2 py-1 text-xs transition-colors ${cooldowns.basic_2 > 0 ? "border-slate-700 bg-slate-900 text-slate-500 opacity-60" : "border-amber-500/30 bg-amber-950/40 text-amber-300"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
											className: "rounded bg-black/40 px-1 text-[10px]",
											children: "K"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Disparo" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `flex items-center gap-1 rounded border px-2 py-1 text-xs transition-colors ${cooldowns.special > 0 ? "border-slate-700 bg-slate-900 text-slate-500 opacity-60" : "border-rose-500/30 bg-rose-950/40 text-rose-300"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
											className: "rounded bg-black/40 px-1 text-[10px]",
											children: "L"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Especial" })]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: handleTogglePause,
								className: "rounded border border-cyan-500/30 bg-slate-900 px-2.5 py-1 text-xs font-semibold text-cyan-300 hover:bg-slate-800 transition-colors",
								title: "Pausar jogo (ESC)",
								children: "⏸ ESC"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setConfirmAbandon(true),
								className: "rounded border border-red-500/40 bg-red-950/30 px-3 py-1 text-xs font-semibold text-red-300 hover:bg-red-900/40 hover:text-red-100 transition-colors",
								children: "Abandonar"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "relative flex-1 w-full overflow-hidden bg-black",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						ref: containerRef,
						id: "digital-path-canvas-area",
						className: "h-full w-full"
					}),
					bossInfo.isFighting && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute top-4 left-1/2 -translate-x-1/2 z-20 w-80 sm:w-96 rounded-xl border border-red-500/40 bg-slate-950/90 p-3 shadow-2xl backdrop-blur-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-xs font-bold text-red-400",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tracking-wide",
								children: [
									bossInfo.name,
									" ",
									bossInfo.phase > 1 ? "⚡ FASE 2: FÚRIA" : ""
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-slate-300",
								children: [
									bossInfo.hp,
									"/",
									bossInfo.maxHp
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1.5 h-3 w-full overflow-hidden rounded-full bg-slate-800 border border-red-900/60",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `h-full transition-all duration-200 ${bossInfo.phase > 1 ? "bg-gradient-to-r from-red-600 via-orange-500 to-amber-400 animate-pulse" : "bg-gradient-to-r from-red-600 to-rose-400"}`,
								style: { width: `${bossHpPercent}%` }
							})
						})]
					}),
					activeUpgrades.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute bottom-4 left-4 z-20 flex flex-wrap items-center gap-1.5 rounded-xl border border-cyan-500/20 bg-slate-950/80 p-2 backdrop-blur-md max-w-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] font-bold text-cyan-400 uppercase tracking-wider pr-1",
							children: "Módulos:"
						}), activeUpgrades.map((u, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "group relative flex h-7 w-7 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-sm shadow-sm cursor-help hover:border-cyan-400 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: u.icon }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pointer-events-none absolute bottom-9 left-0 hidden group-hover:block z-30 w-48 rounded-lg border border-cyan-500/40 bg-slate-950 p-2 text-left shadow-xl",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-bold text-cyan-300",
										children: u.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[9px] font-semibold text-amber-400 uppercase",
										children: u.rarity
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-[11px] text-slate-300 leading-tight",
									children: u.description
								})]
							})]
						}, `${u.id}-${i}`))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute bottom-4 right-4 z-20 flex items-center gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowDebug((v) => !v),
							className: "rounded border border-slate-700 bg-slate-900/80 px-2 py-1 text-[10px] font-bold text-slate-400 hover:text-cyan-300 backdrop-blur-sm",
							children: "🛠️ Debug"
						})
					}),
					showDebug && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute bottom-12 right-4 z-30 w-64 rounded-xl border border-cyan-500/30 bg-slate-950/95 p-3 shadow-2xl backdrop-blur-md text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-slate-800 pb-2 mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-cyan-300",
								children: "Controles de Teste"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setShowDebug(false),
								className: "text-slate-500 hover:text-slate-200",
								children: "✕"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => gameRef.current?.skipRoom(),
									className: "rounded bg-cyan-950 border border-cyan-500/30 px-2 py-1 font-semibold text-cyan-300 hover:bg-cyan-900",
									children: "⏩ Pular Sala (Avançar)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => gameRef.current?.healPlayer(50),
									className: "rounded bg-emerald-950 border border-emerald-500/30 px-2 py-1 font-semibold text-emerald-300 hover:bg-emerald-900",
									children: "💚 Curar +50 HP"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => gameRef.current?.addCoins(50),
									className: "rounded bg-amber-950 border border-amber-500/30 px-2 py-1 font-semibold text-amber-300 hover:bg-amber-900",
									children: "🪙 Adicionar +50 Bits"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => gameRef.current?.togglePause(),
									className: "rounded bg-slate-800 border border-slate-700 px-2 py-1 font-semibold text-slate-300 hover:bg-slate-700",
									children: "⏸ Pausar / Despausar"
								})
							]
						})]
					})
				]
			}),
			upgradeDraft && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-2xl rounded-2xl border border-cyan-500/40 bg-slate-950 p-6 shadow-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full border border-cyan-500/30 bg-cyan-950/60 px-3 py-1 text-xs font-bold text-cyan-400 uppercase tracking-widest",
								children: "Recompensa de Dados"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-2 text-2xl font-black tracking-wide text-white",
								children: "ESCOLHA UM MÓDULO DE EXPEDIÇÃO"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-slate-300",
								children: "Selecione um dos microchips abaixo para aprimorar seu parceiro pelo restante desta run."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 grid grid-cols-1 md:grid-cols-3 gap-4",
						children: upgradeDraft.choices.map((choice, idx) => {
							const rarityColor = choice.rarity === "epic" ? "border-amber-400 bg-gradient-to-b from-amber-950/40 to-slate-900 shadow-amber-900/30 text-amber-300" : choice.rarity === "rare" ? "border-purple-400 bg-gradient-to-b from-purple-950/40 to-slate-900 shadow-purple-900/30 text-purple-300" : "border-cyan-500/40 bg-gradient-to-b from-cyan-950/40 to-slate-900 shadow-cyan-900/20 text-cyan-300";
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								onClick: () => {
									const sel = choice;
									setUpgradeDraft(null);
									sel && upgradeDraft.onSelect(sel);
								},
								className: `group relative flex flex-col justify-between rounded-xl border p-4 shadow-lg cursor-pointer transition-all duration-200 hover:scale-105 hover:border-white ${rarityColor}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-2xl",
											children: choice.icon
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded bg-black/40 px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider",
											children: choice.rarity
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-2 font-bold text-white text-base group-hover:text-cyan-200",
										children: choice.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-slate-300 leading-relaxed",
										children: choice.description
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 pt-3 border-t border-slate-800 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[10px] text-slate-400",
										children: [
											"Atalho [",
											idx + 1,
											"]"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded bg-cyan-500/20 px-2 py-1 text-[11px] font-bold text-cyan-300 group-hover:bg-cyan-500 group-hover:text-black transition-colors",
										children: "Instalar"
									})]
								})]
							}, choice.id);
						})
					})]
				})
			}),
			eventModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-lg rounded-2xl border border-purple-500/40 bg-slate-950 p-6 shadow-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-4xl",
								children: "📟"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-2 text-2xl font-black tracking-wide text-purple-300",
								children: "TERMINAL DE ANOMALIA DETECTADO"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-slate-300",
								children: "Um fluxo de dados instável foi interceptado pelo Digivice. Escolha como seu Digimon deve interagir com o fluxo:"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 flex flex-col gap-3",
						children: eventModal.choices.map((c, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								setEventModal(null);
								eventModal.onSelect(idx);
							},
							className: "flex items-center justify-between rounded-xl border border-purple-500/30 bg-purple-950/30 p-3.5 text-left transition-all hover:border-purple-400 hover:bg-purple-900/40",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "font-bold text-purple-200 text-sm",
								children: c.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-slate-300 mt-0.5",
								children: c.description
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xl",
								children: "➔"
							})]
						}, c.id))
					})]
				})
			}),
			restModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md rounded-2xl border border-emerald-500/40 bg-slate-950 p-6 shadow-2xl text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-4xl",
							children: "🏕️"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 text-2xl font-black tracking-wide text-emerald-400",
							children: "NÓ DE RESTAURAÇÃO"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-slate-300",
							children: "Uma zona segura e serena restaura o fluxo de dados do seu parceiro. O que deseja fazer?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									setRestModal(null);
									restModal.onRestHp();
								},
								className: "flex flex-col items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-4 transition-all hover:scale-105 hover:bg-emerald-900/40",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-3xl",
										children: "💚"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-2 font-bold text-emerald-300 text-sm",
										children: "Descanso Profundo"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-slate-400 mt-1",
										children: "+50 Pontos de Vida"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									setRestModal(null);
									restModal.onBuffAtk();
								},
								className: "flex flex-col items-center justify-center rounded-xl border border-amber-500/30 bg-amber-950/30 p-4 transition-all hover:scale-105 hover:bg-amber-900/40",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-3xl",
										children: "⚔️"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-2 font-bold text-amber-300 text-sm",
										children: "Calibrar Ataque"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-slate-400 mt-1",
										children: "+15% Dano de Ataque"
									})
								]
							})]
						})
					]
				})
			}),
			shopModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-lg rounded-2xl border border-amber-500/40 bg-slate-950 p-6 shadow-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-slate-800 pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-2xl",
									children: "🏪"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-bold text-amber-300 text-base",
									children: "Terminal de Compras"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-slate-400",
									children: "Troque seus Bits minerados"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-950/40 px-3 py-1 text-sm font-bold text-amber-300",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🪙" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [coins, " Bits"] })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 flex flex-col gap-2.5",
							children: shopModal.items.map((item) => {
								const canAfford = coins >= item.price;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/70 p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-2xl",
											children: item.icon
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-white text-sm",
											children: item.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-slate-400",
											children: item.description
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										disabled: !canAfford,
										onClick: () => {
											shopModal.onBuy(item);
										},
										className: `rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${canAfford ? "bg-amber-500 text-black hover:bg-amber-400" : "bg-slate-800 text-slate-500 cursor-not-allowed"}`,
										children: ["🪙 ", item.price]
									})]
								}, item.id);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 flex justify-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setShopModal(null);
									shopModal.onClose();
								},
								className: "rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors",
								children: "Voltar à Exploração"
							})
						})
					]
				})
			}),
			isPaused && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-sm rounded-2xl border border-cyan-500/30 bg-slate-900 p-6 shadow-2xl text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xl font-bold text-cyan-300",
							children: "JOGO PAUSADO"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-slate-400",
							children: "Pressione ESC para retornar à ação"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "my-5 rounded-xl border border-slate-800 bg-slate-950/70 p-3.5 text-left text-xs text-slate-300 space-y-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-slate-400",
										children: "Movimentação:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-white",
										children: "W, A, S, D ou Setas"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-slate-400",
										children: "Golpe Básico:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-white",
										children: "J ou Barra de Espaço"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-slate-400",
										children: "Disparo Digital:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-white",
										children: "K"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-slate-400",
										children: "Ataque Especial:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-white",
										children: "L"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-slate-400",
										children: "Interagir:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-white",
										children: "E"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: handleTogglePause,
								className: "w-full rounded-xl bg-cyan-600 py-2.5 text-xs font-bold text-white hover:bg-cyan-500 transition-colors",
								children: "Continuar Expedição"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setConfirmAbandon(true),
								className: "w-full rounded-xl border border-red-500/40 bg-red-950/30 py-2 text-xs font-semibold text-red-300 hover:bg-red-900/40 transition-colors",
								children: "Abandonar Run"
							})]
						})
					]
				})
			}),
			confirmAbandon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-sm rounded-xl border border-red-500/30 bg-slate-900 p-6 shadow-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-bold text-red-400",
							children: "Abandonar Expedição?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-slate-300",
							children: "Você retornará ao Tamagotchi e manterá apenas uma fração dos recursos obtidos nesta run."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex justify-end gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setConfirmAbandon(false),
								className: "rounded px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800",
								children: "Continuar Jogando"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setConfirmAbandon(false);
									handleAbandon();
								},
								className: "rounded bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-500",
								children: "Confirmar Saída"
							})]
						})
					]
				})
			}),
			runResult && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md rounded-2xl border border-cyan-500/30 bg-slate-900 p-8 text-center shadow-2xl",
					children: [
						runResult.outcome === "victory" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-5xl",
								children: "🏆"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 text-2xl font-black tracking-wide text-emerald-400",
								children: "EXPEDIÇÃO CONCLUÍDA!"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-slate-300",
								children: "O Caminho Digital foi purificado com sucesso pelo seu Digimon!"
							})
						] }) : runResult.outcome === "defeat" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-5xl",
								children: "💀"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 text-2xl font-black tracking-wide text-red-400",
								children: "DIGIMON EXAUSTO"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-slate-300",
								children: "Seu Digimon foi derrotado, mas aprendeu com a experiência."
							})
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-5xl",
								children: "🚪"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 text-2xl font-black tracking-wide text-amber-400",
								children: "RETORNO TÁTICO"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-slate-300",
								children: "A expedição foi encerrada antecipadamente."
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex justify-center gap-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-[11px] font-semibold text-slate-400 uppercase",
									children: "XP Ganho"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xl font-black text-purple-400",
									children: ["+", runResult.xp]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-px bg-slate-800" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-[11px] font-semibold text-slate-400 uppercase",
									children: "Bits"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xl font-black text-amber-400",
									children: ["+", runResult.coins]
								})] })
							]
						}),
						runResult.itemsWon && Object.keys(runResult.itemsWon).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3 text-xs text-emerald-300",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold block mb-1",
								children: "🎁 Itens Enviados ao Tamagotchi:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex justify-center gap-3",
								children: Object.entries(runResult.itemsWon).map(([id, count]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "rounded bg-black/40 px-2 py-0.5 font-semibold",
									children: [
										"+",
										count,
										" ",
										id.replace("_", " ")
									]
								}, id))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => exitDigitalPath(),
							className: "mt-6 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-bold text-white shadow-lg hover:from-cyan-400 hover:to-blue-500 transition-all",
							children: "Retornar ao Tamagotchi"
						})
					]
				})
			})
		]
	});
}
var SKILL_FX = {
	"attack-pepper-breath": "fire",
	"attack-mega-flame": "fire",
	"attack-terra-force": "energy",
	"attack-love-serenade": "sound-wave",
	"attack-banana-slip": "banana",
	"attack-blue-blaster": "blue-fire",
	"attack-howling-blaster": "blue-fire",
	"attack-wolf-claw": "claw",
	"attack-vee-headbutt": "speed",
	"attack-fire-rocket": "fire",
	"attack-vee-laser": "laser"
};
var STATS = [
	{
		key: "hunger",
		label: "Fome",
		cls: "bg-hunger"
	},
	{
		key: "happiness",
		label: "Felicidade",
		cls: "bg-happy"
	},
	{
		key: "energy",
		label: "Energia",
		cls: "bg-energy"
	},
	{
		key: "hygiene",
		label: "Higiene",
		cls: "bg-hygiene"
	},
	{
		key: "health",
		label: "Saude",
		cls: "bg-health"
	}
];
function PlayScreen() {
	const pet = useGame((s) => s.pet);
	const speech = useGame((s) => s.speech);
	const anim = useGame((s) => s.anim);
	const busyUntil = useGame((s) => s.busyUntil);
	const panel = useGame((s) => s.panel);
	const setPanel = useGame((s) => s.setPanel);
	const tick = useGame((s) => s.tick);
	const reset = useGame((s) => s.reset);
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(tick, 1e3);
		return () => window.clearInterval(id);
	}, [tick]);
	(0, import_react.useEffect)(() => {
		if (!pet?.speciesId) return;
		preloadDigimonAudio(pet.speciesId);
		if (pet.isSleeping) return;
		const idleId = window.setInterval(() => maybePlayIdleSound(pet.speciesId), 22e3);
		return () => window.clearInterval(idleId);
	}, [pet?.speciesId, pet?.isSleeping]);
	if (!pet) return null;
	const name = currentName(pet);
	const sprite = currentSprite(pet);
	const mood = getMood(pet);
	const sleeping = pet.isSleeping;
	const actionBusy = busyUntil > Date.now();
	const spriteAction = sleeping ? "sleep" : SPRITE_ANIMATIONS[pet.speciesId]?.[anim] ? anim : "idle";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto flex min-h-dvh max-w-lg items-center justify-center px-3 py-4 sm:px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "ds-console ds-shell-padding w-full max-w-lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ds-top-bezel",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ds-lights",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ds-led is-on" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ds-led" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ds-led" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
							className: "ds-titlebar relative z-20 mb-3 flex items-center justify-between px-4 py-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold text-fg",
								children: name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs tabular-nums text-muted",
								children: [
									"Nv. ",
									pet.level,
									" · ",
									pet.experience,
									"/",
									xpToNext(pet.level),
									" XP"
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ds-pill flex items-center gap-2 px-3 py-1.5 text-sm font-medium tabular-nums text-fg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coins, { className: "size-3.5 text-muted" }), pet.coins]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: cn("ds-screen relative z-0 flex h-[42vh] min-h-[250px] max-h-[360px] shrink-0 items-center justify-center overflow-hidden", sleeping ? "room-night" : "room-day"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-black/10" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.3),transparent_68%)]" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: cn("relative z-10", sleeping && "opacity-90"),
									children: [
										actionBusy && SKILL_FX[spriteAction] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillEffect, { family: SKILL_FX[spriteAction] }) : null,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PetSprite, {
											speciesId: pet.speciesId,
											action: spriteAction,
											fallback: sprite,
											name,
											isSleeping: sleeping
										}),
										sleeping ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "sleep-zzz",
											"aria-hidden": "true",
											children: "Zzz"
										}) : null
									]
								}),
								sleeping ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ds-pill absolute left-3 top-3 px-2.5 py-1 text-[11px] font-medium text-muted",
									children: "Sono turbo · +8 energia / 1s"
								}) : null,
								speech ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "absolute bottom-3 left-1/2 z-20 max-w-[85%] -translate-x-1/2 rounded-2xl border border-white/60 bg-white/85 px-3 py-1.5 text-center text-xs font-medium text-fg shadow-[0_6px_16px_rgba(0,0,0,0.14)]",
									children: speech
								}) : null,
								mood !== "idle" && mood !== "happy" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ds-pill absolute right-3 top-3 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-muted",
									children: moodLabel(mood)
								}) : null
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "ds-hinge" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ds-bottom-panel px-3 pb-4 pt-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
							className: "ds-slot space-y-2 px-3 py-3",
							children: STATS.map((s) => {
								const value = pet[s.key];
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-[86px_1fr_34px] items-center gap-2 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium text-muted",
											children: s.label
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-2.5 overflow-hidden rounded-full border border-white/65 bg-white/45 shadow-inner",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: cn("h-full rounded-full transition-[width] duration-500", s.cls),
												style: { width: `${value}%` }
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-right tabular-nums font-semibold text-fg",
											children: value
										})
									]
								}, s.key);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
									icon: Utensils,
									label: "Comer",
									disabled: actionBusy,
									onClick: () => actions.feed()
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
									icon: Volleyball,
									label: "Brincar",
									disabled: actionBusy,
									onClick: () => actions.play()
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
									icon: Compass,
									label: "Caminho Digital",
									onClick: () => setPanel("digital-path")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
									icon: Bed,
									label: sleeping ? "Acordar" : "Dormir",
									disabled: actionBusy,
									onClick: () => actions.sleep()
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
									icon: Bath,
									label: "Banho",
									disabled: actionBusy,
									onClick: () => actions.clean()
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
									icon: HeartPulse,
									label: "Saude",
									disabled: actionBusy,
									onClick: () => actions.heal()
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
							className: "mt-3 grid grid-cols-4 gap-2 border-t border-[rgba(116,135,157,0.48)] px-1 pt-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavBtn, {
									icon: Package,
									label: "Itens",
									onClick: () => setPanel("inventory")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavBtn, {
									icon: Store,
									label: "Loja",
									onClick: () => setPanel("shop")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavBtn, {
									icon: Sparkles,
									label: "Evoluir",
									onClick: () => setPanel("evolution")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavBtn, {
									icon: RotateCcw,
									label: "Novo",
									onClick: () => {
										if (window.confirm("Criar um novo parceiro? O atual sera apagado.")) reset();
									}
								})
							]
						})
					]
				}),
				panel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "fixed inset-0 z-40 flex items-end justify-center bg-black/60 p-3 sm:items-center",
					onClick: () => setPanel(null),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("ds-modal max-h-[88vh] w-full overflow-y-auto p-5", panel === "digital-path" ? "max-w-xl" : "max-w-md"),
						onClick: (e) => e.stopPropagation(),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-4 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-base font-semibold text-fg",
									children: panel === "inventory" ? "Inventario" : panel === "shop" ? "Loja" : panel === "training" ? "Treino" : panel === "digital-path" ? "Caminho Digital" : "Evolucao"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "ds-button px-3 py-1.5 text-sm font-medium",
									onClick: () => setPanel(null),
									children: "Fechar"
								})]
							}),
							panel === "inventory" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inventory, {}) : null,
							panel === "shop" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shop, {}) : null,
							panel === "evolution" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Evolution, {}) : null,
							panel === "training" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Training, {}) : null,
							panel === "digital-path" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DigitalPathEntry, {}) : null
						]
					})
				}) : null
			]
		})
	});
}
function PetSprite({ speciesId, action, fallback, name, isSleeping }) {
	const resolvedAction = isSleeping ? "sleep" : action;
	const animation = SPRITE_ANIMATIONS[speciesId]?.[resolvedAction] ?? SPRITE_ANIMATIONS[speciesId]?.sleep ?? SPRITE_ANIMATIONS[speciesId]?.idle;
	const [frameIndex, setFrameIndex] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		setFrameIndex(0);
		if (!animation || animation.frames.length <= 1) return;
		const frameMs = Math.max(70, Math.round(1e3 / animation.fps));
		const id = window.setInterval(() => {
			setFrameIndex((current) => {
				if (animation.loop === false) return Math.min(current + 1, animation.frames.length - 1);
				return (current + 1) % animation.frames.length;
			});
		}, frameMs);
		return () => window.clearInterval(id);
	}, [
		animation,
		speciesId,
		resolvedAction
	]);
	(0, import_react.useEffect)(() => {
		const animations = SPRITE_ANIMATIONS[speciesId];
		if (!animations) return;
		Object.values(animations).flatMap((entry) => entry.frames).forEach((url) => {
			const image = new Image();
			image.src = url;
		});
	}, [speciesId]);
	const safeFrameIndex = Math.max(0, Math.min(frameIndex, (animation?.frames.length ?? 1) - 1));
	const src = animation?.frames[safeFrameIndex] ?? fallback;
	const layout = SPRITE_STAGE_LAYOUT[speciesId] ?? {
		scale: 1,
		x: 0,
		y: 0
	};
	const sleepPose = isSleeping ? {
		scale: Math.max(.9, (layout.scale ?? 1) * .98),
		x: layout.x,
		y: (layout.y ?? 0) + 12
	} : {
		scale: layout.scale,
		x: layout.x,
		y: layout.y
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src,
		alt: name,
		className: cn("pixel h-[208px] w-[208px] max-w-[76vw] object-contain object-bottom drop-shadow-[0_14px_30px_rgba(0,0,0,0.28)] sm:h-[236px] sm:w-[236px]", isSleeping && "brightness-90 contrast-110"),
		style: {
			transform: `translate(${sleepPose.x}px, ${sleepPose.y}px) scale(${sleepPose.scale})`,
			transformOrigin: "50% 100%"
		},
		draggable: false,
		onError: (event) => {
			const target = event.currentTarget;
			if (target.src !== fallback) target.src = fallback;
		}
	});
}
function SkillEffect({ family }) {
	const [frame, setFrame] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => setFrame((current) => (current + 1) % 8), 90);
		return () => window.clearInterval(id);
	}, [family]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: `/fx/${family}/${String(frame).padStart(2, "0")}.png`,
		alt: "",
		"aria-hidden": "true",
		className: "skill-effect"
	});
}
function Action({ icon: Icon, label, disabled = false, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		disabled,
		onClick,
		className: "ds-button flex min-h-16 flex-col items-center justify-center gap-1 px-1 text-[11px] font-semibold disabled:cursor-not-allowed disabled:opacity-45",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-muted" }), label]
	});
}
function NavBtn({ icon: Icon, label, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: "ds-nav-button flex min-h-11 items-center justify-center gap-1.5 px-2 text-xs font-semibold text-muted",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" }), label]
	});
}
function Inventory() {
	const pet = useGame((s) => s.pet);
	const actionBusy = useGame((s) => s.busyUntil > Date.now());
	if (!pet) return null;
	const entries = Object.entries(pet.inventory).filter(([, q]) => q > 0);
	if (entries.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Vazio. Compre na loja."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-2 gap-2",
		children: entries.map(([id, qty]) => {
			const item = ITEMS[id];
			if (!item) return null;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				disabled: actionBusy,
				onClick: () => actions.use(id),
				className: "ds-card p-3 text-left disabled:cursor-not-allowed disabled:opacity-45",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold text-fg",
						children: item.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: item.desc
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-xs tabular-nums font-medium text-subtle",
						children: ["x", qty]
					})
				]
			}, id);
		})
	});
}
function Shop() {
	const pet = useGame((s) => s.pet);
	const actionBusy = useGame((s) => s.busyUntil > Date.now());
	if (!pet) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-2 gap-2",
		children: Object.values(ITEMS).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			disabled: actionBusy,
			onClick: () => actions.buy(item.id),
			className: "ds-card p-3 text-left disabled:cursor-not-allowed disabled:opacity-45",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold text-fg",
					children: item.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted",
					children: item.desc
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-xs tabular-nums font-semibold text-fg",
					children: [item.price, " moedas"]
				})
			]
		}, item.id))
	});
}
function Evolution() {
	const pet = useGame((s) => s.pet);
	const actionBusy = useGame((s) => s.busyUntil > Date.now());
	if (!pet) return null;
	const list = LINES[pet.lineId]?.evolutions ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm text-muted",
			children: [
				"Forma atual: ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-semibold text-fg",
					children: currentName(pet)
				}),
				" · Nv. ",
				pet.level
			]
		}), list.map((evo, idx) => {
			const unlocked = pet.evolutionStage >= idx;
			const nextNeeded = pet.evolutionStage + 1 === idx;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("ds-card p-3", unlocked ? "border-happy/70" : nextNeeded ? "border-accent" : "border-border"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm font-semibold text-fg",
					children: [
						evo.name,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-normal text-muted",
							children: ["Nv. ", evo.level]
						}),
						unlocked ? " · desbloqueado" : ""
					]
				}), nextNeeded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: actionBusy,
					onClick: () => actions.evolve(),
					className: "ds-button ds-button-accent mt-3 h-10 px-4 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-45",
					children: "Evoluir"
				}) : null]
			}, evo.id);
		})]
	});
}
function DigitalPathEntry() {
	const pet = useGame((s) => s.pet);
	const isReady = (pet ? getDigitalPathManifest(pet.speciesId) : null)?.spriteReady === true;
	const runInput = pet ? createRunInput(pet) : null;
	if (!pet) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "ds-card p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-[0.18em] text-muted",
						children: "Parceiro da run"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-1 text-lg font-semibold text-fg",
						children: runInput?.name ?? currentName(pet)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [
							"Nível ",
							runInput?.level ?? pet.level,
							" · ",
							runInput?.element ?? "Desconhecido"
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("ds-pill px-2.5 py-1 text-xs font-medium", isReady ? "border-emerald-500/40 text-emerald-400" : "text-muted"),
					children: isReady ? "Pronto para o combate" : "Sprites em preparação"
				})]
			}), runInput ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-4 gap-2 border-t border-white/10 pt-3 text-center text-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg bg-black/20 p-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] uppercase text-muted",
							children: "Vida"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold text-fg",
							children: runInput.stats.health
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg bg-black/20 p-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] uppercase text-muted",
							children: "Ataque"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold text-fg",
							children: runInput.stats.attack
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg bg-black/20 p-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] uppercase text-muted",
							children: "Defesa"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold text-fg",
							children: runInput.stats.defense
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg bg-black/20 p-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] uppercase text-muted",
							children: "Velocidade"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold text-fg",
							children: runInput.stats.speed
						})]
					})
				]
			}) : null]
		}), isReady ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ds-slot p-3 text-xs text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-semibold text-fg",
					children: "Instruções da Expedição:"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-1.5 list-inside list-disc space-y-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							"Mova o parceiro com ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "W, A, S, D" }),
							" ou as ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Setas" }),
							"."
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							"Ataque básico físico com ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Espaço" }),
							" ou ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "J" }),
							"."
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							"Ataque de projétil à distância com a tecla ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "K" }),
							"."
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							"Especial explosivo em área com a tecla ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "L" }),
							"."
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Derrote os inimigos para abrir o portão e avançar pelas 6 salas até o Boss!" })
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => actions.startDigitalPath(),
				className: "ds-button ds-button-accent h-12 w-full text-sm font-semibold tracking-wide",
				children: "INICIAR CAMINHO DIGITAL (TELA CHEIA)"
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "ds-slot p-3 text-sm text-muted",
			children: [
				"Os sprites deste Digimon ainda estão em preparação. Consulte o guia em",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
					className: "text-xs text-fg",
					children: "docs/digital-path/MANUAL_SPRITE_ORGANIZATION_GUIDE.md"
				}),
				" para organizar as pastas de animação e ativar o manifest."
			]
		})]
	});
}
function Training() {
	const pet = useGame((s) => s.pet);
	const actionBusy = useGame((s) => s.busyUntil > Date.now());
	if (!pet) return null;
	const skill = getSkillForSpecies(pet.speciesId);
	if (!skill) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Nenhuma habilidade configurada para esta forma."
	});
	const xp = skill.xpGain * 3;
	const canTrain = !actionBusy && !pet.isSleeping && pet.energy >= skill.energyCost;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "ds-card p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-[0.18em] text-muted",
					children: "Habilidade atual"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1 text-lg font-semibold text-fg",
					children: skill.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted",
					children: skill.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid grid-cols-2 gap-2 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ds-slot px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: "Custo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-0.5 font-semibold text-fg",
							children: [skill.energyCost, " Energia"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ds-slot px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: "Ganho"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-0.5 font-semibold text-fg",
							children: [
								"+",
								xp,
								" XP"
							]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-[11px] text-subtle",
					children: [
						"Modo de teste: multiplicador de XP x",
						3,
						"."
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			disabled: !canTrain,
			onClick: () => actions.train(),
			className: "ds-button ds-button-accent h-12 w-full text-sm font-semibold disabled:opacity-45",
			children: actionBusy ? "Aguarde a animacao" : pet.isSleeping ? "Acorde para treinar" : pet.energy < skill.energyCost ? "Energia insuficiente" : "TREINAR"
		})]
	});
}
function moodLabel(mood) {
	return {
		sleep: "Dormindo",
		sick: "Doente",
		hungry: "Fome",
		tired: "Cansado",
		dirty: "Sujo",
		happy: "Feliz"
	}[mood] ?? mood;
}
function StartScreen() {
	const startNew = useGame((s) => s.startNew);
	const continueSave = useGame((s) => s.continueSave);
	const [saved, setSaved] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setSaved(useGame.getState().hasSave());
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "flex min-h-dvh items-center justify-center px-4 py-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "ds-console ds-shell-padding w-full max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ds-top-bezel",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ds-lights",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ds-led is-on" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ds-led" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ds-led" })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ds-screen room-day ds-gridline flex min-h-[310px] flex-col items-center justify-center px-6 py-10 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "ds-titlebar mb-4 px-4 py-1 text-[11px] font-semibold tracking-[0.28em] text-muted uppercase",
								children: "Parceiro digital"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl",
								children: "Digital Pet"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 max-w-sm text-sm leading-relaxed text-muted",
								children: "Escolha uma linha, cuide todos os dias e evolua. O tempo continua mesmo quando voce sai."
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "ds-hinge" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ds-bottom-panel px-4 pb-5 pt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "ds-slot px-3 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-muted",
						children: "Menu inferior estilo Nintendo DS"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-col gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: startNew,
							className: "ds-button ds-button-primary h-12 text-sm font-semibold transition-transform duration-150",
							children: "Comecar"
						}), saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => continueSave(),
							className: "ds-button h-12 text-sm font-medium transition-transform duration-150",
							children: "Continuar"
						}) : null]
					})]
				})
			]
		})
	});
}
function Home() {
	const screen = useGame((s) => s.screen);
	if (screen === "choose") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChooseScreen, {});
	if (screen === "digital-path") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DigitalPathScreen, {});
	if (screen === "play") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayScreen, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StartScreen, {});
}
//#endregion
export { Home as component };
