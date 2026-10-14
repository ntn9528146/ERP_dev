export interface PracticalExperiment {
  expId: string;
  title: string;
  unitRef: string;
  vivaQueries: { q: string; a: string }[];
}

export interface SyllabusTopic {
  unitTitle: string;
  subTopics: string[];
  experiments?: PracticalExperiment[];
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

const SENIOR_SECONDARY_ALL_SUBJECTS = [
  'Physics (Code 042)',
  'Chemistry (Code 043)',
  'Mathematics (Code 041)',
  'Applied Mathematics (Code 241)',
  'Biology (Code 044)',
  'Computer Science (Code 083)',
  'Informatics Practices (Code 065)',
  'Accountancy (Code 055)',
  'Business Studies (Code 054)',
  'Economics (Code 030)',
  'Political Science (Code 028)',
  'History (Code 027)',
  'Geography (Code 029)',
  'Physical Education (Code 048)',
  'Yoga (Code 841)',
  'Hindi Core (Code 302)',
  'Hindi Elective (Code 002)',
  'English Core (Code 301)'
];

export const ALL_CBSE_CLASSES: AcademicClass[] = [
  { id: 'nur', name: 'Nursery', availableSubjects: ['Foundational English & Rhymes', 'Early Mathematics & Numbers', 'EVS & Sensorial World', 'Art & Craft'] },
  { id: 'lkg', name: 'LKG', availableSubjects: ['English Phonics & Tracing', 'Number Readiness & Shapes', 'General Awareness', 'Creative Art & Motor Skills'] },
  { id: 'ukg', name: 'UKG', availableSubjects: ['English Literacy & Sight Words', 'Elementary Mathematics (1-50)', 'Environmental Studies', 'Conversation & Hindi Vyanjan'] },
  { id: 'c1', name: 'Class 1', availableSubjects: ['English (Mridang)', 'Mathematics (Joyful)', 'Hindi (Sarangi)', 'Environmental Studies', 'Computer Basics'] },
  { id: 'c2', name: 'Class 2', availableSubjects: ['English (Mridang)', 'Mathematics (Joyful)', 'Hindi (Sarangi)', 'Environmental Studies', 'Computer Basics'] },
  { id: 'c3', name: 'Class 3', availableSubjects: ['Hindi (Veena)', 'English (Santoor)', 'Mathematics (Mela)', 'The World Around Us (EVS)', 'Computer Applications'] },
  { id: 'c4', name: 'Class 4', availableSubjects: ['English', 'Mathematics', 'Hindi', 'Science Explorer', 'Social Studies', 'Coding & Computer Science'] },
  { id: 'c5', name: 'Class 5', availableSubjects: ['English', 'Mathematics', 'Hindi', 'Science Explorer', 'Social Studies', 'Coding & AI Foundations'] },
  { id: 'c6', name: 'Class 6', availableSubjects: ['English (Poorvi)', 'Mathematics (Ganita)', 'Hindi (Malhar)', 'Science (Curiosity)', 'Social Science', 'Sanskrit (Deepakam)', 'AI & Robotics'] },
  { id: 'c7', name: 'Class 7', availableSubjects: ['English Core', 'Mathematics', 'Hindi Course A', 'General Science', 'Social Science', 'Sanskrit', 'Coding & Robotics'] },
  { id: 'c8', name: 'Class 8', availableSubjects: ['English Core', 'Mathematics', 'Hindi Course A', 'General Science', 'Social Science', 'Sanskrit', 'AI & Robotics'] },
  { id: 'c9', name: 'Class 9', availableSubjects: ['English Language & Literature (184)', 'Mathematics Standard (041)', 'Science (086)', 'Social Science (087)', 'Hindi Course A (002)', 'Information Technology (402)', 'Artificial Intelligence (417)'] },
  { id: 'c10', name: 'Class 10', availableSubjects: ['Information Technology (402)', 'Artificial Intelligence (417)', 'English Language & Literature (184)', 'Mathematics Standard (041)', 'Mathematics Basic (241)', 'Science (086)', 'Social Science (087)', 'Hindi Course A (002)'] },
  
  // Senior Secondary Streams
  { id: 'c11-sci', name: 'Class 11 (Science)', availableSubjects: SENIOR_SECONDARY_ALL_SUBJECTS },
  { id: 'c11-comm', name: 'Class 11 (Commerce)', availableSubjects: SENIOR_SECONDARY_ALL_SUBJECTS },
  { id: 'c11-hum', name: 'Class 11 (Humanities)', availableSubjects: SENIOR_SECONDARY_ALL_SUBJECTS },
  { id: 'c12-sci', name: 'Class 12 (Science)', availableSubjects: SENIOR_SECONDARY_ALL_SUBJECTS },
  { id: 'c12-comm', name: 'Class 12 (Commerce)', availableSubjects: SENIOR_SECONDARY_ALL_SUBJECTS },
  { id: 'c12-hum', name: 'Class 12 (Humanities)', availableSubjects: SENIOR_SECONDARY_ALL_SUBJECTS }
];

export const ACADEMIC_CLASSES = ALL_CBSE_CLASSES;

export const DETAILED_SYLLABUS_2026_27: Record<string, SubjectCurriculum> = {
  'Physical Education (Code 048)': {
    name: 'Physical Education',
    code: '048',
    theoryMarks: 70,
    practicalMarks: 30,
    units: [
      {
        unitTitle: 'Unit I: Management of Sporting Events',
        subTopics: [
          'Functions of Sports Event Management',
          'Committees & Responsibilities (Pre, During, Post Event)',
          'Fixtures: Knock-Out (Bye & Seeding) and League (Staircase & Cyclic)',
          'Intramural & Extramural Tournaments'
        ],
        experiments: [
          {
            expId: 'PE-EXP-01',
            title: 'Draw a complete fixture of 21 teams on Knock-Out basis showing calculation of Byes and rounds',
            unitRef: 'Unit I',
            vivaQueries: [
              { q: 'Formula for total matches in knock-out tournament?', a: 'Total Matches = N - 1.' },
              { q: 'What is a Bye?', a: 'A scheduling privilege that advances a team directly to the next round.' }
            ]
          }
        ]
      },
      {
        unitTitle: 'Unit II: Children & Women in Sports',
        subTopics: [
          'Common Postural Deformities: Knock Knees, Flat Foot, Lordosis, Kyphosis, Scoliosis',
          'Corrective Yogic Exercises',
          'Special Considerations: Menarche and Menstrual Disfunction',
          'Female Athlete Triad (Osteoporosis, Amenorrhea, Eating Disorders)'
        ]
      },
      {
        unitTitle: 'Unit III: Yoga as Preventive Measure for Lifestyle Diseases',
        subTopics: [
          'Obesity Management Asanas: Tadasana, Katichakrasana, Matsyasana',
          'Diabetes Management: Bhujangasana, Paschimottanasana, Ardha Matsyendrasana',
          'Asthma Management: Sukhasana, Chakrasana, Gomukhasana',
          'Hypertension: Mandukasana, Vakrasana, Shavasana'
        ],
        experiments: [
          {
            expId: 'PE-EXP-02',
            title: 'Demonstration and assessment of 4 corrective Asanas for management of Hypertension and Obesity',
            unitRef: 'Unit III',
            vivaQueries: [
              { q: 'Which Asanas are contra-indicated for acute back pain and hernia?', a: 'Forward-bending postures like Paschimottanasana.' }
            ]
          }
        ]
      },
      {
        unitTitle: 'Unit IV: Physical Education & Sports for CWSN (Divyang)',
        subTopics: [
          'Organizations: Special Olympics, Paralympics, Deaflympics',
          'Concept of Classification and Divisioning',
          'Implementation of Inclusion in Schools',
          'Adaptive Physical Education Activities'
        ]
      },
      {
        unitTitle: 'Unit V: Sports & Nutrition',
        subTopics: [
          'Macro and Micro Nutrients',
          'Nutritive & Non-Nutritive Components of Diet',
          'Eating for Weight Control and Food Myths'
        ]
      },
      {
        unitTitle: 'Unit VI: Test & Measurement in Sports',
        subTopics: [
          'SAI Khelo India Fitness Assessment Protocol',
          'Harvard Step Test: Computing Physical Fitness Index (PFI)',
          'Basal Metabolic Rate (BMR) Calculation',
          'Rikli & Jones Senior Citizen Fitness Battery'
        ],
        experiments: [
          {
            expId: 'PE-EXP-03',
            title: 'Conduct Harvard Step Test on a subject and calculate Physical Fitness Index (PFI)',
            unitRef: 'Unit VI',
            vivaQueries: [
              { q: 'What is the bench height used in Harvard Step Test for boys?', a: '20 inches (50.8 cm).' }
            ]
          }
        ]
      },
      {
        unitTitle: 'Unit VII: Physiology & Injuries in Sports',
        subTopics: [
          'Physiological Factors of Strength, Speed, Endurance, Flexibility',
          'Exercise Impacts on Cardiorespiratory System',
          'Sports Injuries Classification (Sprain, Strain, Contusion, Fractures)',
          'P.R.I.C.E. and P.R.I.C.E.R. Rehabilitation Protocols'
        ]
      },
      {
        unitTitle: 'Unit VIII: Biomechanics & Sports',
        subTopics: [
          'Newton’s Laws of Motion in Sporting Contexts',
          'Types of Levers and Mechanical Advantage in Sports',
          'Equilibrium, Center of Gravity, and Projectile Trajectory'
        ]
      },
      {
        unitTitle: 'Unit IX: Psychology & Sports',
        subTopics: [
          'Personality Types (Jung and Big Five Model)',
          'Intrinsic and Extrinsic Motivation Techniques',
          'Aggression Types: Hostile, Instrumental, and Assertive'
        ]
      },
      {
        unitTitle: 'Unit X: Training in Sports',
        subTopics: [
          'Micro, Meso, and Macro Sports Training Cycles',
          'Methods for Strength, Speed, and Flexibility Development',
          'Circuit Training Protocols'
        ]
      }
    ]
  },

  'Accountancy (Code 055)': {
    name: 'Accountancy',
    code: '055',
    theoryMarks: 80,
    practicalMarks: 20,
    units: [
      {
        unitTitle: 'Part A: Accounting for Partnership Firms',
        subTopics: [
          'Partnership Deed, Profit & Loss Appropriation, Past Adjustments',
          'Goodwill Valuation (Average, Super, Capitalization)',
          'Admission, Retirement & Death of Partner',
          'Dissolution of Partnership Firm: Realisation Account'
        ],
        experiments: [
          {
            expId: 'ACC-EXP-01',
            title: 'Comprehensive accounting project for a partnership firm preparing final accounts and ratio analysis',
            unitRef: 'Part A',
            vivaQueries: [
              { q: 'Maximum number of partners allowed in a partnership firm?', a: '50 partners.' }
            ]
          }
        ]
      },
      {
        unitTitle: 'Part A: Accounting for Companies',
        subTopics: [
          'Issue of Shares: Par, Premium, Forfeiture, and Reissue',
          'Pro-rata Allotment on Over-subscription',
          'Issue and Redemption of Debentures'
        ]
      },
      {
        unitTitle: 'Part B: Financial Statement Analysis',
        subTopics: [
          'Balance Sheet & Statement of Profit and Loss',
          'Comparative and Common-Size Statements',
          'Accounting Ratios (Liquidity, Solvency, Activity, Profitability)',
          'Cash Flow Statement (AS-3)'
        ]
      }
    ]
  },

  'Business Studies (Code 054)': {
    name: 'Business Studies',
    code: '054',
    theoryMarks: 80,
    practicalMarks: 20,
    units: [
      {
        unitTitle: 'Part A: Principles and Functions of Management',
        subTopics: [
          'Nature & Significance of Management, Levels and Coordination',
          'Fayol’s Principles & Taylor’s Scientific Management',
          'Business Environment Dimensions',
          'Planning, Organizing, Staffing, Directing, Controlling'
        ],
        experiments: [
          {
            expId: 'BST-EXP-01',
            title: 'Field survey project analyzing consumer behavior or organizational principles in an enterprise',
            unitRef: 'Part A',
            vivaQueries: [
              { q: 'Difference between Unity of Command and Unity of Direction?', a: 'Unity of Command: one boss per employee. Unity of Direction: one head and one plan for an activity group.' }
            ]
          }
        ]
      },
      {
        unitTitle: 'Part B: Business Finance and Marketing',
        subTopics: [
          'Financial Management Decisions (Investment, Financing, Dividend)',
          'Financial Markets: Money Market & Capital Market (SEBI Functions)',
          'Marketing Mix: 4 Ps (Product, Price, Place, Promotion)',
          'Consumer Protection Act 2019'
        ]
      }
    ]
  },

  'Economics (Code 030)': {
    name: 'Economics',
    code: '030',
    theoryMarks: 80,
    practicalMarks: 20,
    units: [
      {
        unitTitle: 'Part A: Introductory Macroeconomics',
        subTopics: [
          'National Income Aggregates and Measurement Methods',
          'Money Creation by Banks and Central Bank Functions',
          'Aggregate Demand, Aggregate Supply, Multiplier',
          'Government Budget and Deficits',
          'Balance of Payments & Foreign Exchange'
        ],
        experiments: [
          {
            expId: 'ECO-EXP-01',
            title: 'Project report analyzing trends of inflation, GDP growth rate, and RBI monetary policy',
            unitRef: 'Part A',
            vivaQueries: [
              { q: 'Formula for Investment Multiplier?', a: 'k = 1 / (1 - MPC) or k = 1 / MPS.' }
            ]
          }
        ]
      },
      {
        unitTitle: 'Part B: Indian Economic Development',
        subTopics: [
          'Development Experience (1947-90) & 1991 Reforms (LPG)',
          'Human Capital Formation, Rural Development, Employment',
          'Sustainable Economic Development',
          'Comparative Development of India, Pakistan, and China'
        ]
      }
    ]
  },

  'Applied Mathematics (Code 241)': {
    name: 'Applied Mathematics',
    code: '241',
    theoryMarks: 80,
    practicalMarks: 20,
    units: [
      {
        unitTitle: 'Unit I: Numbers, Quantification and Numerical Applications',
        subTopics: ['Modulo Arithmetic, Alligation and Mixture, Boats and Streams, Pipes and Cisterns']
      },
      {
        unitTitle: 'Unit II: Algebra',
        subTopics: ['Matrices and Determinants, Cramer’s Rule, Leontief Input-Output Models']
      },
      {
        unitTitle: 'Unit III: Calculus',
        subTopics: ['Marginal Cost/Revenue, Integrals, Consumer Surplus and Producer Surplus']
      },
      {
        unitTitle: 'Unit IV: Probability Distributions & Linear Programming',
        subTopics: ['Poisson and Normal Distributions, Hypothesis Testing, LPP Formulation and Solutions']
      },
      {
        unitTitle: 'Unit V: Financial Mathematics',
        subTopics: ['Perpetuity, Sinking Funds, EMI Calculation, Depreciation Schedules']
      }
    ]
  },

  'Political Science (Code 028)': {
    name: 'Political Science',
    code: '028',
    theoryMarks: 80,
    practicalMarks: 20,
    units: [
      {
        unitTitle: 'Part A: Contemporary World Politics',
        subTopics: ['The End of Bipolarity, Centres of Power (EU, ASEAN, BRICS), UN Agencies, Globalization']
      },
      {
        unitTitle: 'Part B: Politics in India since Independence',
        subTopics: ['Challenges of Nation-Building, Planned Development, Emergency 1975, Recent Political Trends']
      }
    ]
  },

  'History (Code 027)': {
    name: 'History',
    code: '027',
    theoryMarks: 80,
    practicalMarks: 20,
    units: [
      {
        unitTitle: 'Themes in Indian History Part I, II & III',
        subTopics: [
          'Harappan Archaeology, Early States and Economies, Early Societies',
          'Travellers Accounts, Bhakti-Sufi Traditions, Vijayanagara Empire',
          'Colonialism, 1857 Revolt, Mahatma Gandhi and Nationalist Movement, Framing Constitution'
        ]
      }
    ]
  },

  'Geography (Code 029)': {
    name: 'Geography',
    code: '029',
    theoryMarks: 70,
    practicalMarks: 30,
    units: [
      {
        unitTitle: 'Fundamentals of Human Geography & India: People and Economy',
        subTopics: [
          'World Population Distribution, Human Development, Primary/Secondary/Tertiary Activities',
          'India Population, Land and Water Resources, Mineral Resources, Sustainable Development'
        ]
      }
    ]
  },

  'Hindi Core (Code 302)': {
    name: 'Hindi Core',
    code: '302',
    theoryMarks: 80,
    practicalMarks: 20,
    units: [
      {
        unitTitle: 'खंड क, ख एवं ग (अपठित बोध, अभिव्यक्ति और माध्यम, पाठ्यपुस्तक आरोह व वितान)',
        subTopics: [
          'अपठित गद्यांश व काव्यांश बोध',
          'जनसंचार माध्यम, फीचर व आलेख लेखन',
          'आरोह काव्य व गद्य खंड, वितान भाग-2'
        ]
      }
    ]
  },

  'Hindi Elective (Code 002)': {
    name: 'Hindi Elective',
    code: '002',
    theoryMarks: 80,
    practicalMarks: 20,
    units: [
      {
        unitTitle: 'अपठित बोध, रचनात्मक लेखन, पाठ्यपुस्तक अंतरा एवं अंतराल भाग-2',
        subTopics: [
          'साहित्यिक अपठित विश्लेषण',
          'नाटक, कहानी और कविता रचना प्रक्रिया',
          'अंतरा एवं अंतराल पाठ्यपुस्तक'
        ]
      }
    ]
  },

  'English Core (Code 301)': {
    name: 'English Core',
    code: '301',
    theoryMarks: 80,
    practicalMarks: 20,
    units: [
      {
        unitTitle: 'Section A, B & C (Reading, Writing, Literature)',
        subTopics: [
          'Unseen Discursive & Case-Based Passages',
          'Notice Writing, Invitations, Letter to Editor, Job Application, Article/Report',
          'Flamingo Poetry & Prose, Vistas Supplementary'
        ]
      }
    ]
  },

  'Biology (Code 044)': {
    name: 'Biology',
    code: '044',
    theoryMarks: 70,
    practicalMarks: 30,
    units: [
      {
        unitTitle: 'Units VI to X: Reproduction, Genetics, Human Welfare, Biotechnology, Ecology',
        subTopics: [
          'Sexual Reproduction in Plants, Human Reproduction, Reproductive Health',
          'Mendelian Inheritance, Molecular Basis of Inheritance, Evolution',
          'Human Health & Disease, Microbes in Welfare, Recombinant DNA, Ecosystem & Biodiversity'
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
      {
        unitTitle: 'Solutions, Electrochemistry, Kinetics, Coordination, Organic Chemistry',
        subTopics: [
          'Raoult’s Law & Colligative Properties, Nernst Equation, Rate Law & Arrhenius Equation',
          'Transition Elements & Crystal Field Theory, Haloalkanes, Alcohols, Aldehydes, Amines, Biomolecules'
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
        unitTitle: 'Relations & Functions, Algebra, Calculus, Vectors, 3D Geometry, Probability',
        subTopics: [
          'Equivalence Relations & Inverse Trigonometry, Matrices & Determinants',
          'Continuity, Differentiability, Integrals & Differential Equations',
          'Vector Algebra, Three-Dimensional Lines, Bayes’ Theorem & LPP'
        ]
      }
    ]
  },

  'Informatics Practices (Code 065)': {
    name: 'Informatics Practices',
    code: '065',
    theoryMarks: 70,
    practicalMarks: 30,
    units: [
      {
        unitTitle: 'Pandas Data Handling, Data Visualization, SQL Queries, Networking',
        subTopics: [
          'Series and DataFrame with loc/iloc, Matplotlib Plots, SQL Functions & Joins, Cyber Etiquette'
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
        subTopics: ['Python Basics, Functions, Text/Binary/CSV File Handling, Linear Stack Implementation']
      },
      {
        unitTitle: 'Unit II: Computer Networks',
        subTopics: ['Transmission Media, Network Topologies, Devices, Protocols, VoIP, Cyber Security']
      },
      {
        unitTitle: 'Unit III: Database Management & SQL',
        subTopics: ['Relational Model, Keys, SQL DDL/DML, GROUP BY, Python-MySQL Connectivity']
      }
    ]
  },

  'Yoga (Code 841)': {
    name: 'Yoga',
    code: '841',
    theoryMarks: 50,
    practicalMarks: 50,
    units: [
      {
        unitTitle: 'Unit 1: Introduction to Yoga and Yogic Practices – II',
        subTopics: ['Shatkarma, Yogasana Alignment, Pranayama, Dhyana, Surya Namaskara']
      },
      {
        unitTitle: 'Unit 2: Introduction to Yoga Texts & Mental Well-being',
        subTopics: ['Mitahara in Hatha Pradipika, Patanjali Ashtanga Yoga, Stress Management']
      },
      {
        unitTitle: 'Unit 3: Yoga for Health Promotion – II',
        subTopics: ['First Aid & Safety, Management of Lifestyle Disorders, Therapeutic Asanas']
      }
    ]
  }
};
