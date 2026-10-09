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
  { id: 'nur', name: 'Nursery', availableSubjects: ['Foundational English & Rhymes', 'Early Mathematics & Numbers', 'EVS & Sensorial World', 'Art & Craft'] },
  { id: 'lkg', name: 'LKG', availableSubjects: ['English Phonics & Tracing', 'Number Readiness & Shapes', 'General Awareness', 'Creative Art & Motor Skills'] },
  { id: 'ukg', name: 'UKG', availableSubjects: ['English Literacy & Sight Words', 'Elementary Mathematics (1-50)', 'Environmental Studies', 'Conversation & Hindi Vyanjan'] },
  { id: 'c1', name: 'Class 1', availableSubjects: ['English (Mridang)', 'Mathematics (Joyful)', 'Hindi (Sarangi)', 'Environmental Studies', 'Computer Basics'] },
  { id: 'c2', name: 'Class 2', availableSubjects: ['English (Mridang)', 'Mathematics (Joyful)', 'Hindi (Sarangi)', 'Environmental Studies', 'Computer Basics'] },
  { id: 'c3', name: 'Class 3', availableSubjects: ['English', 'Mathematics', 'Hindi', 'The World Around Us (Science)', 'Computer Applications'] },
  { id: 'c4', name: 'Class 4', availableSubjects: ['English', 'Mathematics', 'Hindi', 'Science Explorer', 'Social Studies', 'Coding & Computer Science'] },
  { id: 'c5', name: 'Class 5', availableSubjects: ['English', 'Mathematics', 'Hindi', 'Science Explorer', 'Social Studies', 'Coding & AI Foundations'] },
  { id: 'c6', name: 'Class 6', availableSubjects: ['English (Poorvi)', 'Mathematics (Ganita)', 'Hindi (Malhar)', 'Science (Curiosity)', 'Social Science', 'Sanskrit (Deepakam)', 'AI & Robotics'] },
  { id: 'c7', name: 'Class 7', availableSubjects: ['English Core', 'Mathematics', 'Hindi Course A', 'General Science', 'Social Science', 'Sanskrit', 'Coding & Robotics'] },
  { id: 'c8', name: 'Class 8', availableSubjects: ['English Core', 'Mathematics', 'Hindi Course A', 'General Science', 'Social Science', 'Sanskrit', 'AI & Robotics'] },
  { id: 'c9', name: 'Class 9', availableSubjects: ['English Language & Literature (184)', 'Mathematics Standard (041)', 'Science (086)', 'Social Science (087)', 'Hindi Course A (002)', 'Information Technology (402)', 'Artificial Intelligence (417)'] },
  { id: 'c10', name: 'Class 10', availableSubjects: ['English Language & Literature (184)', 'Mathematics Standard (041)', 'Mathematics Basic (241)', 'Science (086)', 'Social Science (087)', 'Hindi Course A (002)', 'Information Technology (402)', 'Artificial Intelligence (417)'] },
  { id: 'c11-sci', name: 'Class 11 (Science)', availableSubjects: ['Physics (Code 042)', 'Chemistry (Code 043)', 'Mathematics (Code 041)', 'Biology (Code 044)', 'Computer Science (Code 083)', 'Yoga (Code 841)', 'English Core (Code 301)', 'Physical Education (Code 048)'] },
  { id: 'c11-comm', name: 'Class 11 (Commerce)', availableSubjects: ['Accountancy (Code 055)', 'Business Studies (Code 054)', 'Economics (Code 030)', 'Mathematics (Code 041)', 'Informatics Practices (Code 065)', 'Yoga (Code 841)', 'English Core (Code 301)'] },
  { id: 'c11-hum', name: 'Class 11 (Humanities)', availableSubjects: ['History (Code 027)', 'Political Science (Code 028)', 'Geography (Code 029)', 'Economics (Code 030)', 'Psychology (Code 037)', 'Yoga (Code 841)', 'Hindi Core (Code 302)', 'English Core (Code 301)'] },
  { id: 'c12-sci', name: 'Class 12 (Science)', availableSubjects: ['Physics (Code 042)', 'Chemistry (Code 043)', 'Mathematics (Code 041)', 'Computer Science (Code 083)', 'Biology (Code 044)', 'Yoga (Code 841)', 'English Core (Code 301)', 'Physical Education (Code 048)'] },
  { id: 'c12-comm', name: 'Class 12 (Commerce)', availableSubjects: ['Accountancy (Code 055)', 'Business Studies (Code 054)', 'Economics (Code 030)', 'Mathematics (Code 041)', 'Informatics Practices (Code 065)', 'Yoga (Code 841)', 'English Core (Code 301)'] },
  { id: 'c12-hum', name: 'Class 12 (Humanities)', availableSubjects: ['History (Code 027)', 'Political Science (Code 028)', 'Geography (Code 029)', 'Economics (Code 030)', 'Psychology (Code 037)', 'Yoga (Code 841)', 'English Core (Code 301)', 'Hindi Core (Code 302)'] }
];

