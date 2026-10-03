export interface ClassConfig {
  id: string;
  name: string;
  category: 'Pre-Primary' | 'Primary' | 'Middle' | 'Secondary' | 'Senior Secondary';
  streams?: string[];
  defaultSubjects: string[];
}

export const ACADEMIC_CLASSES: ClassConfig[] = [
  { id: 'NURSERY', name: 'Nursery', category: 'Pre-Primary', defaultSubjects: ['Rhymes & Storytelling', 'Phonics & Basic Letters', 'Number Fun & Shapes', 'Creative Art & Coloring'] },
  { id: 'LKG', name: 'LKG (Lower Kindergarten)', category: 'Pre-Primary', defaultSubjects: ['English Alphabet & Sight Words', 'Hindi Akshar Gyan', 'Mathematics (1-50 Counting)', 'Environmental Awareness (EVS)', 'Art & Craft'] },
  { id: 'UKG', name: 'UKG (Upper Kindergarten)', category: 'Pre-Primary', defaultSubjects: ['English Phonics & Sentences', 'Hindi Varnamala & Matras', 'Mathematics (Addition/Subtraction Basics)', 'General Science & Plants', 'Drawing & Motor Skills'] },
  { id: 'CLASS_1', name: 'Class 1', category: 'Primary', defaultSubjects: ['English Marigold', 'Hindi Rimjhim', 'Mathematics Math-Magic', 'Environmental Studies (EVS)', 'Computer Basics', 'Art & Craft'] },
  { id: 'CLASS_2', name: 'Class 2', category: 'Primary', defaultSubjects: ['English Literature & Grammar', 'Hindi Bhasha & Vyakaran', 'Mathematics & Tables', 'Environmental Studies', 'Coding & Computer Fun', 'General Knowledge'] },
  { id: 'CLASS_3', name: 'Class 3', category: 'Primary', defaultSubjects: ['English Language & Composition', 'Hindi Vyakaran', 'Mathematics Mental Math', 'Science & Environment', 'Social Studies (Our Surroundings)', 'Computer Studies'] },
  { id: 'CLASS_4', name: 'Class 4', category: 'Primary', defaultSubjects: ['English Coursebook', 'Hindi Sahitya & Vyakaran', 'Mathematics & Geometry Basics', 'Science Explorations', 'Social Studies', 'ICT & Robotics Basics'] },
  { id: 'CLASS_5', name: 'Class 5', category: 'Primary', defaultSubjects: ['English Reader & Writing', 'Hindi Bhasha', 'Mathematics Fractions & Decimals', 'General Science', 'Social Studies India & Heritage', 'Computer Science & Scratch'] },
  { id: 'CLASS_6', name: 'Class 6', category: 'Middle', defaultSubjects: ['English Honeycomb', 'Hindi Vasant', 'Sanskrit Ruchira', 'Mathematics (Integers, Algebra)', 'Science (Physics, Chem, Bio intro)', 'Social Science (History, Civics, Geo)', 'Artificial Intelligence Foundations'] },
  { id: 'CLASS_7', name: 'Class 7', category: 'Middle', defaultSubjects: ['English An Alien Hand', 'Hindi Mahabharat & Vasant', 'Sanskrit', 'Mathematics Lines & Angles', 'Science Nutrition & Motion', 'Social Science Our Environment', 'Computer Science & Python Turtle'] },
  { id: 'CLASS_8', name: 'Class 8', category: 'Middle', defaultSubjects: ['English Honeydew', 'Hindi Bharat Ki Khoj', 'Sanskrit', 'Mathematics Rational Numbers', 'Science Cells, Force & Light', 'Social Science Resources & Modern India', 'Robotics & Microcontroller Tech'] },
  { id: 'CLASS_9', name: 'Class 9', category: 'Secondary', defaultSubjects: ['English Language & Literature (184)', 'Hindi Course A/B (002/085)', 'Mathematics Standard/Basic (041/241)', 'Science Matter, Gravitation & Tissues (086)', 'Social Science Democratic Politics & Geo (087)', 'Information Technology (402)'] },
  { id: 'CLASS_10', name: 'Class 10 (Board)', category: 'Secondary', defaultSubjects: ['English First Flight & Footprints (184)', 'Hindi Sparsh/Kshitij', 'Mathematics Standard/Basic (041/241)', 'Science Carbon, Electricity & Life Processes (086)', 'Social Science India & Contemporary World (087)', 'Artificial Intelligence (417)'] },
  { id: 'CLASS_11_SCI', name: 'Class 11 - Science', category: 'Senior Secondary', streams: ['PCM', 'PCB', 'PCMB'], defaultSubjects: ['English Core (301)', 'Physics (042)', 'Chemistry (043)', 'Mathematics (041)', 'Biology (044)', 'Computer Science (083)', 'Physical Education (048)'] },
  { id: 'CLASS_11_COM', name: 'Class 11 - Commerce', category: 'Senior Secondary', streams: ['Commerce With Math', 'Commerce Without Math'], defaultSubjects: ['English Core (301)', 'Accountancy (055)', 'Business Studies (054)', 'Economics (030)', 'Applied Mathematics (241)', 'Informatics Practices (065)'] },
  { id: 'CLASS_11_HUM', name: 'Class 11 - Humanities / Arts', category: 'Senior Secondary', streams: ['Arts Core'], defaultSubjects: ['English Core (301)', 'History (027)', 'Political Science (028)', 'Geography (029)', 'Psychology (037)', 'Economics (030)'] },
  { id: 'CLASS_12_SCI', name: 'Class 12 - Science (Board)', category: 'Senior Secondary', streams: ['PCM', 'PCB', 'PCMB'], defaultSubjects: ['English Core (301)', 'Physics Optics & Current (042)', 'Chemistry Organic & Electrochemistry (043)', 'Mathematics Calculus & Vectors (041)', 'Biology Genetics & Reproduction (044)', 'Computer Science Python & SQL (083)'] },
  { id: 'CLASS_12_COM', name: 'Class 12 - Commerce (Board)', category: 'Senior Secondary', streams: ['Commerce With Math', 'Commerce Without Math'], defaultSubjects: ['English Core (301)', 'Accountancy Partnership & Company (055)', 'Business Studies Principles (054)', 'Macroeconomics & Indian Economy (030)', 'Applied Mathematics (241)'] },
  { id: 'CLASS_12_HUM', name: 'Class 12 - Humanities (Board)', category: 'Senior Secondary', streams: ['Arts Core'], defaultSubjects: ['English Core (301)', 'Themes in Indian History (027)', 'Contemporary World Politics (028)', 'India: People and Economy (029)', 'Psychology Self & Personality (037)'] }
];
