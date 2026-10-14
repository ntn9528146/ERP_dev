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
  'Accountancy (Code 055)',
  'Business Studies (Code 054)',
  'Economics (Code 030)',
  'Computer Science (Code 083)',
  'Informatics Practices (Code 065)',
  'Physics (Code 042)',
  'Chemistry (Code 043)',
  'Mathematics (Code 041)',
  'Applied Mathematics (Code 241)',
  'Biology (Code 044)',
  'Physical Education (Code 048)',
  'Yoga (Code 841)',
  'Political Science (Code 028)',
  'History (Code 027)',
  'Geography (Code 029)',
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
  // ACCOUNTANCY (055) - EXACT 2026-27 SYLLABUS WITHOUT DELETED TOPICS
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
          'Division of Profit among Partners, Interest on Capital & Drawings',
          'Past Adjustments (Omissions and Errors in Interest/Profits)',
          'Guarantee of Minimum Profits to a Partner'
        ],
        experiments: [
          {
            expId: 'ACC-EXP-01',
            title: 'Comprehensive accounting project for a partnership firm preparing final accounts and ratio analysis',
            unitRef: 'Part A',
            vivaQueries: [
              { q: 'What is the maximum statutory number of partners allowed in a partnership firm?', a: '50 partners as per the Companies Rules.' }
            ]
          }
        ]
      },
      {
        unitTitle: 'Part A - Unit 2: Goodwill & Reconstitution of Partnership Firm',
        subTopics: [
          'Goodwill: Meaning, Factors affecting Goodwill, Need for Valuation',
          'Methods of Goodwill Valuation: Average Profits, Super Profits, Capitalization',
          'Change in Profit Sharing Ratio: Sacrificing and Gaining Ratio, Treatment of Reserves',
          'Revaluation of Assets and Reassessment of Liabilities',
          'Admission of a Partner: Effect on PSR, Goodwill Treatment (AS-26), Capital Adjustments',
          'Retirement and Death of a Partner: Gaining Ratio, Goodwill Treatment, Deceased Partner Profit'
        ]
      },
      {
        unitTitle: 'Part A - Unit 3: Dissolution of a Partnership Firm',
        subTopics: [
          'Dissolution of Partnership vs Dissolution of Firm',
          'Settlement of Accounts on Dissolution (Section 48)',
          'Preparation of Realisation Account and Realisation Expenses',
          'Treatment of Unrecorded Assets, Liabilities, and Partners Loans'
        ]
      },
      {
        unitTitle: 'Part A - Unit 4: Accounting for Companies - Shares & Debentures',
        subTopics: [
          'Share Capital: Authorized, Issued, Subscribed, Called-up, Paid-up',
          'Issue of Shares: At Par, At Premium, Calls in Arrears and Advance',
          'Over-subscription of Shares and Pro-rata Allotment Calculations',
          'Forfeiture of Shares and Reissue of Forfeited Shares (Capital Reserve)',
          'Issue of Debentures: As Collateral Security, Consideration other than Cash',
          'Writing off Discount / Loss on Issue of Debentures'
        ]
      },
      {
        unitTitle: 'Part B: Financial Statement Analysis (Deleted Topics Excluded)',
        subTopics: [
          'Financial Statements of a Company: Balance Sheet & Statement of P&L (Schedule III)',
          'Accounting Ratios: Liquidity Ratios (Current Ratio, Quick Ratio)',
          'Solvency Ratios: Debt to Equity, Total Assets to Debt, Proprietary, Interest Coverage',
          'Activity Ratios: Inventory Turnover, Trade Receivables/Payables Turnover, Working Capital Turnover',
          'Profitability Ratios: Gross Profit, Operating, Net Profit, Return on Investment (ROI)',
          'Cash Flow Statement: Operating, Investing, and Financing Activities (AS-3 Revised)'
        ]
      }
    ]
  },

  // COMPUTER SCIENCE (083)
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
          'File Handling: Text File Read/Write Operations',
          'Binary File Handling: pickle module, dump() and load() serialization',
          'CSV File Handling: csv module, reader() and writer() functions',
          'Data Structures: Implementation of Linear Stack using Python Lists'
        ]
      },
      {
        unitTitle: 'Unit II: Computer Networks',
        subTopics: [
          'Evolution of Networking: ARPANET, NSFNET, Internet Architecture',
          'Data Communication Terminologies: Bandwidth, Baud, Data Transfer Rate',
          'Transmission Media: Twisted Pair, Coaxial, Optical Fiber, Radio, Micro Waves',
          'Network Devices: NIC, Repeater, Hub, Switch, Bridge, Gateway, Router',
          'Network Topologies: Bus, Star, Tree, Mesh and Ring Topologies',
          'Network Protocols: TCP/IP, FTP, PPP, HTTP, HTTPS, SMTP, POP3, VoIP',
          'Network Security: Cyber Threats, Phishing, Firewalls, Cookies, Hackers'
        ]
      },
      {
        unitTitle: 'Unit III: Database Management & SQL Integration',
        subTopics: [
          'Relational Data Model: Relation, Tuple, Attribute, Degree, Cardinality',
          'Keys in Relational Database: Primary, Candidate, Alternate, Foreign Key',
          'SQL DDL Commands: CREATE TABLE, ALTER TABLE, DROP TABLE',
          'SQL DML Commands: INSERT INTO, UPDATE SET, DELETE FROM, SELECT',
          'SQL Aggregate Functions: COUNT(), SUM(), AVG(), MIN(), MAX()',
          'SQL Grouping & Joins: GROUP BY, HAVING, Equi-Join between Two Tables',
          'Python-MySQL Connectivity: mysql.connector, connect(), cursor(), execute(), commit()'
        ]
      }
    ]
  },

  // PHYSICAL EDUCATION (048)
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
          'Committees & Responsibilities (Pre, During, Post Event)',
          'Fixtures: Knock-Out (Bye & Seeding) and League (Staircase & Cyclic)',
          'Intramural & Extramural Tournaments'
        ]
      },
      {
        unitTitle: 'Unit II: Children & Women in Sports',
        subTopics: [
          'Common Postural Deformities: Knock Knees, Flat Foot, Lordosis, Kyphosis, Scoliosis',
          'Corrective Yogic Exercises for Posture Correction',
          'Female Athlete Triad: Osteoporosis, Amenorrhea, Eating Disorders'
        ]
      },
      {
        unitTitle: 'Unit III: Yoga as Preventive Measure for Lifestyle Diseases',
        subTopics: [
          'Obesity Management Asanas: Tadasana, Katichakrasana, Matsyasana',
          'Diabetes Management Asanas: Bhujangasana, Paschimottanasana, Ardha Matsyendrasana',
          'Asthma Management Asanas: Sukhasana, Chakrasana, Gomukhasana',
          'Hypertension Asanas: Mandukasana, Vakrasana, Shavasana'
        ]
      },
      {
        unitTitle: 'Unit IV: Physical Education & Sports for CWSN (Divyang)',
        subTopics: [
          'Organizations: Special Olympics, Paralympics, Deaflympics',
          'Concept of Classification and Divisioning',
          'Implementation of Inclusion in Schools'
        ]
      },
      {
        unitTitle: 'Unit V: Sports & Nutrition',
        subTopics: [
          'Macro and Micro Nutrients: Balanced Diet Calculations',
          'Nutritive & Non-Nutritive Components of Diet',
          'Eating for Weight Control and Food Myths'
        ]
      },
      {
        unitTitle: 'Unit VI: Test & Measurement in Sports',
        subTopics: [
          'SAI Khelo India Fitness Assessment Protocol',
          'Harvard Step Test: Computing Physical Fitness Index (PFI)',
          'Computing Basal Metabolic Rate (BMR)',
          'Rikli & Jones Senior Citizen Fitness Battery'
        ]
      },
      {
        unitTitle: 'Unit VII: Physiology & Injuries in Sports',
        subTopics: [
          'Physiological Factors determining Fitness Components',
          'Exercise Impacts on Cardiorespiratory System',
          'Sports Injuries Classification & First Aid (PRICER)'
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
          'Aggression Types in Sports'
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
  }
};