export const ACADEMIC_CLASSES = ALL_CBSE_CLASSES;

// CLASS-SPECIFIC & SUBJECT-SPECIFIC SYLLABUS DICTIONARY (2026-27 CBSE)
export const DETAILED_SYLLABUS_2026_27: Record<string, SubjectCurriculum> = {
  // --- NURSERY / FOUNDATIONAL ---
  'Early Mathematics & Numbers': {
    name: 'Early Mathematics',
    code: 'NUR-MATH',
    theoryMarks: 40,
    practicalMarks: 10,
    units: [
      { unitTitle: 'Unit 1: Pre-Math Concepts (Big/Small, Tall/Short)', subTopics: ['Comparison of Objects', 'Sorting by Color & Size', 'Spatial Sense (Inside/Outside)'] },
      { unitTitle: 'Unit 2: Number Recognition & Counting (1 to 20)', subTopics: ['Oral Counting 1 to 20', 'Object Counting & Matching', 'Number Tracing & Sandpaper Activity'] },
      { unitTitle: 'Unit 3: Basic Shapes & Patterns', subTopics: ['Circle, Square, Triangle Identification', 'Simple 2-Step Repeating Patterns'] }
    ]
  },
  'Foundational English & Rhymes': {
    name: 'Foundational English',
    code: 'NUR-ENG',
    theoryMarks: 40,
    practicalMarks: 10,
    units: [
      { unitTitle: 'Unit 1: Letter Sounds & Phonics (A - Z)', subTopics: ['Phonic Sounds Recognition', 'Letter Tracing (Standing & Sleeping Lines)', 'Picture-Word Association'] },
      { unitTitle: 'Unit 2: Vocabulary & Oral Rhymes', subTopics: ['Nursery Rhymes with Action', 'My Body Parts & Family Members', 'Common Animals & Fruits'] }
    ]
  },

  // --- CLASS 10 ---
  'Mathematics Standard (041)': {
    name: 'Mathematics Standard',
    code: '041',
    theoryMarks: 80,
    practicalMarks: 20,
    units: [
      { unitTitle: 'Unit I: Number Systems (Real Numbers)', subTopics: ['Fundamental Theorem of Arithmetic', 'Revisiting Irrational Numbers (Proof of √2, √3, √5)'] },
      { unitTitle: 'Unit II: Algebra (Polynomials, Linear Equations, Quadratics, AP)', subTopics: ['Zeros of a Polynomial & Coefficients', 'Pair of Linear Equations (Substitution, Elimination)', 'Quadratic Equations (Factorisation & Quadratic Formula)', 'Arithmetic Progressions (nth term & Sum of n terms)'] },
      { unitTitle: 'Unit III: Coordinate Geometry', subTopics: ['Distance Formula', 'Section Formula (Internal Division)'] },
      { unitTitle: 'Unit IV: Geometry (Triangles & Circles)', subTopics: ['Basic Proportionality Theorem (Thales Theorem)', 'Criteria for Similarity of Triangles (AAA, SSS, SAS)', 'Tangent to a Circle & Theorems on Circle Radii'] },
      { unitTitle: 'Unit V: Trigonometry', subTopics: ['Trigonometric Ratios & Specific Angles (30°, 45°, 60°)', 'Trigonometric Identities (sin²θ + cos²θ = 1)', 'Heights and Distances: Angle of Elevation & Depression'] },
      { unitTitle: 'Unit VI: Mensuration (Surface Areas & Volumes)', subTopics: ['Surface Areas and Volumes of Combinations of Solids', 'Cubes, Cuboids, Spheres, Hemispheres & Cylinders'] },
      { unitTitle: 'Unit VII: Statistics & Probability', subTopics: ['Mean, Median and Mode of Grouped Data', 'Classical Definition of Probability & Simple Event Calculations'] }
    ]
  },
  'Information Technology (402)': {
    name: 'Information Technology',
    code: '402',
    theoryMarks: 50,
    practicalMarks: 50,
    units: [
      { unitTitle: 'Part A: Employability Skills (Units 1 - 5)', subTopics: ['Communication Skills-II', 'Self-Management Skills-II', 'ICT Skills-II', 'Entrepreneurial Skills-II', 'Green Skills-II'] },
      { unitTitle: 'Part B: Digital Documentation (Advanced)', subTopics: ['Creating and Applying Styles in Documents', 'Insert and Use Images in LibreOffice Writer', 'Create and Customize Table of Contents (ToC)', 'Implementing Mail Merge with Recipient Lists'] },
      { unitTitle: 'Part B: Electronic Spreadsheet (Advanced)', subTopics: ['Consolidating Data & Creating Subtotals', 'What-If Analysis (Scenarios & Goal Seek)', 'Linking Spreadsheet Data & Multiple Sheets', 'Sharing and Reviewing Worksheets, Using Macros'] },
      { unitTitle: 'Part B: Database Management System (RDBMS)', subTopics: ['Concepts of Database & Relational Model', 'Creating Tables using Design View and Wizard', 'Executing SQL DDL and DML Queries', 'Designing Forms and Generating Reports'] },
      { unitTitle: 'Part B: Web Applications and Security', subTopics: ['Accessibility Options in Operating Systems', 'Networking Fundamentals (LAN, WAN, Topologies)', 'Instant Messaging & Blog Publishing Clients', 'Workplace Safety, Cyber Security Hazards & Fire Drills'] }
    ]
  },

  // --- CLASS 11 & 12 YOGA (SUBJECT CODE - 841) [CBSE 2026-27] ---
  'Yoga (Code 841)': {
    name: 'Yoga',
    code: '841',
    theoryMarks: 50,
    practicalMarks: 50,
    units: [
      {
        unitTitle: 'Unit 1 – Introduction to Yoga and Yogic Practices – II',
        subTopics: [
          'Shatkarma: Meaning, Purpose and Significance in Yoga Sadhana',
          'Yogasana: Meaning, Principles and Specific Health Benefits',
          'Introduction to Pranayama & Dhyana Practices',
          'Career Opportunities & Professional Certifications in Yoga'
        ]
      },
      {
        unitTitle: 'Unit 2 – Introduction to Yoga Texts – II',
        subTopics: [
          'Concepts of Aahara (Diet) According to Hatha Yogic Texts',
          'Significance of Hatha Yoga Practices in Disease Prevention',
          'Concept of Mental Well-being According to Patanjali Yoga Sutras',
          'Bahiranga and Antaranga Yoga Frameworks',
          'Concept of Healthy Lifestyle & Karma Yoga in Bhagavad Gita'
        ]
      },
      {
        unitTitle: 'Unit 3 – Yoga for Health Promotion – II',
        subTopics: [
          'Introduction to First Aid, CPR & Sports Safety in Yoga',
          'Yogic Management of Chronic Stress & Modern Lifestyle Disorders',
          'Yogic Prevention of Common Ailments (Hypertension, Diabetes, Asthma)',
          'Yoga Practices for Holisitic Personality Development'
        ]
      }
    ]
  },

  // --- CLASS 12 SCIENCE ---
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
  'Chemistry (Code 043)': {
    name: 'Chemistry',
    code: '043',
    theoryMarks: 70,
    practicalMarks: 30,
    units: [
      { unitTitle: 'Unit I & II: Solutions & Electrochemistry', subTopics: ['Raoult’s Law & Colligative Properties', 'Nernst Equation & Electrochemical Cells', 'Kohlrausch’s Law & Conductance'] },
      { unitTitle: 'Unit III & IV: Chemical Kinetics, d & f Block Elements', subTopics: ['Rate Law, Order & Molecularity, Arrhenius Equation', 'Electronic Configuration & Transition Metal Properties', 'Coordination Compounds: IUPAC & Crystal Field Theory'] },
      { unitTitle: 'Unit V: Organic Chemistry & Biomolecules', subTopics: ['Haloalkanes & Haloarenes Mechanisms', 'Alcohols, Phenols & Ethers', 'Aldehydes, Ketones & Carboxylic Acids', 'Biomolecules: Carbohydrates, Proteins & Nucleic Acids'] }
    ]
  }
};
