export interface Message {
  id: number;
  text: string;
  sender: "patient" | "doctor";
  timestamp: Date;
}

export interface Prescription {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  price: number;
  sideEffects: string;
  description: string;
}