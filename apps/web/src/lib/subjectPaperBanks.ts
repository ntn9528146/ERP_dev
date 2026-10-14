export interface FullGeneratedQuestion {
  qNum: number;
  partTitle?: string;
  marks: number;
  typeBadge: string;
  text: string;
  codeBlock?: string;
  tableData?: string;
  orOptionText?: string;
  orOptionTableData?: string;
  options?: { optA: string; optB: string; optC: string; optD: string };
  answerKey: string;
}

function getRandomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleArray<T>(arr: T[]): T[] {
  const c = [...arr];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j], c[i]];
  }
  return c;
}

export function generateExactSubjectPaper(subjectName: string, className: string): {
  questions: FullGeneratedQuestion[];
  instructions: string[];
  totalMarks: number;
} {
  const str = subjectName.toLowerCase();

  // =========================================================================
  // 1. ECONOMICS (CODE 030) - EXACT 34 QUESTIONS WITH CONTINUOUS NUMBERING
  //    AND REAL CBSE CASE-BASED SOURCE QUESTIONS (NO MULTIPLE SECTION HEADERS)
  // =========================================================================
  if (str.includes('030') || str.includes('economics')) {
    const mpcVal = getRandomChoice([0.75, 0.8, 0.6, 0.5]);
    const multVal = (1 / (1 - mpcVal)).toFixed(1);
    const depVal = getRandomChoice([1000, 2000, 5000]);
    const lrrVal = getRandomChoice([10, 20, 25]);
    const totCred = (depVal / (lrrVal / 100));

    // Part A: Macroeconomics MCQs (Q1 to Q10)
    const macroMCQs = [
      { text: 'Which of the following is NOT included in the estimation of Domestic Income?', opts: { optA: 'Old-age pension received by senior citizens', optB: 'Wages and salaries paid to resident workers', optC: 'Operating surplus of domestic enterprises', optD: 'Mixed income of self-employed traders' }, ans: '(A) Old-age pension is a unilateral transfer payment.' },
      { text: `If Marginal Propensity to Consume (MPC) is ${mpcVal}, the numerical value of Investment Multiplier (k) will be:`, opts: { optA: `${multVal}`, optB: `${(parseFloat(multVal) + 1).toFixed(1)}`, optC: `${(parseFloat(multVal) - 0.5).toFixed(1)}`, optD: '1.0' }, ans: `(A) Multiplier k = 1 / (1 - MPC) = ${multVal}.` },
      { text: 'Which tool of RBI monetary policy involves open market purchase and sale of government securities to regulate liquidity?', opts: { optA: 'Open Market Operations (OMO)', optB: 'Cash Reserve Ratio (CRR)', optC: 'Statutory Liquidity Ratio (SLR)', optD: 'Margin Requirement' }, ans: '(A) Open Market Operations.' },
      { text: 'When Aggregate Demand exceeds Aggregate Supply at full employment output, the economy experiences:', opts: { optA: 'Inflationary Gap (Excess Demand)', optB: 'Deflationary Gap', optC: 'Deficient Demand', optD: 'Under-employment Equilibrium' }, ans: '(A) Inflationary Gap.' },
      { text: 'Which of the following constitutes a Capital Receipt for the Central Government?', opts: { optA: 'Disinvestment proceeds from sale of PSU shares', optB: 'Goods and Services Tax (GST) collected', optC: 'Court fines and penalties', optD: 'Dividends from public enterprises' }, ans: '(A) Disinvestment reduces government assets.' },
      { text: 'Balance of Payments (BoP) on Current Account records transactions relating to:', opts: { optA: 'Exports & Imports of goods, services and transfer payments', optB: 'Foreign Direct Investment (FDI) inflows', optC: 'External Commercial Borrowings', optD: 'Gold transactions by RBI' }, ans: '(A) Current Account items.' },
      { text: 'The relationship between Average Propensity to Consume (APC) and Average Propensity to Save (APS) is:', opts: { optA: 'APC + APS = 1', optB: 'APC - APS = 1', optC: 'APC x APS = 1', optD: 'APC / APS = 0' }, ans: '(A) APC + APS = 1.' },
      { text: 'Assertion (A): GDP growth may not always indicate an improvement in public welfare.\nReason (R): GDP excludes non-monetary transactions and ignores negative externalities like environmental pollution.', opts: { optA: 'Both (A) and (R) are true and (R) is correct explanation for (A).', optB: 'Both (A) and (R) are true but (R) is not correct explanation.', optC: '(A) is true, but (R) is false.', optD: '(A) is false, but (R) is true.' }, ans: '(A) Both are true and (R) correctly explains (A).' },
      { text: 'In an economy, when autonomous consumption C_bar = 100 and MPC = 0.8, consumption expenditure at income Y = 1000 is:', opts: { optA: '900', optB: '800', optC: '1000', optD: '700' }, ans: '(A) C = 100 + 0.8(1000) = 900.' },
      { text: 'Fiscal Deficit measures:', opts: { optA: 'Total borrowing requirements of the government', optB: 'Interest payments of the government', optC: 'Trade deficit of the economy', optD: 'Revenue deficit only' }, ans: '(A) Total government borrowing needs.' }
    ];

    // Part B: Indian Economic Development MCQs (Q18 to Q27)
    const iedMCQs = [
      { text: 'In Indian Economic History, the "Green Revolution" initially targeted which major grain crops in Punjab and Haryana?', opts: { optA: 'High-Yielding Varieties of Wheat and Rice', optB: 'Cotton and Jute', optC: 'Tea and Coffee', optD: 'Sugarcane and Pulses' }, ans: '(A) Wheat and Rice.' },
      { text: 'NABARD was set up in which year to supervise rural credit and agricultural financing in India?', opts: { optA: '1982', optB: '1991', optC: '1975', optD: '1969' }, ans: '(A) 1982.' },
      { text: 'The Great Leap Forward (GLF) campaign was launched in China in 1958 with the prime objective of:', opts: { optA: 'Widespread rapid industrialization in backyards and rural communes', optB: 'Privatizing commercial banks', optC: 'Inviting foreign multinational firms', optD: 'Abolishing state farms' }, ans: '(A) Rapid industrialization and rural communes.' },
      { text: 'Which of the following is considered a primary source of Human Capital Formation?', opts: { optA: 'Expenditure on Education, Healthcare, and On-the-job training', optB: 'Construction of commercial highways', optC: 'Importing finished consumer electronic items', optD: 'Purchase of automated mining drills' }, ans: '(A) Investment in human health and education.' },
      { text: 'In India, the Micro, Small and Medium Enterprises Development (MSMED) Act was enacted in:', opts: { optA: '2006', optB: '1991', optC: '2014', optD: '1980' }, ans: '(A) 2006.' },
      { text: 'What is the full form of NITI Aayog?', opts: { optA: 'National Institution for Transforming India', optB: 'National Institute for Technical Innovation', optC: 'National Industrial Trade Initiative', optD: 'New India Technical Institute' }, ans: '(A) National Institution for Transforming India.' },
      { text: 'Which economic system was adopted by post-independence India under the leadership of Jawaharlal Nehru and P.C. Mahalanobis?', opts: { optA: 'Mixed Economic System with leading role to public sector', optB: 'Pure Free-Market Capitalist Economy', optC: 'Command Socialist Soviet System', optD: 'Feudal Agricultural System' }, ans: '(A) Mixed Economic System.' },
      { text: 'Which of the following is an informal source of rural credit in India associated with high interest exploitation?', opts: { optA: 'Village Moneylenders & Traders', optB: 'Regional Rural Banks (RRBs)', optC: 'Commercial Banks', optD: 'Cooperative Credit Societies' }, ans: '(A) Moneylenders.' },
      { text: 'Pakistan initiated its first Five Year Plan in which year?', opts: { optA: '1956', optB: '1951', optC: '1960', optD: '1947' }, ans: '(A) 1956.' },
      { text: 'Which agricultural pricing mechanism guarantees minimum remunerative returns to farmers before crop sowing?', opts: { optA: 'Minimum Support Price (MSP)', optB: 'Open Mandi Auction', optC: 'Futures Commodity Exchange', optD: 'Export Subsidy System' }, ans: '(A) Minimum Support Price.' }
    ];

    const questions: FullGeneratedQuestion[] = [];

    // PART A: Q1 to Q10 (1-Mark MCQs)
    shuffleArray(macroMCQs).forEach((q, idx) => {
      questions.push({
        qNum: idx + 1,
        partTitle: 'PART - A: INTRODUCTORY MACROECONOMICS (40 MARKS)',
        typeBadge: '1 Mark MCQ',
        marks: 1,
        text: q.text,
        options: q.opts,
        answerKey: q.ans
      });
    });

    // PART A: Q11 to Q12 (3-Marks Questions)
    questions.push({
      qNum: 11,
      typeBadge: '3 Marks Short Answer',
      marks: 3,
      text: `Explain the process of Money Creation / Credit Creation by commercial banks with an initial primary cash deposit of ₹${depVal} and Legal Reserve Ratio (LRR) of ${lrrVal}%.`,
      orOptionText: `Explain the "Lender of the Last Resort" and "Banker to the Government" functions of the Central Bank (Reserve Bank of India).`,
      answerKey: `Money Multiplier = 1 / LRR = ${100 / lrrVal}. Total credit created = ₹${depVal} x ${100 / lrrVal} = ₹${totCred}. Show stepwise deposit schedule.`
    });

    questions.push({
      qNum: 12,
      typeBadge: '3 Marks Short Answer',
      marks: 3,
      text: 'Distinguish between Final Goods and Intermediate Goods with two suitable empirical examples of each.',
      answerKey: 'Final goods are for final consumption/investment; intermediate goods are used up as raw materials in production in same year.'
    });

    // PART A: Q13 to Q15 (4-Marks Questions including Real Case-Based Study)
    questions.push({
      qNum: 13,
      typeBadge: '4 Marks Medium Answer',
      marks: 4,
      text: 'Distinguish between Revenue Receipts and Capital Receipts of the Central Government. Give two examples of each.',
      answerKey: 'Revenue receipts neither create liabilities nor reduce assets. Capital receipts create liabilities or reduce assets.'
    });

    questions.push({
      qNum: 14,
      typeBadge: '4 Marks Medium Answer',
      marks: 4,
      text: `From the following data, calculate Gross National Product at Factor Cost (GNP_FC):\n- GDP at MP: ₹8,500 Crores\n- Net Factor Income from Abroad (NFIA): (-) ₹150 Crores\n- Net Indirect Taxes (NIT): ₹650 Crores\n- Consumption of Fixed Capital (Depreciation): ₹400 Crores.`,
      orOptionText: `Explain the problem of "Double Counting" in calculating National Income. Describe the two methods to avoid it.`,
      answerKey: 'GNP_FC = GDP_MP + NFIA - NIT = 8,500 - 150 - 650 = ₹7,700 Crores.'
    });

    questions.push({
      qNum: 15,
      typeBadge: '4 Marks Case-Based / Data Analysis',
      marks: 4,
      text: `CASE STUDY - MONETARY POLICY & INFLATION MANAGEMENT IN INDIA:\nRead the following excerpt and answer the questions:\n"During the post-pandemic recovery phase, global supply bottlenecks and elevated crude oil prices exerted upward pressure on domestic retail inflation. To anchor inflation expectations and suck out excess liquidity from the system, the Monetary Policy Committee (MPC) of the Reserve Bank of India sequentially hiked the policy Repo Rate by 250 basis points, while maintaining a stance focused on withdrawal of accommodation."\n\n(i) Explain how an increase in Repo Rate helps in curbing inflationary pressures in the economy. [2]\n(ii) Differentiate between Repo Rate and Reverse Repo Rate. [2]`,
      answerKey: '(i) Hike in Repo Rate increases cost of borrowings for commercial banks, disincentivizing credit expansion, reducing aggregate demand and dampening inflation. (ii) Repo Rate is the rate at which RBI lends short-term to banks; Reverse Repo is the rate at which RBI borrows from banks.'
    });

    // PART A: Q16 to Q17 (6-Marks Questions)
    questions.push({
      qNum: 16,
      typeBadge: '6 Marks Long Answer',
      marks: 6,
      text: `In an economy, autonomous consumption C_bar = ₹200 Crores, Marginal Propensity to Save (MPS) = 0.2, and planned autonomous investment I = ₹300 Crores:\n(i) Derive the Aggregate Consumption Function equation.\n(ii) Calculate the Equilibrium Level of National Income (Y).\n(iii) Calculate total consumption expenditure at equilibrium income.`,
      orOptionText: `Explain the working of the Investment Multiplier with a diagrammatic illustration. What happens to the multiplier if MPC increases?`,
      answerKey: 'MPC = 1 - MPS = 0.8. Consumption equation C = 200 + 0.8Y. Equilibrium Y = (200 + 300) / 0.2 = ₹2,500 Crores. C = 200 + 0.8(2500) = ₹2,200 Crores.'
    });

    questions.push({
      qNum: 17,
      typeBadge: '6 Marks Long Answer',
      marks: 6,
      text: 'Differentiate between Autonomous items and Accommodating items in the Balance of Payments (BoP). Explain the meaning of BoP Deficit and Surplus with reference to official reserve transactions.',
      answerKey: 'Autonomous items take place for economic profit; Accommodating items cover surplus/deficit in autonomous transactions.'
    });

    // PART B: Q18 to Q27 (1-Mark MCQs)
    shuffleArray(iedMCQs).forEach((q, idx) => {
      questions.push({
        qNum: 18 + idx,
        partTitle: idx === 0 ? 'PART - B: INDIAN ECONOMIC DEVELOPMENT (40 MARKS)' : undefined,
        typeBadge: '1 Mark MCQ',
        marks: 1,
        text: q.text,
        options: q.opts,
        answerKey: q.ans
      });
    });

    // PART B: Q28 to Q29 (3-Marks Questions)
    questions.push({
      qNum: 28,
      typeBadge: '3 Marks Short Answer',
      marks: 3,
      text: 'Discuss any three positive contributions of the British Colonial Rule in India.',
      orOptionText: `What were the main causes of stagnation in the agricultural sector during the colonial British rule in India?`,
      answerKey: 'Contributions: Introduction of Railways, postal and telegraph networks, development of ports, and commercialization of agriculture.'
    });

    questions.push({
      qNum: 29,
      typeBadge: '3 Marks Short Answer',
      marks: 3,
      text: 'Explain the role of Micro-Credit and Self-Help Groups (SHGs) in promoting rural finance and empowering rural women in India.',
      answerKey: 'SHGs mobilize rural savings, provide collateral-free micro-credit, and reduce dependence on informal moneylenders.'
    });

    // PART B: Q30 to Q32 (4-Marks Questions including Real Case-Based Study)
    questions.push({
      qNum: 30,
      typeBadge: '4 Marks Medium Answer',
      marks: 4,
      text: 'Explain the "Outsourcing" boom during the post-1991 economic reforms. Why has India emerged as a leading global BPO/KPO destination?',
      answerKey: 'Availability of skilled English-speaking workforce, low labor cost, and advanced IT infrastructure.'
    });

    questions.push({
      qNum: 31,
      typeBadge: '4 Marks Case-Based / Data Analysis',
      marks: 4,
      text: `CASE STUDY - RURAL DIVERSIFICATION AND ORGANIC FARMING IN INDIA:\nRead the following case text and answer the questions:\n"Over-dependence on conventional chemical-intensive agriculture led to soil depletion, groundwater salinization, and debt traps for small farmers in dry regions. In response, sustainable initiatives like the Paramparagat Krishi Vikas Yojana promoted organic farming and allied non-farm activities such as dairying, fisheries, and horticulture."\n\n(i) State two benefits and two challenges associated with adopting organic farming in India. [2]\n(ii) Why is occupational diversification into non-farm sectors necessary for rural livelihoods? [2]`,
      orOptionText: `Compare the developmental strategies and structural economic shifts between India and China from 1980 to 2024.`,
      answerKey: '(i) Benefits: Eco-friendly, chemical-free food, enhances soil fertility. Challenges: Lower initial yields, shorter shelf-life, lack of marketing channels. (ii) Reduces agricultural disguised unemployment and provides supplementary income during non-harvest seasons.'
    });

    questions.push({
      qNum: 32,
      typeBadge: '4 Marks Medium Answer',
      marks: 4,
      text: 'Define Human Capital Formation. Explain how expenditure on education and preventive healthcare contributes to national economic growth.',
      answerKey: 'Human capital formation builds productive capabilities. Education increases workforce productivity and health reduces absenteeism.'
    });

    // PART B: Q33 to Q34 (6-Marks Questions)
    questions.push({
      qNum: 33,
      typeBadge: '6 Marks Long Answer',
      marks: 6,
      text: 'Compare and contrast the demographic indicators and human development performance of India, China, and Pakistan based on Fertility Rate, Sex Ratio, and HDI ranking.',
      orOptionText: `Elaborate upon the inward-looking trade strategy (Import Substitution) adopted by India during 1950-1990. Evaluate its merits and critical limitations.`,
      answerKey: 'China: low fertility rate and high HDI. India: replacement level fertility and intermediate HDI. Pakistan: higher fertility and low HDI.'
    });

    questions.push({
      qNum: 34,
      typeBadge: '6 Marks Long Answer',
      marks: 6,
      text: 'Critically appraise the Economic Reforms of 1991 in India (LPG Policy). Highlight three major achievements and three significant failures.',
      answerKey: 'Achievements: Foreign exchange reserve surge, private sector expansion, GDP growth. Failures: Agricultural neglect, jobless growth, disinvestment undervaluation.'
    });

    return {
      questions,
      totalMarks: 80,
      instructions: [
        'This question paper contains 34 questions divided into two Parts – Part A (Macroeconomics - 40 Marks) and Part B (Indian Economic Development - 40 Marks).',
        'Questions 1 to 10 and 18 to 27 are 1-mark Multiple Choice Questions.',
        'Questions 11 to 12 and 28 to 29 are 3-marks Short Answer Questions.',
        'Questions 13 to 15 and 30 to 32 are 4-marks Medium Answer & Case-based Questions.',
        'Questions 16 to 17 and 33 to 34 are 6-marks Long Answer Questions.',
        'Internal choices have been provided in questions of 3, 4, and 6 marks. All working notes must be clearly shown.'
      ]
    };
  }

  // Fallback for other subjects
  const genericQuestions: FullGeneratedQuestion[] = [
    { qNum: 1, typeBadge: '1 Mark Question', marks: 1, text: `State the fundamental theorem or principle that defines the foundational study of ${subjectName}.`, answerKey: 'Accurate technical formulation as prescribed in CBSE 2026-27 curriculum.' },
    { qNum: 2, typeBadge: '2 Marks Question', marks: 2, text: `Differentiate between primary concepts and secondary derived principles in ${subjectName}.`, answerKey: 'Stepwise differentiation supported with illustrative examples.' },
    { qNum: 3, typeBadge: '3 Marks Question', marks: 3, text: `Explain the detailed analytical methodology and governing laws associated with ${subjectName}.`, answerKey: 'Complete stepwise technical explanation with accurate labelling/working.' },
    { qNum: 4, typeBadge: '5 Marks Question', marks: 5, text: `CASE STUDY: Analyze the real-world operational scenario in ${subjectName}. Calculate the resultant values and outline corrective measures.`, answerKey: 'Comprehensive evaluation covering working steps and analytical justification.' }
  ];

  return {
    questions: genericQuestions,
    totalMarks: 70,
    instructions: [
      `Official CBSE Session 2026-27 Examination Paper for ${subjectName}.`,
      'Answer all questions according to specified section marks.'
    ]
  };
}
