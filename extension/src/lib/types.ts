export type Evidence = { url: string; stance: 'support'|'contradict'|'neutral'; score?: number; title?: string; date?: string }
export type Claim = { text: string; spans?: [number, number][], evidence?: Evidence[], confidence?: 'low'|'medium'|'high', notes?: string }
export type VerifyResponse = { url: string; claims: Claim[]; spin_flags: any[] }
