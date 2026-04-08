export interface Clan {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly originRegion: string;
  readonly notes: string;
  readonly surnames: readonly string[];
  readonly traditions: readonly string[];
}
