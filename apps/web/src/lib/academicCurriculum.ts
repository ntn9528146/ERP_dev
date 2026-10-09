export interface SyllabusTopic {
  unitTitle: string;
  subTopics: string[];
}

export interface SubjectCurriculum {
  name: string;
  code: string;
  theoryMarks: number;
  practicalMarks: number;
  units: SyllabusTopic[];
}

export interface AcademicClass {
  id: string;
  name: string;
  availableSubjects: string[];
}

export const ALL_CBSE_CLASSES: AcademicClass[] = [
  { id: 'nur', name: 'Nursery', availableSubjects: ['Foundational English', 'Early Mathematics', 'EVS & Rhymes', 'Art & Craft'] },
  { id: 'lkg', name: 'LKG', availableSubjects: ['English Phonics', 'Number Readiness', 'General Awareness', 'Creative Art'] },
  { id: 'ukg', name: 'UKG', availableSubjects: ['English Literacy', 'Elementary Mathematics', 'Environmental Studies', 'Rhymes & Conversation'] },
  { id: 'c1', name: 'Class 1', availableSubjects: ['English', 'Mathematics', 'Hindi', 'Environmental Studies', 'Computer Basics', 'Art Education'] },
  { id: 'c2', name: 'Class 2', availableSubjects: ['English', 'Mathematics', 'Hindi', 'Environmental Studies', 'Computer Awareness', 'Art Education'] },
  { id: 'c3', name: 'Class 3', availableSubjects: ['English', 'Mathematics', 'Hindi', 'General Science', 'Social Studies', 'Computer Applications', 'Art Education'] },
  { id: 'c4', name: 'Class 4', availableSubjects: ['English', 'Mathematics', 'Hindi', 'Science', 'Social Studies', 'Coding & Computer Science', 'General Knowledge'] },
  { id: 'c5', name: 'Class 5', availableSubjects: ['English', 'Mathematics', 'Hindi', 'Science', 'Social Studies', 'Computer Science & AI Basics', 'Sanskrit / Third Language'] },
  { id: 'c6', name: 'Class 6', availableSubjects: ['English Core', 'Mathematics', 'Hindi Course A', 'General Science', 'Social Science', 'Sanskrit', 'Computer Science & AI', 'Art & Work Education'] },
  { id: 'c7', name: 'Class 7', availableSubjects: ['English Core', 'Mathematics', 'Hindi Course A', 'General Science', 'Social Science', 'Sanskrit', 'Coding & Robotics', 'Vocational Skill'] },
  { id: 'c8', name: 'Class 8', availableSubjects: ['English Core', 'Mathematics', 'Hindi Course A', 'General Science', 'Social Science', 'Sanskrit', 'Robotics & AI Exploration', 'Work Experience'] },
  { id: 'c9', name: 'Class 9', availableSubjects: ['English Language & Literature (184)', 'Mathematics Standard (041)', 'Science (086)', 'Social Science (087)', 'Hindi Course A (002)', 'Information Technology (402)', 'Artificial Intelligence (417)'] },
  { id: 'c10', name: 'Class 10', availableSubjects: ['English Language & Literature (184)', 'Mathematics Standard (041)', 'Mathematics Basic (241)', 'Science (086)', 'Social Science (087)', 'Hindi Course A (002)', 'Information Technology (402)', 'Artificial Intelligence (417)'] },
  { id: 'c11-sci', name: 'Class 11 (Science)', availableSubjects: ['English Core (301)', 'Physics (042)', 'Chemistry (043)', 'Mathematics (041)', 'Biology (044)', 'Computer Science (083)', 'Physical Education (048)'] },
  { id: 'c11-comm', name: 'Class 11 (Commerce)', availableSubjects: ['English Core (301)', 'Accountancy (055)', 'Business Studies (054)', 'Economics (030)', 'Mathematics (041)', 'Informatics Practices (065)', 'Physical Education (048)'] },
  { id: 'c11-hum', name: 'Class 11 (Humanities)', availableSubjects: ['English Core (301)', 'History (027)', 'Political Science (028)', 'Geography (029)', 'Economics (030)', 'Psychology (037)', 'Hindi Core (302)'] },
  { id: 'c12-sci', name: 'Class 12 (Science)', availableSubjects: ['Physics (Code 042)', 'Chemistry (Code 043)', 'Mathematics (Code 041)', 'Computer Science (Code 083)', 'Biology (Code 044)', 'English Core (Code 301)', 'Physical Education (Code 048)'] },
  { id: 'c12-comm', name: 'Class 12 (Commerce)', availableSubjects: ['Accountancy (Code 055)', 'Business Studies (Code 054)', 'Economics (Code 030)', 'Mathematics (Code 041)', 'Informatics Practices (Code 065)', 'English Core (Code 301)'] },
  { id: 'c12-hum', name: 'Class 12 (Humanities)', availableSubjects: ['History (Code 027)', 'Political Science (Code 028)', 'Geography (Code 029)', 'Economics (Code 030)', 'Psychology (Code 037)', 'English Core (Code 301)', 'Hindi Core (Code 302)'] }
];

export const ACADEMIC_CLASSES = ALL_CBSE_CLASSES;

