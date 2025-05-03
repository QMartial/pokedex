export interface Pokemon {
  pokedex_id: number;
  generation: number;
  category: string;
  name: Name;
  sprites: Sprites;
  types: Type[];
  talents: Talent[];
  stats: Stats;
  resistances: Resistance[];
  evolution: Evolution;
  height: string;
  weight: string;
  egg_groups: string[];
  sexe: Sexe;
  catch_rate: number;
  level_100: number;
  formes: string | null;
}

export interface Name {
  fr: string;
  en: string;
  jp: string;
}

export interface Sprites {
  regular: string;
  shiny: string;
  gmax: string | null;
}

export interface Type {
  name: string;
  image: string;
}

export interface Talent {
  name: string;
  tc: boolean;
}

export interface Stats {
  hp: number;
  atk: number;
  def: number;
  spe_atk: number;
  spe_def: number;
  vit: number;
}

export interface Resistance {
  name: string;
  multiplier: number;
}

export interface Evolution {
  pre: number | null;
  next: NextEvolution[];
  mega: number | null;
}

export interface NextEvolution {
  pokedex_id: number;
  name: string;
  condition: string;
}

export interface Sexe {
  male: number;
  female: number;
}
