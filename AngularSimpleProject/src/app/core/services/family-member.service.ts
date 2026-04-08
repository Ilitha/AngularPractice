import { Injectable, signal } from '@angular/core';
import { FamilyMember } from '../models/family-member.model';

const MOCK_MEMBERS: FamilyMember[] = [
  {
    id: '1',
    firstName: 'Sipho',
    middleName: 'Bongani',
    lastName: 'Dlamini',
    maidenName: '',
    clanId: '1',
    birthDate: '1945-03-15',
    deathDate: '2010-07-22',
    gender: 'male',
    biography: 'A respected elder known for his storytelling and preservation of clan traditions.',
    placeOfBirth: 'Durban, KwaZulu-Natal',
    currentLocation: '',
    parents: [],
    children: ['2', '3'],
    spouses: [],
    photoUrl: '',
    notes: 'Keeper of the clan\'s oral history.',
  },
  {
    id: '2',
    firstName: 'Nomsa',
    middleName: 'Thandiwe',
    lastName: 'Dlamini',
    maidenName: 'Ngcobo',
    clanId: '1',
    birthDate: '1970-06-10',
    deathDate: '',
    gender: 'female',
    biography: 'Daughter of Sipho, active in preserving cultural heritage through education.',
    placeOfBirth: 'Durban, KwaZulu-Natal',
    currentLocation: 'Johannesburg, Gauteng',
    parents: ['1'],
    children: [],
    spouses: [],
    photoUrl: '',
    notes: '',
  },
  {
    id: '3',
    firstName: 'Thabo',
    middleName: '',
    lastName: 'Dlamini',
    maidenName: '',
    clanId: '1',
    birthDate: '1975-11-28',
    deathDate: '',
    gender: 'male',
    biography: 'Son of Sipho, passionate about genealogy and digital preservation.',
    placeOfBirth: 'Durban, KwaZulu-Natal',
    currentLocation: 'Cape Town, Western Cape',
    parents: ['1'],
    children: [],
    spouses: [],
    photoUrl: '',
    notes: '',
  },
];

@Injectable({ providedIn: 'root' })
export class FamilyMemberService {
  private readonly _members = signal<FamilyMember[]>(MOCK_MEMBERS);
  readonly members = this._members.asReadonly();

  getMemberById(id: string): FamilyMember | undefined {
    return this._members().find(m => m.id === id);
  }

  addMember(member: Omit<FamilyMember, 'id'>): void {
    const newMember: FamilyMember = { ...member, id: crypto.randomUUID() };
    this._members.update(members => [...members, newMember]);
  }

  updateMember(id: string, updates: Partial<Omit<FamilyMember, 'id'>>): void {
    this._members.update(members =>
      members.map(m => (m.id === id ? { ...m, ...updates } : m))
    );
  }

  deleteMember(id: string): void {
    this._members.update(members => members.filter(m => m.id !== id));
  }
}
