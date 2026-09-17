import { i as __toESM } from "../_runtime.mjs";
import { L as require_react, v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Sparkles, c as HeartPulse, d as Bath, i as Store, l as Coins, n as Utensils, o as RotateCcw, s as Package, t as Volleyball, u as Bed } from "../_libs/lucide-react.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CMeCjzf2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
			sprite: "/sprites/garurumon.png"
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
	const now = Date.now();
	const minutes = Math.min((now - next.lastSimulatedAt) / 6e4, 1440);
	if (minutes < 1) return next;
	const ticks = Math.floor(minutes / 5);
	if (ticks <= 0) {
		next.lastSimulatedAt = now;
		return next;
	}
	if (next.isSleeping) {
		next.energy = clamp(next.energy + ticks * 3);
		next.hunger = clamp(next.hunger - ticks * .4);
	} else {
		next.hunger = clamp(next.hunger - ticks * 1.2);
		next.energy = clamp(next.energy - ticks * .6);
		next.happiness = clamp(next.happiness - ticks * .5);
		next.hygiene = clamp(next.hygiene - ticks * .7);
	}
	if (next.hunger < 20 || next.hygiene < 20 || next.energy < 15) next.health = clamp(next.health - ticks * .8);
	else if (next.hunger > 60 && next.hygiene > 60 && next.energy > 50) next.health = clamp(next.health + ticks * .3);
	next.lastSimulatedAt = now;
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
			animation: "eat"
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
			animation: "play"
		}
	};
}
function sleepToggle(pet) {
	const next = {
		...pet,
		inventory: { ...pet.inventory },
		isSleeping: !pet.isSleeping
	};
	if (next.isSleeping) return {
		pet: next,
		result: {
			ok: true,
			msg: `${currentName(next)} foi dormir`,
			animation: "sleep"
		}
	};
	return {
		pet: next,
		result: {
			ok: true,
			msg: `${currentName(next)} acordou`,
			animation: "wake"
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
			animation: "clean"
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
			animation: "heal"
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
			animation: "evolve"
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
	hasSave: () => Boolean(loadSave()),
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
	setPanel: (panel) => set({ panel }),
	reset: () => {
		try {
			localStorage.removeItem(SAVE_KEY);
		} catch {}
		set({
			pet: null,
			screen: "start",
			panel: null,
			speech: "",
			anim: ""
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
		const { pet } = get();
		if (!pet) return null;
		const { pet: next, result } = fn(pet);
		persist(next);
		set({
			pet: next,
			speech: result.msg,
			anim: result.animation ?? "",
			panel: result.ok && result.animation ? null : get().panel
		});
		if (typeof window !== "undefined") window.setTimeout(() => {
			if (useGame.getState().speech === result.msg) useGame.setState({
				speech: "",
				anim: ""
			});
		}, 2200);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-dvh max-w-3xl flex-col px-4 py-6 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-center font-display text-2xl font-semibold tracking-tight",
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
						className: cn("flex flex-col items-center rounded-xl border bg-surface p-4 text-center transition-colors duration-150", selected === id ? "border-accent" : "border-border"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-28 w-full items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: line.sprite,
									alt: "",
									className: "pixel max-h-28 max-w-full object-contain"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 text-sm font-semibold",
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
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: !selected,
				onClick: () => selected && choose(selected),
				className: "mx-auto mt-8 h-12 w-full max-w-xs rounded-xl bg-accent text-sm font-semibold text-accent-fg disabled:opacity-40",
				children: "Confirmar escolha"
			})
		]
	});
}
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
	const panel = useGame((s) => s.panel);
	const setPanel = useGame((s) => s.setPanel);
	const tick = useGame((s) => s.tick);
	const reset = useGame((s) => s.reset);
	const [animKey, setAnimKey] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(tick, 3e4);
		return () => window.clearInterval(id);
	}, [tick]);
	(0, import_react.useEffect)(() => {
		if (anim) setAnimKey((k) => k + 1);
	}, [anim]);
	if (!pet) return null;
	const name = currentName(pet);
	const sprite = currentSprite(pet);
	const mood = getMood(pet);
	const sleeping = pet.isSleeping;
	const petClass = anim === "clean" ? "pet-shake" : anim === "eat" || anim === "play" || anim === "heal" || anim === "evolve" || anim === "wake" ? "pet-hop" : sleeping ? "opacity-80" : "pet-idle";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-dvh max-w-lg flex-col bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative z-20 flex items-center justify-between px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold",
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
					className: "flex items-center gap-2 rounded-full border border-border bg-elevated px-3 py-1.5 text-sm font-medium tabular-nums",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coins, { className: "size-3.5 text-muted" }), pet.coins]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: cn("relative z-0 flex h-[42vh] min-h-[220px] max-h-[360px] shrink-0 items-center justify-center overflow-hidden", sleeping ? "room-night" : "room-day"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-black/20" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("relative z-10", petClass),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: sprite,
							alt: name,
							className: "pixel h-[180px] w-auto max-w-[70vw] object-contain object-bottom sm:h-[210px]"
						})
					}, animKey),
					speech ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "absolute bottom-3 left-1/2 z-20 max-w-[85%] -translate-x-1/2 rounded-2xl bg-fg px-3 py-1.5 text-center text-xs font-medium text-bg",
						children: speech
					}) : null,
					mood !== "idle" && mood !== "happy" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute right-4 top-4 rounded-full border border-border bg-surface px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-muted",
						children: moodLabel(mood)
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "space-y-2 px-4 py-3",
				children: STATS.map((s) => {
					const value = pet[s.key];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[88px_1fr_32px] items-center gap-2 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: s.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-2 overflow-hidden rounded-full bg-elevated",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: cn("h-full rounded-full transition-[width] duration-500", s.cls),
									style: { width: `${value}%` }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-right tabular-nums font-medium",
								children: value
							})
						]
					}, s.key);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "grid grid-cols-5 gap-2 px-3 pb-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
						icon: Utensils,
						label: "Comer",
						onClick: () => actions.feed()
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
						icon: Volleyball,
						label: "Brincar",
						onClick: () => actions.play()
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
						icon: Bed,
						label: sleeping ? "Acordar" : "Dormir",
						onClick: () => actions.sleep()
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
						icon: Bath,
						label: "Banho",
						onClick: () => actions.clean()
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
						icon: HeartPulse,
						label: "Saude",
						onClick: () => actions.heal()
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "mb-10 grid grid-cols-4 gap-1 border-t border-border px-2 py-2",
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
			}),
			panel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-40 flex items-end justify-center bg-black/60 p-3 sm:items-center",
				onClick: () => setPanel(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-h-[78vh] w-full max-w-md overflow-y-auto rounded-xl border border-border bg-surface p-5",
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-base font-semibold",
								children: panel === "inventory" ? "Inventario" : panel === "shop" ? "Loja" : "Evolucao"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "text-sm text-muted",
								onClick: () => setPanel(null),
								children: "Fechar"
							})]
						}),
						panel === "inventory" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inventory, {}) : null,
						panel === "shop" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shop, {}) : null,
						panel === "evolution" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Evolution, {}) : null
					]
				})
			}) : null
		]
	});
}
function Action({ icon: Icon, label, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: "flex min-h-14 flex-col items-center justify-center gap-1 rounded-lg bg-elevated text-[11px] font-medium text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-muted" }), label]
	});
}
function NavBtn({ icon: Icon, label, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: "flex min-h-11 items-center justify-center gap-1.5 rounded-md text-xs font-medium text-muted",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" }), label]
	});
}
function Inventory() {
	const pet = useGame((s) => s.pet);
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
				onClick: () => actions.use(id),
				className: "rounded-lg border border-border bg-elevated p-3 text-left",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: item.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: item.desc
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-xs tabular-nums text-subtle",
						children: ["x", qty]
					})
				]
			}, id);
		})
	});
}
function Shop() {
	if (!useGame((s) => s.pet)) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-2 gap-2",
		children: Object.values(ITEMS).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => actions.buy(item.id),
			className: "rounded-lg border border-border bg-elevated p-3 text-left",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: item.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted",
					children: item.desc
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-xs tabular-nums font-medium",
					children: [item.price, " moedas"]
				})
			]
		}, item.id))
	});
}
function Evolution() {
	const pet = useGame((s) => s.pet);
	if (!pet) return null;
	const list = LINES[pet.lineId]?.evolutions ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm text-muted",
			children: [
				"Forma atual: ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-fg",
					children: currentName(pet)
				}),
				" · Nv. ",
				pet.level
			]
		}), list.map((evo, idx) => {
			const unlocked = pet.evolutionStage >= idx;
			const nextNeeded = pet.evolutionStage + 1 === idx;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("rounded-lg border p-3", unlocked ? "border-happy/50" : nextNeeded ? "border-accent" : "border-border"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm font-medium",
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
					onClick: () => actions.evolve(),
					className: "mt-3 h-10 rounded-lg bg-accent px-4 text-sm font-semibold text-accent-fg",
					children: "Evoluir"
				}) : null]
			}, evo.id);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-dvh flex-col items-center justify-center bg-bg px-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-xs font-medium tracking-[0.28em] text-muted uppercase",
				children: "Parceiro digital"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl",
				children: "Digital Pet"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-sm text-sm leading-relaxed text-muted",
				children: "Escolha uma linha, cuide todos os dias e evolua. O tempo continua mesmo quando voce sai."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 flex w-full max-w-xs flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: startNew,
					className: "h-12 rounded-xl bg-accent text-sm font-semibold text-accent-fg transition-transform duration-150 active:scale-[0.98]",
					children: "Comecar"
				}), saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => continueSave(),
					className: "h-12 rounded-xl border border-border bg-elevated text-sm font-medium text-fg transition-transform duration-150 active:scale-[0.98]",
					children: "Continuar"
				}) : null]
			})
		]
	});
}
function Home() {
	const screen = useGame((s) => s.screen);
	if (screen === "choose") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChooseScreen, {});
	if (screen === "play") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayScreen, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StartScreen, {});
}
//#endregion
export { Home as component };
