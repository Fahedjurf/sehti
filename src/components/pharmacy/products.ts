import { Product } from "./types";

export const products: Product[] = [
  {
    id: 1,
    name: "Paracetamol",
    price: 5.99,
    description: "Pain relief medication",
    image: "/lovable-uploads/03aff553-6351-4e70-8869-24d4de36372c.png",
    usage: "Take 1-2 tablets every 4-6 hours as needed. Do not exceed 8 tablets in 24 hours.",
    sideEffects: "Rare side effects may include: liver problems, skin rash, blood disorders. Seek medical attention if you experience any unusual symptoms.",
    fullDescription: "Paracetamol is a common pain reliever and fever reducer. It's used to treat many conditions such as headache, muscle aches, arthritis, backache, toothaches, colds, and fevers."
  },
  {
    id: 2,
    name: "Vitamin C",
    price: 12.99,
    description: "Immune system support",
    image: "/placeholder.svg",
    usage: "Take 1 tablet daily with food, or as directed by your healthcare provider.",
    sideEffects: "High doses may cause nausea, diarrhea, or stomach cramps. Generally safe when taken as directed.",
    fullDescription: "Vitamin C is an essential nutrient that supports immune function, helps form collagen, and acts as an antioxidant protecting cells from damage."
  },
  {
    id: 3,
    name: "First Aid Kit",
    price: 24.99,
    description: "Basic medical supplies",
    image: "/placeholder.svg",
    usage: "Keep in an easily accessible location. Replace items as they are used or expire.",
    sideEffects: "No side effects. Ensure proper cleaning and application of medical supplies to prevent infection.",
    fullDescription: "Contains essential supplies for treating minor injuries: bandages, antiseptic wipes, gauze, scissors, tape, and basic medications."
  },
  {
    id: 4,
    name: "Bandages",
    price: 8.99,
    description: "Sterile wound dressing",
    image: "/placeholder.svg",
    usage: "Clean wound area before application. Replace bandage daily or when soiled.",
    sideEffects: "Some individuals may experience skin irritation from adhesive. Ensure proper air circulation to wound site.",
    fullDescription: "Sterile adhesive bandages designed for protecting minor cuts, scrapes, and wounds from contamination while promoting healing."
  },
];