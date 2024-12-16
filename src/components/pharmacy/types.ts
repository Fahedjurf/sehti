export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  usage: string;
  sideEffects: string;
  fullDescription: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CardDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  name: string;
}