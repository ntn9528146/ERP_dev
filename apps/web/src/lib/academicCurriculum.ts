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
  'Computer Science (Code 083)',
  'Physics (Code 042)',
  'Chemistry (Code 043)',
  'Mathematics (Code 041)',
  'Applied Mathematics (Code 241)',
  'Biology (Code 044)',
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
  
  { id: 'c11-sci', name: 'Class 11 (Science)', availableSubjects: SENIOR_SECONDARY_ALL_SUBJECTS },
  { id: 'c11-comm', name: 'Class 11 (Commerce)', availableSubjects: SENIOR_SECONDARY_ALL_SUBJECTS },
  { id: 'c11-hum', name: 'Class 11 (Humanities)', availableSubjects: SENIOR_SECONDARY_ALL_SUBJECTS },
  { id: 'c12-sci', name: 'Class 12 (Science)', availableSubjects: SENIOR_SECONDARY_ALL_SUBJECTS },
  { id: 'c12-comm', name: 'Class 12 (Commerce)', availableSubjects: SENIOR_SECONDARY_ALL_SUBJECTS },
  { id: 'c12-hum', name: 'Class 12 (Humanities)', availableSubjects: SENIOR_SECONDARY_ALL_SUBJECTS }
];

export const ACADEMIC_CLASSES = ALL_CBSE_CLASSES;

