import { Injectable, signal } from '@angular/core';
import { Clan } from '../models/clan.model';

const MOCK_CLANS: Clan[] = [
  {
    id: '1',
    name: 'Dlamini',
    description: 'A prominent Zulu royal clan with deep ancestral roots in southern Africa.',
    originRegion: 'KwaZulu-Natal, South Africa',
    notes: 'Connected to the Zulu royal house.',
    surnames: ['Dlamini', 'Zulu'],
    traditions: ['Ukubuyisa', 'Umabo'],
  },
  {
    id: '2',
    name: 'Ngcobo',
    description: 'A clan originating from the amaZulu nation.',
    originRegion: 'Eastern Cape, South Africa',
    notes: 'Known for oral history traditions.',
    surnames: ['Ngcobo', 'Cele'],
    traditions: ['Ukweshwama', 'Umkhosi woMhlanga'],
  },
];

@Injectable({ providedIn: 'root' })
export class ClanService {
  private readonly _clans = signal<Clan[]>(MOCK_CLANS);
  readonly clans = this._clans.asReadonly();

  getClanById(id: string): Clan | undefined {
    return this._clans().find(c => c.id === id);
  }

  addClan(clan: Omit<Clan, 'id'>): void {
    const newClan: Clan = { ...clan, id: crypto.randomUUID() };
    this._clans.update(clans => [...clans, newClan]);
  }

  updateClan(id: string, updates: Partial<Omit<Clan, 'id'>>): void {
    this._clans.update(clans =>
      clans.map(c => (c.id === id ? { ...c, ...updates } : c))
    );
  }

  deleteClan(id: string): void {
    this._clans.update(clans => clans.filter(c => c.id !== id));
  }
}
