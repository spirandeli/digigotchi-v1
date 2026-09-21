import type { RunRNG } from "./rng";
import type { BiomeKind, MicrobiomeDef } from "./types";

export interface MacrobiomeProfile {
  id: string;
  name: string;
  themeId: "lighting" | "fire" | "ice" | "tech";
  biome: BiomeKind;
  description: string;
  microbiomes: readonly MicrobiomeDef[];
}

export const MACROBIOMES_REGISTRY: Record<string, MacrobiomeProfile> = {
  // ── FIRE (Câmara de Magma Digital) ───────────────────────────
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
        floorVariantBias: 0.15,
        hazardChance: 0.7,
        accentColors: [0xff4400, 0xff8800],
        allowedClusterTypes: ["hazard", "rubble", "structure"],
        titleModifier: "da Caldeira",
      },
      {
        id: "ash_field",
        name: "Campo de Cinzas Digitais",
        description: "Solo calcinado coberto por fragmentos queimados",
        floorVariantBias: 0.12,
        hazardChance: 0.2,
        accentColors: [0x553322, 0x884422],
        allowedClusterTypes: ["rubble", "structure"],
        titleModifier: "das Cinzas",
      },
      {
        id: "obsidian_chasm",
        name: "Fissura de Obsidiana",
        description: "Rochas vitrificadas e formações escuras cortantes",
        floorVariantBias: 0.1,
        hazardChance: 0.4,
        accentColors: [0x331100, 0xaa3300],
        allowedClusterTypes: ["crystal", "rubble"],
        titleModifier: "do Abismo de Obsidiana",
      },
      {
        id: "molten_forge",
        name: "Forja Ancestral",
        description: "Instalação industrial desativada de forjamento de dados",
        floorVariantBias: 0.08,
        hazardChance: 0.3,
        accentColors: [0xffaa00, 0xcc5500],
        allowedClusterTypes: ["structure", "rubble", "hazard"],
        titleModifier: "da Forja",
      },
    ],
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
        floorVariantBias: 0.14,
        hazardChance: 0.25,
        accentColors: [0xaa4422, 0xff5500],
        allowedClusterTypes: ["rubble", "structure"],
        titleModifier: "dos Escombros",
      },
      {
        id: "scorch_barracks",
        name: "Alojamento Queimado",
        description: "Salas fortificadas tomadas por cinzas",
        floorVariantBias: 0.1,
        hazardChance: 0.15,
        accentColors: [0x773311, 0xcc4400],
        allowedClusterTypes: ["structure", "rubble"],
        titleModifier: "da Guarda Queimada",
      },
      {
        id: "magma_reservoir",
        name: "Reservatório de Magma",
        description: "Tanques rompidos inundando o solo com rocha líquida",
        floorVariantBias: 0.18,
        hazardChance: 0.8,
        accentColors: [0xff3300, 0xffaa00],
        allowedClusterTypes: ["hazard", "structure"],
        titleModifier: "do Reservatório",
      },
      {
        id: "armory_ruins",
        name: "Armaria em Chamas",
        description: "Depósitos e contêineres de suprimentos protegidos",
        floorVariantBias: 0.08,
        hazardChance: 0.2,
        accentColors: [0xcc6600, 0xff7700],
        allowedClusterTypes: ["structure", "rubble"],
        titleModifier: "do Arsenal",
      },
    ],
  },

  // ── ICE (Geleira Glacial Digital) ───────────────────────────
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
        floorVariantBias: 0.16,
        hazardChance: 0.2,
        accentColors: [0x00ccff, 0x88eeff],
        allowedClusterTypes: ["crystal", "structure"],
        titleModifier: "dos Cristais",
      },
      {
        id: "frost_abyss",
        name: "Abismo Gélido",
        description: "Fissuras profundas com ar congelante e visibilidade reduzida",
        floorVariantBias: 0.12,
        hazardChance: 0.5,
        accentColors: [0x0088cc, 0x00ffff],
        allowedClusterTypes: ["hazard", "crystal"],
        titleModifier: "do Vórtice Polar",
      },
      {
        id: "frozen_archives",
        name: "Arquivos Subzero",
        description: "Monólitos de dados petrificados em gelo eterno",
        floorVariantBias: 0.08,
        hazardChance: 0.1,
        accentColors: [0x55bbff, 0xaaddff],
        allowedClusterTypes: ["structure", "crystal"],
        titleModifier: "do Arquivo Congelado",
      },
      {
        id: "permafrost_halls",
        name: "Salões de Permafrost",
        description: "Solo compacto e escorregadio com alta mobilidade",
        floorVariantBias: 0.1,
        hazardChance: 0.3,
        accentColors: [0x77ddff, 0x3399dd],
        allowedClusterTypes: ["rubble", "crystal"],
        titleModifier: "do Permafrost",
      },
    ],
  },

  // ── LIGHTING / STORM (Rede Elétrica Digital) ─────────────────
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
        floorVariantBias: 0.15,
        hazardChance: 0.65,
        accentColors: [0x00ffff, 0xffff00],
        allowedClusterTypes: ["energy", "hazard", "structure"],
        titleModifier: "da Subestação",
      },
      {
        id: "frequency_lab",
        name: "Laboratório de Frequência",
        description: "Sensores de medição e terminais de calibragem",
        floorVariantBias: 0.1,
        hazardChance: 0.2,
        accentColors: [0x00f0ff, 0x88ffff],
        allowedClusterTypes: ["tech", "energy"],
        titleModifier: "da Ressonância",
      },
      {
        id: "capacitor_vault",
        name: "Cofre de Capacitores",
        description: "Grandes acumuladores de energia pulsando em ritmo constante",
        floorVariantBias: 0.08,
        hazardChance: 0.3,
        accentColors: [0x00e0ff, 0xffea00],
        allowedClusterTypes: ["structure", "energy"],
        titleModifier: "dos Capacitores",
      },
      {
        id: "storm_chasm",
        name: "Fenda Eletrostática",
        description: "Vão aberto cruzado por arcos elétricos de alta intensidade",
        floorVariantBias: 0.18,
        hazardChance: 0.8,
        accentColors: [0x33ffff, 0x00ffaa],
        allowedClusterTypes: ["hazard", "energy"],
        titleModifier: "da Tempestade",
      },
    ],
  },

  // ── TECH (Laboratório Cyber Core) ───────────────────────────
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
        floorVariantBias: 0.1,
        hazardChance: 0.1,
        accentColors: [0x39ff14, 0x00ff66],
        allowedClusterTypes: ["tech", "structure"],
        titleModifier: "do Mainframe",
      },
      {
        id: "data_conduit",
        name: "Conduíte de Feixe de Dados",
        description: "Canais rápidos de transmissão com linhas de neon pulsantes",
        floorVariantBias: 0.14,
        hazardChance: 0.3,
        accentColors: [0x00ff88, 0x70ff70],
        allowedClusterTypes: ["energy", "tech"],
        titleModifier: "do Conduíte",
      },
      {
        id: "quantum_vault",
        name: "Câmara Quântica",
        description: "Salas isoladas onde algoritmos raros ficam selados",
        floorVariantBias: 0.06,
        hazardChance: 0.15,
        accentColors: [0x55ff55, 0x00cc44],
        allowedClusterTypes: ["structure", "tech"],
        titleModifier: "do Núcleo Quântico",
      },
      {
        id: "corrupted_archive",
        name: "Arquivo Corrompido",
        description: "Setores desestabilizados por lixo de memória e bugs",
        floorVariantBias: 0.16,
        hazardChance: 0.5,
        accentColors: [0xff0055, 0x39ff14],
        allowedClusterTypes: ["hazard", "tech", "rubble"],
        titleModifier: "do Setor Glitch",
      },
    ],
  },
};

export function selectBiomesForRun(
  themeId: "lighting" | "fire" | "ice" | "tech",
  rng: RunRNG
): { macro: MacrobiomeProfile; activeMicrobiomes: readonly MicrobiomeDef[] } {
  const matchingMacros = Object.values(MACROBIOMES_REGISTRY).filter((m) => m.themeId === themeId);
  const macro = matchingMacros.length > 0 ? rng.pick(matchingMacros) : MACROBIOMES_REGISTRY.storm_power_grid;

  // Pick 2 to 4 microbiomes from the macrobiome
  const shuffled = [...macro.microbiomes].sort(() => rng.next() - 0.5);
  const count = rng.int(2, Math.min(4, shuffled.length));
  const activeMicrobiomes = shuffled.slice(0, count);

  return { macro, activeMicrobiomes };
}
