export type Gender = 'male' | 'female' | 'non-binary' | 'prefer-not-to-say';

export interface FamilyMember {
  readonly id: string;
  readonly firstName: string;
  readonly middleName: string;
  readonly lastName: string;
  readonly maidenName: string;
  readonly clanId: string;
  readonly birthDate: string;
  readonly deathDate: string;
  readonly gender: Gender;
  readonly biography: string;
  readonly placeOfBirth: string;
  readonly currentLocation: string;
  readonly parents: readonly string[];
  readonly children: readonly string[];
  readonly spouses: readonly string[];
  readonly photoUrl: string;
  readonly notes: string;
}
