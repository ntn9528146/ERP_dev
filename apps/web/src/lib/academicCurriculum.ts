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
  'Chemistry (Code 043)',
  'Physics (Code 042)',
  'Biology (Code 044)',
  'Mathematics (Code 041)',
  'Applied Mathematics (Code 241)',
  'Physical Education (Code 048)',
  'Yoga (Code 841)',
  'Computer Science (Code 083)',
  'Informatics Practices (Code 065)',
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
  // 1. CHEMISTRY (CODE 043) - 70 MARKS
  'Chemistry (Code 043)': {
    name: 'Chemistry',
    code: '043',
    theoryMarks: 70,
    practicalMarks: 30,
    units: [
      {
        unitTitle: 'Unit I: Solutions (07 Marks)',
        subTopics: [
          'Types of Solutions, Expression of Concentration of Solutions',
          'Solubility of Gases in Liquids (Henry’s Law) and Liquids in Liquids',
          'Raoult’s Law, Ideal and Non-ideal Solutions, Vapour Pressure Variations',
          'Colligative Properties: Relative Lowering of Vapour Pressure, Elevation of Boiling Point',
          'Depression of Freezing Point, Osmotic Pressure and Reverse Osmosis',
          'Abnormal Molecular Mass and Van’t Hoff Factor (i)'
        ]
      },
      {
        unitTitle: 'Unit II: Electrochemistry (09 Marks)',
        subTopics: [
          'Redox Reactions, Conductance in Electrolytic Solutions, Specific and Molar Conductivity',
          'Kohlrausch’s Law and its Applications',
          'Galvanic Cells, EMF of a Cell, Standard Electrode Potential',
          'Nernst Equation and its Application to Chemical Cells',
          'Relation between Gibbs Energy Change and EMF of a Cell',
          'Batteries: Primary and Secondary Cells, Fuel Cells and Corrosion'
        ]
      },
      {
        unitTitle: 'Unit III: Chemical Kinetics (07 Marks)',
        subTopics: [
          'Rate of a Reaction (Average and Instantaneous), Factors Affecting Reaction Rates',
          'Order and Molecularity of a Reaction, Rate Law and Specific Rate Constant',
          'Integrated Rate Equations and Half-Life Period for Zero and First Order Reactions',
          'Concept of Collision Theory (Elementary Treatment), Activation Energy and Arrhenius Equation'
        ]
      },
      {
        unitTitle: 'Unit IV: d- and f-Block Elements (07 Marks)',
        subTopics: [
          'General Characteristics of Transition Metals: Electronic Configuration, Metallic Properties',
          'Ionization Enthalpies, Variable Oxidation States, Colour, Catalytic Properties',
          'Preparation, Properties and Oxidizing Action of K2Cr2O7 and KMnO4',
          'Lanthanoids: Electronic Configuration, Oxidation States and Lanthanoid Contraction',
          'Actinoids: Electronic Configuration and Comparison with Lanthanoids'
        ]
      },
      {
        unitTitle: 'Unit V: Coordination Compounds (07 Marks)',
        subTopics: [
          'Introduction, Ligands, Coordination Number, Colour, Magnetic Properties',
          'IUPAC Nomenclature of Mononuclear Coordination Compounds',
          'Isomerism (Structural and Stereo) in Coordination Compounds',
          'Valence Bond Theory (VBT) and Crystal Field Theory (CFT)',
          'Importance of Coordination Compounds in Extraction of Metals and Biological Systems'
        ]
      },
      {
        unitTitle: 'Unit VI & VII: Haloalkanes, Haloarenes, Alcohols, Phenols & Ethers (14 Marks)',
        subTopics: [
          'Haloalkanes and Haloarenes: Nomenclature, Nature of C-X Bond, SN1 and SN2 Mechanisms',
          'Optical Rotation, Mechanism of Nucleophilic Substitution',
          'Alcohols: Preparation, Properties, Identification of Primary, Secondary and Tertiary Alcohols',
          'Phenols: Preparation from Cumene, Acidic Nature, Kolbe’s Reaction, Reimer-Tiemann Reaction',
          'Ethers: Nomenclature, Williamson’s Synthesis, Cleavage of C-O Bond'
        ]
      },
      {
        unitTitle: 'Unit VIII, IX & X: Aldehydes, Ketones, Carboxylic Acids, Amines & Biomolecules (19 Marks)',
        subTopics: [
          'Aldehydes and Ketones: Nucleophilic Addition, Aldol Condensation, Cannizzaro Reaction',
          'Carboxylic Acids: Acidic Strength, Hell-Volhard-Zelinsky (HVZ) Reaction',
          'Amines: Gabriel Phthalimide Synthesis, Hoffmann Bromamide Reaction, Carbylamine Test',
          'Carbohydrates: Classification (Aldoses and Ketoses), Monosaccharides (Glucose and Fructose)',
          'Proteins: Amino acids, Peptide Bond, Polypeptides, Denaturation of Proteins',
          'Nucleic Acids: DNA and RNA Structure and Biological Functions'
        ]
      }
    ]
  },

  // 2. ACCOUNTANCY (CODE 055) - 80 MARKS
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

  // 3. BUSINESS STUDIES (CODE 054) - 80 MARKS
  'Business Studies (Code 054)': {
    name: 'Business Studies',
    code: '054',
    theoryMarks: 80,
    practicalMarks: 20,
    units: [
      {
        unitTitle: 'Part A - Unit 1 & 2: Nature & Principles of Management',
        subTopics: [
          'Management: Concept, Objectives, Importance, Management as Science/Art/Profession',
          'Levels of Management (Top, Middle, Operational) and Coordination',
          'Principles of Management: Fayol’s 14 Principles of General Management',
          'Taylor’s Scientific Management: Principles and Scientific Techniques'
        ]
      },
      {
        unitTitle: 'Part A - Unit 3, 4 & 5: Business Environment, Planning & Organizing',
        subTopics: [
          'Business Environment: Dimensions (Economic, Social, Technological, Political, Legal)',
          'Planning: Importance, Limitations, Planning Process, Types of Plans',
          'Organizing: Process, Formal vs Informal Structure (Functional vs Divisional)',
          'Delegation: Authority, Responsibility, Accountability vs Decentralization'
        ]
      },
      {
        unitTitle: 'Part A - Unit 6, 7 & 8: Staffing, Directing & Controlling',
        subTopics: [
          'Staffing: Recruitment Sources (Internal vs External), Selection Process',
          'Directing: Principles, Supervision, Motivation (Maslow’s Hierarchy), Leadership Styles',
          'Controlling: Importance, Controlling Process, Management by Exception (MBE)'
        ]
      },
      {
        unitTitle: 'Part B - Unit 9 & 10: Financial Management & Markets',
        subTopics: [
          'Financial Management: Decisions (Investment, Financing, Dividend)',
          'Capital Structure: Trading on Equity, Factors Affecting Working Capital',
          'Financial Markets: Money Market Instruments, Primary vs Secondary Capital Market',
          'Securities and Exchange Board of India (SEBI): Objectives and Functions'
        ]
      },
      {
        unitTitle: 'Part B - Unit 11 & 12: Marketing Management & Consumer Protection',
        subTopics: [
          'Marketing Mix: 4 Ps (Product, Price, Place, Promotion)',
          'Advertising, Personal Selling, Sales Promotion and Public Relations',
          'Consumer Protection Act 2019: Rights, Responsibilities and Redressal Machinery'
        ]
      }
    ]
  },

  // 4. ECONOMICS (CODE 030) - 80 MARKS
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
          'Gross & Net Investment, Depreciation, Net Indirect Taxes, NFIA',
          'Aggregates: GDP, NDP, GNP, NNP at Market Price & Factor Cost',
          'Measurement of National Income: Value Added, Income, and Expenditure Methods',
          'Real GDP vs Nominal GDP and GDP Deflator Index'
        ]
      },
      {
        unitTitle: 'Part A - Unit 2: Money and Banking (06 Marks)',
        subTopics: [
          'Money Supply: M1 Currency with Public and Demand Deposits',
          'Credit Creation / Money Multiplier Process by Commercial Banks',
          'Central Bank (RBI) Functions: Repo Rate, Reverse Repo, CRR, SLR, OMO'
        ]
      },
      {
        unitTitle: 'Part A - Unit 3: Determination of Income and Employment (12 Marks)',
        subTopics: [
          'Aggregate Demand and Aggregate Supply Components',
          'Propensity to Consume and Save (APC, MPC, APS, MPS)',
          'Investment Multiplier (k = 1/MPS) and Mechanism',
          'Excess Demand (Inflationary Gap) and Deficient Demand (Deflationary Gap)'
        ]
      },
      {
        unitTitle: 'Part A - Unit 4 & 5: Government Budget & BoP (12 Marks)',
        subTopics: [
          'Government Budget: Revenue vs Capital Receipts and Expenditures',
          'Fiscal Deficit, Revenue Deficit, Primary Deficit Implications',
          'Balance of Payments: Current vs Capital Account, Autonomous vs Accommodating'
        ]
      },
      {
        unitTitle: 'Part B - Unit 6, 7 & 8: Indian Economic Development (40 Marks)',
        subTopics: [
          'Indian Economy (1947-90): Five Year Plans, Agrarian Reforms, Green Revolution',
          'Economic Reforms 1991: Liberalisation, Privatisation, Globalisation (LPG)',
          'Human Capital Formation, Rural Development (Credit & SHGs)',
          'Employment & Sustainable Development',
          'Comparative Development: India, Pakistan and China'
        ]
      }
    ]
  },

  // 5. PHYSICAL EDUCATION (CODE 048) - 70 MARKS
  'Physical Education (Code 048)': {
    name: 'Physical Education',
    code: '048',
    theoryMarks: 70,
    practicalMarks: 30,
    units: [
      {
        unitTitle: 'Unit I & II: Event Management & Children in Sports',
        subTopics: [
          'Sports Event Management: Planning, Organizing, Committees and Fixtures',
          'Knock-Out Fixtures (Byes & Seeding) and League Fixtures',
          'Common Postural Deformities: Knock Knees, Flat Foot, Kyphosis, Lordosis, Scoliosis',
          'Female Athlete Triad: Osteoporosis, Amenorrhea, Eating Disorders'
        ]
      },
      {
        unitTitle: 'Unit III & IV: Yoga & CWSN Divyang Sports',
        subTopics: [
          'Asanas as Preventive Measures for Obesity, Diabetes, Asthma, Hypertension',
          'Disability Sports: Special Olympics, Paralympics, Deaflympics',
          'Inclusion in Sports: Implementation and Strategies'
        ]
      },
      {
        unitTitle: 'Unit V & VI: Nutrition, Test & Measurement',
        subTopics: [
          'Balanced Diet, Nutritive & Non-Nutritive Components',
          'Harvard Step Test: Computing Physical Fitness Index (PFI)',
          'SAI Khelo India Fitness Test Protocol',
          'Rikli & Jones Senior Citizen Fitness Test'
        ]
      },
      {
        unitTitle: 'Unit VII & VIII: Physiology, Injuries & Biomechanics',
        subTopics: [
          'Effect of Exercise on Muscular and Cardiorespiratory Systems',
          'Sports Injuries: Sprain, Strain, Fractures and PRICER Procedure',
          'Newton’s Laws of Motion in Sports, Types of Levers'
        ]
      },
      {
        unitTitle: 'Unit IX & X: Psychology & Training in Sports',
        subTopics: [
          'Personality Types (Jung and Big Five) and Motivation',
          'Sports Training Cycles: Micro, Meso, Macro Cycles',
          'Methods for Developing Strength, Endurance, Speed, Flexibility',
          'Circuit Training Routine Design'
        ]
      }
    ]
  },

  // 6. YOGA (CODE 841) - 50 MARKS
  'Yoga (Code 841)': {
    name: 'Yoga',
    code: '841',
    theoryMarks: 50,
    practicalMarks: 50,
    units: [
      {
        unitTitle: 'Unit 1: Introduction to Yoga and Yogic Practices – II',
        subTopics: [
          'Shatkarma: Dhauti, Basti, Neti, Trataka, Nauli and Kapalabhati Cleansing',
          'Yogasana: Principles, Physical Alignment, Counter-poses and Benefits',
          'Standing, Sitting, Prone-lying and Supine-lying Postures',
          'Pranayama Practices: Anulom-Vilom, Bhastrika, Sheetali, Bhramari',
          'Surya Namaskara: 12 Steps Sequence and Breathing Coordination'
        ]
      },
      {
        unitTitle: 'Unit 2: Introduction to Yoga Texts & Mental Well-being',
        subTopics: [
          'Concepts of Mitahara (Diet) in Hatha Yoga Pradipika',
          'Patanjali Ashtanga Yoga: Yama, Niyama, Asana, Pranayama, Pratyahara, Dharana, Dhyana, Samadhi',
          'Yogic Stress Management Frameworks: Adhi-Vyadhi Concept'
        ]
      },
      {
        unitTitle: 'Unit 3: Yoga for Health Promotion – II',
        subTopics: [
          'First Aid Principles and Sports Safety in Yogic Training',
          'Yogic Management of Chronic Lifestyle Disorders (Hypertension, Diabetes)',
          'Pancha Kosha Theory (Annamaya to Anandamaya)'
        ]
      }
    ]
  }
};
