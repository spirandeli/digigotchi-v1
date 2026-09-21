import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Sparkles, c as RotateCcw, d as Compass, f as Coins, h as Bath, i as Store, l as Package, m as Bed, n as Utensils, o as ShieldCheck, p as CircleCheck, s as Settings, t as Volleyball, u as HeartPulse } from "../_libs/lucide-react.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-kL5eqVAV.js
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
		movementStyle: "4-way",
		reason: "Estrutura validada com movimento 4-way completo (walk_down e walk_up gerados com baseline y=90 via digimon-4way-sprite-generator), golpes basic_1, basic_2, especial, hit, death e victory.",
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
			"walk_down": {
				"fps": 8,
				"loop": true,
				"frames": [
					"sprites/agumon/walk/down/walk_down_01.png",
					"sprites/agumon/walk/down/walk_down_02.png",
					"sprites/agumon/walk/down/walk_down_03.png"
				]
			},
			"walk_up": {
				"fps": 8,
				"loop": true,
				"frames": [
					"sprites/agumon/walk/up/walk_up_01.png",
					"sprites/agumon/walk/up/walk_up_02.png",
					"sprites/agumon/walk/up/walk_up_03.png"
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
			"walk_up": "validated",
			"walk_down": "validated",
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
	},
	gabumon: {
		id: "gabumon",
		name: "Gabumon",
		stage: "rookie",
		root: "sprites/gabumon",
		spriteReady: true,
		status: "READY",
		movementStyle: "4-way",
		reason: "Estrutura validada com movimento 4-way completo, golpes basic_1, basic_2, especial, hit, death e victory ancorados em canvas 96x96 baseline y=90.",
		frame: {
			"width": 96,
			"height": 96,
			"originX": .5,
			"originY": .94
		},
		scale: 1,
		hitbox: {
			"width": 42,
			"height": 60,
			"offsetX": 27,
			"offsetY": 30
		},
		animations: {
			"idle": {
				"fps": 7,
				"loop": true,
				"frames": [
					"sprites/gabumon/idle/idle_01.png",
					"sprites/gabumon/idle/idle_02.png",
					"sprites/gabumon/idle/idle_03.png",
					"sprites/gabumon/idle/idle_04.png",
					"sprites/gabumon/idle/idle_05.png",
					"sprites/gabumon/idle/idle_06.png",
					"sprites/gabumon/idle/idle_07.png",
					"sprites/gabumon/idle/idle_08.png",
					"sprites/gabumon/idle/idle_09.png",
					"sprites/gabumon/idle/idle_10.png"
				]
			},
			"walk_down": {
				"fps": 8,
				"loop": true,
				"frames": [
					"sprites/gabumon/walk/down/walk_down_01.png",
					"sprites/gabumon/walk/down/walk_down_02.png",
					"sprites/gabumon/walk/down/walk_down_03.png"
				]
			},
			"walk_up": {
				"fps": 8,
				"loop": true,
				"frames": [
					"sprites/gabumon/walk/up/walk_up_01.png",
					"sprites/gabumon/walk/up/walk_up_02.png",
					"sprites/gabumon/walk/up/walk_up_03.png"
				]
			},
			"walk_left": {
				"fps": 8,
				"loop": true,
				"frames": [
					"sprites/gabumon/walk/left/walk_left_01.png",
					"sprites/gabumon/walk/left/walk_left_02.png",
					"sprites/gabumon/walk/left/walk_left_03.png"
				]
			},
			"walk_right": {
				"fps": 8,
				"loop": true,
				"frames": [
					"sprites/gabumon/walk/right/walk_right_01.png",
					"sprites/gabumon/walk/right/walk_right_02.png",
					"sprites/gabumon/walk/right/walk_right_03.png"
				]
			},
			"attack_basic_1": {
				"fps": 10,
				"loop": false,
				"frames": [
					"sprites/gabumon/attacks/basic_1/attacks_basic_1_01.png",
					"sprites/gabumon/attacks/basic_1/attacks_basic_1_02.png",
					"sprites/gabumon/attacks/basic_1/attacks_basic_1_03.png"
				]
			},
			"attack_basic_2": {
				"fps": 8,
				"loop": false,
				"frames": [
					"sprites/gabumon/attacks/basic_2/attacks_basic_2_01.png",
					"sprites/gabumon/attacks/basic_2/attacks_basic_2_02.png",
					"sprites/gabumon/attacks/basic_2/attacks_basic_2_03.png"
				]
			},
			"attack_special": {
				"fps": 8,
				"loop": false,
				"frames": [
					"sprites/gabumon/attacks/special/attacks_special_01.png",
					"sprites/gabumon/attacks/special/attacks_special_02.png",
					"sprites/gabumon/attacks/special/attacks_special_03.png"
				]
			},
			"hit": {
				"fps": 8,
				"loop": false,
				"frames": ["sprites/gabumon/hit/hit_01.png"]
			},
			"death": {
				"fps": 5,
				"loop": false,
				"frames": ["sprites/gabumon/death/death_01.png"]
			},
			"victory": {
				"fps": 5,
				"loop": false,
				"frames": ["sprites/gabumon/victory/victory_01.png"]
			}
		},
		tamagotchiActions: {
			"idle": "validated",
			"eat": "validated",
			"sleep": "validated",
			"wake": "validated",
			"play": "validated",
			"clean": "validated",
			"heal": "validated",
			"evolution": "validated"
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
	},
	etemon: {
		id: "etemon",
		name: "Etemon",
		stage: "champion",
		root: "sprites/etemon",
		spriteReady: true,
		status: "READY",
		movementStyle: "4-way",
		reason: "Estrutura validada com movimento 4-way completo, golpes basic_1, basic_2, especial, hit, death e victory ancorados em canvas 96x96 baseline y=90.",
		frame: {
			"width": 96,
			"height": 96,
			"originX": .5,
			"originY": .94
		},
		scale: 1,
		hitbox: {
			"width": 42,
			"height": 60,
			"offsetX": 27,
			"offsetY": 30
		},
		animations: {
			"idle": {
				"fps": 7,
				"loop": true,
				"frames": [
					"sprites/etemon/idle/idle_01.png",
					"sprites/etemon/idle/idle_02.png",
					"sprites/etemon/idle/idle_03.png",
					"sprites/etemon/idle/idle_04.png",
					"sprites/etemon/idle/idle_05.png",
					"sprites/etemon/idle/idle_06.png",
					"sprites/etemon/idle/idle_07.png",
					"sprites/etemon/idle/idle_08.png",
					"sprites/etemon/idle/idle_09.png",
					"sprites/etemon/idle/idle_10.png"
				]
			},
			"walk_down": {
				"fps": 8,
				"loop": true,
				"frames": [
					"sprites/etemon/walk/down/walk_down_01.png",
					"sprites/etemon/walk/down/walk_down_02.png",
					"sprites/etemon/walk/down/walk_down_03.png"
				]
			},
			"walk_up": {
				"fps": 8,
				"loop": true,
				"frames": [
					"sprites/etemon/walk/up/walk_up_01.png",
					"sprites/etemon/walk/up/walk_up_02.png",
					"sprites/etemon/walk/up/walk_up_03.png"
				]
			},
			"walk_left": {
				"fps": 8,
				"loop": true,
				"frames": [
					"sprites/etemon/walk/left/walk_left_01.png",
					"sprites/etemon/walk/left/walk_left_02.png",
					"sprites/etemon/walk/left/walk_left_03.png"
				]
			},
			"walk_right": {
				"fps": 8,
				"loop": true,
				"frames": [
					"sprites/etemon/walk/right/walk_right_01.png",
					"sprites/etemon/walk/right/walk_right_02.png",
					"sprites/etemon/walk/right/walk_right_03.png"
				]
			},
			"attack_basic_1": {
				"fps": 10,
				"loop": false,
				"frames": [
					"sprites/etemon/attacks/basic_1/attacks_basic_1_01.png",
					"sprites/etemon/attacks/basic_1/attacks_basic_1_02.png",
					"sprites/etemon/attacks/basic_1/attacks_basic_1_03.png"
				]
			},
			"attack_basic_2": {
				"fps": 8,
				"loop": false,
				"frames": [
					"sprites/etemon/attacks/basic_2/attacks_basic_2_01.png",
					"sprites/etemon/attacks/basic_2/attacks_basic_2_02.png",
					"sprites/etemon/attacks/basic_2/attacks_basic_2_03.png"
				]
			},
			"attack_special": {
				"fps": 8,
				"loop": false,
				"frames": [
					"sprites/etemon/attacks/special/attacks_special_01.png",
					"sprites/etemon/attacks/special/attacks_special_02.png",
					"sprites/etemon/attacks/special/attacks_special_03.png"
				]
			},
			"hit": {
				"fps": 8,
				"loop": false,
				"frames": ["sprites/etemon/hit/hit_01.png"]
			},
			"death": {
				"fps": 5,
				"loop": false,
				"frames": ["sprites/etemon/death/death_01.png"]
			},
			"victory": {
				"fps": 5,
				"loop": false,
				"frames": ["sprites/etemon/victory/victory_01.png"]
			}
		},
		tamagotchiActions: {
			"idle": "validated",
			"eat": "validated",
			"sleep": "validated",
			"wake": "validated",
			"play": "validated",
			"clean": "validated",
			"heal": "validated",
			"evolution": "validated"
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
	},
	flamedramon: {
		id: "flamedramon",
		name: "Flamedramon",
		stage: "ultimate",
		root: "sprites/flamedramon",
		spriteReady: true,
		status: "READY",
		movementStyle: "4-way",
		reason: "Estrutura validada com movimento 4-way completo, golpes basic_1, basic_2, especial, hit, death e victory ancorados em canvas 96x96 baseline y=90.",
		frame: {
			"width": 96,
			"height": 96,
			"originX": .5,
			"originY": .94
		},
		scale: 1,
		hitbox: {
			"width": 42,
			"height": 60,
			"offsetX": 27,
			"offsetY": 30
		},
		animations: {
			"idle": {
				"fps": 7,
				"loop": true,
				"frames": ["sprites/flamedramon/idle/idle_01.png", "sprites/flamedramon/idle/idle_02.png"]
			},
			"walk_down": {
				"fps": 8,
				"loop": true,
				"frames": [
					"sprites/flamedramon/walk/down/walk_down_01.png",
					"sprites/flamedramon/walk/down/walk_down_02.png",
					"sprites/flamedramon/walk/down/walk_down_03.png"
				]
			},
			"walk_up": {
				"fps": 8,
				"loop": true,
				"frames": [
					"sprites/flamedramon/walk/up/walk_up_01.png",
					"sprites/flamedramon/walk/up/walk_up_02.png",
					"sprites/flamedramon/walk/up/walk_up_03.png"
				]
			},
			"walk_left": {
				"fps": 8,
				"loop": true,
				"frames": [
					"sprites/flamedramon/walk/left/walk_left_01.png",
					"sprites/flamedramon/walk/left/walk_left_02.png",
					"sprites/flamedramon/walk/left/walk_left_03.png"
				]
			},
			"walk_right": {
				"fps": 8,
				"loop": true,
				"frames": [
					"sprites/flamedramon/walk/right/walk_right_01.png",
					"sprites/flamedramon/walk/right/walk_right_02.png",
					"sprites/flamedramon/walk/right/walk_right_03.png"
				]
			},
			"attack_basic_1": {
				"fps": 10,
				"loop": false,
				"frames": [
					"sprites/flamedramon/attacks/basic_1/attacks_basic_1_01.png",
					"sprites/flamedramon/attacks/basic_1/attacks_basic_1_02.png",
					"sprites/flamedramon/attacks/basic_1/attacks_basic_1_03.png"
				]
			},
			"attack_basic_2": {
				"fps": 8,
				"loop": false,
				"frames": [
					"sprites/flamedramon/attacks/basic_2/attacks_basic_2_01.png",
					"sprites/flamedramon/attacks/basic_2/attacks_basic_2_02.png",
					"sprites/flamedramon/attacks/basic_2/attacks_basic_2_03.png"
				]
			},
			"attack_special": {
				"fps": 8,
				"loop": false,
				"frames": [
					"sprites/flamedramon/attacks/special/attacks_special_01.png",
					"sprites/flamedramon/attacks/special/attacks_special_02.png",
					"sprites/flamedramon/attacks/special/attacks_special_03.png"
				]
			},
			"hit": {
				"fps": 8,
				"loop": false,
				"frames": ["sprites/flamedramon/hit/hit_01.png"]
			},
			"death": {
				"fps": 5,
				"loop": false,
				"frames": ["sprites/flamedramon/death/death_01.png"]
			},
			"victory": {
				"fps": 5,
				"loop": false,
				"frames": ["sprites/flamedramon/victory/victory_01.png"]
			}
		},
		tamagotchiActions: {
			"idle": "validated",
			"eat": "validated",
			"sleep": "validated",
			"wake": "validated",
			"play": "validated",
			"clean": "validated",
			"heal": "validated",
			"evolution": "validated"
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
	},
	garurumon: {
		id: "garurumon",
		name: "Garurumon",
		stage: "champion",
		root: "sprites/garurumon",
		spriteReady: true,
		status: "READY",
		movementStyle: "4-way",
		reason: "Estrutura validada com movimento 4-way completo, golpes basic_1, basic_2, especial, hit, death e victory ancorados em canvas 96x96 baseline y=90.",
		frame: {
			"width": 96,
			"height": 96,
			"originX": .5,
			"originY": .94
		},
		scale: 1,
		hitbox: {
			"width": 42,
			"height": 60,
			"offsetX": 27,
			"offsetY": 30
		},
		animations: {
			"idle": {
				"fps": 7,
				"loop": true,
				"frames": [
					"sprites/garurumon/idle/idle_01.png",
					"sprites/garurumon/idle/idle_02.png",
					"sprites/garurumon/idle/idle_03.png",
					"sprites/garurumon/idle/idle_04.png",
					"sprites/garurumon/idle/idle_05.png",
					"sprites/garurumon/idle/idle_06.png",
					"sprites/garurumon/idle/idle_07.png",
					"sprites/garurumon/idle/idle_08.png",
					"sprites/garurumon/idle/idle_09.png",
					"sprites/garurumon/idle/idle_10.png"
				]
			},
			"walk_down": {
				"fps": 8,
				"loop": true,
				"frames": [
					"sprites/garurumon/walk/down/walk_down_01.png",
					"sprites/garurumon/walk/down/walk_down_02.png",
					"sprites/garurumon/walk/down/walk_down_03.png"
				]
			},
			"walk_up": {
				"fps": 8,
				"loop": true,
				"frames": [
					"sprites/garurumon/walk/up/walk_up_01.png",
					"sprites/garurumon/walk/up/walk_up_02.png",
					"sprites/garurumon/walk/up/walk_up_03.png"
				]
			},
			"walk_left": {
				"fps": 8,
				"loop": true,
				"frames": [
					"sprites/garurumon/walk/left/walk_left_01.png",
					"sprites/garurumon/walk/left/walk_left_02.png",
					"sprites/garurumon/walk/left/walk_left_03.png"
				]
			},
			"walk_right": {
				"fps": 8,
				"loop": true,
				"frames": [
					"sprites/garurumon/walk/right/walk_right_01.png",
					"sprites/garurumon/walk/right/walk_right_02.png",
					"sprites/garurumon/walk/right/walk_right_03.png"
				]
			},
			"attack_basic_1": {
				"fps": 10,
				"loop": false,
				"frames": [
					"sprites/garurumon/attacks/basic_1/attacks_basic_1_01.png",
					"sprites/garurumon/attacks/basic_1/attacks_basic_1_02.png",
					"sprites/garurumon/attacks/basic_1/attacks_basic_1_03.png"
				]
			},
			"attack_basic_2": {
				"fps": 8,
				"loop": false,
				"frames": [
					"sprites/garurumon/attacks/basic_2/attacks_basic_2_01.png",
					"sprites/garurumon/attacks/basic_2/attacks_basic_2_02.png",
					"sprites/garurumon/attacks/basic_2/attacks_basic_2_03.png"
				]
			},
			"attack_special": {
				"fps": 8,
				"loop": false,
				"frames": [
					"sprites/garurumon/attacks/special/attacks_special_01.png",
					"sprites/garurumon/attacks/special/attacks_special_02.png",
					"sprites/garurumon/attacks/special/attacks_special_03.png"
				]
			},
			"hit": {
				"fps": 8,
				"loop": false,
				"frames": ["sprites/garurumon/hit/hit_01.png"]
			},
			"death": {
				"fps": 5,
				"loop": false,
				"frames": ["sprites/garurumon/death/death_01.png"]
			},
			"victory": {
				"fps": 5,
				"loop": false,
				"frames": ["sprites/garurumon/victory/victory_01.png"]
			}
		},
		tamagotchiActions: {
			"idle": "validated",
			"eat": "validated",
			"sleep": "validated",
			"wake": "validated",
			"play": "validated",
			"clean": "validated",
			"heal": "validated",
			"evolution": "validated"
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
	},
	geogreymon: {
		id: "geogreymon",
		name: "Geogreymon",
		stage: "champion",
		root: "sprites/geogreymon",
		spriteReady: true,
		status: "READY",
		movementStyle: "4-way",
		reason: "Estrutura validada com movimento 4-way completo, golpes basic_1, basic_2, especial, hit, death e victory ancorados em canvas 96x96 baseline y=90.",
		frame: {
			"width": 96,
			"height": 96,
			"originX": .5,
			"originY": .94
		},
		scale: 1,
		hitbox: {
			"width": 42,
			"height": 60,
			"offsetX": 27,
			"offsetY": 30
		},
		animations: {
			"idle": {
				"fps": 7,
				"loop": true,
				"frames": [
					"sprites/geogreymon/idle/idle_01.png",
					"sprites/geogreymon/idle/idle_02.png",
					"sprites/geogreymon/idle/idle_03.png",
					"sprites/geogreymon/idle/idle_04.png",
					"sprites/geogreymon/idle/idle_05.png",
					"sprites/geogreymon/idle/idle_06.png",
					"sprites/geogreymon/idle/idle_07.png",
					"sprites/geogreymon/idle/idle_08.png",
					"sprites/geogreymon/idle/idle_09.png",
					"sprites/geogreymon/idle/idle_10.png"
				]
			},
			"walk_down": {
				"fps": 8,
				"loop": true,
				"frames": [
					"sprites/geogreymon/walk/down/walk_down_01.png",
					"sprites/geogreymon/walk/down/walk_down_02.png",
					"sprites/geogreymon/walk/down/walk_down_03.png"
				]
			},
			"walk_up": {
				"fps": 8,
				"loop": true,
				"frames": [
					"sprites/geogreymon/walk/up/walk_up_01.png",
					"sprites/geogreymon/walk/up/walk_up_02.png",
					"sprites/geogreymon/walk/up/walk_up_03.png"
				]
			},
			"walk_left": {
				"fps": 8,
				"loop": true,
				"frames": [
					"sprites/geogreymon/walk/left/walk_left_01.png",
					"sprites/geogreymon/walk/left/walk_left_02.png",
					"sprites/geogreymon/walk/left/walk_left_03.png"
				]
			},
			"walk_right": {
				"fps": 8,
				"loop": true,
				"frames": [
					"sprites/geogreymon/walk/right/walk_right_01.png",
					"sprites/geogreymon/walk/right/walk_right_02.png",
					"sprites/geogreymon/walk/right/walk_right_03.png"
				]
			},
			"attack_basic_1": {
				"fps": 10,
				"loop": false,
				"frames": [
					"sprites/geogreymon/attacks/basic_1/attacks_basic_1_01.png",
					"sprites/geogreymon/attacks/basic_1/attacks_basic_1_02.png",
					"sprites/geogreymon/attacks/basic_1/attacks_basic_1_03.png"
				]
			},
			"attack_basic_2": {
				"fps": 8,
				"loop": false,
				"frames": [
					"sprites/geogreymon/attacks/basic_2/attacks_basic_2_01.png",
					"sprites/geogreymon/attacks/basic_2/attacks_basic_2_02.png",
					"sprites/geogreymon/attacks/basic_2/attacks_basic_2_03.png"
				]
			},
			"attack_special": {
				"fps": 8,
				"loop": false,
				"frames": [
					"sprites/geogreymon/attacks/special/attacks_special_01.png",
					"sprites/geogreymon/attacks/special/attacks_special_02.png",
					"sprites/geogreymon/attacks/special/attacks_special_03.png"
				]
			},
			"hit": {
				"fps": 8,
				"loop": false,
				"frames": ["sprites/geogreymon/hit/hit_01.png"]
			},
			"death": {
				"fps": 5,
				"loop": false,
				"frames": ["sprites/geogreymon/death/death_01.png"]
			},
			"victory": {
				"fps": 5,
				"loop": false,
				"frames": ["sprites/geogreymon/victory/victory_01.png"]
			}
		},
		tamagotchiActions: {
			"idle": "validated",
			"eat": "validated",
			"sleep": "validated",
			"wake": "validated",
			"play": "validated",
			"clean": "validated",
			"heal": "validated",
			"evolution": "validated"
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
	},
	kingetemon: {
		id: "kingetemon",
		name: "Kingetemon",
		stage: "mega",
		root: "sprites/kingetemon",
		spriteReady: true,
		status: "READY",
		movementStyle: "4-way",
		reason: "Estrutura validada com movimento 4-way completo, golpes basic_1, basic_2, especial, hit, death e victory ancorados em canvas 96x96 baseline y=90.",
		frame: {
			"width": 96,
			"height": 96,
			"originX": .5,
			"originY": .94
		},
		scale: 1,
		hitbox: {
			"width": 42,
			"height": 60,
			"offsetX": 27,
			"offsetY": 30
		},
		animations: {
			"idle": {
				"fps": 7,
				"loop": true,
				"frames": [
					"sprites/kingetemon/idle/idle_01.png",
					"sprites/kingetemon/idle/idle_02.png",
					"sprites/kingetemon/idle/idle_03.png",
					"sprites/kingetemon/idle/idle_04.png",
					"sprites/kingetemon/idle/idle_05.png",
					"sprites/kingetemon/idle/idle_06.png",
					"sprites/kingetemon/idle/idle_07.png",
					"sprites/kingetemon/idle/idle_08.png",
					"sprites/kingetemon/idle/idle_09.png",
					"sprites/kingetemon/idle/idle_10.png"
				]
			},
			"walk_down": {
				"fps": 8,
				"loop": true,
				"frames": [
					"sprites/kingetemon/walk/down/walk_down_01.png",
					"sprites/kingetemon/walk/down/walk_down_02.png",
					"sprites/kingetemon/walk/down/walk_down_03.png"
				]
			},
			"walk_up": {
				"fps": 8,
				"loop": true,
				"frames": [
					"sprites/kingetemon/walk/up/walk_up_01.png",
					"sprites/kingetemon/walk/up/walk_up_02.png",
					"sprites/kingetemon/walk/up/walk_up_03.png"
				]
			},
			"walk_left": {
				"fps": 8,
				"loop": true,
				"frames": [
					"sprites/kingetemon/walk/left/walk_left_01.png",
					"sprites/kingetemon/walk/left/walk_left_02.png",
					"sprites/kingetemon/walk/left/walk_left_03.png"
				]
			},
			"walk_right": {
				"fps": 8,
				"loop": true,
				"frames": [
					"sprites/kingetemon/walk/right/walk_right_01.png",
					"sprites/kingetemon/walk/right/walk_right_02.png",
					"sprites/kingetemon/walk/right/walk_right_03.png"
				]
			},
			"attack_basic_1": {
				"fps": 10,
				"loop": false,
				"frames": [
					"sprites/kingetemon/attacks/basic_1/attacks_basic_1_01.png",
					"sprites/kingetemon/attacks/basic_1/attacks_basic_1_02.png",
					"sprites/kingetemon/attacks/basic_1/attacks_basic_1_03.png"
				]
			},
			"attack_basic_2": {
				"fps": 8,
				"loop": false,
				"frames": [
					"sprites/kingetemon/attacks/basic_2/attacks_basic_2_01.png",
					"sprites/kingetemon/attacks/basic_2/attacks_basic_2_02.png",
					"sprites/kingetemon/attacks/basic_2/attacks_basic_2_03.png"
				]
			},
			"attack_special": {
				"fps": 8,
				"loop": false,
				"frames": [
					"sprites/kingetemon/attacks/special/attacks_special_01.png",
					"sprites/kingetemon/attacks/special/attacks_special_02.png",
					"sprites/kingetemon/attacks/special/attacks_special_03.png"
				]
			},
			"hit": {
				"fps": 8,
				"loop": false,
				"frames": ["sprites/kingetemon/hit/hit_01.png"]
			},
			"death": {
				"fps": 5,
				"loop": false,
				"frames": ["sprites/kingetemon/death/death_01.png"]
			},
			"victory": {
				"fps": 5,
				"loop": false,
				"frames": ["sprites/kingetemon/victory/victory_01.png"]
			}
		},
		tamagotchiActions: {
			"idle": "validated",
			"eat": "validated",
			"sleep": "validated",
			"wake": "validated",
			"play": "validated",
			"clean": "validated",
			"heal": "validated",
			"evolution": "validated"
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
	},
	metaletemon: {
		id: "metaletemon",
		name: "Metaletemon",
		stage: "mega",
		root: "sprites/metaletemon",
		spriteReady: true,
		status: "READY",
		movementStyle: "4-way",
		reason: "Estrutura validada com movimento 4-way completo, golpes basic_1, basic_2, especial, hit, death e victory ancorados em canvas 96x96 baseline y=90.",
		frame: {
			"width": 96,
			"height": 96,
			"originX": .5,
			"originY": .94
		},
		scale: 1,
		hitbox: {
			"width": 42,
			"height": 60,
			"offsetX": 27,
			"offsetY": 30
		},
		animations: {
			"idle": {
				"fps": 7,
				"loop": true,
				"frames": [
					"sprites/metaletemon/idle/idle_01.png",
					"sprites/metaletemon/idle/idle_02.png",
					"sprites/metaletemon/idle/idle_03.png",
					"sprites/metaletemon/idle/idle_04.png",
					"sprites/metaletemon/idle/idle_05.png",
					"sprites/metaletemon/idle/idle_06.png",
					"sprites/metaletemon/idle/idle_07.png",
					"sprites/metaletemon/idle/idle_08.png",
					"sprites/metaletemon/idle/idle_09.png",
					"sprites/metaletemon/idle/idle_10.png"
				]
			},
			"walk_down": {
				"fps": 8,
				"loop": true,
				"frames": [
					"sprites/metaletemon/walk/down/walk_down_01.png",
					"sprites/metaletemon/walk/down/walk_down_02.png",
					"sprites/metaletemon/walk/down/walk_down_03.png"
				]
			},
			"walk_up": {
				"fps": 8,
				"loop": true,
				"frames": [
					"sprites/metaletemon/walk/up/walk_up_01.png",
					"sprites/metaletemon/walk/up/walk_up_02.png",
					"sprites/metaletemon/walk/up/walk_up_03.png"
				]
			},
			"walk_left": {
				"fps": 8,
				"loop": true,
				"frames": [
					"sprites/metaletemon/walk/left/walk_left_01.png",
					"sprites/metaletemon/walk/left/walk_left_02.png",
					"sprites/metaletemon/walk/left/walk_left_03.png"
				]
			},
			"walk_right": {
				"fps": 8,
				"loop": true,
				"frames": [
					"sprites/metaletemon/walk/right/walk_right_01.png",
					"sprites/metaletemon/walk/right/walk_right_02.png",
					"sprites/metaletemon/walk/right/walk_right_03.png"
				]
			},
			"attack_basic_1": {
				"fps": 10,
				"loop": false,
				"frames": [
					"sprites/metaletemon/attacks/basic_1/attacks_basic_1_01.png",
					"sprites/metaletemon/attacks/basic_1/attacks_basic_1_02.png",
					"sprites/metaletemon/attacks/basic_1/attacks_basic_1_03.png"
				]
			},
			"attack_basic_2": {
				"fps": 8,
				"loop": false,
				"frames": [
					"sprites/metaletemon/attacks/basic_2/attacks_basic_2_01.png",
					"sprites/metaletemon/attacks/basic_2/attacks_basic_2_02.png",
					"sprites/metaletemon/attacks/basic_2/attacks_basic_2_03.png"
				]
			},
			"attack_special": {
				"fps": 8,
				"loop": false,
				"frames": [
					"sprites/metaletemon/attacks/special/attacks_special_01.png",
					"sprites/metaletemon/attacks/special/attacks_special_02.png",
					"sprites/metaletemon/attacks/special/attacks_special_03.png"
				]
			},
			"hit": {
				"fps": 8,
				"loop": false,
				"frames": ["sprites/metaletemon/hit/hit_01.png"]
			},
			"death": {
				"fps": 5,
				"loop": false,
				"frames": ["sprites/metaletemon/death/death_01.png"]
			},
			"victory": {
				"fps": 5,
				"loop": false,
				"frames": ["sprites/metaletemon/victory/victory_01.png"]
			}
		},
		tamagotchiActions: {
			"idle": "validated",
			"eat": "validated",
			"sleep": "validated",
			"wake": "validated",
			"play": "validated",
			"clean": "validated",
			"heal": "validated",
			"evolution": "validated"
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
	},
	wargreymon: {
		id: "wargreymon",
		name: "Wargreymon",
		stage: "mega",
		root: "sprites/wargreymon",
		spriteReady: true,
		status: "READY",
		movementStyle: "4-way",
		reason: "Estrutura validada com movimento 4-way completo, golpes basic_1, basic_2, especial, hit, death e victory ancorados em canvas 96x96 baseline y=90.",
		frame: {
			"width": 96,
			"height": 96,
			"originX": .5,
			"originY": .94
		},
		scale: 1,
		hitbox: {
			"width": 42,
			"height": 60,
			"offsetX": 27,
			"offsetY": 30
		},
		animations: {
			"idle": {
				"fps": 7,
				"loop": true,
				"frames": [
					"sprites/wargreymon/idle/idle_01.png",
					"sprites/wargreymon/idle/idle_02.png",
					"sprites/wargreymon/idle/idle_03.png",
					"sprites/wargreymon/idle/idle_04.png",
					"sprites/wargreymon/idle/idle_05.png",
					"sprites/wargreymon/idle/idle_06.png",
					"sprites/wargreymon/idle/idle_07.png",
					"sprites/wargreymon/idle/idle_08.png",
					"sprites/wargreymon/idle/idle_09.png",
					"sprites/wargreymon/idle/idle_10.png"
				]
			},
			"walk_down": {
				"fps": 8,
				"loop": true,
				"frames": [
					"sprites/wargreymon/walk/down/walk_down_01.png",
					"sprites/wargreymon/walk/down/walk_down_02.png",
					"sprites/wargreymon/walk/down/walk_down_03.png"
				]
			},
			"walk_up": {
				"fps": 8,
				"loop": true,
				"frames": [
					"sprites/wargreymon/walk/up/walk_up_01.png",
					"sprites/wargreymon/walk/up/walk_up_02.png",
					"sprites/wargreymon/walk/up/walk_up_03.png"
				]
			},
			"walk_left": {
				"fps": 8,
				"loop": true,
				"frames": [
					"sprites/wargreymon/walk/left/walk_left_01.png",
					"sprites/wargreymon/walk/left/walk_left_02.png",
					"sprites/wargreymon/walk/left/walk_left_03.png"
				]
			},
			"walk_right": {
				"fps": 8,
				"loop": true,
				"frames": [
					"sprites/wargreymon/walk/right/walk_right_01.png",
					"sprites/wargreymon/walk/right/walk_right_02.png",
					"sprites/wargreymon/walk/right/walk_right_03.png"
				]
			},
			"attack_basic_1": {
				"fps": 10,
				"loop": false,
				"frames": [
					"sprites/wargreymon/attacks/basic_1/attacks_basic_1_01.png",
					"sprites/wargreymon/attacks/basic_1/attacks_basic_1_02.png",
					"sprites/wargreymon/attacks/basic_1/attacks_basic_1_03.png"
				]
			},
			"attack_basic_2": {
				"fps": 8,
				"loop": false,
				"frames": [
					"sprites/wargreymon/attacks/basic_2/attacks_basic_2_01.png",
					"sprites/wargreymon/attacks/basic_2/attacks_basic_2_02.png",
					"sprites/wargreymon/attacks/basic_2/attacks_basic_2_03.png"
				]
			},
			"attack_special": {
				"fps": 8,
				"loop": false,
				"frames": [
					"sprites/wargreymon/attacks/special/attacks_special_01.png",
					"sprites/wargreymon/attacks/special/attacks_special_02.png",
					"sprites/wargreymon/attacks/special/attacks_special_03.png"
				]
			},
			"hit": {
				"fps": 8,
				"loop": false,
				"frames": ["sprites/wargreymon/hit/hit_01.png"]
			},
			"death": {
				"fps": 5,
				"loop": false,
				"frames": ["sprites/wargreymon/death/death_01.png"]
			},
			"victory": {
				"fps": 5,
				"loop": false,
				"frames": ["sprites/wargreymon/victory/victory_01.png"]
			}
		},
		tamagotchiActions: {
			"idle": "validated",
			"eat": "validated",
			"sleep": "validated",
			"wake": "validated",
			"play": "validated",
			"clean": "validated",
			"heal": "validated",
			"evolution": "validated"
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
	},
	weregarurumon: {
		id: "weregarurumon",
		name: "Weregarurumon",
		stage: "ultimate",
		root: "sprites/weregarurumon",
		spriteReady: true,
		status: "READY",
		movementStyle: "4-way",
		reason: "Estrutura validada com movimento 4-way completo, golpes basic_1, basic_2, especial, hit, death e victory ancorados em canvas 96x96 baseline y=90.",
		frame: {
			"width": 96,
			"height": 96,
			"originX": .5,
			"originY": .94
		},
		scale: 1,
		hitbox: {
			"width": 42,
			"height": 60,
			"offsetX": 27,
			"offsetY": 30
		},
		animations: {
			"idle": {
				"fps": 7,
				"loop": true,
				"frames": [
					"sprites/weregarurumon/idle/idle_01.png",
					"sprites/weregarurumon/idle/idle_02.png",
					"sprites/weregarurumon/idle/idle_03.png",
					"sprites/weregarurumon/idle/idle_04.png",
					"sprites/weregarurumon/idle/idle_05.png",
					"sprites/weregarurumon/idle/idle_06.png",
					"sprites/weregarurumon/idle/idle_07.png",
					"sprites/weregarurumon/idle/idle_08.png",
					"sprites/weregarurumon/idle/idle_09.png",
					"sprites/weregarurumon/idle/idle_10.png"
				]
			},
			"walk_down": {
				"fps": 8,
				"loop": true,
				"frames": [
					"sprites/weregarurumon/walk/down/walk_down_01.png",
					"sprites/weregarurumon/walk/down/walk_down_02.png",
					"sprites/weregarurumon/walk/down/walk_down_03.png"
				]
			},
			"walk_up": {
				"fps": 8,
				"loop": true,
				"frames": [
					"sprites/weregarurumon/walk/up/walk_up_01.png",
					"sprites/weregarurumon/walk/up/walk_up_02.png",
					"sprites/weregarurumon/walk/up/walk_up_03.png"
				]
			},
			"walk_left": {
				"fps": 8,
				"loop": true,
				"frames": [
					"sprites/weregarurumon/walk/left/walk_left_01.png",
					"sprites/weregarurumon/walk/left/walk_left_02.png",
					"sprites/weregarurumon/walk/left/walk_left_03.png"
				]
			},
			"walk_right": {
				"fps": 8,
				"loop": true,
				"frames": [
					"sprites/weregarurumon/walk/right/walk_right_01.png",
					"sprites/weregarurumon/walk/right/walk_right_02.png",
					"sprites/weregarurumon/walk/right/walk_right_03.png"
				]
			},
			"attack_basic_1": {
				"fps": 10,
				"loop": false,
				"frames": [
					"sprites/weregarurumon/attacks/basic_1/attacks_basic_1_01.png",
					"sprites/weregarurumon/attacks/basic_1/attacks_basic_1_02.png",
					"sprites/weregarurumon/attacks/basic_1/attacks_basic_1_03.png"
				]
			},
			"attack_basic_2": {
				"fps": 8,
				"loop": false,
				"frames": [
					"sprites/weregarurumon/attacks/basic_2/attacks_basic_2_01.png",
					"sprites/weregarurumon/attacks/basic_2/attacks_basic_2_02.png",
					"sprites/weregarurumon/attacks/basic_2/attacks_basic_2_03.png"
				]
			},
			"attack_special": {
				"fps": 8,
				"loop": false,
				"frames": [
					"sprites/weregarurumon/attacks/special/attacks_special_01.png",
					"sprites/weregarurumon/attacks/special/attacks_special_02.png",
					"sprites/weregarurumon/attacks/special/attacks_special_03.png"
				]
			},
			"hit": {
				"fps": 8,
				"loop": false,
				"frames": ["sprites/weregarurumon/hit/hit_01.png"]
			},
			"death": {
				"fps": 5,
				"loop": false,
				"frames": ["sprites/weregarurumon/death/death_01.png"]
			},
			"victory": {
				"fps": 5,
				"loop": false,
				"frames": ["sprites/weregarurumon/victory/victory_01.png"]
			}
		},
		tamagotchiActions: {
			"idle": "validated",
			"eat": "validated",
			"sleep": "validated",
			"wake": "validated",
			"play": "validated",
			"clean": "validated",
			"heal": "validated",
			"evolution": "validated"
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
	},
	xvmon: {
		id: "xvmon",
		name: "XV-mon",
		stage: "champion",
		root: "sprites/xvmon",
		spriteReady: true,
		status: "READY",
		movementStyle: "4-way",
		reason: "Estrutura validada com movimento 4-way completo, golpes basic_1, basic_2, especial, hit, death e victory ancorados em canvas 96x96 baseline y=90.",
		frame: {
			"width": 96,
			"height": 96,
			"originX": .5,
			"originY": .94
		},
		scale: 1,
		hitbox: {
			"width": 42,
			"height": 60,
			"offsetX": 27,
			"offsetY": 30
		},
		animations: {
			"idle": {
				"fps": 7,
				"loop": true,
				"frames": [
					"sprites/xvmon/idle/idle_01.png",
					"sprites/xvmon/idle/idle_02.png",
					"sprites/xvmon/idle/idle_03.png",
					"sprites/xvmon/idle/idle_04.png",
					"sprites/xvmon/idle/idle_05.png",
					"sprites/xvmon/idle/idle_06.png",
					"sprites/xvmon/idle/idle_07.png",
					"sprites/xvmon/idle/idle_08.png"
				]
			},
			"walk_down": {
				"fps": 8,
				"loop": true,
				"frames": [
					"sprites/xvmon/walk/down/walk_down_01.png",
					"sprites/xvmon/walk/down/walk_down_02.png",
					"sprites/xvmon/walk/down/walk_down_03.png"
				]
			},
			"walk_up": {
				"fps": 8,
				"loop": true,
				"frames": [
					"sprites/xvmon/walk/up/walk_up_01.png",
					"sprites/xvmon/walk/up/walk_up_02.png",
					"sprites/xvmon/walk/up/walk_up_03.png"
				]
			},
			"walk_left": {
				"fps": 8,
				"loop": true,
				"frames": [
					"sprites/xvmon/walk/left/walk_left_01.png",
					"sprites/xvmon/walk/left/walk_left_02.png",
					"sprites/xvmon/walk/left/walk_left_03.png"
				]
			},
			"walk_right": {
				"fps": 8,
				"loop": true,
				"frames": [
					"sprites/xvmon/walk/right/walk_right_01.png",
					"sprites/xvmon/walk/right/walk_right_02.png",
					"sprites/xvmon/walk/right/walk_right_03.png"
				]
			},
			"attack_basic_1": {
				"fps": 10,
				"loop": false,
				"frames": [
					"sprites/xvmon/attacks/basic_1/attacks_basic_1_01.png",
					"sprites/xvmon/attacks/basic_1/attacks_basic_1_02.png",
					"sprites/xvmon/attacks/basic_1/attacks_basic_1_03.png"
				]
			},
			"attack_basic_2": {
				"fps": 8,
				"loop": false,
				"frames": [
					"sprites/xvmon/attacks/basic_2/attacks_basic_2_01.png",
					"sprites/xvmon/attacks/basic_2/attacks_basic_2_02.png",
					"sprites/xvmon/attacks/basic_2/attacks_basic_2_03.png"
				]
			},
			"attack_special": {
				"fps": 8,
				"loop": false,
				"frames": [
					"sprites/xvmon/attacks/special/attacks_special_01.png",
					"sprites/xvmon/attacks/special/attacks_special_02.png",
					"sprites/xvmon/attacks/special/attacks_special_03.png"
				]
			},
			"hit": {
				"fps": 8,
				"loop": false,
				"frames": ["sprites/xvmon/hit/hit_01.png"]
			},
			"death": {
				"fps": 5,
				"loop": false,
				"frames": ["sprites/xvmon/death/death_01.png"]
			},
			"victory": {
				"fps": 5,
				"loop": false,
				"frames": ["sprites/xvmon/victory/victory_01.png"]
			}
		},
		tamagotchiActions: {
			"idle": "validated",
			"eat": "validated",
			"sleep": "validated",
			"wake": "validated",
			"play": "validated",
			"clean": "validated",
			"heal": "validated",
			"evolution": "validated"
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
			floorNormal: ["/sprites/maps/lighting/floor/normal/floor_normal_01.png", "/sprites/maps/lighting/floor/normal/floor_normal_02.png"],
			floorVariation: ["/sprites/maps/lighting/floor/cracked/floor_cracked_01.png", "/sprites/maps/lighting/floor/cracked/floor_cracked_02.png"],
			floorDecor: ["/sprites/maps/lighting/floor/alternate/floor_alternate_02.png", "/sprites/maps/lighting/floor/special/floor_special_01.png"],
			floorAlternate: ["/sprites/maps/lighting/floor/alternate/floor_alternate_01.png", "/sprites/maps/lighting/floor/alternate/floor_alternate_02.png"],
			floorSpecial: ["/sprites/maps/lighting/floor/special/floor_special_01.png", "/sprites/maps/lighting/floor/special/floor_special_02.png"],
			floorCracked: ["/sprites/maps/lighting/floor/cracked/floor_cracked_01.png", "/sprites/maps/lighting/floor/cracked/floor_cracked_02.png"],
			walls: {
				horizontal: ["/sprites/maps/lighting/walls/horizontal/wall_horizontal_01.png"],
				vertical: ["/sprites/maps/lighting/walls/vertical/wall_vertical_01.png"],
				top: ["/sprites/maps/lighting/walls/top/wall_top_01.png"],
				bottom: ["/sprites/maps/lighting/walls/bottom/wall_bottom_01.png"],
				left: ["/sprites/maps/lighting/walls/left/wall_left_01.png"],
				right: ["/sprites/maps/lighting/walls/right/wall_right_01.png"],
				special: [
					"/sprites/maps/lighting/walls/special/wall_special_01.png",
					"/sprites/maps/lighting/walls/special/wall_special_02.png",
					"/sprites/maps/lighting/walls/special/wall_special_03.png",
					"/sprites/maps/lighting/walls/special/wall_special_04.png"
				]
			},
			corners: {
				outerTopLeft: "/sprites/maps/lighting/corners/outer/top_left/corner_outer_top_left.png",
				outerTopRight: "/sprites/maps/lighting/corners/outer/top_right/corner_outer_top_right.png",
				outerBottomLeft: "/sprites/maps/lighting/corners/outer/bottom_left/corner_outer_bottom_left.png",
				outerBottomRight: "/sprites/maps/lighting/corners/outer/bottom_right/corner_outer_bottom_right.png",
				innerTopLeft: "/sprites/maps/lighting/corners/inner/top_left/corner_inner_top_left.png",
				innerTopRight: "/sprites/maps/lighting/corners/inner/top_right/corner_inner_top_right.png",
				innerBottomLeft: "/sprites/maps/lighting/corners/inner/bottom_left/corner_inner_bottom_left.png",
				innerBottomRight: "/sprites/maps/lighting/corners/inner/bottom_right/corner_inner_bottom_right.png"
			},
			doors: {
				verticalClosed: "/sprites/maps/lighting/doors/vertical/closed/door_vertical_closed_01.png",
				verticalOpen: "/sprites/maps/lighting/doors/vertical/open/door_vertical_open_01.png"
			},
			chests: {
				closed: ["/sprites/maps/lighting/interactables/chest/closed/chest_closed_01.png", "/sprites/maps/lighting/interactables/chest/closed/chest_closed_02.png"],
				open: ["/sprites/maps/lighting/interactables/chest/open/chest_open_01.png", "/sprites/maps/lighting/interactables/chest/open/chest_open_02.png"]
			},
			decorations: {
				floor: ["/sprites/maps/lighting/decorations/floor/decor_floor_01.png", "/sprites/maps/lighting/decorations/floor/decor_floor_02.png"],
				medium: ["/sprites/maps/lighting/decorations/medium/decor_medium_01.png", "/sprites/maps/lighting/decorations/medium/decor_medium_02.png"],
				wall: ["/sprites/maps/lighting/decorations/wall/decor_wall_01.png", "/sprites/maps/lighting/decorations/wall/decor_wall_02.png"]
			},
			environment: {
				ambient: ["/sprites/maps/lighting/environment/ambient/env_ambient_01.png"],
				rocks: ["/sprites/maps/lighting/environment/rocks/env_rocks_01.png"],
				ruins: ["/sprites/maps/lighting/environment/ruins/env_ruins_01.png"],
				elemental: ["/sprites/maps/lighting/environment/elemental/env_elemental_01.png"]
			},
			hazards: { floor: ["/sprites/maps/lighting/hazards/floor/hazard_floor_01.png", "/sprites/maps/lighting/hazards/floor/hazard_floor_02.png"] },
			landmarks: { monolith: ["/sprites/maps/lighting/landmarks/landmark_01.png", "/sprites/maps/lighting/landmarks/landmark_02.png"] }
		}
	},
	fire: {
		id: "fire",
		name: "Câmara de Magma Digital",
		basePath: "/sprites/maps/fire/",
		enabled: true,
		biome: "fire",
		wallRimColor: 16729088,
		accentTint: 16755200,
		tiles: {
			floorNormal: ["/sprites/maps/fire/floor/normal/floor_normal_01.png", "/sprites/maps/fire/floor/normal/floor_normal_02.png"],
			floorVariation: ["/sprites/maps/fire/floor/cracked/floor_cracked_01.png", "/sprites/maps/fire/floor/cracked/floor_cracked_02.png"],
			floorDecor: ["/sprites/maps/fire/floor/alternate/floor_alternate_02.png", "/sprites/maps/fire/floor/special/floor_special_01.png"],
			floorAlternate: ["/sprites/maps/fire/floor/alternate/floor_alternate_01.png", "/sprites/maps/fire/floor/alternate/floor_alternate_02.png"],
			floorSpecial: ["/sprites/maps/fire/floor/special/floor_special_01.png", "/sprites/maps/fire/floor/special/floor_special_02.png"],
			floorCracked: ["/sprites/maps/fire/floor/cracked/floor_cracked_01.png", "/sprites/maps/fire/floor/cracked/floor_cracked_02.png"],
			walls: {
				horizontal: ["/sprites/maps/fire/walls/horizontal/wall_horizontal_01.png"],
				vertical: ["/sprites/maps/fire/walls/vertical/wall_vertical_01.png"],
				top: ["/sprites/maps/fire/walls/top/wall_top_01.png"],
				bottom: ["/sprites/maps/fire/walls/bottom/wall_bottom_01.png"],
				left: ["/sprites/maps/fire/walls/left/wall_left_01.png"],
				right: ["/sprites/maps/fire/walls/right/wall_right_01.png"],
				special: ["/sprites/maps/fire/walls/special/wall_special_01.png", "/sprites/maps/fire/walls/special/wall_special_02.png"]
			},
			corners: {
				outerTopLeft: "/sprites/maps/fire/corners/outer/top_left/corner_outer_top_left.png",
				outerTopRight: "/sprites/maps/fire/corners/outer/top_right/corner_outer_top_right.png",
				outerBottomLeft: "/sprites/maps/fire/corners/outer/bottom_left/corner_outer_bottom_left.png",
				outerBottomRight: "/sprites/maps/fire/corners/outer/bottom_right/corner_outer_bottom_right.png",
				innerTopLeft: "/sprites/maps/fire/corners/inner/top_left/corner_inner_top_left.png",
				innerTopRight: "/sprites/maps/fire/corners/inner/top_right/corner_inner_top_right.png",
				innerBottomLeft: "/sprites/maps/fire/corners/inner/bottom_left/corner_inner_bottom_left.png",
				innerBottomRight: "/sprites/maps/fire/corners/inner/bottom_right/corner_inner_bottom_right.png"
			},
			doors: {
				verticalClosed: "/sprites/maps/fire/doors/vertical/closed/door_vertical_closed_01.png",
				verticalOpen: "/sprites/maps/fire/doors/vertical/open/door_vertical_open_01.png"
			},
			chests: {
				closed: ["/sprites/maps/fire/interactables/chest/closed/chest_closed_01.png"],
				open: ["/sprites/maps/fire/interactables/chest/open/chest_open_01.png"]
			},
			decorations: {
				floor: ["/sprites/maps/fire/decorations/floor/decor_floor_01.png"],
				medium: ["/sprites/maps/fire/decorations/medium/decor_medium_01.png"],
				wall: ["/sprites/maps/fire/decorations/wall/decor_wall_01.png"]
			},
			environment: {
				ambient: ["/sprites/maps/fire/environment/ambient/env_ambient_01.png"],
				rocks: ["/sprites/maps/fire/environment/rocks/env_rocks_01.png"],
				ruins: ["/sprites/maps/fire/environment/ruins/env_ruins_01.png"],
				elemental: ["/sprites/maps/fire/environment/elemental/env_elemental_01.png"]
			},
			hazards: { floor: ["/sprites/maps/fire/hazards/floor/hazard_floor_01.png"] },
			landmarks: { monolith: ["/sprites/maps/fire/landmarks/landmark_01.png"] }
		}
	},
	ice: {
		id: "ice",
		name: "Glaciar de Subzero",
		basePath: "/sprites/maps/ice/",
		enabled: true,
		biome: "ice",
		wallRimColor: 6737151,
		accentTint: 11199743,
		tiles: {
			floorNormal: ["/sprites/maps/ice/floor/normal/floor_normal_01.png", "/sprites/maps/ice/floor/normal/floor_normal_02.png"],
			floorVariation: ["/sprites/maps/ice/floor/cracked/floor_cracked_01.png", "/sprites/maps/ice/floor/cracked/floor_cracked_02.png"],
			floorDecor: ["/sprites/maps/ice/floor/alternate/floor_alternate_02.png", "/sprites/maps/ice/floor/special/floor_special_01.png"],
			floorAlternate: ["/sprites/maps/ice/floor/alternate/floor_alternate_01.png", "/sprites/maps/ice/floor/alternate/floor_alternate_02.png"],
			floorSpecial: ["/sprites/maps/ice/floor/special/floor_special_01.png", "/sprites/maps/ice/floor/special/floor_special_02.png"],
			floorCracked: ["/sprites/maps/ice/floor/cracked/floor_cracked_01.png", "/sprites/maps/ice/floor/cracked/floor_cracked_02.png"],
			walls: {
				horizontal: ["/sprites/maps/ice/walls/horizontal/wall_horizontal_01.png"],
				vertical: ["/sprites/maps/ice/walls/vertical/wall_vertical_01.png"],
				top: ["/sprites/maps/ice/walls/top/wall_top_01.png"],
				bottom: ["/sprites/maps/ice/walls/bottom/wall_bottom_01.png"],
				left: ["/sprites/maps/ice/walls/left/wall_left_01.png"],
				right: ["/sprites/maps/ice/walls/right/wall_right_01.png"],
				special: ["/sprites/maps/ice/walls/special/wall_special_01.png", "/sprites/maps/ice/walls/special/wall_special_02.png"]
			},
			corners: {
				outerTopLeft: "/sprites/maps/ice/corners/outer/top_left/corner_outer_top_left.png",
				outerTopRight: "/sprites/maps/ice/corners/outer/top_right/corner_outer_top_right.png",
				outerBottomLeft: "/sprites/maps/ice/corners/outer/bottom_left/corner_outer_bottom_left.png",
				outerBottomRight: "/sprites/maps/ice/corners/outer/bottom_right/corner_outer_bottom_right.png",
				innerTopLeft: "/sprites/maps/ice/corners/inner/top_left/corner_inner_top_left.png",
				innerTopRight: "/sprites/maps/ice/corners/inner/top_right/corner_inner_top_right.png",
				innerBottomLeft: "/sprites/maps/ice/corners/inner/bottom_left/corner_inner_bottom_left.png",
				innerBottomRight: "/sprites/maps/ice/corners/inner/bottom_right/corner_inner_bottom_right.png"
			},
			doors: {
				verticalClosed: "/sprites/maps/ice/doors/vertical/closed/door_vertical_closed_01.png",
				verticalOpen: "/sprites/maps/ice/doors/vertical/open/door_vertical_open_01.png"
			},
			chests: {
				closed: ["/sprites/maps/ice/interactables/chest/closed/chest_closed_01.png"],
				open: ["/sprites/maps/ice/interactables/chest/open/chest_open_01.png"]
			},
			decorations: {
				floor: ["/sprites/maps/ice/decorations/floor/decor_floor_01.png"],
				medium: ["/sprites/maps/ice/decorations/medium/decor_medium_01.png"],
				wall: ["/sprites/maps/ice/decorations/wall/decor_wall_01.png"]
			},
			environment: {
				ambient: ["/sprites/maps/ice/environment/ambient/env_ambient_01.png"],
				rocks: ["/sprites/maps/ice/environment/rocks/env_rocks_01.png"],
				ruins: ["/sprites/maps/ice/environment/ruins/env_ruins_01.png"],
				elemental: ["/sprites/maps/ice/environment/elemental/env_elemental_01.png"]
			},
			hazards: { floor: ["/sprites/maps/ice/hazards/floor/hazard_floor_01.png"] },
			landmarks: { monolith: ["/sprites/maps/ice/landmarks/landmark_01.png"] }
		}
	},
	tech: {
		id: "tech",
		name: "Laboratório Cyber Core",
		basePath: "/sprites/maps/tech/",
		enabled: true,
		biome: "digital",
		wallRimColor: 3800852,
		accentTint: 7405424,
		tiles: {
			floorNormal: ["/sprites/maps/tech/floor/normal/floor_normal_01.png", "/sprites/maps/tech/floor/normal/floor_normal_02.png"],
			floorVariation: ["/sprites/maps/tech/floor/cracked/floor_cracked_01.png", "/sprites/maps/tech/floor/cracked/floor_cracked_02.png"],
			floorDecor: ["/sprites/maps/tech/floor/alternate/floor_alternate_02.png", "/sprites/maps/tech/floor/special/floor_special_01.png"],
			floorAlternate: ["/sprites/maps/tech/floor/alternate/floor_alternate_01.png", "/sprites/maps/tech/floor/alternate/floor_alternate_02.png"],
			floorSpecial: ["/sprites/maps/tech/floor/special/floor_special_01.png", "/sprites/maps/tech/floor/special/floor_special_02.png"],
			floorCracked: ["/sprites/maps/tech/floor/cracked/floor_cracked_01.png", "/sprites/maps/tech/floor/cracked/floor_cracked_02.png"],
			walls: {
				horizontal: ["/sprites/maps/tech/walls/horizontal/wall_horizontal_01.png"],
				vertical: ["/sprites/maps/tech/walls/vertical/wall_vertical_01.png"],
				top: ["/sprites/maps/tech/walls/top/wall_top_01.png"],
				bottom: ["/sprites/maps/tech/walls/bottom/wall_bottom_01.png"],
				left: ["/sprites/maps/tech/walls/left/wall_left_01.png"],
				right: ["/sprites/maps/tech/walls/right/wall_right_01.png"],
				special: ["/sprites/maps/tech/walls/special/wall_special_01.png", "/sprites/maps/tech/walls/special/wall_special_02.png"]
			},
			corners: {
				outerTopLeft: "/sprites/maps/tech/corners/outer/top_left/corner_outer_top_left.png",
				outerTopRight: "/sprites/maps/tech/corners/outer/top_right/corner_outer_top_right.png",
				outerBottomLeft: "/sprites/maps/tech/corners/outer/bottom_left/corner_outer_bottom_left.png",
				outerBottomRight: "/sprites/maps/tech/corners/outer/bottom_right/corner_outer_bottom_right.png",
				innerTopLeft: "/sprites/maps/tech/corners/inner/top_left/corner_inner_top_left.png",
				innerTopRight: "/sprites/maps/tech/corners/inner/top_right/corner_inner_top_right.png",
				innerBottomLeft: "/sprites/maps/tech/corners/inner/bottom_left/corner_inner_bottom_left.png",
				innerBottomRight: "/sprites/maps/tech/corners/inner/bottom_right/corner_inner_bottom_right.png"
			},
			doors: {
				verticalClosed: "/sprites/maps/tech/doors/vertical/closed/door_vertical_closed_01.png",
				verticalOpen: "/sprites/maps/tech/doors/vertical/open/door_vertical_open_01.png"
			},
			chests: {
				closed: ["/sprites/maps/tech/interactables/chest/closed/chest_closed_01.png"],
				open: ["/sprites/maps/tech/interactables/chest/open/chest_open_01.png"]
			},
			decorations: {
				floor: ["/sprites/maps/tech/decorations/floor/decor_floor_01.png"],
				medium: ["/sprites/maps/tech/decorations/medium/decor_medium_01.png"],
				wall: ["/sprites/maps/tech/decorations/wall/decor_wall_01.png"]
			},
			environment: {
				ambient: ["/sprites/maps/tech/environment/ambient/env_ambient_01.png"],
				rocks: ["/sprites/maps/tech/environment/rocks/env_rocks_01.png"],
				ruins: ["/sprites/maps/tech/environment/ruins/env_ruins_01.png"],
				elemental: ["/sprites/maps/tech/environment/elemental/env_elemental_01.png"]
			},
			hazards: { floor: ["/sprites/maps/tech/hazards/floor/hazard_floor_01.png"] },
			landmarks: { monolith: ["/sprites/maps/tech/landmarks/landmark_01.png"] }
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
var MACRO_ARCHETYPES = [
	"branching_dungeon",
	"central_hub",
	"long_expedition",
	"ring_dungeon",
	"multiple_loops",
	"cavern_network",
	"ruined_complex",
	"arena_clusters"
];
function pickMacroArchetype(floor, kind, rng, preferred) {
	if (preferred) return preferred;
	if (kind === "boss") return "arena_clusters";
	if (kind === "miniboss") return rng.pick([
		"arena_clusters",
		"central_hub",
		"ruined_complex"
	]);
	if (floor <= 5) return rng.pick([
		"branching_dungeon",
		"central_hub",
		"long_expedition"
	]);
	return rng.pick(MACRO_ARCHETYPES);
}
function pickShapeForKind(kind, sizeCategory, rng, archetype) {
	if (kind === "boss") return "boss_arena";
	if (kind === "miniboss") return rng.pick([
		"arena",
		"central_arena",
		"octagonal",
		"pillars_arena"
	]);
	if (kind === "treasure") return rng.pick([
		"vault",
		"alcove_room",
		"compact",
		"circular"
	]);
	if (kind === "rest" || kind === "shop") return rng.pick([
		"compact",
		"alcove_room",
		"circular",
		"arena"
	]);
	if (archetype === "cavern_network") return rng.pick([
		"cave_blob",
		"irregular",
		"oval",
		"asymmetric"
	]);
	if (archetype === "ruined_complex") return rng.pick([
		"ruins",
		"multi_chamber",
		"open",
		"pillars_arena"
	]);
	return rng.pick([
		"arena",
		"cross",
		"L_shape",
		"T_shape",
		"open",
		"compact",
		"multi_room",
		"asymmetric",
		"winding",
		"chokepoint",
		"central_arena",
		"octagonal",
		"circular",
		"oval",
		"multi_chamber",
		"hall",
		"alcove_room",
		"pillar_room"
	]);
}
function generateTopologyGraph(options) {
	const { floor, kind, rng } = options;
	const macroArchetype = pickMacroArchetype(floor, kind, rng, options.preferredArchetype);
	if (kind === "boss") return generateBossTopology(floor, rng);
	if (kind === "miniboss") return generateMiniBossTopology(floor, rng, macroArchetype);
	switch (macroArchetype) {
		case "central_hub": return generateCentralHubTopology(floor, rng);
		case "ring_dungeon": return generateRingTopology(floor, rng);
		case "multiple_loops": return generateMultipleLoopsTopology(floor, rng);
		case "long_expedition": return generateLongExpeditionTopology(floor, rng);
		case "cavern_network": return generateCavernTopology(floor, rng);
		case "ruined_complex": return generateRuinedComplexTopology(floor, rng);
		case "arena_clusters": return generateArenaClustersTopology(floor, rng);
		default: return generateBranchingTopology(floor, rng);
	}
}
function generateBossTopology(floor, _rng) {
	const startNode = {
		id: "boss_vestibule",
		kind: "start",
		shape: "hall",
		sizeCategory: "medium",
		gridX: 0,
		gridY: 1,
		width: 14,
		height: 10,
		isMainPath: true,
		isOptional: false,
		depth: 0
	};
	const bossArena = {
		id: "boss_sanctum",
		kind: "boss",
		shape: "boss_arena",
		sizeCategory: "huge",
		gridX: 1,
		gridY: 1,
		width: 28,
		height: 20,
		isMainPath: true,
		isOptional: false,
		depth: 1
	};
	const edge = {
		from: startNode.id,
		to: bossArena.id,
		corridorType: "wide",
		width: 3,
		isMainPath: true
	};
	return {
		macroArchetype: "arena_clusters",
		nodes: [startNode, bossArena],
		edges: [edge],
		startNodeId: startNode.id,
		exitNodeId: bossArena.id,
		mainPathNodeIds: [startNode.id, bossArena.id],
		optionalNodeIds: [],
		hasLoops: false,
		hasDeadEnds: false,
		loopCount: 0,
		deadEndCount: 0
	};
}
function generateMiniBossTopology(floor, rng, archetype) {
	const startNode = {
		id: "mb_entry",
		kind: "start",
		shape: "hall",
		sizeCategory: "small",
		gridX: 0,
		gridY: 1,
		width: 12,
		height: 10,
		isMainPath: true,
		isOptional: false,
		depth: 0
	};
	const mbArena = {
		id: "mb_arena",
		kind: "miniboss",
		shape: rng.pick([
			"central_arena",
			"octagonal",
			"pillars_arena"
		]),
		sizeCategory: "large",
		gridX: 1,
		gridY: 1,
		width: 22,
		height: 16,
		isMainPath: true,
		isOptional: false,
		depth: 1
	};
	const rewardNode = {
		id: "mb_vault",
		kind: "treasure",
		shape: "vault",
		sizeCategory: "small",
		gridX: 2,
		gridY: 1,
		width: 12,
		height: 10,
		isMainPath: true,
		isOptional: false,
		depth: 2
	};
	const edges = [{
		from: startNode.id,
		to: mbArena.id,
		corridorType: "straight",
		width: 2,
		isMainPath: true
	}, {
		from: mbArena.id,
		to: rewardNode.id,
		corridorType: "straight",
		width: 2,
		isMainPath: true
	}];
	return {
		macroArchetype: archetype,
		nodes: [
			startNode,
			mbArena,
			rewardNode
		],
		edges,
		startNodeId: startNode.id,
		exitNodeId: rewardNode.id,
		mainPathNodeIds: [
			startNode.id,
			mbArena.id,
			rewardNode.id
		],
		optionalNodeIds: [],
		hasLoops: false,
		hasDeadEnds: false,
		loopCount: 0,
		deadEndCount: 0
	};
}
function generateBranchingTopology(floor, rng) {
	const nodes = [];
	const edges = [];
	const mainCount = rng.int(3, 4);
	const mainIds = [];
	for (let i = 0; i < mainCount; i++) {
		const isStart = i === 0;
		const isExit = i === mainCount - 1;
		const kind = isStart ? "start" : isExit ? "combat" : rng.chance(.3) ? "elite" : "combat";
		const size = isStart ? "small" : isExit ? "medium" : "large";
		const id = `node_main_${i}`;
		mainIds.push(id);
		nodes.push({
			id,
			kind,
			shape: pickShapeForKind(kind, size, rng, "branching_dungeon"),
			sizeCategory: size,
			gridX: i,
			gridY: 1,
			width: size === "small" ? 12 : size === "medium" ? 16 : 20,
			height: size === "small" ? 10 : size === "medium" ? 12 : 14,
			isMainPath: true,
			isOptional: false,
			depth: i
		});
		if (i > 0) edges.push({
			from: mainIds[i - 1],
			to: id,
			corridorType: rng.pick([
				"straight",
				"wide",
				"L_turn"
			]),
			width: rng.int(2, 3),
			isMainPath: true
		});
	}
	const optionalIds = [];
	let deadEndCount = 0;
	let loopCount = 0;
	const branch1Parent = mainIds[1] || mainIds[0];
	const b1Kind = rng.chance(.6) ? "treasure" : "event";
	const b1Id = "node_branch_1";
	optionalIds.push(b1Id);
	deadEndCount++;
	nodes.push({
		id: b1Id,
		kind: b1Kind,
		shape: pickShapeForKind(b1Kind, "small", rng, "branching_dungeon"),
		sizeCategory: "small",
		gridX: 1,
		gridY: 0,
		width: 12,
		height: 10,
		isMainPath: false,
		isOptional: true,
		depth: 2,
		branchIndex: 1
	});
	edges.push({
		from: branch1Parent,
		to: b1Id,
		corridorType: "L_turn",
		width: 2,
		isMainPath: false
	});
	if (mainIds[2] && rng.chance(.4)) {
		edges.push({
			from: b1Id,
			to: mainIds[2],
			corridorType: "straight",
			width: 2,
			isLoop: true,
			isMainPath: false
		});
		loopCount++;
		deadEndCount = Math.max(0, deadEndCount - 1);
	}
	if (mainIds.length >= 3 && rng.chance(.7)) {
		const branch2Parent = mainIds[2];
		const b2Kind = rng.chance(.5) ? "rest" : "treasure";
		const b2Id = "node_branch_2";
		optionalIds.push(b2Id);
		deadEndCount++;
		nodes.push({
			id: b2Id,
			kind: b2Kind,
			shape: pickShapeForKind(b2Kind, "small", rng, "branching_dungeon"),
			sizeCategory: "small",
			gridX: 2,
			gridY: 2,
			width: 12,
			height: 10,
			isMainPath: false,
			isOptional: true,
			depth: 3,
			branchIndex: 2
		});
		edges.push({
			from: branch2Parent,
			to: b2Id,
			corridorType: "L_turn",
			width: 2,
			isMainPath: false
		});
	}
	return {
		macroArchetype: "branching_dungeon",
		nodes,
		edges,
		startNodeId: mainIds[0],
		exitNodeId: mainIds[mainIds.length - 1],
		mainPathNodeIds: mainIds,
		optionalNodeIds: optionalIds,
		hasLoops: loopCount > 0,
		hasDeadEnds: deadEndCount > 0,
		loopCount,
		deadEndCount
	};
}
function generateCentralHubTopology(floor, rng) {
	const hubNode = {
		id: "hub_center",
		kind: "combat",
		shape: rng.pick([
			"circular",
			"octagonal",
			"pillars_arena",
			"cross"
		]),
		sizeCategory: "large",
		gridX: 1,
		gridY: 1,
		width: 20,
		height: 16,
		isMainPath: true,
		isOptional: false,
		depth: 1
	};
	const startNode = {
		id: "hub_west_start",
		kind: "start",
		shape: "hall",
		sizeCategory: "small",
		gridX: 0,
		gridY: 1,
		width: 12,
		height: 10,
		isMainPath: true,
		isOptional: false,
		depth: 0
	};
	const northWing = {
		id: "hub_north_treasure",
		kind: "treasure",
		shape: "vault",
		sizeCategory: "small",
		gridX: 1,
		gridY: 0,
		width: 12,
		height: 10,
		isMainPath: false,
		isOptional: true,
		depth: 2
	};
	const southWing = {
		id: "hub_south_event",
		kind: rng.pick([
			"event",
			"rest",
			"combat"
		]),
		shape: "alcove_room",
		sizeCategory: "medium",
		gridX: 1,
		gridY: 2,
		width: 14,
		height: 12,
		isMainPath: false,
		isOptional: true,
		depth: 2
	};
	const exitNode = {
		id: "hub_east_exit",
		kind: "elite",
		shape: "arena",
		sizeCategory: "medium",
		gridX: 2,
		gridY: 1,
		width: 16,
		height: 14,
		isMainPath: true,
		isOptional: false,
		depth: 2
	};
	const edges = [
		{
			from: startNode.id,
			to: hubNode.id,
			corridorType: "straight",
			width: 2,
			isMainPath: true
		},
		{
			from: hubNode.id,
			to: northWing.id,
			corridorType: "straight",
			width: 2,
			isMainPath: false
		},
		{
			from: hubNode.id,
			to: southWing.id,
			corridorType: "straight",
			width: 2,
			isMainPath: false
		},
		{
			from: hubNode.id,
			to: exitNode.id,
			corridorType: "wide",
			width: 3,
			isMainPath: true
		}
	];
	let loopCount = 0;
	if (rng.chance(.45)) {
		edges.push({
			from: southWing.id,
			to: exitNode.id,
			corridorType: "L_turn",
			width: 2,
			isLoop: true,
			isMainPath: false
		});
		loopCount++;
	}
	return {
		macroArchetype: "central_hub",
		nodes: [
			startNode,
			hubNode,
			northWing,
			southWing,
			exitNode
		],
		edges,
		startNodeId: startNode.id,
		exitNodeId: exitNode.id,
		mainPathNodeIds: [
			startNode.id,
			hubNode.id,
			exitNode.id
		],
		optionalNodeIds: [northWing.id, southWing.id],
		hasLoops: loopCount > 0,
		hasDeadEnds: true,
		loopCount,
		deadEndCount: loopCount > 0 ? 1 : 2
	};
}
function generateRingTopology(floor, rng) {
	const startNode = {
		id: "ring_start",
		kind: "start",
		shape: "hall",
		sizeCategory: "small",
		gridX: 0,
		gridY: 1,
		width: 12,
		height: 10,
		isMainPath: true,
		isOptional: false,
		depth: 0
	};
	const northNode = {
		id: "ring_north",
		kind: "combat",
		shape: "L_shape",
		sizeCategory: "medium",
		gridX: 1,
		gridY: 0,
		width: 16,
		height: 12,
		isMainPath: true,
		isOptional: false,
		depth: 1
	};
	const southNode = {
		id: "ring_south",
		kind: rng.pick([
			"combat",
			"treasure",
			"event"
		]),
		shape: "T_shape",
		sizeCategory: "medium",
		gridX: 1,
		gridY: 2,
		width: 16,
		height: 12,
		isMainPath: false,
		isOptional: true,
		depth: 1
	};
	const exitNode = {
		id: "ring_exit",
		kind: "elite",
		shape: "arena",
		sizeCategory: "large",
		gridX: 2,
		gridY: 1,
		width: 18,
		height: 14,
		isMainPath: true,
		isOptional: false,
		depth: 2
	};
	const edges = [
		{
			from: startNode.id,
			to: northNode.id,
			corridorType: "L_turn",
			width: 2,
			isMainPath: true
		},
		{
			from: northNode.id,
			to: exitNode.id,
			corridorType: "L_turn",
			width: 2,
			isMainPath: true
		},
		{
			from: startNode.id,
			to: southNode.id,
			corridorType: "L_turn",
			width: 2,
			isLoop: true,
			isMainPath: false
		},
		{
			from: southNode.id,
			to: exitNode.id,
			corridorType: "L_turn",
			width: 2,
			isLoop: true,
			isMainPath: false
		}
	];
	return {
		macroArchetype: "ring_dungeon",
		nodes: [
			startNode,
			northNode,
			southNode,
			exitNode
		],
		edges,
		startNodeId: startNode.id,
		exitNodeId: exitNode.id,
		mainPathNodeIds: [
			startNode.id,
			northNode.id,
			exitNode.id
		],
		optionalNodeIds: [southNode.id],
		hasLoops: true,
		hasDeadEnds: false,
		loopCount: 1,
		deadEndCount: 0
	};
}
function generateMultipleLoopsTopology(floor, rng) {
	const start = {
		id: "mloop_start",
		kind: "start",
		shape: "compact",
		sizeCategory: "small",
		gridX: 0,
		gridY: 1,
		width: 12,
		height: 10,
		isMainPath: true,
		isOptional: false,
		depth: 0
	};
	const midA = {
		id: "mloop_midA",
		kind: "combat",
		shape: "cross",
		sizeCategory: "medium",
		gridX: 1,
		gridY: 0,
		width: 14,
		height: 12,
		isMainPath: true,
		isOptional: false,
		depth: 1
	};
	const midB = {
		id: "mloop_midB",
		kind: "combat",
		shape: "multi_chamber",
		sizeCategory: "medium",
		gridX: 1,
		gridY: 2,
		width: 14,
		height: 12,
		isMainPath: false,
		isOptional: true,
		depth: 1
	};
	const midCenter = {
		id: "mloop_center",
		kind: rng.pick([
			"event",
			"treasure",
			"rest"
		]),
		shape: "alcove_room",
		sizeCategory: "small",
		gridX: 1,
		gridY: 1,
		width: 12,
		height: 10,
		isMainPath: true,
		isOptional: false,
		depth: 1
	};
	const exit = {
		id: "mloop_exit",
		kind: "elite",
		shape: "arena",
		sizeCategory: "large",
		gridX: 2,
		gridY: 1,
		width: 18,
		height: 14,
		isMainPath: true,
		isOptional: false,
		depth: 2
	};
	const edges = [
		{
			from: start.id,
			to: midA.id,
			corridorType: "L_turn",
			width: 2,
			isMainPath: true
		},
		{
			from: start.id,
			to: midCenter.id,
			corridorType: "straight",
			width: 2,
			isMainPath: true
		},
		{
			from: start.id,
			to: midB.id,
			corridorType: "L_turn",
			width: 2,
			isLoop: true,
			isMainPath: false
		},
		{
			from: midA.id,
			to: exit.id,
			corridorType: "L_turn",
			width: 2,
			isMainPath: true
		},
		{
			from: midCenter.id,
			to: exit.id,
			corridorType: "straight",
			width: 2,
			isMainPath: true
		},
		{
			from: midB.id,
			to: exit.id,
			corridorType: "L_turn",
			width: 2,
			isLoop: true,
			isMainPath: false
		}
	];
	return {
		macroArchetype: "multiple_loops",
		nodes: [
			start,
			midA,
			midCenter,
			midB,
			exit
		],
		edges,
		startNodeId: start.id,
		exitNodeId: exit.id,
		mainPathNodeIds: [
			start.id,
			midCenter.id,
			exit.id
		],
		optionalNodeIds: [midA.id, midB.id],
		hasLoops: true,
		hasDeadEnds: false,
		loopCount: 2,
		deadEndCount: 0
	};
}
function generateLongExpeditionTopology(floor, rng) {
	const nodes = [];
	const edges = [];
	const mainIds = [];
	const count = rng.int(4, 5);
	for (let i = 0; i < count; i++) {
		const isStart = i === 0;
		const isExit = i === count - 1;
		const kind = isStart ? "start" : isExit ? "elite" : i % 2 === 1 ? "combat" : rng.pick([
			"rest",
			"treasure",
			"event"
		]);
		const size = isStart ? "small" : isExit ? "large" : "medium";
		const id = `expedition_${i}`;
		mainIds.push(id);
		nodes.push({
			id,
			kind,
			shape: pickShapeForKind(kind, size, rng, "long_expedition"),
			sizeCategory: size,
			gridX: i,
			gridY: 1,
			width: size === "small" ? 12 : size === "medium" ? 16 : 20,
			height: size === "small" ? 10 : size === "medium" ? 12 : 14,
			isMainPath: true,
			isOptional: false,
			depth: i
		});
		if (i > 0) edges.push({
			from: mainIds[i - 1],
			to: id,
			corridorType: rng.pick([
				"straight",
				"chokepoint",
				"pillared"
			]),
			width: rng.int(2, 3),
			isMainPath: true
		});
	}
	const alcoveId = "expedition_nook";
	nodes.push({
		id: alcoveId,
		kind: "treasure",
		shape: "vault",
		sizeCategory: "micro",
		gridX: 2,
		gridY: 0,
		width: 10,
		height: 8,
		isMainPath: false,
		isOptional: true,
		depth: 3
	});
	edges.push({
		from: mainIds[2],
		to: alcoveId,
		corridorType: "straight",
		width: 1,
		isMainPath: false
	});
	return {
		macroArchetype: "long_expedition",
		nodes,
		edges,
		startNodeId: mainIds[0],
		exitNodeId: mainIds[mainIds.length - 1],
		mainPathNodeIds: mainIds,
		optionalNodeIds: [alcoveId],
		hasLoops: false,
		hasDeadEnds: true,
		loopCount: 0,
		deadEndCount: 1
	};
}
function generateCavernTopology(floor, rng) {
	const start = {
		id: "cavern_start",
		kind: "start",
		shape: "cave_blob",
		sizeCategory: "small",
		gridX: 0,
		gridY: 1,
		width: 14,
		height: 12,
		isMainPath: true,
		isOptional: false,
		depth: 0
	};
	const cavernMain = {
		id: "cavern_chamber",
		kind: "combat",
		shape: "cave_blob",
		sizeCategory: "large",
		gridX: 1,
		gridY: 1,
		width: 22,
		height: 16,
		isMainPath: true,
		isOptional: false,
		depth: 1
	};
	const crystalCave = {
		id: "cavern_crystals",
		kind: "treasure",
		shape: "irregular",
		sizeCategory: "small",
		gridX: 1,
		gridY: 0,
		width: 12,
		height: 10,
		isMainPath: false,
		isOptional: true,
		depth: 2
	};
	const exitCave = {
		id: "cavern_exit",
		kind: "elite",
		shape: "cave_blob",
		sizeCategory: "medium",
		gridX: 2,
		gridY: 1,
		width: 16,
		height: 14,
		isMainPath: true,
		isOptional: false,
		depth: 2
	};
	const edges = [
		{
			from: start.id,
			to: cavernMain.id,
			corridorType: "broken",
			width: 2,
			isMainPath: true
		},
		{
			from: cavernMain.id,
			to: crystalCave.id,
			corridorType: "straight",
			width: 2,
			isMainPath: false
		},
		{
			from: cavernMain.id,
			to: exitCave.id,
			corridorType: "broken",
			width: 3,
			isMainPath: true
		}
	];
	return {
		macroArchetype: "cavern_network",
		nodes: [
			start,
			cavernMain,
			crystalCave,
			exitCave
		],
		edges,
		startNodeId: start.id,
		exitNodeId: exitCave.id,
		mainPathNodeIds: [
			start.id,
			cavernMain.id,
			exitCave.id
		],
		optionalNodeIds: [crystalCave.id],
		hasLoops: false,
		hasDeadEnds: true,
		loopCount: 0,
		deadEndCount: 1
	};
}
function generateRuinedComplexTopology(floor, rng) {
	const start = {
		id: "ruins_start",
		kind: "start",
		shape: "hall",
		sizeCategory: "small",
		gridX: 0,
		gridY: 1,
		width: 12,
		height: 10,
		isMainPath: true,
		isOptional: false,
		depth: 0
	};
	const ruinedHall = {
		id: "ruins_hall",
		kind: "combat",
		shape: "ruins",
		sizeCategory: "large",
		gridX: 1,
		gridY: 1,
		width: 22,
		height: 16,
		isMainPath: true,
		isOptional: false,
		depth: 1
	};
	const ruinedVault = {
		id: "ruins_vault",
		kind: "treasure",
		shape: "vault",
		sizeCategory: "small",
		gridX: 1,
		gridY: 2,
		width: 12,
		height: 10,
		isMainPath: false,
		isOptional: true,
		depth: 2
	};
	const exit = {
		id: "ruins_exit",
		kind: "elite",
		shape: "multi_chamber",
		sizeCategory: "medium",
		gridX: 2,
		gridY: 1,
		width: 18,
		height: 14,
		isMainPath: true,
		isOptional: false,
		depth: 2
	};
	const edges = [
		{
			from: start.id,
			to: ruinedHall.id,
			corridorType: "pillared",
			width: 2,
			isMainPath: true
		},
		{
			from: ruinedHall.id,
			to: ruinedVault.id,
			corridorType: "chokepoint",
			width: 2,
			isMainPath: false
		},
		{
			from: ruinedHall.id,
			to: exit.id,
			corridorType: "wide",
			width: 3,
			isMainPath: true
		}
	];
	return {
		macroArchetype: "ruined_complex",
		nodes: [
			start,
			ruinedHall,
			ruinedVault,
			exit
		],
		edges,
		startNodeId: start.id,
		exitNodeId: exit.id,
		mainPathNodeIds: [
			start.id,
			ruinedHall.id,
			exit.id
		],
		optionalNodeIds: [ruinedVault.id],
		hasLoops: false,
		hasDeadEnds: true,
		loopCount: 0,
		deadEndCount: 1
	};
}
function generateArenaClustersTopology(floor, rng) {
	const start = {
		id: "arena_start",
		kind: "start",
		shape: "compact",
		sizeCategory: "small",
		gridX: 0,
		gridY: 1,
		width: 12,
		height: 10,
		isMainPath: true,
		isOptional: false,
		depth: 0
	};
	const arena1 = {
		id: "arena_combat_1",
		kind: "combat",
		shape: "octagonal",
		sizeCategory: "medium",
		gridX: 1,
		gridY: 1,
		width: 16,
		height: 14,
		isMainPath: true,
		isOptional: false,
		depth: 1
	};
	const arena2 = {
		id: "arena_combat_2",
		kind: "elite",
		shape: "circular",
		sizeCategory: "large",
		gridX: 2,
		gridY: 1,
		width: 20,
		height: 16,
		isMainPath: true,
		isOptional: false,
		depth: 2
	};
	const bonusArena = {
		id: "arena_bonus",
		kind: "treasure",
		shape: "vault",
		sizeCategory: "small",
		gridX: 1,
		gridY: 0,
		width: 12,
		height: 10,
		isMainPath: false,
		isOptional: true,
		depth: 2
	};
	const edges = [
		{
			from: start.id,
			to: arena1.id,
			corridorType: "straight",
			width: 2,
			isMainPath: true
		},
		{
			from: arena1.id,
			to: bonusArena.id,
			corridorType: "straight",
			width: 2,
			isMainPath: false
		},
		{
			from: arena1.id,
			to: arena2.id,
			corridorType: "wide",
			width: 3,
			isMainPath: true
		}
	];
	return {
		macroArchetype: "arena_clusters",
		nodes: [
			start,
			arena1,
			arena2,
			bonusArena
		],
		edges,
		startNodeId: start.id,
		exitNodeId: arena2.id,
		mainPathNodeIds: [
			start.id,
			arena1.id,
			arena2.id
		],
		optionalNodeIds: [bonusArena.id],
		hasLoops: false,
		hasDeadEnds: true,
		loopCount: 0,
		deadEndCount: 1
	};
}
function carveRoomShape(tiles, options) {
	const { shape, x, y, width, height, rng, addSubstructures = true } = options;
	const gridW = tiles[0]?.length || 0;
	const gridH = tiles.length || 0;
	const setFloor = (gx, gy) => {
		if (gy > 0 && gy < gridH - 1 && gx > 0 && gx < gridW - 1) tiles[gy][gx] = "floor";
	};
	const setWall = (gx, gy) => {
		if (gy >= 0 && gy < gridH && gx >= 0 && gx < gridW) tiles[gy][gx] = "wall";
	};
	const fillFloorRect = (rx, ry, rw, rh) => {
		for (let r = ry; r < ry + rh; r++) for (let c = rx; c < rx + rw; c++) setFloor(c, r);
	};
	switch (shape) {
		case "arena":
		case "rectangle":
			fillFloorRect(x + 1, y + 1, width - 2, height - 2);
			break;
		case "compact": {
			const padX = Math.max(1, Math.floor(width * .1));
			const padY = Math.max(1, Math.floor(height * .15));
			fillFloorRect(x + padX, y + padY, width - padX * 2, height - padY * 2);
			break;
		}
		case "corridor":
		case "hall": {
			const cy = y + Math.floor(height / 2);
			fillFloorRect(x + 1, cy - 2, width - 2, 5);
			const alX1 = x + Math.floor(width * .3);
			const alX2 = x + Math.floor(width * .7);
			for (let r = y + 1; r < y + height - 1; r++) for (let dx = -1; dx <= 1; dx++) {
				setFloor(alX1 + dx, r);
				setFloor(alX2 + dx, r);
			}
			break;
		}
		case "cross": {
			const hStartY = y + Math.floor(height * .25);
			const hH = Math.max(4, Math.floor(height * .5));
			const vStartX = x + Math.floor(width * .25);
			const vW = Math.max(4, Math.floor(width * .5));
			fillFloorRect(x + 1, hStartY, width - 2, hH);
			fillFloorRect(vStartX, y + 1, vW, height - 2);
			break;
		}
		case "L_shape":
		case "L": {
			const splitY = y + Math.floor(height * .45);
			const splitX = x + Math.floor(width * .55);
			fillFloorRect(x + 1, splitY, width - 2, y + height - splitY - 1);
			fillFloorRect(x + 1, y + 1, splitX - x, height - 2);
			break;
		}
		case "T_shape":
		case "T": {
			const barH = Math.max(4, Math.floor(height * .5));
			const stemLeft = x + Math.floor(width * .28);
			const stemW = Math.max(4, Math.floor(width * .44));
			fillFloorRect(x + 1, y + 1, width - 2, barH);
			fillFloorRect(stemLeft, y + 1, stemW, height - 2);
			break;
		}
		case "octagonal":
		case "circular": {
			fillFloorRect(x + 1, y + 1, width - 2, height - 2);
			const chamferX = Math.max(2, Math.floor(width * .22));
			const chamferY = Math.max(2, Math.floor(height * .25));
			for (let dy = 0; dy < chamferY; dy++) for (let dx = 0; dx < chamferX - dy; dx++) {
				setWall(x + 1 + dx, y + 1 + dy);
				setWall(x + width - 2 - dx, y + 1 + dy);
				setWall(x + 1 + dx, y + height - 2 - dy);
				setWall(x + width - 2 - dx, y + height - 2 - dy);
			}
			break;
		}
		case "oval": {
			const cx = x + width / 2;
			const cy = y + height / 2;
			const rx = (width - 3) / 2;
			const ry = (height - 3) / 2;
			for (let r = y + 1; r < y + height - 1; r++) for (let c = x + 1; c < x + width - 1; c++) {
				const normX = (c - cx) / rx;
				const normY = (r - cy) / ry;
				if (normX * normX + normY * normY <= 1) setFloor(c, r);
			}
			break;
		}
		case "double_room":
		case "overlapping_rectangles": {
			const w1 = Math.floor(width * .65);
			const h1 = Math.floor(height * .75);
			fillFloorRect(x + 1, y + 1, w1, h1);
			const w2 = Math.floor(width * .65);
			const h2 = Math.floor(height * .75);
			fillFloorRect(x + width - 1 - w2, y + height - 1 - h2, w2, h2);
			break;
		}
		case "multi_chamber":
		case "divided_chambers": {
			fillFloorRect(x + 1, y + 1, width - 2, height - 2);
			const midX = x + Math.floor(width / 2);
			const midY = y + Math.floor(height / 2);
			for (let r = y + 1; r < y + height - 1; r++) if (Math.abs(r - midY) > 2) setWall(midX, r);
			break;
		}
		case "alcove_room": {
			fillFloorRect(x + 3, y + 2, width - 6, height - 4);
			const alcoveW = Math.max(4, Math.floor(width * .4));
			const alcoveLeft = x + Math.floor((width - alcoveW) / 2);
			fillFloorRect(alcoveLeft, y + 1, alcoveW, 2);
			fillFloorRect(alcoveLeft, y + height - 3, alcoveW, 2);
			break;
		}
		case "cave_blob": {
			const caveW = width - 2;
			const caveH = height - 2;
			const caveGrid = Array.from({ length: caveH }, () => Array.from({ length: caveW }, () => rng.chance(.58)));
			for (let iter = 0; iter < 3; iter++) {
				const nextGrid = Array.from({ length: caveH }, () => Array.from({ length: caveW }, () => false));
				for (let r = 0; r < caveH; r++) for (let c = 0; c < caveW; c++) {
					let neighborCount = 0;
					for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
						if (dr === 0 && dc === 0) continue;
						const nr = r + dr;
						const nc = c + dc;
						if (nr < 0 || nr >= caveH || nc < 0 || nc >= caveW) neighborCount++;
						else if (caveGrid[nr][nc]) neighborCount++;
					}
					nextGrid[r][c] = neighborCount >= 5;
				}
				for (let r = 0; r < caveH; r++) for (let c = 0; c < caveW; c++) caveGrid[r][c] = nextGrid[r][c];
			}
			for (let r = 0; r < caveH; r++) for (let c = 0; c < caveW; c++) if (!caveGrid[r][c]) setFloor(x + 1 + c, y + 1 + r);
			const cy = y + Math.floor(height / 2);
			for (let c = x + 1; c < x + width - 1; c++) {
				setFloor(c, cy);
				setFloor(c, cy + 1);
			}
			break;
		}
		case "ruins": {
			fillFloorRect(x + 1, y + 1, width - 2, height - 2);
			const stubX1 = x + Math.floor(width * .3);
			const stubX2 = x + Math.floor(width * .7);
			for (let dy = 0; dy < 3; dy++) {
				setWall(stubX1, y + 1 + dy);
				setWall(stubX2, y + height - 2 - dy);
			}
			break;
		}
		case "pillar_room":
		case "pillars_arena":
		case "open": {
			fillFloorRect(x + 1, y + 1, width - 2, height - 2);
			const px1 = x + Math.floor(width * .28);
			const px2 = x + Math.floor(width * .72) - 1;
			const py1 = y + Math.floor(height * .3);
			const py2 = y + Math.floor(height * .7) - 1;
			for (const py of [py1, py2]) for (const px of [px1, px2]) {
				setWall(px, py);
				setWall(px + 1, py);
				setWall(px, py + 1);
				setWall(px + 1, py + 1);
			}
			break;
		}
		case "vault": {
			fillFloorRect(x + 2, y + 2, width - 4, height - 4);
			const cx = x + Math.floor(width / 2);
			setWall(cx - 3, y + 3);
			setWall(cx + 3, y + 3);
			break;
		}
		case "bridge_room": {
			const bridgeH = Math.max(4, Math.floor(height * .45));
			const bridgeY = y + Math.floor((height - bridgeH) / 2);
			fillFloorRect(x + 1, bridgeY, width - 2, bridgeH);
			break;
		}
		case "hazard_room": {
			fillFloorRect(x + 1, y + 1, width - 2, height - 2);
			const cx = x + Math.floor(width / 2);
			const cy = y + Math.floor(height / 2);
			for (let dy = -1; dy <= 1; dy++) for (let dx = -2; dx <= 2; dx++) setFloor(cx + dx, cy + dy);
			break;
		}
		case "boss_arena": {
			fillFloorRect(x + 1, y + 1, width - 2, height - 2);
			const chamX = Math.max(3, Math.floor(width * .15));
			const chamY = Math.max(3, Math.floor(height * .15));
			for (let dy = 0; dy < chamY; dy++) for (let dx = 0; dx < chamX - dy; dx++) {
				setWall(x + 1 + dx, y + 1 + dy);
				setWall(x + width - 2 - dx, y + 1 + dy);
				setWall(x + 1 + dx, y + height - 2 - dy);
				setWall(x + width - 2 - dx, y + height - 2 - dy);
			}
			const colX1 = x + Math.floor(width * .2);
			const colX2 = x + Math.floor(width * .8);
			const colY1 = y + Math.floor(height * .3);
			const colY2 = y + Math.floor(height * .7);
			setWall(colX1, colY1);
			setWall(colX2, colY1);
			setWall(colX1, colY2);
			setWall(colX2, colY2);
			break;
		}
		case "chokepoint": {
			fillFloorRect(x + 1, y + 1, width - 2, height - 2);
			const midX = x + Math.floor(width / 2);
			const cy = y + Math.floor(height / 2);
			for (let r = y + 1; r < y + height - 1; r++) if (Math.abs(r - cy) > 2) {
				setWall(midX, r);
				setWall(midX - 1, r);
			}
			break;
		}
		case "central_arena":
		case "central_island": {
			fillFloorRect(x + 1, y + 1, width - 2, height - 2);
			const cx = x + Math.floor(width / 2);
			const cy = y + Math.floor(height / 2);
			for (let dy = -1; dy <= 1; dy++) for (let dx = -2; dx <= 1; dx++) setWall(cx + dx, cy + dy);
			break;
		}
		case "winding": {
			fillFloorRect(x + 1, y + 1, width - 2, height - 2);
			const midX = x + Math.floor(width / 2);
			const h3 = Math.floor(height / 3);
			for (let r = y + 1; r < y + h3 * 2; r++) setWall(Math.floor(midX * .85), r);
			for (let r = y + h3; r < y + height - 1; r++) setWall(Math.floor(midX * 1.15), r);
			break;
		}
		default:
			fillFloorRect(x + 1, y + 1, width - 2, height - 2);
			for (let r = y + 1; r < y + Math.floor(height * .35); r++) for (let c = x + 1; c < x + Math.floor(width * .25); c++) setWall(c, r);
			for (let r = y + Math.floor(height * .65); r < y + height - 1; r++) for (let c = x + Math.floor(width * .75); c < x + width - 1; c++) setWall(c, r);
	}
	if (addSubstructures && width >= 18 && height >= 14 && shape !== "boss_arena" && shape !== "pillar_room") {
		if (rng.chance(.4)) {
			const midX = x + Math.floor(width / 2);
			const midY = y + Math.floor(height / 2);
			const offset = Math.floor(width * .22);
			if (tiles[midY]?.[midX - offset] === "floor" && tiles[midY]?.[midX + offset] === "floor") {
				setWall(midX - offset, midY);
				setWall(midX + offset, midY);
			}
		}
	}
}
function carveCorridor(tiles, options) {
	const { x1, y1, x2, y2, rng } = options;
	const gridW = tiles[0]?.length || 0;
	const gridH = tiles.length || 0;
	const corridorWidth = Math.max(1, Math.min(4, options.width ?? 2));
	Math.floor(corridorWidth / 2);
	const type = options.type || "straight";
	const setFloor = (x, y) => {
		if (x > 0 && x < gridW - 1 && y > 0 && y < gridH - 1) tiles[y][x] = "floor";
	};
	const setWall = (x, y) => {
		if (x > 0 && x < gridW - 1 && y > 0 && y < gridH - 1) tiles[y][x] = "wall";
	};
	const carveSegmentH = (fromX, toX, atY, cWidth) => {
		const minX = Math.min(fromX, toX);
		const maxX = Math.max(fromX, toX);
		const hHalf = Math.floor(cWidth / 2);
		for (let cx = minX; cx <= maxX; cx++) for (let dy = -hHalf; dy <= hHalf; dy++) setFloor(cx, atY + dy);
	};
	const carveSegmentV = (fromY, toY, atX, cWidth) => {
		const minY = Math.min(fromY, toY);
		const maxY = Math.max(fromY, toY);
		const hHalf = Math.floor(cWidth / 2);
		for (let cy = minY; cy <= maxY; cy++) for (let dx = -hHalf; dx <= hHalf; dx++) setFloor(atX + dx, cy);
	};
	switch (type) {
		case "straight":
		case "wide":
			if (rng.chance(.5)) {
				carveSegmentH(x1, x2, y1, corridorWidth);
				carveSegmentV(y1, y2, x2, corridorWidth);
			} else {
				carveSegmentV(y1, y2, x1, corridorWidth);
				carveSegmentH(x1, x2, y2, corridorWidth);
			}
			break;
		case "L_turn": {
			const cornerX = x2;
			const cornerY = y1;
			carveSegmentH(x1, cornerX, cornerY, corridorWidth);
			carveSegmentV(cornerY, y2, cornerX, corridorWidth);
			break;
		}
		case "Z_turn": {
			const midX = Math.floor((x1 + x2) / 2);
			carveSegmentH(x1, midX, y1, corridorWidth);
			carveSegmentV(y1, y2, midX, corridorWidth);
			carveSegmentH(midX, x2, y2, corridorWidth);
			break;
		}
		case "pillared": {
			const minX = Math.min(x1, x2);
			const maxX = Math.max(x1, x2);
			carveSegmentH(x1, x2, y1, Math.max(3, corridorWidth));
			carveSegmentV(y1, y2, x2, Math.max(3, corridorWidth));
			if (Math.abs(maxX - minX) > 8) {
				for (let px = minX + 3; px < maxX - 3; px += 4) if (tiles[y1 - 1]?.[px] === "floor" && tiles[y1 + 1]?.[px] === "floor") {
					setWall(px, y1 - 1);
					setWall(px, y1 + 1);
				}
			}
			break;
		}
		case "chokepoint": {
			const midX = Math.floor((x1 + x2) / 2);
			carveSegmentH(x1, midX - 1, y1, 2);
			carveSegmentH(midX - 1, midX + 1, y1, 1);
			carveSegmentH(midX + 1, x2, y1, 2);
			carveSegmentV(y1, y2, x2, 2);
			break;
		}
		case "broken": {
			const minX = Math.min(x1, x2);
			const maxX = Math.max(x1, x2);
			for (let cx = minX; cx <= maxX; cx++) {
				setFloor(cx, y1);
				if (rng.chance(.7)) setFloor(cx, y1 - 1);
				if (rng.chance(.7)) setFloor(cx, y1 + 1);
			}
			const minY = Math.min(y1, y2);
			const maxY = Math.max(y1, y2);
			for (let cy = minY; cy <= maxY; cy++) {
				setFloor(x2, cy);
				if (rng.chance(.7)) setFloor(x2 - 1, cy);
				if (rng.chance(.7)) setFloor(x2 + 1, cy);
			}
			break;
		}
	}
}
function layoutDungeonGraph(graph, rng, targetWidth, targetHeight) {
	const nodes = graph.nodes;
	const edges = graph.edges;
	const minGridX = Math.min(...nodes.map((n) => n.gridX));
	const maxGridX = Math.max(...nodes.map((n) => n.gridX));
	const minGridY = Math.min(...nodes.map((n) => n.gridY));
	const maxGridY = Math.max(...nodes.map((n) => n.gridY));
	const totalCols = Math.max(1, maxGridX - minGridX + 1);
	const totalRows = Math.max(1, maxGridY - minGridY + 1);
	const padding = 1;
	const mapW = targetWidth ?? Math.max(28, totalCols * 14 + 2);
	const mapH = targetHeight ?? Math.max(18, totalRows * 12 + 2);
	const tiles = Array.from({ length: mapH }, () => Array.from({ length: mapW }, () => "wall"));
	const roomBounds = /* @__PURE__ */ new Map();
	const roomCenters = /* @__PURE__ */ new Map();
	const availableW = mapW - 2;
	const availableH = mapH - 2;
	const cellW = Math.max(7, Math.floor(availableW / totalCols));
	const cellH = Math.max(6, Math.floor(availableH / totalRows));
	for (const node of nodes) {
		const col = node.gridX - minGridX;
		const row = node.gridY - minGridY;
		let rW;
		let rH;
		if (nodes.length === 1 || node.kind === "boss") {
			rW = Math.max(8, mapW - 2);
			rH = Math.max(6, mapH - 2);
		} else {
			rW = Math.max(7, Math.min(cellW, Math.floor(availableW * .5)));
			rH = Math.max(6, Math.min(cellH, Math.floor(availableH * .5)));
		}
		const originX = padding + col * cellW + Math.floor((cellW - rW) / 2);
		const originY = padding + row * cellH + Math.floor((cellH - rH) / 2);
		const boundedX = Math.max(1, Math.min(mapW - rW - 1, originX));
		const boundedY = Math.max(1, Math.min(mapH - rH - 1, originY));
		roomBounds.set(node.id, {
			x: boundedX,
			y: boundedY,
			width: rW,
			height: rH
		});
		roomCenters.set(node.id, {
			x: boundedX + Math.floor(rW / 2),
			y: boundedY + Math.floor(rH / 2)
		});
		carveRoomShape(tiles, {
			shape: node.shape,
			x: boundedX,
			y: boundedY,
			width: rW,
			height: rH,
			rng,
			addSubstructures: node.isMainPath && rW >= 12 && rH >= 10
		});
	}
	for (const edge of edges) {
		const fromCenter = roomCenters.get(edge.from);
		const toCenter = roomCenters.get(edge.to);
		if (!fromCenter || !toCenter) continue;
		carveCorridor(tiles, {
			type: edge.corridorType,
			x1: fromCenter.x,
			y1: fromCenter.y,
			x2: toCenter.x,
			y2: toCenter.y,
			width: Math.min(2, edge.width),
			rng
		});
	}
	const startCenter = roomCenters.get(graph.startNodeId) || {
		x: 3,
		y: Math.floor(mapH / 2)
	};
	const exitCenter = roomCenters.get(graph.exitNodeId) || {
		x: mapW - 4,
		y: Math.floor(mapH / 2)
	};
	const startBounds = roomBounds.get(graph.startNodeId);
	const exitBounds = roomBounds.get(graph.exitNodeId);
	const spawn = {
		x: startBounds ? startBounds.x + 2 : startCenter.x,
		y: startBounds ? startBounds.y + Math.floor(startBounds.height / 2) : startCenter.y
	};
	const exit = {
		x: exitBounds ? exitBounds.x + exitBounds.width - 3 : exitCenter.x,
		y: exitBounds ? exitBounds.y + Math.floor(exitBounds.height / 2) : exitCenter.y
	};
	for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
		const sx = spawn.x + dx;
		const sy = spawn.y + dy;
		if (sx > 0 && sx < mapW - 1 && sy > 0 && sy < mapH - 1) tiles[sy][sx] = "floor";
		const ex = exit.x + dx;
		const ey = exit.y + dy;
		if (ex > 0 && ex < mapW - 1 && ey > 0 && ey < mapH - 1) tiles[ey][ex] = "floor";
	}
	let deadEndTile = void 0;
	if (graph.optionalNodeIds.length > 0) {
		const optId = graph.optionalNodeIds[0];
		const optCenter = roomCenters.get(optId);
		if (optCenter) deadEndTile = optCenter;
	}
	return {
		width: mapW,
		height: mapH,
		tiles,
		spawn,
		exit,
		roomBounds,
		deadEndTile
	};
}
function generateTerrainPatches(tiles, width, height, theme, rng, biomeVariantBias = .12) {
	const totalCells = width * height;
	const floorVariationIndices = new Uint8Array(totalCells);
	const floorDecorIndices = new Uint8Array(totalCells);
	const tileSpriteKeys = Array.from({ length: height }, () => Array.from({ length: width }, () => ""));
	const floorCells = [];
	const dirs = [
		[-1, 0],
		[1, 0],
		[0, -1],
		[0, 1]
	];
	for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) if (tiles[y][x] === "floor") {
		const idx = y * width + x;
		const isNearWall = dirs.some(([dx, dy]) => {
			const nx = x + dx;
			const ny = y + dy;
			return nx < 0 || nx >= width || ny < 0 || ny >= height || tiles[ny][nx] === "wall";
		});
		floorCells.push({
			x,
			y,
			idx,
			isNearWall
		});
	}
	if (floorCells.length === 0) return {
		floorNormalKeys: theme.tiles.floorNormal.map((_, i) => `theme_${theme.id}_floor_${i}`),
		floorVariationIndices,
		floorDecorIndices,
		tileSpriteKeys
	};
	const nearWallCells = floorCells.filter((c) => c.isNearWall);
	const decorTargetCount = Math.min(4, Math.max(1, Math.floor(floorCells.length * .025)));
	const shuffledNearWall = [...nearWallCells].sort(() => rng.next() - .5);
	for (let i = 0; i < Math.min(decorTargetCount, shuffledNearWall.length); i++) floorDecorIndices[shuffledNearWall[i].idx] = 1;
	const availableForVariation = floorCells.filter((c) => !floorDecorIndices[c.idx]);
	const numClusters = Math.max(1, Math.floor(availableForVariation.length / 35));
	const clusterSeeds = [...availableForVariation].sort(() => rng.next() - .5).slice(0, numClusters);
	for (const seed of clusterSeeds) {
		floorVariationIndices[seed.idx] = 1;
		let grown = 0;
		for (const [dx, dy] of dirs) {
			if (grown >= 3) break;
			const nx = seed.x + dx;
			const ny = seed.y + dy;
			if (nx > 0 && nx < width - 1 && ny > 0 && ny < height - 1 && tiles[ny][nx] === "floor") {
				const nIdx = ny * width + nx;
				if (!floorDecorIndices[nIdx] && rng.chance(.7)) {
					floorVariationIndices[nIdx] = 1;
					grown++;
				}
			}
		}
	}
	const normalCount = Math.max(1, theme.tiles.floorNormal.length);
	const varCount = Math.max(1, theme.tiles.floorVariation.length);
	const decorCount = Math.max(1, theme.tiles.floorDecor.length);
	for (const cell of floorCells) {
		const { x, y, idx } = cell;
		if (floorDecorIndices[idx]) {
			const dIdx = Math.floor(rng.next() * decorCount) % decorCount;
			tileSpriteKeys[y][x] = `theme_${theme.id}_floor_decor_${dIdx}`;
		} else if (floorVariationIndices[idx]) {
			const vIdx = Math.floor(rng.next() * varCount) % varCount;
			tileSpriteKeys[y][x] = `theme_${theme.id}_floor_var_${vIdx}`;
		} else {
			const nIdx = Math.floor(rng.next() * normalCount) % normalCount;
			tileSpriteKeys[y][x] = `theme_${theme.id}_floor_${nIdx}`;
		}
	}
	return {
		floorNormalKeys: theme.tiles.floorNormal.map((_, i) => `theme_${theme.id}_floor_${i}`),
		floorVariationIndices,
		floorDecorIndices,
		tileSpriteKeys
	};
}
var THEME_LANDMARKS = {
	lighting: [
		{
			name: "Bobina de Alta Tensão",
			category: "energy",
			width: 2,
			height: 2
		},
		{
			name: "Reator de Tempestade",
			category: "structure",
			width: 2,
			height: 2
		},
		{
			name: "Terminal de Descarga",
			category: "tech",
			width: 2,
			height: 2
		}
	],
	fire: [
		{
			name: "Altar do Fogo Primordial",
			category: "structure",
			width: 2,
			height: 2
		},
		{
			name: "Monólito de Obsidiana",
			category: "crystal",
			width: 2,
			height: 2
		},
		{
			name: "Fornalha de Dados Incandescente",
			category: "hazard",
			width: 2,
			height: 2
		}
	],
	ice: [
		{
			name: "Monólito Glacial",
			category: "crystal",
			width: 2,
			height: 2
		},
		{
			name: "Pilar de Gelo Prismático",
			category: "structure",
			width: 2,
			height: 2
		},
		{
			name: "Vórtice Congelado",
			category: "hazard",
			width: 2,
			height: 2
		}
	],
	tech: [
		{
			name: "Núcleo Central de Dados",
			category: "tech",
			width: 2,
			height: 2
		},
		{
			name: "Monólito Holográfico",
			category: "energy",
			width: 2,
			height: 2
		},
		{
			name: "Reator Quântico",
			category: "structure",
			width: 2,
			height: 2
		}
	]
};
function generateLandmark(options) {
	const { roomKind, themeId, width, height, tiles, rng } = options;
	if (!(roomKind === "boss" || roomKind === "miniboss" || roomKind === "event" || width >= 20 && height >= 14 && rng.chance(.65))) return void 0;
	const pool = THEME_LANDMARKS[themeId] || THEME_LANDMARKS.lighting;
	const chosen = rng.pick(pool);
	const focalX = Math.floor(width / 2) - Math.floor(chosen.width / 2);
	const focalY = roomKind === "boss" ? Math.max(3, Math.floor(height * .22)) : Math.floor(height / 2) - 1;
	let hasValidFloor = true;
	for (let dy = 0; dy < chosen.height; dy++) {
		for (let dx = 0; dx < chosen.width; dx++) if (tiles[focalY + dy]?.[focalX + dx] !== "floor") {
			hasValidFloor = false;
			break;
		}
		if (!hasValidFloor) break;
	}
	if (!hasValidFloor) return;
	const satellites = [];
	const flankLeft = focalX - 3;
	const flankRight = focalX + chosen.width + 2;
	const flankY = focalY + 1;
	if (flankLeft > 1 && tiles[flankY]?.[flankLeft] === "floor") satellites.push({
		x: flankLeft,
		y: flankY,
		type: "flank_left"
	});
	if (flankRight < width - 2 && tiles[flankY]?.[flankRight] === "floor") satellites.push({
		x: flankRight,
		y: flankY,
		type: "flank_right"
	});
	return {
		id: `landmark_${themeId}_${Date.now()}_${rng.int(100, 999)}`,
		name: chosen.name,
		tileX: focalX,
		tileY: focalY,
		size: {
			width: chosen.width,
			height: chosen.height
		},
		category: chosen.category,
		satelliteTiles: satellites
	};
}
var ENVIRONMENT_BUDGET = {
	micro: 4,
	small: 8,
	medium: 15,
	large: 25,
	arena: 35,
	huge: 35
};
function generateEnvironmentClusters(options) {
	const { id, width, height, tiles, spawn, exit, sizeCategory, themeId, rng, hasLandmark } = options;
	const budgetMax = ENVIRONMENT_BUDGET[sizeCategory] || 15;
	let budgetUsed = hasLandmark ? 7 : 0;
	const clusters = [];
	const navMask = /* @__PURE__ */ new Set();
	const addMaskZone = (cx, cy, radius) => {
		for (let dy = -radius; dy <= radius; dy++) for (let dx = -radius; dx <= radius; dx++) navMask.add(`${cx + dx},${cy + dy}`);
	};
	addMaskZone(spawn.x, spawn.y, 3);
	addMaskZone(exit.x, exit.y, 3);
	const minX = Math.min(spawn.x, exit.x);
	const maxX = Math.max(spawn.x, exit.x);
	const midY = Math.floor((spawn.y + exit.y) / 2);
	for (let cx = minX; cx <= maxX; cx++) {
		navMask.add(`${cx},${midY}`);
		navMask.add(`${cx},${midY - 1}`);
		navMask.add(`${cx},${midY + 1}`);
	}
	const eligibleTiles = [];
	const dirs = [
		[-1, 0],
		[1, 0],
		[0, -1],
		[0, 1]
	];
	for (let y = 1; y < height - 1; y++) for (let x = 1; x < width - 1; x++) if (tiles[y][x] === "floor" && !navMask.has(`${x},${y}`)) {
		const isNearWall = dirs.some(([dx, dy]) => tiles[y + dy]?.[x + dx] === "wall");
		eligibleTiles.push({
			x,
			y,
			isNearWall
		});
	}
	if (eligibleTiles.length === 0) return {
		clusters,
		budgetUsed
	};
	const allowedTypes = {
		fire: [
			"rubble",
			"hazard",
			"structure"
		],
		ice: [
			"crystal",
			"hazard",
			"structure"
		],
		lighting: [
			"energy",
			"hazard",
			"structure",
			"rubble"
		],
		tech: [
			"tech",
			"energy",
			"structure"
		]
	}[themeId] || ["rubble", "structure"];
	const maxClusters = Math.min(4, Math.max(1, Math.floor((budgetMax - budgetUsed) / 3)));
	const shuffledEligible = [...eligibleTiles].sort(() => rng.next() - .5);
	const usedClusterCenters = /* @__PURE__ */ new Set();
	for (let i = 0; i < maxClusters && shuffledEligible.length > 0; i++) {
		if (budgetUsed + 3 > budgetMax) break;
		const anchor = shuffledEligible.find((cand) => !Array.from(usedClusterCenters).some((usedKey) => {
			const [ux, uy] = usedKey.split(",").map(Number);
			return Math.hypot(cand.x - ux, cand.y - uy) < 3.5;
		}));
		if (!anchor) break;
		usedClusterCenters.add(`${anchor.x},${anchor.y}`);
		const cType = rng.pick(allowedTypes);
		const clusterTiles = [{
			x: anchor.x,
			y: anchor.y,
			role: "anchor"
		}];
		for (const [dx, dy] of dirs) {
			if (clusterTiles.length >= 3) break;
			const nx = anchor.x + dx;
			const ny = anchor.y + dy;
			if (nx > 0 && nx < width - 1 && ny > 0 && ny < height - 1 && tiles[ny][nx] === "floor" && !navMask.has(`${nx},${ny}`) && rng.chance(.65)) clusterTiles.push({
				x: nx,
				y: ny,
				role: "satellite"
			});
		}
		clusters.push({
			id: `${id}_cluster_${i + 1}`,
			type: cType,
			zone: cType === "hazard" ? "hazard_zone" : anchor.isNearWall ? "landmark_zone" : "combat_zone",
			centerX: anchor.x,
			centerY: anchor.y,
			tiles: clusterTiles
		});
		budgetUsed += 3;
	}
	return {
		clusters,
		budgetUsed
	};
}
Array.from({ length: 30 }, (_, i) => (i + 1) * 10), Array.from({ length: 30 }, (_, i) => i * 10 + 5), Array.from({ length: 30 }, (_, i) => i * 10 + 1);
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
	const cycleIndex = Math.floor((floor - 1) / 10) % 5;
	const cycleTier = Math.min(6, Math.floor((floor - 1) / 50) + 1);
	const tierMultiplier = 1 + (cycleTier - 1) * .25;
	let baseBoss;
	switch (cycleIndex) {
		case 0:
			baseBoss = BOSS_DEFINITIONS.kuwagamon;
			break;
		case 1:
			baseBoss = BOSS_DEFINITIONS.meramon;
			break;
		case 2:
			baseBoss = BOSS_DEFINITIONS.seadramon;
			break;
		case 3:
			baseBoss = BOSS_DEFINITIONS.metaletemon;
			break;
		default: baseBoss = BOSS_DEFINITIONS.wargeymon;
	}
	if (cycleTier > 1) return {
		...baseBoss,
		name: `${baseBoss.name} (Ciclo ${cycleTier})`,
		baseHp: Math.round(baseBoss.baseHp * tierMultiplier),
		attackDamage: Math.round(baseBoss.attackDamage * (1 + (cycleTier - 1) * .15)),
		defense: baseBoss.defense + (cycleTier - 1) * 2,
		xpReward: Math.round(baseBoss.xpReward * tierMultiplier),
		coinReward: Math.round(baseBoss.coinReward * tierMultiplier)
	};
	return baseBoss;
}
function getMiniBossForFloor(floor) {
	const cycleIndex = Math.floor((floor - 5) / 10) % 5;
	const cycleTier = Math.min(6, Math.floor((floor - 1) / 50) + 1);
	const tierMultiplier = 1 + (cycleTier - 1) * .25;
	const miniBosses = [
		{
			id: "miniboss_garurumon",
			name: "Garurumon Alfa",
			digimon: "garurumon",
			baseHp: 180,
			attackDamage: 14,
			defense: 4,
			speed: 68,
			xpReward: 120,
			coinReward: 75,
			guaranteedItemDrop: "carne_digital"
		},
		{
			id: "miniboss_etemon",
			name: "Etemon Sentinela",
			digimon: "etemon",
			baseHp: 240,
			attackDamage: 16,
			defense: 6,
			speed: 58,
			xpReward: 160,
			coinReward: 90,
			guaranteedItemDrop: "fruta_digital"
		},
		{
			id: "miniboss_veemon",
			name: "V-mon Campeão Renegado",
			digimon: "veemon",
			baseHp: 210,
			attackDamage: 18,
			defense: 5,
			speed: 72,
			xpReward: 190,
			coinReward: 100,
			guaranteedItemDrop: "carne_digital"
		},
		{
			id: "miniboss_agumon",
			name: "GeoGreymon Guardião Intermediário",
			digimon: "agumon",
			baseHp: 260,
			attackDamage: 20,
			defense: 7,
			speed: 62,
			xpReward: 220,
			coinReward: 110,
			guaranteedItemDrop: "fruta_digital"
		},
		{
			id: "miniboss_weregarurumon",
			name: "WereGarurumon das Sombras",
			digimon: "weregarurumon",
			baseHp: 300,
			attackDamage: 22,
			defense: 8,
			speed: 75,
			xpReward: 260,
			coinReward: 130,
			guaranteedItemDrop: "carne_digital"
		}
	];
	const mb = miniBosses[cycleIndex] || miniBosses[0];
	return {
		...mb,
		name: cycleTier > 1 ? `${mb.name} (Ciclo ${cycleTier})` : mb.name,
		baseHp: Math.round(mb.baseHp * tierMultiplier),
		attackDamage: Math.round(mb.attackDamage * (1 + (cycleTier - 1) * .15)),
		defense: mb.defense + (cycleTier - 1) * 2,
		xpReward: Math.round(mb.xpReward * tierMultiplier),
		coinReward: Math.round(mb.coinReward * tierMultiplier)
	};
}
function calculateEnemyStats(baseHp, baseAtk, baseDef, baseSpeed, baseCooldown, baseXp, baseCoins, roomNumber, isBoss = false, isMiniBoss = false) {
	const level = Math.max(1, Math.min(300, roomNumber));
	const hpMultiplier = isBoss ? 3.5 : isMiniBoss ? 2.2 : 1;
	const statScale = 1 + (level - 1) * .055;
	const hp = Math.round(baseHp * statScale * hpMultiplier);
	return {
		level,
		hp,
		maxHp: hp,
		attack: Math.round(baseAtk * (1 + (level - 1) * .04)),
		defense: Math.round(baseDef * (1 + (level - 1) * .035)),
		speed: Math.min(180, Math.round(baseSpeed * (1 + (level - 1) * .01))),
		attackCooldown: Math.max(700, Math.round(baseCooldown * (1 - (level - 1) * .002))),
		xpReward: Math.round(baseXp * (1 + (level - 1) * .08)),
		coinReward: Math.round(baseCoins * (1 + (level - 1) * .05))
	};
}
function calculateEnemyCount(roomNumber, sizeCategory, rng) {
	if (roomNumber % 10 === 0) return 1;
	if (roomNumber % 10 === 5) return 1;
	let minCount = 3;
	let maxCount = 5;
	if (roomNumber >= 150) {
		minCount = 5;
		maxCount = 9;
	} else if (roomNumber >= 50) {
		minCount = 4;
		maxCount = 7;
	} else {
		minCount = 3;
		maxCount = 5;
	}
	if (sizeCategory === "micro" || sizeCategory === "small") {
		minCount = Math.max(2, minCount - 1);
		maxCount = Math.max(3, maxCount - 1);
	} else if (sizeCategory === "large" || sizeCategory === "arena" || sizeCategory === "huge") {
		minCount += 1;
		maxCount += 1;
	}
	return rng.int(minCount, maxCount);
}
function generateEncounters(options) {
	const { id, floor, kind, biome, sizeCategory, width, height, spawn, exit, reachableTiles, deadEndTile, rng } = options;
	const props = [];
	const enemies = [];
	const safeMask = /* @__PURE__ */ new Set();
	const addSafeRadius = (cx, cy, rad) => {
		for (let dy = -rad; dy <= rad; dy++) for (let dx = -rad; dx <= rad; dx++) safeMask.add(`${cx + dx},${cy + dy}`);
	};
	addSafeRadius(spawn.x, spawn.y, 4);
	addSafeRadius(exit.x, exit.y, 2);
	const idealCenterX = Math.floor(width / 2);
	const idealCenterY = Math.floor(height / 2);
	const eligiblePropTiles = reachableTiles.filter((t) => !safeMask.has(`${t.x},${t.y}`)).sort((a, b) => Math.hypot(a.x - idealCenterX, a.y - idealCenterY) - Math.hypot(b.x - idealCenterX, b.y - idealCenterY));
	const primaryPropTile = eligiblePropTiles[0] || {
		x: idealCenterX,
		y: idealCenterY
	};
	if (kind === "treasure" || floor % 10 === 3 && floor % 20 === 3) props.push({
		id: `${id}_chest_1`,
		type: "chest",
		tileX: primaryPropTile.x,
		tileY: primaryPropTile.y
	});
	else if (kind === "event") props.push({
		id: `${id}_event_terminal`,
		type: "event_terminal",
		tileX: primaryPropTile.x,
		tileY: primaryPropTile.y
	});
	else if (kind === "rest") props.push({
		id: `${id}_rest_site`,
		type: "rest_site",
		tileX: primaryPropTile.x,
		tileY: primaryPropTile.y
	});
	else if (kind === "shop") props.push({
		id: `${id}_shop_terminal`,
		type: "shop_terminal",
		tileX: primaryPropTile.x,
		tileY: primaryPropTile.y
	});
	if (kind === "miniboss") {
		const mbChestTile = eligiblePropTiles[eligiblePropTiles.length - 1] || {
			x: exit.x - 2,
			y: exit.y
		};
		props.push({
			id: `${id}_miniboss_chest`,
			type: "chest",
			tileX: mbChestTile.x,
			tileY: mbChestTile.y
		});
	}
	if (deadEndTile && props.length === 0 && kind !== "boss" && kind !== "miniboss") {
		if (reachableTiles.some((t) => t.x === deadEndTile.x && t.y === deadEndTile.y)) props.push({
			id: `${id}_deadend_chest`,
			type: "chest",
			tileX: deadEndTile.x,
			tileY: deadEndTile.y
		});
	}
	if (kind === "boss") {
		const bossDef = getBossForFloor(floor, biome);
		const stats = calculateEnemyStats(bossDef.baseHp, bossDef.attackDamage, bossDef.defense, bossDef.speed, 1600, bossDef.xpReward, bossDef.coinReward, floor, true, false);
		enemies.push({
			id: `${id}_boss_1`,
			name: `${bossDef.name} Lv.${stats.level}`,
			kind: "boss",
			level: stats.level,
			tileX: Math.floor(width / 2) + 2,
			tileY: Math.floor(height / 2),
			hp: stats.hp,
			maxHp: stats.maxHp,
			attack: stats.attack,
			defense: stats.defense,
			speed: stats.speed,
			xpReward: stats.xpReward,
			coinReward: stats.coinReward
		});
	} else if (kind === "miniboss") {
		const mbDef = getMiniBossForFloor(floor);
		const stats = calculateEnemyStats(mbDef.baseHp, mbDef.attackDamage, mbDef.defense, mbDef.speed, 1500, mbDef.xpReward, mbDef.coinReward, floor, false, true);
		enemies.push({
			id: `${id}_miniboss_1`,
			name: `${mbDef.name} Lv.${stats.level}`,
			digimon: mbDef.digimon,
			kind: "miniboss",
			level: stats.level,
			tileX: primaryPropTile.x,
			tileY: primaryPropTile.y,
			hp: stats.hp,
			maxHp: stats.maxHp,
			attack: stats.attack,
			defense: stats.defense,
			speed: stats.speed,
			xpReward: stats.xpReward,
			coinReward: stats.coinReward
		});
	} else if (kind === "combat" || kind === "elite") {
		const enemyCount = calculateEnemyCount(floor, sizeCategory, rng);
		const shuffled = [...reachableTiles.filter((t) => !safeMask.has(`${t.x},${t.y}`) && !props.some((p) => p.tileX === t.x && p.tileY === t.y))].sort(() => rng.next() - .5);
		for (let e = 0; e < enemyCount && e < shuffled.length; e++) {
			const et = shuffled[e];
			const enemyLevel = Math.max(1, Math.min(300, floor + rng.int(-1, 1)));
			const isElite = kind === "elite" && e === 0;
			const isRanged = !isElite && e % 2 === 1;
			const enemyDigimon = isElite ? "etemon" : isRanged ? "veemon" : e % 4 === 0 ? "agumon" : "gabumon";
			const enemyTitle = isElite ? "Sentinela Blindada de Elite" : enemyDigimon === "agumon" ? "Agumon Selvagem" : enemyDigimon === "veemon" ? "Veemon Rebelde" : "Gabumon Selvagem";
			const stats = calculateEnemyStats(isElite ? 110 : isRanged ? 36 : 46, isElite ? 15 : isRanged ? 10 : 8, isElite ? 6 : isRanged ? 1 : 3, isElite ? 65 : isRanged ? 52 : 62, isElite ? 1800 : isRanged ? 1900 : 1300, isElite ? 90 : isRanged ? 28 : 24, isElite ? 50 : 12, enemyLevel, false, false);
			enemies.push({
				id: `${id}_enemy_${e + 1}`,
				name: `${enemyTitle} Lv.${stats.level}`,
				digimon: enemyDigimon,
				kind: isElite ? "elite" : isRanged ? "ranged" : "melee",
				level: stats.level,
				tileX: et.x,
				tileY: et.y,
				hp: stats.hp,
				maxHp: stats.maxHp,
				attack: stats.attack,
				defense: stats.defense,
				speed: stats.speed,
				xpReward: stats.xpReward,
				coinReward: stats.coinReward
			});
		}
	}
	return {
		enemies,
		props
	};
}
var MACROBIOMES_REGISTRY = {
	fire_volcanic_ruins: {
		id: "fire_volcanic_ruins",
		name: "Ruínas Vulcânicas de Magma",
		themeId: "fire",
		biome: "fire",
		description: "Antigos templos de dados engolidos por correntes de lava",
		microbiomes: [
			{
				id: "lava_chamber",
				name: "Câmara de Fusão",
				description: "Região incandescente com fendas de lava ativas",
				floorVariantBias: .15,
				hazardChance: .7,
				accentColors: [16729088, 16746496],
				allowedClusterTypes: [
					"hazard",
					"rubble",
					"structure"
				],
				titleModifier: "da Caldeira"
			},
			{
				id: "ash_field",
				name: "Campo de Cinzas Digitais",
				description: "Solo calcinado coberto por fragmentos queimados",
				floorVariantBias: .12,
				hazardChance: .2,
				accentColors: [5583650, 8930338],
				allowedClusterTypes: ["rubble", "structure"],
				titleModifier: "das Cinzas"
			},
			{
				id: "obsidian_chasm",
				name: "Fissura de Obsidiana",
				description: "Rochas vitrificadas e formações escuras cortantes",
				floorVariantBias: .1,
				hazardChance: .4,
				accentColors: [3346688, 11154176],
				allowedClusterTypes: ["crystal", "rubble"],
				titleModifier: "do Abismo de Obsidiana"
			},
			{
				id: "molten_forge",
				name: "Forja Ancestral",
				description: "Instalação industrial desativada de forjamento de dados",
				floorVariantBias: .08,
				hazardChance: .3,
				accentColors: [16755200, 13391104],
				allowedClusterTypes: [
					"structure",
					"rubble",
					"hazard"
				],
				titleModifier: "da Forja"
			}
		]
	},
	fire_burned_fortress: {
		id: "fire_burned_fortress",
		name: "Fortaleza Calcinada",
		themeId: "fire",
		biome: "fire",
		description: "Bastião militar de segurança destruído por sobrecarga térmica",
		microbiomes: [
			{
				id: "collapsed_hall",
				name: "Salão Colapsado",
				description: "Grandes vigas e blocos caídos bloqueando passagens",
				floorVariantBias: .14,
				hazardChance: .25,
				accentColors: [11158562, 16733440],
				allowedClusterTypes: ["rubble", "structure"],
				titleModifier: "dos Escombros"
			},
			{
				id: "scorch_barracks",
				name: "Alojamento Queimado",
				description: "Salas fortificadas tomadas por cinzas",
				floorVariantBias: .1,
				hazardChance: .15,
				accentColors: [7811857, 13386752],
				allowedClusterTypes: ["structure", "rubble"],
				titleModifier: "da Guarda Queimada"
			},
			{
				id: "magma_reservoir",
				name: "Reservatório de Magma",
				description: "Tanques rompidos inundando o solo com rocha líquida",
				floorVariantBias: .18,
				hazardChance: .8,
				accentColors: [16724736, 16755200],
				allowedClusterTypes: ["hazard", "structure"],
				titleModifier: "do Reservatório"
			},
			{
				id: "armory_ruins",
				name: "Armaria em Chamas",
				description: "Depósitos e contêineres de suprimentos protegidos",
				floorVariantBias: .08,
				hazardChance: .2,
				accentColors: [13395456, 16742144],
				allowedClusterTypes: ["structure", "rubble"],
				titleModifier: "do Arsenal"
			}
		]
	},
	ice_glacial_caverns: {
		id: "ice_glacial_caverns",
		name: "Cavernas do Glaciar de Dados",
		themeId: "ice",
		biome: "ice",
		description: "Câmaras subterrâneas congeladas contendo cristais de código puro",
		microbiomes: [
			{
				id: "crystal_grotto",
				name: "Gruta de Cristais Azuis",
				description: "Formações cristalinas densas que refratam a luz",
				floorVariantBias: .16,
				hazardChance: .2,
				accentColors: [52479, 8974079],
				allowedClusterTypes: ["crystal", "structure"],
				titleModifier: "dos Cristais"
			},
			{
				id: "frost_abyss",
				name: "Abismo Gélido",
				description: "Fissuras profundas com ar congelante e visibilidade reduzida",
				floorVariantBias: .12,
				hazardChance: .5,
				accentColors: [35020, 65535],
				allowedClusterTypes: ["hazard", "crystal"],
				titleModifier: "do Vórtice Polar"
			},
			{
				id: "frozen_archives",
				name: "Arquivos Subzero",
				description: "Monólitos de dados petrificados em gelo eterno",
				floorVariantBias: .08,
				hazardChance: .1,
				accentColors: [5618687, 11197951],
				allowedClusterTypes: ["structure", "crystal"],
				titleModifier: "do Arquivo Congelado"
			},
			{
				id: "permafrost_halls",
				name: "Salões de Permafrost",
				description: "Solo compacto e escorregadio com alta mobilidade",
				floorVariantBias: .1,
				hazardChance: .3,
				accentColors: [7855615, 3381725],
				allowedClusterTypes: ["rubble", "crystal"],
				titleModifier: "do Permafrost"
			}
		]
	},
	storm_power_grid: {
		id: "storm_power_grid",
		name: "Rede Elétrica de Alta Voltagem",
		themeId: "lighting",
		biome: "storm",
		description: "Complexo de condutores e transformadores sob tempestade de dados",
		microbiomes: [
			{
				id: "substation_core",
				name: "Subestação Ativa",
				description: "Cabos desencapados e bobinas liberando descargas elétricas",
				floorVariantBias: .15,
				hazardChance: .65,
				accentColors: [65535, 16776960],
				allowedClusterTypes: [
					"energy",
					"hazard",
					"structure"
				],
				titleModifier: "da Subestação"
			},
			{
				id: "frequency_lab",
				name: "Laboratório de Frequência",
				description: "Sensores de medição e terminais de calibragem",
				floorVariantBias: .1,
				hazardChance: .2,
				accentColors: [61695, 8978431],
				allowedClusterTypes: ["tech", "energy"],
				titleModifier: "da Ressonância"
			},
			{
				id: "capacitor_vault",
				name: "Cofre de Capacitores",
				description: "Grandes acumuladores de energia pulsando em ritmo constante",
				floorVariantBias: .08,
				hazardChance: .3,
				accentColors: [57599, 16771584],
				allowedClusterTypes: ["structure", "energy"],
				titleModifier: "dos Capacitores"
			},
			{
				id: "storm_chasm",
				name: "Fenda Eletrostática",
				description: "Vão aberto cruzado por arcos elétricos de alta intensidade",
				floorVariantBias: .18,
				hazardChance: .8,
				accentColors: [3407871, 65450],
				allowedClusterTypes: ["hazard", "energy"],
				titleModifier: "da Tempestade"
			}
		]
	},
	tech_cyber_core: {
		id: "tech_cyber_core",
		name: "Laboratório Cyber Core",
		themeId: "tech",
		biome: "digital",
		description: "Instalação quântica onde a arquitetura do mundo digital é processada",
		microbiomes: [
			{
				id: "server_mainframe",
				name: "Mainframe Central",
				description: "Torres de servidores luminosas com tráfego massivo de dados",
				floorVariantBias: .1,
				hazardChance: .1,
				accentColors: [3800852, 65382],
				allowedClusterTypes: ["tech", "structure"],
				titleModifier: "do Mainframe"
			},
			{
				id: "data_conduit",
				name: "Conduíte de Feixe de Dados",
				description: "Canais rápidos de transmissão com linhas de neon pulsantes",
				floorVariantBias: .14,
				hazardChance: .3,
				accentColors: [65416, 7405424],
				allowedClusterTypes: ["energy", "tech"],
				titleModifier: "do Conduíte"
			},
			{
				id: "quantum_vault",
				name: "Câmara Quântica",
				description: "Salas isoladas onde algoritmos raros ficam selados",
				floorVariantBias: .06,
				hazardChance: .15,
				accentColors: [5635925, 52292],
				allowedClusterTypes: ["structure", "tech"],
				titleModifier: "do Núcleo Quântico"
			},
			{
				id: "corrupted_archive",
				name: "Arquivo Corrompido",
				description: "Setores desestabilizados por lixo de memória e bugs",
				floorVariantBias: .16,
				hazardChance: .5,
				accentColors: [16711765, 3800852],
				allowedClusterTypes: [
					"hazard",
					"tech",
					"rubble"
				],
				titleModifier: "do Setor Glitch"
			}
		]
	}
};
function selectBiomesForRun(themeId, rng) {
	const matchingMacros = Object.values(MACROBIOMES_REGISTRY).filter((m) => m.themeId === themeId);
	const macro = matchingMacros.length > 0 ? rng.pick(matchingMacros) : MACROBIOMES_REGISTRY.storm_power_grid;
	const shuffled = [...macro.microbiomes].sort(() => rng.next() - .5);
	const count = rng.int(2, Math.min(4, shuffled.length));
	return {
		macro,
		activeMicrobiomes: shuffled.slice(0, count)
	};
}
function findReachableFloorTiles(tiles, start, width, height) {
	const reachable = [];
	if (start.y < 0 || start.y >= height || start.x < 0 || start.x >= width) return reachable;
	if (tiles[start.y]?.[start.x] !== "floor") return reachable;
	const queue = [[start.x, start.y]];
	const visited = /* @__PURE__ */ new Set([`${start.x},${start.y}`]);
	reachable.push({
		x: start.x,
		y: start.y
	});
	const dirs = [
		[0, 1],
		[0, -1],
		[1, 0],
		[-1, 0]
	];
	while (queue.length > 0) {
		const [cx, cy] = queue.shift();
		for (const [dx, dy] of dirs) {
			const nx = cx + dx;
			const ny = cy + dy;
			const key = `${nx},${ny}`;
			if (nx >= 0 && nx < width && ny >= 0 && ny < height && !visited.has(key) && tiles[ny]?.[nx] === "floor") {
				visited.add(key);
				reachable.push({
					x: nx,
					y: ny
				});
				queue.push([nx, ny]);
			}
		}
	}
	return reachable;
}
function pruneIsolatedFloorIslands(tiles, spawn, width, height) {
	const reachable = new Set(findReachableFloorTiles(tiles, spawn, width, height).map((t) => `${t.x},${t.y}`));
	for (let y = 1; y < height - 1; y++) for (let x = 1; x < width - 1; x++) if (tiles[y][x] === "floor" && !reachable.has(`${x},${y}`)) tiles[y][x] = "wall";
}
function validateMapStructure(tiles, spawn, exit, props, width, height, macroArchetype = "branching_dungeon", seed = 0, floor = 1) {
	if (tiles[spawn.y]?.[spawn.x] !== "floor") return {
		valid: false,
		reason: "Player spawn is inside wall",
		reachableTiles: []
	};
	if (tiles[exit.y]?.[exit.x] !== "floor") return {
		valid: false,
		reason: "Exit door is inside wall",
		reachableTiles: []
	};
	const reachableTiles = findReachableFloorTiles(tiles, spawn, width, height);
	const reachableSet = new Set(reachableTiles.map((t) => `${t.x},${t.y}`));
	if (!reachableSet.has(`${exit.x},${exit.y}`)) return {
		valid: false,
		reason: "Exit is not reachable from spawn via BFS",
		reachableTiles
	};
	if (reachableTiles.length < 25) return {
		valid: false,
		reason: `Reachable floor tile count (${reachableTiles.length}) is below required minimum 25`,
		reachableTiles
	};
	for (const prop of props) if (!reachableSet.has(`${prop.tileX},${prop.tileY}`)) return {
		valid: false,
		reason: `Prop ${prop.id} (${prop.type}) is unreachable at ${prop.tileX},${prop.tileY}`,
		reachableTiles
	};
	let totalFloor = 0;
	let totalWall = 0;
	for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) if (tiles[y][x] === "floor") totalFloor++;
	else totalWall++;
	const totalTiles = width * height;
	const emptySpaceRatio = Number((totalFloor / totalTiles).toFixed(2));
	return {
		valid: true,
		reachableTiles,
		metrics: {
			seed,
			floor,
			macroArchetype,
			totalFloorTiles: totalFloor,
			totalWallTiles: totalWall,
			emptySpaceRatio,
			bfsReachableCount: reachableTiles.length,
			connectivityValid: true
		}
	};
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
	irregularRoomChance: .5,
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
	},
	environmentBudget: {
		micro: 4,
		small: 8,
		medium: 15,
		large: 25,
		arena: 35,
		huge: 35
	}
};
Array.from({ length: Math.floor(30) }, (_, i) => (i + 1) * 10);
Array.from({ length: Math.floor(30) }, (_, i) => i * 10 + 5);
Array.from({ length: Math.floor(30) }, (_, i) => i * 10 + 3);
var RENDER_DEPTH = {
	BACKGROUND: 0,
	FLOOR: 1,
	FLOOR_DECOR: 2,
	FLOOR_HAZARD: 3,
	SPAWN_RING: 4,
	LOW_PROPS: 5,
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
	if (roomNumber % 10 === 0) return "boss";
	if (roomNumber % 10 === 5) return "miniboss";
	const mod = roomNumber % 10;
	if (mod === 7) return "elite";
	if (mod === 3) return Math.floor(roomNumber / 10) % 2 === 0 ? "treasure" : "event";
	if (mod === 8) return Math.floor(roomNumber / 10) % 2 === 0 ? "rest" : "shop";
	if (mod === 2 && roomNumber % 20 === 12) return "treasure";
	return "combat";
}
function findValidSpawnTile(room) {
	if (room.spawn && room.tiles[room.spawn.y]?.[room.spawn.x] === "floor") return room.spawn;
	for (let y = 1; y < room.height - 1; y++) for (let x = 1; x < room.width - 1; x++) if (room.tiles[y][x] === "floor") return {
		x,
		y
	};
	return {
		x: 1,
		y: 1
	};
}
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
		props: [],
		shape: "arena",
		emptySpaceRatio: .85,
		budgetUsed: 0
	};
}
/**
* High-level procedural map generator running the 11 conceptual layers:
* CAMADA 1 — identidade da fase
* CAMADA 2 — grafo/topologia
* CAMADA 3 — geometria das salas
* CAMADA 4 — conexões
* CAMADA 5 — arquitetura do ambiente
* CAMADA 6 — terreno
* CAMADA 7 — landmarks
* CAMADA 8 — decoração contextual
* CAMADA 9 — gameplay
* CAMADA 10 — polishing visual
* CAMADA 11 — validação
*/
function generateSingleRoom(id, index, kind, seed, biome = "digital", floor = 1, customWidth, customHeight, themeId = "lighting") {
	const rng = new RunRNG(seed ^ index * 7919 ^ floor * 3571);
	let sizeCategory = "medium";
	if (kind === "boss") sizeCategory = "arena";
	else if (kind === "miniboss") sizeCategory = rng.chance(.5) ? "large" : "arena";
	else if (kind === "treasure" || kind === "rest") sizeCategory = rng.chance(.6) ? "small" : "medium";
	else if (kind === "elite") sizeCategory = "large";
	else sizeCategory = rng.pick([
		"small",
		"medium",
		"large"
	]);
	const baseDimensions = MAP_CONFIG.roomSizeCategories[sizeCategory] || MAP_CONFIG.roomSizeCategories.medium;
	const targetWidth = customWidth ?? baseDimensions.width;
	const targetHeight = customHeight ?? baseDimensions.height;
	const theme = getMapTheme(themeId);
	const { macro: macroProfile, activeMicrobiomes } = selectBiomesForRun(theme.id, rng);
	const roomTitles = {
		start: "Portal de Entrada",
		combat: `${macroProfile.name} 0${index + 1}`,
		treasure: `Câmara de Suprimentos ${activeMicrobiomes[0]?.titleModifier || ""}`.trim(),
		elite: `Portão da Sentinela de Elite ${activeMicrobiomes[0]?.titleModifier || ""}`.trim(),
		event: `Terminal de Dados Antigo ${activeMicrobiomes[0]?.titleModifier || ""}`.trim(),
		rest: "Nó de Regeneração",
		shop: "Mercador Digital",
		miniboss: `Arena do Guardião Intermediário (Andar ${floor})`,
		boss: floor === 10 ? "Covil de Kuwagamon" : floor === 20 ? "Cratera do Meramon Incandescente" : floor === 30 ? "Abismo de Seadramon" : floor === 40 ? "Usina de MetalEtemon" : floor === 50 ? "Núcleo de BlackWarGreymon (Chefe Final)" : `Arena do Guardião Supremo (Andar ${floor})`
	};
	for (let attempt = 1; attempt <= MAP_CONFIG.maxGenerationAttempts; attempt++) {
		const graph = generateTopologyGraph({
			floor,
			kind,
			rng
		});
		const layout = layoutDungeonGraph(graph, rng, targetWidth, targetHeight);
		const width = layout.width;
		const height = layout.height;
		const tiles = layout.tiles;
		const spawn = layout.spawn;
		const exit = layout.exit;
		pruneIsolatedFloorIslands(tiles, spawn, width, height);
		const reachableTiles = findReachableFloorTiles(tiles, spawn, width, height);
		if (reachableTiles.some((t) => t.x === exit.x && t.y === exit.y) && reachableTiles.length >= 25) {
			generateTerrainPatches(tiles, width, height, theme, rng, activeMicrobiomes[0]?.floorVariantBias ?? .12);
			const landmark = generateLandmark({
				roomKind: kind,
				themeId: theme.id,
				x: 0,
				y: 0,
				width,
				height,
				tiles,
				rng
			});
			const { clusters, budgetUsed } = generateEnvironmentClusters({
				id,
				width,
				height,
				tiles,
				spawn,
				exit,
				sizeCategory,
				themeId: theme.id,
				rng,
				hasLandmark: Boolean(landmark)
			});
			const { enemies, props } = generateEncounters({
				id,
				floor,
				kind,
				biome,
				sizeCategory,
				width,
				height,
				tiles,
				spawn,
				exit,
				reachableTiles,
				deadEndTile: layout.deadEndTile,
				rng
			});
			if (validateMapStructure(tiles, spawn, exit, props, width, height, graph.macroArchetype, seed, floor).valid) {
				const shape = graph.nodes.find((n) => n.id === graph.startNodeId)?.shape || "arena";
				const totalTiles = width * height;
				const emptySpaceRatio = Number((reachableTiles.length / totalTiles).toFixed(2));
				const metrics = {
					seed,
					floor,
					macroArchetype: graph.macroArchetype,
					roomCount: graph.nodes.length,
					totalFloorTiles: reachableTiles.length,
					totalWallTiles: totalTiles - reachableTiles.length,
					emptySpaceRatio,
					mainPathLength: graph.mainPathNodeIds.length,
					optionalRoomCount: graph.optionalNodeIds.length,
					deadEndCount: graph.deadEndCount,
					loopCount: graph.loopCount,
					landmarkCount: landmark ? 1 : 0,
					clusterCount: clusters.length,
					enemyCount: enemies.length,
					propCount: props.length,
					bfsReachableCount: reachableTiles.length,
					connectivityValid: true,
					generationAttempt: attempt
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
					shape,
					graph,
					clusters,
					landmark,
					emptySpaceRatio,
					budgetUsed,
					macroArchetype: graph.macroArchetype,
					microbiomes: activeMicrobiomes,
					metrics
				};
			}
		}
	}
	console.warn(`[RoomGenerator] Max attempts reached for ${id}. Using safe fallback room.`);
	return createSafeFallbackRoom(id, index, kind, roomTitles[kind], biome, floor, targetWidth, targetHeight, themeId);
}
function getBiomeForFloor(roomNumber) {
	const cycle50 = (roomNumber - 1) % 50 + 1;
	if (cycle50 <= 10) return "digital";
	if (cycle50 <= 20) return "fire";
	if (cycle50 <= 30) return "ice";
	if (cycle50 <= 40) return "storm";
	return "dark";
}
function createFiniteRun(seed, startingRoom = 1, themeId) {
	const currentRoom = Math.max(1, Math.min(300, startingRoom));
	const biome = getBiomeForFloor(currentRoom);
	const kind = getRoomKind(currentRoom);
	const theme = themeId ? getMapTheme(themeId) : pickRandomTheme(new RunRNG(seed));
	const singleRoom = generateSingleRoom(`room_${String(currentRoom).padStart(2, "0")}`, currentRoom - 1, kind, seed, biome, currentRoom, void 0, void 0, theme.id);
	return {
		runId: `run_${seed}_r${currentRoom}_${Date.now()}`,
		seed,
		floor: currentRoom,
		totalRooms: 300,
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
	},
	wargreymon: {
		speciesId: "wargreymon",
		displayName: "WarGreymon",
		role: "Hiper-Ofensivo Mega",
		element: "fogo",
		baseSpeed: 110,
		basic1: {
			name: "Garra Dramon Killer",
			damage: 38,
			range: 60,
			cooldownMs: 340,
			animation: "player-attack-basic-1",
			attackType: "DIRECTIONAL_MELEE",
			description: "Corte devastador com as garras anti-dragão."
		},
		basic2: {
			name: "Grande Tornado",
			damage: 45,
			range: 280,
			cooldownMs: 700,
			animation: "player-attack-basic-2",
			projectileColor: 16746496,
			statusEffect: "burn",
			attackType: "DIRECTIONAL_PROJECTILE",
			description: "Projétil furioso de chamas giratórias."
		},
		special: {
			name: "Força Terra",
			damage: 95,
			area: 140,
			cooldownMs: 3200,
			animation: "player-attack-special",
			shakeIntensity: .015,
			attackType: "RADIAL_AREA",
			description: "Condensação de energia solar titânica devastadora."
		}
	},
	weregarurumon: {
		speciesId: "weregarurumon",
		displayName: "WereGarurumon",
		role: "Lutador Veloz & Crítico",
		element: "gelo",
		baseSpeed: 128,
		basic1: {
			name: "Garras do Lobo",
			damage: 32,
			range: 55,
			cooldownMs: 280,
			animation: "player-attack-basic-1",
			attackType: "DIRECTIONAL_MELEE",
			description: "Sequência veloz de cortes cortantes."
		},
		basic2: {
			name: "Garuru Kick Crescente",
			damage: 36,
			range: 260,
			cooldownMs: 600,
			animation: "player-attack-basic-2",
			projectileColor: 4508927,
			statusEffect: "slow",
			attackType: "DIRECTIONAL_PROJECTILE",
			description: "Onda de choque cortante em meia-lua."
		},
		special: {
			name: "Chute Moonsault",
			damage: 80,
			area: 120,
			cooldownMs: 2800,
			animation: "player-attack-special",
			invulnerableFramesMs: 300,
			shakeIntensity: .01,
			attackType: "DIRECTIONAL_SPECIAL",
			description: "Acrobacia aérea com impacto congelante e invulnerabilidade momentânea."
		}
	},
	xvmon: {
		speciesId: "xvmon",
		displayName: "ExVeemon",
		role: "Combatente Aéreo Ágil",
		element: "neutro",
		baseSpeed: 120,
		basic1: {
			name: "X-Soco Forte",
			damage: 24,
			range: 50,
			cooldownMs: 320,
			animation: "player-attack-basic-1",
			attackType: "DIRECTIONAL_MELEE",
			description: "Golpe frontal com punho energizado."
		},
		basic2: {
			name: "X-Laser",
			damage: 30,
			range: 320,
			cooldownMs: 580,
			animation: "player-attack-basic-2",
			projectileColor: 61695,
			attackType: "DIRECTIONAL_PROJECTILE",
			description: "Disparo concentrado em forma de X."
		},
		special: {
			name: "Hearty Shatter",
			damage: 62,
			area: 105,
			cooldownMs: 2300,
			animation: "player-attack-special",
			shakeIntensity: .008,
			attackType: "RADIAL_AREA",
			description: "Descarga de energia corporal explosiva."
		}
	},
	garurumon: {
		speciesId: "garurumon",
		displayName: "Garurumon",
		role: "Predador Gélido",
		element: "gelo",
		baseSpeed: 115,
		basic1: {
			name: "Investida Cortante",
			damage: 22,
			range: 50,
			cooldownMs: 350,
			animation: "player-attack-basic-1",
			attackType: "DIRECTIONAL_MELEE",
			description: "Bote veloz com mordida rápida."
		},
		basic2: {
			name: "Fox Fire",
			damage: 28,
			range: 260,
			cooldownMs: 650,
			animation: "player-attack-basic-2",
			projectileColor: 6732799,
			statusEffect: "slow",
			attackType: "DIRECTIONAL_PROJECTILE",
			description: "Chama azul fria que reduz a velocidade inimiga."
		},
		special: {
			name: "Freeze Fang",
			damage: 56,
			area: 95,
			cooldownMs: 2400,
			animation: "player-attack-special",
			shakeIntensity: .007,
			attackType: "RADIAL_AREA",
			description: "Explosão de estacas gélidas ao redor."
		}
	},
	geogreymon: {
		speciesId: "geogreymon",
		displayName: "GeoGreymon",
		role: "Colosso de Fogo",
		element: "fogo",
		baseSpeed: 100,
		basic1: {
			name: "Impulso do Chifre",
			damage: 26,
			range: 54,
			cooldownMs: 400,
			animation: "player-attack-basic-1",
			attackType: "DIRECTIONAL_MELEE",
			description: "Cabeçada pesada com os chifres blindados."
		},
		basic2: {
			name: "Mega Tiro",
			damage: 32,
			range: 280,
			cooldownMs: 700,
			animation: "player-attack-basic-2",
			projectileColor: 16729344,
			statusEffect: "burn",
			attackType: "DIRECTIONAL_PROJECTILE",
			description: "Disparo contínuo de projéteis de fogo denso."
		},
		special: {
			name: "Mega Chama Vulcânica",
			damage: 68,
			area: 115,
			cooldownMs: 2600,
			animation: "player-attack-special",
			shakeIntensity: .012,
			attackType: "RADIAL_AREA",
			description: "Erupção concentrada de chamas ao redor."
		}
	},
	etemon: {
		speciesId: "etemon",
		displayName: "Etemon",
		role: "Trapaceiro Rítmico",
		element: "eletricidade",
		baseSpeed: 112,
		basic1: {
			name: "Garra de Macaco",
			damage: 22,
			range: 46,
			cooldownMs: 320,
			animation: "player-attack-basic-1",
			attackType: "DIRECTIONAL_MELEE",
			description: "Bofetadas cômicas e desestabilizantes."
		},
		basic2: {
			name: "Dark Network Disparo",
			damage: 26,
			range: 250,
			cooldownMs: 620,
			animation: "player-attack-basic-2",
			projectileColor: 10040319,
			statusEffect: "shock",
			attackType: "DIRECTIONAL_PROJECTILE",
			description: "Esfera de dados corrompidos com carga elétrica."
		},
		special: {
			name: "Serenata do Amor",
			damage: 55,
			area: 120,
			cooldownMs: 2500,
			animation: "player-attack-special",
			shakeIntensity: .009,
			attackType: "RADIAL_AREA",
			description: "Ondas sonoras desafinadas que atordoam inimigos na área."
		}
	},
	metaletemon: {
		speciesId: "metaletemon",
		displayName: "MetalEtemon",
		role: "Tanque Metálico Punk",
		element: "eletricidade",
		baseSpeed: 104,
		basic1: {
			name: "Mega Soco Cromado",
			damage: 36,
			range: 52,
			cooldownMs: 380,
			animation: "player-attack-basic-1",
			attackType: "DIRECTIONAL_MELEE",
			description: "Golpe pesado com blindagem de metal reforçado."
		},
		basic2: {
			name: "Dark Spirits Deluxe",
			damage: 42,
			range: 290,
			cooldownMs: 680,
			animation: "player-attack-basic-2",
			projectileColor: 12255487,
			statusEffect: "shock",
			attackType: "DIRECTIONAL_PROJECTILE",
			description: "Relâmpago sombrio concentrado de alta voltagem."
		},
		special: {
			name: "Banana Slip Suprema",
			damage: 85,
			area: 130,
			cooldownMs: 3e3,
			animation: "player-attack-special",
			invulnerableFramesMs: 250,
			shakeIntensity: .014,
			attackType: "RADIAL_AREA",
			description: "Impacto sonoro e bananas de ouro que eletrificam o solo."
		}
	},
	kingetemon: {
		speciesId: "kingetemon",
		displayName: "KingEtemon",
		role: "Monarca Excêntrico",
		element: "eletricidade",
		baseSpeed: 108,
		basic1: {
			name: "Bofetada Real",
			damage: 34,
			range: 50,
			cooldownMs: 350,
			animation: "player-attack-basic-1",
			attackType: "DIRECTIONAL_MELEE",
			description: "Tapa monárquico com autoridade absoluta."
		},
		basic2: {
			name: "Rede Imperial de Choque",
			damage: 40,
			range: 300,
			cooldownMs: 650,
			animation: "player-attack-basic-2",
			projectileColor: 16766720,
			statusEffect: "shock",
			attackType: "DIRECTIONAL_PROJECTILE",
			description: "Rajada de cabos dourados eletrificados."
		},
		special: {
			name: "Grande Concerto Régio",
			damage: 82,
			area: 135,
			cooldownMs: 2900,
			animation: "player-attack-special",
			shakeIntensity: .012,
			attackType: "RADIAL_AREA",
			description: "Performance real ensurdecedora com rajadas de choque em área."
		}
	},
	flamedramon: {
		speciesId: "flamedramon",
		displayName: "Flamedramon",
		role: "Investida Ígnea Veloz",
		element: "fogo",
		baseSpeed: 122,
		basic1: {
			name: "Fogo na Garra",
			damage: 28,
			range: 52,
			cooldownMs: 310,
			animation: "player-attack-basic-1",
			attackType: "DIRECTIONAL_MELEE",
			description: "Cortes flamejantes em rápida sucessão."
		},
		basic2: {
			name: "Fire Rocket",
			damage: 35,
			range: 300,
			cooldownMs: 620,
			animation: "player-attack-basic-2",
			projectileColor: 16733440,
			statusEffect: "burn",
			attackType: "DIRECTIONAL_PROJECTILE",
			description: "Disparo potente em formato de foguete de fogo."
		},
		special: {
			name: "Escudo Flamejante Explosivo",
			damage: 72,
			area: 110,
			cooldownMs: 2500,
			animation: "player-attack-special",
			invulnerableFramesMs: 200,
			shakeIntensity: .01,
			attackType: "RADIAL_AREA",
			description: "Aura de fogo em espiral que incinera inimigos ao redor."
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
			projectileTextureKey: "gabumon_projectile_blaster_0",
			scale: .85,
			speed: 290,
			impactTextureKey: "gabumon_effects_hit_0",
			impactScale: .9,
			impactDurationMs: 160
		},
		special: {
			hasVisualEffect: true,
			effectAnimKey: "gabumon_effects_special",
			effectTextureKey: "gabumon_effects_special_0",
			scale: 1.15,
			offsetForward: 40,
			durationMs: 320
		},
		hitImpact: {
			textureKey: "gabumon_effects_hit_0",
			scale: .9,
			durationMs: 130
		},
		heal: {
			textureKey: "gabumon_effects_hit_0",
			scale: .8,
			durationMs: 350
		}
	},
	wargreymon: {
		speciesId: "wargreymon",
		basic1: {
			hasVisualEffect: true,
			effectAnimKey: "agumon_effect_mega_blast",
			effectTextureKey: "agumon_effect_mega_blast_0",
			scale: 1.3,
			offsetForward: 44,
			durationMs: 180
		},
		basic2: {
			hasProjectile: true,
			projectileAnimKey: "agumon_projectile_dragon",
			projectileTextureKey: "agumon_projectile_dragon_0",
			scale: 1.35,
			speed: 340,
			impactAnimKey: "agumon_effect_mega_blast",
			impactTextureKey: "agumon_effect_mega_blast_0",
			impactScale: 1.1,
			impactDurationMs: 280
		},
		special: {
			hasVisualEffect: true,
			effectAnimKey: "agumon_effect_mega_blast",
			effectTextureKey: "agumon_effect_mega_blast_0",
			scale: 2.2,
			offsetForward: 56,
			durationMs: 500
		},
		hitImpact: {
			textureKey: "agumon_effect_mega_blast_0",
			scale: .8,
			durationMs: 160
		},
		heal: {
			textureKey: "agumon_heal_0",
			scale: 1.1,
			durationMs: 400
		}
	},
	weregarurumon: {
		speciesId: "weregarurumon",
		basic1: {
			hasVisualEffect: true,
			effectAnimKey: "veemon_effects_attack_1",
			effectTextureKey: "veemon_effects_attack_1_0",
			scale: 1.15,
			offsetForward: 38,
			rotationMode: "match_facing",
			durationMs: 170
		},
		basic2: {
			hasProjectile: true,
			projectileAnimKey: "veemon_projectile_laser",
			projectileTextureKey: "veemon_projectile_laser_0",
			scale: 1.1,
			speed: 360,
			impactAnimKey: "veemon_effects_hit",
			impactTextureKey: "veemon_effects_hit_0",
			impactScale: 1.2,
			impactDurationMs: 180
		},
		special: {
			hasVisualEffect: true,
			effectAnimKey: "veemon_effects_special",
			effectTextureKey: "veemon_effects_special_0",
			scale: 1.45,
			offsetForward: 48,
			durationMs: 400,
			isGroundBurst: true
		},
		hitImpact: {
			textureKey: "veemon_effects_hit_0",
			scale: 1,
			durationMs: 140
		},
		heal: {
			textureKey: "veemon_heal_0",
			scale: .95,
			durationMs: 400
		}
	},
	xvmon: {
		speciesId: "xvmon",
		basic1: {
			hasVisualEffect: true,
			effectAnimKey: "veemon_effects_attack_1",
			effectTextureKey: "veemon_effects_attack_1_0",
			scale: 1.1,
			offsetForward: 38,
			rotationMode: "match_facing",
			durationMs: 180
		},
		basic2: {
			hasProjectile: true,
			projectileAnimKey: "veemon_projectile_laser",
			projectileTextureKey: "veemon_projectile_laser_0",
			scale: 1.25,
			speed: 420,
			impactAnimKey: "veemon_effects_hit",
			impactTextureKey: "veemon_effects_hit_0",
			impactScale: 1.3,
			impactDurationMs: 190
		},
		special: {
			hasVisualEffect: true,
			effectAnimKey: "veemon_effects_special",
			effectTextureKey: "veemon_effects_special_0",
			scale: 1.5,
			offsetForward: 50,
			durationMs: 420,
			isGroundBurst: true
		},
		hitImpact: {
			textureKey: "veemon_effects_hit_0",
			scale: 1.1,
			durationMs: 150
		},
		heal: {
			textureKey: "veemon_heal_0",
			scale: 1,
			durationMs: 400
		}
	},
	garurumon: {
		speciesId: "garurumon",
		basic1: {
			hasVisualEffect: false,
			offsetForward: 34,
			durationMs: 150
		},
		basic2: {
			hasProjectile: true,
			projectileTextureKey: "gabumon_projectile_blaster_0",
			scale: .95,
			speed: 310,
			impactTextureKey: "gabumon_effects_hit_0",
			impactScale: 1.05,
			impactDurationMs: 170
		},
		special: {
			hasVisualEffect: true,
			effectAnimKey: "gabumon_effects_special",
			effectTextureKey: "gabumon_effects_special_0",
			scale: 1.3,
			offsetForward: 44,
			durationMs: 360
		},
		hitImpact: {
			textureKey: "gabumon_effects_hit_0",
			scale: .95,
			durationMs: 140
		},
		heal: {
			textureKey: "gabumon_effects_hit_0",
			scale: .9,
			durationMs: 380
		}
	},
	geogreymon: {
		speciesId: "geogreymon",
		basic1: {
			hasVisualEffect: false,
			offsetForward: 38,
			durationMs: 160
		},
		basic2: {
			hasProjectile: true,
			projectileAnimKey: "agumon_projectile_dragon",
			projectileTextureKey: "agumon_projectile_dragon_0",
			scale: 1.15,
			speed: 330,
			impactAnimKey: "agumon_effect_mega_blast",
			impactTextureKey: "agumon_effect_mega_blast_0",
			impactScale: .95,
			impactDurationMs: 260
		},
		special: {
			hasVisualEffect: true,
			effectAnimKey: "agumon_effect_mega_blast",
			effectTextureKey: "agumon_effect_mega_blast_0",
			scale: 1.75,
			offsetForward: 52,
			durationMs: 440
		},
		hitImpact: {
			textureKey: "agumon_effect_mega_blast_0",
			scale: .7,
			durationMs: 150
		},
		heal: {
			textureKey: "agumon_heal_0",
			scale: .95,
			durationMs: 400
		}
	},
	etemon: {
		speciesId: "etemon",
		basic1: {
			hasVisualEffect: false,
			offsetForward: 32,
			durationMs: 140
		},
		basic2: {
			hasProjectile: true,
			projectileTextureKey: "veemon_projectile_laser_0",
			scale: .9,
			speed: 310,
			impactTextureKey: "veemon_effects_hit_0",
			impactScale: 1,
			impactDurationMs: 160
		},
		special: {
			hasVisualEffect: true,
			effectAnimKey: "veemon_effects_special",
			effectTextureKey: "veemon_effects_special_0",
			scale: 1.35,
			offsetForward: 44,
			durationMs: 380,
			isGroundBurst: true
		},
		hitImpact: {
			textureKey: "veemon_effects_hit_0",
			scale: .9,
			durationMs: 140
		},
		heal: {
			textureKey: "veemon_heal_0",
			scale: .9,
			durationMs: 380
		}
	},
	metaletemon: {
		speciesId: "metaletemon",
		basic1: {
			hasVisualEffect: true,
			effectAnimKey: "veemon_effects_attack_1",
			effectTextureKey: "veemon_effects_attack_1_0",
			scale: 1.2,
			offsetForward: 40,
			rotationMode: "match_facing",
			durationMs: 180
		},
		basic2: {
			hasProjectile: true,
			projectileAnimKey: "veemon_projectile_laser",
			projectileTextureKey: "veemon_projectile_laser_0",
			scale: 1.15,
			speed: 340,
			impactAnimKey: "veemon_effects_hit",
			impactTextureKey: "veemon_effects_hit_0",
			impactScale: 1.25,
			impactDurationMs: 190
		},
		special: {
			hasVisualEffect: true,
			effectAnimKey: "veemon_effects_special",
			effectTextureKey: "veemon_effects_special_0",
			scale: 1.7,
			offsetForward: 52,
			durationMs: 460,
			isGroundBurst: true
		},
		hitImpact: {
			textureKey: "veemon_effects_hit_0",
			scale: 1.1,
			durationMs: 150
		},
		heal: {
			textureKey: "veemon_heal_0",
			scale: 1,
			durationMs: 400
		}
	},
	kingetemon: {
		speciesId: "kingetemon",
		basic1: {
			hasVisualEffect: false,
			offsetForward: 34,
			durationMs: 150
		},
		basic2: {
			hasProjectile: true,
			projectileTextureKey: "veemon_projectile_laser_0",
			scale: 1.1,
			speed: 330,
			impactTextureKey: "veemon_effects_hit_0",
			impactScale: 1.2,
			impactDurationMs: 180
		},
		special: {
			hasVisualEffect: true,
			effectAnimKey: "veemon_effects_special",
			effectTextureKey: "veemon_effects_special_0",
			scale: 1.65,
			offsetForward: 50,
			durationMs: 450,
			isGroundBurst: true
		},
		hitImpact: {
			textureKey: "veemon_effects_hit_0",
			scale: 1.05,
			durationMs: 150
		},
		heal: {
			textureKey: "veemon_heal_0",
			scale: 1,
			durationMs: 400
		}
	},
	flamedramon: {
		speciesId: "flamedramon",
		basic1: {
			hasVisualEffect: true,
			effectAnimKey: "agumon_effect_mega_blast",
			effectTextureKey: "agumon_effect_mega_blast_0",
			scale: .95,
			offsetForward: 38,
			durationMs: 160
		},
		basic2: {
			hasProjectile: true,
			projectileAnimKey: "agumon_projectile_dragon",
			projectileTextureKey: "agumon_projectile_dragon_0",
			scale: 1.05,
			speed: 370,
			impactAnimKey: "agumon_effect_mega_blast",
			impactTextureKey: "agumon_effect_mega_blast_0",
			impactScale: .85,
			impactDurationMs: 220
		},
		special: {
			hasVisualEffect: true,
			effectAnimKey: "agumon_effect_mega_blast",
			effectTextureKey: "agumon_effect_mega_blast_0",
			scale: 1.5,
			offsetForward: 46,
			durationMs: 390
		},
		hitImpact: {
			textureKey: "agumon_effect_mega_blast_0",
			scale: .65,
			durationMs: 140
		},
		heal: {
			textureKey: "agumon_heal_0",
			scale: .85,
			durationMs: 400
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
		this.currentRoomNumber = Math.max(1, Math.min(300, options.floorNumber || 1));
		this.currentRoomIndex = this.currentRoomNumber - 1;
		this.runTheme = options.themeId ? getMapTheme(options.themeId) : pickRandomTheme(new RunRNG(options.seed));
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
					if (theme.tiles.corners) {
						if (theme.tiles.corners.outerTopLeft) this.load.image(`theme_${theme.id}_corner_outer_tl`, theme.tiles.corners.outerTopLeft);
						if (theme.tiles.corners.outerTopRight) this.load.image(`theme_${theme.id}_corner_outer_tr`, theme.tiles.corners.outerTopRight);
						if (theme.tiles.corners.outerBottomLeft) this.load.image(`theme_${theme.id}_corner_outer_bl`, theme.tiles.corners.outerBottomLeft);
						if (theme.tiles.corners.outerBottomRight) this.load.image(`theme_${theme.id}_corner_outer_br`, theme.tiles.corners.outerBottomRight);
						if (theme.tiles.corners.innerTopLeft) this.load.image(`theme_${theme.id}_corner_inner_tl`, theme.tiles.corners.innerTopLeft);
						if (theme.tiles.corners.innerTopRight) this.load.image(`theme_${theme.id}_corner_inner_tr`, theme.tiles.corners.innerTopRight);
						if (theme.tiles.corners.innerBottomLeft) this.load.image(`theme_${theme.id}_corner_inner_bl`, theme.tiles.corners.innerBottomLeft);
						if (theme.tiles.corners.innerBottomRight) this.load.image(`theme_${theme.id}_corner_inner_br`, theme.tiles.corners.innerBottomRight);
					}
					if (theme.tiles.decorations) {
						(theme.tiles.decorations.floor ?? []).forEach((p, idx) => {
							this.load.image(`theme_${theme.id}_decor_floor_${idx}`, p);
						});
						(theme.tiles.decorations.medium ?? []).forEach((p, idx) => {
							this.load.image(`theme_${theme.id}_decor_med_${idx}`, p);
						});
						(theme.tiles.decorations.wall ?? []).forEach((p, idx) => {
							this.load.image(`theme_${theme.id}_decor_wall_${idx}`, p);
						});
					}
					if (theme.tiles.environment) {
						(theme.tiles.environment.ambient ?? []).forEach((p, idx) => {
							this.load.image(`theme_${theme.id}_env_ambient_${idx}`, p);
						});
						(theme.tiles.environment.rocks ?? []).forEach((p, idx) => {
							this.load.image(`theme_${theme.id}_env_rocks_${idx}`, p);
						});
						(theme.tiles.environment.ruins ?? []).forEach((p, idx) => {
							this.load.image(`theme_${theme.id}_env_ruins_${idx}`, p);
						});
						(theme.tiles.environment.elemental ?? []).forEach((p, idx) => {
							this.load.image(`theme_${theme.id}_env_elem_${idx}`, p);
						});
					}
					if (theme.tiles.hazards) (theme.tiles.hazards.floor ?? []).forEach((p, idx) => {
						this.load.image(`theme_${theme.id}_hazard_floor_${idx}`, p);
					});
					if (theme.tiles.landmarks) (theme.tiles.landmarks.monolith ?? []).forEach((p, idx) => {
						this.load.image(`theme_${theme.id}_landmark_mono_${idx}`, p);
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
				if (typeof window !== "undefined") {
					window.__digitalPathActiveScene = this;
					if (new URLSearchParams(window.location.search).get("mapDebug") === "1") this.debugOverlayVisible = true;
				}
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
				this.currentRoomNumber = Math.max(1, Math.min(300, roomNumber));
				self.currentRoomNumber = this.currentRoomNumber;
				self.currentRoomIndex = this.currentRoomNumber - 1;
				const roomSeed = (options.seed ^ this.currentRoomNumber * 2654435761) >>> 0;
				const biome = getBiomeForFloor(this.currentRoomNumber);
				const kind = getRoomKind(this.currentRoomNumber);
				const theme = getMapTheme(options.themeId || {
					storm: "lighting",
					fire: "fire",
					ice: "ice",
					digital: "tech",
					dark: "tech"
				}[biome] || self.runTheme?.id || "lighting");
				self.runTheme = theme;
				const room = generateSingleRoom(`room_${String(this.currentRoomNumber).padStart(2, "0")}`, this.currentRoomNumber - 1, kind, roomSeed, biome, this.currentRoomNumber, void 0, void 0, theme.id);
				this.activeRoom = room;
				self.run = {
					runId: `run_${options.seed}_r${this.currentRoomNumber}`,
					seed: options.seed,
					floor: this.currentRoomNumber,
					totalRooms: 300,
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
						if (!this.textures.exists(textureKey)) textureKey = this.textures.exists(`theme_${theme.id}_floor_0`) ? `theme_${theme.id}_floor_0` : this.textures.exists("tile_stone") ? "tile_stone" : "__WHITE";
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
						const hasFloorBR = isFloorOrWalkable(y + 1, x + 1);
						const hasFloorBL = isFloorOrWalkable(y + 1, x - 1);
						const hasFloorTR = isFloorOrWalkable(y - 1, x + 1);
						const hasFloorTL = isFloorOrWalkable(y - 1, x - 1);
						let wallKey;
						if (hasFloorBelow && hasFloorRight && this.textures.exists(`theme_${theme.id}_corner_outer_tl`)) wallKey = `theme_${theme.id}_corner_outer_tl`;
						else if (hasFloorBelow && hasFloorLeft && this.textures.exists(`theme_${theme.id}_corner_outer_tr`)) wallKey = `theme_${theme.id}_corner_outer_tr`;
						else if (hasFloorAbove && hasFloorRight && this.textures.exists(`theme_${theme.id}_corner_outer_bl`)) wallKey = `theme_${theme.id}_corner_outer_bl`;
						else if (hasFloorAbove && hasFloorLeft && this.textures.exists(`theme_${theme.id}_corner_outer_br`)) wallKey = `theme_${theme.id}_corner_outer_br`;
						else if (!hasFloorBelow && !hasFloorRight && hasFloorBR && this.textures.exists(`theme_${theme.id}_corner_inner_tl`)) wallKey = `theme_${theme.id}_corner_inner_tl`;
						else if (!hasFloorBelow && !hasFloorLeft && hasFloorBL && this.textures.exists(`theme_${theme.id}_corner_inner_tr`)) wallKey = `theme_${theme.id}_corner_inner_tr`;
						else if (!hasFloorAbove && !hasFloorRight && hasFloorTR && this.textures.exists(`theme_${theme.id}_corner_inner_bl`)) wallKey = `theme_${theme.id}_corner_inner_bl`;
						else if (!hasFloorAbove && !hasFloorLeft && hasFloorTL && this.textures.exists(`theme_${theme.id}_corner_inner_br`)) wallKey = `theme_${theme.id}_corner_inner_br`;
						else if (!hasFloorBelow && !hasFloorAbove && !hasFloorLeft && !hasFloorRight) wallKey = theme.tiles.walls.vertical.length > 0 ? `theme_${theme.id}_wall_v_0` : `theme_${theme.id}_wall_h_0`;
						else if (hasFloorBelow && !hasFloorLeft && !hasFloorRight) wallKey = theme.tiles.walls.top.length > 0 ? `theme_${theme.id}_wall_top_0` : `theme_${theme.id}_wall_h_0`;
						else if (hasFloorAbove && !hasFloorLeft && !hasFloorRight) wallKey = theme.tiles.walls.bottom.length > 0 ? `theme_${theme.id}_wall_bottom_0` : `theme_${theme.id}_wall_h_0`;
						else if (hasFloorRight && !hasFloorAbove && !hasFloorBelow) wallKey = theme.tiles.walls.left.length > 0 ? `theme_${theme.id}_wall_left_0` : `theme_${theme.id}_wall_v_0`;
						else if (hasFloorLeft && !hasFloorAbove && !hasFloorBelow) wallKey = theme.tiles.walls.right.length > 0 ? `theme_${theme.id}_wall_right_0` : `theme_${theme.id}_wall_v_0`;
						else if (hasFloorBelow || hasFloorAbove) wallKey = `theme_${theme.id}_wall_h_0`;
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
				if (room.clusters && room.clusters.length > 0) for (const cluster of room.clusters) {
					let texKey;
					let isHazard = false;
					switch (cluster.type) {
						case "rubble":
							texKey = this.textures.exists(`theme_${theme.id}_env_rocks_0`) ? `theme_${theme.id}_env_rocks_0` : this.textures.exists(`theme_${theme.id}_decor_floor_0`) ? `theme_${theme.id}_decor_floor_0` : `theme_${theme.id}_floor_var_0`;
							break;
						case "crystal":
							texKey = this.textures.exists(`theme_${theme.id}_env_elem_0`) ? `theme_${theme.id}_env_elem_0` : this.textures.exists(`theme_${theme.id}_decor_floor_1`) ? `theme_${theme.id}_decor_floor_1` : `theme_${theme.id}_floor_decor_0`;
							break;
						case "energy":
							texKey = this.textures.exists(`theme_${theme.id}_env_ambient_0`) ? `theme_${theme.id}_env_ambient_0` : this.textures.exists(`theme_${theme.id}_decor_floor_0`) ? `theme_${theme.id}_decor_floor_0` : `theme_${theme.id}_floor_decor_1`;
							break;
						case "tech":
							texKey = this.textures.exists(`theme_${theme.id}_decor_med_0`) ? `theme_${theme.id}_decor_med_0` : this.textures.exists(`theme_${theme.id}_env_ruins_0`) ? `theme_${theme.id}_env_ruins_0` : `theme_${theme.id}_floor_decor_0`;
							break;
						case "hazard":
							texKey = this.textures.exists(`theme_${theme.id}_hazard_floor_0`) ? `theme_${theme.id}_hazard_floor_0` : `theme_${theme.id}_floor_crack_0`;
							isHazard = true;
							break;
						default: texKey = this.textures.exists(`theme_${theme.id}_decor_wall_0`) ? `theme_${theme.id}_decor_wall_0` : this.textures.exists(`theme_${theme.id}_env_ruins_0`) ? `theme_${theme.id}_env_ruins_0` : `theme_${theme.id}_wall_spec_0`;
					}
					for (const tilePos of cluster.tiles) {
						if (!this.textures.exists(texKey)) continue;
						const cX = tilePos.x * TILE_SIZE + TILE_SIZE / 2;
						const cY = tilePos.y * TILE_SIZE + TILE_SIZE / 2;
						const cSprite = this.add.image(cX, cY, texKey);
						cSprite.setDisplaySize(TILE_SIZE * .88, TILE_SIZE * .88);
						cSprite.setDepth(isHazard ? RENDER_DEPTH.FLOOR_HAZARD : RENDER_DEPTH.FLOOR_DECOR);
						if (cluster.type === "energy" && theme.accentTint) cSprite.setTint(theme.accentTint);
						this.roomTileObjects.push(cSprite);
					}
				}
				if (room.landmark) {
					const lm = room.landmark;
					const lmKey = this.textures.exists(`theme_${theme.id}_landmark_mono_0`) ? `theme_${theme.id}_landmark_mono_0` : this.textures.exists(`theme_${theme.id}_decor_med_0`) ? `theme_${theme.id}_decor_med_0` : "tile_circuit";
					const lmWidthPx = (lm.size?.width || 2) * TILE_SIZE;
					const lmHeightPx = (lm.size?.height || 2) * TILE_SIZE;
					const lmCenterX = lm.tileX * TILE_SIZE + lmWidthPx / 2;
					const lmCenterY = lm.tileY * TILE_SIZE + lmHeightPx / 2;
					if (this.textures.exists(lmKey)) {
						const lmSprite = this.add.image(lmCenterX, lmCenterY, lmKey);
						lmSprite.setDisplaySize(lmWidthPx * .9, lmHeightPx * .9);
						lmSprite.setDepth(RENDER_DEPTH.WALL_BASE);
						if (theme.accentTint) lmSprite.setTint(theme.accentTint);
						this.roomTileObjects.push(lmSprite);
						this.tweens.add({
							targets: lmSprite,
							alpha: {
								from: .75,
								to: 1
							},
							duration: 1600,
							yoyo: true,
							repeat: -1,
							ease: "Sine.easeInOut"
						});
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
				const midX = Math.floor(room.width / 2);
				const midY = Math.floor(room.height / 2);
				let bestPropTile = {
					x: midX,
					y: midY
				};
				let minPropDist = Infinity;
				for (let py = 1; py < room.height - 1; py++) for (let px = 1; px < room.width - 1; px++) if (room.tiles[py]?.[px] === "floor") {
					if (px === validSpawn.x && py === validSpawn.y || px === room.exit.x && py === room.exit.y) continue;
					const dist = Math.hypot(px - midX, py - midY);
					if (dist < minPropDist) {
						minPropDist = dist;
						bestPropTile = {
							x: px,
							y: py
						};
					}
				}
				const centerX = bestPropTile.x * TILE_SIZE + TILE_SIZE / 2;
				const centerY = bestPropTile.y * TILE_SIZE + TILE_SIZE / 2;
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
					} else if (enemyDef.kind === "miniboss") {
						scale = .95;
						animKey = getEnemyAnimationKey(species, "idle");
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
				options.onRoomChange?.(this.currentRoomNumber, 300, room.title, room.biome, this.currentRoomNumber, room.kind === "boss");
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
				const micro = room.microbiomes?.[0];
				const metrics = room.metrics;
				const infoText = `[DEBUG OVERLAY (TAB)] Room: ${room.id} | Macro: ${room.macroArchetype || "standard"} | Micro: ${micro?.name || "N/A"}\nFloor: ${room.floor} | Kind: ${room.kind} | EmptySpace: ${room.emptySpaceRatio ?? "N/A"} | BFS: ${metrics?.bfsReachableCount ?? "OK"}\nNodes: ${room.graph?.nodes.length || 1} | Loops: ${room.graph?.loopCount || 0} | DeadEnds: ${room.graph?.deadEndCount || 0} | Budget: ${room.budgetUsed ?? "N/A"}`;
				const headerBg = this.add.graphics();
				headerBg.fillStyle(0, .88);
				headerBg.fillRect(8, 8, Math.min(580, room.width * TILE_SIZE - 16), 46);
				headerBg.lineStyle(1, 61695, .9);
				headerBg.strokeRect(8, 8, Math.min(580, room.width * TILE_SIZE - 16), 46);
				this.debugOverlayContainer.add(headerBg);
				const headerTxt = this.add.text(14, 10, infoText, {
					fontFamily: "monospace",
					fontSize: "9px",
					color: "#00f0ff",
					fontStyle: "bold"
				});
				this.debugOverlayContainer.add(headerTxt);
				for (let y = 0; y < room.height; y++) for (let x = 0; x < room.width; x++) {
					const posX = x * TILE_SIZE;
					const posY = y * TILE_SIZE;
					const tileType = room.tiles[y][x];
					const isExit = x === room.exit?.x && y === room.exit?.y;
					const isSpawn = x === room.spawn?.x && y === room.spawn?.y;
					const hasProp = room.props?.some((p) => p.tileX === x && p.tileY === y);
					let label = "F";
					let strokeColor = 65416;
					if (tileType === "wall") {
						label = "W";
						strokeColor = 16724787;
					} else if (isExit) {
						label = "EXIT";
						strokeColor = 16776960;
					} else if (isSpawn) {
						label = "SPWN";
						strokeColor = 65535;
					} else if (hasProp) {
						label = "PROP";
						strokeColor = 16746496;
					}
					const rect = this.add.graphics();
					rect.lineStyle(1, strokeColor, .35);
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
				if (room.clusters && room.clusters.length > 0) {
					const clusterColors = {
						rubble: 11176038,
						crystal: 65535,
						energy: 16776960,
						tech: 65484,
						hazard: 16729088,
						structure: 11158783
					};
					for (const c of room.clusters) {
						const cColor = clusterColors[c.type] || 16777215;
						for (const t of c.tiles) {
							const cRect = this.add.graphics();
							cRect.lineStyle(2, cColor, .85);
							cRect.strokeRect(t.x * TILE_SIZE + 2, t.y * TILE_SIZE + 2, 44, 44);
							this.debugOverlayContainer.add(cRect);
						}
						const cLabel = this.add.text(c.centerX * TILE_SIZE + TILE_SIZE / 2, c.centerY * TILE_SIZE - 4, `[${c.type.toUpperCase()}]`, {
							fontFamily: "monospace",
							fontSize: "8px",
							color: `#${cColor.toString(16).padStart(6, "0")}`,
							backgroundColor: "rgba(0,0,0,0.85)",
							fontStyle: "bold",
							padding: {
								x: 2,
								y: 1
							}
						}).setOrigin(.5);
						this.debugOverlayContainer.add(cLabel);
					}
				}
				if (room.landmark) {
					const lm = room.landmark;
					const lmW = (lm.size?.width || 2) * TILE_SIZE;
					const lmH = (lm.size?.height || 2) * TILE_SIZE;
					const lmRect = this.add.graphics();
					lmRect.lineStyle(3, 16711935, .9);
					lmRect.strokeRect(lm.tileX * TILE_SIZE, lm.tileY * TILE_SIZE, lmW, lmH);
					this.debugOverlayContainer.add(lmRect);
					const lmLbl = this.add.text(lm.tileX * TILE_SIZE + lmW / 2, lm.tileY * TILE_SIZE - 6, `⭐ LANDMARK: ${lm.name}`, {
						fontFamily: "monospace",
						fontSize: "9px",
						color: "#ff00ff",
						backgroundColor: "rgba(0,0,0,0.85)",
						fontStyle: "bold",
						padding: {
							x: 3,
							y: 1
						}
					}).setOrigin(.5);
					this.debugOverlayContainer.add(lmLbl);
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
				const b2Vfx = this.vfxProfile.basic2;
				const speed = b2Vfx.speed || (this.partnerProfile.speciesId === "veemon" ? 360 : 280);
				const { vx, vy } = applyDirectionalVelocity(this.facingDirection, speed);
				const rotation = getProjectileRotation(this.facingDirection);
				this.recordAttackEvent("basic_2", this.facingDirection, spawnPos.x, spawnPos.y, vx, vy, rotation);
				const chargeCircle = this.add.graphics();
				const chargeColor = attackConfig.projectileColor ?? 65535;
				chargeCircle.lineStyle(2, chargeColor, .9);
				chargeCircle.strokeCircle(spawnPos.x, spawnPos.y, 10);
				chargeCircle.setDepth(13);
				this.tweens.add({
					targets: chargeCircle,
					scaleX: 1.8,
					scaleY: 1.8,
					alpha: 0,
					duration: 100,
					onComplete: () => chargeCircle.destroy()
				});
				this.time.delayedCall(90, () => {
					if (!this.scene.isActive()) return;
					let projTexture = b2Vfx.projectileTextureKey;
					if (!projTexture || !this.textures.exists(projTexture)) projTexture = `${manifest.id}_projectile_dragon_0`;
					if (!this.textures.exists(projTexture)) projTexture = `${manifest.id}_projectile_laser_0`;
					if (!this.textures.exists(projTexture)) projTexture = `${manifest.id}_attack_basic_2_0`;
					const projSprite = this.add.sprite(spawnPos.x, spawnPos.y, projTexture);
					projSprite.setScale(b2Vfx.scale || .85);
					projSprite.setRotation(rotation);
					projSprite.setDepth(12);
					if (attackConfig.projectileColor && !b2Vfx.projectileAnimKey) projSprite.setTint(attackConfig.projectileColor);
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
						if (!enemy.sprite.preFX) enemy.sprite.setTint(11184810);
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
						if (this.currentRoomNumber >= 300) options.onSaveCheckpoint?.(300, 300);
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
				if (enemy.kind === "elite" || enemy.kind === "miniboss") {
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
				const bossAlive = this.enemies.some((e) => (e.kind === "boss" || e.kind === "miniboss") && e.state !== "dead");
				if ((this.activeRoom?.kind === "boss" || this.activeRoom?.kind === "miniboss" ? !bossAlive : aliveEnemies.length === 0) && !this.isDoorUnlocked) {
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
					if (this.currentRoomNumber >= 300 && this.bossDefeated) {
						const finalVictoryBanner = this.add.text(this.cameras.main.midPoint.x, this.cameras.main.midPoint.y - 50, `CHEFE FINAL DERROTADO!\nCAMINHO DIGITAL CONQUISTADO (SALA 300)!`, {
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
							enemy.sprite.setAlpha(.6);
							continue;
						} else if (enemy.sprite.alpha < 1) enemy.sprite.setAlpha(1);
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
									const roomSnap = this.currentRoomNumber;
									this.time.delayedCall(160, () => {
										if (enemy.sprite.active && enemy.state !== "dead" && this.currentRoomNumber === roomSnap && !this.isTransitioning) this.spawnEnemyProjectile(enemy.sprite.x, enemy.sprite.y - 10, this.player.x, this.player.y - 15, enemy.attack, enemy.species);
									});
								} else enemy.isAttacking = false;
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
					} else if (distToPlayer < 520) {
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
						if (isWalkable({ tiles: this.activeRoom.tiles }, Math.floor(nextX / TILE_SIZE), Math.floor(nextY / TILE_SIZE))) {
							enemy.sprite.x = nextX;
							enemy.sprite.y = nextY;
						} else if (isWalkable({ tiles: this.activeRoom.tiles }, Math.floor(nextX / TILE_SIZE), Math.floor(enemy.sprite.y / TILE_SIZE))) enemy.sprite.x = nextX;
						else if (isWalkable({ tiles: this.activeRoom.tiles }, Math.floor(enemy.sprite.x / TILE_SIZE), Math.floor(nextY / TILE_SIZE))) enemy.sprite.y = nextY;
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
								const roomSnap = this.currentRoomNumber;
								this.time.delayedCall(120, () => {
									if (!enemy.sprite.active || enemy.state === "dead" || this.currentRoomNumber !== roomSnap || this.isTransitioning) return;
									if (Phaser.Math.Distance.Between(enemy.sprite.x, enemy.sprite.y, this.player.x, this.player.y) <= (enemy.kind === "boss" ? 64 : 48)) this.damagePlayer(enemy.attack);
								});
							} else enemy.isAttacking = false;
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
					if (this.currentRoomNumber >= 300) {
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
				const victoryText = this.add.text(this.cameras.main.midPoint.x, this.cameras.main.midPoint.y - 40, `CAMINHO DIGITAL CONCLUÍDO!\nVOCÊ VENCEU TODAS AS 300 SALAS!`, {
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
						options.onSaveCheckpoint?.(300, 300);
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
	const [totalRooms, setTotalRooms] = (0, import_react.useState)(300);
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
					currentFloor: Math.min(300, nextFloor),
					highestFloor: Math.max(nextFloor, useGame.getState().pet?.digitalPath?.highestFloor ?? 1),
					defeatedBosses: newDefeated,
					completed: nextFloor >= 300 && Boolean(bossDefeated && bossDefeated >= 300)
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
									" / ",
									totalRooms || 300
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
											" / ",
											totalRooms || 300
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
										" / ",
										Math.floor((totalRooms || 300) / 10)
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
						runResult.outcome === "victory" ? roomIndex >= (totalRooms || 300) || floorNumber >= (totalRooms || 300) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-5xl animate-bounce",
								children: "👑"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 text-2xl font-black tracking-wide text-amber-300",
								children: "CAMINHO DIGITAL CONCLUÍDO!"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-slate-200 font-medium",
								children: [
									"Você venceu todas as ",
									totalRooms || 300,
									" salas da expedição e derrotou o Chefe Final!"
								]
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
									children: panel === "inventory" ? "Inventário" : panel === "shop" ? "Loja" : panel === "digital-path" ? "Caminho Digital" : panel === "settings" ? "Configurações" : "Árvore de Evolução"
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Derrote os inimigos para abrir o portão e avançar pelas salas até os Bosses e Marcos de Andar!" })
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
								children: "Escolha uma linha, cuide todos os dias e evolua. O tempo continua mesmo quando você sai."
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
							children: "Começar"
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
