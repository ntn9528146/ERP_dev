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
  'Physical Education (Code 048)',
  'Yoga (Code 841)',
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
  // CLASS 11 ECONOMICS (MICROECONOMICS + STATISTICS)
  'Class 11_Economics (Code 030)': {
    name: 'Economics',
    code: '030',
    theoryMarks: 80,
    practicalMarks: 20,
    units: [
      {
        unitTitle: 'Part A: Statistics for Economics - Unit 1: Introduction & Collection of Data',
        subTopics: [
          'What is Economics? Meaning, Scope and Functions of Statistics',
          'Collection of Data: Primary and Secondary Sources, Methods of Collecting Data',
          'Sampling: Census vs Sample Survey, Random and Non-Random Sampling Methods',
          'Organization of Data: Frequency Distributions and Classification'
        ]
      },
      {
        unitTitle: 'Part A: Statistics for Economics - Unit 2: Presentation & Measures of Central Tendency',
        subTopics: [
          'Tabular Presentation and Diagrammatic Presentation (Bar Diagrams and Pie Charts)',
          'Graphic Presentation: Histograms, Frequency Polygons and Ogives',
          'Measures of Central Tendency: Arithmetic Mean (Direct, Short-cut and Step-deviation Methods)',
          'Median and Mode: Calculation and Graphical Locating on Ogives/Histograms',
          'Correlation: Meaning, Scatter Diagram, Karl Pearson’s Coefficient of Correlation',
          'Index Numbers: Meaning, Types, Consumer Price Index and Wholesale Price Index'
        ]
      },
      {
        unitTitle: 'Part B: Introductory Microeconomics - Unit 3: Consumer Equilibrium & Demand',
        subTopics: [
          'Central Problems of an Economy: What, How and For Whom to produce',
          'Opportunity Cost and Production Possibility Frontier (PPF)',
          'Consumer Equilibrium: Utility Analysis (Marginal Utility, Law of Diminishing Marginal Utility)',
          'Indifference Curve Analysis: Consumer’s Budget Set and Budget Line, Properties of IC',
          'Demand: Market Demand, Determinants of Demand, Demand Schedule and Demand Curve',
          'Price Elasticity of Demand: Percentage Method and Geometric Factors'
        ]
      },
      {
        unitTitle: 'Part B: Introductory Microeconomics - Unit 4: Producer Behaviour & Supply',
        subTopics: [
          'Production Function: Short-Run and Long-Run, Law of Variable Proportions (TP, MP, AP)',
          'Cost Concepts: Short Run Costs (TFC, TVC, TC, AFC, AVC, MC and their relationships)',
          'Revenue Concepts: Total Revenue (TR), Average Revenue (AR), Marginal Revenue (MR)',
          'Producer’s Equilibrium: Meaning and its Conditions in terms of MC-MR Approach',
          'Supply: Law of Supply, Supply Schedule, Movement along vs Shift in Supply Curve',
          'Price Elasticity of Supply: Measurement by Percentage Method',
          'Forms of Market: Perfect Competition (Features and Determination of Equilibrium Price)'
        ]
      }
    ]
  },

  // CLASS 12 ECONOMICS (MACROECONOMICS + INDIAN ECONOMIC DEVELOPMENT)
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

  // YOGA (CODE 841)
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

  // PHYSICAL EDUCATION (CODE 048)
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

  // MATHEMATICS (CODE 041)
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
          'Linear Programming: Graphical Method of Solving LPP in Two Variables',
          'Conditional Probability and Multiplication Rule',
          'Bayes’ Theorem and Probability Distributions'
        ]
      }
    ]
  }
};
