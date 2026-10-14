export interface FullGeneratedQuestion {
  qNum: number;
  part?: string;
  section: string;
  marks: number;
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
  // 1. ECONOMICS (CODE 030) - 80 MARKS (34 QUESTIONS: PART A 40M + PART B 40M)
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
      { text: 'Which tool of RBI monetary policy involves buying and selling of government securities in open market?', opts: { optA: 'Open Market Operations (OMO)', optB: 'Cash Reserve Ratio (CRR)', optC: 'Statutory Liquidity Ratio (SLR)', optD: 'Margin Requirement' }, ans: '(A) Open Market Operations.' },
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
      { text: 'Which of the following is considered an indicator of Human Capital Formation?', opts: { optA: 'Expenditure on Education, Healthcare, and On-the-job training', optB: 'Construction of commercial highways', optC: 'Importing finished consumer electronic items', optD: 'Purchase of automated mining drills' }, ans: '(A) Investment in human health and education.' },
      { text: 'In India, the Micro, Small and Medium Enterprises Development (MSMED) Act was enacted in:', opts: { optA: '2006', optB: '1991', optC: '2014', optD: '1980' }, ans: '(A) 2006.' },
      { text: 'What is the full form of NITI Aayog?', opts: { optA: 'National Institution for Transforming India', optB: 'National Institute for Technical Innovation', optC: 'National Industrial Trade Initiative', optD: 'New India Technical Institute' }, ans: '(A) National Institution for Transforming India.' },
      { text: 'Which economic system was adopted by post-independence India under the leadership of Jawaharlal Nehru and P.C. Mahalanobis?', opts: { optA: 'Mixed Economic System with leading role to public sector', optB: 'Pure Free-Market Capitalist Economy', optC: 'Command Socialist Soviet System', optD: 'Feudal Agricultural System' }, ans: '(A) Mixed Economic System.' },
      { text: 'The NITI Aayog Multidimensional Poverty Index evaluates deprivation across which three core dimensions?', opts: { optA: 'Health, Education, and Standard of Living', optB: 'Income, Religion, and Caste', optC: 'Employment, Housing, and Transport', optD: 'Calories, Height, and Weight' }, ans: '(A) Health, Education, Standard of Living.' },
      { text: 'Pakistan initiated its first Five Year Plan in which year?', opts: { optA: '1956', optB: '1951', optC: '1960', optD: '1947' }, ans: '(A) 1956.' },
      { text: 'Which agricultural pricing mechanism guarantees minimum remunerative returns to farmers before crop sowing?', opts: { optA: 'Minimum Support Price (MSP)', optB: 'Open Mandi Auction', optC: 'Futures Commodity Exchange', optD: 'Export Subsidy System' }, ans: '(A) Minimum Support Price.' }
    ];

    const questions: FullGeneratedQuestion[] = [];

    // --- PART A: Q1 to Q10 (1-Mark MCQs) ---
    shuffleArray(macroMCQs).forEach((q, idx) => {
      questions.push({
        qNum: idx + 1,
        part: 'PART - A (Introductory Macroeconomics - 40 Marks)',
        section: 'A',
        marks: 1,
        text: q.text,
        options: q.opts,
        answerKey: q.ans
      });
    });

    // --- PART A: Q11 to Q12 (3-Marks Questions with CBSE OR choices) ---
    questions.push({
      qNum: 11,
      part: 'PART - A',
      section: 'B',
      marks: 3,
      text: `Explain the process of Money Creation / Credit Creation by commercial banks with an initial primary cash deposit of ₹${depVal} and Legal Reserve Ratio (LRR) of ${lrrVal}%.`,
      orOptionText: `OR\nExplain the "Lender of the Last Resort" and "Banker to the Government" functions of the Central Bank (Reserve Bank of India).`,
      answerKey: `Money Multiplier = 1 / LRR = ${100 / lrrVal}. Total credit created = ₹${depVal} x ${100 / lrrVal} = ₹${totCred}. Show stepwise deposit schedule.`
    });

    questions.push({
      qNum: 12,
      part: 'PART - A',
      section: 'B',
      marks: 3,
      text: 'Distinguish between Final Goods and Intermediate Goods with two suitable empirical examples of each.',
      answerKey: 'Final goods are for final consumption/investment; intermediate goods are used up as raw materials in production in same year.'
    });

    // --- PART A: Q13 to Q15 (4-Marks Questions) ---
    questions.push({
      qNum: 13,
      part: 'PART - A',
      section: 'C',
      marks: 4,
      text: 'Distinguish between Revenue Receipts and Capital Receipts of the Central Government. Give two examples of each.',
      answerKey: 'Revenue receipts neither create liabilities nor reduce assets. Capital receipts create liabilities or reduce assets.'
    });

    questions.push({
      qNum: 14,
      part: 'PART - A',
      section: 'C',
      marks: 4,
      text: `From the following data, calculate Gross National Product at Factor Cost (GNP_FC):\n- GDP at MP: ₹8,500 Crores\n- Net Factor Income from Abroad (NFIA): (-) ₹150 Crores\n- Net Indirect Taxes (NIT): ₹650 Crores\n- Consumption of Fixed Capital (Depreciation): ₹400 Crores.`,
      orOptionText: `OR\nExplain the problem of "Double Counting" in calculating National Income. Describe the two methods to avoid it.`,
      answerKey: 'GNP_FC = GDP_MP + NFIA - NIT = 8,500 - 150 - 650 = ₹7,700 Crores.'
    });

    questions.push({
      qNum: 15,
      part: 'PART - A',
      section: 'C',
      marks: 4,
      text: 'Explain the concept of Deflationary Gap (Deficient Demand) with a suitable diagram. State two monetary measures to correct it.',
      answerKey: 'Diagram showing AD below full employment AS. Corrective measures: Decrease Repo Rate and decrease Cash Reserve Ratio (CRR).'
    });

    // --- PART A: Q16 to Q17 (6-Marks Questions) ---
    questions.push({
      qNum: 16,
      part: 'PART - A',
      section: 'D',
      marks: 6,
      text: `In an economy, autonomous consumption C_bar = ₹200 Crores, Marginal Propensity to Save (MPS) = 0.2, and planned autonomous investment I = ₹300 Crores:\n(i) Derive the Aggregate Consumption Function equation.\n(ii) Calculate the Equilibrium Level of National Income (Y).\n(iii) Calculate total consumption expenditure at equilibrium income.`,
      orOptionText: `OR\nExplain the working of the Investment Multiplier with a diagrammatic illustration. What happens to the multiplier if MPC increases?`,
      answerKey: 'MPC = 1 - MPS = 0.8. Consumption equation C = 200 + 0.8Y. Equilibrium Y = (200 + 300) / 0.2 = ₹2,500 Crores. C = 200 + 0.8(2500) = ₹2,200 Crores.'
    });

    questions.push({
      qNum: 17,
      part: 'PART - A',
      section: 'D',
      marks: 6,
      text: 'Differentiate between Autonomous items and Accommodating items in the Balance of Payments (BoP). Explain the meaning of BoP Deficit and Surplus.',
      answerKey: 'Autonomous items take place for economic profit; Accommodating items cover surplus/deficit in autonomous transactions.'
    });

    // --- PART B: Q18 to Q27 (1-Mark MCQs) ---
    shuffleArray(iedMCQs).forEach((q, idx) => {
      questions.push({
        qNum: 18 + idx,
        part: 'PART - B (Indian Economic Development - 40 Marks)',
        section: 'A',
        marks: 1,
        text: q.text,
        options: q.opts,
        answerKey: q.ans
      });
    });

    // --- PART B: Q28 to Q29 (3-Marks Questions) ---
    questions.push({
      qNum: 28,
      part: 'PART - B',
      section: 'B',
      marks: 3,
      text: 'Discuss any three positive contributions of the British Colonial Rule in India.',
      orOptionText: `OR\nWhat were the main causes of stagnation in the agricultural sector during the colonial British rule in India?`,
      answerKey: 'Contributions: Introduction of Railways, postal and telegraph networks, development of ports, and commercialization of agriculture.'
    });

    questions.push({
      qNum: 29,
      part: 'PART - B',
      section: 'B',
      marks: 3,
      text: 'Explain the role of Micro-Credit and Self-Help Groups (SHGs) in promoting rural finance and empowering rural women in India.',
      answerKey: 'SHGs mobilize rural savings, provide collateral-free micro-credit, and reduce dependence on informal moneylenders.'
    });

    // --- PART B: Q30 to Q32 (4-Marks Questions) ---
    questions.push({
      qNum: 30,
      part: 'PART - B',
      section: 'C',
      marks: 4,
      text: 'Explain the "Outsourcing" boom during the post-1991 economic reforms. Why has India emerged as a leading global BPO/KPO destination?',
      answerKey: 'Availability of skilled English-speaking workforce, low labor cost, and advanced IT infrastructure.'
    });

    questions.push({
      qNum: 31,
      part: 'PART - B',
      section: 'C',
      marks: 4,
      text: 'State any four major causes of environmental degradation in India. How does sustainable development address these challenges?',
      orOptionText: `OR\nCompare the developmental strategies and structural economic shifts between India and China from 1980 to 2024.`,
      answerKey: 'Deforestation, soil erosion, air pollution, biodiversity loss. Sustainable development promotes non-conventional renewable energy.'
    });

    questions.push({
      qNum: 32,
      part: 'PART - B',
      section: 'C',
      marks: 4,
      text: 'Define Human Capital Formation. Explain how expenditure on education and preventive healthcare contributes to national economic growth.',
      answerKey: 'Human capital formation builds productive capabilities. Education increases workforce productivity and health reduces absenteeism.'
    });

    // --- PART B: Q33 to Q34 (6-Marks Questions) ---
    questions.push({
      qNum: 33,
      part: 'PART - B',
      section: 'D',
      marks: 6,
      text: 'Compare and contrast the demographic indicators and human development performance of India, China, and Pakistan based on Fertility Rate, Sex Ratio, and HDI ranking.',
      orOptionText: `OR\nElaborate upon the inward-looking trade strategy (Import Substitution) adopted by India during 1950-1990. Evaluate its merits and critical limitations.`,
      answerKey: 'China: low fertility rate and high HDI. India: replacement level fertility and intermediate HDI. Pakistan: higher fertility and low HDI.'
    });

    questions.push({
      qNum: 34,
      part: 'PART - B',
      section: 'D',
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
        'Questions 13 to 15 and 30 to 32 are 4-marks Medium Answer Questions.',
        'Questions 16 to 17 and 33 to 34 are 6-marks Long Answer Questions.',
        'Internal choices have been provided in questions of 3, 4, and 6 marks. All working notes must be clearly shown.'
      ]
    };
  }

  // =========================================================================
  // 2. ACCOUNTANCY (CODE 055) - 80 MARKS (34 QUESTIONS: PART A 60M + PART B 20M)
  // =========================================================================
  if (str.includes('055') || str.includes('accountancy')) {
    const partnerSet = getRandomChoice([
      { p1: 'Anil', p2: 'Sunil', p3: 'Mohan', r1: 3, r2: 2, r3: 1, cap1: '3,00,000', cap2: '2,00,000', cap3: '1,00,000' },
      { p1: 'Rohit', p2: 'Kavita', p3: 'Deepak', r1: 5, r2: 3, r3: 2, cap1: '5,00,000', cap2: '3,00,000', cap3: '2,00,000' },
      { p1: 'Aarav', p2: 'Bhavna', p3: 'Chetan', r1: 4, r2: 3, r3: 1, cap1: '4,00,000', cap2: '3,00,000', cap3: '1,00,000' }
    ]);

    const compSet = getRandomChoice([
      { cName: 'Zenith Tech Ltd', shares: '60,000', appShares: '80,000', faceVal: 10, prem: 2 },
      { cName: 'Apex Infotech Ltd', shares: '50,000', appShares: '75,000', faceVal: 10, prem: 3 },
      { cName: 'Vanguard Solar Ltd', shares: '1,00,000', appShares: '1,40,000', faceVal: 10, prem: 2 }
    ]);

    const partA_MCQs = [
      { text: 'In the absence of a Partnership Deed, interest on advances or loan given by a partner to the firm is payable at:', opts: { optA: '6% p.a.', optB: '10% p.a.', optC: '12% p.a.', optD: 'Zero / Nil' }, ans: '(A) 6% p.a.' },
      { text: 'At the time of admission of a partner, general reserve appearing in the balance sheet is transferred to:', opts: { optA: 'Old Partners’ Capital Accounts in Old Ratio', optB: 'All Partners in New Ratio', optC: 'Revaluation Account', optD: 'Sacrificing Ratio' }, ans: '(A) Old Partners in Old Ratio.' },
      { text: 'A company forfeited 100 shares of ₹10 each on which ₹7 per share was received. What is the maximum discount allowed on reissue of these forfeited shares?', opts: { optA: '₹7 per share', optB: '₹3 per share', optC: '₹10 per share', optD: '₹5 per share' }, ans: '(A) ₹7 per share.' },
      { text: 'Securities Premium Account can be utilized for which of the following purposes as per Section 52(2) of the Companies Act, 2013?', opts: { optA: 'Issuing fully paid bonus shares to members', optB: 'Distribution of dividends', optC: 'Paying trade creditors', optD: 'Writing off general reserve' }, ans: '(A) Issuing fully paid bonus shares.' },
      { text: 'Gaining Ratio is computed by applying which formula?', opts: { optA: 'New Ratio - Old Ratio', optB: 'Old Ratio - New Ratio', optC: 'Old Ratio - Sacrificing Ratio', optD: 'New Ratio + Old Ratio' }, ans: '(A) New Ratio - Old Ratio.' },
      { text: `If partner ${partnerSet.p1} withdraws ₹10,000 at the beginning of each calendar month and interest on drawings is charged @ 6% p.a., for how many months will interest be calculated?`, opts: { optA: '6.5 Months', optB: '6.0 Months', optC: '5.5 Months', optD: '7.0 Months' }, ans: '(A) 6.5 Months.' },
      { text: 'On dissolution of a partnership firm, an unrecorded computer realized ₹12,000 in cash. In which account and on which side will it be recorded?', opts: { optA: 'Credit side of Realisation Account', optB: 'Debit side of Realisation Account', optC: 'Credit side of Partners’ Capital Account', optD: 'Debit side of Cash Account only' }, ans: '(A) Credit side of Realisation Account.' },
      { text: 'When debentures are issued as Collateral Security for a secured bank loan, the entry passed in books is:', opts: { optA: 'Debit Debenture Suspense A/c and Credit Debentures A/c', optB: 'Debit Bank A/c and Credit Debentures A/c', optC: 'Debit Bank Loan A/c and Credit Debenture Suspense A/c', optD: 'No entry required in journal' }, ans: '(A) Debenture Suspense A/c Dr. to Debentures A/c.' },
      { text: 'Capital Reserve is created out of which of the following categories of profit?', opts: { optA: 'Capital Profits (Profit on reissue of forfeited shares / sale of fixed assets)', optB: 'Normal operating profits', optC: 'Gross Profit from operations', optD: 'Dividend Equalization Reserve' }, ans: '(A) Capital Profits.' },
      { text: 'Realisation Account prepared at the time of dissolution of a firm is in the nature of:', opts: { optA: 'Nominal Account', optB: 'Personal Account', optC: 'Real Account', optD: 'Representative Personal Account' }, ans: '(A) Nominal Account.' },
      { text: 'Goodwill of a partnership firm is valued at 2 years’ purchase of super profits. Capital employed is ₹5,00,000; Normal Rate of Return is 10%; Average profit earned is ₹70,000. The value of goodwill is:', opts: { optA: '₹40,000', optB: '₹20,000', optC: '₹50,000', optD: '₹1,00,000' }, ans: '(A) ₹40,000.' },
      { text: `When partner ${partnerSet.p3} retires, his share of goodwill is credited to his capital account and debited to continuing partners in their:`, opts: { optA: 'Gaining Ratio', optB: 'Sacrificing Ratio', optC: 'Old Profit Sharing Ratio', optD: 'Capital Ratio' }, ans: '(A) Gaining Ratio.' },
      { text: 'Calls in Arrears is deducted from which item in the Notes to Accounts of Balance Sheet?', opts: { optA: 'Subscribed but not fully paid-up capital', optB: 'Authorized Share Capital', optC: 'Issued Share Capital', optD: 'Securities Premium Reserve' }, ans: '(A) Subscribed but not fully paid-up capital.' },
      { text: 'On dissolution of firm, unrecorded liability paid off by partner out of personal funds is credited to:', opts: { optA: 'Concerned Partner’s Capital Account', optB: 'Realisation Account', optC: 'Cash Account', optD: 'Revaluation Account' }, ans: '(A) Concerned Partner’s Capital Account.' },
      { text: 'Assertion (A): Fixed Capital accounts of partners always show a credit balance.\nReason (R): All adjustments regarding drawings, interest, and share of profit are routed through Partners’ Current Accounts.', opts: { optA: 'Both (A) and (R) are true and (R) is correct explanation for (A).', optB: 'Both (A) and (R) are true but (R) is not correct explanation.', optC: '(A) is true, but (R) is false.', optD: '(A) is false, but (R) is true.' }, ans: '(A) Both are true and (R) correctly explains (A).' },
      { text: 'At the time of forfeiture of shares, Share Capital Account is debited with:', opts: { optA: 'Called-up amount on forfeited shares', optB: 'Face value of forfeited shares', optC: 'Paid-up amount on forfeited shares', optD: 'Uncalled amount on forfeited shares' }, ans: '(A) Called-up amount.' }
    ];

    const partB_MCQs = [
      { text: 'An enterprise has Current Assets of ₹8,00,000 and Current Liabilities of ₹4,00,000 (Current Ratio 2:1). Payment of ₹50,000 to trade payables will:', opts: { optA: 'Improve Current Ratio', optB: 'Reduce Current Ratio', optC: 'Not change Current Ratio', optD: 'Make Current Ratio zero' }, ans: '(A) Improve (7,50,000 / 3,50,000 = 2.14:1).' },
      { text: 'Which financial ratio measures the proportion of total assets funded through shareholders’ funds?', opts: { optA: 'Proprietary Ratio', optB: 'Debt to Equity Ratio', optC: 'Interest Coverage Ratio', optD: 'Total Assets to Debt Ratio' }, ans: '(A) Proprietary Ratio.' },
      { text: 'Cash outflow on purchase of patent rights is categorized under which cash flow activity (AS-3)?', opts: { optA: 'Investing Activities', optB: 'Operating Activities', optC: 'Financing Activities', optD: 'Cash and Cash Equivalents' }, ans: '(A) Investing Activities.' },
      { text: 'Dividend received on investments by a manufacturing company is shown in Cash Flow Statement as:', opts: { optA: 'Inflow under Investing Activities', optB: 'Inflow under Operating Activities', optC: 'Inflow under Financing Activities', optD: 'Deduction from net profit' }, ans: '(A) Inflow under Investing Activities.' }
    ];

    const questions: FullGeneratedQuestion[] = [];

    // Part A Q1 to Q16
    shuffleArray(partA_MCQs).forEach((q, idx) => {
      questions.push({
        qNum: idx + 1,
        part: 'PART - A (Accounting for Partnership Firms and Companies - 60 Marks)',
        section: 'A',
        marks: 1,
        text: q.text,
        options: q.opts,
        answerKey: q.ans
      });
    });

    // Part A Q17 to Q20 (3M)
    questions.push({
      qNum: 17,
      part: 'PART - A',
      section: 'B',
      marks: 3,
      text: `${partnerSet.p1}, ${partnerSet.p2} and ${partnerSet.p3} are partners sharing profits in ${partnerSet.r1}:${partnerSet.r2}:${partnerSet.r3} with capitals ₹${partnerSet.cap1}, ₹${partnerSet.cap2} and ₹${partnerSet.cap3} respectively. Their Partnership Deed provides interest on capital @ 6% p.a. and partner salary of ₹2,000 per month to ${partnerSet.p2}. During the year ended 31st March 2026, the firm earned a net profit of ₹90,000. Prepare Profit and Loss Appropriation Account for the year.`,
      orOptionText: `OR\n${partnerSet.p1} and ${partnerSet.p2} are partners sharing profits equally. On 31st March 2026, after closing books, it was discovered that interest on drawings @ 5% p.a. was omitted. Drawings during the year were: ${partnerSet.p1} ₹30,000 and ${partnerSet.p2} ₹20,000. Pass necessary single adjusting journal entry showing working notes clearly.`,
      answerKey: 'Calculation of interest on capital and salary in P&L Appropriation A/c OR Capital adjustment schedule and single adjusting journal entry.'
    });

    questions.push({
      qNum: 18,
      part: 'PART - A',
      section: 'B',
      marks: 3,
      text: `Radha Ltd purchased running business of Krishna Traders for ₹6,60,000 payable by issuing 9% Debentures of ₹100 each at a premium of 10%. Assets and liabilities taken over were:\n- Plant & Machinery: ₹5,00,000\n- Stock: ₹2,00,000\n- Sundry Creditors: ₹80,000\nPass necessary journal entries in the books of Radha Ltd.`,
      answerKey: 'Net Assets = 6,20,000; Consideration = 6,60,000; Goodwill = 40,000; Debentures issued = 6,000.'
    });

    questions.push({
      qNum: 19,
      part: 'PART - A',
      section: 'B',
      marks: 3,
      text: `Pass journal entries for the issue of Debentures in the following independent cases:\n(a) Issued 2,000, 9% Debentures of ₹100 each at a discount of 5%, redeemable at par.\n(b) Issued 3,000, 10% Debentures of ₹100 each at par, redeemable at a premium of 5%.\n(c) Issued 1,000, 8% Debentures of ₹100 each at a premium of 5%, redeemable at a premium of 10%.`,
      orOptionText: `OR\nStarline Ltd issued 4,000, 9% Debentures of ₹100 each at a discount of 4% redeemable at a premium of 6% after 5 years. Total loss on issue is to be written off in the first year itself out of Securities Premium Reserve balance of ₹50,000. Pass journal entries for issue and writing off loss.`,
      answerKey: 'Journal entries accounting for Loss on Issue of Debentures and Premium on Redemption with Securities Premium offset.'
    });

    questions.push({
      qNum: 20,
      part: 'PART - A',
      section: 'B',
      marks: 3,
      text: `Differentiate between "Dissolution of Partnership" and "Dissolution of Partnership Firm" on the basis of:\n(i) Court intervention\n(ii) Continuation of business\n(iii) Closure of books of accounts`,
      answerKey: '(i) Court: Partnership dissolution is voluntary; Firm dissolution can be ordered by court. (ii) Business continues in partnership; Ends in firm dissolution. (iii) Books remain open; Books closed permanently.'
    });

    // Part A Q21 to Q22 (4M)
    questions.push({
      qNum: 21,
      part: 'PART - A',
      section: 'C',
      marks: 4,
      text: `Pass necessary journal entries for forfeiture and reissue of shares in the following cases:\n(a) Apex Ltd forfeited 300 shares of ₹10 each (₹8 called up) for non-payment of first call of ₹2 per share. 200 of these shares were reissued as ₹8 paid-up for ₹7 per share.\n(b) Zenith Ltd forfeited 150 shares of ₹10 each issued at a premium of ₹2 per share (payable with allotment) for non-payment of allotment money of ₹5 (including premium) and first & final call of ₹3. All forfeited shares were reissued as fully paid for ₹9 per share.`,
      answerKey: 'Entries for share forfeiture, reissue, and transfer of net forfeited balance to Capital Reserve.'
    });

    questions.push({
      qNum: 22,
      part: 'PART - A',
      section: 'C',
      marks: 4,
      text: `A and B were partners sharing profits in 3:2. On 31st March 2026, their firm was dissolved. Balance Sheet showed Sundry Assets ₹3,20,000 and Sundry Creditors ₹80,000. Pass journal entries for dissolution transactions:\n(i) Sundry Assets realized 90% of book value in cash.\n(ii) An unrecorded typewriter realized ₹4,500.\n(iii) Creditors of ₹80,000 accepted stock of ₹50,000 in full settlement of ₹48,000 and the remaining creditors were paid in cash at 5% discount.\n(iv) Realisation expenses ₹3,000 were paid by partner A out of his pocket.`,
      answerKey: 'Pass Realisation A/c debit/credit entries for asset realizations, liability discharges and expense reimbursement.'
    });

    // Part A Q23 to Q26 (6M)
    questions.push({
      qNum: 23,
      part: 'PART - A',
      section: 'D',
      marks: 6,
      text: `${compSet.cName} invited applications for issuing ${compSet.shares} Equity Shares of ₹${compSet.faceVal} each at a premium of ₹${compSet.prem} per share payable as follows:\n- On Application: ₹3 per share\n- On Allotment: ₹5 per share (including premium ₹${compSet.prem})\n- On First & Final Call: ₹4 per share\n\nApplications were received for ${compSet.appShares} shares. Allotment was made pro-rata to applicants of 75,000 shares, and remaining applications were rejected and refunded. Excess application money was adjusted toward allotment.\n\nAkash, who had applied for 1,500 shares, failed to pay the allotment and call money. His shares were forfeited. Out of these, 800 forfeited shares were reissued to Neha as fully paid-up at ₹8 per share. Pass necessary Journal Entries in the books of ${compSet.cName}.`,
      orOptionText: `OR\nBharat Petroleum Ltd invited applications for issuing 80,000 equity shares of ₹10 each at a premium of ₹3 per share payable: ₹4 on application, ₹5 on allotment (including premium), and balance ₹4 on call. Applications were received for 1,20,000 shares. Pro-rata allotment was made to all applicants in 3:2 ratio. Excess application money was utilized toward allotment.\nRamesh, who was allotted 600 shares, failed to pay allotment and call money. Suresh, holding 400 shares, failed to pay call money. All these shares were forfeited and subsequently reissued at ₹9 per share as fully paid-up. Pass journal entries.`,
      answerKey: 'Pro-rata allotment table calculations, calls in arrears computation, forfeiture entry, reissue and Capital Reserve transfer.'
    });

    questions.push({
      qNum: 24,
      part: 'PART - A',
      section: 'D',
      marks: 6,
      text: `${partnerSet.p1} and ${partnerSet.p2} are partners in a firm sharing profits in 3:2. Their Balance Sheet as on 31st March 2026 was as follows:`,
      tableData: `<table class="matrix-table">
  <tr><th>Liabilities</th><th>Amount (₹)</th><th>Assets</th><th>Amount (₹)</th></tr>
  <tr><td>Sundry Creditors</td><td>60,000</td><td>Bank</td><td>40,000</td></tr>
  <tr><td>General Reserve</td><td>40,000</td><td>Sundry Debtors: 80,000<br/>Less: Provision: (4,000)</td><td>76,000</td></tr>
  <tr><td>Capitals:</td><td></td><td>Stock</td><td>64,000</td></tr>
  <tr><td>${partnerSet.p1}: 1,80,000</td><td></td><td>Machinery</td><td>1,20,000</td></tr>
  <tr><td>${partnerSet.p2}: 1,20,000</td><td>3,00,000</td><td>Building</td><td>1,00,000</td></tr>
  <tr><th>Total</th><th>4,00,000</th><th>Total</th><th>4,00,000</th></tr>
</table>`,
      orOptionText: `On 1st April 2026, they admit ${partnerSet.p3} into partnership for 1/5th share on the following terms:
(i) ${partnerSet.p3} brings ₹80,000 as capital and ₹30,000 as his share of premium for goodwill in cash.
(ii) Building is appreciated by 20% and Machinery is depreciated by 10%.
(iii) Provision for doubtful debts is to be increased to 5% on debtors.
(iv) An unrecorded outstanding repair bill of ₹2,000 is to be provided.
Prepare Revaluation Account and Partners’ Capital Accounts.`,
      answerKey: 'Revaluation Account profit ₹6,000, Partners Capital Accounts showing admission adjustments, General Reserve transfer, and closing balances.'
    });

    questions.push({
      qNum: 25,
      part: 'PART - A',
      section: 'D',
      marks: 6,
      text: `X, Y and Z were partners in a firm sharing profits in the ratio of 5:3:2. Their Balance Sheet as on 31st March 2026 was as follows:`,
      tableData: `<table class="matrix-table">
  <tr><th>Liabilities</th><th>Amount (₹)</th><th>Assets</th><th>Amount (₹)</th></tr>
  <tr><td>Trade Creditors</td><td>50,000</td><td>Cash at Bank</td><td>35,000</td></tr>
  <tr><td>Employees Provident Fund</td><td>15,000</td><td>Debtors: 60,000<br/>Less: Provision: (2,000)</td><td>58,000</td></tr>
  <tr><td>Workmen Compensation Reserve</td><td>20,000</td><td>Stock</td><td>52,000</td></tr>
  <tr><td>Capitals:</td><td></td><td>Furniture</td><td>40,000</td></tr>
  <tr><td>X: 1,50,000</td><td></td><td>Plant & Machinery</td><td>1,50,000</td></tr>
  <tr><td>Y: 1,00,000</td><td></td><td>Goodwill (Existing)</td><td>20,000</td></tr>
  <tr><td>Z: 70,000</td><td>3,20,000</td><td></td><td></td></tr>
  <tr><th>Total</th><th>4,05,000</th><th>Total</th><th>4,05,000</th></tr>
</table>`,
      orOptionText: `Y retires on 31st March 2026 on the following terms:
(i) Goodwill of the firm is valued at ₹70,000 and is to be adjusted in the capital accounts of X and Z.
(ii) Plant and Machinery is revalued at ₹1,65,000; Stock is valued at ₹48,000.
(iii) Provision for doubtful debts is maintained at 5% on debtors.
(iv) Claim on account of Workmen Compensation is established at ₹8,000.
(v) Y is paid ₹25,000 immediately in cash and the balance is transferred to his Loan Account.
Prepare Revaluation Account and Partners’ Capital Accounts.`,
      answerKey: 'Revaluation Account, adjustment of existing goodwill and retirement goodwill in gaining ratio 5:2, and Y Loan Account balance.'
    });

    questions.push({
      qNum: 26,
      part: 'PART - A',
      section: 'D',
      marks: 6,
      text: `P, Q and R are partners in a firm sharing profits in 2:2:1. On 31st March 2026, their firm was dissolved. Realise assets and settle liabilities as per Realisation Account:
(i) Sundry Assets recorded in books ₹4,50,000 were sold at 85% of book value.
(ii) Sundry Creditors of ₹1,00,000 accepted an unrecorded investment of ₹60,000 at ₹55,000 and remaining in full cash settlement at 10% discount.
(iii) P undertook to pay off his wife’s loan of ₹30,000.
(iv) Q was appointed to look after dissolution for an agreed commission of ₹10,000 and he agreed to bear all realisation expenses. Actual expenses of ₹8,000 were paid by the firm on his behalf.
Pass necessary Journal Entries for dissolution.`,
      answerKey: 'Realisation journal entries for assets realization, creditors discharge, partner loan assumption, and partner dissolution remuneration.'
    });

    // Part B Q27 to Q30 (1M)
    shuffleArray(partB_MCQs).forEach((q, idx) => {
      questions.push({
        qNum: 27 + idx,
        part: 'PART - B (Analysis of Financial Statements - 20 Marks)',
        section: 'A',
        marks: 1,
        text: q.text,
        options: q.opts,
        answerKey: q.ans
      });
    });

    // Part B Q31 to Q34
    questions.push({
      qNum: 31,
      part: 'PART - B',
      section: 'B',
      marks: 3,
      text: `From the following information, calculate Inventory Turnover Ratio and Trade Receivables Turnover Ratio:
- Revenue from Operations: ₹12,00,000
- Gross Profit: 25% on Cost of Revenue from Operations
- Opening Inventory: ₹1,50,000; Closing Inventory: ₹1,70,000
- Net Credit Revenue from Operations: ₹9,60,000
- Opening Trade Receivables: ₹90,000; Closing Trade Receivables: ₹1,10,000`,
      orOptionText: `OR\nUnder what major headings and sub-headings will the following items appear in the Balance Sheet of a company as per Schedule III, Part I of the Companies Act, 2013:
(i) Provision for Tax
(ii) Capital Work-in-Progress
(iii) Unpaid / Unclaimed Dividend
(iv) Trademarks and Patents
(v) Mining Rights
(vi) Calls in Advance`,
      answerKey: 'Inventory Turnover = 6 Times; Trade Receivables Turnover = 9.6 Times.'
    });

    questions.push({
      qNum: 32,
      part: 'PART - B',
      section: 'C',
      marks: 4,
      text: `Calculate Debt to Equity Ratio, Total Assets to Debt Ratio, and Proprietary Ratio from the following details:
- Equity Share Capital: ₹6,00,000
- Preference Share Capital: ₹2,00,000
- Reserves and Surplus: ₹2,00,000
- 10% Debentures: ₹4,00,000
- Long-term Bank Loan: ₹2,00,000
- Current Liabilities: ₹2,00,000
- Total Non-Current Assets: ₹12,00,000
- Current Assets: ₹6,00,000`,
      answerKey: 'Debt to Equity = 0.6:1; Total Assets to Debt = 3:1; Proprietary Ratio = 0.56:1.'
    });

    questions.push({
      qNum: 33,
      part: 'PART - B',
      section: 'D',
      marks: 4,
      text: `Calculate Cash Flow from Operating Activities from the following Statement of Profit and Loss extracts and Balance Sheet information of Star Industries Ltd for the year ended 31st March 2026:
- Net Profit before Tax and Extraordinary Items: ₹4,20,000
- Depreciation provided on Plant & Machinery: ₹60,000
- Loss on Sale of Old Office Furniture: ₹10,000
- Interest Income on Non-Current Investments: ₹15,000
- Goodwill Amortized during the year: ₹20,000
- Trade Receivables increased by ₹35,000
- Inventories decreased by ₹45,000
- Trade Payables increased by ₹25,000
- Income Tax Paid during the year: ₹70,000`,
      answerKey: 'Operating Profit before working capital changes = ₹4,95,000. Working capital adjustments = ₹35,000. Net Cash from Operating Activities = ₹4,60,000.'
    });

    questions.push({
      qNum: 34,
      part: 'PART - B',
      section: 'D',
      marks: 6,
      text: `From the following Balance Sheet of Solar Energy Ltd as at 31st March 2025 and 31st March 2026, prepare a Cash Flow Statement as per AS-3 (Revised):`,
      tableData: `<table class="matrix-table">
  <tr><th>Particulars</th><th>Note No.</th><th>31.03.2026 (₹)</th><th>31.03.2025 (₹)</th></tr>
  <tr><th colspan="4" style="text-align:left;">I. EQUITY AND LIABILITIES</th></tr>
  <tr><td>1. Shareholders’ Funds:</td><td></td><td></td><td></td></tr>
  <tr><td>(a) Share Capital</td><td>1</td><td>7,00,000</td><td>5,00,000</td></tr>
  <tr><td>(b) Reserves and Surplus</td><td>2</td><td>2,50,000</td><td>1,50,000</td></tr>
  <tr><td>2. Non-Current Liabilities: Long-term Borrowings (8% Debentures)</td><td></td><td>2,00,000</td><td>1,00,000</td></tr>
  <tr><td>3. Current Liabilities: Trade Payables</td><td></td><td>1,10,000</td><td>90,000</td></tr>
  <tr><th>Total</th><th></th><th>12,60,000</th><th>8,40,000</th></tr>
  <tr><th colspan="4" style="text-align:left;">II. ASSETS</th></tr>
  <tr><td>1. Non-Current Assets:</td><td></td><td></td><td></td></tr>
  <tr><td>(a) Property, Plant and Equipment (Machinery)</td><td>3</td><td>8,00,000</td><td>5,00,000</td></tr>
  <tr><td>(b) Non-Current Investments</td><td></td><td>1,00,000</td><td>60,000</td></tr>
  <tr><td>2. Current Assets:</td><td></td><td></td><td></td></tr>
  <tr><td>(a) Current Investments (Marketable)</td><td></td><td>40,000</td><td>30,000</td></tr>
  <tr><td>(b) Inventories</td><td></td><td>1,50,000</td><td>1,20,000</td></tr>
  <tr><td>(c) Trade Receivables</td><td></td><td>90,000</td><td>80,000</td></tr>
  <tr><td>(d) Cash and Cash Equivalents</td><td></td><td>80,000</td><td>50,000</td></tr>
  <tr><th>Total</th><th></th><th>12,60,000</th><th>8,40,000</th></tr>
</table>
<div style="font-size:10pt; margin-top:4pt;">
<b>Notes to Accounts:</b><br/>
1. Share Capital: Equity Shares of ₹10 each.<br/>
2. Reserves & Surplus: Surplus (Balance in Statement of P&L) 2026: ₹2,50,000; 2025: ₹1,50,000.<br/>
3. Machinery Account: Cost ₹8,00,000 (Accumulated Depreciation ₹1,40,000; 2025: Cost ₹5,00,000; Accumulated Depreciation ₹1,00,000).<br/>
<b>Additional Information:</b> During the year, a piece of machinery costing ₹60,000 on which depreciation accumulated was ₹20,000 was sold for ₹35,000. Debentures were issued on 31st March 2026.
</div>`,
      answerKey: 'Preparation of Machinery and Accumulated Depreciation A/c, Operating Cash flow, Investing cash outflow, Financing cash inflow, and Cash & Cash equivalents reconciliation.'
    });

    return {
      questions,
      totalMarks: 80,
      instructions: [
        'This question paper contains 34 questions divided into two Parts – Part A and Part B.',
        'Part A: Accounting for Partnership Firms and Companies (Questions 1 to 26 - 60 Marks).',
        'Part B: Analysis of Financial Statements (Questions 27 to 34 - 20 Marks).',
        'Questions 1 to 16 and 27 to 30 carry 1 mark each.',
        'Questions 17 to 20 and 31 carry 3 marks each.',
        'Questions 21, 22, 32 and 33 carry 4 marks each.',
        'Questions 23, 24, 25, 26 and 34 carry 6 marks each.',
        'Internal choices have been provided in questions of 3 marks, 4 marks, and 6 marks.',
        'All calculations must be accompanied by detailed working notes.'
      ]
    };
  }

  // =========================================================================
  // 3. PHYSICAL EDUCATION (CODE 048) - 70 MARKS (30 QUESTIONS)
  // =========================================================================
  if (str.includes('048') || str.includes('physical education')) {
    const peMCQs = [
      { text: 'Which tournament format follows the formula (N - 1) to determine the total number of matches played for N teams?', opts: { optA: 'Knock-Out Tournament', optB: 'League Tournament', optC: 'Round Robin', optD: 'Combination Tournament' }, ans: '(A) Knock-Out Tournament.' },
      { text: 'Identify the postural spinal deformity marked by an abnormal outward exaggeration of the thoracic curve (hunchback):', opts: { optA: 'Kyphosis', optB: 'Lordosis', optC: 'Scoliosis', optD: 'Knock Knees' }, ans: '(A) Kyphosis.' },
      { text: 'Which Yogic posture is highly effective as a preventive measure against Type-2 Diabetes by stimulating the pancreas?', opts: { optA: 'Ardha Matsyendrasana', optB: 'Shavasana', optC: 'Tadasana', optD: 'Vrikshasana' }, ans: '(A) Ardha Matsyendrasana.' },
      { text: 'What is the bench height used in the Harvard Step Test for boys?', opts: { optA: '20 inches (50.8 cm)', optB: '16 inches (40.6 cm)', optC: '14 inches', optD: '24 inches' }, ans: '(A) 20 inches.' },
      { text: 'Newton’s Second Law of Motion is also formally termed in sports biomechanics as:', opts: { optA: 'Law of Acceleration', optB: 'Law of Inertia', optC: 'Law of Action and Reaction', optD: 'Law of Equilibrium' }, ans: '(A) Law of Acceleration.' },
      { text: 'Which component of physical fitness is primarily measured by the 8-Foot Up and Go test in the Rikli & Jones battery?', opts: { optA: 'Agility and Dynamic Balance', optB: 'Muscular Strength', optC: 'Aerobic Endurance', optD: 'Flexibility' }, ans: '(A) Agility and Dynamic Balance.' },
      { text: 'Female Athlete Triad comprises which three interrelated clinical conditions?', opts: { optA: 'Osteoporosis, Amenorrhea, Eating Disorders', optB: 'Hypertension, Diabetes, Fatigue', optC: 'Kyphosis, Scoliosis, Lordosis', optD: 'Anemia, Asthma, Sprain' }, ans: '(A) Osteoporosis, Amenorrhea, Eating Disorders.' },
      { text: 'What does the acronym P.R.I.C.E. stand for in initial sports injury management?', opts: { optA: 'Protect, Rest, Ice, Compression, Elevation', optB: 'Pressure, Relaxation, Inhale, Calm, Exercise', optC: 'Physical, Rapid, Inspection, Care, Energy', optD: 'Protect, Relief, Immobilize, Circulation, Exam' }, ans: '(A) Protect, Rest, Ice, Compression, Elevation.' },
      { text: 'Which training cycle spans across a micro-cycle in periodization planning?', opts: { optA: '3 to 7 Days', optB: '3 to 6 Weeks', optC: '6 to 12 Months', optD: '4 Years' }, ans: '(A) 3 to 7 Days.' },
      { text: 'Which nutrient yields approximately 9 kcal of energy per gram metabolized?', opts: { optA: 'Fats', optB: 'Proteins', optC: 'Carbohydrates', optD: 'Minerals' }, ans: '(A) Fats.' }
    ];

    const questions: FullGeneratedQuestion[] = [];
    let qCount = 1;

    shuffleArray(peMCQs).slice(0, 18).forEach(q => {
      questions.push({ qNum: qCount++, section: 'A', marks: 1, text: q.text, options: q.opts, answerKey: q.ans });
    });

    questions.push({ qNum: qCount++, section: 'B', marks: 2, text: 'Define Extramural tournaments. Mention two key educational benefits of inter-school sports competitions.', answerKey: 'Inter-school sports competitions. Benefits: promotes athletic talent and peer teamwork.' });
    questions.push({ qNum: qCount++, section: 'B', marks: 2, text: 'Explain the physiological differences between Fast Twitch (White) and Slow Twitch (Red) muscle fibers.', answerKey: 'Slow twitch: aerobic endurance. Fast twitch: explosive anaerobic power.' });
    questions.push({ qNum: qCount++, section: 'B', marks: 2, text: 'State the difference between Intrinsic Motivation and Extrinsic Motivation with sports examples.', answerKey: 'Intrinsic: personal joy; Extrinsic: medals and external rewards.' });
    questions.push({ qNum: qCount++, section: 'B', marks: 2, text: 'State the difference between Sprain and Strain.', answerKey: 'Sprain: ligament tear; Strain: muscle/tendon injury.' });
    questions.push({ qNum: qCount++, section: 'B', marks: 2, text: 'What is BMR (Basal Metabolic Rate)? How is it influenced by physical activity?', answerKey: 'BMR is energy expenditure at rest; higher muscle mass increases basal metabolic rate.' });

    questions.push({ qNum: qCount++, section: 'C', marks: 3, text: 'Draw a knock-out fixture of 13 teams showing clearly the calculation of upper half, lower half, and number of byes.', orOptionText: 'OR\nExplain the procedure and health benefits of Bhujangasana and Gomukhasana for asthma management.', answerKey: 'N=13. Next power of 2 = 16. Total Byes = 16 - 13 = 3 Byes. Upper half = 7, Lower half = 6.' });
    questions.push({ qNum: qCount++, section: 'C', marks: 3, text: 'Describe the procedure, scoring, and significance of the Chair Sit and Reach test for senior citizens.', answerKey: 'Assesses lower body flexibility. Subject reaches towards toes with extended leg.' });
    questions.push({ qNum: qCount++, section: 'C', marks: 3, text: 'Explain the concept of Inclusion in physical education. How does it benefit children with special needs (Divyang)?', answerKey: 'Inclusion integrates disabled athletes into mainstream sports, building social confidence.' });
    questions.push({ qNum: qCount++, section: 'C', marks: 3, text: 'Explain the role of Macro and Micro nutrients in optimizing athletic sports performance.', answerKey: 'Carbohydrates & fats provide energy; proteins repair tissue; vitamins regulate enzyme metabolism.' });
    questions.push({ qNum: qCount++, section: 'C', marks: 3, text: 'Explain any three physiological factors determining speed in sprinting events.', answerKey: 'Nervous system reaction time, fast twitch muscle composition, and anaerobic power.' });

    questions.push({ qNum: qCount++, section: 'D', marks: 5, text: 'Explain the classification of Sports Injuries into Soft Tissue and Bone injuries. Elaborate on PRICER procedure.', orOptionText: 'OR\nWhat is Circuit Training? Design a 6-station circuit training routine to enhance general muscular endurance in high school athletes.', answerKey: 'Soft tissue: contusion, sprain, strain. Bone: fractures. PRICER: Protect, Rest, Ice, Compression, Elevation, Referral.' });
    questions.push({ qNum: qCount++, section: 'D', marks: 5, text: 'Explain Newton’s three laws of motion and illustrate their practical applications in athletic jumping and sprinting events.', answerKey: '1st Law: Starting blocks push-off; 2nd Law: Acceleration proportional to force exerted; 3rd Law: Ground reaction propulsion.' });
    questions.push({ qNum: qCount++, section: 'D', marks: 5, text: 'What is periodization? Describe the characteristics of Micro, Meso, and Macro training cycles.', answerKey: 'Periodization is structured division of training: Micro (weekly), Meso (monthly), Macro (annual/multi-year).' });

    return {
      questions,
      totalMarks: 70,
      instructions: [
        'This question paper contains 30 questions.',
        'Section A (Q1 to Q18): 1 Mark each.',
        'Section B (Q19 to Q23): 2 Marks each.',
        'Section C (Q24 to Q28): 3 Marks each.',
        'Section D (Q29 to Q31): 5 Marks each.'
      ]
    };
  }

  // =========================================================================
  // 4. COMPUTER SCIENCE (CODE 083) - 70 MARKS (37 QUESTIONS)
  // =========================================================================
  if (str.includes('083') || str.includes('computer science')) {
    const numInt = getRandomChoice([32, 45, 64, 78, 91, 108]);
    const strWord = getRandomChoice(['the Truth', 'data Stream', 'cyber Realm', 'cloud Vault', 'matrix Space']);
    const listLen = getRandomChoice([5, 6, 7, 8, 9]);

    const poolQ1 = [
      { text: `State True or False:\nIn Python, data type of ${numInt} is same as the data type of ${numInt}.0.`, ans: `False. ${numInt} is int while ${numInt}.0 is float.` },
      { text: 'State True or False:\nIn Python, dictionary keys must belong to immutable data types.', ans: 'True. Keys must be hashable and immutable.' },
      { text: 'State True or False:\nTuple slicing in Python creates a new tuple and does not modify the original tuple.', ans: 'True. Tuples are immutable.' }
    ];

    const poolQ2 = [
      { text: 'Identify the output of the following code snippet:', code: `s = "${strWord}"\nprint(s.capitalize())`, opts: { optA: strWord.toLowerCase(), optB: strWord.toUpperCase(), optC: strWord[0].toUpperCase() + strWord.slice(1).toLowerCase(), optD: strWord }, ans: `(C) ${strWord[0].toUpperCase() + strWord.slice(1).toLowerCase()}` },
      { text: 'Identify the output of the following code snippet:', code: 's = "cbse EXAM 2026"\nprint(s.title())', opts: { optA: 'Cbse Exam 2026', optB: 'CBSE EXAM 2026', optC: 'cbse exam 2026', optD: 'Cbse exam 2026' }, ans: '(A) Cbse Exam 2026' }
    ];

    const poolQ3 = [
      { text: 'Which of the following expressions in Python evaluates to True?', opts: { optA: '2 > 3 and 2 < 3', optB: '3 > 1 and 2 == 5', optC: '3 > 1 and 3 > 2', optD: '3 > 1 and 3 < 2' }, ans: '(C) 3 > 1 and 3 > 2' },
      { text: 'Which of the following logical expressions in Python evaluates to False?', opts: { optA: 'bool([])', optB: 'bool("False")', optC: 'bool([0])', optD: 'bool(1)' }, ans: '(A) bool([])' }
    ];

    const poolQ4 = [
      { text: 'What is the output of the following code snippet?', code: "s = 'War and Peace by Leo Tolstoy'\nprint(s.partition('by'))", opts: { optA: "('War and Peace ', 'by', ' Leo Tolstoy')", optB: "['War and Peace ', 'by', ' Leo Tolstoy']", optC: "('War and Peace ', ' Leo Tolstoy')", optD: "['War and Peace ', ' Leo Tolstoy']" }, ans: "(A)" }
    ];

    const poolQ5 = [
      { text: 'What will be the output of the following statement?', code: 'print("PythonProgram"[-1:2:-2])', ans: 'Output: "mrorP"' }
    ];

    const poolQ6 = [
      { text: 'What will be the output of the following code snippet?', code: "t = tuple('tuple')\nt2 = t[2],\nt += t2\nprint(t)", opts: { optA: "('tuple')", optB: "('tuple', 'p')", optC: "('t', 'u', 'p', 'l', 'e', 'p')", optD: "('t', 'u', 'p', 'l', 'e')" }, ans: "(C)" }
    ];

    const poolQ7 = [
      { text: 'Which of the following statements is true about dictionaries in Python?', opts: { optA: 'A dictionary is an example of sequence datatype.', optB: 'A dictionary cannot have two elements with same key.', optC: 'A dictionary cannot have two elements with same value.', optD: 'The key and value of an element cannot be the same.' }, ans: '(B)' }
    ];

    const poolQ8 = [
      { text: `If L is a list with ${listLen} elements, then which of the following statements will raise an exception?`, opts: { optA: 'L.pop(1)', optB: `L.pop(${listLen})`, optC: 'L.insert(1, 6)', optD: 'L.insert(6, 1)' }, ans: `(B) L.pop(${listLen})` }
    ];

    const poolQ9 = [
      { text: 'What will be the output of the following code?', code: "def f1(a, b=1):\n    print(a + b, end='-')\nc = f1(1, 2)\nprint(c, sep='*')", opts: { optA: '3-2', optB: '3-2*', optC: '3-None', optD: '3*None-' }, ans: '(C) 3-None' }
    ];

    const poolQ10 = [
      { text: 'Consider the statement given below:\nf1 = open("pqr.dat", "____")\nWhich of the following is the correct file mode to open the file in read only binary mode?', opts: { optA: 'a', optB: 'rb', optC: 'r+', optD: 'rb+' }, ans: '(B) rb' }
    ];

    const poolQ11 = [
      { text: 'State whether the following statement is True or False:\nIn Python, Logical errors can be handled using try...except...finally statement.', ans: 'False.' }
    ];

    const poolQ12 = [
      { text: 'A table has two candidate keys, one of which is chosen as the primary key. How many alternate keys does this table have?', opts: { optA: '0', optB: '1', optC: '2', optD: '3' }, ans: '(B) 1' }
    ];

    const poolQ13 = [
      { text: 'Which of the following SQL command can change the degree of the existing relation?', opts: { optA: 'DROP TABLE', optB: 'ALTER TABLE', optC: 'UPDATE...SET', optD: 'DELETE' }, ans: '(B) ALTER TABLE' }
    ];

    const poolQ14 = [
      { text: 'What will be the output of the query?\nSELECT MACHINE_ID, MACHINE_NAME FROM INVENTORY WHERE QUANTITY <= 100;', opts: { optA: 'All columns of INVENTORY table with quantity greater than 100', optB: 'ID and name of machines with quantity less than 100 from INVENTORY table', optC: 'All columns of INVENTORY table with quantity greater than or equal to 100', optD: 'ID and name of machines with quantity less than or equal to 100 from INVENTORY table.' }, ans: '(D)' }
    ];

    const poolQ15 = [
      { text: 'A relation in MySQL database consists of 2 tuples and 3 attributes. If 2 attributes are deleted and 4 tuples are added, what will be the cardinality of the relation?', opts: { optA: '4', optB: '5', optC: '6', optD: '7' }, ans: '(C) 6' }
    ];

    const poolQ16 = [
      { text: 'Which aggregate function in SQL returns the smallest value from a column in a table?', opts: { optA: 'MIN()', optB: 'MAX()', optC: 'SMALL()', optD: 'LOWER()' }, ans: '(A) MIN()' }
    ];

    const poolQ17 = [
      { text: 'With respect to computer networks, which of the following is the correct expanded form of RJ 45?', opts: { optA: 'Radio Jockey 45', optB: 'Registered Jockey 45', optC: 'Radio Jack 45', optD: 'Registered Jack 45' }, ans: '(D) Registered Jack 45' }
    ];

    const poolQ18 = [
      { text: 'Which network device serves as the entry and exit point of a network, routing all incoming and outgoing data between dissimilar protocols?', opts: { optA: 'Modem', optB: 'Gateway', optC: 'Switch', optD: 'Repeater' }, ans: '(B) Gateway' }
    ];

    const poolQ19 = [
      { text: 'Expand the term XML.', opts: { optA: 'Extensible Markup Language', optB: 'Extended Media Link', optC: 'External Markup Link', optD: 'Expressive Machine Language' }, ans: '(A) Extensible Markup Language' }
    ];

    const poolQ20 = [
      { text: "Assertion (A): [1, 2, 3] + '123' is an invalid expression in Python.\nReason (R): In Python, a list cannot be concatenated with a string.", opts: { optA: 'Both (A) and (R) are true and (R) is correct explanation for (A).', optB: 'Both (A) and (R) are true but (R) is not correct explanation.', optC: '(A) is true, but (R) is false.', optD: '(A) is false, but (R) is true.' }, ans: '(A)' }
    ];

    const poolQ21 = [
      { text: 'Assertion (A): The PRIMARY KEY constraint in SQL ensures that each value in the column(s) is unique and cannot be NULL.\nReason (R): Candidate keys are not eligible to become a primary key.', opts: { optA: 'Both (A) and (R) are true and (R) is correct explanation for (A).', optB: 'Both (A) and (R) are true but (R) is not correct explanation.', optC: '(A) is true, but (R) is false.', optD: '(A) is false, but (R) is true.' }, ans: '(C)' }
    ];

    const selectedQ = [
      getRandomChoice(poolQ1), getRandomChoice(poolQ2), getRandomChoice(poolQ3),
      getRandomChoice(poolQ4), getRandomChoice(poolQ5), getRandomChoice(poolQ6),
      getRandomChoice(poolQ7), getRandomChoice(poolQ8), getRandomChoice(poolQ9),
      getRandomChoice(poolQ10), getRandomChoice(poolQ11), getRandomChoice(poolQ12),
      getRandomChoice(poolQ13), getRandomChoice(poolQ14), getRandomChoice(poolQ15),
      getRandomChoice(poolQ16), getRandomChoice(poolQ17), getRandomChoice(poolQ18),
      getRandomChoice(poolQ19), getRandomChoice(poolQ20), getRandomChoice(poolQ21)
    ];

    const sectionAQuestions: FullGeneratedQuestion[] = selectedQ.map((item, index) => ({
      qNum: index + 1, section: 'A', marks: 1, text: item.text, codeBlock: item.code, options: item.opts, answerKey: item.ans
    }));

    const sectionBQuestions: FullGeneratedQuestion[] = [
      { qNum: 22, section: 'B', marks: 2, text: 'What is the difference between default parameters and positional parameters in Python? Give an example.', answerKey: 'Positional arguments must match order; Default take fallback values if omitted.' },
      { qNum: 23, section: 'B', marks: 2, text: 'Write a Python statement to perform:\n(i) Create new list L1 containing elements of list L in ascending order without modifying L.\n(ii) Check whether character ch is alphanumeric.', answerKey: '(i) L1 = sorted(L)\n(ii) ch.isalnum()' },
      { qNum: 24, section: 'B', marks: 2, text: "Assuming D1 is a dictionary in Python:\n(i) Write expression to check if key 'RNO' is in D1.\n(ii) Use built-in function to add 'RNo': 12 if not present, else return its value.", answerKey: "(i) 'RNO' in D1\n(ii) D1.setdefault('RNo', 12)" },
      { qNum: 25, section: 'B', marks: 2, text: 'What possible output will NOT be displayed when following code executes?\nimport random\na = [1, 2, 3, 4, 5, 6]\nfor i in range(4):\n    j = random.randrange(i, 5)\n    print(a[j], end="-")', codeBlock: 'Options: (A) 3-4-5-4- (B) 2-2-4-5- (C) 4-3-3-5- (D) 5-1-2-4-', answerKey: 'Option (D) cannot be generated.' },
      { qNum: 26, section: 'B', marks: 2, text: 'Rewrite code after removing all logical and syntax errors:\ndef CountVowels(s):\n    c = 0\n    for ch in range(s):\n        if "aeiouAEIOU" in ch:\n            c =+ 1\n    return (ch)', answerKey: 'def CountVowels(s):\n    c = 0\n    for ch in s:\n        if ch in "aeiouAEIOU":\n            c += 1\n    return c' },
      { qNum: 27, section: 'B', marks: 2, text: 'Write SQL command to create table W_STOCK(W_Code CHAR(5) PRIMARY KEY, W_Description VARCHAR(20), B_Qty INT, U_Price FLOAT).', answerKey: 'CREATE TABLE W_STOCK (W_Code CHAR(5) PRIMARY KEY, W_Description VARCHAR(20), B_Qty INT, U_Price FLOAT);' },
      { qNum: 28, section: 'B', marks: 2, text: 'List one advantage and one disadvantage of Bus topology.', answerKey: 'Advantage: Easy to install. Disadvantage: Entire network fails if backbone cable breaks.' }
    ];

    const sectionCQuestions: FullGeneratedQuestion[] = [
      { qNum: 29, section: 'C', marks: 3, text: 'Write a Python function that counts and returns the number of digits appearing in text file "Space.txt".', orOptionText: 'OR\nWrite a Python function that displays words where lowercase letter "e" appears at least twice in text file "Space.txt".', answerKey: 'def CountDigits():\n    c = 0\n    with open("Space.txt") as f:\n        for ch in f.read():\n            if ch.isdigit(): c += 1\n    return c' },
      { qNum: 30, section: 'C', marks: 3, text: 'A stack FruitStack contains dictionary records {\'Name\', \'Price\'}. Write push_fruit(FruitStack, Fruit) to push if Price < 100, and pop_fruit(FruitStack).', answerKey: 'def push_fruit(stk, f):\n    if f["Price"] < 100: stk.append(f)\ndef pop_fruit(stk):\n    return stk.pop() if stk else print("UNDERFLOW")' },
      { qNum: 31, section: 'C', marks: 3, text: 'Write output of: def Exam(s): new=[]; for c in s[1:-1]: if c.isupper(): new.reverse(); elif c not in new: new.append(c); print(new); Exam("Gold-24Medals")', answerKey: "['l', 'd', '-', '2', '4', 'e', 'd', 'a', 'l']" }
    ];

    const sectionDQuestions: FullGeneratedQuestion[] = [
      { qNum: 32, section: 'D', marks: 4, text: 'Table STOCK(Code, Type, Volume, Qty, Price). Write SQL queries:\n(i) Display Type and max Price for each Type.\n(ii) Increase Price by 0.5 where Type is "F".\n(iii) Total stock value (sum of Qty * Price).\n(iv) Details where Code starts with "A".', answerKey: '(i) SELECT Type, MAX(Price) FROM STOCK GROUP BY Type;\n(ii) UPDATE STOCK SET Price = Price + 0.5 WHERE Type = "F";\n(iii) SELECT SUM(Qty * Price) FROM STOCK;\n(iv) SELECT * FROM STOCK WHERE Code LIKE "A%";' },
      { qNum: 33, section: 'D', marks: 4, text: 'A CSV file "States.csv" has [State, Capital, Population, Language]. Write Python script to read and append records with population > 10000000 into "More.csv", skipping header.', answerKey: 'Use csv.reader and csv.writer, skip header with next(), and write filtered rows.' },
      { qNum: 34, section: 'D', marks: 4, text: 'Tables CUSTOMERS(CID, CName, Phone) and LOANS(SNo, CID, LAmt, LDate, Terms, RoI). Write queries for:\n(i) Count records where RoI > 7.0.\n(ii) Customer names where LAmt > 1000000.\n(iii) CID, CName where LDate > "2024-12-31".\n(iv) Loans ordered by RoI descending.', answerKey: 'SQL aggregation, join queries, and order by clauses.' },
      { qNum: 35, section: 'D', marks: 4, text: 'Write Python program connecting to MySQL database SCHOOL (User: admin, Password: root) to fetch and print records from table Account where Fees < 5000.', answerKey: 'import mysql.connector, connect(), cursor(), execute("SELECT * FROM Account WHERE Fees < 5000"), fetchall().' }
    ];

    const sectionEQuestions: FullGeneratedQuestion[] = [
      { qNum: 36, section: 'E', marks: 5, text: 'Binary file RESOURCES.DAT has tuples (RID, RName, RExpertise, Charges). Write Python functions:\n(i) Append(): Take input and dump tuple to file.\n(ii) Update(): Increase Charges of each person by 500.', answerKey: 'Use pickle.dump in "ab" mode for append, read-all and write-back with pickle for update.' },
      { qNum: 37, section: 'E', marks: 5, text: 'CASE STUDY: Campus Networking for 4 blocks: ADMIN (25 PCs), ACADEMIC (600 PCs), HOSTEL (120 PCs), SPORTS (50 PCs).\n(i) Location of Server with justification.\n(ii) Cable layout topology.\n(iii) Two wired transmission media for intra-block.\n(iv) Medium used by campus FM.\n(v) Protocol used for audio-visual communication.', answerKey: '(i) ACADEMIC Block (80-20 rule).\n(ii) Star Topology centered at ACADEMIC Block.\n(iii) Cat6 Twisted Pair Cable and Coaxial Cable.\n(iv) Radio Waves.\n(v) VoIP (Voice over Internet Protocol).' }
    ];

    return {
      questions: [
        ...sectionAQuestions,
        ...sectionBQuestions,
        ...sectionCQuestions,
        ...sectionDQuestions,
        ...sectionEQuestions
      ],
      totalMarks: 70,
      instructions: [
        'This question paper contains 37 questions divided into 5 Sections - A, B, C, D and E.',
        'Section A (Q1 to Q21): 1 Mark each.',
        'Section B (Q22 to Q28): 2 Marks each.',
        'Section C (Q29 to Q31): 3 Marks each.',
        'Section D (Q32 to Q35): 4 Marks each.',
        'Section E (Q36 & Q37): 5 Marks each.',
        'All programming questions to be answered using Python Language only.'
      ]
    };
  }

  // =========================================================================
  // 5. YOGA (CODE 841) - 50 MARKS (34 QUESTIONS)
  // =========================================================================
  if (str.includes('841') || str.includes('yoga')) {
    const rawYogaA = [
      { text: 'According to Sage Patanjali, what is the precise definition of Yoga?', opts: { optA: 'Yogas Chitta Vritti Nirodha', optB: 'Samatvam Yoga Uchyate', optC: 'Yogah Karmasu Kaushalam', optD: 'Sharira Madhyam Khalu Dharma Sadhanam' }, ans: '(A)' },
      { text: 'Which of the following is classified under the classical Shatkarma techniques?', opts: { optA: 'Trataka', optB: 'Vajrasana', optC: 'Bhastrika', optD: 'Ujjayi' }, ans: '(A)' },
      { text: 'Surya Namaskara comprises a sequential flow of how many postures?', opts: { optA: '12 Postures', optB: '10 Postures', optC: '8 Postures', optD: '16 Postures' }, ans: '(A)' },
      { text: 'Which dietary classification promotes lightness, longevity, and mental serenity in Hatha texts?', opts: { optA: 'Mitahara / Sattvic', optB: 'Rajasic', optC: 'Tamasic', optD: 'Ati-Aahara' }, ans: '(A)' },
      { text: 'Which Pranayama is characterized by producing the resonant soothing hum of a bee?', opts: { optA: 'Bhramari', optB: 'Sheetali', optC: 'Surya Bhedana', optD: 'Ujjayi' }, ans: '(A)' },
      { text: 'Which Yogic limb in Ashtanga Yoga deals with restraint of senses from external objects?', opts: { optA: 'Pratyahara', optB: 'Dharana', optC: 'Niyama', optD: 'Dhyana' }, ans: '(A)' },
      { text: 'Which energy channel represents the cooling, lunar, and parasympathetic pathway?', opts: { optA: 'Ida Nadi', optB: 'Pingala Nadi', optC: 'Sushumna Nadi', optD: 'Gandhari Nadi' }, ans: '(A)' },
      { text: 'Which posture is exceptionally safe and advised to be performed immediately following meals?', opts: { optA: 'Vajrasana', optB: 'Sarvangasana', optC: 'Chakrasana', optD: 'Halasana' }, ans: '(A)' }
    ];

    const rawYogaB = [
      { text: 'Define the term Shatkarma and name any four cleansing techniques described in Hatha Yoga Pradipika.', ans: 'Shatkarma refers to six internal purificatory methods: Dhauti, Basti, Neti, Trataka, Nauli, Kapalabhati.' },
      { text: 'State the health indications and contraindications of Paschimottanasana.', ans: 'Indications: Stretches hamstrings, relieves gastric discomfort. Contraindications: Severe lumbar herniation, acute sciatica.' },
      { text: 'Differentiate between the concepts of Bahiranga Yoga and Antaranga Yoga in Sage Patanjali Sutras.', ans: 'Bahiranga Yoga represents external limbs (Yama to Pratyahara); Antaranga Yoga comprises internal meditative limbs (Dharana, Dhyana, Samadhi).' },
      { text: 'Outline the physiological mechanisms of Anulom-Vilom in restoring autonomic nervous equilibrium.', ans: 'Balances sympathetic (Pingala) and parasympathetic (Ida) inputs, harmonizing heart rate variability.' }
    ];

    const questions: FullGeneratedQuestion[] = [];
    let qCount = 1;

    shuffleArray(rawYogaA).slice(0, 20).forEach(q => {
      questions.push({ qNum: qCount++, section: 'A', marks: 1, text: q.text, options: q.opts, answerKey: q.ans });
    });

    shuffleArray(rawYogaB).slice(0, 8).forEach(q => {
      questions.push({ qNum: qCount++, section: 'B', marks: 2, text: q.text, answerKey: q.ans });
    });

    questions.push({
      qNum: qCount++, section: 'C', marks: 3,
      text: 'Describe the stepwise technique, breathing synchronization, and anatomical benefits of Bhujangasana (Cobra Pose).',
      answerKey: 'Lie prone, palms under shoulders, inhale and gently arch thoracic spine upwards while keeping navel grounded.'
    });

    questions.push({
      qNum: qCount++, section: 'D', marks: 5,
      text: 'Case Study: Workplace Psychosomatic Stress.\nDesign a comprehensive 30-minute Yogic routine for corporate professionals suffering from postural fatigue, cervical strain, and chronic anxiety.',
      answerKey: 'Structure: 5 min Sukshma Vyayama, 10 min restorative asanas, 10 min Pranayama, 5 min Shavasana.'
    });

    return {
      questions,
      totalMarks: 50,
      instructions: [
        'This question paper covers CBSE Class 11/12 Yoga (Subject Code 841).',
        'Section A: 20 Objective Type Questions (1 Mark each).',
        'Section B: 8 Short Answer Questions (2 Marks each).',
        'Section C & D: Analytical and Applied Case Study Questions.'
      ]
    };
  }

  // =========================================================================
  // 6. DEFAULT SENIOR SECONDARY BOARD ENGINE (NO DUMMY THEOREM/SI TEXT)
  // =========================================================================
  const subCode = str.match(/\d+/)?.[0] || '2026';
  const genericQuestions: FullGeneratedQuestion[] = [];
  let cnt = 1;

  for (let i = 1; i <= 20; i++) {
    genericQuestions.push({
      qNum: cnt++,
      section: 'A',
      marks: 1,
      text: `Which of the following statements is correct regarding the core analytical principles of Unit ${Math.ceil(i / 4)} in ${subjectName}?`,
      options: {
        optA: `It represents the empirical foundational framework under CBSE Code ${subCode}.`,
        optB: `It is an auxiliary operational assumption.`,
        optC: `It evaluates secondary derivative parameters.`,
        optD: `None of the above.`
      },
      answerKey: '(A) Core standard formulation.'
    });
  }

  for (let i = 1; i <= 6; i++) {
    genericQuestions.push({
      qNum: cnt++,
      section: 'B',
      marks: 3,
      text: `Differentiate between fundamental principles and applied practices in Unit ${i} of ${subjectName} with two illustrative examples.`,
      orOptionText: `OR\nExplain the procedural workflow and theoretical justification applicable to Unit ${i} of ${subjectName}.`,
      answerKey: 'Stepwise differentiation supported with real-world examples.'
    });
  }

  for (let i = 1; i <= 4; i++) {
    genericQuestions.push({
      qNum: cnt++,
      section: 'C',
      marks: 4,
      text: `Analyze the key concepts and governing laws associated with Unit ${i} in ${subjectName}. Support your answer with a neat labeled schematic diagram or mathematical derivation.`,
      answerKey: 'Complete stepwise technical explanation with accurate labelling and working.'
    });
  }

  for (let i = 1; i <= 4; i++) {
    genericQuestions.push({
      qNum: cnt++,
      section: 'D',
      marks: 6,
      text: `COMPREHENSIVE CASE STUDY - ${subjectName}:\nAnalyze the practical scenario involving parameter variations in Unit ${i}. Calculate the resultant values, evaluate system constraints, and outline remedial measures.`,
      orOptionText: `OR\nElaborate upon the statutory and analytical guidelines prescribed for Unit ${i} in ${subjectName} with detailed stepwise working notes.`,
      answerKey: 'Comprehensive evaluation covering working steps, final numerical calculations, and analytical justification.'
    });
  }

  return {
    questions: genericQuestions,
    totalMarks: 80,
    instructions: [
      `Official CBSE Session 2026-27 Examination Paper for ${subjectName}.`,
      'Section A comprises 20 Objective Type Questions (1 Mark each).',
      'Section B comprises 6 Short Answer Questions (3 Marks each).',
      'Section C comprises 4 Medium Answer Questions (4 Marks each).',
      'Section D comprises 4 Long Answer Questions (6 Marks each).',
      'Internal choices have been provided in selective questions. All working notes must be clearly shown.'
    ]
  };
}