export const DETAILED_SYLLABUS_2026_27: Record<string, SubjectCurriculum> = {
  'Physics (Code 042)': {
    name: 'Physics',
    code: '042',
    theoryMarks: 70,
    practicalMarks: 30,
    units: [
      {
        unitTitle: 'Unit I & II: Electrostatics & Current Electricity',
        subTopics: [
          'Electric Charges, Fields & Gauss Law',
          'Electrostatic Potential & Capacitors',
          'Drift Velocity, Ohm’s Law & Kirchhoff’s Rules',
          'Potentiometer & Wheatstone Bridge Principles'
        ]
      },
      {
        unitTitle: 'Unit III & IV: Magnetic Effects, EMI & Alternating Currents',
        subTopics: [
          'Biot-Savart Law & Ampere Circuital Law',
          'Electromagnetic Induction & Faraday’s Laws',
          'Lenz’s Law & Eddy Currents',
          'AC Circuits, Resonance & Phasor Diagrams',
          'AC Generator & Transformers'
        ]
      },
      {
        unitTitle: 'Unit V & VI: Electromagnetic Waves & Optics',
        subTopics: [
          'Displacement Current & EM Spectrum Waves',
          'Ray Optics: Reflection, Refraction, Lens Maker’s Formula',
          'Wave Optics: Huygens’ Principle, Interference & Young’s Double Slit Experiment'
        ]
      },
      {
        unitTitle: 'Unit VII & VIII: Modern Physics & Semiconductors',
        subTopics: [
          'Dual Nature of Matter & Photoelectric Effect',
          'Bohr Model, Hydrogen Spectrum & Radioactivity',
          'Semiconductor Diodes, Rectifiers & Band Theory'
        ]
      }
    ]
  },
  'Computer Science (Code 083)': {
    name: 'Computer Science',
    code: '083',
    theoryMarks: 70,
    practicalMarks: 30,
    units: [
      {
        unitTitle: 'Unit I: Computational Thinking and Programming - 2',
        subTopics: [
          'Revision of Python Basics, Flow of Control & Strings',
          'Functions: Scope, Parameter Passing & Default Arguments',
          'File Handling: Text, Binary (pickle), CSV Operations',
          'Data Structures: Linear Stack implementation using Lists'
        ]
      },
      {
        unitTitle: 'Unit II: Computer Networks',
        subTopics: [
          'Evolution of Networking, Switching Techniques & Topologies',
          'Transmission Media, Network Devices (Switch, Router, Gateway)',
          'Network Protocols (TCP/IP, HTTP, FTP, DNS) & Web Services'
        ]
      },
      {
        unitTitle: 'Unit III: Database Management & SQL',
        subTopics: [
          'Relational Data Model, Keys (Primary, Candidate, Foreign)',
          'SQL Commands: DDL (CREATE, ALTER) & DML (SELECT, UPDATE, DELETE)',
          'Aggregate Functions (COUNT, SUM, AVG) & GROUP BY / HAVING',
          'Interface Python with MySQL Database connector'
        ]
      }
    ]
  },
  'Mathematics (Code 041)': {
    name: 'Mathematics',
    code: '041',
    theoryMarks: 80,
    practicalMarks: 20,
    units: [
      {
        unitTitle: 'Unit I: Relations and Functions',
        subTopics: ['Types of Relations (Equivalence)', 'One-One and Onto Functions', 'Inverse Trigonometric Functions']
      },
      {
        unitTitle: 'Unit II: Algebra (Matrices & Determinants)',
        subTopics: ['Matrix Operations, Transpose & Symmetric Matrices', 'Determinants, Minors & Inverses', 'Solving Linear Equations using Matrix Method']
      },
      {
        unitTitle: 'Unit III: Calculus',
        subTopics: ['Continuity and Differentiability, Chain Rule', 'Applications of Derivatives: Tangents, Maxima & Minima', 'Definite & Indefinite Integrals', 'Differential Equations: Variable Separable & Linear']
      },
      {
        unitTitle: 'Unit IV: Vectors & 3D Geometry',
        subTopics: ['Dot and Cross Products', 'Direction Cosines & Direction Ratios', 'Equation of Lines in 3D Space & Shortest Distance']
      }
    ]
  },
  'Chemistry (Code 043)': {
    name: 'Chemistry',
    code: '043',
    theoryMarks: 70,
    practicalMarks: 30,
    units: [
      {
        unitTitle: 'Unit I & II: Solutions & Electrochemistry',
        subTopics: ['Raoult’s Law & Colligative Properties', 'Nernst Equation & Electrochemical Cells', 'Kohlrausch’s Law & Conductance']
      },
      {
        unitTitle: 'Unit III & IV: Chemical Kinetics, d & f Block Elements',
        subTopics: ['Rate Law, Order & Molecularity, Arrhenius Equation', 'Electronic Configuration & Transition Metal Properties', 'Coordination Compounds: IUPAC & Crystal Field Theory']
      },
      {
        unitTitle: 'Unit V: Organic Chemistry & Biomolecules',
        subTopics: ['Haloalkanes & Haloarenes Mechanisms', 'Alcohols, Phenols & Ethers', 'Aldehydes, Ketones & Carboxylic Acids', 'Biomolecules: Carbohydrates, Proteins & Nucleic Acids']
      }
    ]
  }
};
