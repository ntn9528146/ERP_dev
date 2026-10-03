export interface KindergartenClassData {
  classLevel: string;
  subjects: { code: string; name: string; type: 'Core' | 'Activity' }[];
}

export const kindergartenSubjects: Record<string, KindergartenClassData> = {
  'Nursery': {
    classLevel: 'Nursery',
    subjects: [
      { code: 'NUR-ENG', name: 'English Rhymes & Phonics', type: 'Core' },
      { code: 'NUR-MAT', name: 'Numbers & Shapes', type: 'Core' },
      { code: 'NUR-ART', name: 'Coloring & Fine Motor Craft', type: 'Activity' },
      { code: 'NUR-EVS', name: 'General Awareness (My World)', type: 'Activity' },
    ],
  },
  'LKG': {
    classLevel: 'LKG',
    subjects: [
      { code: 'LKG-ENG', name: 'English Alphabet & Letter Formation', type: 'Core' },
      { code: 'LKG-HIN', name: 'Hindi Varnamala (Swar)', type: 'Core' },
      { code: 'LKG-MAT', name: 'Basic Mathematics (1-50 Count)', type: 'Core' },
      { code: 'LKG-EVS', name: 'Environmental Concepts & Nature', type: 'Activity' },
    ],
  },
  'UKG': {
    classLevel: 'UKG',
    subjects: [
      { code: 'UKG-ENG', name: 'English Phonics & Simple Words', type: 'Core' },
      { code: 'UKG-HIN', name: 'Hindi Varnamala (Vyanjan & Matras)', type: 'Core' },
      { code: 'UKG-MAT', name: 'Arithmetic Pre-math & Shapes', type: 'Core' },
      { code: 'UKG-EVS', name: 'Environmental Science Concepts', type: 'Activity' },
      { code: 'UKG-ART', name: 'Visual Arts & Creative Expression', type: 'Activity' },
    ],
  },
};
