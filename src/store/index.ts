import { atom } from "jotai";

export interface seriesInterface {
  x: Date;
  y: string[];
}

export const seriesAtom = atom<seriesInterface[]>([])  
export const symbolAtom = atom<string>('BTCUSDT')
export const intervalAtom = atom<string>('1h')