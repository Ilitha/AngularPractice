export type RelationshipType = 'parent-child' | 'spouse' | 'sibling';

export interface FamilyRelationship {
  readonly id: string;
  readonly fromMemberId: string;
  readonly toMemberId: string;
  readonly type: RelationshipType;
}
