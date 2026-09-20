import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Sparkles, c as RotateCcw, d as Compass, f as Coins, h as Bath, i as Store, l as Package, m as Bed, n as Utensils, o as ShieldCheck, p as CircleCheck, s as Settings, t as Volleyball, u as HeartPulse } from "../_libs/lucide-react.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-zHGw-96u.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ACTION_FRAME_COUNTS = {
	agumon: {
		idle: 9,
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
		idle: 4,
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
function getDigimonSpritePath(species, action, frameIndex) {
	const normalizedAction = action === "evolve" ? "evolution" : action;
	return `/sprites/${species}/${normalizedAction}/${normalizedAction}_${String(frameIndex).padStart(2, "0")}.png`;
}
function animationFrames(species, action, fallbackCount) {
	const actualCount = ACTION_FRAME_COUNTS[species]?.[action] ?? fallbackCount;
	const loopCount = Math.max(1, actualCount, fallbackCount);
	const frameCycle = Math.max(1, actualCount);
	return Array.from({ length: loopCount }, (_, index) => {
		return getDigimonSpritePath(species, action, index % frameCycle + 1);
	});
}
function animationSet(species, attackAction) {
	return {
		idle: {
			frames: animationFrames(species, "idle", ACTION_FRAME_COUNTS[species]?.idle ?? 10),
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
			sprite: "/sprites/garurumon/idle/idle_01.png"
		}, {
			id: "weregarurumon",
			name: "WereGarurumon",
			level: 10,
			sprite: "/sprites/weregarurumon/idle/idle_01.png"
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
function addDigimonXpToPet(pet, speciesId, amount) {
	if (amount <= 0) return {
		pet,
		leveledUp: false,
		levelsGained: 0
	};
	if (pet.speciesId !== speciesId && pet.lineId !== speciesId) {
		console.warn(`[XP Guard] Attempted to award XP to ${speciesId}, but active pet is ${pet.speciesId}`);
		return {
			pet,
			leveledUp: false,
			levelsGained: 0
		};
	}
	const next = {
		...pet,
		inventory: { ...pet.inventory }
	};
	next.experience += amount;
	let levelsGained = 0;
	while (next.experience >= xpToNext(next.level)) {
		next.experience -= xpToNext(next.level);
		next.level += 1;
		levelsGained += 1;
		next.health = clamp(next.health + 5);
		next.happiness = clamp(next.happiness + 10);
	}
	return {
		pet: next,
		leveledUp: levelsGained > 0,
		levelsGained
	};
}
function addXp(pet, amount) {
	const result = addDigimonXpToPet(pet, pet.speciesId, amount);
	Object.assign(pet, result.pet);
}
function simulateTime(pet) {
	const next = {
		...pet,
		inventory: { ...pet.inventory }
	};
	const elapsedMs = Math.min(Date.now() - next.lastSimulatedAt, 288e5);
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
	if (next.hunger < 20 || next.hygiene < 20 || next.energy < 15) next.health = Math.max(20, clamp(next.health - ticks * .8));
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
	xp: 5e4,
	coins: 25e3
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
		alreadyAwardedXp: Boolean(candidate.alreadyAwardedXp),
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
	const rewarded = result.alreadyAwardedXp ? withLedger : addRunXp(withLedger, result.xp);
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
var SAVE_BACKUP_KEY = "digital_pet_save_v2_backup";
function persist(pet) {
	try {
		const raw = JSON.stringify(pet);
		localStorage.setItem(SAVE_KEY, raw);
		localStorage.setItem(SAVE_BACKUP_KEY, raw);
	} catch {}
}
function loadSave() {
	try {
		const raw = localStorage.getItem(SAVE_KEY);
		if (raw) {
			const parsed = JSON.parse(raw);
			if (parsed && typeof parsed === "object" && parsed.speciesId && parsed.level) return parsed;
		}
	} catch (err) {
		console.warn("Primary save corrupted, attempting backup recovery...", err);
	}
	try {
		const backupRaw = localStorage.getItem(SAVE_BACKUP_KEY);
		if (backupRaw) {
			const recovered = JSON.parse(backupRaw);
			if (recovered && typeof recovered === "object" && recovered.speciesId && recovered.level) {
				console.info("Save successfully restored from mirror backup!");
				localStorage.setItem(SAVE_KEY, backupRaw);
				return recovered;
			}
		}
	} catch {}
	return null;
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
	addDigimonXp: (speciesId, amount) => {
		const { pet } = get();
		if (!pet) return null;
		const { pet: next, leveledUp } = addDigimonXpToPet(pet, speciesId, amount);
		if (next === pet) return null;
		persist(next);
		set({
			pet: next,
			speech: leveledUp ? `Subiu de nível! Nv. ${next.level}` : get().speech
		});
		return {
			leveledUp,
			currentLevel: next.level,
			currentXp: next.experience,
			xpToNext: xpToNext(next.level)
		};
	},
	saveDigitalPathProgress: (progress) => {
		const { pet } = get();
		if (!pet) return;
		const next = {
			...pet,
			digitalPath: {
				currentFloor: progress.currentFloor,
				highestFloor: Math.max(pet.digitalPath?.highestFloor ?? 1, progress.highestFloor),
				defeatedBosses: Array.from(/* @__PURE__ */ new Set([...pet.digitalPath?.defeatedBosses ?? [], ...progress.defeatedBosses])),
				completed: progress.completed || (pet.digitalPath?.completed ?? false)
			}
		};
		persist(next);
		set({ pet: next });
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
			localStorage.removeItem(SAVE_BACKUP_KEY);
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
	use: (id) => useGame.getState().apply((p) => useItem(p, id)),
	addDigimonXp: (speciesId, amount) => useGame.getState().addDigimonXp(speciesId, amount),
	saveDigitalPathProgress: (progress) => useGame.getState().saveDigitalPathProgress(progress)
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
var DIGITAL_PATH_MANIFESTS = {
	agumon: {
		id: "agumon",
		name: "Agumon",
		stage: "rookie",
		root: "sprites/agumon",
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
					"sprites/agumon/idle/idle_01.png",
					"sprites/agumon/idle/idle_02.png",
					"sprites/agumon/idle/idle_03.png",
					"sprites/agumon/idle/idle_04.png",
					"sprites/agumon/idle/idle_05.png",
					"sprites/agumon/idle/idle_06.png",
					"sprites/agumon/idle/idle_07.png",
					"sprites/agumon/idle/idle_08.png",
					"sprites/agumon/idle/idle_09.png"
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
					"sprites/agumon/walk/left/walk_left_01.png",
					"sprites/agumon/walk/left/walk_left_02.png",
					"sprites/agumon/walk/left/walk_left_03.png",
					"sprites/agumon/walk/left/walk_left_04.png",
					"sprites/agumon/walk/left/walk_left_05.png",
					"sprites/agumon/walk/left/walk_left_06.png",
					"sprites/agumon/walk/left/walk_left_07.png",
					"sprites/agumon/walk/left/walk_left_08.png",
					"sprites/agumon/walk/left/walk_left_09.png",
					"sprites/agumon/walk/left/walk_left_10.png",
					"sprites/agumon/walk/left/walk_left_11.png"
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
					"sprites/agumon/walk/right/walk_right_01.png",
					"sprites/agumon/walk/right/walk_right_02.png",
					"sprites/agumon/walk/right/walk_right_03.png",
					"sprites/agumon/walk/right/walk_right_04.png",
					"sprites/agumon/walk/right/walk_right_05.png",
					"sprites/agumon/walk/right/walk_right_06.png",
					"sprites/agumon/walk/right/walk_right_07.png",
					"sprites/agumon/walk/right/walk_right_08.png",
					"sprites/agumon/walk/right/walk_right_09.png",
					"sprites/agumon/walk/right/walk_right_10.png"
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
					"sprites/agumon/attacks/basic_1/attacks_basic_1_01.png",
					"sprites/agumon/attacks/basic_1/attacks_basic_1_02.png",
					"sprites/agumon/attacks/basic_1/attacks_basic_1_03.png",
					"sprites/agumon/attacks/basic_1/attacks_basic_1_04.png",
					"sprites/agumon/attacks/basic_1/attacks_basic_1_05.png",
					"sprites/agumon/attacks/basic_1/attacks_basic_1_06.png"
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
					"sprites/agumon/attacks/basic_2/attacks_basic_2_01.png",
					"sprites/agumon/attacks/basic_2/attacks_basic_2_02.png",
					"sprites/agumon/attacks/basic_2/attacks_basic_2_03.png",
					"sprites/agumon/attacks/basic_2/attacks_basic_2_04.png"
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
				"frames": ["sprites/agumon/hit/hit_01.png"],
				"sourceIndices": [36]
			},
			"death": {
				"fps": 5,
				"loop": false,
				"frames": ["sprites/agumon/death/death_01.png"],
				"sourceIndices": [34]
			},
			"victory": {
				"fps": 5,
				"loop": false,
				"frames": ["sprites/agumon/victory/victory_01.png"],
				"sourceIndices": [35]
			},
			"heal": {
				"fps": 8,
				"loop": false,
				"frames": [
					"sprites/agumon/heal/heal_01.png",
					"sprites/agumon/heal/heal_02.png",
					"sprites/agumon/heal/heal_03.png",
					"sprites/agumon/heal/heal_04.png",
					"sprites/agumon/heal/heal_05.png"
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
				"frames": [
					"sprites/agumon/projectiles/dragon/projectiles_dragon_01.png",
					"sprites/agumon/projectiles/dragon/projectiles_dragon_02.png",
					"sprites/agumon/projectiles/dragon/projectiles_dragon_03.png"
				],
				"sourceIndices": [104]
			},
			"effect_mega_blast": {
				"fps": 12,
				"loop": false,
				"frames": [
					"sprites/agumon/effects/mega-blast/effects_mega_blast_01.png",
					"sprites/agumon/effects/mega-blast/effects_mega_blast_02.png",
					"sprites/agumon/effects/mega-blast/effects_mega_blast_03.png",
					"sprites/agumon/effects/mega-blast/effects_mega_blast_04.png",
					"sprites/agumon/effects/mega-blast/effects_mega_blast_05.png",
					"sprites/agumon/effects/mega-blast/effects_mega_blast_06.png"
				],
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
	},
	veemon: {
		id: "veemon",
		name: "Veemon",
		stage: "rookie",
		root: "sprites/veemon",
		spriteReady: true,
		status: "READY",
		movementStyle: "4-way",
		reason: "Estrutura validada com movimento 4-way, golpes basic_1 (Vee-Punch), basic_2 (Vee-Laser), especial (Vee-Headbutt), hit, death e vitória.",
		frame: {
			"width": 84,
			"height": 114,
			"originX": .5,
			"originY": .95
		},
		scale: .85,
		hitbox: {
			"width": 40,
			"height": 58,
			"offsetX": 22,
			"offsetY": 45
		},
		animations: {
			"idle": {
				"fps": 7,
				"loop": true,
				"frames": [
					"sprites/veemon/idle/idle_01.png",
					"sprites/veemon/idle/idle_02.png",
					"sprites/veemon/idle/idle_03.png",
					"sprites/veemon/idle/idle_04.png"
				]
			},
			"walk_down": {
				"fps": 8,
				"loop": true,
				"frames": [
					"sprites/veemon/walk/down/walk_down_01.png",
					"sprites/veemon/walk/down/walk_down_02.png",
					"sprites/veemon/walk/down/walk_down_03.png"
				]
			},
			"walk_up": {
				"fps": 8,
				"loop": true,
				"frames": [
					"sprites/veemon/walk/up/walk_up_01.png",
					"sprites/veemon/walk/up/walk_up_02.png",
					"sprites/veemon/walk/up/walk_up_03.png"
				]
			},
			"walk_left": {
				"fps": 8,
				"loop": true,
				"frames": [
					"sprites/veemon/walk/left/walk_left_01.png",
					"sprites/veemon/walk/left/walk_left_02.png",
					"sprites/veemon/walk/left/walk_left_03.png"
				]
			},
			"walk_right": {
				"fps": 8,
				"loop": true,
				"frames": [
					"sprites/veemon/walk/right/walk_right_01.png",
					"sprites/veemon/walk/right/walk_right_02.png",
					"sprites/veemon/walk/right/walk_right_03.png"
				]
			},
			"attack_basic_1": {
				"fps": 10,
				"loop": false,
				"frames": [
					"sprites/veemon/attacks/basic_1/attacks_basic_1_01.png",
					"sprites/veemon/attacks/basic_1/attacks_basic_1_02.png",
					"sprites/veemon/attacks/basic_1/attacks_basic_1_03.png"
				]
			},
			"attack_basic_2": {
				"fps": 8,
				"loop": false,
				"frames": ["sprites/veemon/attacks/basic_2/attacks_basic_2_01.png", "sprites/veemon/attacks/basic_2/attacks_basic_2_02.png"],
				"projectile": "projectile_laser"
			},
			"attack_special": {
				"fps": 8,
				"loop": false,
				"frames": ["sprites/veemon/attacks/special/attacks_special_01.png"]
			},
			"hit": {
				"fps": 8,
				"loop": false,
				"frames": [
					"sprites/veemon/hit/hit_01.png",
					"sprites/veemon/hit/hit_02.png",
					"sprites/veemon/hit/hit_03.png"
				]
			},
			"death": {
				"fps": 5,
				"loop": false,
				"frames": [
					"sprites/veemon/death/death_01.png",
					"sprites/veemon/death/death_02.png",
					"sprites/veemon/death/death_03.png"
				]
			},
			"victory": {
				"fps": 5,
				"loop": false,
				"frames": ["sprites/veemon/victory/victory_01.png"]
			},
			"projectile_laser": {
				"fps": 12,
				"loop": false,
				"frames": ["sprites/veemon/projectiles/laser/projectiles_laser_01.png", "sprites/veemon/projectiles/laser/projectiles_laser_02.png"]
			},
			"effects_attack_1": {
				"fps": 12,
				"loop": false,
				"frames": [
					"sprites/veemon/effects/attack_01/effects_attack_01_01.png",
					"sprites/veemon/effects/attack_01/effects_attack_01_02.png",
					"sprites/veemon/effects/attack_01/effects_attack_01_03.png"
				]
			},
			"effects_special": {
				"fps": 12,
				"loop": false,
				"frames": [
					"sprites/veemon/effects/special_attack/effects_special_attack_01.png",
					"sprites/veemon/effects/special_attack/effects_special_attack_02.png",
					"sprites/veemon/effects/special_attack/effects_special_attack_03.png"
				]
			},
			"effects_attack_2": {
				"fps": 10,
				"loop": false,
				"frames": ["sprites/veemon/effects/attack_02/effects_attack_02_01.png", "sprites/veemon/effects/attack_02/effects_attack_02_02.png"]
			},
			"effects_hit": {
				"fps": 8,
				"loop": false,
				"frames": ["sprites/veemon/effects/hit/effects_hit_01.png"]
			}
		},
		tamagotchiActions: {
			"idle": "validated in source",
			"eat": "unknown",
			"sleep": "unknown",
			"wake": "unknown",
			"play": "unknown",
			"clean": "unknown",
			"heal": "unknown",
			"evolve": "unknown"
		},
		roguelike: {
			"walk_left": "validated",
			"walk_right": "validated",
			"walk_up": "validated",
			"walk_down": "validated",
			"attack_basic_1": "validated",
			"attack_basic_2": "validated",
			"attack_special": "validated",
			"hit": "validated",
			"death": "validated",
			"victory": "validated"
		}
	}
};
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
var MAP_THEMES = {
	lighting: {
		id: "lighting",
		name: "Rede Elétrica Digital",
		basePath: "/sprites/maps/lighting/",
		enabled: true,
		biome: "storm",
		wallRimColor: 61695,
		accentTint: 8978431,
		tiles: {
			floorNormal: ["/sprites/maps/lighting/floor/normal/sprite_0019.png"],
			floorVariation: ["/sprites/maps/lighting/floor/special/sprite_0024.png", "/sprites/maps/lighting/floor/cracked/sprite_0023.png"],
			floorDecor: ["/sprites/maps/lighting/floor/alternate/sprite_0018.png"],
			floorAlternate: ["/sprites/maps/lighting/floor/alternate/sprite_0009.png", "/sprites/maps/lighting/floor/alternate/sprite_0018.png"],
			floorSpecial: ["/sprites/maps/lighting/floor/special/sprite_0024.png", "/sprites/maps/lighting/floor/special/sprite_0034.png"],
			floorCracked: ["/sprites/maps/lighting/floor/cracked/sprite_0023.png", "/sprites/maps/lighting/floor/cracked/sprite_0025.png"],
			walls: {
				horizontal: ["/sprites/maps/lighting/walls/horizontal/sprite_0029.png"],
				vertical: ["/sprites/maps/lighting/walls/vertical/sprite_0056.png"],
				top: ["/sprites/maps/lighting/walls/horizontal/sprite_0029.png"],
				bottom: ["/sprites/maps/lighting/walls/horizontal/sprite_0029.png"],
				left: ["/sprites/maps/lighting/walls/left/sprite_0032.png"],
				right: ["/sprites/maps/lighting/walls/right/sprite_0012.png"],
				special: [
					"/sprites/maps/lighting/walls/special/sprite_0002.png",
					"/sprites/maps/lighting/walls/special/sprite_0003.png",
					"/sprites/maps/lighting/walls/special/sprite_0006.png",
					"/sprites/maps/lighting/walls/special/sprite_0011.png",
					"/sprites/maps/lighting/walls/special/sprite_0013.png",
					"/sprites/maps/lighting/walls/special/sprite_0015.png",
					"/sprites/maps/lighting/walls/special/sprite_0016.png",
					"/sprites/maps/lighting/walls/special/sprite_0017.png",
					"/sprites/maps/lighting/walls/special/sprite_0033.png",
					"/sprites/maps/lighting/walls/special/sprite_0035.png"
				]
			},
			doors: {
				verticalClosed: "/sprites/maps/lighting/doors/vertical/sprite_0038.png",
				verticalOpen: "/sprites/maps/lighting/doors/vertical/sprite_0042.png"
			},
			chests: {
				closed: [
					"/sprites/maps/lighting/interactables/chest/closed/sprite_0047.png",
					"/sprites/maps/lighting/interactables/chest/closed/sprite_0048.png",
					"/sprites/maps/lighting/interactables/chest/closed/sprite_0070.png"
				],
				open: [
					"/sprites/maps/lighting/interactables/chest/open/sprite_0044.png",
					"/sprites/maps/lighting/interactables/chest/open/sprite_0045.png",
					"/sprites/maps/lighting/interactables/chest/open/sprite_0050.png"
				]
			}
		}
	},
	fire: {
		id: "fire",
		name: "Câmara de Magma Digital",
		basePath: "/sprites/maps/fire/",
		enabled: false,
		biome: "fire",
		wallRimColor: 16729088,
		floorTint: 16764074,
		tiles: {
			floorNormal: ["/sprites/maps/fire/floor/cracked/floor_cracked_01.png"],
			floorVariation: ["/sprites/maps/fire/floor/cracked/floor_cracked_01.png"],
			floorDecor: [],
			floorAlternate: ["/sprites/maps/fire/floor/cracked/floor_cracked_01.png"],
			floorSpecial: ["/sprites/maps/fire/floor/cracked/floor_cracked_01.png"],
			floorCracked: ["/sprites/maps/fire/floor/cracked/floor_cracked_01.png"],
			walls: {
				horizontal: ["/sprites/maps/fire/floor/cracked/floor_cracked_01.png"],
				vertical: ["/sprites/maps/fire/floor/cracked/floor_cracked_01.png"],
				top: ["/sprites/maps/fire/floor/cracked/floor_cracked_01.png"],
				bottom: ["/sprites/maps/fire/floor/cracked/floor_cracked_01.png"],
				left: ["/sprites/maps/fire/floor/cracked/floor_cracked_01.png"],
				right: ["/sprites/maps/fire/floor/cracked/floor_cracked_01.png"],
				special: ["/sprites/maps/fire/floor/cracked/floor_cracked_01.png"]
			},
			doors: {
				verticalClosed: "/sprites/maps/lighting/doors/vertical/sprite_0038.png",
				verticalOpen: "/sprites/maps/lighting/doors/vertical/sprite_0042.png"
			},
			chests: {
				closed: ["/sprites/maps/lighting/interactables/chest/closed/sprite_0047.png"],
				open: ["/sprites/maps/lighting/interactables/chest/open/sprite_0044.png"]
			}
		}
	},
	ice: {
		id: "ice",
		name: "Glaciar de Subzero",
		basePath: "/sprites/maps/ice/",
		enabled: false,
		biome: "ice",
		wallRimColor: 6737151,
		floorTint: 14545151,
		tiles: {
			floorNormal: ["/sprites/maps/ice/floor/normal/floor_normal_01.png"],
			floorVariation: ["/sprites/maps/ice/floor/special/floor_special_01.png"],
			floorDecor: [],
			floorAlternate: ["/sprites/maps/ice/floor/special/floor_special_01.png"],
			floorSpecial: ["/sprites/maps/ice/floor/special/floor_special_01.png"],
			floorCracked: ["/sprites/maps/ice/floor/normal/floor_normal_01.png"],
			walls: {
				horizontal: ["/sprites/maps/ice/floor/normal/floor_normal_01.png"],
				vertical: ["/sprites/maps/ice/floor/normal/floor_normal_01.png"],
				top: ["/sprites/maps/ice/floor/normal/floor_normal_01.png"],
				bottom: ["/sprites/maps/ice/floor/normal/floor_normal_01.png"],
				left: ["/sprites/maps/ice/floor/normal/floor_normal_01.png"],
				right: ["/sprites/maps/ice/floor/normal/floor_normal_01.png"],
				special: ["/sprites/maps/ice/floor/special/floor_special_01.png"]
			},
			doors: {
				verticalClosed: "/sprites/maps/lighting/doors/vertical/sprite_0038.png",
				verticalOpen: "/sprites/maps/lighting/doors/vertical/sprite_0042.png"
			},
			chests: {
				closed: ["/sprites/maps/lighting/interactables/chest/closed/sprite_0047.png"],
				open: ["/sprites/maps/lighting/interactables/chest/open/sprite_0044.png"]
			}
		}
	},
	tech: {
		id: "tech",
		name: "Laboratório Cyber Core",
		basePath: "/sprites/maps/tech/",
		enabled: false,
		biome: "digital",
		wallRimColor: 3800852,
		accentTint: 7405424,
		tiles: {
			floorNormal: ["/sprites/maps/lighting/floor/normal/sprite_0005.png"],
			floorVariation: ["/sprites/maps/lighting/floor/special/sprite_0034.png"],
			floorDecor: ["/sprites/maps/lighting/floor/alternate/sprite_0018.png"],
			floorAlternate: ["/sprites/maps/lighting/floor/alternate/sprite_0009.png"],
			floorSpecial: ["/sprites/maps/lighting/floor/special/sprite_0024.png"],
			floorCracked: ["/sprites/maps/lighting/floor/cracked/sprite_0023.png"],
			walls: {
				horizontal: ["/sprites/maps/lighting/walls/horizontal/sprite_0029.png"],
				vertical: ["/sprites/maps/lighting/walls/vertical/sprite_0056.png"],
				top: ["/sprites/maps/lighting/walls/horizontal/sprite_0029.png"],
				bottom: ["/sprites/maps/lighting/walls/horizontal/sprite_0029.png"],
				left: ["/sprites/maps/lighting/walls/left/sprite_0032.png"],
				right: ["/sprites/maps/lighting/walls/right/sprite_0012.png"],
				special: ["/sprites/maps/lighting/walls/special/sprite_0002.png"]
			},
			doors: {
				verticalClosed: "/sprites/maps/lighting/doors/vertical/sprite_0038.png",
				verticalOpen: "/sprites/maps/lighting/doors/vertical/sprite_0042.png"
			},
			chests: {
				closed: ["/sprites/maps/lighting/interactables/chest/closed/sprite_0047.png"],
				open: ["/sprites/maps/lighting/interactables/chest/open/sprite_0044.png"]
			}
		}
	}
};
/**
* Returns all themes that are currently enabled and ready for selection.
*/
function getAvailableThemes() {
	return Object.values(MAP_THEMES).filter((t) => t.enabled);
}
/**
* Normalizes theme ID, accepting aliases like "lightning" -> "lighting".
*/
function normalizeThemeId(themeId) {
	if (!themeId) return "lighting";
	const lower = themeId.toLowerCase().trim();
	if (lower === "lightning" || lower === "lighting") return "lighting";
	if (lower === "fire") return "fire";
	if (lower === "ice") return "ice";
	if (lower === "tech") return "tech";
	return "lighting";
}
/**
* Returns a specific map theme config by ID, falling back to lighting if invalid.
*/
function getMapTheme(themeId) {
	return MAP_THEMES[normalizeThemeId(themeId)] || MAP_THEMES.lighting;
}
/**
* Randomly picks one map theme among all enabled themes.
* If none are enabled, logs a warning and falls back safely to 'lighting'.
* Fully decoupled from Digimon species: any Digimon can get any enabled theme.
*/
function pickRandomTheme(rng) {
	const available = getAvailableThemes();
	if (available.length === 0) {
		console.warn("[MapThemes] Warning: No map themes are enabled! Falling back safely to 'lighting'.");
		return MAP_THEMES.lighting;
	}
	const rand = rng ? rng.next() : Math.random();
	return available[Math.floor(rand * available.length) % available.length];
}
var MAP_CONFIG = {
	sizeMultiplier: 1.15,
	baseWidth: 24,
	baseHeight: 16,
	minRoomWidth: 20,
	maxRoomWidth: 34,
	minRoomHeight: 14,
	maxRoomHeight: 22,
	minCorridorWidth: 1,
	maxCorridorWidth: 3,
	loopChance: .35,
	deadEndChance: .25,
	irregularRoomChance: .4,
	obstacleDensity: .07,
	maxGenerationAttempts: 15,
	roomSizeCategories: {
		small: {
			width: 20,
			height: 14
		},
		medium: {
			width: 28,
			height: 18
		},
		large: {
			width: 34,
			height: 22
		},
		arena: {
			width: 36,
			height: 24
		}
	}
};
var BOSS_ROOMS = [
	10,
	20,
	30,
	40,
	50
];
var CHEST_ROOMS = [
	5,
	11,
	15,
	21,
	25,
	31,
	35,
	41,
	45
];
/**
* Strict Depth/Layer hierarchy to ensure proper visual stacking:
* BACKGROUND (0)
* -> FLOOR (1)
* -> DECORATIONS / HAZARDS / SPAWN_RING (2-4)
* -> ENTITIES: Player, Enemies, Bosses, Chests, Props (10)
* -> ENTITIES_OVERLAY: Healthbars, Prompts, Badges (11)
* -> WALL_BASE: Lower wall body behind entities (2)
* -> WALL_FOREGROUND: Overhead rims, tall pillars that occlude heads (15)
* -> PROJECTILES (22)
* -> VFX: Slashes, impacts, heals, explosions (25)
* -> FLOATING_TEXT: Damage numbers, popups (30)
* -> HUD / UI (40)
*/
var RENDER_DEPTH = {
	BACKGROUND: 0,
	FLOOR: 1,
	FLOOR_DECOR: 2,
	FLOOR_HAZARD: 3,
	SPAWN_RING: 4,
	PROPS_SHADOW: 8,
	ENTITIES: 10,
	ENTITIES_OVERLAY: 11,
	WALL_BASE: 2,
	WALL_FOREGROUND: 15,
	PROJECTILES: 22,
	VFX: 25,
	FLOATING_TEXT: 30,
	HUD: 40
};
function getRoomKind(roomNumber) {
	if (BOSS_ROOMS.includes(roomNumber)) return "boss";
	if (CHEST_ROOMS.includes(roomNumber)) return "treasure";
	if (roomNumber === 1) return "combat";
	if (roomNumber === 8 || roomNumber === 28) return "rest";
	if (roomNumber === 18 || roomNumber === 38) return "event";
	if (roomNumber === 24 || roomNumber === 44) return "shop";
	if (roomNumber === 7 || roomNumber === 17 || roomNumber === 27 || roomNumber === 37 || roomNumber === 47) return "elite";
	return "combat";
}
function calculateEnemyCount(roomNumber, sizeCategory, rng) {
	if (BOSS_ROOMS.includes(roomNumber)) return 1;
	if (CHEST_ROOMS.includes(roomNumber)) return rng.int(1, 2);
	let minCount;
	let maxCount;
	let baseCount;
	if (roomNumber <= 15) {
		minCount = 3;
		maxCount = 5;
		baseCount = rng.int(3, 4);
	} else if (roomNumber <= 35) {
		minCount = 4;
		maxCount = 7;
		baseCount = rng.int(4, 6);
	} else {
		minCount = 5;
		maxCount = 9;
		baseCount = rng.int(6, 8);
	}
	let sizeBonus = 0;
	if (sizeCategory === "small") sizeBonus = -1;
	else if (sizeCategory === "large") sizeBonus = 1;
	else if (sizeCategory === "arena") sizeBonus = 2;
	return Math.max(minCount, Math.min(maxCount, baseCount + sizeBonus));
}
function calculateEnemyStats(baseHp, baseAtk, baseDef, baseSpeed, baseCooldown, baseXp, baseCoins, enemyLevel, isBoss = false) {
	const level = Math.max(1, Math.min(50, enemyLevel));
	const offset = level - 1;
	if (isBoss) {
		const bossHpMult = 1 + offset * .08;
		const bossAtkMult = 1 + offset * .05;
		const bossDefBonus = Math.floor(offset * .2);
		return {
			level,
			hp: Math.round(baseHp * bossHpMult),
			maxHp: Math.round(baseHp * bossHpMult),
			attack: Math.round(baseAtk * bossAtkMult),
			defense: baseDef + bossDefBonus,
			speed: Math.min(85, baseSpeed + Math.floor(offset * .25)),
			attackCooldownMs: Math.max(900, baseCooldown - offset * 10),
			xpReward: Math.round(baseXp * (1 + offset * .065)),
			coinReward: Math.round(baseCoins + offset * 8)
		};
	}
	const hpMult = 1 + offset * .075;
	const atkMult = 1 + offset * .048;
	const defBonus = Math.floor(offset / 5);
	const speed = Math.min(95, baseSpeed + Math.floor(offset * .35));
	const attackCooldownMs = Math.max(850, baseCooldown - offset * 12);
	const xpReward = Math.round(baseXp * (1 + offset * .065));
	const coinReward = Math.round(baseCoins + offset * 3);
	const finalHp = Math.round(baseHp * hpMult);
	return {
		level,
		hp: finalHp,
		maxHp: finalHp,
		attack: Math.round(baseAtk * atkMult),
		defense: baseDef + defBonus,
		speed,
		attackCooldownMs,
		xpReward,
		coinReward
	};
}
function findValidSpawnTile(room) {
	const { width, height, tiles, spawn, exit, props, enemies } = room;
	const isSafeTile = (tx, ty) => {
		if (tx < 1 || tx >= width - 1 || ty < 1 || ty >= height - 1) return false;
		if (tiles[ty]?.[tx] !== "floor") return false;
		if (props && props.some((p) => p.tileX === tx && p.tileY === ty)) return false;
		if (enemies && enemies.some((e) => e.tileX === tx && e.tileY === ty)) return false;
		if (exit.x === tx && exit.y === ty) return false;
		return isPathConnected(tiles, {
			x: tx,
			y: ty
		}, exit, width, height);
	};
	if (isSafeTile(spawn.x, spawn.y)) return spawn;
	const queue = [[spawn.x, spawn.y]];
	const visited = /* @__PURE__ */ new Set([`${spawn.x},${spawn.y}`]);
	const dirs = [
		[0, 1],
		[1, 0],
		[0, -1],
		[-1, 0],
		[1, 1],
		[-1, 1],
		[1, -1],
		[-1, -1]
	];
	while (queue.length > 0) {
		const [cx, cy] = queue.shift();
		if (isSafeTile(cx, cy)) return {
			x: cx,
			y: cy
		};
		for (const [dx, dy] of dirs) {
			const nx = cx + dx;
			const ny = cy + dy;
			const key = `${nx},${ny}`;
			if (nx >= 0 && nx < width && ny >= 0 && ny < height && !visited.has(key)) {
				visited.add(key);
				queue.push([nx, ny]);
			}
		}
	}
	return spawn;
}
/**
* Validates with BFS if there is an unobstructed walkable path from start to exit.
*/
function isPathConnected(tiles, start, exit, width, height) {
	const actualHeight = height ?? tiles.length;
	const actualWidth = width ?? tiles[0]?.length ?? 0;
	if (actualHeight === 0 || actualWidth === 0) return false;
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
			if (nx >= 0 && nx < actualWidth && ny >= 0 && ny < actualHeight && !visited.has(key) && tiles[ny]?.[nx] === "floor") {
				visited.add(key);
				queue.push([nx, ny]);
			}
		}
	}
	return false;
}
/**
* Generates a fallback guaranteed safe room layout (+15% scale).
*/
function createSafeFallbackRoom(id, index, kind, title, biome, floor, width = MAP_CONFIG.roomSizeCategories.medium.width, height = MAP_CONFIG.roomSizeCategories.medium.height, themeId = "lighting") {
	return {
		id,
		index,
		kind,
		title,
		biome,
		theme: themeId,
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
* Carves an axis-aligned rectangular corridor between (x1, y1) and (x2, y2) with specified corridor width.
*/
function carveCorridor(tiles, x1, y1, x2, y2, corridorWidth, maxWidth, maxHeight) {
	const half = Math.floor(corridorWidth / 2);
	const minX = Math.min(x1, x2);
	const maxX = Math.max(x1, x2);
	for (let x = minX; x <= maxX; x++) for (let w = -half; w <= half; w++) {
		const cy = y1 + w;
		if (cy > 0 && cy < maxHeight - 1 && x > 0 && x < maxWidth - 1) tiles[cy][x] = "floor";
	}
	const minY = Math.min(y1, y2);
	const maxY = Math.max(y1, y2);
	for (let y = minY; y <= maxY; y++) for (let w = -half; w <= half; w++) {
		const cx = x2 + w;
		if (cx > 0 && cx < maxWidth - 1 && y > 0 && y < maxHeight - 1) tiles[y][cx] = "floor";
	}
}
/**
* Generates a single procedural room/level with guaranteed spawn -> exit connectivity,
* irregular shapes (L, T, U, cross), bifurcations, loops, and dead-end pockets.
*/
function generateSingleRoom(id, index, kind, seed, biome = "digital", floor = 1, customWidth, customHeight, themeId = "lighting") {
	const rng = new RunRNG(seed ^ index * 7919 ^ floor * 3571);
	let sizeCategory = "medium";
	if (kind === "boss") sizeCategory = "arena";
	else if (kind === "treasure" || kind === "rest") sizeCategory = rng.chance(.6) ? "small" : "medium";
	else if (kind === "elite") sizeCategory = "large";
	else sizeCategory = rng.pick([
		"small",
		"medium",
		"large"
	]);
	const baseDimensions = MAP_CONFIG.roomSizeCategories[sizeCategory];
	const width = customWidth ?? baseDimensions.width;
	const height = customHeight ?? baseDimensions.height;
	let shape = "rectangle";
	if (kind !== "boss" && rng.chance(MAP_CONFIG.irregularRoomChance)) shape = rng.pick([
		"L",
		"T",
		"U",
		"cross"
	]);
	const roomTitles = {
		start: "Portal de Entrada",
		combat: `Setor de Segurança 0${index + 1}`,
		treasure: "Câmara de Suprimentos",
		elite: "Portão da Sentinela de Elite",
		event: "Terminal de Dados Antigo",
		rest: "Nó de Regeneração",
		shop: "Mercador Digital",
		boss: floor === 10 ? "Covil de Kuwagamon" : floor === 20 ? "Cratera do Meramon Incandescente" : floor === 30 ? "Abismo de Seadramon" : floor === 40 ? "Usina de MetalEtemon" : floor === 50 ? "Núcleo de BlackWarGreymon (Chefe Final)" : `Arena do Guardião (Andar ${floor})`
	};
	const hasLoop = rng.chance(MAP_CONFIG.loopChance);
	const hasDeadEnd = rng.chance(MAP_CONFIG.deadEndChance);
	for (let attempt = 1; attempt <= MAP_CONFIG.maxGenerationAttempts; attempt += 1) {
		const tiles = Array.from({ length: height }, () => Array.from({ length: width }, () => "wall"));
		const spawn = {
			x: 3,
			y: Math.floor(height / 2)
		};
		const exit = {
			x: width - 4,
			y: Math.floor(height / 2)
		};
		if (shape === "rectangle" || kind === "boss") for (let y = 1; y < height - 1; y++) for (let x = 1; x < width - 1; x++) tiles[y][x] = "floor";
		else if (shape === "L") {
			const splitY = Math.floor(height * .45);
			const splitX = Math.floor(width * .55);
			for (let y = splitY; y < height - 1; y++) for (let x = 1; x < width - 1; x++) tiles[y][x] = "floor";
			for (let y = 1; y < height - 1; y++) for (let x = 1; x < splitX; x++) tiles[y][x] = "floor";
		} else if (shape === "T") {
			const barHeight = Math.floor(height * .5);
			const stemLeft = Math.floor(width * .25);
			const stemRight = Math.floor(width * .75);
			for (let y = 1; y < barHeight; y++) for (let x = 1; x < width - 1; x++) tiles[y][x] = "floor";
			for (let y = 1; y < height - 1; y++) for (let x = stemLeft; x < stemRight; x++) tiles[y][x] = "floor";
		} else if (shape === "U") {
			const bottomY = Math.floor(height * .55);
			const colWidth = Math.floor(width * .35);
			for (let y = bottomY; y < height - 1; y++) for (let x = 1; x < width - 1; x++) tiles[y][x] = "floor";
			for (let y = 1; y < height - 1; y++) {
				for (let x = 1; x < colWidth; x++) tiles[y][x] = "floor";
				for (let x = width - 1 - colWidth; x < width - 1; x++) tiles[y][x] = "floor";
			}
		} else if (shape === "cross") {
			const hStartY = Math.floor(height * .25);
			const hEndY = Math.floor(height * .75);
			const vStartX = Math.floor(width * .25);
			const vEndX = Math.floor(width * .75);
			for (let y = hStartY; y < hEndY; y++) for (let x = 1; x < width - 1; x++) tiles[y][x] = "floor";
			for (let y = 1; y < height - 1; y++) for (let x = vStartX; x < vEndX; x++) tiles[y][x] = "floor";
		}
		for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
			const sx = spawn.x + dx;
			const sy = spawn.y + dy;
			if (sx > 0 && sx < width - 1 && sy > 0 && sy < height - 1) tiles[sy][sx] = "floor";
			const ex = exit.x + dx;
			const ey = exit.y + dy;
			if (ex > 0 && ex < width - 1 && ey > 0 && ey < height - 1) tiles[ey][ex] = "floor";
		}
		const corridorWidth = rng.int(MAP_CONFIG.minCorridorWidth, MAP_CONFIG.maxCorridorWidth);
		carveCorridor(tiles, spawn.x, spawn.y, exit.x, exit.y, corridorWidth, width, height);
		if (hasLoop && kind !== "boss") {
			const loopCorridorWidth = rng.int(1, 2);
			const upperY = Math.max(2, Math.floor(height * .22));
			const lowerY = Math.min(height - 3, Math.floor(height * .78));
			const midX = Math.floor(width / 2);
			carveCorridor(tiles, spawn.x, spawn.y, midX, upperY, loopCorridorWidth, width, height);
			carveCorridor(tiles, midX, upperY, exit.x, exit.y, loopCorridorWidth, width, height);
			carveCorridor(tiles, spawn.x, spawn.y, midX, lowerY, loopCorridorWidth, width, height);
			carveCorridor(tiles, midX, lowerY, exit.x, exit.y, loopCorridorWidth, width, height);
		}
		let deadEndPropX = -1;
		let deadEndPropY = -1;
		if (hasDeadEnd && kind !== "boss") {
			const branchX = rng.int(6, width - 8);
			const pocketY = rng.chance(.5) ? 2 : height - 3;
			carveCorridor(tiles, branchX, spawn.y, branchX, pocketY, 2, width, height);
			for (let py = Math.max(1, pocketY - 1); py <= Math.min(height - 2, pocketY + 1); py++) for (let px = Math.max(1, branchX - 1); px <= Math.min(width - 2, branchX + 1); px++) tiles[py][px] = "floor";
			deadEndPropX = branchX;
			deadEndPropY = pocketY;
		}
		if (kind !== "boss") {
			const numObstacles = rng.int(2, 6);
			for (let o = 0; o < numObstacles; o++) {
				const ox = rng.int(5, width - 6);
				const oy = rng.int(2, height - 3);
				const distToSpawn = Math.hypot(ox - spawn.x, oy - spawn.y);
				const distToExit = Math.hypot(ox - exit.x, oy - exit.y);
				if (distToSpawn > 3 && distToExit > 3 && tiles[oy][ox] === "floor") {
					tiles[oy][ox] = "wall";
					if (rng.chance(.3) && ox + 1 < width - 5 && tiles[oy][ox + 1] === "floor") tiles[oy][ox + 1] = "wall";
				}
			}
		}
		if (isPathConnected(tiles, spawn, exit, width, height)) {
			const enemies = [];
			if (kind === "boss") {
				const bossName = floor === 10 ? "Kuwagamon da Fenda" : floor === 20 ? "Meramon Incandescente" : floor === 30 ? "Seadramon Glacial" : floor === 40 ? "MetalEtemon Tirano Metálico" : floor === 50 ? "BlackWarGreymon (Chefe Final)" : `Guardião da Sala ${floor}`;
				const bossStats = calculateEnemyStats(280, 18, 6, 70, 1600, 250, 150, floor, true);
				enemies.push({
					id: `${id}_boss_1`,
					name: `${bossName} Lv.${bossStats.level}`,
					kind: "boss",
					level: bossStats.level,
					tileX: Math.floor(width / 2) + 2,
					tileY: Math.floor(height / 2),
					hp: bossStats.hp,
					maxHp: bossStats.maxHp,
					attack: bossStats.attack,
					defense: bossStats.defense,
					speed: bossStats.speed,
					xpReward: bossStats.xpReward,
					coinReward: bossStats.coinReward
				});
			} else {
				const enemyCount = calculateEnemyCount(floor, sizeCategory, rng);
				for (let e = 0; e < enemyCount; e += 1) {
					let placed = false;
					for (let attempt = 0; attempt < 25 && !placed; attempt += 1) {
						const ex = rng.int(3, width - 4);
						const ey = rng.int(2, height - 3);
						if (tiles[ey]?.[ex] === "floor" && Math.hypot(ex - spawn.x, ey - spawn.y) >= 5 && Math.hypot(ex - exit.x, ey - exit.y) >= 2.5 && !enemies.some((en) => en.tileX === ex && en.tileY === ey)) {
							const enemyLevel = Math.max(1, Math.min(50, floor + rng.int(-1, 1)));
							const isRanged = e % 2 === 1;
							const isElite = kind === "elite" && e === 0;
							const enemyDigimon = isElite ? "etemon" : isRanged ? "veemon" : e % 4 === 0 ? "agumon" : "gabumon";
							const enemyTitle = isElite ? "Sentinela Blindada de Elite" : enemyDigimon === "agumon" ? "Agumon Selvagem" : enemyDigimon === "veemon" ? "Veemon Rebelde" : "Gabumon Selvagem";
							const stats = calculateEnemyStats(isElite ? 110 : isRanged ? 36 : 46, isElite ? 15 : isRanged ? 10 : 8, isElite ? 6 : isRanged ? 1 : 3, isElite ? 65 : isRanged ? 52 : 62, isElite ? 1800 : isRanged ? 1900 : 1300, isElite ? 90 : isRanged ? 28 : 24, isElite ? 50 : 12, enemyLevel, false);
							enemies.push({
								id: `${id}_enemy_${e + 1}`,
								name: `${enemyTitle} Lv.${stats.level}`,
								digimon: enemyDigimon,
								kind: isElite ? "elite" : isRanged ? "ranged" : "melee",
								level: stats.level,
								tileX: ex,
								tileY: ey,
								hp: stats.hp,
								maxHp: stats.maxHp,
								attack: stats.attack,
								defense: stats.defense,
								speed: stats.speed,
								xpReward: stats.xpReward,
								coinReward: stats.coinReward
							});
							placed = true;
						}
					}
				}
			}
			const props = [];
			if (CHEST_ROOMS.includes(floor) || kind === "treasure") props.push({
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
			if (deadEndPropX > 0 && deadEndPropY > 0 && props.length === 0 && kind !== "boss") props.push({
				id: `${id}_pocket_chest`,
				type: "chest",
				tileX: deadEndPropX,
				tileY: deadEndPropY
			});
			const graph = {
				nodes: [{
					id: `${id}_main`,
					kind,
					shape,
					sizeCategory,
					x: 0,
					y: 0,
					width,
					height
				}],
				edges: [{
					from: "spawn",
					to: "exit",
					width: corridorWidth,
					isLoop: hasLoop
				}],
				hasLoops: hasLoop,
				hasDeadEnds: hasDeadEnd
			};
			return {
				id,
				index,
				kind,
				title: roomTitles[kind],
				biome,
				theme: themeId,
				floor,
				width,
				height,
				tiles,
				spawn,
				exit,
				enemies,
				props,
				graph
			};
		}
	}
	console.warn(`[RoomGenerator] Max attempts reached for ${id}. Using safe fallback room.`);
	return createSafeFallbackRoom(id, index, kind, roomTitles[kind], biome, floor, width, height, themeId);
}
/**
* Returns the appropriate biome for a given room number (1 to 50).
*/
function getBiomeForFloor(roomNumber) {
	if (roomNumber <= 10) return "digital";
	if (roomNumber <= 20) return "fire";
	if (roomNumber <= 30) return "ice";
	if (roomNumber <= 40) return "storm";
	return "dark";
}
/**
* Creates a finite, complete run definition containing 50 sequential rooms.
*/
function createFiniteRun(seed, startingRoom = 1, themeId) {
	const currentRoom = Math.max(1, Math.min(50, startingRoom));
	const biome = getBiomeForFloor(currentRoom);
	const kind = getRoomKind(currentRoom);
	const theme = themeId ? getMapTheme(themeId) : pickRandomTheme(new RunRNG(seed));
	const singleRoom = generateSingleRoom(`room_${String(currentRoom).padStart(2, "0")}`, currentRoom - 1, kind, seed, biome, currentRoom, void 0, void 0, theme.id);
	return {
		runId: `run_${seed}_r${currentRoom}_${Date.now()}`,
		seed,
		floor: currentRoom,
		totalRooms: 50,
		theme,
		rooms: [singleRoom]
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
var PLAYABLE_COMBAT_PROFILES = {
	agumon: {
		speciesId: "agumon",
		displayName: "Agumon",
		role: "Ofensivo Equilibrado",
		element: "fogo",
		baseSpeed: 105,
		basic1: {
			name: "Golpe de Garra",
			damage: 18,
			range: 48,
			cooldownMs: 380,
			animation: "player-attack-basic-1",
			attackType: "DIRECTIONAL_MELEE",
			description: "Golpe físico frontal veloz."
		},
		basic2: {
			name: "Chama Bebê",
			damage: 24,
			range: 240,
			cooldownMs: 650,
			animation: "player-attack-basic-2",
			projectileColor: 16737792,
			statusEffect: "burn",
			attackType: "DIRECTIONAL_PROJECTILE",
			description: "Disparo ígneo com chance de queimar o alvo."
		},
		special: {
			name: "Bafo de Pimenta",
			damage: 48,
			area: 96,
			cooldownMs: 2400,
			animation: "player-attack-special",
			shakeIntensity: .008,
			attackType: "RADIAL_AREA",
			description: "Explosão de fogo devastadora em área."
		}
	},
	veemon: {
		speciesId: "veemon",
		displayName: "Veemon",
		role: "Velocidade e Combos",
		element: "neutro",
		baseSpeed: 125,
		basic1: {
			name: "Vee-Punch",
			damage: 14,
			range: 44,
			cooldownMs: 260,
			animation: "player-attack-basic-1",
			attackType: "DIRECTIONAL_MELEE",
			description: "Socos ultrarrápidos com cancelamento ágil."
		},
		basic2: {
			name: "Vee-Laser",
			damage: 20,
			range: 300,
			cooldownMs: 500,
			animation: "player-attack-basic-2",
			projectileColor: 58879,
			attackType: "DIRECTIONAL_PROJECTILE",
			description: "Feixe de plasma digital de longo alcance."
		},
		special: {
			name: "Vee-Headbutt Turbinado",
			damage: 42,
			area: 80,
			cooldownMs: 1900,
			animation: "player-attack-special",
			invulnerableFramesMs: 250,
			shakeIntensity: .006,
			attackType: "DIRECTIONAL_SPECIAL",
			description: "Investida rápida com invulnerabilidade momentânea."
		}
	},
	gabumon: {
		speciesId: "gabumon",
		displayName: "Gabumon",
		role: "Tático e Controle",
		element: "gelo",
		baseSpeed: 98,
		basic1: {
			name: "Chifre Perfurante",
			damage: 20,
			range: 52,
			cooldownMs: 420,
			animation: "player-attack-basic-1",
			attackType: "DIRECTIONAL_MELEE",
			description: "Investida perfurante com alto impacto."
		},
		basic2: {
			name: "Blue Blaster",
			damage: 22,
			range: 220,
			cooldownMs: 700,
			animation: "player-attack-basic-2",
			projectileColor: 3381759,
			statusEffect: "slow",
			attackType: "DIRECTIONAL_PROJECTILE",
			description: "Sopro congelante que reduz a velocidade inimiga."
		},
		special: {
			name: "Garuru-Aura",
			damage: 38,
			area: 110,
			cooldownMs: 2600,
			animation: "player-attack-special",
			reflectProjectiles: true,
			shakeIntensity: .005,
			attackType: "RADIAL_AREA",
			description: "Aura mística que repele inimigos e anula disparos."
		}
	}
};
function getSpeciesCombatProfile(speciesId) {
	return PLAYABLE_COMBAT_PROFILES[speciesId] ?? PLAYABLE_COMBAT_PROFILES.agumon;
}
function createBurnEffect(durationMs = 3e3, damagePerTick = 4, tickIntervalMs = 750) {
	return {
		type: "burn",
		durationMs,
		remainingMs: durationMs,
		tickIntervalMs,
		nextTickMs: tickIntervalMs,
		damagePerTick
	};
}
function createSlowEffect(durationMs = 2500, slowPercent = .35) {
	return {
		type: "slow",
		durationMs,
		remainingMs: durationMs,
		slowPercent
	};
}
function createShockEffect(durationMs = 800) {
	return {
		type: "shock",
		durationMs,
		remainingMs: durationMs
	};
}
function updateEntityStatusEffects(effects, deltaMs) {
	let damageToDeal = 0;
	let isStunned = false;
	let speedMultiplier = 1;
	const nextEffects = [];
	for (const eff of effects) {
		const remaining = eff.remainingMs - deltaMs;
		if (remaining <= 0) continue;
		const next = {
			...eff,
			remainingMs: remaining
		};
		if (eff.type === "burn") {
			let nextTick = (eff.nextTickMs ?? 0) - deltaMs;
			if (nextTick <= 0) {
				damageToDeal += eff.damagePerTick ?? 4;
				nextTick = eff.tickIntervalMs ?? 750;
			}
			next.nextTickMs = nextTick;
		} else if (eff.type === "slow") speedMultiplier = Math.min(speedMultiplier, 1 - (eff.slowPercent ?? .35));
		else if (eff.type === "shock") isStunned = true;
		nextEffects.push(next);
	}
	return {
		activeEffects: nextEffects,
		damageToDeal,
		isStunned,
		speedMultiplier: Math.max(.2, speedMultiplier)
	};
}
function mergeStatusEffect(current, newEffect) {
	const existingIndex = current.findIndex((e) => e.type === newEffect.type);
	if (existingIndex < 0) return [...current, newEffect];
	const updated = [...current];
	updated[existingIndex] = {
		...updated[existingIndex],
		durationMs: Math.max(updated[existingIndex].durationMs, newEffect.durationMs),
		remainingMs: Math.max(updated[existingIndex].remainingMs, newEffect.remainingMs)
	};
	return updated;
}
var BOSS_DEFINITIONS = {
	kuwagamon: {
		id: "kuwagamon",
		name: "Kuwagamon da Fenda",
		biome: "digital",
		baseHp: 300,
		attackDamage: 18,
		defense: 4,
		speed: 55,
		xpReward: 200,
		coinReward: 100,
		guaranteedItemDrop: "carne_digital",
		phases: [{
			phase: 1,
			triggerHpPercent: 1,
			name: "Guardião da Fenda",
			speedMultiplier: 1,
			attackCooldownMs: 1800,
			hasAreaTelegraph: false,
			hasRadialProjectiles: false,
			description: "Investidas agressivas e golpes de tenazes."
		}, {
			phase: 2,
			triggerHpPercent: .5,
			name: "Fase 2: Fúria Digital",
			speedMultiplier: 1.35,
			attackCooldownMs: 1300,
			hasAreaTelegraph: true,
			hasRadialProjectiles: true,
			description: "Sobrecarga de dados com rajada quádrupla e pisada telegrafada."
		}]
	},
	meramon: {
		id: "meramon",
		name: "Meramon Incandescente",
		biome: "fire",
		baseHp: 480,
		attackDamage: 24,
		defense: 6,
		speed: 52,
		xpReward: 320,
		coinReward: 150,
		guaranteedItemDrop: "carne_digital",
		phases: [{
			phase: 1,
			triggerHpPercent: 1,
			name: "Espírito das Chamas",
			speedMultiplier: 1,
			attackCooldownMs: 1900,
			hasAreaTelegraph: false,
			hasRadialProjectiles: false,
			hazardType: "lava",
			description: "Socos de fogo e projeção de brasas."
		}, {
			phase: 2,
			triggerHpPercent: .45,
			name: "Fase 2: Erupção Magmática",
			speedMultiplier: 1.35,
			attackCooldownMs: 1200,
			hasAreaTelegraph: true,
			hasRadialProjectiles: true,
			hazardType: "lava",
			description: "Ondas de calor e rajadas ígneas omnidirecionais."
		}]
	},
	seadramon: {
		id: "seadramon",
		name: "Seadramon Glacial",
		biome: "ice",
		baseHp: 680,
		attackDamage: 30,
		defense: 8,
		speed: 60,
		xpReward: 450,
		coinReward: 200,
		guaranteedItemDrop: "fruta_digital",
		phases: [{
			phase: 1,
			triggerHpPercent: 1,
			name: "Guardião do Oceano de Dados",
			speedMultiplier: 1,
			attackCooldownMs: 1700,
			hasAreaTelegraph: false,
			hasRadialProjectiles: false,
			hazardType: "lightning",
			description: "Sopro congelante em linha e descargas frias."
		}, {
			phase: 2,
			triggerHpPercent: .5,
			name: "Fase 2: Tempestade de Gelo",
			speedMultiplier: 1.4,
			attackCooldownMs: 1100,
			hasAreaTelegraph: true,
			hasRadialProjectiles: true,
			hazardType: "lightning",
			description: "Descargas elétricas no solo e dispersão gélida em 4 direções."
		}]
	},
	metaletemon: {
		id: "metaletemon",
		name: "MetalEtemon Tirano Metálico",
		biome: "storm",
		baseHp: 920,
		attackDamage: 38,
		defense: 12,
		speed: 65,
		xpReward: 600,
		coinReward: 300,
		guaranteedItemDrop: "fruta_digital",
		phases: [{
			phase: 1,
			triggerHpPercent: 1,
			name: "Tirano de Metal",
			speedMultiplier: 1,
			attackCooldownMs: 1600,
			hasAreaTelegraph: false,
			hasRadialProjectiles: false,
			hazardType: "lightning",
			description: "Golpes pesados com blindagem de Chrome Digizoid."
		}, {
			phase: 2,
			triggerHpPercent: .45,
			name: "Fase 2: Sobrecarga Metálica",
			speedMultiplier: 1.45,
			attackCooldownMs: 1e3,
			hasAreaTelegraph: true,
			hasRadialProjectiles: true,
			hazardType: "lightning",
			description: "Descargas de alta voltagem contínuas e disparos omnidirecionais."
		}]
	},
	wargeymon: {
		id: "wargeymon",
		name: "BlackWarGreymon (Chefe Final)",
		biome: "dark",
		baseHp: 1350,
		attackDamage: 48,
		defense: 16,
		speed: 75,
		xpReward: 1200,
		coinReward: 600,
		guaranteedItemDrop: "carne_digital",
		phases: [{
			phase: 1,
			triggerHpPercent: 1,
			name: "Soberano do Núcleo Negro",
			speedMultiplier: 1,
			attackCooldownMs: 1500,
			hasAreaTelegraph: true,
			hasRadialProjectiles: true,
			hazardType: "lava",
			description: "Garras Dracônicas e esferas de fogo sombrio concentradas."
		}, {
			phase: 2,
			triggerHpPercent: .5,
			name: "Fase 2: Fúria do Dragão Negro (Clímax)",
			speedMultiplier: 1.5,
			attackCooldownMs: 900,
			hasAreaTelegraph: true,
			hasRadialProjectiles: true,
			hazardType: "lava",
			description: "Gaia Force sombria com erupção cataclísmica e choque devastador."
		}]
	}
};
function getBossForFloor(floor, biome) {
	if (floor === 10) return BOSS_DEFINITIONS.kuwagamon;
	if (floor === 20) return BOSS_DEFINITIONS.meramon;
	if (floor === 30) return BOSS_DEFINITIONS.seadramon;
	if (floor === 40) return BOSS_DEFINITIONS.metaletemon;
	if (floor === 50) return BOSS_DEFINITIONS.wargeymon;
	if (biome === "fire" || floor > 10 && floor <= 20) return BOSS_DEFINITIONS.meramon;
	if (biome === "ice" || floor > 20 && floor <= 30) return BOSS_DEFINITIONS.seadramon;
	if (biome === "storm" || floor > 30 && floor <= 40) return BOSS_DEFINITIONS.metaletemon;
	if (biome === "dark" || floor > 40) return BOSS_DEFINITIONS.wargeymon;
	return BOSS_DEFINITIONS.kuwagamon;
}
function createLavaHazard(id, x, y, radius = 32) {
	return {
		id,
		type: "lava",
		x,
		y,
		radius,
		isActive: true,
		cooldownMs: 800,
		timerMs: 0,
		damage: 4
	};
}
function createLightningHazard(id, x, y, radius = 40) {
	return {
		id,
		type: "lightning",
		x,
		y,
		radius,
		isActive: false,
		cooldownMs: 2400,
		timerMs: 2400,
		damage: 12
	};
}
/**
* Retorna o vetor unitário correspondente à direção do personagem.
*
* right: { x: 1, y: 0 }
* left:  { x: -1, y: 0 }
* up:    { x: 0, y: -1 }
* down:  { x: 0, y: 1 }
*/
function getFacingVector(dir) {
	switch (dir) {
		case "up": return {
			x: 0,
			y: -1
		};
		case "down": return {
			x: 0,
			y: 1
		};
		case "left": return {
			x: -1,
			y: 0
		};
		case "right": return {
			x: 1,
			y: 0
		};
	}
}
/**
* Retorna as coordenadas absolutas (x, y) de spawn à frente do personagem.
*
* RIGHT: origin.x + offset, origin.y
* LEFT:  origin.x - offset, origin.y
* UP:    origin.x,          origin.y - offset
* DOWN:  origin.x,          origin.y + offset
*/
function getAttackSpawnPosition(origin, dir, offset) {
	const v = getFacingVector(dir);
	return {
		x: origin.x + v.x * offset,
		y: origin.y + v.y * offset
	};
}
/**
* Retorna a posição central da hitbox direcional para ataques melee.
*/
function getDirectionalHitboxPosition(origin, dir, offset) {
	return getAttackSpawnPosition(origin, dir, offset);
}
/**
* Aplica velocidade direcional com base na direção do personagem.
*
* RIGHT: vx = +speed, vy = 0
* LEFT:  vx = -speed, vy = 0
* UP:    vx = 0,      vy = -speed
* DOWN:  vx = 0,      vy = +speed
*/
function applyDirectionalVelocity(dir, speed) {
	const v = getFacingVector(dir);
	return {
		vx: v.x * speed,
		vy: v.y * speed
	};
}
/**
* Rotação em radianos para orientar visualmente projéteis ou efeitos
* cuja arte base aponta para a DIREITA (0 rad).
*
* RIGHT: 0 rad (0°)
* DOWN:  PI / 2 rad (90°)
* LEFT:  PI rad (180°)
* UP:    -PI / 2 rad (-90°)
*/
function getProjectileRotation(dir) {
	switch (dir) {
		case "right": return 0;
		case "down": return Math.PI / 2;
		case "left": return Math.PI;
		case "up": return -Math.PI / 2;
	}
}
var KNOWN_DIGIMON_SPECIES = [
	"agumon",
	"veemon",
	"gabumon",
	"etemon",
	"flamedramon",
	"garurumon",
	"geogreymon",
	"metaletemon",
	"wargreymon",
	"weregarurumon",
	"xvmon"
];
var ENEMY_SPECIES_ACTION_FRAMES = {
	agumon: {
		idle: 9,
		attack_01: 12,
		hit: 1,
		death: 1
	},
	veemon: {
		idle: 4,
		attack_01: 8,
		hit: 3,
		death: 3
	},
	gabumon: {
		idle: 10,
		attack_01: 12
	},
	etemon: {
		idle: 10,
		attack_01: 12
	},
	garurumon: {
		idle: 10,
		attack_01: 12
	},
	flamedramon: { idle: 1 },
	geogreymon: {
		idle: 10,
		attack_01: 12
	},
	metaletemon: {
		idle: 10,
		attack_01: 12
	},
	wargreymon: {
		idle: 10,
		attack_01: 12
	},
	weregarurumon: {
		idle: 10,
		attack_01: 12
	},
	xvmon: {
		idle: 8,
		attack_01: 8
	},
	kingetemon: {}
};
/**
* Normaliza qualquer string ou nome de personagem para o id canônico do Digimon.
* Trata maiúsculas/minúsculas, hífens, espaços e nomes compostos.
*/
function normalizeDigimonName(name) {
	if (!name) return "gabumon";
	const cleaned = name.toLowerCase().trim().replace(/[-_\s]+/g, "");
	if (cleaned.includes("agumon")) return "agumon";
	if (cleaned.includes("veemon") || cleaned.includes("chibimon") || cleaned.includes("vmon")) return "veemon";
	if (cleaned.includes("gabumon") || cleaned.includes("goburimon") || cleaned.includes("gazimon")) return "gabumon";
	if (cleaned.includes("metaletemon")) return "metaletemon";
	if (cleaned.includes("etemon") || cleaned.includes("guardromon") || cleaned.includes("sentinela")) return "etemon";
	if (cleaned.includes("flamedramon")) return "flamedramon";
	if (cleaned.includes("weregarurumon")) return "weregarurumon";
	if (cleaned.includes("garurumon")) return "garurumon";
	if (cleaned.includes("geogreymon")) return "geogreymon";
	if (cleaned.includes("wargreymon") || cleaned.includes("wargeymon")) return "wargreymon";
	if (cleaned.includes("xvmon") || cleaned.includes("exveemon")) return "xvmon";
	for (const known of KNOWN_DIGIMON_SPECIES) if (cleaned === known) return known;
	return "gabumon";
}
/**
* Retorna o caminho base dos sprites do Digimon no navegador.
* Exemplo: normalizeDigimonName("Agumon") => "/sprites/agumon/"
*/
function getDigimonSpriteBasePath(speciesOrName) {
	return `/sprites/${normalizeDigimonName(speciesOrName)}/`;
}
/**
* Resolve a animação solicitada para um Digimon aplicando fallback seguro.
* Prioridades:
* - attack_02 -> attack_01 -> attack -> idle
* - walk -> idle (se walk não tiver frames recortados)
* - hit -> hit (se existir) ou fallback para idle com flash de tint
* - death -> death (se existir) ou fallback para idle com tween
*/
function resolveEnemyAnimation(species, requestedAction) {
	const speciesFrames = ENEMY_SPECIES_ACTION_FRAMES[normalizeDigimonName(species)] || {};
	const directCount = speciesFrames[requestedAction];
	if (directCount && directCount > 0) return {
		actualAction: requestedAction,
		fallbackUsed: false,
		frameCount: directCount
	};
	if (requestedAction === "attack_02" || requestedAction === "attack" || requestedAction === "special") {
		if (speciesFrames.attack_01 && speciesFrames.attack_01 > 0) return {
			actualAction: "attack_01",
			fallbackUsed: true,
			frameCount: speciesFrames.attack_01
		};
	}
	const idleCount = speciesFrames.idle ?? 0;
	if (requestedAction === "walk") return {
		actualAction: "idle",
		fallbackUsed: true,
		frameCount: idleCount
	};
	if (requestedAction === "hit") return {
		actualAction: "idle",
		fallbackUsed: true,
		frameCount: idleCount
	};
	if (requestedAction === "death") return {
		actualAction: "idle",
		fallbackUsed: true,
		frameCount: idleCount
	};
	return {
		actualAction: "idle",
		fallbackUsed: requestedAction !== "idle",
		frameCount: idleCount
	};
}
/**
* Retorna uma chave única de animação do Phaser para o inimigo.
* Exemplo: enemy_agumon_idle, enemy_veemon_attack_01
*/
function getEnemyAnimationKey(species, action) {
	return `enemy_${normalizeDigimonName(species)}_${action}`;
}
var DIGIMON_VFX_PROFILES = {
	agumon: {
		speciesId: "agumon",
		basic1: {
			hasVisualEffect: false,
			offsetForward: 32,
			durationMs: 140
		},
		basic2: {
			hasProjectile: true,
			projectileAnimKey: "agumon_projectile_dragon",
			projectileTextureKey: "agumon_projectile_dragon_0",
			scale: .85,
			speed: 320,
			impactAnimKey: "agumon_effect_mega_blast",
			impactTextureKey: "agumon_effect_mega_blast_0",
			impactScale: .65,
			impactDurationMs: 240
		},
		special: {
			hasVisualEffect: true,
			effectAnimKey: "agumon_effect_mega_blast",
			effectTextureKey: "agumon_effect_mega_blast_0",
			scale: 1.35,
			offsetForward: 48,
			durationMs: 380
		},
		hitImpact: {
			animKey: "agumon_effect_mega_blast",
			textureKey: "agumon_effect_mega_blast_0",
			scale: .45,
			durationMs: 150
		},
		heal: {
			animKey: "agumon_heal",
			textureKey: "agumon_heal_0",
			scale: .8,
			durationMs: 400
		}
	},
	veemon: {
		speciesId: "veemon",
		basic1: {
			hasVisualEffect: true,
			effectAnimKey: "veemon_effects_attack_1",
			effectTextureKey: "veemon_effects_attack_1_0",
			scale: .95,
			offsetForward: 36,
			rotationMode: "match_facing",
			durationMs: 180
		},
		basic2: {
			hasProjectile: true,
			projectileAnimKey: "veemon_projectile_laser",
			projectileTextureKey: "veemon_projectile_laser_0",
			scale: .9,
			speed: 390,
			impactAnimKey: "veemon_effects_hit",
			impactTextureKey: "veemon_effects_hit_0",
			impactScale: 1.15,
			impactDurationMs: 160
		},
		special: {
			hasVisualEffect: true,
			effectAnimKey: "veemon_effects_special",
			effectTextureKey: "veemon_effects_special_0",
			secondaryAnimKey: "veemon_effects_attack_2",
			secondaryTextureKey: "veemon_effects_attack_2_0",
			scale: 1.25,
			secondaryScale: 1.05,
			offsetForward: 44,
			durationMs: 350,
			isGroundBurst: true
		},
		hitImpact: {
			animKey: "veemon_effects_hit",
			textureKey: "veemon_effects_hit_0",
			scale: 1,
			durationMs: 140
		},
		heal: {
			animKey: "veemon_heal",
			textureKey: "veemon_heal_0",
			scale: .85,
			durationMs: 400
		}
	},
	gabumon: {
		speciesId: "gabumon",
		basic1: {
			hasVisualEffect: false,
			offsetForward: 30,
			durationMs: 140
		},
		basic2: {
			hasProjectile: true,
			projectileTextureKey: "veemon_projectile_laser_0",
			scale: .8,
			speed: 280,
			impactTextureKey: "veemon_effects_hit_0",
			impactScale: .9,
			impactDurationMs: 150
		},
		special: {
			hasVisualEffect: true,
			effectAnimKey: "veemon_effects_special",
			effectTextureKey: "veemon_effects_special_0",
			scale: 1.1,
			offsetForward: 40,
			durationMs: 320
		},
		hitImpact: {
			textureKey: "veemon_effects_hit_0",
			scale: .9,
			durationMs: 130
		},
		heal: {
			textureKey: "veemon_effects_hit_0",
			scale: .8,
			durationMs: 350
		}
	}
};
/**
* Returns the VFX profile for the specified species with safe fallback to Agumon.
*/
function getSpeciesVfxProfile(speciesId) {
	return DIGIMON_VFX_PROFILES[speciesId.toLowerCase().trim()] || DIGIMON_VFX_PROFILES.agumon;
}
/**
* Computes spawn position for directional effects with forward distance and vertical centering.
*/
function getDirectionalVfxPosition(origin, direction, forwardDist) {
	switch (direction) {
		case "up": return {
			x: origin.x,
			y: origin.y - forwardDist
		};
		case "down": return {
			x: origin.x,
			y: origin.y + forwardDist
		};
		case "left": return {
			x: origin.x - forwardDist,
			y: origin.y
		};
		default: return {
			x: origin.x + forwardDist,
			y: origin.y
		};
	}
}
/**
* Computes rotation (in radians) and flip flags for directional visual effects.
*/
function getVfxTransform(direction) {
	switch (direction) {
		case "up": return {
			rotation: -Math.PI / 2,
			flipX: false,
			flipY: false
		};
		case "down": return {
			rotation: Math.PI / 2,
			flipX: false,
			flipY: false
		};
		case "left": return {
			rotation: Math.PI,
			flipX: false,
			flipY: true
		};
		default: return {
			rotation: 0,
			flipX: false,
			flipY: false
		};
	}
}
var TILE_SIZE = 48;
var PLAYER_SCALE = .65;
var DigitalPathGame = class {
	game = null;
	run = null;
	runTheme = MAP_THEMES.lighting;
	currentRoomNumber = 1;
	currentRoomIndex = 0;
	generatedRoomIds = /* @__PURE__ */ new Set();
	activeScene = null;
	isStopped = false;
	async start(options) {
		this.isStopped = false;
		if (this.game) this.stop();
		if (options.input.speciesId !== options.manifest.id) throw new Error("Sprite manifest does not match the current Digimon");
		if (!validateSpriteManifest(options.manifest)) throw new Error("Digital Path sprite manifest is not runtime-ready");
		console.log("[Phaser Runtime] DigitalPathGame.start() starting. floorNumber:", options.floorNumber);
		const Phaser = await import("../_libs/phaser.mjs").then((n) => n.t);
		if (this.isStopped) {
			console.log("[Phaser Runtime] DigitalPathGame.start aborted: isStopped is true");
			return false;
		}
		if (options.parent) {
			if (typeof options.parent === "string") {
				const el = document.getElementById(options.parent);
				if (el) el.innerHTML = "";
			} else if (options.parent instanceof HTMLElement) options.parent.innerHTML = "";
		}
		this.currentRoomNumber = Math.max(1, Math.min(50, options.floorNumber || 1));
		this.currentRoomIndex = this.currentRoomNumber - 1;
		this.runTheme = pickRandomTheme(new RunRNG(options.seed));
		this.run = createFiniteRun(options.seed, this.currentRoomNumber, this.runTheme.id);
		this.generatedRoomIds.clear();
		console.log(`[Phaser Runtime] Run created. Theme: ${this.runTheme.id} (${this.runTheme.name}) for room ${this.currentRoomNumber}`);
		const self = this;
		const manifest = options.manifest;
		const runRng = new RunRNG(options.seed);
		class DigitalPathScene extends Phaser.Scene {
			player;
			playerHp = 100;
			playerMaxHp = 100;
			playerXp = 0;
			playerCoins = 0;
			invulnerableUntil = 0;
			currentRoomNumber = self.currentRoomNumber;
			bossDefeated = false;
			activeUpgrades = [];
			modifiers = calculateModifiers([]);
			itemsWon = {};
			isPaused = false;
			cursors;
			keys;
			debugOverlayVisible = false;
			debugOverlayContainer = null;
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
			vfxProfile;
			transientVfx = [];
			partnerProfile;
			inputBuffer = null;
			isHitstopped = false;
			screenShakeEnabled = true;
			damageNumbersEnabled = true;
			hazards = [];
			hazardGraphics = [];
			isPlayerAttacking = false;
			facing = "right";
			get facingDirection() {
				return this.facing;
			}
			set facingDirection(dir) {
				this.facing = dir;
				if (this.player) this.player.facingDirection = dir;
			}
			getPlayerCenter() {
				return {
					x: this.player ? this.player.x : 0,
					y: this.player ? this.player.y - 18 : 0
				};
			}
			lastAttackEvent = null;
			recordAttackEvent(slot, facing, originX, originY, vx, vy, rotation) {
				const center = this.getPlayerCenter();
				this.lastAttackEvent = {
					slot,
					facing,
					originX,
					originY,
					playerCenterX: center.x,
					playerCenterY: center.y,
					vx,
					vy,
					rotation,
					timestamp: Date.now()
				};
				if (typeof window !== "undefined") window.__lastAttackEvent = this.lastAttackEvent;
			}
			basic1CooldownUntil = 0;
			basic2CooldownUntil = 0;
			specialCooldownUntil = 0;
			bossTelegraphCircle = null;
			constructor() {
				super({ key: "digital-path-scene" });
			}
			preload() {
				for (const theme of Object.values(MAP_THEMES)) {
					theme.tiles.floorNormal.forEach((p, idx) => {
						this.load.image(`theme_${theme.id}_floor_${idx}`, p);
					});
					(theme.tiles.floorVariation ?? []).forEach((p, idx) => {
						this.load.image(`theme_${theme.id}_floor_var_${idx}`, p);
					});
					(theme.tiles.floorDecor ?? []).forEach((p, idx) => {
						this.load.image(`theme_${theme.id}_floor_decor_${idx}`, p);
					});
					theme.tiles.floorAlternate.forEach((p, idx) => {
						this.load.image(`theme_${theme.id}_floor_alt_${idx}`, p);
					});
					theme.tiles.floorSpecial.forEach((p, idx) => {
						this.load.image(`theme_${theme.id}_floor_spec_${idx}`, p);
					});
					theme.tiles.floorCracked.forEach((p, idx) => {
						this.load.image(`theme_${theme.id}_floor_crack_${idx}`, p);
					});
					theme.tiles.walls.horizontal.forEach((p, idx) => {
						this.load.image(`theme_${theme.id}_wall_h_${idx}`, p);
					});
					theme.tiles.walls.vertical.forEach((p, idx) => {
						this.load.image(`theme_${theme.id}_wall_v_${idx}`, p);
					});
					theme.tiles.walls.top.forEach((p, idx) => {
						this.load.image(`theme_${theme.id}_wall_top_${idx}`, p);
					});
					theme.tiles.walls.bottom.forEach((p, idx) => {
						this.load.image(`theme_${theme.id}_wall_bottom_${idx}`, p);
					});
					theme.tiles.walls.left.forEach((p, idx) => {
						this.load.image(`theme_${theme.id}_wall_left_${idx}`, p);
					});
					theme.tiles.walls.right.forEach((p, idx) => {
						this.load.image(`theme_${theme.id}_wall_right_${idx}`, p);
					});
					theme.tiles.walls.special.forEach((p, idx) => {
						this.load.image(`theme_${theme.id}_wall_spec_${idx}`, p);
					});
					if (theme.tiles.doors.verticalClosed) this.load.image(`theme_${theme.id}_door_closed`, theme.tiles.doors.verticalClosed);
					if (theme.tiles.doors.verticalOpen) this.load.image(`theme_${theme.id}_door_open`, theme.tiles.doors.verticalOpen);
					theme.tiles.chests.closed.forEach((p, idx) => {
						this.load.image(`theme_${theme.id}_chest_closed_${idx}`, p);
					});
					theme.tiles.chests.open.forEach((p, idx) => {
						this.load.image(`theme_${theme.id}_chest_open_${idx}`, p);
					});
				}
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
				const loadedEnemyTextures = /* @__PURE__ */ new Set();
				for (const sp of [
					"agumon",
					"veemon",
					"gabumon",
					"etemon",
					"garurumon",
					"flamedramon"
				]) {
					const basePath = getDigimonSpriteBasePath(sp);
					const idleRes = resolveEnemyAnimation(sp, "idle");
					for (let i = 1; i <= idleRes.frameCount; i++) {
						const pad = String(i).padStart(2, "0");
						const key = `enemy_frame_${sp}_idle_${i}`;
						if (!loadedEnemyTextures.has(key)) {
							loadedEnemyTextures.add(key);
							this.load.image(key, `${basePath}idle/idle_${pad}.png`);
						}
					}
					const atkRes = resolveEnemyAnimation(sp, "attack_01");
					if (atkRes.actualAction === "attack_01" && !atkRes.fallbackUsed) for (let i = 1; i <= atkRes.frameCount; i++) {
						const pad = String(i).padStart(2, "0");
						const key = `enemy_frame_${sp}_attack_01_${i}`;
						if (!loadedEnemyTextures.has(key)) {
							loadedEnemyTextures.add(key);
							this.load.image(key, `${basePath}attack_01/attack_01_${pad}.png`);
						}
					}
					if (ENEMY_SPECIES_ACTION_FRAMES[sp]?.hit) {
						const hitCount = ENEMY_SPECIES_ACTION_FRAMES[sp].hit;
						for (let i = 1; i <= hitCount; i++) {
							const pad = String(i).padStart(2, "0");
							const key = `enemy_frame_${sp}_hit_${i}`;
							if (!loadedEnemyTextures.has(key)) {
								loadedEnemyTextures.add(key);
								this.load.image(key, `${basePath}hit/hit_${pad}.png`);
							}
						}
					}
					if (ENEMY_SPECIES_ACTION_FRAMES[sp]?.death) {
						const deathCount = ENEMY_SPECIES_ACTION_FRAMES[sp].death;
						for (let i = 1; i <= deathCount; i++) {
							const pad = String(i).padStart(2, "0");
							const key = `enemy_frame_${sp}_death_${i}`;
							if (!loadedEnemyTextures.has(key)) {
								loadedEnemyTextures.add(key);
								this.load.image(key, `${basePath}death/death_${pad}.png`);
							}
						}
					}
				}
				for (let i = 0; i < 10; i++) {
					const pad = String(i + 1).padStart(2, "0");
					const veemonPad = String(i % 4 + 1).padStart(2, "0");
					this.load.image(`enemy_gabumon_idle_${i}`, `/sprites/gabumon/idle/idle_${pad}.png`);
					this.load.image(`enemy_veemon_idle_${i}`, `/sprites/veemon/idle/idle_${veemonPad}.png`);
					this.load.image(`enemy_etemon_idle_${i}`, `/sprites/etemon/idle/idle_${pad}.png`);
				}
				for (const item of [
					{
						key: "agumon_projectile_dragon_0",
						path: "/sprites/agumon/projectiles/dragon/projectiles_dragon_01.png"
					},
					{
						key: "agumon_projectile_dragon_1",
						path: "/sprites/agumon/projectiles/dragon/projectiles_dragon_02.png"
					},
					{
						key: "agumon_projectile_dragon_2",
						path: "/sprites/agumon/projectiles/dragon/projectiles_dragon_03.png"
					},
					{
						key: "agumon_effect_mega_blast_0",
						path: "/sprites/agumon/effects/mega-blast/effects_mega_blast_01.png"
					},
					{
						key: "agumon_effect_mega_blast_1",
						path: "/sprites/agumon/effects/mega-blast/effects_mega_blast_02.png"
					},
					{
						key: "agumon_effect_mega_blast_2",
						path: "/sprites/agumon/effects/mega-blast/effects_mega_blast_03.png"
					},
					{
						key: "agumon_effect_mega_blast_3",
						path: "/sprites/agumon/effects/mega-blast/effects_mega_blast_04.png"
					},
					{
						key: "agumon_effect_mega_blast_4",
						path: "/sprites/agumon/effects/mega-blast/effects_mega_blast_05.png"
					},
					{
						key: "agumon_effect_mega_blast_5",
						path: "/sprites/agumon/effects/mega-blast/effects_mega_blast_06.png"
					},
					{
						key: "agumon_heal_0",
						path: "/sprites/agumon/heal/heal_01.png"
					},
					{
						key: "agumon_heal_1",
						path: "/sprites/agumon/heal/heal_02.png"
					},
					{
						key: "agumon_heal_2",
						path: "/sprites/agumon/heal/heal_03.png"
					},
					{
						key: "agumon_heal_3",
						path: "/sprites/agumon/heal/heal_04.png"
					},
					{
						key: "agumon_heal_4",
						path: "/sprites/agumon/heal/heal_05.png"
					},
					{
						key: "veemon_projectile_laser_0",
						path: "/sprites/veemon/projectiles/laser/projectiles_laser_01.png"
					},
					{
						key: "veemon_projectile_laser_1",
						path: "/sprites/veemon/projectiles/laser/projectiles_laser_02.png"
					},
					{
						key: "veemon_effects_attack_1_0",
						path: "/sprites/veemon/effects/attack_01/effects_attack_01_01.png"
					},
					{
						key: "veemon_effects_attack_1_1",
						path: "/sprites/veemon/effects/attack_01/effects_attack_01_02.png"
					},
					{
						key: "veemon_effects_attack_1_2",
						path: "/sprites/veemon/effects/attack_01/effects_attack_01_03.png"
					},
					{
						key: "veemon_effects_attack_2_0",
						path: "/sprites/veemon/effects/attack_02/effects_attack_02_01.png"
					},
					{
						key: "veemon_effects_attack_2_1",
						path: "/sprites/veemon/effects/attack_02/effects_attack_02_02.png"
					},
					{
						key: "veemon_effects_special_0",
						path: "/sprites/veemon/effects/special_attack/effects_special_attack_01.png"
					},
					{
						key: "veemon_effects_special_1",
						path: "/sprites/veemon/effects/special_attack/effects_special_attack_02.png"
					},
					{
						key: "veemon_effects_special_2",
						path: "/sprites/veemon/effects/special_attack/effects_special_attack_03.png"
					},
					{
						key: "veemon_effects_hit_0",
						path: "/sprites/veemon/effects/hit/effects_hit_01.png"
					},
					{
						key: "veemon_heal_0",
						path: "/sprites/veemon/heal/heal_01.png"
					},
					{
						key: "veemon_heal_1",
						path: "/sprites/veemon/heal/heal_02.png"
					},
					{
						key: "veemon_heal_2",
						path: "/sprites/veemon/heal/heal_03.png"
					},
					{
						key: "veemon_heal_3",
						path: "/sprites/veemon/heal/heal_04.png"
					}
				]) if (!this.textures.exists(item.key)) this.load.image(item.key, item.path);
			}
			create() {
				this.isFinished = false;
				this.isTransitioning = false;
				this.partnerProfile = getSpeciesCombatProfile(options.originalSpeciesId || options.input.speciesId);
				this.vfxProfile = getSpeciesVfxProfile(options.originalSpeciesId || options.input.speciesId);
				this.screenShakeEnabled = options.settings?.screenShake ?? true;
				this.damageNumbersEnabled = options.settings?.damageNumbers ?? true;
				this.playerHp = options.input.stats.health || 100;
				this.playerMaxHp = options.input.stats.health || 100;
				this.playerXp = 0;
				this.playerCoins = 0;
				this.cameras.main.setBackgroundColor("#080c14");
				this.registerAnimations();
				if (this.input.keyboard) {
					this.input.keyboard.resetKeys();
					this.input.keyboard.enabled = true;
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
						Esc: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC),
						Tab: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB)
					};
					this.keys.Esc.on("down", () => this.togglePause());
					this.keys.Tab.on("down", () => this.toggleDebugOverlay());
				}
				this.isPaused = false;
				this.isFinished = false;
				this.isTransitioning = false;
				this.isHitstopped = false;
				this.isPlayerAttacking = false;
				try {
					if (this.game.canvas) {
						this.game.canvas.setAttribute("tabindex", "0");
						this.game.canvas.focus();
					}
				} catch (_) {}
				const defaultTexture = resolveManifestAnimation(manifest, "idle")?.frames?.[0] ? `${manifest.id}_idle_0` : "";
				this.player = this.add.sprite(0, 0, defaultTexture);
				this.player.setScale(PLAYER_SCALE);
				this.player.setOrigin(.5, .85);
				this.player.setDepth(RENDER_DEPTH.ENTITIES);
				this.player.facingDirection = this.facing;
				this.player.getFacingDirection = () => this.facingDirection;
				this.performAttackBySlot = (slot) => {
					if (slot === "basic_1") this.performBasicAttack1(this.time.now);
					else if (slot === "basic_2") this.performBasicAttack2(this.time.now);
					else if (slot === "special") this.performSpecialAttack(this.time.now);
				};
				this.setPlayerFacing = (dir) => {
					this.facingDirection = dir;
					if (this.facingDirection === "left") this.player.setFlipX(true);
					else if (this.facingDirection === "right") this.player.setFlipX(false);
				};
				if (this.anims.exists("player-idle")) this.player.play("player-idle");
				this.cameras.main.startFollow(this.player, true, .12, .12);
				this.cameras.main.setZoom(1.15);
				self.activeScene = this;
				console.log("[Phaser Runtime] DigitalPathScene.create() activeScene assigned, room:", this.currentRoomNumber);
				if (typeof window !== "undefined") window.__digitalPathActiveScene = this;
				this.loadRoom(this.currentRoomNumber);
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
				createAnim("player-walk-up", "walk_up", true);
				createAnim("player-walk-down", "walk_down", true);
				createAnim("player-attack-basic-1", "attack_basic_1", false);
				createAnim("player-attack-basic-2", "attack_basic_2", false);
				createAnim("player-attack-special", "attack_special", false);
				createAnim("player-hit", "hit", false);
				createAnim("player-death", "death", false);
				createAnim("player-victory", "victory", false);
				for (const sp of [
					"agumon",
					"veemon",
					"gabumon",
					"etemon",
					"garurumon",
					"flamedramon"
				]) {
					const idleKey = getEnemyAnimationKey(sp, "idle");
					const idleRes = resolveEnemyAnimation(sp, "idle");
					if (!this.anims.exists(idleKey)) this.anims.create({
						key: idleKey,
						frames: Array.from({ length: idleRes.frameCount }, (_, i) => ({ key: `enemy_frame_${sp}_idle_${i + 1}` })),
						frameRate: sp === "veemon" ? 6 : 7,
						repeat: -1
					});
					const walkKey = getEnemyAnimationKey(sp, "walk");
					if (!this.anims.exists(walkKey)) {
						const walkRes = resolveEnemyAnimation(sp, "walk");
						this.anims.create({
							key: walkKey,
							frames: Array.from({ length: walkRes.frameCount }, (_, i) => ({ key: `enemy_frame_${sp}_idle_${i + 1}` })),
							frameRate: 8,
							repeat: -1
						});
					}
					const atkKey = getEnemyAnimationKey(sp, "attack_01");
					const atkRes = resolveEnemyAnimation(sp, "attack_01");
					if (!this.anims.exists(atkKey)) {
						const framePrefix = atkRes.fallbackUsed ? `enemy_frame_${sp}_idle_` : `enemy_frame_${sp}_attack_01_`;
						this.anims.create({
							key: atkKey,
							frames: Array.from({ length: atkRes.frameCount }, (_, i) => ({ key: `${framePrefix}${i + 1}` })),
							frameRate: 10,
							repeat: 0
						});
					}
					if (ENEMY_SPECIES_ACTION_FRAMES[sp]?.hit) {
						const hitKey = getEnemyAnimationKey(sp, "hit");
						if (!this.anims.exists(hitKey)) this.anims.create({
							key: hitKey,
							frames: Array.from({ length: ENEMY_SPECIES_ACTION_FRAMES[sp].hit }, (_, i) => ({ key: `enemy_frame_${sp}_hit_${i + 1}` })),
							frameRate: 8,
							repeat: 0
						});
					}
					if (ENEMY_SPECIES_ACTION_FRAMES[sp]?.death) {
						const deathKey = getEnemyAnimationKey(sp, "death");
						if (!this.anims.exists(deathKey)) this.anims.create({
							key: deathKey,
							frames: Array.from({ length: ENEMY_SPECIES_ACTION_FRAMES[sp].death }, (_, i) => ({ key: `enemy_frame_${sp}_death_${i + 1}` })),
							frameRate: 8,
							repeat: 0
						});
					}
				}
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
				if (!this.anims.exists("agumon_projectile_dragon")) this.anims.create({
					key: "agumon_projectile_dragon",
					frames: [
						0,
						1,
						2
					].map((i) => ({ key: `agumon_projectile_dragon_${i}` })),
					frameRate: 12,
					repeat: -1
				});
				if (!this.anims.exists("agumon_effect_mega_blast")) this.anims.create({
					key: "agumon_effect_mega_blast",
					frames: [
						0,
						1,
						2,
						3,
						4,
						5
					].map((i) => ({ key: `agumon_effect_mega_blast_${i}` })),
					frameRate: 14,
					repeat: 0
				});
				if (!this.anims.exists("agumon_heal")) this.anims.create({
					key: "agumon_heal",
					frames: [
						0,
						1,
						2,
						3,
						4
					].map((i) => ({ key: `agumon_heal_${i}` })),
					frameRate: 10,
					repeat: 0
				});
				if (!this.anims.exists("veemon_projectile_laser")) this.anims.create({
					key: "veemon_projectile_laser",
					frames: [0, 1].map((i) => ({ key: `veemon_projectile_laser_${i}` })),
					frameRate: 12,
					repeat: -1
				});
				if (!this.anims.exists("veemon_effects_attack_1")) this.anims.create({
					key: "veemon_effects_attack_1",
					frames: [
						0,
						1,
						2
					].map((i) => ({ key: `veemon_effects_attack_1_${i}` })),
					frameRate: 14,
					repeat: 0
				});
				if (!this.anims.exists("veemon_effects_attack_2")) this.anims.create({
					key: "veemon_effects_attack_2",
					frames: [0, 1].map((i) => ({ key: `veemon_effects_attack_2_${i}` })),
					frameRate: 12,
					repeat: 0
				});
				if (!this.anims.exists("veemon_effects_special")) this.anims.create({
					key: "veemon_effects_special",
					frames: [
						0,
						1,
						2
					].map((i) => ({ key: `veemon_effects_special_${i}` })),
					frameRate: 14,
					repeat: 0
				});
				if (!this.anims.exists("veemon_effects_hit")) this.anims.create({
					key: "veemon_effects_hit",
					frames: [{ key: "veemon_effects_hit_0" }],
					frameRate: 8,
					repeat: 0
				});
				if (!this.anims.exists("veemon_heal")) this.anims.create({
					key: "veemon_heal",
					frames: [
						0,
						1,
						2,
						3
					].map((i) => ({ key: `veemon_heal_${i}` })),
					frameRate: 10,
					repeat: 0
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
				for (const vfx of this.transientVfx) if (vfx && vfx.active) vfx.destroy();
				this.transientVfx = [];
				if (this.bossTelegraphCircle) {
					this.bossTelegraphCircle.destroy();
					this.bossTelegraphCircle = null;
				}
				for (const h of this.hazardGraphics) h.destroy();
				this.hazardGraphics = [];
				this.hazards = [];
			}
			/**
			* Load a specific finite room arena (1 to 50).
			*/
			loadRoom(roomNumber) {
				this.cleanCurrentRoom();
				this.currentRoomNumber = Math.max(1, Math.min(50, roomNumber));
				self.currentRoomNumber = this.currentRoomNumber;
				self.currentRoomIndex = this.currentRoomNumber - 1;
				const roomSeed = (options.seed ^ this.currentRoomNumber * 2654435761) >>> 0;
				const biome = getBiomeForFloor(this.currentRoomNumber);
				const kind = getRoomKind(this.currentRoomNumber);
				const theme = self.runTheme || MAP_THEMES.lighting;
				const room = generateSingleRoom(`room_${String(this.currentRoomNumber).padStart(2, "0")}`, this.currentRoomNumber - 1, kind, roomSeed, biome, this.currentRoomNumber, void 0, void 0, theme.id);
				this.activeRoom = room;
				self.run = {
					runId: `run_${options.seed}_r${this.currentRoomNumber}`,
					seed: options.seed,
					floor: this.currentRoomNumber,
					totalRooms: 50,
					theme,
					rooms: [room]
				};
				self.generatedRoomIds.add(room.id);
				if (this.modifiers.roomEnterHeal > 0) this.playerHp = Math.min(this.playerMaxHp, this.playerHp + this.modifiers.roomEnterHeal);
				const roomWidthPx = room.width * TILE_SIZE;
				const roomHeightPx = room.height * TILE_SIZE;
				this.cameras.main.setBounds(0, 0, roomWidthPx, roomHeightPx);
				const bgColor = theme.biome === "fire" ? 1705984 : theme.biome === "ice" ? 265240 : theme.biome === "storm" ? 197898 : 395279;
				const bg = this.add.graphics();
				bg.fillStyle(bgColor, 1);
				bg.fillRect(0, 0, roomWidthPx, roomHeightPx);
				bg.setDepth(RENDER_DEPTH.BACKGROUND);
				this.roomTileObjects.push(bg);
				const wallTint = {
					fire: 4856328,
					ice: 796736,
					storm: 1712192,
					digital: 1712192
				}[theme.biome] ?? 1712192;
				const tileHash = (tx, ty) => {
					const roomSeed = room.index * 7919;
					let h = tx * 1664525 + ty * 1013904223 + roomSeed * 22695477 & 2147483647;
					h ^= h >>> 16;
					h = Math.imul(h, 73244475);
					h ^= h >>> 16;
					return (h >>> 0) / 4294967296;
				};
				const floorVariants = theme.tiles.floorVariation ?? [];
				const floorDecorTiles = theme.tiles.floorDecor ?? [];
				const floorVariantFinal = new Uint8Array(room.width * room.height);
				const floorDecorFinal = new Uint8Array(room.width * room.height);
				const totalFloorCells = [];
				const dirs4 = [
					[-1, 0],
					[1, 0],
					[0, -1],
					[0, 1]
				];
				for (let ty = 0; ty < room.height; ty++) for (let tx = 0; tx < room.width; tx++) if (room.tiles[ty][tx] === "floor") {
					const idx = ty * room.width + tx;
					const isNearWall = dirs4.some(([dx, dy]) => {
						const nx = tx + dx, ny = ty + dy;
						return nx < 0 || nx >= room.width || ny < 0 || ny >= room.height || room.tiles[ny][nx] === "wall";
					});
					totalFloorCells.push({
						x: tx,
						y: ty,
						idx,
						isNearWall
					});
				}
				if (floorDecorTiles.length > 0 && totalFloorCells.length > 0) {
					const nearWallCells = totalFloorCells.filter((c) => c.isNearWall);
					const decorTargetCount = Math.min(3, Math.max(1, Math.floor(totalFloorCells.length * .025)));
					const sortedForDecor = [...nearWallCells].sort((a, b) => tileHash(a.x, a.y) - tileHash(b.x, b.y));
					for (let i = 0; i < Math.min(decorTargetCount, sortedForDecor.length); i++) floorDecorFinal[sortedForDecor[i].idx] = 1;
				}
				if (floorVariants.length > 0 && totalFloorCells.length > 0) {
					const numClusters = Math.min(3, Math.max(2, Math.floor(totalFloorCells.length / 40)));
					const sortedSeeds = [...totalFloorCells.filter((c) => !floorDecorFinal[c.idx])].sort((a, b) => tileHash(a.x + 500, a.y + 500) - tileHash(b.x + 500, b.y + 500));
					for (let i = 0; i < Math.min(numClusters, sortedSeeds.length); i++) {
						const seed = sortedSeeds[i];
						floorVariantFinal[seed.idx] = 1;
						for (const [dx, dy] of dirs4) {
							const nx = seed.x + dx, ny = seed.y + dy;
							if (nx >= 0 && nx < room.width && ny >= 0 && ny < room.height && room.tiles[ny][nx] === "floor") {
								const nIdx = ny * room.width + nx;
								if (!floorDecorFinal[nIdx] && tileHash(nx * 3, ny * 3) > .45) floorVariantFinal[nIdx] = 1;
							}
						}
					}
				}
				for (let y = 0; y < room.height; y += 1) for (let x = 0; x < room.width; x += 1) {
					const posX = x * TILE_SIZE;
					const posY = y * TILE_SIZE;
					if (room.tiles[y][x] === "floor") {
						const cellIdx = y * room.width + x;
						const h = tileHash(x, y);
						let textureKey;
						if (floorDecorFinal[cellIdx] && floorDecorTiles.length > 0) {
							const dIdx = Math.floor(h * floorDecorTiles.length) % floorDecorTiles.length;
							textureKey = `theme_${theme.id}_floor_decor_${dIdx}`;
						} else if (floorVariantFinal[cellIdx] && floorVariants.length > 0) {
							const vIdx = Math.floor(h * floorVariants.length) % floorVariants.length;
							textureKey = `theme_${theme.id}_floor_var_${vIdx}`;
						} else {
							const nCount = theme.tiles.floorNormal.length || 1;
							const nIdx = Math.floor(tileHash(x + 1e3, y + 2e3) * nCount) % nCount;
							textureKey = `theme_${theme.id}_floor_${nIdx}`;
						}
						if (!this.textures.exists(textureKey)) textureKey = this.textures.exists(`theme_${theme.id}_floor_0`) ? `theme_${theme.id}_floor_0` : "tile_stone";
						const tile = this.add.image(posX + TILE_SIZE / 2, posY + TILE_SIZE / 2, textureKey);
						tile.setDisplaySize(TILE_SIZE, TILE_SIZE);
						tile.setDepth(RENDER_DEPTH.FLOOR);
						if (theme.floorTint) tile.setTint(theme.floorTint);
						this.roomTileObjects.push(tile);
					} else {
						const isFloorOrWalkable = (r, c) => r >= 0 && r < room.height && c >= 0 && c < room.width && room.tiles[r][c] === "floor";
						const hasFloorBelow = isFloorOrWalkable(y + 1, x);
						const hasFloorAbove = isFloorOrWalkable(y - 1, x);
						const hasFloorRight = isFloorOrWalkable(y, x + 1);
						const hasFloorLeft = isFloorOrWalkable(y, x - 1);
						const isOuterBorder = x === 0 || x === room.width - 1 || y === 0 || y === room.height - 1;
						let wallKey;
						const hasAnyAdjacentFloor = hasFloorBelow || hasFloorAbove || hasFloorLeft || hasFloorRight;
						const hasHorizontalFloor = hasFloorBelow || hasFloorAbove;
						const hasVerticalFloor = hasFloorLeft || hasFloorRight;
						if (!hasAnyAdjacentFloor) wallKey = theme.tiles.walls.vertical.length > 0 ? `theme_${theme.id}_wall_v_0` : `theme_${theme.id}_wall_h_0`;
						else if (hasFloorBelow && !hasVerticalFloor) wallKey = theme.tiles.walls.top.length > 0 ? `theme_${theme.id}_wall_top_0` : `theme_${theme.id}_wall_h_0`;
						else if (hasFloorAbove && !hasVerticalFloor) wallKey = theme.tiles.walls.bottom.length > 0 ? `theme_${theme.id}_wall_bottom_0` : `theme_${theme.id}_wall_h_0`;
						else if (hasFloorRight && !hasHorizontalFloor) wallKey = theme.tiles.walls.left.length > 0 ? `theme_${theme.id}_wall_left_0` : `theme_${theme.id}_wall_v_0`;
						else if (hasFloorLeft && !hasHorizontalFloor) wallKey = theme.tiles.walls.right.length > 0 ? `theme_${theme.id}_wall_right_0` : `theme_${theme.id}_wall_v_0`;
						else if (hasHorizontalFloor) wallKey = `theme_${theme.id}_wall_h_0`;
						else wallKey = `theme_${theme.id}_wall_v_0`;
						if (!this.textures.exists(wallKey)) wallKey = "tile_dark_stone";
						const wall = this.add.image(posX + TILE_SIZE / 2, posY + TILE_SIZE / 2, wallKey);
						wall.setDisplaySize(TILE_SIZE, TILE_SIZE);
						wall.setTint(isOuterBorder ? 526864 : wallTint);
						wall.setDepth(RENDER_DEPTH.WALL_BASE);
						this.roomTileObjects.push(wall);
						if (hasFloorBelow) {
							const rim = this.add.graphics();
							rim.fillStyle(theme.wallRimColor || 61695, .85);
							rim.fillRect(posX + 1, posY + TILE_SIZE - 6, 46, 6);
							rim.setDepth(RENDER_DEPTH.WALL_FOREGROUND);
							this.roomTileObjects.push(rim);
						}
					}
				}
				const validSpawn = findValidSpawnTile(room);
				this.player.x = validSpawn.x * TILE_SIZE + TILE_SIZE / 2;
				this.player.y = validSpawn.y * TILE_SIZE + TILE_SIZE / 2;
				this.player.setDepth(RENDER_DEPTH.ENTITIES);
				this.player.setVisible(true);
				this.player.setActive(true);
				const spawnRing = this.add.graphics();
				spawnRing.lineStyle(2, 65416, .8);
				spawnRing.strokeCircle(this.player.x, this.player.y, 22);
				spawnRing.setDepth(RENDER_DEPTH.SPAWN_RING);
				this.roomTileObjects.push(spawnRing);
				const exitX = room.exit.x * TILE_SIZE + TILE_SIZE / 2;
				const exitY = room.exit.y * TILE_SIZE + TILE_SIZE / 2;
				const hasEnemies = room.enemies.length > 0;
				this.isDoorUnlocked = !hasEnemies;
				const doorClosedKey = this.textures.exists(`theme_${theme.id}_door_closed`) ? `theme_${theme.id}_door_closed` : "door_closed";
				const doorOpenKey = this.textures.exists(`theme_${theme.id}_door_open`) ? `theme_${theme.id}_door_open` : "door_open";
				this.exitDoorSprite = this.add.sprite(exitX, exitY, this.isDoorUnlocked ? doorOpenKey : doorClosedKey);
				this.exitDoorSprite.setDisplaySize(TILE_SIZE, TILE_SIZE * 1.2);
				this.exitDoorSprite.setDepth(RENDER_DEPTH.ENTITIES);
				this.doorLabel = this.add.text(exitX, exitY - 32, this.isDoorUnlocked ? "SAIDA (ABERTA)" : "PORTAO TRANCADO", {
					fontSize: "11px",
					color: this.isDoorUnlocked ? "#00ffaa" : "#ff4444",
					fontStyle: "bold",
					stroke: "#000000",
					strokeThickness: 3
				}).setOrigin(.5);
				this.doorLabel.setDepth(RENDER_DEPTH.ENTITIES_OVERLAY);
				this.roomTileObjects.push(this.doorLabel);
				this.isChestOpened = false;
				this.isInteractivePropUsed = false;
				const centerX = Math.floor(room.width / 2) * TILE_SIZE + TILE_SIZE / 2;
				const centerY = Math.floor(room.height / 2) * TILE_SIZE + TILE_SIZE / 2;
				if (room.kind === "treasure") {
					const chestClosedKey = this.textures.exists(`theme_${theme.id}_chest_closed_0`) ? `theme_${theme.id}_chest_closed_0` : "chest_closed";
					this.chestSprite = this.add.sprite(centerX, centerY, chestClosedKey);
					this.chestSprite.setDisplaySize(TILE_SIZE, TILE_SIZE);
					this.chestSprite.setDepth(RENDER_DEPTH.ENTITIES);
					this.chestPrompt = this.add.text(centerX, centerY - 26, "[E] ABRIR BAÚ", {
						fontSize: "10px",
						color: "#ffdd44",
						fontStyle: "bold",
						stroke: "#000000",
						strokeThickness: 3
					}).setOrigin(.5);
					this.chestPrompt.setDepth(RENDER_DEPTH.ENTITIES_OVERLAY);
					this.roomTileObjects.push(this.chestPrompt);
				} else if (room.kind === "event") {
					this.interactivePropSprite = this.add.sprite(centerX, centerY, "tile_circuit");
					this.interactivePropSprite.setDisplaySize(TILE_SIZE * 1.2, TILE_SIZE * 1.2);
					this.interactivePropSprite.setDepth(RENDER_DEPTH.ENTITIES);
					this.interactivePropSprite.setTint(61695);
					this.interactivePropPrompt = this.add.text(centerX, centerY - 28, "[E] TERMINAL DE DADOS", {
						fontSize: "10px",
						color: "#00f0ff",
						fontStyle: "bold",
						stroke: "#000000",
						strokeThickness: 3
					}).setOrigin(.5);
					this.interactivePropPrompt.setDepth(RENDER_DEPTH.ENTITIES_OVERLAY);
					this.roomTileObjects.push(this.interactivePropPrompt);
				} else if (room.kind === "rest") {
					this.interactivePropSprite = this.add.sprite(centerX, centerY, "tile_charged");
					this.interactivePropSprite.setDisplaySize(TILE_SIZE * 1.2, TILE_SIZE * 1.2);
					this.interactivePropSprite.setDepth(RENDER_DEPTH.ENTITIES);
					this.interactivePropSprite.setTint(65416);
					this.interactivePropPrompt = this.add.text(centerX, centerY - 28, "[E] NÓ DE REGENERAÇÃO", {
						fontSize: "10px",
						color: "#00ff88",
						fontStyle: "bold",
						stroke: "#000000",
						strokeThickness: 3
					}).setOrigin(.5);
					this.interactivePropPrompt.setDepth(RENDER_DEPTH.ENTITIES_OVERLAY);
					this.roomTileObjects.push(this.interactivePropPrompt);
				} else if (room.kind === "shop") {
					this.interactivePropSprite = this.add.sprite(centerX, centerY, "tile_circuit");
					this.interactivePropSprite.setDisplaySize(TILE_SIZE * 1.2, TILE_SIZE * 1.2);
					this.interactivePropSprite.setDepth(RENDER_DEPTH.ENTITIES);
					this.interactivePropSprite.setTint(16766720);
					this.interactivePropPrompt = this.add.text(centerX, centerY - 28, "[E] MERCADOR DIGITAL", {
						fontSize: "10px",
						color: "#ffd700",
						fontStyle: "bold",
						stroke: "#000000",
						strokeThickness: 3
					}).setOrigin(.5);
					this.interactivePropPrompt.setDepth(RENDER_DEPTH.ENTITIES_OVERLAY);
					this.roomTileObjects.push(this.interactivePropPrompt);
				}
				if (room.biome === "fire" && (room.kind === "combat" || room.kind === "boss")) {
					const lava = createLavaHazard(`lava_${this.currentRoomNumber}`, centerX - 40, centerY + 30, 36);
					this.hazards.push(lava);
					const hGfx = this.add.graphics();
					hGfx.fillStyle(16729088, .35);
					hGfx.fillCircle(lava.x, lava.y, lava.radius);
					hGfx.lineStyle(2, 16746496, .7);
					hGfx.strokeCircle(lava.x, lava.y, lava.radius);
					hGfx.setDepth(RENDER_DEPTH.FLOOR_HAZARD);
					this.hazardGraphics.push(hGfx);
					this.roomTileObjects.push(hGfx);
				} else if (room.biome === "storm" && (room.kind === "combat" || room.kind === "boss")) {
					const lightning = createLightningHazard(`storm_${this.currentRoomNumber}`, centerX + 40, centerY - 30, 38);
					this.hazards.push(lightning);
					const hGfx = this.add.graphics();
					hGfx.fillStyle(52479, .25);
					hGfx.fillCircle(lightning.x, lightning.y, lightning.radius);
					hGfx.lineStyle(2, 65535, .6);
					hGfx.strokeCircle(lightning.x, lightning.y, lightning.radius);
					hGfx.setDepth(RENDER_DEPTH.FLOOR_HAZARD);
					this.hazardGraphics.push(hGfx);
					this.roomTileObjects.push(hGfx);
				}
				for (const enemyDef of room.enemies) {
					const ex = enemyDef.tileX * TILE_SIZE + TILE_SIZE / 2;
					const ey = enemyDef.tileY * TILE_SIZE + TILE_SIZE / 2;
					const species = normalizeDigimonName(enemyDef.digimon || enemyDef.name);
					let animKey = getEnemyAnimationKey(species, "idle");
					let scale = .65;
					let bossDef;
					let enemyName = enemyDef.name;
					let enemyHp = enemyDef.hp;
					let enemyMaxHp = enemyDef.maxHp;
					let enemyAttack = enemyDef.attack;
					let enemyDefense = enemyDef.defense;
					let enemySpeed = enemyDef.speed;
					let enemyXp = enemyDef.xpReward;
					let enemyCoins = enemyDef.coinReward;
					if (enemyDef.kind === "boss") {
						bossDef = getBossForFloor(this.currentRoomNumber, room.biome);
						enemyName = bossDef.name;
						enemyHp = enemyDef.hp || bossDef.baseHp;
						enemyMaxHp = enemyDef.maxHp || bossDef.baseHp;
						enemyAttack = enemyDef.attack || bossDef.attackDamage;
						enemyDefense = enemyDef.defense || bossDef.defense;
						enemySpeed = enemyDef.speed || bossDef.speed;
						enemyXp = enemyDef.xpReward || bossDef.xpReward;
						enemyCoins = enemyDef.coinReward || bossDef.coinReward;
						animKey = getEnemyAnimationKey("etemon", "idle");
						if (bossDef.id === "meramon") scale = 1.05;
						else if (bossDef.id === "seadramon") scale = 1.1;
						else if (bossDef.id === "metaletemon") scale = 1.15;
						else if (bossDef.id === "wargeymon") scale = 1.25;
						else scale = .95;
					} else if (enemyDef.kind === "elite") scale = .8;
					const sprite = this.add.sprite(ex, ey, animKey);
					sprite.setScale(scale);
					sprite.setOrigin(.5, .85);
					sprite.setDepth(RENDER_DEPTH.ENTITIES);
					try {
						if (sprite.preFX) sprite.preFX.addColorMatrix().grayscale(1);
						else sprite.setTint(11184810);
					} catch {
						sprite.setTint(11184810);
					}
					if (this.anims.exists(animKey)) sprite.play(animKey);
					const hpBar = this.add.graphics();
					hpBar.setDepth(RENDER_DEPTH.ENTITIES_OVERLAY);
					this.enemies.push({
						id: enemyDef.id,
						name: enemyName,
						kind: enemyDef.kind,
						species,
						currentAnimAction: "idle",
						sprite,
						hpBar,
						currentHp: enemyHp,
						maxHp: enemyMaxHp,
						attack: enemyAttack,
						defense: enemyDefense,
						speed: enemySpeed,
						xpReward: enemyXp,
						coinReward: enemyCoins,
						isAttacking: false,
						attackCooldown: 0,
						state: "idle",
						statusEffects: [],
						bossDefinition: bossDef
					});
				}
				options.onRoomChange?.(this.currentRoomNumber, 50, room.title, room.biome, this.currentRoomNumber, room.kind === "boss");
				options.onPlayerStatsChange?.({
					currentHp: this.playerHp,
					maxHp: this.playerMaxHp,
					xp: this.playerXp,
					coins: this.playerCoins
				});
				const bannerText = room.kind === "boss" ? `SALA ${this.currentRoomNumber}/50 • ⚠️ ÁREA DE CHEFE\n${room.title.toUpperCase()}` : `SALA ${this.currentRoomNumber}/50: ${room.title.toUpperCase()}\nInimigos Lv. ~${this.currentRoomNumber}`;
				const banner = this.add.text(this.cameras.main.midPoint.x, this.cameras.main.midPoint.y - 120, bannerText, {
					fontSize: "14px",
					color: room.kind === "boss" ? "#ff4444" : "#00f0ff",
					fontStyle: "bold",
					align: "center",
					stroke: "#000000",
					strokeThickness: 4
				}).setOrigin(.5).setDepth(RENDER_DEPTH.HUD);
				this.tweens.add({
					targets: banner,
					y: banner.y - 20,
					alpha: 0,
					duration: 1800,
					onComplete: () => banner.destroy()
				});
				if (this.debugOverlayVisible) this.renderDebugOverlay();
			}
			toggleDebugOverlay() {
				this.debugOverlayVisible = !this.debugOverlayVisible;
				this.renderDebugOverlay();
			}
			renderDebugOverlay() {
				if (this.debugOverlayContainer) {
					this.debugOverlayContainer.destroy();
					this.debugOverlayContainer = null;
				}
				if (!this.debugOverlayVisible || !this.activeRoom) return;
				this.debugOverlayContainer = this.add.container(0, 0);
				this.debugOverlayContainer.setDepth(9999);
				const room = this.activeRoom;
				for (let y = 0; y < room.height; y++) for (let x = 0; x < room.width; x++) {
					const posX = x * TILE_SIZE;
					const posY = y * TILE_SIZE;
					const tileType = room.tiles[y][x];
					const isExit = x === room.exit?.x && y === room.exit?.y;
					const hasProp = room.props?.some((p) => p.tileX === x && p.tileY === y);
					let label = "F";
					let strokeColor = 65416;
					if (tileType === "wall") {
						label = "W";
						strokeColor = 16724787;
					} else if (isExit) {
						label = "D";
						strokeColor = 16776960;
					} else if (hasProp) {
						label = "O";
						strokeColor = 16746496;
					}
					const rect = this.add.graphics();
					rect.lineStyle(1, strokeColor, .45);
					rect.strokeRect(posX, posY, TILE_SIZE, TILE_SIZE);
					this.debugOverlayContainer.add(rect);
					const txt = this.add.text(posX + 2, posY + 2, `${label}\n${x},${y}`, {
						fontFamily: "monospace",
						fontSize: "8px",
						color: strokeColor === 65416 ? "#aaffcc" : strokeColor === 16724787 ? "#ffaabb" : "#ffffaa",
						backgroundColor: "rgba(0,0,0,0.65)",
						padding: {
							x: 1,
							y: 1
						}
					});
					this.debugOverlayContainer.add(txt);
				}
			}
			update(time, delta) {
				if (this.isFinished || this.isTransitioning || this.isPaused || this.isHitstopped) return;
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
				this.updateHazards(delta);
			}
			triggerHitstop(durationMs = 45) {
				this.isHitstopped = true;
				this.time.delayedCall(durationMs, () => {
					this.isHitstopped = false;
				});
			}
			updateHazards(delta) {
				for (const hazard of this.hazards) {
					const distToPlayer = Phaser.Math.Distance.Between(this.player.x, this.player.y, hazard.x, hazard.y);
					if (hazard.type === "lava") {
						if (distToPlayer <= hazard.radius) {
							hazard.timerMs -= delta;
							if (hazard.timerMs <= 0) {
								hazard.timerMs = hazard.cooldownMs;
								this.damagePlayer(hazard.damage);
								this.showFloatingText(this.player.x, this.player.y - 30, `-${hazard.damage} LAVA`, "#ff4400");
							}
						} else hazard.timerMs = Math.max(0, hazard.timerMs - delta);
					} else if (hazard.type === "lightning") {
						hazard.timerMs -= delta;
						if (hazard.timerMs <= 0) {
							hazard.timerMs = hazard.cooldownMs;
							const flash = this.add.graphics();
							flash.fillStyle(65535, .6);
							flash.fillCircle(hazard.x, hazard.y, hazard.radius + 6);
							flash.setDepth(15);
							this.tweens.add({
								targets: flash,
								alpha: 0,
								duration: 150,
								onComplete: () => flash.destroy()
							});
							if (distToPlayer <= hazard.radius) {
								this.damagePlayer(hazard.damage);
								this.showFloatingText(this.player.x, this.player.y - 30, `-${hazard.damage} CHOQUE!`, "#00ffff");
							}
						}
					}
				}
			}
			togglePause() {
				this.isPaused = !this.isPaused;
				options.onPauseToggle?.(this.isPaused);
			}
			healPlayer(amount) {
				this.playerHp = Math.min(this.playerMaxHp, this.playerHp + amount);
				this.showFloatingText(this.player.x, this.player.y - 35, `+${amount} HP!`, "#00ff88");
				this.spawnHealEffect(this.player.x, this.player.y - 20);
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
				if (this.isPlayerAttacking) {
					if (this.keys?.J?.isDown || this.keys?.Space?.isDown) this.inputBuffer = {
						slot: "basic_1",
						timestamp: time
					};
					else if (this.keys?.K?.isDown) this.inputBuffer = {
						slot: "basic_2",
						timestamp: time
					};
					else if (this.keys?.L?.isDown) this.inputBuffer = {
						slot: "special",
						timestamp: time
					};
					return;
				}
				if (this.inputBuffer && time - this.inputBuffer.timestamp <= 120) {
					const slot = this.inputBuffer.slot;
					this.inputBuffer = null;
					if (slot === "basic_1" && time >= this.basic1CooldownUntil) {
						this.performBasicAttack1(time);
						return;
					} else if (slot === "basic_2" && time >= this.basic2CooldownUntil) {
						this.performBasicAttack2(time);
						return;
					} else if (slot === "special" && time >= this.specialCooldownUntil) {
						this.performSpecialAttack(time);
						return;
					}
				} else this.inputBuffer = null;
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
			applyStatusToEnemy(enemy, type) {
				let eff;
				if (type === "burn") eff = createBurnEffect();
				else if (type === "slow") eff = createSlowEffect();
				else eff = createShockEffect();
				enemy.statusEffects = mergeStatusEffect(enemy.statusEffects || [], eff);
			}
			performBasicAttack1(time) {
				const attackConfig = this.partnerProfile.basic1;
				this.isPlayerAttacking = true;
				this.basic1CooldownUntil = time + attackConfig.cooldownMs;
				options.onCooldownChange?.("basic_1", attackConfig.cooldownMs, attackConfig.cooldownMs);
				if (this.facingDirection === "left") this.player.setFlipX(true);
				else if (this.facingDirection === "right") this.player.setFlipX(false);
				const animKey = this.anims.exists(attackConfig.animation) ? attackConfig.animation : "player-attack-basic-1";
				if (this.anims.exists(animKey)) this.player.play(animKey);
				const origin = this.getPlayerCenter();
				const hitboxPos = getDirectionalHitboxPosition(origin, this.facingDirection, 36);
				const attackRange = attackConfig.range || 52;
				const rotation = getProjectileRotation(this.facingDirection);
				this.recordAttackEvent("basic_1", this.facingDirection, hitboxPos.x, hitboxPos.y, void 0, void 0, rotation);
				const b1Vfx = this.vfxProfile.basic1;
				if (b1Vfx.hasVisualEffect && b1Vfx.effectTextureKey && this.textures.exists(b1Vfx.effectTextureKey)) {
					const vfxPos = getDirectionalVfxPosition(origin, this.facingDirection, b1Vfx.offsetForward || 36);
					const slashSprite = this.add.sprite(vfxPos.x, vfxPos.y, b1Vfx.effectTextureKey);
					const transform = getVfxTransform(this.facingDirection);
					slashSprite.setRotation(transform.rotation);
					if (transform.flipY) slashSprite.setFlipY(true);
					slashSprite.setScale(b1Vfx.scale || 1);
					slashSprite.setDepth(15);
					if (b1Vfx.effectAnimKey && this.anims.exists(b1Vfx.effectAnimKey)) slashSprite.play(b1Vfx.effectAnimKey);
					this.transientVfx.push(slashSprite);
					this.tweens.add({
						targets: slashSprite,
						alpha: 0,
						duration: b1Vfx.durationMs || 180,
						onComplete: () => {
							slashSprite.destroy();
							this.transientVfx = this.transientVfx.filter((v) => v !== slashSprite);
						}
					});
				}
				for (const enemy of this.enemies) {
					if (enemy.state === "dead") continue;
					if (Phaser.Math.Distance.Between(hitboxPos.x, hitboxPos.y, enemy.sprite.x, enemy.sprite.y - 20) <= attackRange) {
						this.damageEnemy(enemy, attackConfig.damage);
						if (attackConfig.statusEffect) this.applyStatusToEnemy(enemy, attackConfig.statusEffect);
					}
				}
				this.player.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
					this.isPlayerAttacking = false;
					if (this.anims.exists("player-idle")) {
						this.player.play("player-idle");
						if (this.facingDirection === "left") this.player.setFlipX(true);
						else if (this.facingDirection === "right") this.player.setFlipX(false);
					}
					if (this.inputBuffer && this.time.now - this.inputBuffer.timestamp <= 120) this.handlePlayerAttacks(this.time.now);
				});
			}
			performBasicAttack2(time) {
				const attackConfig = this.partnerProfile.basic2;
				this.isPlayerAttacking = true;
				this.basic2CooldownUntil = time + attackConfig.cooldownMs;
				options.onCooldownChange?.("basic_2", attackConfig.cooldownMs, attackConfig.cooldownMs);
				if (this.facingDirection === "left") this.player.setFlipX(true);
				else if (this.facingDirection === "right") this.player.setFlipX(false);
				const animKey = this.anims.exists(attackConfig.animation) ? attackConfig.animation : "player-attack-basic-2";
				if (this.anims.exists(animKey)) this.player.play(animKey);
				const spawnPos = getAttackSpawnPosition(this.getPlayerCenter(), this.facingDirection, 32);
				const speed = this.partnerProfile.speciesId === "veemon" ? 360 : 280;
				const { vx, vy } = applyDirectionalVelocity(this.facingDirection, speed);
				const rotation = getProjectileRotation(this.facingDirection);
				this.recordAttackEvent("basic_2", this.facingDirection, spawnPos.x, spawnPos.y, vx, vy, rotation);
				const b2Vfx = this.vfxProfile.basic2;
				let projTexture = b2Vfx.projectileTextureKey;
				if (!projTexture || !this.textures.exists(projTexture)) projTexture = `${manifest.id}_projectile_dragon_0`;
				if (!this.textures.exists(projTexture)) projTexture = `${manifest.id}_projectile_laser_0`;
				if (!this.textures.exists(projTexture)) projTexture = `${manifest.id}_attack_basic_2_0`;
				const projSprite = this.add.sprite(spawnPos.x, spawnPos.y, projTexture);
				projSprite.setScale(b2Vfx.scale || .85);
				projSprite.setRotation(rotation);
				projSprite.setDepth(12);
				if (b2Vfx.projectileAnimKey && this.anims.exists(b2Vfx.projectileAnimKey)) projSprite.play(b2Vfx.projectileAnimKey);
				this.projectiles.push({
					sprite: projSprite,
					vx,
					vy,
					damage: attackConfig.damage,
					distanceTraveled: 0,
					maxDistance: attackConfig.range || 380,
					statusEffect: attackConfig.statusEffect
				});
				this.player.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
					this.isPlayerAttacking = false;
					if (this.anims.exists("player-idle")) {
						this.player.play("player-idle");
						if (this.facingDirection === "left") this.player.setFlipX(true);
						else if (this.facingDirection === "right") this.player.setFlipX(false);
					}
					if (this.inputBuffer && this.time.now - this.inputBuffer.timestamp <= 120) this.handlePlayerAttacks(this.time.now);
				});
			}
			performSpecialAttack(time) {
				const attackConfig = this.partnerProfile.special;
				this.isPlayerAttacking = true;
				this.specialCooldownUntil = time + attackConfig.cooldownMs;
				options.onCooldownChange?.("special", attackConfig.cooldownMs, attackConfig.cooldownMs);
				if (this.facingDirection === "left") this.player.setFlipX(true);
				else if (this.facingDirection === "right") this.player.setFlipX(false);
				const animKey = this.anims.exists(attackConfig.animation) ? attackConfig.animation : "player-attack-special";
				if (this.anims.exists(animKey)) this.player.play(animKey);
				if (attackConfig.invulnerableFramesMs) this.invulnerableUntil = Math.max(this.invulnerableUntil, time + attackConfig.invulnerableFramesMs);
				if (this.screenShakeEnabled) this.cameras.main.shake(250, attackConfig.shakeIntensity || .008);
				this.triggerHitstop(45);
				const origin = this.getPlayerCenter();
				const dirVec = getFacingVector(this.facingDirection);
				const blastPos = getAttackSpawnPosition(origin, this.facingDirection, 42);
				const rotation = getProjectileRotation(this.facingDirection);
				const { vx, vy } = applyDirectionalVelocity(this.facingDirection, 420);
				const blastRadius = attackConfig.area || 85;
				this.recordAttackEvent("special", this.facingDirection, blastPos.x, blastPos.y, vx, vy, rotation);
				const dashDistance = 44;
				const destX = this.player.x + dirVec.x * dashDistance;
				const destY = this.player.y + dirVec.y * dashDistance;
				const tileX = Math.floor(destX / TILE_SIZE);
				const tileY = Math.floor(destY / TILE_SIZE);
				if (isWalkable({ tiles: this.activeRoom.tiles }, tileX, tileY)) this.tweens.add({
					targets: this.player,
					x: destX,
					y: destY,
					duration: 150,
					ease: "Quad.easeOut"
				});
				const spVfx = this.vfxProfile.special;
				if (spVfx.hasVisualEffect && spVfx.effectTextureKey && this.textures.exists(spVfx.effectTextureKey)) {
					const vfxPos = getDirectionalVfxPosition(origin, this.facingDirection, spVfx.offsetForward || 44);
					const specialVfxSprite = this.add.sprite(vfxPos.x, vfxPos.y, spVfx.effectTextureKey);
					const transform = getVfxTransform(this.facingDirection);
					specialVfxSprite.setRotation(transform.rotation);
					if (transform.flipY) specialVfxSprite.setFlipY(true);
					specialVfxSprite.setScale(spVfx.scale || 1.25);
					specialVfxSprite.setDepth(15);
					if (spVfx.effectAnimKey && this.anims.exists(spVfx.effectAnimKey)) specialVfxSprite.play(spVfx.effectAnimKey);
					this.transientVfx.push(specialVfxSprite);
					this.tweens.add({
						targets: specialVfxSprite,
						x: vfxPos.x + dirVec.x * 40,
						y: vfxPos.y + dirVec.y * 40,
						alpha: 0,
						duration: spVfx.durationMs || 350,
						ease: "Cubic.easeOut",
						onComplete: () => {
							specialVfxSprite.destroy();
							this.transientVfx = this.transientVfx.filter((v) => v !== specialVfxSprite);
						}
					});
					if (spVfx.secondaryTextureKey && this.textures.exists(spVfx.secondaryTextureKey)) {
						const secSprite = this.add.sprite(vfxPos.x, vfxPos.y + 8, spVfx.secondaryTextureKey);
						secSprite.setScale(spVfx.secondaryScale || 1.05);
						secSprite.setDepth(14);
						if (spVfx.secondaryAnimKey && this.anims.exists(spVfx.secondaryAnimKey)) secSprite.play(spVfx.secondaryAnimKey);
						this.transientVfx.push(secSprite);
						this.tweens.add({
							targets: secSprite,
							alpha: 0,
							duration: (spVfx.durationMs || 350) + 60,
							onComplete: () => {
								secSprite.destroy();
								this.transientVfx = this.transientVfx.filter((v) => v !== secSprite);
							}
						});
					}
				}
				let specialProjTexture = `${manifest.id}_projectile_laser_0`;
				if (!this.textures.exists(specialProjTexture)) specialProjTexture = `${manifest.id}_projectile_dragon_0`;
				if (!this.textures.exists(specialProjTexture)) specialProjTexture = `${manifest.id}_attack_special_0`;
				if (this.textures.exists(specialProjTexture)) {
					const specialSprite = this.add.sprite(blastPos.x, blastPos.y, specialProjTexture);
					specialSprite.setScale(1.1);
					specialSprite.setRotation(rotation);
					specialSprite.setDepth(13);
					this.projectiles.push({
						sprite: specialSprite,
						vx,
						vy,
						damage: attackConfig.damage,
						distanceTraveled: 0,
						maxDistance: 320,
						statusEffect: attackConfig.statusEffect
					});
				}
				if (attackConfig.reflectProjectiles) for (let i = this.enemyProjectiles.length - 1; i >= 0; i--) {
					const ep = this.enemyProjectiles[i];
					if (Phaser.Math.Distance.Between(blastPos.x, blastPos.y, ep.sprite.x, ep.sprite.y) <= blastRadius + 20) {
						ep.sprite.destroy();
						this.enemyProjectiles.splice(i, 1);
					}
				}
				for (const enemy of this.enemies) {
					if (enemy.state === "dead") continue;
					if (Phaser.Math.Distance.Between(blastPos.x, blastPos.y, enemy.sprite.x, enemy.sprite.y - 20) <= blastRadius + 15) {
						this.damageEnemy(enemy, attackConfig.damage);
						if (attackConfig.statusEffect) this.applyStatusToEnemy(enemy, attackConfig.statusEffect);
					}
				}
				this.player.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
					this.isPlayerAttacking = false;
					if (this.anims.exists("player-idle")) {
						this.player.play("player-idle");
						if (this.facingDirection === "left") this.player.setFlipX(true);
						else if (this.facingDirection === "right") this.player.setFlipX(false);
					}
					if (this.inputBuffer && this.time.now - this.inputBuffer.timestamp <= 120) this.handlePlayerAttacks(this.time.now);
				});
			}
			updateProjectiles(delta) {
				const dt = delta / 1e3;
				for (let i = this.projectiles.length - 1; i >= 0; i--) {
					const proj = this.projectiles[i];
					const stepX = proj.vx * dt;
					const stepY = proj.vy * dt;
					proj.sprite.x += stepX;
					proj.sprite.y += stepY;
					proj.distanceTraveled += Math.hypot(stepX, stepY);
					const tileX = Math.floor(proj.sprite.x / TILE_SIZE);
					const tileY = Math.floor(proj.sprite.y / TILE_SIZE);
					const hitWall = !isWalkable({ tiles: this.activeRoom.tiles }, tileX, tileY);
					let hitEnemy = false;
					for (const enemy of this.enemies) {
						if (enemy.state === "dead") continue;
						if (Phaser.Math.Distance.Between(proj.sprite.x, proj.sprite.y, enemy.sprite.x, enemy.sprite.y - 20) < 32) {
							this.damageEnemy(enemy, proj.damage);
							if (proj.statusEffect) this.applyStatusToEnemy(enemy, proj.statusEffect);
							hitEnemy = true;
							break;
						}
					}
					if (hitWall || hitEnemy || proj.distanceTraveled >= proj.maxDistance) {
						this.spawnProjectileImpact(proj.sprite.x, proj.sprite.y);
						proj.sprite.destroy();
						this.projectiles.splice(i, 1);
					}
				}
			}
			damageEnemy(enemy, baseDamage, canCrit = true) {
				const isCrit = canCrit && Math.random() < this.modifiers.critChance;
				const rawDamage = Math.round(baseDamage * this.modifiers.attackMultiplier * (isCrit ? 2 : 1));
				const finalDamage = Math.max(1, rawDamage - enemy.defense);
				enemy.currentHp -= finalDamage;
				if (isCrit) this.triggerHitstop(40);
				this.spawnHitImpact(enemy.sprite.x, enemy.sprite.y - 20);
				enemy.sprite.setTintFill(16777215);
				this.time.delayedCall(90, () => {
					if (enemy.sprite.active) {
						enemy.sprite.clearTint();
						if (enemy.isEnraged) enemy.sprite.setTint(16720418);
						else if (enemy.name.includes("Etemon") || enemy.name.includes("Kuwagamon") || enemy.name.includes("Meramon") || enemy.name.includes("Seadramon")) enemy.sprite.setTint(16737894);
					}
				});
				const hitKey = getEnemyAnimationKey(enemy.species, "hit");
				if (this.anims.exists(hitKey) && !enemy.isAttacking) {
					enemy.sprite.play(hitKey);
					enemy.sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
						const idleKey = getEnemyAnimationKey(enemy.species, "idle");
						if (enemy.sprite.active && this.anims.exists(idleKey) && !enemy.isAttacking && enemy.state !== "dead") {
							enemy.sprite.play(idleKey);
							enemy.currentAnimAction = "idle";
						}
					});
				}
				this.showFloatingText(enemy.sprite.x, enemy.sprite.y - 45, isCrit ? `CRÍTICO! -${finalDamage}` : `-${finalDamage}`, isCrit ? "#ffd700" : "#ffffff", isCrit);
				if (enemy.currentHp <= 0) this.killEnemy(enemy);
			}
			killEnemy(enemy) {
				enemy.state = "dead";
				enemy.hpBar.clear();
				const xpEarned = enemy.xpReward;
				const coinsEarned = Math.round(enemy.coinReward * this.modifiers.coinMultiplier);
				this.playerXp += xpEarned;
				this.playerCoins += coinsEarned;
				const targetSpecies = options.originalSpeciesId || options.input.speciesId;
				options.onAwardXp?.(targetSpecies, xpEarned);
				if (enemy.kind === "boss") {
					if (!this.bossDefeated) {
						this.bossDefeated = true;
						if (enemy.bossDefinition?.guaranteedItemDrop) {
							const dropKey = enemy.bossDefinition.guaranteedItemDrop;
							this.itemsWon[dropKey] = (this.itemsWon[dropKey] || 0) + 1;
						}
						if (this.currentRoomNumber >= 50) options.onSaveCheckpoint?.(50, 50);
						else options.onSaveCheckpoint?.(this.currentRoomNumber + 1, this.currentRoomNumber);
					}
				}
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
				const deathKey = getEnemyAnimationKey(enemy.species, "death");
				if (this.anims.exists(deathKey)) {
					enemy.sprite.play(deathKey);
					enemy.sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
						this.tweens.add({
							targets: enemy.sprite,
							alpha: 0,
							duration: 200,
							onComplete: () => {
								enemy.sprite.destroy();
								enemy.hpBar.destroy();
								this.checkRoomCompletion();
							}
						});
					});
				} else this.tweens.add({
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
				const aliveEnemies = this.enemies.filter((e) => e.state !== "dead");
				const bossAlive = this.enemies.some((e) => e.kind === "boss" && e.state !== "dead");
				if ((this.activeRoom?.kind === "boss" ? !bossAlive : aliveEnemies.length === 0) && !this.isDoorUnlocked) {
					this.isDoorUnlocked = true;
					if (this.exitDoorSprite) {
						const theme = self.runTheme || MAP_THEMES.lighting;
						const doorOpenKey = this.textures.exists(`theme_${theme.id}_door_open`) ? `theme_${theme.id}_door_open` : "door_open";
						this.exitDoorSprite.setTexture(doorOpenKey);
					}
					if (this.doorLabel) {
						this.doorLabel.setText("SAIDA (ABERTA)");
						this.doorLabel.setColor("#00ffaa");
					}
					if (this.currentRoomNumber >= 50 && this.bossDefeated) {
						const finalVictoryBanner = this.add.text(this.cameras.main.midPoint.x, this.cameras.main.midPoint.y - 50, "CHEFE FINAL DERROTADO!\nCAMINHO DIGITAL CONQUISTADO!", {
							fontSize: "20px",
							color: "#ffcc00",
							fontStyle: "bold",
							align: "center",
							stroke: "#000000",
							strokeThickness: 5
						}).setOrigin(.5).setDepth(RENDER_DEPTH.HUD);
						this.tweens.add({
							targets: finalVictoryBanner,
							scale: {
								from: .7,
								to: 1.15
							},
							duration: 500,
							yoyo: true,
							repeat: 1,
							onComplete: () => {
								finalVictoryBanner.destroy();
								this.triggerGrandVictory();
							}
						});
						return;
					}
					const clearBanner = this.add.text(this.cameras.main.midPoint.x, this.cameras.main.midPoint.y - 50, "SALA LIMPA! PORTÃO DESBLOQUEADO", {
						fontSize: "18px",
						color: "#00ff88",
						fontStyle: "bold",
						stroke: "#000000",
						strokeThickness: 4
					}).setOrigin(.5).setDepth(RENDER_DEPTH.HUD);
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
				if (this.chestSprite) {
					const theme = self.runTheme || MAP_THEMES.lighting;
					const chestOpenKey = this.textures.exists(`theme_${theme.id}_chest_open_0`) ? `theme_${theme.id}_chest_open_0` : "chest_open";
					this.chestSprite.setTexture(chestOpenKey);
				}
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
			showFloatingText(x, y, text, color = "#ffffff", isCrit = false) {
				if (!this.damageNumbersEnabled && color === "#ffffff") return;
				const spreadX = (Math.random() - .5) * 16;
				const label = this.add.text(x + spreadX, y, text, {
					fontSize: isCrit ? "14px" : "12px",
					color,
					fontStyle: "bold",
					stroke: "#000000",
					strokeThickness: isCrit ? 4 : 3
				}).setOrigin(.5).setDepth(25);
				if (isCrit) label.setScale(1.3);
				this.tweens.add({
					targets: label,
					y: y - 28,
					scale: isCrit ? 1 : .9,
					alpha: 0,
					duration: 950,
					onComplete: () => label.destroy()
				});
			}
			spawnProjectileImpact(x, y) {
				const b2 = this.vfxProfile.basic2;
				let textureKey = b2.impactTextureKey;
				if (!textureKey || !this.textures.exists(textureKey)) textureKey = this.textures.exists("veemon_effects_hit_0") ? "veemon_effects_hit_0" : this.textures.exists("agumon_effect_mega_blast_0") ? "agumon_effect_mega_blast_0" : "";
				if (!textureKey || !this.textures.exists(textureKey)) return;
				const impact = this.add.sprite(x, y, textureKey);
				impact.setScale(b2.impactScale || 1);
				impact.setDepth(15);
				if (b2.impactAnimKey && this.anims.exists(b2.impactAnimKey)) impact.play(b2.impactAnimKey);
				this.transientVfx.push(impact);
				this.tweens.add({
					targets: impact,
					alpha: 0,
					scale: (b2.impactScale || 1) * 1.25,
					duration: b2.impactDurationMs || 150,
					onComplete: () => {
						impact.destroy();
						this.transientVfx = this.transientVfx.filter((v) => v !== impact);
					}
				});
			}
			spawnHitImpact(x, y) {
				const hitVfx = this.vfxProfile.hitImpact;
				let textureKey = hitVfx?.textureKey;
				if (!textureKey || !this.textures.exists(textureKey)) textureKey = this.textures.exists("veemon_effects_hit_0") ? "veemon_effects_hit_0" : this.textures.exists("agumon_effect_mega_blast_0") ? "agumon_effect_mega_blast_0" : "";
				if (!textureKey || !this.textures.exists(textureKey)) return;
				const impact = this.add.sprite(x, y, textureKey);
				impact.setScale(hitVfx?.scale || .9);
				impact.setDepth(16);
				if (hitVfx?.animKey && this.anims.exists(hitVfx.animKey)) impact.play(hitVfx.animKey);
				this.transientVfx.push(impact);
				this.tweens.add({
					targets: impact,
					alpha: 0,
					scale: (hitVfx?.scale || .9) * 1.2,
					duration: hitVfx?.durationMs || 140,
					onComplete: () => {
						impact.destroy();
						this.transientVfx = this.transientVfx.filter((v) => v !== impact);
					}
				});
			}
			spawnHealEffect(x, y) {
				const healVfx = this.vfxProfile.heal;
				let textureKey = healVfx?.textureKey;
				if (!textureKey || !this.textures.exists(textureKey)) textureKey = this.textures.exists("agumon_heal_0") ? "agumon_heal_0" : this.textures.exists("veemon_heal_0") ? "veemon_heal_0" : "";
				if (!textureKey || !this.textures.exists(textureKey)) return;
				const healSprite = this.add.sprite(x, y, textureKey);
				healSprite.setScale(healVfx?.scale || .85);
				healSprite.setDepth(16);
				if (healVfx?.animKey && this.anims.exists(healVfx.animKey)) healSprite.play(healVfx.animKey);
				this.transientVfx.push(healSprite);
				this.tweens.add({
					targets: healSprite,
					y: y - 24,
					alpha: 0,
					duration: healVfx?.durationMs || 400,
					onComplete: () => {
						healSprite.destroy();
						this.transientVfx = this.transientVfx.filter((v) => v !== healSprite);
					}
				});
			}
			spawnEnemyProjectile(x, y, targetX, targetY, damage, species = "veemon") {
				const angle = Phaser.Math.Angle.Between(x, y, targetX, targetY);
				const speed = 190;
				const normalizedSpecies = normalizeDigimonName(species);
				let textureKey = "veemon_projectile_laser_0";
				let animKey = "veemon_projectile_laser";
				let scale = .8;
				if (normalizedSpecies === "agumon" || normalizedSpecies.includes("greymon")) {
					textureKey = "agumon_projectile_dragon_0";
					animKey = "agumon_projectile_dragon";
					scale = .75;
				} else if (normalizedSpecies === "veemon" || normalizedSpecies.includes("xvmon")) {
					textureKey = "veemon_projectile_laser_0";
					animKey = "veemon_projectile_laser";
					scale = .85;
				}
				if (!this.textures.exists(textureKey)) textureKey = this.textures.exists("veemon_projectile_laser_0") ? "veemon_projectile_laser_0" : this.textures.exists("agumon_projectile_dragon_0") ? "agumon_projectile_dragon_0" : "";
				if (textureKey && this.textures.exists(textureKey)) {
					const sprite = this.add.sprite(x, y, textureKey);
					sprite.setRotation(angle);
					sprite.setScale(scale);
					sprite.setDepth(12);
					if (animKey && this.anims.exists(animKey)) sprite.play(animKey);
					this.enemyProjectiles.push({
						sprite,
						vx: Math.cos(angle) * speed,
						vy: Math.sin(angle) * speed,
						damage,
						distanceTraveled: 0,
						maxDistance: 450
					});
				}
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
						this.spawnHitImpact(proj.sprite.x, proj.sprite.y);
					}
					if (hitWall || hitPlayer || proj.distanceTraveled >= proj.maxDistance) {
						if (!hitPlayer && (hitWall || proj.distanceTraveled >= proj.maxDistance)) this.spawnProjectileImpact(proj.sprite.x, proj.sprite.y);
						proj.sprite.destroy();
						this.enemyProjectiles.splice(i, 1);
					}
				}
			}
			updateEnemies(time, delta) {
				const dt = delta / 1e3;
				for (const enemy of this.enemies) {
					if (enemy.state === "dead" || !enemy.sprite.active) continue;
					if (enemy.statusEffects && enemy.statusEffects.length > 0) {
						const effectResult = updateEntityStatusEffects(enemy.statusEffects, delta);
						enemy.statusEffects = effectResult.activeEffects;
						if (effectResult.damageToDeal > 0) {
							this.damageEnemy(enemy, effectResult.damageToDeal, false);
							this.showFloatingText(enemy.sprite.x, enemy.sprite.y - 50, `-${effectResult.damageToDeal}`, "#ff6600");
						}
						if (effectResult.isStunned) {
							enemy.sprite.setTint(16776960);
							continue;
						}
					}
					const slowMult = enemy.statusEffects?.some((e) => e.type === "slow") ? .65 : 1;
					const currentSpeed = enemy.speed * slowMult;
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
							enemy.speed = Math.floor(enemy.speed * 1.35);
							enemy.sprite.setTint(16720418);
							this.triggerHitstop(60);
							if (this.screenShakeEnabled) this.cameras.main.shake(300, .012);
							const phaseName = enemy.bossDefinition ? enemy.bossDefinition.phases[1]?.name || "FÚRIA DIGITAL!" : "FÚRIA DIGITAL!";
							this.showFloatingText(enemy.sprite.x, enemy.sprite.y - 70, phaseName.toUpperCase(), "#ff2222", true);
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
								const nextX = enemy.sprite.x + Math.cos(angle) * currentSpeed * dt;
								const nextY = enemy.sprite.y + Math.sin(angle) * currentSpeed * dt;
								if (isWalkable({ tiles: this.activeRoom.tiles }, Math.floor(nextX / TILE_SIZE), Math.floor(nextY / TILE_SIZE))) {
									enemy.sprite.x = nextX;
									enemy.sprite.y = nextY;
								}
								if (enemy.currentAnimAction !== "walk" && !enemy.isAttacking) {
									const walkKey = getEnemyAnimationKey(enemy.species, "walk");
									if (this.anims.exists(walkKey) && enemy.sprite.anims.currentAnim?.key !== walkKey) {
										enemy.sprite.play(walkKey);
										enemy.currentAnimAction = "walk";
									}
								}
							} else if (distToPlayer < 90) {
								const angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, enemy.sprite.x, enemy.sprite.y);
								const nextX = enemy.sprite.x + Math.cos(angle) * currentSpeed * dt;
								const nextY = enemy.sprite.y + Math.sin(angle) * currentSpeed * dt;
								if (isWalkable({ tiles: this.activeRoom.tiles }, Math.floor(nextX / TILE_SIZE), Math.floor(nextY / TILE_SIZE))) {
									enemy.sprite.x = nextX;
									enemy.sprite.y = nextY;
								}
								if (enemy.currentAnimAction !== "walk" && !enemy.isAttacking) {
									const walkKey = getEnemyAnimationKey(enemy.species, "walk");
									if (this.anims.exists(walkKey) && enemy.sprite.anims.currentAnim?.key !== walkKey) {
										enemy.sprite.play(walkKey);
										enemy.currentAnimAction = "walk";
									}
								}
							}
							enemy.sprite.setFlipX(this.player.x < enemy.sprite.x);
							if (time >= enemy.attackCooldown && distToPlayer <= 300) {
								enemy.attackCooldown = time + 2e3;
								enemy.isAttacking = true;
								const atkKey = getEnemyAnimationKey(enemy.species, "attack_01");
								if (this.anims.exists(atkKey)) {
									enemy.sprite.play(atkKey);
									enemy.sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
										enemy.isAttacking = false;
										const idleKey = getEnemyAnimationKey(enemy.species, "idle");
										if (enemy.sprite.active && this.anims.exists(idleKey) && enemy.state !== "dead") {
											enemy.sprite.play(idleKey);
											enemy.currentAnimAction = "idle";
										}
									});
								} else enemy.isAttacking = false;
								const roomSnap = this.currentRoomNumber;
								this.time.delayedCall(160, () => {
									if (enemy.sprite.active && enemy.state !== "dead" && this.currentRoomNumber === roomSnap && !this.isTransitioning) this.spawnEnemyProjectile(enemy.sprite.x, enemy.sprite.y - 10, this.player.x, this.player.y - 15, enemy.attack, enemy.species);
								});
							}
						} else {
							enemy.state = "idle";
							if (enemy.currentAnimAction !== "idle" && !enemy.isAttacking) {
								const idleKey = getEnemyAnimationKey(enemy.species, "idle");
								if (this.anims.exists(idleKey) && enemy.sprite.anims.currentAnim?.key !== idleKey) {
									enemy.sprite.play(idleKey);
									enemy.currentAnimAction = "idle";
								}
							}
						}
					} else if (distToPlayer < 360) {
						enemy.state = "chase";
						if (enemy.currentAnimAction !== "walk" && !enemy.isAttacking) {
							const walkKey = getEnemyAnimationKey(enemy.species, "walk");
							if (this.anims.exists(walkKey) && enemy.sprite.anims.currentAnim?.key !== walkKey) {
								enemy.sprite.play(walkKey);
								enemy.currentAnimAction = "walk";
							}
						}
						const angle = Phaser.Math.Angle.Between(enemy.sprite.x, enemy.sprite.y, this.player.x, this.player.y);
						const moveDist = currentSpeed * dt;
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
							enemy.isAttacking = true;
							const atkKey = getEnemyAnimationKey(enemy.species, "attack_01");
							if (this.anims.exists(atkKey)) {
								enemy.sprite.play(atkKey);
								enemy.sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
									enemy.isAttacking = false;
									const idleKey = getEnemyAnimationKey(enemy.species, "idle");
									if (enemy.sprite.active && this.anims.exists(idleKey) && enemy.state !== "dead") {
										enemy.sprite.play(idleKey);
										enemy.currentAnimAction = "idle";
									}
								});
							} else enemy.isAttacking = false;
							const roomSnap = this.currentRoomNumber;
							this.time.delayedCall(120, () => {
								if (!enemy.sprite.active || enemy.state === "dead" || this.currentRoomNumber !== roomSnap || this.isTransitioning) return;
								if (Phaser.Math.Distance.Between(enemy.sprite.x, enemy.sprite.y, this.player.x, this.player.y) <= (enemy.kind === "boss" ? 64 : 48)) this.damagePlayer(enemy.attack);
							});
							if (enemy.kind === "boss" && enemy.isEnraged) for (const [ox, oy] of [
								[1, 0],
								[-1, 0],
								[0, 1],
								[0, -1]
							]) this.spawnEnemyProjectile(enemy.sprite.x, enemy.sprite.y, enemy.sprite.x + ox * 100, enemy.sprite.y + oy * 100, Math.round(enemy.attack * .8), enemy.species);
						}
					} else {
						enemy.state = "idle";
						if (enemy.currentAnimAction !== "idle" && !enemy.isAttacking) {
							const idleKey = getEnemyAnimationKey(enemy.species, "idle");
							if (this.anims.exists(idleKey) && enemy.sprite.anims.currentAnim?.key !== idleKey) {
								enemy.sprite.play(idleKey);
								enemy.currentAnimAction = "idle";
							}
						}
					}
				}
			}
			damagePlayer(damage) {
				if (this.time.now < this.invulnerableUntil || this.isFinished || this.isTransitioning) return;
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
				if (this.screenShakeEnabled) this.cameras.main.shake(120, .006);
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
				const moveDist = (this.partnerProfile?.baseSpeed || options.input.stats.speed || 100) * 2.2 * this.modifiers.speedMultiplier * delta / 1e3;
				if (dx !== 0 || dy !== 0) {
					const nextX = this.player.x + dx * moveDist;
					const nextY = this.player.y + dy * moveDist;
					const margin = 12;
					const canMoveX = isWalkable({ tiles: this.activeRoom.tiles }, Math.floor((nextX - margin) / TILE_SIZE), Math.floor((this.player.y - margin) / TILE_SIZE)) && isWalkable({ tiles: this.activeRoom.tiles }, Math.floor((nextX + margin) / TILE_SIZE), Math.floor((this.player.y - margin) / TILE_SIZE)) && isWalkable({ tiles: this.activeRoom.tiles }, Math.floor((nextX - margin) / TILE_SIZE), Math.floor((this.player.y + margin) / TILE_SIZE)) && isWalkable({ tiles: this.activeRoom.tiles }, Math.floor((nextX + margin) / TILE_SIZE), Math.floor((this.player.y + margin) / TILE_SIZE));
					const canMoveY = isWalkable({ tiles: this.activeRoom.tiles }, Math.floor((this.player.x - margin) / TILE_SIZE), Math.floor((nextY - margin) / TILE_SIZE)) && isWalkable({ tiles: this.activeRoom.tiles }, Math.floor((this.player.x + margin) / TILE_SIZE), Math.floor((nextY - margin) / TILE_SIZE)) && isWalkable({ tiles: this.activeRoom.tiles }, Math.floor((this.player.x - margin) / TILE_SIZE), Math.floor((nextY + margin) / TILE_SIZE)) && isWalkable({ tiles: this.activeRoom.tiles }, Math.floor((this.player.x + margin) / TILE_SIZE), Math.floor((nextY + margin) / TILE_SIZE));
					if (canMoveX) this.player.x = nextX;
					if (canMoveY) this.player.y = nextY;
					if (dx < 0) this.facingDirection = "left";
					else if (dx > 0) this.facingDirection = "right";
					else if (dy < 0) this.facingDirection = "up";
					else if (dy > 0) this.facingDirection = "down";
					if (this.facingDirection === "left" && this.anims.exists("player-walk-left")) {
						this.player.setFlipX(false);
						this.player.play("player-walk-left", true);
					} else if (this.facingDirection === "right" && this.anims.exists("player-walk-right")) {
						this.player.setFlipX(false);
						this.player.play("player-walk-right", true);
					} else if (this.facingDirection === "up" && this.anims.exists("player-walk-up")) {
						this.player.setFlipX(false);
						this.player.play("player-walk-up", true);
					} else if (this.facingDirection === "down" && this.anims.exists("player-walk-down")) {
						this.player.setFlipX(false);
						this.player.play("player-walk-down", true);
					} else {
						const walkKey = this.facingDirection === "left" || this.facingDirection === "up" ? "player-walk-left" : "player-walk-right";
						if (this.anims.exists(walkKey)) this.player.play(walkKey, true);
					}
				} else if (this.anims.exists("player-idle") && this.player.anims.currentAnim?.key !== "player-idle") {
					this.player.play("player-idle", true);
					if (this.facingDirection === "left") this.player.setFlipX(true);
					else if (this.facingDirection === "right") this.player.setFlipX(false);
				}
			}
			advanceToNextRoom() {
				if (this.isTransitioning || this.isFinished) return;
				this.isTransitioning = true;
				this.cameras.main.fadeOut(250);
				this.time.delayedCall(250, () => {
					if (this.currentRoomNumber >= 50) {
						this.cameras.main.fadeIn(200);
						this.isTransitioning = false;
						this.triggerGrandVictory();
						return;
					}
					this.currentRoomNumber += 1;
					self.currentRoomNumber = this.currentRoomNumber;
					self.currentRoomIndex = this.currentRoomNumber - 1;
					this.bossDefeated = false;
					this.loadRoom(this.currentRoomNumber);
					this.cameras.main.fadeIn(250);
					this.isTransitioning = false;
				});
			}
			triggerGrandVictory() {
				if (this.isFinished) return;
				this.isFinished = true;
				if (this.anims.exists("player-victory")) this.player.play("player-victory");
				const victoryText = this.add.text(this.cameras.main.midPoint.x, this.cameras.main.midPoint.y - 40, "CAMINHO DIGITAL CONCLUÍDO!\nVOCÊ VENCEU TODAS AS 50 SALAS!", {
					fontSize: "26px",
					color: "#ffcc00",
					fontStyle: "bold",
					align: "center",
					stroke: "#000000",
					strokeThickness: 6
				}).setOrigin(.5).setDepth(RENDER_DEPTH.HUD);
				this.tweens.add({
					targets: victoryText,
					scale: {
						from: .8,
						to: 1.2
					},
					duration: 500,
					yoyo: true,
					repeat: 2,
					onComplete: () => {
						options.onSaveCheckpoint?.(50, 50);
						options.onFinish({
							runId: options.input.runId,
							outcome: "victory",
							xp: this.playerXp + 500,
							coins: this.playerCoins + 250,
							itemsWon: {
								...this.itemsWon,
								carne_digital: (this.itemsWon.carne_digital || 0) + 5,
								fruta_digital: (this.itemsWon.fruta_digital || 0) + 3
							},
							alreadyAwardedXp: true
						});
					}
				});
			}
			triggerVictory() {
				this.triggerGrandVictory();
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
				}).setOrigin(.5).setDepth(RENDER_DEPTH.HUD);
				this.time.delayedCall(1600, () => {
					options.onFinish({
						runId: options.input.runId,
						outcome: "defeat",
						xp: this.playerXp,
						coins: Math.floor(this.playerCoins * .5),
						alreadyAwardedXp: true
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
		if (this.isStopped) return false;
		this.game = new Phaser.Game(config);
		return true;
	}
	stop() {
		console.log("[Phaser Runtime] DigitalPathGame.stop() called. Destroying game instance.");
		this.isStopped = true;
		if (typeof window !== "undefined") window.__digitalPathActiveScene = null;
		if (this.game) {
			try {
				const scenes = this.game.scene?.scenes;
				if (scenes) {
					for (const scene of scenes) if (scene?.input?.keyboard) {
						scene.input.keyboard.removeAllKeys(true);
						scene.input.keyboard.removeAllListeners();
					}
				}
			} catch (_) {}
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
	setSettings(settings) {
		if (this.activeScene) {
			if (typeof settings.screenShake === "boolean") this.activeScene.screenShakeEnabled = settings.screenShake;
			if (typeof settings.damageNumbers === "boolean") this.activeScene.damageNumbersEnabled = settings.damageNumbers;
		}
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
	const [screenShake, setScreenShake] = (0, import_react.useState)(true);
	const [damageNumbers, setDamageNumbers] = (0, import_react.useState)(true);
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
	const [unreadySpecies, setUnreadySpecies] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!pet || !containerRef.current) return;
		const manifest = getDigitalPathManifest(pet.speciesId);
		const effectiveRunInput = createRunInput(pet);
		if (!effectiveRunInput) {
			exitDigitalPath();
			return;
		}
		if (!manifest || !manifest.spriteReady) {
			setUnreadySpecies(pet.speciesId);
			return;
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
			originalSpeciesId: pet.speciesId,
			settings: {
				screenShake,
				damageNumbers
			},
			seed: (Date.now() ^ Math.floor(Math.random() * 1e5)) >>> 0,
			floorNumber: pet.digitalPath?.currentFloor || 1,
			onAwardXp: (speciesId, amount) => {
				useGame.getState().addDigimonXp(speciesId, amount);
			},
			onSaveCheckpoint: (nextFloor, bossDefeated) => {
				const currentDefeated = useGame.getState().pet?.digitalPath?.defeatedBosses ?? [];
				const newDefeated = bossDefeated ? Array.from(/* @__PURE__ */ new Set([...currentDefeated, bossDefeated])) : currentDefeated;
				useGame.getState().saveDigitalPathProgress({
					currentFloor: Math.min(50, nextFloor),
					highestFloor: Math.max(nextFloor, useGame.getState().pet?.digitalPath?.highestFloor ?? 1),
					defeatedBosses: newDefeated,
					completed: nextFloor >= 50 && Boolean(bossDefeated && bossDefeated >= 50)
				});
			},
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
		setIsPaused((prev) => {
			const next = !prev;
			if (gameRef.current?.activeScene) gameRef.current.activeScene.isPaused = next;
			return next;
		});
	};
	const handleResume = () => {
		setIsPaused(false);
		if (gameRef.current?.activeScene) gameRef.current.activeScene.isPaused = false;
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
	const combatProfile = getSpeciesCombatProfile(pet.speciesId);
	const speciesEmoji = pet.speciesId.includes("veemon") ? "⚡" : pet.speciesId.includes("gabumon") ? "🐺" : "🦖";
	if (unreadySpecies) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-slate-950 font-sans text-slate-100 select-none p-6 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-2xl border border-amber-500/40 bg-slate-900/95 p-6 shadow-2xl backdrop-blur-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-4xl mb-3",
					children: "📁"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-bold text-white mb-2",
					children: "Estrutura Pronta — Sprites Pendentes"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-neutral-300 mb-3",
					children: [
						"A estrutura de pastas para ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-amber-400 capitalize",
							children: unreadySpecies
						}),
						" já está padronizada em:"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-black/60 px-3 py-2 rounded text-xs font-mono text-amber-300 break-all mb-4",
					children: [
						"public/sprites/",
						unreadySpecies,
						"/"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-neutral-400 mb-6 leading-relaxed",
					children: "O Caminho Digital estará disponível para este personagem assim que as animações forem adicionadas às respectivas pastas."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: exitDigitalPath,
					className: "w-full py-2.5 px-4 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold rounded-lg transition cursor-pointer",
					children: "Voltar ao Hub"
				})
			]
		})
	});
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
										children: speciesEmoji
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold tracking-wide text-cyan-300 uppercase",
										children: pet.nickname
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "rounded bg-cyan-500/20 px-1.5 py-0.5 text-xs font-bold text-cyan-300",
										children: ["Lv. ", pet.level]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[11px] text-purple-300 font-medium",
									children: [
										"XP ",
										pet.experience,
										" / ",
										xpToNext(pet.level)
									]
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "w-36 sm:w-48",
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "hidden items-center gap-3 text-xs sm:flex",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded border border-amber-500/20 bg-amber-950/40 px-2 py-1 font-semibold text-amber-300",
									children: [
										"🪙 ",
										coins,
										" Bits"
									]
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden flex-col items-center md:flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-2",
							children: isBossRoom ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-full border border-red-500/60 bg-red-950/90 px-3 py-1 text-xs font-black tracking-wider text-red-300 animate-pulse flex items-center gap-1.5 shadow-lg shadow-red-900/40",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"⚠️ SALA ",
									roomIndex,
									" / 50"
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded bg-red-600/40 px-1.5 py-0.2 text-[10px] text-red-100 uppercase",
									children: "ÁREA DE CHEFE"
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `rounded-full border px-2.5 py-0.5 text-[11px] font-bold tracking-wider ${currentBiomeBadge.color} ${currentBiomeBadge.border}`,
										children: currentBiomeBadge.label
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-full border border-cyan-500/40 bg-cyan-950/70 px-3 py-0.5 text-xs font-bold tracking-wider text-cyan-300",
										children: [
											"CAMINHO DIGITAL • SALA ",
											roomIndex,
											" / 50"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "rounded bg-slate-800/80 px-2 py-0.5 text-[11px] text-slate-300 font-semibold",
										children: ["Inimigos Lv. ~", roomIndex]
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 flex items-center gap-3 text-[11px] text-slate-400",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: roomTitle }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "•" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-amber-400 font-medium",
									children: [
										"Bosses derrotados: ",
										pet.digitalPath?.defeatedBosses?.length ?? 0,
										" / 5"
									]
								})
							]
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
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: combatProfile.basic1.name })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `flex items-center gap-1 rounded border px-2 py-1 text-xs transition-colors ${cooldowns.basic_2 > 0 ? "border-slate-700 bg-slate-900 text-slate-500 opacity-60" : "border-amber-500/30 bg-amber-950/40 text-amber-300"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
											className: "rounded bg-black/40 px-1 text-[10px]",
											children: "K"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: combatProfile.basic2.name })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `flex items-center gap-1 rounded border px-2 py-1 text-xs transition-colors ${cooldowns.special > 0 ? "border-slate-700 bg-slate-900 text-slate-500 opacity-60" : "border-rose-500/30 bg-rose-950/40 text-rose-300"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
											className: "rounded bg-black/40 px-1 text-[10px]",
											children: "L"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: combatProfile.special.name })]
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
							className: "my-3 rounded-xl border border-slate-800 bg-slate-950/70 p-3 text-left text-xs text-slate-300 space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-cyan-400 block mb-1 uppercase tracking-wider text-[10px]",
									children: "Configurações da Run"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center justify-between cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Tremor de Tela (Shake)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: screenShake,
										onChange: (e) => {
											const val = e.target.checked;
											setScreenShake(val);
											gameRef.current?.setSettings({ screenShake: val });
										},
										className: "rounded border-slate-700 bg-slate-800 text-cyan-500"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center justify-between cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Números de Dano (Damage Numbers)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: damageNumbers,
										onChange: (e) => {
											const val = e.target.checked;
											setDamageNumbers(val);
											gameRef.current?.setSettings({ damageNumbers: val });
										},
										className: "rounded border-slate-700 bg-slate-800 text-cyan-500"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
										else document.exitFullscreen().catch(() => {});
									},
									className: "w-full mt-1 rounded-lg border border-slate-700 bg-slate-900 py-1.5 text-center text-[11px] font-semibold text-slate-300 hover:bg-slate-800 transition-colors",
									children: "⛶ Alternar Tela Cheia"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								id: "btn-resume-expedition",
								onClick: handleResume,
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
						runResult.outcome === "victory" ? roomIndex >= 50 || floorNumber >= 50 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-5xl animate-bounce",
								children: "👑"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 text-2xl font-black tracking-wide text-amber-300",
								children: "CAMINHO DIGITAL CONCLUÍDO!"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-slate-200 font-medium",
								children: "Você venceu todas as 50 salas da expedição e derrotou o Chefe Final!"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "my-3 rounded-lg bg-amber-500/20 border border-amber-500/40 p-2.5 text-xs text-amber-200",
								children: "✨ Parabéns! O Caminho Digital foi totalmente purificado."
							})
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-5xl",
								children: "🏆"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "mt-3 text-2xl font-black tracking-wide text-emerald-400",
								children: [
									"SALA ",
									roomIndex,
									" CONCLUÍDA!"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-slate-300",
								children: "O setor foi purificado com sucesso pelo seu Digimon!"
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
							className: "mt-3 grid grid-cols-5 gap-1.5 border-t border-[rgba(116,135,157,0.48)] px-1 pt-3",
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
									icon: Settings,
									label: "Ajustes",
									onClick: () => setPanel("settings")
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
									children: panel === "inventory" ? "Inventário" : panel === "shop" ? "Loja" : panel === "training" ? "Treino" : panel === "digital-path" ? "Caminho Digital" : panel === "settings" ? "Configurações" : "Árvore de Evolução"
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
							panel === "digital-path" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DigitalPathEntry, {}) : null,
							panel === "settings" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsPanel, {}) : null
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
	const [tab, setTab] = (0, import_react.useState)("all");
	if (!pet) return null;
	const entries = Object.entries(pet.inventory).filter(([, q]) => q > 0);
	const filtered = entries.filter(([id]) => {
		const item = ITEMS[id];
		if (!item) return false;
		if (tab === "food") return item.category === "food";
		if (tab === "care") return item.category === "health" || item.category === "hygiene" || item.category === "toy";
		return true;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-1.5 border-b border-[rgba(116,135,157,0.3)] pb-2 text-xs",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setTab("all"),
					className: cn("rounded-lg px-2.5 py-1 font-semibold transition-colors", tab === "all" ? "bg-accent text-white" : "text-muted hover:text-fg"),
					children: [
						"Todos (",
						entries.length,
						")"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setTab("food"),
					className: cn("rounded-lg px-2.5 py-1 font-semibold transition-colors", tab === "food" ? "bg-accent text-white" : "text-muted hover:text-fg"),
					children: "Alimentos"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setTab("care"),
					className: cn("rounded-lg px-2.5 py-1 font-semibold transition-colors", tab === "care" ? "bg-accent text-white" : "text-muted hover:text-fg"),
					children: "Cuidados"
				})
			]
		}), filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted py-4 text-center",
			children: "Nenhum item nesta categoria. Compre na loja ou conquiste no Caminho Digital."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 gap-2",
			children: filtered.map(([id, qty]) => {
				const item = ITEMS[id];
				if (!item) return null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					disabled: actionBusy,
					onClick: () => actions.use(id),
					className: "ds-card p-3 text-left disabled:cursor-not-allowed disabled:opacity-45 hover:border-accent transition-all flex flex-col justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold text-fg",
							children: item.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "rounded-full bg-accent/20 px-2 py-0.5 text-[11px] font-bold text-accent",
							children: ["x", qty]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: item.desc
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 text-[10px] text-muted flex gap-1.5 flex-wrap",
						children: Object.entries(item.effects).map(([stat, val]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "rounded bg-black/5 dark:bg-white/5 px-1 py-0.5 font-medium",
							children: [
								"+",
								val,
								" ",
								stat
							]
						}, stat))
					})]
				}, id);
			})
		})]
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
	const line = LINES[pet.lineId];
	const list = line?.evolutions ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "ds-card p-3 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: "Forma Atual:"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-base font-bold text-fg",
				children: currentName(pet)
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-right",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "rounded-full bg-accent/20 px-2.5 py-1 text-xs font-bold text-accent",
					children: ["Nível ", pet.level]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-[11px] text-muted",
					children: [
						"Felicidade: ",
						pet.happiness,
						"%"
					]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-2.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "text-xs font-bold uppercase tracking-wider text-muted",
					children: "Árvore Genealógica Digital"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ds-card p-3 border-emerald-500/50 bg-emerald-500/5 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xl",
							children: "🐣"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-bold text-sm text-fg",
							children: line?.name || "Novato"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-muted",
							children: "Estágio Inicial · Nv. 1"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" }), " Desbloqueado"]
					})]
				}),
				list.map((evo, idx) => {
					const unlocked = pet.evolutionStage >= idx;
					const nextNeeded = pet.evolutionStage + 1 === idx;
					const levelMet = pet.level >= evo.level;
					const bondMet = pet.happiness >= 40;
					const canEvolve = nextNeeded && levelMet && bondMet;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("ds-card p-3 transition-all", unlocked ? "border-emerald-500/50 bg-emerald-500/5" : canEvolve ? "border-accent bg-accent/10 shadow-md" : "border-border opacity-70"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xl",
									children: idx === 0 ? "⚔️" : "👑"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-bold text-sm text-fg",
									children: evo.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted",
									children: idx === 0 ? "Estágio Campeão" : "Estágio Extremo / Mega"
								})] })]
							}), unlocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" }), " Desbloqueado"]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs font-semibold text-muted",
								children: [
									"Requer Nv. ",
									evo.level,
									" e Afinidade 40%"
								]
							})]
						}), nextNeeded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 pt-2 border-t border-[rgba(116,135,157,0.2)]",
							children: canEvolve ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								disabled: actionBusy,
								onClick: () => actions.evolve(),
								className: "ds-button ds-button-accent w-full py-2 text-sm font-bold animate-pulse",
								children: [
									"✨ Evoluir para ",
									evo.name,
									"!"
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1 text-xs text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Progresso de Nível:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: levelMet ? "text-emerald-500 font-semibold" : "text-amber-500",
										children: [
											pet.level,
											"/",
											evo.level
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Afinidade (Felicidade):" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: bondMet ? "text-emerald-500 font-semibold" : "text-amber-500",
										children: [pet.happiness, "%/40%"]
									})]
								})]
							})
						})]
					}, evo.id);
				})
			]
		})]
	});
}
function SettingsPanel() {
	useGame((s) => s.pet);
	const reset = useGame((s) => s.reset);
	const setPanel = useGame((s) => s.setPanel);
	const [volume, setVolume] = (0, import_react.useState)(80);
	const [doubleConfirm, setDoubleConfirm] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 text-xs text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ds-card p-3 space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-semibold text-sm text-fg",
						children: "Áudio e Visual"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Volume dos Efeitos Sonoros" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [volume, "%"] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: "0",
							max: "100",
							value: volume,
							onChange: (e) => setVolume(Number(e.target.value)),
							className: "w-full cursor-pointer accent-accent"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
							else document.exitFullscreen().catch(() => {});
						},
						className: "ds-button w-full py-1.5 font-medium mt-2",
						children: "⛶ Alternar Tela Cheia"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ds-card p-3 space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-semibold text-sm text-fg",
						children: "Integridade do Save"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-emerald-600 dark:text-emerald-400",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Save V2 com Espelho de Backup Ativo" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted leading-tight",
						children: "Seus dados são salvos com redundância dupla local (digital_pet_save_v2 e backup). Em caso de corrupção, o sistema recupera o estado automaticamente."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ds-card p-3 space-y-2 border-red-500/40 bg-red-500/5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "font-semibold text-sm text-red-600 dark:text-red-400",
					children: "Zona de Perigo"
				}), !doubleConfirm ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setDoubleConfirm(true),
					className: "ds-button border-red-500/50 text-red-600 dark:text-red-400 w-full py-2 font-semibold",
					children: "Reiniciar Progresso e Save"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-red-600 dark:text-red-400 font-medium",
						children: "Tem certeza absoluta? Todo o progresso do seu Digimon será apagado permanentemente."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								reset();
								setPanel(null);
							},
							className: "ds-button ds-button-accent bg-red-600 hover:bg-red-700 text-white flex-1 py-1.5 font-bold",
							children: "Confirmar Reset"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setDoubleConfirm(false),
							className: "ds-button flex-1 py-1.5 font-medium",
							children: "Cancelar"
						})]
					})]
				})]
			})
		]
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
