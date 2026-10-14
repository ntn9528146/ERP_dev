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
  'Economics (Code 030)',
  'Accountancy (Code 055)',
  'Business Studies (Code 054)',
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
  // ECONOMICS (030) - FULL CBSE 2026-27 GRANULAR SUB-TOPICS (NO SHORT FALLBACK)
  'Economics (Code 030)': {
    name: 'Economics',
    code: '030',
    theoryMarks: 80,
    practicalMarks: 20,
    units: [
      {
        unitTitle: 'Part A - Unit 1: National Income and Related Aggregates (10 Marks)',
        subTopics: [
          'Circular Flow of Income (Two-Sector Model)',
          'Basic Concepts: Normal Residents, Domestic Territory, Final & Intermediate Goods',
          'Gross & Net Investment, Depreciation (Consumption of Fixed Capital)',
          'Net Indirect Taxes (NIT) and Net Factor Income from Abroad (NFIA)',
          'Aggregates: GDP, NDP, GNP, NNP at Market Price & Factor Cost',
          'Measurement of National Income: Value Added (Product) Method',
          'Measurement of National Income: Income Method & Factor Payments',
          'Measurement of National Income: Expenditure Method',
          'Real GDP vs Nominal GDP and GDP Deflator Index',
          'GDP and Welfare: Limitations (Non-monetary transactions, Externalities, Distribution)'
        ],
        experiments: [
          {
            expId: 'ECO-EXP-01',
            title: 'Project on Trends in India’s GDP Growth and Structural Sectoral Composition (1950-2026)',
            unitRef: 'Part A Unit 1',
            vivaQueries: [
              { q: 'Difference between Real GDP and Nominal GDP?', a: 'Nominal GDP is evaluated at current market prices, whereas Real GDP is evaluated at constant base year prices.' }
            ]
          }
        ]
      },
      {
        unitTitle: 'Part A - Unit 2: Money and Banking (06 Marks)',
        subTopics: [
          'Money: Meaning and Supply of Money (Currency with public + Demand deposits)',
          'Credit Creation / Money Multiplier Process by Commercial Banking System',
          'Central Bank (RBI): Functions (Bank of Issue, Government Banker, Bankers’ Bank)',
          'Quantitative Credit Control: Repo Rate, Reverse Repo Rate, Bank Rate, CRR, SLR',
          'Qualitative Credit Control: Open Market Operations (OMO) and Margin Requirements'
        ],
        experiments: [
          {
            expId: 'ECO-EXP-02',
            title: 'Analytical study of RBI’s Monetary Policy Rate Decisions and Inflation Control in India',
            unitRef: 'Part A Unit 2',
            vivaQueries: [
              { q: 'Formula for Money Multiplier?', a: 'Money Multiplier = 1 / Legal Reserve Ratio (LRR).' }
            ]
          }
        ]
      },
      {
        unitTitle: 'Part A - Unit 3: Determination of Income and Employment (12 Marks)',
        subTopics: [
          'Aggregate Demand (AD) and its Components (C + I + G + X - M)',
          'Propensity to Consume: Average (APC) and Marginal (MPC)',
          'Propensity to Save: Average (APS) and Marginal (MPS)',
          'Short-run Equilibrium Output: AD-AS Approach and S-I Approach',
          'Investment Multiplier (k = 1/MPS = 1/(1-MPC)) and its Stepwise Working',
          'Full Employment and Involuntary Unemployment Concept',
          'Problems of Excess Demand (Inflationary Gap) and Deficient Demand (Deflationary Gap)',
          'Fiscal Measures and Monetary Measures to Correct Excess & Deficient Demand'
        ]
      },
      {
        unitTitle: 'Part A - Unit 4: Government Budget and the Economy (06 Marks)',
        subTopics: [
          'Government Budget: Meaning, Objectives, and Fiscal Allocation of Resources',
          'Classification of Receipts: Revenue Receipts (Tax & Non-Tax) vs Capital Receipts',
          'Classification of Expenditure: Revenue Expenditure vs Capital Expenditure',
          'Budgetary Deficits: Revenue Deficit, Fiscal Deficit, Primary Deficit (Formulas & Implications)'
        ]
      },
      {
        unitTitle: 'Part A - Unit 5: Balance of Payments (06 Marks)',
        subTopics: [
          'Balance of Payments (BoP) Account: Meaning and Components',
          'Current Account (Visible & Invisible Trade, Unilateral Transfers)',
          'Capital Account (FDI, FII, External Commercial Borrowings, NRI Deposits)',
          'BoP Deficit, BoP Surplus, and Official Reserve Transactions',
          'Foreign Exchange Rate: Fixed, Flexible, and Managed Floating Systems',
          'Determination of Exchange Rate in a Free Market and Currency Depreciation vs Devaluation'
        ]
      },
      {
        unitTitle: 'Part B - Unit 6: Development Experience (1947-90) & Economic Reforms (12 Marks)',
        subTopics: [
          'State of Indian Economy on the Eve of Independence (Agriculture, Industry, Trade, Demography)',
          'Common Goals of Five Year Plans: Growth, Modernisation, Self-reliance and Equity',
          'Agrarian Reforms: Land Ceilings, Abolition of Intermediaries, and Green Revolution',
          'Industrial Policy Resolution 1956 (IPR 1956) and Small-Scale Industries (Karve Committee)',
          'Foreign Trade Strategy: Inward-Looking Trade Policy (Import Substitution)',
          'Economic Crisis of 1991 and Origin of New Economic Policy (NEP)',
          'Liberalisation: Deregulation of industrial sector, financial sector reforms, tax reforms, forex market',
          'Privatisation: Disinvestment of Public Sector Undertakings (PSUs)',
          'Globalisation: Outsourcing and World Trade Organisation (WTO) Commitments',
          'Critical Appraisal of LPG Policies: Achievements and Limitations'
        ]
      },
      {
        unitTitle: 'Part B - Unit 7: Current Challenges Facing Indian Economy (20 Marks)',
        subTopics: [
          'Human Capital Formation: Sources (Education, Health, On-the-job Training, Migration, Information)',
          'Human Capital vs Physical Capital and Role of Human Capital in Economic Growth',
          'Education Sector in India: Elementary, Secondary, Higher Education and NEP 2020 Goals',
          'Rural Development: Credit and Marketing Systems, Role of NABARD and Micro-Credit (SHGs)',
          'Agricultural Diversification: Horticulture, Dairy, Fisheries, Animal Husbandry',
          'Organic Farming: Benefits, Process, and Contemporary Limitations',
          'Employment: Worker-Population Ratio, Formal vs Informal Sector Employment (Informalisation)',
          'Unemployment: Rural (Disguised, Seasonal) and Urban (Educated), Government Schemes',
          'Sustainable Economic Development: Functions of Environment, Carrying Capacity, Global Warming, Ozone Depletion',
          'Strategies for Sustainable Development: Solar Energy, Wind Power, Biogas, Mini-hydel plants'
        ]
      },
      {
        unitTitle: 'Part B - Unit 8: Development Experience of India: A Comparison with Neighbours (08 Marks)',
        subTopics: [
          'Historical Trajectory: India, Pakistan and China (Starting Points and Five Year Plans)',
          'China’s Economic Path: Great Leap Forward (1958), Cultural Revolution, Special Economic Zones (SEZs)',
          'Pakistan’s Economic Path: Selective Nationalisation, Green Revolution, Financial Denationalisation',
          'Demographic Indicators: Population Growth, Fertility Rate, Sex Ratio, Density, Urbanisation',
          'Sectoral GDP Contribution and Employment Share across Primary, Secondary, Tertiary Sectors',
          'Human Development Indicators (HDI): Life Expectancy, Mean Years of Schooling, Maternal Mortality, Rank Comparisons'
        ]
      }
    ]
  },

  // ACCOUNTANCY (055)
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
            title: 'Comprehensive partnership final accounting project with ratio analysis',
            unitRef: 'Part A',
            vivaQueries: [
              { q: 'Maximum number of partners allowed in a partnership firm?', a: '50 partners as per Companies Rules.' }
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
