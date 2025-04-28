export interface filters {
    used?: boolean;
    new?: boolean;
    makes?: string[];
    maxPrice?: string | null;
    fromYear?: string | null;
    toYear?: string | null;
    q?: string | null;
  }