export const DETAILED_SYLLABUS_2026_27: Record<string, SubjectCurriculum> = {
  // COMPUTER SCIENCE (083) - DISCRETE GRANULAR TOPICS
  'Computer Science (Code 083)': {
    name: 'Computer Science',
    code: '083',
    theoryMarks: 70,
    practicalMarks: 30,
    units: [
      {
        unitTitle: 'Unit I: Computational Thinking and Programming - 2',
        subTopics: [
          'Revision of Python Basics (Tokens, Operators, Expressions)',
          'Flow of Control (Conditional & Looping Constructs)',
          'Strings: Slicing, Traversal and Built-in String Methods',
          'Lists: Creation, Slicing, Mutability and List Operations',
          'Tuples: Immutability, Operations and Tuple Slicing',
          'Dictionary: Keys, Values, Mutability and Dictionary Methods',
          'Functions: Scope (Local vs Global), Parameter Passing & Default Arguments',
          'File Handling: Introduction and Text File Read/Write Operations',
          'Binary File Handling: pickle module, dump() and load() serialization',
          'CSV File Handling: csv module, reader() and writer() functions',
          'Data Structures: Implementation of Linear Stack using Python Lists'
        ],
        experiments: [
          {
            expId: 'CS-EXP-01',
            title: 'Read a text file line-by-line and display words having character length greater than 4',
            unitRef: 'Unit I (File Handling)',
            vivaQueries: [
              { q: 'Difference between strip() and split()?', a: 'strip() removes surrounding whitespaces; split() tokenizes a string into a list based on delimiter.' }
            ]
          },
          {
            expId: 'CS-EXP-02',
            title: 'Store student dictionary records into a binary file using pickle.dump() and search by roll number',
            unitRef: 'Unit I (Binary File)',
            vivaQueries: [
              { q: 'What is Pickling?', a: 'Process of serializing a Python object structure into a byte stream.' }
            ]
          },
          {
            expId: 'CS-EXP-03',
            title: 'Stack Implementation: Menu-driven Push and Pop operations for book inventory',
            unitRef: 'Unit I (Stack)',
            vivaQueries: [
              { q: 'What principle governs Stack operations?', a: 'Last In First Out (LIFO).' }
            ]
          }
        ]
      },
      {
        unitTitle: 'Unit II: Computer Networks',
        subTopics: [
          'Evolution of Networking: ARPANET, NSFNET, Internet Architecture',
          'Data Communication Terminologies: Bandwidth, Baud, Data Transfer Rate (bps, kbps, Mbps)',
          'Transmission Media: Twisted Pair, Coaxial Cable, Optical Fiber, Radio, Micro & Infrared Waves',
          'Network Devices: NIC, Repeater, Hub, Switch, Bridge, Gateway, Router',
          'Network Topologies: Bus, Star, Tree, Mesh and Ring Topologies',
          'Network Protocols: TCP/IP, FTP, PPP, HTTP, HTTPS, SMTP, POP3, VoIP',
          'Network Security Concepts: Cyber Threats, Phishing, Firewalls, Cookies, Hackers vs Crackers'
        ]
      },
      {
        unitTitle: 'Unit III: Database Management & SQL Integration',
        subTopics: [
          'Relational Data Model: Relation, Tuple, Attribute, Degree, Cardinality',
          'Keys in Relational Database: Primary Key, Candidate Key, Alternate Key, Foreign Key',
          'SQL DDL Commands: CREATE TABLE, ALTER TABLE, DROP TABLE',
          'SQL DML Commands: INSERT INTO, UPDATE SET, DELETE FROM, SELECT',
          'SQL Aggregate Functions: COUNT(), SUM(), AVG(), MIN(), MAX()',
          'SQL Grouping & Joins: GROUP BY, HAVING, Equi-Join between Two Tables',
          'Python-MySQL Connectivity: mysql.connector, connect(), cursor(), execute(), fetchall(), commit()'
        ]
      }
    ]
  },

  // ACCOUNTANCY (055) - DISCRETE GRANULAR TOPICS
  'Accountancy (Code 055)': {
    name: 'Accountancy',
    code: '055',
    theoryMarks: 80,
    practicalMarks: 20,
    units: [
      {
        unitTitle: 'Part A - Unit 1: Accounting for Partnership Firms - Fundamentals',
        subTopics: [
          'Partnership: Features, Partnership Deed and Provisions in Absence of Deed',
          'Fixed vs Fluctuating Capital Accounts of Partners',
          'Preparation of Profit and Loss Appropriation Account',
          'Division of Profit among Partners and Interest on Drawings / Capital',
          'Past Adjustments (Omissions and Errors in Interest/Profits)',
          'Guarantee of Minimum Profits to a Partner'
        ],
        experiments: [
          {
            expId: 'ACC-EXP-01',
            title: 'Comprehensive partnership final accounting project with ratio analysis',
            unitRef: 'Part A',
            vivaQueries: [
              { q: 'Maximum number of partners allowed in a partnership firm?', a: '50 partners.' }
            ]
          }
        ]
      },
      {
        unitTitle: 'Part A - Unit 2: Goodwill & Reconstitution of Partnership Firm',
        subTopics: [
          'Goodwill: Meaning, Factors affecting Goodwill, Need for Valuation',
          'Methods of Goodwill Valuation: Average Profits, Super Profits, Capitalization Methods',
          'Change in Profit Sharing Ratio: Sacrificing Ratio and Gaining Ratio',
          'Accounting Treatment of Existing Reserves, Accumulated Profits and Losses',
          'Revaluation of Assets and Reassessment of Liabilities',
          'Admission of a Partner: Effect on PSR, Treatment of Goodwill (AS-26), Capital Adjustment',
          'Retirement and Death of a Partner: Calculation of Gaining Ratio, Treatment of Goodwill',
          'Settlement of Loan Account of Retiring Partner and Deceased Partner Capital Account'
        ]
      },
      {
        unitTitle: 'Part A - Unit 3: Dissolution of a Partnership Firm',
        subTopics: [
          'Meaning of Dissolution of Partnership vs Dissolution of Firm',
          'Settlement of Accounts on Dissolution (Section 48)',
          'Preparation of Realisation Account and Treatment of Realisation Expenses',
          'Treatment of Unrecorded Assets, Unrecorded Liabilities and Partners Loan Accounts'
        ]
      },
      {
        unitTitle: 'Part A - Unit 4: Accounting for Companies - Share Capital & Debentures',
        subTopics: [
          'Share Capital: Authorized, Issued, Subscribed, Called-up, Paid-up Capital',
          'Issue of Shares: At Par, At Premium, Calls in Arrears and Calls in Advance',
          'Over-subscription of Shares and Accounting for Pro-rata Allotment',
          'Forfeiture of Shares and Reissue of Forfeited Shares',
          'Issue of Debentures: As Collateral Security, Consideration other than Cash',
          'Writing off Discount / Loss on Issue of Debentures'
        ]
      },
      {
        unitTitle: 'Part B: Financial Statement Analysis & Cash Flow Statement',
        subTopics: [
          'Balance Sheet and Statement of Profit and Loss as per Schedule III (Companies Act 2013)',
          'Tools of Financial Analysis: Comparative Statements and Common-Size Statements',
          'Accounting Ratios: Liquidity Ratios (Current, Quick)',
          'Solvency Ratios: Debt-Equity, Total Assets to Debt, Proprietary, Interest Coverage',
          'Activity Ratios: Inventory Turnover, Trade Receivables/Payables Turnover, Working Capital Turnover',
          'Profitability Ratios: Gross Profit, Operating, Net Profit, Return on Investment (ROI)',
          'Cash Flow Statement (AS-3): Operating, Investing, and Financing Activities'
        ]
      }
    ]
  },

  // PHYSICAL EDUCATION (048) - DISCRETE GRANULAR TOPICS
  'Physical Education (Code 048)': {
    name: 'Physical Education',
    code: '048',
    theoryMarks: 70,
    practicalMarks: 30,
    units: [
      {
        unitTitle: 'Unit I: Management of Sporting Events',
        subTopics: [
          'Functions of Sports Event Management (Planning, Organizing, Staffing, Directing, Controlling)',
          'Committees and their Responsibilities (Pre, During, Post Event)',
          'Knock-Out Tournament Fixtures: Calculation of Byes and Seedings',
          'League Tournament Fixtures: Cyclic and Staircase Methods',
          'Intramural and Extramural Competitions'
        ],
        experiments: [
          {
            expId: 'PE-EXP-01',
            title: 'Draw a complete fixture of 21 teams on Knock-Out basis showing calculation of Byes',
            unitRef: 'Unit I',
            vivaQueries: [
              { q: 'Formula for matches in knock-out?', a: 'Total Matches = N - 1.' }
            ]
          }
        ]
      },
      {
        unitTitle: 'Unit II: Children & Women in Sports',
        subTopics: [
          'Common Postural Deformities: Knock Knees, Flat Foot, Lordosis, Kyphosis, Scoliosis',
          'Corrective Yogic Exercises for Posture Correction',
          'Special Considerations: Menarche and Menstrual Disfunction',
          'Female Athlete Triad: Osteoporosis, Amenorrhea, Eating Disorders'
        ]
      },
      {
        unitTitle: 'Unit III: Yoga as Preventive Measure for Lifestyle Diseases',
        subTopics: [
          'Obesity Asanas: Tadasana, Katichakrasana, Matsyasana',
          'Diabetes Asanas: Bhujangasana, Paschimottanasana, Ardha Matsyendrasana',
          'Asthma Asanas: Sukhasana, Chakrasana, Gomukhasana',
          'Hypertension Asanas: Mandukasana, Vakrasana, Shavasana'
        ]
      },
      {
        unitTitle: 'Unit IV: Physical Education & Sports for CWSN (Divyang)',
        subTopics: [
          'Organizations Promoting Disability Sports: Special Olympics, Paralympics, Deaflympics',
          'Classification and Divisioning in Sports',
          'Strategies to make Physical Activities Accessible for CWSN'
        ]
      },
      {
        unitTitle: 'Unit V: Sports & Nutrition',
        subTopics: [
          'Balanced Diet: Macro and Micro Nutrients',
          'Nutritive vs Non-Nutritive Components of Diet',
          'Pitfalls of Dieting and Food Myths'
        ]
      },
      {
        unitTitle: 'Unit VI: Test & Measurement in Sports',
        subTopics: [
          'SAI Khelo India Fitness Assessment Protocol',
          'Harvard Step Test: Computing Physical Fitness Index (PFI)',
          'Computing Basal Metabolic Rate (BMR)',
          'Rikli & Jones Senior Citizen Fitness Test'
        ],
        experiments: [
          {
            expId: 'PE-EXP-02',
            title: 'Conduct Harvard Step Test and calculate PFI',
            unitRef: 'Unit VI',
            vivaQueries: [
              { q: 'Bench height in Harvard Step Test?', a: '20 inches for boys, 16 inches for girls.' }
            ]
          }
        ]
      },
      {
        unitTitle: 'Unit VII: Physiology & Injuries in Sports',
        subTopics: [
          'Physiological Factors determining Strength, Speed, Endurance, Flexibility',
          'Effect of Exercise on Muscular and Cardiorespiratory Systems',
          'Classification of Sports Injuries (Sprain, Strain, Contusion, Fracture)',
          'First Aid Management: P.R.I.C.E. / P.R.I.C.E.R. Procedure'
        ]
      },
      {
        unitTitle: 'Unit VIII: Biomechanics & Sports',
        subTopics: [
          'Newton’s Laws of Motion in Sporting Contexts',
          'Types of Levers and Mechanical Advantage in Sports',
          'Equilibrium, Center of Gravity, and Projectile Motion'
        ]
      },
      {
        unitTitle: 'Unit IX: Psychology & Sports',
        subTopics: [
          'Personality Types (Jung and Big Five Model)',
          'Motivation Techniques in Athletic Performance',
          'Aggression in Sports: Hostile, Instrumental, and Assertive'
        ]
      },
      {
        unitTitle: 'Unit X: Training in Sports',
        subTopics: [
          'Sports Training Cycles: Micro, Meso, Macro Cycles',
          'Methods of Developing Strength, Endurance, Speed, Flexibility',
          'Circuit Training and Continuous Training Protocols'
        ]
      }
    ]
  },

  // BUSINESS STUDIES (054) - DISCRETE GRANULAR TOPICS
  'Business Studies (Code 054)': {
    name: 'Business Studies',
    code: '054',
    theoryMarks: 80,
    practicalMarks: 20,
    units: [
      {
        unitTitle: 'Part A: Principles and Functions of Management',
        subTopics: [
          'Management: Concept, Objectives, Importance, Management as Science/Art/Profession',
          'Levels of Management (Top, Middle, Operational)',
          'Coordination: Concept, Characteristics and Importance',
          'Principles of Management: Fayol’s 14 Principles of Management',
          'Taylor’s Scientific Management: Principles and Scientific Techniques',
          'Business Environment: Dimensions (Economic, Social, Technological, Political, Legal)',
          'Planning: Importance, Limitations, Planning Process, Types of Plans',
          'Organizing: Process, Formal vs Informal Organization, Delegation & Decentralization',
          'Staffing: Recruitment, Selection Process, Training and Development Methods',
          'Directing: Motivation (Maslow’s Theory), Leadership Styles, Communication Barriers',
          'Controlling: Importance, Limitations, Controlling Process, Relationship with Planning'
        ],
        experiments: [
          {
            expId: 'BST-EXP-01',
            title: 'Field survey analyzing consumer behavior or management principles in an enterprise',
            unitRef: 'Part A',
            vivaQueries: [
              { q: 'Difference between Delegation and Decentralization?', a: 'Delegation is assignment of authority to immediate subordinate; Decentralization is company-wide systematic dispersal of authority.' }
            ]
          }
        ]
      },
      {
        unitTitle: 'Part B: Business Finance and Marketing',
        subTopics: [
          'Financial Management: Objectives, Financial Decisions (Investment, Financing, Dividend)',
          'Financial Planning: Capital Structure (Trading on Equity), Fixed and Working Capital Factors',
          'Financial Markets: Money Market Instruments, Capital Market (Primary vs Secondary)',
          'Stock Exchange: Trading Procedure on NSE/BSE, Depository System, Functions of SEBI',
          'Marketing Management: Marketing Mix 4 Ps (Product, Price, Place, Promotion)',
          'Consumer Protection Act 2019: Rights, Responsibilities and Three-tier Redressal Machinery'
        ]
      }
    ]
  },

  // ECONOMICS (030) - DISCRETE GRANULAR TOPICS
  'Economics (Code 030)': {
    name: 'Economics',
    code: '030',
    theoryMarks: 80,
    practicalMarks: 20,
    units: [
      {
        unitTitle: 'Part A: Introductory Macroeconomics',
        subTopics: [
          'Circular Flow of Income (Two-Sector Model)',
          'Concepts of Aggregates: GDP, NDP, GNP, NNP at MP and FC',
          'Measurement of National Income: Value Added Method, Income Method, Expenditure Method',
          'Money: Functions of Money, Money Creation by Commercial Banking System',
          'Central Bank (RBI) Functions and Tools of Monetary Policy',
          'Determination of Income and Employment: Aggregate Demand & Supply, Propensity to Consume (APC, MPC)',
          'Short-Run Equilibrium Output and Investment Multiplier',
          'Problems of Excess Demand and Deficient Demand and Monetary/Fiscal Measures',
          'Government Budget: Objectives, Classification of Receipts & Expenditure, Budget Deficits',
          'Balance of Payments: Current Account, Capital Account, Foreign Exchange Rate Systems'
        ],
        experiments: [
          {
            expId: 'ECO-EXP-01',
            title: 'Project report analyzing trends of inflation, GDP growth rate, and RBI repo rate policy',
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
          'State of Indian Economy on the Eve of Independence',
          'Indian Economy (1950-1990): Goals of Five Year Plans, Agriculture, Industry, Trade',
          'Economic Reforms since 1991: Liberalisation, Privatisation, Globalisation (LPG)',
          'Human Capital Formation in India: Education and Health Sector investments',
          'Rural Development: Rural Credit, Agricultural Marketing, Organic Farming',
          'Employment: Growth, Informalisation, Unemployment Types and Government Policies',
          'Sustainable Economic Development: Meaning, Effects on Resources and Environment',
          'Comparative Development Experiences of India, Pakistan and China'
        ]
      }
    ]
  },

  // YOGA (841) - DISCRETE GRANULAR TOPICS
  'Yoga (Code 841)': {
    name: 'Yoga',
    code: '841',
    theoryMarks: 50,
    practicalMarks: 50,
    units: [
      {
        unitTitle: 'Unit 1: Introduction to Yoga and Yogic Practices – II',
        subTopics: [
          'Shatkarma: Meaning, Purpose, Significance in Hatha Yoga Sadhana',
          'Yogasana: Principles, Structural Alignment and Health Benefits',
          'Pranayama Practices (Anulom-Vilom, Bhastrika, Sheetali, Ujjayi)',
          'Dhyana & Meditation Techniques for Stress Reduction',
          'Surya Namaskara: 12 Steps Sequence, Mantras, and Breathing Coordination'
        ],
        experiments: [
          {
            expId: 'YOG-EXP-01',
            title: 'Demonstration and assessment of 12-step Surya Namaskara with breathing synchronization',
            unitRef: 'Unit 1',
            vivaQueries: [
              { q: 'Benefits of Bhujangasana?', a: 'Expands thoracic cavity, strengthens lumbar spine, and stimulates abdominal digestive organs.' }
            ]
          }
        ]
      },
      {
        unitTitle: 'Unit 2: Introduction to Yoga Texts & Mental Well-being',
        subTopics: [
          'Concepts of Mitahara (Diet) according to Hatha Yoga Pradipika',
          'Patanjali Ashtanga Yoga: Yama, Niyama, Asana, Pranayama, Pratyahara, Dharana, Dhyana, Samadhi',
          'Yogic Stress Management Frameworks (Adhi-Vyadhi Concept)',
          'Role of Karma Yoga in Developing Balanced Personality'
        ]
      },
      {
        unitTitle: 'Unit 3: Yoga for Health Promotion – II',
        subTopics: [
          'First Aid Principles and Sports Safety in Yogic Training',
          'Yogic Management of Chronic Lifestyle Disorders (Hypertension, Diabetes, Asthma)',
          'Therapeutic Asanas and Contraindications'
        ]
      }
    ]
  }
};
