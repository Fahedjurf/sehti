import { Prescription } from "./types";

export const samplePrescriptions: Prescription[] = [
  {
    id: 1,
    name: "Amoxicillin",
    dosage: "500mg",
    frequency: "Take one capsule three times daily with meals. Space doses evenly throughout the day (morning, afternoon, and evening).",
    price: 15.99,
    sideEffects: "Common side effects may include: diarrhea, nausea, stomach pain, headache, or rash. Seek immediate medical attention if you experience severe allergic reactions, severe diarrhea, or unusual bleeding/bruising.",
    description: "Amoxicillin is a penicillin antibiotic that fights bacteria. It is used to treat many different types of infection caused by bacteria, such as tonsillitis, bronchitis, pneumonia, and infections of the ear, nose, throat, skin, or urinary tract."
  },
  {
    id: 2,
    name: "Ibuprofen",
    dosage: "400mg",
    frequency: "Take one tablet every 4-6 hours as needed for pain. Do not exceed 6 tablets in 24 hours unless directed by your healthcare provider.",
    price: 8.99,
    sideEffects: "Common side effects include: stomach pain, heartburn, nausea, headache. Serious side effects may include: stomach bleeding, kidney problems, high blood pressure. Seek medical attention if you experience any severe symptoms.",
    description: "Ibuprofen is a nonsteroidal anti-inflammatory drug (NSAID). It works by reducing hormones that cause inflammation and pain in the body. It's commonly used to reduce fever and treat pain or inflammation."
  }
];