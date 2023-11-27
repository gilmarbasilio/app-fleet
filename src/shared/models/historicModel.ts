export type HistoricStatus = "departed" | "arrived";

export interface Historic {
  id: string;
  licensePlate: string;
  description: string;
  status: HistoricStatus;
  userId: string;
  createdAt: string;
  updatedAt: string;
  coords?: Coords[];
}

export interface Coords {
  latitude: number;
  longitude: number;
  timestamp: number;
}
