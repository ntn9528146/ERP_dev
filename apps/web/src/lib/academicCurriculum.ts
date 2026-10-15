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
  'Yoga (Code 841)',
  'Physical Education (Code 048)',
  'Economics (Code 030)',
  'Accountancy (Code 055)',
  'Business Studies (Code 054)',
  'Mathematics (Code 041)',
  'Applied Mathematics (Code 241)',
  'Computer Science (Code 083)',
  'Informatics Practices (Code 065)',
  'Physics (Code 042)',
  'Chemistry (Code 043)',
  'Biology (Code 044)',
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
  // 1. YOGA (CODE 841) - FULL RESTORED SUBTOPICS WITH DEDICATED CHECKBOXES
  'Yoga (Code 841)': {
    name: 'Yoga',
    code: '841',
    theoryMarks: 50,
    practicalMarks: 50,
    units: [
      {
        unitTitle: 'Unit 1: Introduction to Yoga and Yogic Practices – II',
        subTopics: [
          'Shatkarma: Meaning, Purpose and Significance in Hatha Yoga Sadhana',
          'Dhauti, Basti, Neti, Trataka, Nauli and Kapalabhati Cleansing Principles',
          'Yogasana: Principles, Physical Alignment, Counter-poses and Health Benefits',
          'Standing Asanas: Tadasana, Vrikshasana, Pada-hastasana, Trikonasana',
          'Sitting Asanas: Padmasana, Vajrasana, Paschimottanasana, Ardha Matsyendrasana',
          'Prone-lying Asanas: Bhujangasana, Salabhasana, Dhanurasana, Makarasana',
          'Supine-lying Asanas: Setubandhasana, Sarvangasana, Halasana, Shavasana',
          'Pranayama Practices: Anulom-Vilom, Bhastrika, Sheetali, Sheetkari, Bhramari, Ujjayi',
          'Dhyana & Meditation Techniques for Psychosomatic Stress Reduction',
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
          'Patanjali Ashtanga Yoga: Yama (Ahimsa, Satya, Asteya, Brahmacharya, Aparigraha)',
          'Patanjali Ashtanga Yoga: Niyama (Saucha, Santosha, Tapas, Svadhyaya, Ishvara Pranidhana)',
          'Bahiranga Yoga (Asana, Pranayama, Pratyahara) vs Antaranga Yoga (Dharana, Dhyana, Samadhi)',
          'Yogic Stress Management Frameworks: Adhi-Vyadhi Concept',
          'Role of Karma Yoga and Bhakti Yoga in Developing Balanced Personality'
        ]
      },
      {
        unitTitle: 'Unit 3: Yoga for Health Promotion – II',
        subTopics: [
          'First Aid Principles and Sports Safety in Yogic Training',
          'Yogic Management of Chronic Lifestyle Disorders (Hypertension, Obesity, Diabetes, Asthma)',
          'Therapeutic Asanas and Contraindications for Cervical Spondylosis and Lumbar Pain',
          'Pancha Kosha Theory (Annamaya, Pranamaya, Manomaya, Vijnanamaya, Anandamaya)'
        ]
      }
    ]
  },

  // 2. PHYSICAL EDUCATION (CODE 048)
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
          'Committees & their Responsibilities (Pre, During and Post Event Management)',
          'Fixtures: Knock-Out Tournament Procedure (Calculation of Byes and Seedings)',
          'Fixtures: League Tournament Procedure (Cyclic and Staircase Methods)',
          'Intramural & Extramural Competitions: Meaning, Objectives and Significance',
          'Community Sports Programs (Sports Day, Health Run, Run for Fun, Run for Unity)'
        ],
        experiments: [
          {
            expId: 'PE-EXP-01',
            title: 'Draw a complete fixture of 21 teams on Knock-Out basis showing calculation of Byes and rounds',
            unitRef: 'Unit I',
            vivaQueries: [
              { q: 'Formula to calculate total matches in knock-out tournament?', a: 'Total Matches = N - 1, where N is the total number of teams.' }
            ]
          }
        ]
      },
      {
        unitTitle: 'Unit II: Children & Women in Sports',
        subTopics: [
          'Common Postural Deformities: Knock Knees (Genu Valgum) and Flat Foot (Pes Planus)',
          'Spinal Deformities: Kyphosis, Lordosis and Scoliosis (Causes and Corrective Exercises)',
          'Corrective Yogic Exercises and Postural Rehabilitation',
          'Special Considerations for Female Athletes: Menarche and Menstrual Disfunction',
          'Female Athlete Triad: Osteoporosis, Amenorrhea, and Eating Disorders'
        ]
      },
      {
        unitTitle: 'Unit III: Yoga as Preventive Measure for Lifestyle Diseases',
        subTopics: [
          'Obesity Management: Procedure, Benefits & Contraindications for Tadasana, Katichakrasana, Matsyasana',
          'Diabetes Management: Bhujangasana, Paschimottanasana, Pavanmuktasana, Ardha Matsyendrasana',
          'Asthma Management: Sukhasana, Chakrasana, Gomukhasana, Parvatasana, Bhujangasana',
          'Hypertension Management: Tadasana, Mandukasana, Gomukhasana, Vakrasana, Shavasana'
        ]
      },
      {
        unitTitle: 'Unit IV: Physical Education & Sports for CWSN (Divyang)',
        subTopics: [
          'Organizations Promoting Disability Sports: Special Olympics, Paralympics, Deaflympics',
          'Concept of Classification and Divisioning in Disability Sports',
          'Concept of Inclusion in Sports: Need, Importance and Implementation',
          'Strategies to Make Physical Activities Accessible for Children with Special Needs'
        ]
      },
      {
        unitTitle: 'Unit V: Sports & Nutrition',
        subTopics: [
          'Concept of Balanced Diet and Nutrition: Macro and Micro Nutrients',
          'Nutritive Components of Diet (Carbohydrates, Proteins, Fats, Vitamins, Minerals)',
          'Non-Nutritive Components of Diet (Fiber/Roughage, Water, Colors, Flavors)',
          'Eating for Weight Control: Healthy Weight, Pitfalls of Dieting, Food Intolerance, Food Myths'
        ]
      },
      {
        unitTitle: 'Unit VI: Test & Measurement in Sports',
        subTopics: [
          'SAI Khelo India Fitness Assessment Protocol (Age groups 5-8 yrs and 9-18+ yrs)',
          'Harvard Step Test: Computing Physical Fitness Index (PFI) - Long Form & Short Form',
          'Computing Basal Metabolic Rate (BMR) and Body Mass Index (BMI)',
          'Rikli & Jones Senior Citizen Fitness Test: Chair Stand, Arm Curl, Chair Sit and Reach, Back Scratch, 8-Foot Up and Go'
        ],
        experiments: [
          {
            expId: 'PE-EXP-02',
            title: 'Conduct Harvard Step Test on a subject and calculate Physical Fitness Index (PFI)',
            unitRef: 'Unit VI',
            vivaQueries: [
              { q: 'What is the bench height used in the Harvard Step Test for boys?', a: '20 inches (50.8 cm).' }
            ]
          }
        ]
      },
      {
        unitTitle: 'Unit VII: Physiology & Injuries in Sports',
        subTopics: [
          'Physiological Factors Determining Fitness Components (Strength, Speed, Endurance, Flexibility)',
          'Effect of Exercise on Muscular System (Hypertrophy, Aerobic/Anaerobic changes)',
          'Effect of Exercise on Cardiorespiratory System (Stroke Volume, Cardiac Output, VO2 Max)',
          'Sports Injuries Classification: Soft Tissue and Bone/Joint Fractures',
          'First Aid Management: P.R.I.C.E. and P.R.I.C.E.R. Procedure'
        ]
      },
      {
        unitTitle: 'Unit VIII: Biomechanics & Sports',
        subTopics: [
          'Newton’s Laws of Motion and their Application in Athletic Sports',
          'Levers: Types (Class I, II, III) and their Mechanical Advantage in Sports Movements',
          'Equilibrium: Dynamic & Static, and Center of Gravity with Sporting Applications',
          'Friction & Sports and Projectile Trajectory in Athletic Throwing Events'
        ]
      },
      {
        unitTitle: 'Unit IX: Psychology & Sports',
        subTopics: [
          'Personality: Definition, Types (Carl Jung’s Classification & Big Five Theory)',
          'Motivation: Meaning, Types (Intrinsic & Extrinsic) and Motivational Techniques',
          'Exercise Adherence: Reasons, Benefits and Behavioral Strategies',
          'Aggression in Sports: Hostile, Instrumental, and Assertive Behavior'
        ]
      },
      {
        unitTitle: 'Unit X: Training in Sports',
        subTopics: [
          'Sports Training Cycles: Micro Cycle (3-7 days), Meso Cycle (3-6 weeks), Macro Cycle',
          'Methods for Developing Strength: Isometric, Isotonic, and Isokinetic Exercises',
          'Methods for Developing Endurance: Continuous, Interval, and Fartlek Training',
          'Methods for Developing Speed: Acceleration Runs and Pace Races',
          'Circuit Training: Meaning, Characteristics and Designing Circuit Training Stations'
        ]
      }
    ]
  },

  // 3. ECONOMICS (CODE 030)
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
          'Measurement of National Income: Value Added Method',
          'Measurement of National Income: Income Method & Factor Payments',
          'Measurement of National Income: Expenditure Method',
          'Real GDP vs Nominal GDP and GDP Deflator Index',
          'GDP and Welfare: Limitations (Non-monetary transactions, Externalities, Distribution)'
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
          'Budgetary Deficits: Revenue Deficit, Fiscal Deficit, Primary Deficit'
        ]
      },
      {
        unitTitle: 'Part A - Unit 5: Balance of Payments (06 Marks)',
        subTopics: [
          'Balance of Payments (BoP) Account: Meaning and Components',
          'Current Account (Visible & Invisible Trade, Unilateral Transfers)',
          'Capital Account (FDI, FII, External Commercial Borrowings, NRI Deposits)',
          'BoP Deficit, BoP Surplus, and Official Reserve Transactions',
          'Foreign Exchange Rate: Fixed, Flexible, and Managed Floating Systems'
        ]
      },
      {
        unitTitle: 'Part B - Unit 6: Development Experience (1947-90) & Economic Reforms (12 Marks)',
        subTopics: [
          'State of Indian Economy on the Eve of Independence (Agriculture, Industry, Trade, Demography)',
          'Common Goals of Five Year Plans: Growth, Modernisation, Self-reliance and Equity',
          'Agrarian Reforms: Land Ceilings, Abolition of Intermediaries, and Green Revolution',
          'Industrial Policy Resolution 1956 (IPR 1956) and Small-Scale Industries',
          'Foreign Trade Strategy: Inward-Looking Trade Policy (Import Substitution)',
          'Economic Crisis of 1991 and Origin of New Economic Policy (NEP)',
          'Liberalisation, Privatisation (Disinvestment), and Globalisation (LPG)'
        ]
      },
      {
        unitTitle: 'Part B - Unit 7: Current Challenges Facing Indian Economy (20 Marks)',
        subTopics: [
          'Human Capital Formation: Sources (Education, Health, On-the-job Training, Migration)',
          'Human Capital vs Physical Capital and Role in Economic Growth',
          'Rural Development: Credit and Marketing Systems, Role of NABARD and Micro-Credit (SHGs)',
          'Agricultural Diversification: Horticulture, Dairy, Fisheries, Animal Husbandry',
          'Organic Farming: Benefits, Process, and Contemporary Limitations',
          'Employment: Worker-Population Ratio, Formal vs Informal Sector Employment (Informalisation)',
          'Sustainable Economic Development: Functions of Environment, Carrying Capacity, Renewable Energy'
        ]
      },
      {
        unitTitle: 'Part B - Unit 8: Development Experience of India: A Comparison with Neighbours (08 Marks)',
        subTopics: [
          'Historical Trajectory: India, Pakistan and China (Starting Points and Five Year Plans)',
          'China’s Economic Path: Great Leap Forward (1958), Special Economic Zones (SEZs)',
          'Demographic Indicators: Population Growth, Fertility Rate, Sex Ratio, Urbanisation',
          'Sectoral GDP Contribution and Employment Share across Sectors',
          'Human Development Indicators (HDI): Life Expectancy, Mean Years of Schooling, Ranks'
        ]
      }
    ]
  },

  // 4. MATHEMATICS (CODE 041)
  'Mathematics (Code 041)': {
    name: 'Mathematics',
    code: '041',
    theoryMarks: 80,
    practicalMarks: 20,
    units: [
      {
        unitTitle: 'Unit I: Relations and Functions (08 Marks)',
        subTopics: [
          'Types of Relations: Reflexive, Symmetric, Transitive and Equivalence Relations',
          'One-to-One (Injective) and Onto (Surjective) Functions',
          'Inverse Trigonometric Functions: Definition, Range, Domain, Principal Value Branches',
          'Graphs of Inverse Trigonometric Functions'
        ]
      },
      {
        unitTitle: 'Unit II: Algebra - Matrices and Determinants (10 Marks)',
        subTopics: [
          'Matrices: Concept, Notation, Order, Equality, Types of Matrices, Operations',
          'Transpose of a Matrix, Symmetric and Skew-Symmetric Matrices',
          'Determinants of a Square Matrix (up to 3x3), Minors, Cofactors',
          'Adjoint and Inverse of a Square Matrix',
          'Solving System of Linear Equations using Matrix Method'
        ]
      },
      {
        unitTitle: 'Unit III: Calculus (35 Marks)',
        subTopics: [
          'Continuity and Differentiability, Derivative of Composite Functions, Chain Rule',
          'Derivatives of Inverse Trigonometric Functions, Implicit Functions',
          'Logarithmic Differentiation and Parametric Forms',
          'Second Order Derivatives',
          'Applications of Derivatives: Increasing and Decreasing Functions',
          'Maxima and Minima: First and Second Derivative Tests with Word Problems',
          'Indefinite Integrals: Substitution, Partial Fractions, by Parts',
          'Definite Integrals and Fundamental Theorem of Calculus',
          'Applications of Integrals: Area bounded by simple curves',
          'Differential Equations: Order and Degree, Variable Separable Method, Linear Differential Equations'
        ]
      },
      {
        unitTitle: 'Unit IV: Vectors and Three-Dimensional Geometry (14 Marks)',
        subTopics: [
          'Vectors: Dot (Scalar) Product and Cross (Vector) Product',
          'Direction Cosines and Direction Ratios of a Line Joining Two Points',
          'Cartesian and Vector Equation of a Line',
          'Skew Lines and Shortest Distance Between Two Lines'
        ]
      },
      {
        unitTitle: 'Unit V: Linear Programming & Probability (13 Marks)',
        subTopics: [
          'Linear Programming: Graphical Method of Solving LPP in Two Variables (Bounded & Unbounded)',
          'Conditional Probability and Multiplication Rule',
          'Bayes’ Theorem and Probability Distributions'
        ]
      }
    ]
  },

  // 5. ACCOUNTANCY (CODE 055)
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
        ]
      },
      {
        unitTitle: 'Part A - Unit 2: Goodwill & Reconstitution of Partnership Firm',
        subTopics: [
          'Goodwill: Meaning, Factors affecting Goodwill, Valuation Methods (Average, Super, Capitalization)',
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
          'Issue of Debentures: As Collateral Security, Consideration other than Cash'
        ]
      },
      {
        unitTitle: 'Part B: Financial Statement Analysis',
        subTopics: [
          'Financial Statements of a Company: Balance Sheet & Statement of P&L (Schedule III)',
          'Accounting Ratios: Liquidity Ratios (Current Ratio, Quick Ratio)',
          'Solvency Ratios: Debt to Equity, Total Assets to Debt, Proprietary, Interest Coverage',
          'Activity Ratios: Inventory Turnover, Trade Receivables/Payables Turnover',
          'Profitability Ratios: Gross Profit, Operating, Net Profit, Return on Investment (ROI)',
          'Cash Flow Statement: Operating, Investing, and Financing Activities (AS-3 Revised)'
        ]
      }
    ]
  },

  // 6. BUSINESS STUDIES (CODE 054)
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
          'Levels of Management (Top, Middle, Operational) and Coordination',
          'Principles of Management: Fayol’s 14 Principles of Management',
          'Taylor’s Scientific Management: Principles and Scientific Techniques',
          'Business Environment: Dimensions (Economic, Social, Technological, Political, Legal)',
          'Planning: Importance, Limitations, Planning Process, Types of Plans',
          'Organizing: Process, Formal vs Informal Organization, Delegation & Decentralization',
          'Staffing: Recruitment, Selection Process, Training and Development Methods',
          'Directing: Motivation (Maslow’s Theory), Leadership Styles, Communication Barriers',
          'Controlling: Importance, Controlling Process, Relationship with Planning'
        ]
      },
      {
        unitTitle: 'Part B: Business Finance and Marketing',
        subTopics: [
          'Financial Management: Objectives, Financial Decisions (Investment, Financing, Dividend)',
          'Financial Planning: Capital Structure (Trading on Equity), Fixed and Working Capital Factors',
          'Financial Markets: Money Market Instruments, Capital Market (Primary vs Secondary)',
          'Stock Exchange: Trading Procedure on NSE/BSE, Functions of SEBI',
          'Marketing Management: Marketing Mix 4 Ps (Product, Price, Place, Promotion)',
          'Consumer Protection Act 2019: Rights, Responsibilities and Redressal Machinery'
        ]
      }
    ]
  },

  // 7. COMPUTER SCIENCE (CODE 083)
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

  // 8. PHYSICS (CODE 042)
  'Physics (Code 042)': {
    name: 'Physics',
    code: '042',
    theoryMarks: 70,
    practicalMarks: 30,
    units: [
      {
        unitTitle: 'Unit I & II: Electrostatics & Current Electricity (16 Marks)',
        subTopics: [
          'Electric Charges and Fields, Coulomb’s Law, Gauss’s Theorem and Applications',
          'Electrostatic Potential and Equipotential Surfaces',
          'Capacitance of Parallel Plate Capacitor with Dielectric Medium',
          'Ohm’s Law, Drift Velocity, Mobility and Temperature Dependence of Resistance',
          'Kirchhoff’s Rules and Wheatstone Bridge Analysis'
        ]
      },
      {
        unitTitle: 'Unit III & IV: Magnetic Effects, EMI & AC (17 Marks)',
        subTopics: [
          'Biot-Savart Law and Ampere’s Circuital Law with Solenoid',
          'Force on a Moving Charge and Torque on Current Loop in Magnetic Field',
          'Faraday’s Laws of Electromagnetic Induction and Lenz’s Law',
          'Series LCR Circuit, Resonance Condition, and Power in AC Circuit'
        ]
      },
      {
        unitTitle: 'Unit V & VI: Optics (18 Marks)',
        subTopics: [
          'Refraction at Spherical Surfaces, Lens Maker’s Formula',
          'Refraction through a Prism and Dispersion',
          'Optical Instruments: Compound Microscope and Astronomical Telescope',
          'Wave Optics: Huygens’ Principle, Young’s Double Slit Experiment Interference'
        ]
      },
      {
        unitTitle: 'Unit VII, VIII & IX: Modern Physics & Semiconductor Devices (19 Marks)',
        subTopics: [
          'Photoelectric Effect and Einstein’s Photoelectric Equation',
          'Bohr’s Model of Hydrogen Atom and Line Spectra',
          'Nuclear Binding Energy and Mass Defect',
          'Semiconductor Diode, I-V Characteristics in Forward & Reverse Bias, Full Wave Rectifier'
        ]
      }
    ]
  },

  // 9. CHEMISTRY (CODE 043)
  'Chemistry (Code 043)': {
    name: 'Chemistry',
    code: '043',
    theoryMarks: 70,
    practicalMarks: 30,
    units: [
      {
        unitTitle: 'Unit I, II & III: Physical Chemistry (23 Marks)',
        subTopics: [
          'Solutions: Raoult’s Law, Colligative Properties, Van’t Hoff Factor',
          'Electrochemistry: Nernst Equation, Molar Conductivity, Kohlrausch’s Law, Fuel Cells',
          'Chemical Kinetics: Rate Law, Order and Molecularity, Integrated Rate Equations, Arrhenius Equation'
        ]
      },
      {
        unitTitle: 'Unit IV & V: Inorganic Chemistry (14 Marks)',
        subTopics: [
          'd- and f-Block Elements: Electronic Configuration, Oxidation States, Lanthanoid Contraction',
          'Coordination Compounds: Werner’s Theory, IUPAC Nomenclature, Crystal Field Theory'
        ]
      },
      {
        unitTitle: 'Unit VI to X: Organic Chemistry & Biomolecules (33 Marks)',
        subTopics: [
          'Haloalkanes and Haloarenes: SN1 and SN2 Reaction Mechanisms',
          'Alcohols, Phenols and Ethers: Preparation, Acidity of Phenols, Williamson’s Synthesis',
          'Aldehydes, Ketones and Carboxylic Acids: Aldol Condensation, Cannizzaro Reaction',
          'Organic Compounds Containing Nitrogen (Amines): Gabriel Phthalimide Synthesis, Carbylamine Test',
          'Biomolecules: Carbohydrates, Proteins (Structure, Denaturation), Nucleic Acids (DNA & RNA)'
        ]
      }
    ]
  },

  // 10. BIOLOGY (CODE 044)
  'Biology (Code 044)': {
    name: 'Biology',
    code: '044',
    theoryMarks: 70,
    practicalMarks: 30,
    units: [
      {
        unitTitle: 'Unit VI: Reproduction (16 Marks)',
        subTopics: [
          'Sexual Reproduction in Flowering Plants: Pollination, Double Fertilization, Endosperm & Embryo',
          'Human Reproduction: Male & Female Reproductive Systems, Gametogenesis, Menstrual Cycle',
          'Reproductive Health: Contraception, Medical Termination of Pregnancy (MTP), Infertility & ART'
        ]
      },
      {
        unitTitle: 'Unit VII: Genetics and Evolution (20 Marks)',
        subTopics: [
          'Principles of Inheritance: Mendelian Ratios, Incomplete Dominance, Linkage, Genetic Disorders',
          'Molecular Basis of Inheritance: DNA Structure, Replication, Transcription, Genetic Code, Translation, Lac Operon',
          'Evolution: Origin of Life, Evidence, Natural Selection, Hardy-Weinberg Principle'
        ]
      },
      {
        unitTitle: 'Unit VIII, IX & X: Biology in Human Welfare, Biotechnology & Ecology (34 Marks)',
        subTopics: [
          'Human Health and Disease: Pathogens, Immunity, Vaccines, Cancer, HIV/AIDS',
          'Microbes in Human Welfare: Sewage Treatment, Biogas, Biocontrol Agents',
          'Biotechnology: Principles and Processes (Recombinant DNA Technology, PCR)',
          'Biotechnology Applications: Bt Cotton, Human Insulin, Gene Therapy',
          'Organisms and Populations: Population Attributes and Growth Models',
          'Ecosystem & Biodiversity: Energy Flow, Ecological Pyramids, In-situ & Ex-situ Conservation'
        ]
      }
    ]
  }
};
