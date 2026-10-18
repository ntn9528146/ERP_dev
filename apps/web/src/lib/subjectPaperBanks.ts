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

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
  const cleanSub = subjectName.toLowerCase().replace(/[^a-z0-9]/g, '');

  // =========================================================================
  // 1. BUSINESS STUDIES (CODE 054) - COMPLETE CBSE 34 QUESTIONS (80 MARKS)
  // =========================================================================
  if (cleanSub.includes('054') || cleanSub.includes('businessstudies')) {
    const firmName1 = getRandomChoice(['Zentech Electronics Ltd', 'Apex Consumer Appliances Ltd', 'Solaris Green Tech Ltd', 'Nova FMCG India Ltd', 'Pinnacle Automotives Ltd', 'Surya Beverages Ltd']);
    const firmName2 = getRandomChoice(['Vanguard Logistics Ltd', 'Orbit Retail Chains Ltd', 'Zenith Garments Ltd', 'Bharat Packaging Solutions Ltd']);
    const leaderName = getRandomChoice(['Mr. Rajesh Sharma', 'Ms. Anita Deshmukh', 'Mr. Vikram Singhania', 'Ms. Meenakshi Iyer', 'Mr. Arvind Malhotra']);
    const subordinateName = getRandomChoice(['Rohan', 'Pooja', 'Karan', 'Sneha', 'Deepak', 'Manish']);
    const productName = getRandomChoice(['smart inverter refrigerator', 'organic herbal cosmetic range', 'eco-friendly electric two-wheeler', 'packaged nutritional health drinks', 'smart home automation device']);

    const bstMCQBank = [
      { text: 'Which principle of management states that an employee should receive orders from one and only one superior?', opts: { optA: 'Unity of Command', optB: 'Unity of Direction', optC: 'Scalar Chain', optD: 'Espirit de Corps' }, ans: '(A) Unity of Command.' },
      { text: 'Which level of management is directly responsible for coordinating day-to-day operations and maintaining quality standards on shop floor?', opts: { optA: 'Operational / Supervisory Management', optB: 'Top Level Management', optC: 'Middle Level Management', optD: 'Board of Directors' }, ans: '(A) Operational / Supervisory Management.' },
      { text: 'Which money market instrument is issued by commercial banks to finance the working capital requirements of business firms?', opts: { optA: 'Commercial Bill', optB: 'Treasury Bill', optC: 'Call Money', optD: 'Certificate of Deposit' }, ans: '(A) Commercial Bill.' },
      { text: 'The concept of "Trading on Equity" is associated with which financial decision of an enterprise?', opts: { optA: 'Financing Decision (Capital Structure)', optB: 'Investment Decision', optC: 'Dividend Decision', optD: 'Working Capital Decision' }, ans: '(A) Financing Decision (Capital Structure).' },
      { text: 'Which step in the staffing process involves evaluating an employee’s current performance against predetermined organizational standards?', opts: { optA: 'Performance Appraisal', optB: 'Recruitment', optC: 'Selection', optD: 'Orientation' }, ans: '(A) Performance Appraisal.' },
      { text: 'Which consumer right ensures that consumers are protected against marketing of goods hazardous to life and health?', opts: { optA: 'Right to Safety', optB: 'Right to Information', optC: 'Right to Choose', optD: 'Right to Seek Redressal' }, ans: '(A) Right to Safety.' },
      { text: 'Fayol’s principle of "Scalar Chain" can be bypassed in an emergency situation through which direct communication route?', opts: { optA: 'Gang Plank', optB: 'Informal Grapevine', optC: 'Wheel Network', optD: 'Free-flow Network' }, ans: '(A) Gang Plank.' },
      { text: 'Which function of marketing involves designing the wrapper, box or container to protect, store, and promote the product?', opts: { optA: 'Packaging and Labelling', optB: 'Standardisation and Grading', optC: 'Warehousing', optD: 'Pricing' }, ans: '(A) Packaging and Labelling.' },
      { text: 'Under the Consumer Protection Act, 2019, a complaint can be filed in the District Commission if value of goods or services does not exceed:', opts: { optA: '₹50 Lakh', optB: '₹1 Crore', optC: '₹2 Crore', optD: '₹10 Crore' }, ans: '(A) ₹50 Lakh.' },
      { text: 'Which scientific management technique propounded by F.W. Taylor separates planning from execution by deploying eight specialist foremen?', opts: { optA: 'Functional Foremanship', optB: 'Method Study', optC: 'Time Study', optD: 'Standardisation of Work' }, ans: '(A) Functional Foremanship.' },
      { text: 'Delegation of authority comprises which three interrelated essential elements?', opts: { optA: 'Authority, Responsibility, Accountability', optB: 'Planning, Organising, Directing', optC: 'Supervision, Motivation, Leadership', optD: 'Power, Status, Prestige' }, ans: '(A) Authority, Responsibility, and Accountability.' },
      { text: 'The process of classifying products into distinct lots on the basis of predetermined specifications (size, quality, weight) is termed:', opts: { optA: 'Grading', optB: 'Standardisation', optC: 'Branding', optD: 'Packaging' }, ans: '(A) Grading.' },
      { text: 'Which financial decision determines how total funds procured are committed to long-term assets and projects?', opts: { optA: 'Capital Budgeting / Investment Decision', optB: 'Financing Decision', optC: 'Dividend Decision', optD: 'Liquidity Decision' }, ans: '(A) Capital Budgeting / Investment Decision.' },
      { text: 'Which of the following is an internal source of recruitment?', opts: { optA: 'Promotions and Transfers', optB: 'Campus Placement', optC: 'Direct Recruitment at Factory Gate', optD: 'Employment Exchanges' }, ans: '(A) Promotions and Transfers.' },
      { text: 'In Maslow’s Need Hierarchy theory of motivation, recognition, self-respect, and job status satisfy which need category?', opts: { optA: 'Esteem Needs', optB: 'Safety / Security Needs', optC: 'Social / Affiliation Needs', optD: 'Physiological Needs' }, ans: '(A) Esteem Needs.' },
      { text: 'A firm with a high fixed operating cost (high operating leverage) should prefer which source of finance to minimize risk?', opts: { optA: 'Equity Capital', optB: 'Debentures', optC: 'Long-term Bank Loan', optD: 'Preference Shares' }, ans: '(A) Equity Capital.' },
      { text: 'Assertion (A): Planning is forward-looking and controlling is backward-looking.\nReason (R): Planning establishes future goals whereas controlling checks past performance deviations against standards.', opts: { optA: 'Both (A) and (R) are true and (R) is correct explanation for (A).', optB: 'Both (A) and (R) are true but (R) is not correct explanation.', optC: '(A) is true, but (R) is false.', optD: '(A) is false, but (R) is true.' }, ans: '(A) Both are true and (R) explains (A).' },
      { text: 'Which leadership style involves giving complete freedom to subordinates in decision-making and goal achievement?', opts: { optA: 'Free-rein / Laissez-faire Leadership', optB: 'Autocratic Leadership', optC: 'Democratic Leadership', optD: 'Paternalistic Leadership' }, ans: '(A) Free-rein / Laissez-faire Leadership.' },
      { text: 'The regulatory body that supervises and governs stock exchanges and protects investors in India is:', opts: { optA: 'Securities and Exchange Board of India (SEBI)', optB: 'Reserve Bank of India (RBI)', optC: 'Ministry of Corporate Affairs (MCA)', optD: 'Insurance Regulatory and Development Authority (IRDAI)' }, ans: '(A) SEBI.' },
      { text: 'Which promotional tool involves short-term incentives like discounts, rebates, coupons, and free samples to boost sales?', opts: { optA: 'Sales Promotion', optB: 'Advertising', optC: 'Personal Selling', optD: 'Public Relations' }, ans: '(A) Sales Promotion.' },
      { text: 'Management is considered a dynamic process because:', opts: { optA: 'It adapts continually to changing socio-economic and technological environments', optB: 'It relies solely on static traditional procedures', optC: 'It operates in complete isolation', optD: 'It cannot be measured' }, ans: '(A) It adapts continually to changing environment.' },
      { text: 'Which of the following is a non-financial incentive for employees?', opts: { optA: 'Job Enrichment and Employee Recognition', optB: 'Productivity Linked Wage Incentive', optC: 'Bonus and Profit Sharing', optD: 'Retirement Gratuity' }, ans: '(A) Job Enrichment and Recognition.' },
      { text: 'Controlling function of an enterprise cannot be performed without:', opts: { optA: 'Planning', optB: 'Staffing', optC: 'Advertising', optD: 'Directing' }, ans: '(A) Planning (as planning provides the benchmark standards).' }
    ];

    const questions: FullGeneratedQuestion[] = [];
    let qCount = 1;

    // SECTION A: Q1 to Q20 (20 MCQs x 1M = 20 Marks)
    shuffleArray(bstMCQBank).slice(0, 20).forEach((q, idx) => {
      questions.push({
        qNum: qCount++,
        partTitle: idx === 0 ? 'PART - A: PRINCIPLES AND FUNCTIONS OF MANAGEMENT (50 MARKS)' : undefined,
        typeBadge: '1 Mark MCQ',
        marks: 1,
        text: q.text,
        options: q.opts,
        answerKey: q.ans
      });
    });

    // SECTION B: Q21 to Q24 (4 SA x 3M = 12 Marks)
    questions.push({
      qNum: qCount++,
      typeBadge: '3 Marks Short Answer',
      marks: 3,
      text: `Explain any three features of "Coordination" as the essence of management with reference to operations at ${firmName1}.`,
      orOptionText: `Differentiate between Functional Organizational Structure and Divisional Organizational Structure on the basis of: (i) Formation, (ii) Responsibility, (iii) Cost economics.`,
      answerKey: 'Features: Integrates group efforts, ensures unity of action, continuous process, all-pervasive function.'
    });

    questions.push({
      qNum: qCount++,
      typeBadge: '3 Marks Short Answer',
      marks: 3,
      text: `${leaderName}, the General Manager of ${firmName1}, delegated the responsibility of completing a marketing campaign to ${subordinateName}. Can ${leaderName} escape accountability if the campaign fails? Explain the Principle of Absoluteness of Accountability.`,
      answerKey: 'No, authority can be delegated but accountability is absolute and cannot be delegated away to a subordinate.'
    });

    questions.push({
      qNum: qCount++,
      typeBadge: '3 Marks Short Answer',
      marks: 3,
      text: `Explain the meaning of "Management by Exception (MBE)" and "Critical Point Control (CPC)" as techniques used in analyzing performance deviations in the controlling process.`,
      orOptionText: `Explain any three non-financial incentives that can be deployed to motivate technical engineers in ${firmName1}.`,
      answerKey: 'CPC focuses on key result areas (KRAs). MBE states that an attempt to control everything results in controlling nothing.'
    });

    questions.push({
      qNum: qCount++,
      typeBadge: '3 Marks Short Answer',
      marks: 3,
      text: `State any three consumer rights guaranteed under the Consumer Protection Act, 2019. Give one real-life example of how Right to Seek Redressal is exercised.`,
      answerKey: 'Right to Safety, Right to Information, Right to Seek Redressal, Right to Consumer Education.'
    });

    // SECTION C: Q25 to Q30 (6 Medium Questions x 4M = 24 Marks)
    questions.push({
      qNum: qCount++,
      typeBadge: '4 Marks Medium Answer',
      marks: 4,
      text: `Explain any four dimensions of the Business Environment (Economic, Social, Technological, Political, Legal) impacting ${firmName1}'s recent business expansion.`,
      answerKey: 'Economic (interest rates, inflation), Social (consumer tastes, values), Technological (automation, digital), Legal (statutory acts).'
    });

    questions.push({
      qNum: qCount++,
      typeBadge: '4 Marks Medium Answer',
      marks: 4,
      text: `Explain the sequential steps involved in the "Planning Process" from Setting Objectives to Follow-up Action in an industrial firm like ${firmName1}.`,
      orOptionText: `Explain any four barriers to effective managerial communication (Semantic, Psychological, Organizational, Personal) and how they can be overcome.`,
      answerKey: 'Steps: Setting objectives, Developing premises, Identifying alternatives, Evaluating alternatives, Selecting course of action, Implementing plan, Follow-up action.'
    });

    questions.push({
      qNum: qCount++,
      typeBadge: '4 Marks Medium Answer',
      marks: 4,
      text: `Explain the "Selection Process" followed in modern enterprises from Employment Interview to Job Offer and Contract of Employment.`,
      answerKey: 'Preliminary screening, Selection tests, Employment interview, Reference check, Selection decision, Medical examination, Job offer, Contract.'
    });

    questions.push({
      qNum: qCount++,
      partTitle: 'PART - B: BUSINESS FINANCE AND MARKETING (30 MARKS)',
      typeBadge: '4 Marks Medium Answer',
      marks: 4,
      text: `What is Capital Structure? Explain how (i) Cash Flow Position and (ii) Interest Coverage Ratio (ICR) influence the financing mix of debt and equity in ${firmName2}.`,
      answerKey: 'Capital structure is debt-equity ratio. High steady cash flow and high ICR allow higher debt leverage (trading on equity).'
    });

    questions.push({
      qNum: qCount++,
      typeBadge: '4 Marks Medium Answer',
      marks: 4,
      text: `Explain any four functions of Securities and Exchange Board of India (SEBI) categorized under Regulatory and Developmental duties.`,
      orOptionText: `Distinguish between the Primary Market and Secondary Market in the Indian financial system on the basis of: (i) Capital formation, (ii) Pricing of securities, (iii) Purchase/Sale mechanism, (iv) Geographical location.`,
      answerKey: 'Regulatory: Registration of brokers, regulating collective investment schemes. Developmental: Training intermediaries, research, investor education.'
    });

    questions.push({
      qNum: qCount++,
      typeBadge: '4 Marks Medium Answer',
      marks: 4,
      text: `Explain the 4 Ps of Marketing Mix with reference to launching a newly developed ${productName} in the Indian retail market.`,
      answerKey: 'Product (features, design, quality), Price (penetration vs skimming), Place (distribution channels, logistics), Promotion (advertising, PR).'
    });

    // SECTION D: Q31 to Q34 (4 Long Answer Questions x 6M = 24 Marks)
    questions.push({
      qNum: qCount++,
      typeBadge: '6 Marks Case-Based / Comprehensive',
      marks: 6,
      text: `CASE STUDY - SCIENTIFIC MANAGEMENT IN INDUSTRIAL ASSEMBLY:\n${firmName1} is an automobile manufacturing firm where production output fell short of target by 25%. A consulting industrial engineer suggested replacing obsolete rule-of-thumb practices with Taylor's scientific principles.\n\n(i) Identify and explain three Scientific Principles of Taylor applicable here. [3]\n(ii) Explain how "Method Study" and "Motion Study" can eliminate unproductive steps and streamline worker movement. [3]`,
      orOptionText: `Explain Henry Fayol's 14 Principles of General Management with special reference to: (i) Division of Work, (ii) Discipline, (iii) Remuneration of Personnel, (iv) Order, (v) Equity, and (vi) Espirit de Corps. [6]`,
      answerKey: '(i) Science not rule of thumb, Harmony not discord, Cooperation not individualism. (ii) Method study finds one best way; Motion study eliminates unnecessary body movements using video tracking.'
    });

    questions.push({
      qNum: qCount++,
      typeBadge: '6 Marks Long Answer',
      marks: 6,
      text: `CASE STUDY - MOTIVATION & LEADERSHIP STYLES:\n${leaderName}, Managing Director of ${firmName2}, noticed employee turnover rising among newly recruited executives. Exit interviews revealed low job satisfaction, lack of career growth, and rigid authoritarian supervision.\n\n(i) Explain how Maslow’s Need Hierarchy theory can be applied to fulfill psychological, esteem, and self-actualization needs of these executives. [3]\n(ii) Compare Autocratic Leadership with Democratic Leadership. Which style should ${leaderName} adopt to revive employee morale? [3]`,
      answerKey: '(i) Provide job security, performance recognition, promotions, and challenging assignments. (ii) Autocratic centralizes decisions; Democratic involves subordinates. Adopt Democratic leadership.'
    });

    questions.push({
      qNum: qCount++,
      typeBadge: '6 Marks Long Answer',
      marks: 6,
      text: `Explain the factors affecting the requirements of (i) Fixed Capital and (ii) Working Capital of a manufacturing enterprise like ${firmName1}. Discuss three major determinants for each.`,
      orOptionText: `What is meant by Capital Budgeting decision? Explain the importance of investment decisions and analyze four critical factors affecting capital budgeting in a modern corporate firm.`,
      answerKey: 'Fixed Capital: Nature of business, scale of operations, choice of technique, growth prospects. Working Capital: Business cycle, credit allowed/availed, operating efficiency.'
    });

    questions.push({
      qNum: qCount++,
      typeBadge: '6 Marks Case-Based / Comprehensive',
      marks: 6,
      text: `CASE STUDY - MARKETING CHANNELS & CONSUMER REDRESSAL:\n${firmName1} manufactured and marketed a batch of ${productName}. Consumer ${subordinateName} purchased the product for ₹15,000 from an authorized dealer. Within three days, the device malfunctioned causing an electric short-circuit. The dealer refused refund or repair.\n\n(i) Under the Consumer Protection Act, 2019, which Consumer Rights of ${subordinateName} have been violated? [2]\n(ii) In which consumer dispute redressal forum should ${subordinateName} file the complaint? Explain the three-tier judicial machinery. [2]\n(iii) Mention any two relief measures the consumer forum can order in favor of ${subordinateName}. [2]`,
      answerKey: '(i) Right to Safety and Right to Seek Redressal. (ii) District Consumer Disputes Redressal Commission (claim under ₹50 Lakh). Three tiers: District, State, National. (iii) Free repair/replacement and financial compensation for injury/loss.'
    });

    return {
      questions,
      totalMarks: 80,
      instructions: [
        'This question paper contains 34 questions divided into two Parts – Part A (50 Marks) and Part B (30 Marks).',
        'Questions 1 to 20 carry 1 mark each (Multiple Choice Questions).',
        'Questions 21 to 24 carry 3 marks each (Short Answer Questions of approx. 50-75 words).',
        'Questions 25 to 30 carry 4 marks each (Medium Answer Questions of approx. 100-150 words).',
        'Questions 31 to 34 carry 6 marks each (Long Answer & Case Study Questions of approx. 200 words).',
        'Internal choices have been provided in questions of 3 marks, 4 marks, and 6 marks. Attempt only one alternative.'
      ]
    };
  }

  // =========================================================================
  // 2. ACCOUNTANCY (CODE 055) - TRUE DYNAMIC PROCEDURAL GENERATOR
  // =========================================================================
  if (cleanSub.includes('055') || cleanSub.includes('accountancy')) {
    const companyPool = [
      'Zenith Technologies Ltd', 'Vanguard Solar Power Ltd', 'Apex Infrastructure Ltd',
      'Bharat Global Motors Ltd', 'Reliance Logistics Ltd', 'Tata Green Energy Ltd',
      'Aditya Consumer Goods Ltd', 'Hindustan Heavy Metals Ltd', 'Sterling Steel Works Ltd',
      'Nova Life Sciences Ltd', 'Surya Power Systems Ltd', 'Falcon Aerospace Ltd'
    ];
    const comp1 = getRandomChoice(companyPool);
    const comp2 = getRandomChoice(companyPool.filter(c => c !== comp1));
    const vendor1 = getRandomChoice(['Precision Engineering Works', 'Modern Machines Ltd', 'Sun Solar Systems', 'Kaveri Industrial Equipment']);

    const sharesCount = getRandomChoice([50000, 60000, 75000, 80000, 100000, 120000]);
    const oversubMult = getRandomChoice([1.25, 1.4, 1.5, 1.6]);
    const appliedShares = Math.round(sharesCount * oversubMult);
    const allottedShares = Math.round(sharesCount * 1.2);
    const premiumVal = getRandomChoice([2, 3, 4, 5]);
    const defaulterShares = getRandomChoice([400, 500, 600, 800, 1000]);
    const reissuedShares = Math.round(defaulterShares * getRandomChoice([0.6, 0.75, 0.8, 1.0]));
    const reissuePrice = getRandomChoice([7, 8, 9]);

    const partnerGroupA = getRandomChoice([
      { p1: 'Aarav', p2: 'Bhavna', p3: 'Chetan', r1: 3, r2: 2, r3: 1, c1: 300000, c2: 200000, c3: 100000 },
      { p1: 'Rohit', p2: 'Kavita', p3: 'Deepak', r1: 5, r2: 3, r3: 2, c1: 500000, c2: 300000, c3: 200000 },
      { p1: 'Varun', p2: 'Tarun', p3: 'Karan', r1: 4, r2: 3, r3: 1, c1: 400000, c2: 300000, c3: 100000 },
      { p1: 'Mohit', p2: 'Shobhit', p3: 'Ankit', r1: 2, r2: 2, r3: 1, c1: 250000, c2: 250000, c3: 150000 },
      { p1: 'Dev', p2: 'Gaurav', p3: 'Harsh', r1: 3, r2: 1, r3: 1, c1: 350000, c2: 150000, c3: 150000 }
    ]);

    const partnerGroupB = getRandomChoice([
      { p1: 'Madhav', p2: 'Raghav', newP: 'Keshav', r1: 3, r2: 2, share: '1/5', cap: 80000, gwill: 30000, bld: 140000, mch: 90000, deb: 70000, stk: 50000, crd: 40000, res: 30000 },
      { p1: 'Sanjay', p2: 'Vijay', newP: 'Ajay', r1: 2, r2: 1, share: '1/4', cap: 100000, gwill: 40000, bld: 160000, mch: 110000, deb: 80000, stk: 60000, crd: 50000, res: 40000 },
      { p1: 'Pradeep', p2: 'Kuldeep', newP: 'Sandeep', r1: 3, r2: 1, share: '1/5', cap: 75000, gwill: 25000, bld: 150000, mch: 95000, deb: 75000, stk: 55000, crd: 45000, res: 35000 },
      { p1: 'Arjun', p2: 'Nakul', newP: 'Sahdev', r1: 4, r2: 1, share: '1/6', cap: 90000, gwill: 35000, bld: 175000, mch: 105000, deb: 85000, stk: 65000, crd: 55000, res: 45000 }
    ]);

    const bankBalAdm = 35000;
    const totAssetsAdm = partnerGroupB.bld + partnerGroupB.mch + (partnerGroupB.deb - 3000) + partnerGroupB.stk + bankBalAdm;
    const capitalsSumAdm = totAssetsAdm - partnerGroupB.crd - partnerGroupB.res;
    const p1CapAdm = Math.round(capitalsSumAdm * (partnerGroupB.r1 / (partnerGroupB.r1 + partnerGroupB.r2)));
    const p2CapAdm = capitalsSumAdm - p1CapAdm;

    const debRate = getRandomChoice([8, 9, 10, 12]);
    const purchasePrice = getRandomChoice([330000, 440000, 550000, 660000, 770000]);
    const debPremium = getRandomChoice([10, 20]);
    const debCount = Math.round(purchasePrice / (100 * (1 + debPremium / 100)));

    const partA_MCQ_Bank = [
      { text: `In the absence of a Partnership Deed, interest on loan advanced by partner ${partnerGroupA.p1} to the firm is payable at:`, opts: { optA: '6% p.a.', optB: '10% p.a.', optC: '12% p.a.', optD: 'Zero / Nil' }, ans: '(A) 6% p.a. as per Section 13(d) of Indian Partnership Act.' },
      { text: `At the time of admission of ${partnerGroupB.newP}, general reserve of ₹${partnerGroupB.res.toLocaleString('en-IN')} appearing in the balance sheet is transferred to:`, opts: { optA: 'Old Partners’ Capital Accounts in Old Ratio', optB: 'All Partners in New Ratio', optC: 'Revaluation Account', optD: 'Sacrificing Ratio' }, ans: '(A) Old Partners in Old Ratio.' },
      { text: `A company forfeited 100 shares of ₹10 each on which ₹${getRandomChoice([6, 7, 8])} was received. What is the maximum discount allowed on reissue of these shares?`, opts: { optA: 'Amount received on forfeiture', optB: 'Face value of shares', optC: 'Uncalled amount', optD: 'Statutory 5% limit' }, ans: '(A) Maximum discount allowed equals the amount forfeited per share.' },
      { text: 'Securities Premium Account can be utilized for which of the following purposes as per Section 52(2) of the Companies Act, 2013?', opts: { optA: 'Issuing fully paid bonus shares to members', optB: 'Distribution of dividends', optC: 'Paying trade creditors', optD: 'Writing off general reserve' }, ans: '(A) Issuing fully paid bonus shares.' },
      { text: 'Gaining Ratio is computed by applying which formula?', opts: { optA: 'New Ratio - Old Ratio', optB: 'Old Ratio - New Ratio', optC: 'Old Ratio - Sacrificing Ratio', optD: 'New Ratio + Old Ratio' }, ans: '(A) New Ratio - Old Ratio.' },
      { text: `If partner ${partnerGroupA.p2} withdraws ₹${getRandomChoice([5000, 8000, 10000]).toLocaleString('en-IN')} at the beginning of each calendar month, interest on drawings will be calculated for:`, opts: { optA: '6.5 Months', optB: '6.0 Months', optC: '5.5 Months', optD: '7.0 Months' }, ans: '(A) 6.5 Months.' },
      { text: `If partner ${partnerGroupA.p1} withdraws ₹${getRandomChoice([4000, 6000, 9000]).toLocaleString('en-IN')} at the end of each calendar month, interest on drawings will be calculated for:`, opts: { optA: '5.5 Months', optB: '6.0 Months', optC: '6.5 Months', optD: '7.0 Months' }, ans: '(A) 5.5 Months.' },
      { text: `On dissolution of firm, an unrecorded computer realized ₹${getRandomChoice([12000, 15000, 18000]).toLocaleString('en-IN')} in cash. In which account and on which side will it be recorded?`, opts: { optA: 'Credit side of Realisation Account', optB: 'Debit side of Realisation Account', optC: 'Credit side of Partners’ Capital Account', optD: 'Debit side of Cash Account only' }, ans: '(A) Credit side of Realisation Account.' },
      { text: 'When debentures are issued as Collateral Security for a secured bank loan, the entry passed in books is:', opts: { optA: 'Debit Debenture Suspense A/c and Credit Debentures A/c', optB: 'Debit Bank A/c and Credit Debentures A/c', optC: 'Debit Bank Loan A/c and Credit Debenture Suspense A/c', optD: 'No entry required in journal' }, ans: '(A) Debenture Suspense A/c Dr. to Debentures A/c.' },
      { text: 'Capital Reserve is created out of which of the following categories of profit?', opts: { optA: 'Capital Profits (Profit on reissue of forfeited shares / sale of fixed assets)', optB: 'Normal operating profits', optC: 'Gross Profit from operations', optD: 'Dividend Equalization Reserve' }, ans: '(A) Capital Profits.' },
      { text: 'Realisation Account prepared at the time of dissolution of a firm is in the nature of:', opts: { optA: 'Nominal Account', optB: 'Personal Account', optC: 'Real Account', optD: 'Representative Personal Account' }, ans: '(A) Nominal Account.' },
      { text: `A firm has capital employed ₹${getRandomChoice([400000, 500000, 600000]).toLocaleString('en-IN')}. Normal rate of return is 10%. Average profit earned is ₹${getRandomChoice([65000, 75000, 85000]).toLocaleString('en-IN')}. Super profit will be:`, opts: { optA: 'Average Profit - Normal Profit', optB: 'Average Profit + Normal Profit', optC: 'Capital Employed / 10%', optD: 'Normal Profit - Average Profit' }, ans: '(A) Super Profit = Average Profit - Normal Profit.' },
      { text: 'Calls in Arrears is deducted from which item in the Notes to Accounts of Balance Sheet?', opts: { optA: 'Subscribed but not fully paid-up capital', optB: 'Authorized Share Capital', optC: 'Issued Share Capital', optD: 'Securities Premium Reserve' }, ans: '(A) Subscribed but not fully paid-up capital.' },
      { text: 'On dissolution of firm, unrecorded liability paid off by partner out of personal funds is credited to:', opts: { optA: 'Concerned Partner’s Capital Account', optB: 'Realisation Account', optC: 'Cash Account', optD: 'Revaluation Account' }, ans: '(A) Concerned Partner’s Capital Account.' },
      { text: 'Assertion (A): Fixed Capital accounts of partners always show a credit balance.\nReason (R): All adjustments regarding drawings, interest, and share of profit are routed through Partners’ Current Accounts.', opts: { optA: 'Both (A) and (R) are true and (R) is correct explanation for (A).', optB: 'Both (A) and (R) are true but (R) is not correct explanation.', optC: '(A) is true, but (R) is false.', optD: '(A) is false, but (R) is true.' }, ans: '(A) Both are true and (R) explains (A).' },
      { text: 'At the time of forfeiture of shares, Share Capital Account is debited with:', opts: { optA: 'Called-up amount on forfeited shares', optB: 'Face value of forfeited shares', optC: 'Paid-up amount on forfeited shares', optD: 'Uncalled amount on forfeited shares' }, ans: '(A) Called-up amount.' },
      { text: `When partner ${partnerGroupA.p3} retires, his share of goodwill is credited to his capital account and debited to continuing partners in their:`, opts: { optA: 'Gaining Ratio', optB: 'Sacrificing Ratio', optC: 'Old Profit Sharing Ratio', optD: 'Capital Ratio' }, ans: '(A) Gaining Ratio.' },
      { text: 'Sacrificing Ratio is used to distribute which of the following items at the time of admission of a partner?', opts: { optA: 'Premium for Goodwill brought by new partner', optB: 'Revaluation Profit', optC: 'General Reserve', optD: 'Accumulated Losses' }, ans: '(A) Premium for Goodwill.' },
      { text: 'Discount on issue of debentures is written off within the tenure of debentures out of:', opts: { optA: 'Securities Premium Reserve / Statement of P&L', optB: 'General Reserve only', optC: 'Capital Redemption Reserve', optD: 'Debenture Redemption Reserve' }, ans: '(A) Securities Premium Reserve or Statement of P&L.' },
      { text: `A, B and C share profits in 3:2:1. If D is admitted for 1/6th share which he acquires entirely from A, new sacrificing ratio of A, B, C is:`, opts: { optA: '1:0:0', optB: '3:2:1', optC: '1:1:1', optD: '0:1:0' }, ans: '(A) 1:0:0 (only A sacrifices).' }
    ];

    const partB_MCQ_Bank = [
      { text: `An enterprise has Current Assets ₹${getRandomChoice([600000, 800000, 1000000]).toLocaleString('en-IN')} and Current Liabilities ₹${getRandomChoice([300000, 400000, 500000]).toLocaleString('en-IN')}. Payment of ₹50,000 to trade payables will:`, opts: { optA: 'Improve Current Ratio', optB: 'Reduce Current Ratio', optC: 'Not change Current Ratio', optD: 'Make Current Ratio zero' }, ans: '(A) Improve Current Ratio.' },
      { text: 'Which financial ratio measures the proportion of total assets funded through shareholders’ funds?', opts: { optA: 'Proprietary Ratio', optB: 'Debt to Equity Ratio', optC: 'Interest Coverage Ratio', optD: 'Total Assets to Debt Ratio' }, ans: '(A) Proprietary Ratio = Shareholders Funds / Total Assets.' },
      { text: 'Cash outflow on purchase of patent rights is categorized under which cash flow activity (AS-3)?', opts: { optA: 'Investing Activities', optB: 'Operating Activities', optC: 'Financing Activities', optD: 'Cash and Cash Equivalents' }, ans: '(A) Investing Activities.' },
      { text: 'Dividend received on investments by a manufacturing company is shown in Cash Flow Statement as:', opts: { optA: 'Inflow under Investing Activities', optB: 'Inflow under Operating Activities', optC: 'Inflow under Financing Activities', optD: 'Deduction from net profit' }, ans: '(A) Inflow under Investing Activities.' },
      { text: 'Which of the following is considered a Cash Equivalent according to AS-3 (Revised)?', opts: { optA: 'Treasury Bills with maturity of 90 days or less', optB: 'Shares held in private limited companies', optC: 'Trade Debtors', optD: 'Long-term Bank Deposits' }, ans: '(A) Treasury Bills with short maturity.' },
      { text: `Operating Ratio of a firm is ${getRandomChoice([75, 78, 80, 82])}%. What will be the Operating Profit Ratio of the enterprise?`, opts: { optA: '100% - Operating Ratio', optB: '100%', optC: '50%', optD: 'Zero' }, ans: '(A) Operating Profit Ratio = 100% - Operating Ratio.' },
      { text: 'Which of the following is classified as an Activity (Turnover) Ratio?', opts: { optA: 'Trade Receivables Turnover Ratio', optB: 'Current Ratio', optC: 'Debt-Equity Ratio', optD: 'Gross Profit Ratio' }, ans: '(A) Trade Receivables Turnover Ratio.' },
      { text: 'Increase in the amount of Outstanding Expenses during the accounting year results in:', opts: { optA: 'Addition to operating profit before working capital changes', optB: 'Deduction from operating profit', optC: 'Cash outflow from financing', optD: 'No cash flow impact' }, ans: '(A) Cash inflow adjustment under Operating Activities.' }
    ];

    const questions: FullGeneratedQuestion[] = [];
    let qCount = 1;

    shuffleArray(partA_MCQ_Bank).slice(0, 16).forEach((q, idx) => {
      questions.push({
        qNum: qCount++,
        partTitle: idx === 0 ? 'PART - A: ACCOUNTING FOR PARTNERSHIP FIRMS AND COMPANIES (60 MARKS)' : undefined,
        typeBadge: '1 Mark MCQ',
        marks: 1,
        text: q.text,
        options: q.opts,
        answerKey: q.ans
      });
    });

    const netProf = getRandomChoice([72000, 84000, 96000, 108000, 120000]);
    const partnerSal = getRandomChoice([1500, 2000, 2500, 3000]);
    questions.push({
      qNum: qCount++,
      typeBadge: '3 Marks Short Answer',
      marks: 3,
      text: `${partnerGroupA.p1}, ${partnerGroupA.p2} and ${partnerGroupA.p3} are partners sharing profits in ${partnerGroupA.r1}:${partnerGroupA.r2}:${partnerGroupA.r3} with capitals ₹${partnerGroupA.c1.toLocaleString('en-IN')}, ₹${partnerGroupA.c2.toLocaleString('en-IN')} and ₹${partnerGroupA.c3.toLocaleString('en-IN')} respectively. Their Partnership Deed provides interest on capital @ 6% p.a. and partner salary of ₹${partnerSal.toLocaleString('en-IN')} per month to ${partnerGroupA.p2}. During the year ended 31st March 2026, the firm earned a net profit of ₹${netProf.toLocaleString('en-IN')}. Prepare Profit and Loss Appropriation Account for the year.`,
      orOptionText: `${partnerGroupA.p1} and ${partnerGroupA.p2} are partners sharing profits equally. On 31st March 2026, after closing books, it was discovered that interest on drawings @ 6% p.a. was omitted. Drawings during the year were: ${partnerGroupA.p1} ₹${getRandomChoice([30000, 40000]).toLocaleString('en-IN')} and ${partnerGroupA.p2} ₹${getRandomChoice([20000, 25000]).toLocaleString('en-IN')}. Pass necessary single adjusting journal entry showing working notes clearly.`,
      answerKey: 'P&L Appropriation A/c preparation OR Adjusting journal entry with working notes.'
    });

    questions.push({
      qNum: qCount++,
      typeBadge: '3 Marks Short Answer',
      marks: 3,
      text: `${comp1} purchased running business of ${vendor1} for ₹${purchasePrice.toLocaleString('en-IN')} payable by issuing ${debRate}% Debentures of ₹100 each at a premium of ${debPremium}%. Pass necessary journal entries in the books of ${comp1}.`,
      orOptionText: `Starline Ltd obtained a bank loan of ₹${getRandomChoice([500000, 800000, 1000000]).toLocaleString('en-IN')} from State Bank of India and issued ${getRandomChoice([6000, 10000])}, 9% Debentures of ₹100 each as Collateral Security. Explain how this transaction will be shown in the Balance Sheet and Notes to Accounts under both methods.`,
      answerKey: `Number of debentures = ₹${purchasePrice} / ₹${100 * (1 + debPremium / 100)} = ${debCount}. Entries for purchase and debenture allotment.`
    });

    const deceasedProf = getRandomChoice([120000, 150000, 180000, 210000]);
    questions.push({
      qNum: qCount++,
      typeBadge: '3 Marks Short Answer',
      marks: 3,
      text: `${partnerGroupA.p1}, ${partnerGroupA.p2} and ${partnerGroupA.p3} are partners sharing profits in ${partnerGroupA.r1}:${partnerGroupA.r2}:${partnerGroupA.r3}. Partner ${partnerGroupA.p3} dies on 30th June 2026. Partnership deed provides that deceased partner’s share of profit till death be calculated on basis of last year’s profit of ₹${deceasedProf.toLocaleString('en-IN')}. Calculate ${partnerGroupA.p3}’s share of profit and pass necessary journal entry.`,
      orOptionText: `A firm earned average profits of ₹${getRandomChoice([80000, 95000, 110000]).toLocaleString('en-IN')} during the last five years. Capital employed in the business is ₹${getRandomChoice([600000, 750000, 900000]).toLocaleString('en-IN')} and the normal rate of return on capital is 10%. Calculate the value of goodwill of the firm by:\n(i) Capitalization of Super Profit Method\n(ii) 3 Years' Purchase of Super Profit Method`,
      answerKey: `Profit till death = ₹${deceasedProf} x 3/12 x ${partnerGroupA.r3}/${partnerGroupA.r1 + partnerGroupA.r2 + partnerGroupA.r3}. Journal entry: P&L Suspense A/c Dr. to Deceased Partner Capital A/c.`
    });

    questions.push({
      qNum: qCount++,
      typeBadge: '3 Marks Short Answer',
      marks: 3,
      text: `Differentiate between "Dissolution of Partnership" and "Dissolution of Partnership Firm" on the basis of:\n(i) Court intervention\n(ii) Continuation of economic business\n(iii) Closure of books of accounts`,
      orOptionText: `Explain Section 48 of the Indian Partnership Act, 1932 regarding the settlement of accounts at the time of dissolution of a partnership firm, specifically specifying the order of application of assets and treatment of losses.`,
      answerKey: '(i) Court: Voluntary vs Court order. (ii) Business continues vs terminates. (iii) Books remain open vs closed permanently.'
    });

    const forfShares1 = getRandomChoice([200, 300, 400, 500]);
    const forfReissue1 = Math.round(forfShares1 * getRandomChoice([0.6, 0.75, 0.8]));
    questions.push({
      qNum: qCount++,
      typeBadge: '4 Marks Medium Answer',
      marks: 4,
      text: `Pass necessary journal entries for forfeiture and reissue in the following independent cases:\n(a) Beta Ltd forfeited ${forfShares1} shares of ₹10 each (₹8 called up) for non-payment of first call of ₹2 per share. Out of these, ${forfReissue1} shares were reissued as ₹8 paid up for ₹7 per share.\n(b) Sigma Ltd forfeited ${getRandomChoice([100, 150, 200])} shares of ₹10 each issued at ₹2 premium for non-payment of allotment ₹5 (including premium). Reissued as fully paid for ₹9 per share.`,
      answerKey: 'Entries for share forfeiture, reissue, and transfer of net forfeited balance to Capital Reserve.'
    });

    const crdReal = getRandomChoice([50000, 60000, 75000, 90000]);
    questions.push({
      qNum: qCount++,
      typeBadge: '4 Marks Medium Answer',
      marks: 4,
      text: `Pass journal entries on dissolution of a partnership firm:\n(i) Creditors ₹${crdReal.toLocaleString('en-IN')} accepted stock of book value ₹${Math.round(crdReal * 0.8).toLocaleString('en-IN')} in full settlement of ₹${Math.round(crdReal * 0.75).toLocaleString('en-IN')} and remaining in cash.\n(ii) An unrecorded computer realized ₹${getRandomChoice([5000, 6500, 8000, 9500]).toLocaleString('en-IN')} in cash.\n(iii) Partner ${partnerGroupA.p1} agreed to pay realization expenses of ₹4,000 for an agreed remuneration of ₹6,000.`,
      answerKey: 'Realisation journal entries for assets realization and settlement of liabilities.'
    });

    questions.push({
      qNum: qCount++,
      typeBadge: '6 Marks Long Answer',
      marks: 6,
      text: `${comp1} invited applications for issuing ${sharesCount.toLocaleString('en-IN')} Equity Shares of ₹10 each at a premium of ₹${premiumVal} per share payable: ₹3 on application, ₹${5 + premiumVal - 2} on allotment (including premium ₹${premiumVal}), and balance on call. Applications were received for ${appliedShares.toLocaleString('en-IN')} shares. Pro-rata allotment was made to applicants of ${allottedShares.toLocaleString('en-IN')} shares, remaining rejected. Excess application money was adjusted toward allotment.\nA shareholder holding ${defaulterShares} shares failed to pay allotment and call money. His shares were forfeited and ${reissuedShares} of these shares were reissued as fully paid-up for ₹${reissuePrice} per share. Pass necessary Journal Entries.`,
      orOptionText: `${comp2} invited applications for ${Math.round(sharesCount * 0.8).toLocaleString('en-IN')} equity shares of ₹10 each at par payable: ₹3 on application, ₹4 on allotment, ₹3 on call. Applications were received for ${(sharesCount * 1.2).toLocaleString('en-IN')} shares. Allotment was made pro-rata in 3:2 ratio. Excess application money was adjusted toward allotment. A shareholder allotted 400 shares failed to pay call money. Her shares were forfeited and reissued at ₹8. Pass journal entries.`,
      answerKey: 'Pro-rata allotment table calculations, calls in arrears computation, forfeiture entry, reissue and Capital Reserve transfer.'
    });

    questions.push({
      qNum: qCount++,
      typeBadge: '6 Marks Long Answer',
      marks: 6,
      text: `${partnerGroupB.p1} and ${partnerGroupB.p2} are partners sharing profits in ${partnerGroupB.r1}:${partnerGroupB.r2}. Their Balance Sheet as on 31st March 2026 was as follows:`,
      tableData: `<table class="matrix-table">
  <tr><th>Liabilities</th><th>Amount (₹)</th><th>Assets</th><th>Amount (₹)</th></tr>
  <tr><td>Sundry Creditors</td><td>${partnerGroupB.crd.toLocaleString('en-IN')}</td><td>Cash at Bank</td><td>${bankBalAdm.toLocaleString('en-IN')}</td></tr>
  <tr><td>General Reserve</td><td>${partnerGroupB.res.toLocaleString('en-IN')}</td><td>Sundry Debtors: ${partnerGroupB.deb.toLocaleString('en-IN')}<br/>Less: Provision: (3,000)</td><td>${(partnerGroupB.deb - 3000).toLocaleString('en-IN')}</td></tr>
  <tr><td>Capitals:</td><td></td><td>Stock</td><td>${partnerGroupB.stk.toLocaleString('en-IN')}</td></tr>
  <tr><td>${partnerGroupB.p1}: ${p1CapAdm.toLocaleString('en-IN')}</td><td></td><td>Plant & Machinery</td><td>${partnerGroupB.mch.toLocaleString('en-IN')}</td></tr>
  <tr><td>${partnerGroupB.p2}: ${p2CapAdm.toLocaleString('en-IN')}</td><td>${capitalsSumAdm.toLocaleString('en-IN')}</td><td>Building</td><td>${partnerGroupB.bld.toLocaleString('en-IN')}</td></tr>
  <tr><th>Total</th><th>${totAssetsAdm.toLocaleString('en-IN')}</th><th>Total</th><th>${totAssetsAdm.toLocaleString('en-IN')}</th></tr>
</table>`,
      orOptionText: `On 1st April 2026, they admit ${partnerGroupB.newP} into partnership for ${partnerGroupB.share} share on terms:\n(i) ${partnerGroupB.newP} brings ₹${partnerGroupB.cap.toLocaleString('en-IN')} as capital and ₹${partnerGroupB.gwill.toLocaleString('en-IN')} as premium for goodwill in cash.\n(ii) Building is appreciated by 20% and Machinery is depreciated by 10%.\n(iii) Provision for doubtful debts is increased to 5% on debtors.\nPrepare Revaluation Account and Partners’ Capital Accounts.`,
      answerKey: 'Revaluation Account profit/loss distribution in old ratio, Goodwill distribution in sacrificing ratio, and closing capital balances.'
    });

    const retGoodwill = getRandomChoice([60000, 75000, 90000, 105000]);
    questions.push({
      qNum: qCount++,
      typeBadge: '6 Marks Long Answer',
      marks: 6,
      text: `${partnerGroupA.p1}, ${partnerGroupA.p2} and ${partnerGroupA.p3} were partners sharing in ${partnerGroupA.r1}:${partnerGroupA.r2}:${partnerGroupA.r3}. Partner ${partnerGroupA.p2} retires on 31st March 2026. Balance Sheet showed Capitals: ${partnerGroupA.p1} ₹${partnerGroupA.c1.toLocaleString('en-IN')}; ${partnerGroupA.p2} ₹${partnerGroupA.c2.toLocaleString('en-IN')}; ${partnerGroupA.p3} ₹${partnerGroupA.c3.toLocaleString('en-IN')}; General Reserve ₹40,000. Goodwill of the firm was valued at ₹${retGoodwill.toLocaleString('en-IN')}. Plant was revalued at ₹20,000 higher and Stock was reduced by ₹10,000. Partner ${partnerGroupA.p2} was paid ₹30,000 in cash and the balance transferred to his loan account. Prepare Revaluation Account and Partners’ Capital Accounts.`,
      orOptionText: `A, B and C dissolve their partnership firm. Assets realized ₹4,20,000 (book value ₹4,60,000). Creditors of ₹80,000 settled at 5% discount. Realisation expenses of ₹5,000 paid by firm. Pass necessary realization and capital ledger entries.`,
      answerKey: 'Revaluation Account, Goodwill adjustment in gaining ratio, and Retiring partner loan balance OR Realisation account entries.'
    });

    const debIssueCount = getRandomChoice([4000, 5000, 6000, 8000]);
    const secPremBal = getRandomChoice([50000, 60000, 75000, 90000]);
    questions.push({
      qNum: qCount++,
      typeBadge: '6 Marks Long Answer',
      marks: 6,
      text: `Alpha Limited issued ${debIssueCount.toLocaleString('en-IN')}, 9% Debentures of ₹100 each on 1st April 2025. Pass journal entries for issue of debentures and writing off loss/discount in following independent cases:\n(i) Issued at par redeemable at 5% premium.\n(ii) Issued at 5% discount redeemable at 5% premium.\n(iii) Issued at 10% premium redeemable at 5% premium.\nCompany had a balance of ₹${secPremBal.toLocaleString('en-IN')} in Securities Premium Account.`,
      answerKey: 'Record issue of debentures with Loss on Issue of Debentures and Premium on Redemption, followed by writing off loss.'
    });

    // -------------------------------------------------------------
    // PART B: Q27 to Q34 (Total 20 Marks)
    // -------------------------------------------------------------
    shuffleArray(partB_MCQ_Bank).slice(0, 4).forEach((q, idx) => {
      questions.push({
        qNum: qCount++,
        partTitle: idx === 0 ? 'PART - B: ANALYSIS OF FINANCIAL STATEMENTS (20 MARKS)' : undefined,
        typeBadge: '1 Mark MCQ',
        marks: 1,
        text: q.text,
        options: q.opts,
        answerKey: q.ans
      });
    });

    const revOp = getRandomChoice([1200000, 1500000, 1800000, 2000000]);
    questions.push({
      qNum: qCount++,
      typeBadge: '3 Marks Short Answer',
      marks: 3,
      text: `From the following information, calculate Inventory Turnover Ratio and Trade Receivables Turnover Ratio:\n- Revenue from Operations: ₹${revOp.toLocaleString('en-IN')}\n- Gross Profit: 25% on Cost of Revenue from Operations\n- Opening Inventory: ₹1,60,000; Closing Inventory: ₹2,00,000\n- Net Credit Revenue from Operations: ₹${Math.round(revOp * 0.8).toLocaleString('en-IN')}\n- Opening Trade Receivables: ₹90,000; Closing Trade Receivables: ₹1,10,000`,
      orOptionText: `Under what major headings and sub-headings will the following items appear in the Balance Sheet of a company as per Schedule III, Part I of the Companies Act, 2013:\n(i) Provision for Tax\n(ii) Capital Work-in-Progress\n(iii) Unpaid / Unclaimed Dividend\n(iv) Trademarks and Patents\n(v) Mining Rights\n(vi) Calls in Advance`,
      answerKey: `Cost of Revenue = ₹${revOp} x 100/125. Average inventory = ₹1,80,000. Calculate ratios step by step.`
    });

    const equityCap = getRandomChoice([600000, 800000, 1000000]);
    const debenturesAmt = getRandomChoice([300000, 400000, 500000]);
    questions.push({
      qNum: qCount++,
      typeBadge: '3 Marks Short Answer',
      marks: 3,
      text: `Calculate Debt to Equity Ratio and Proprietary Ratio from the following details:\n- Equity Share Capital: ₹${equityCap.toLocaleString('en-IN')}\n- Preference Share Capital: ₹2,00,000\n- Reserves and Surplus: ₹2,00,000\n- 10% Debentures: ₹${debenturesAmt.toLocaleString('en-IN')}\n- Long-term Bank Loan: ₹2,00,000\n- Current Liabilities: ₹2,00,000\n- Total Non-Current Assets: ₹14,00,000\n- Current Assets: ₹6,00,000`,
      answerKey: `Debt = ₹${debenturesAmt + 200000}. Equity = ₹${equityCap + 400000}. Total Assets = ₹20,00,000. Calculate ratios.`
    });

    const operNetProf = getRandomChoice([360000, 420000, 480000, 540000]);
    const operDep = getRandomChoice([35000, 45000, 55000, 65000]);
    const operTax = getRandomChoice([60000, 75000, 85000, 95000]);
    const operRecInc = getRandomChoice([20000, 30000, 40000, 50000]);
    const operInvDec = getRandomChoice([25000, 35000, 45000, 55000]);
    questions.push({
      qNum: qCount++,
      typeBadge: '4 Marks Medium Answer',
      marks: 4,
      text: `Calculate Cash Flow from Operating Activities from the following Statement of Profit and Loss extracts:\n- Net Profit before Tax: ₹${operNetProf.toLocaleString('en-IN')}\n- Depreciation on Plant: ₹${operDep.toLocaleString('en-IN')}\n- Goodwill amortized: ₹20,000\n- Trade Receivables increased: ₹${operRecInc.toLocaleString('en-IN')}\n- Inventories decreased: ₹${operInvDec.toLocaleString('en-IN')}\n- Income Tax Paid: ₹${operTax.toLocaleString('en-IN')}`,
      answerKey: 'Operating Profit before working capital changes -> Working capital adjustments -> Net cash from operations.'
    });

    const baseLiabOld = 1000000;
    const baseLiabNew = 1400000;
    const shareOld = 600000;
    const shareNew = 750000;
    const debOld = 150000;
    const debNew = 250000;
    const crdOld = 100000;
    const crdNew = 150000;
    const pnlOld = baseLiabOld - shareOld - debOld - crdOld;
    const pnlNew = baseLiabNew - shareNew - debNew - crdNew;

    const plantOld = 600000;
    const plantNew = 800000;
    const invOld = 120000;
    const invNew = 160000;
    const recOld = 90000;
    const recNew = 130000;
    const mktOld = 40000;
    const mktNew = 60000;
    const cashBalOld = baseLiabOld - plantOld - invOld - recOld - mktOld;
    const cashBalNew = baseLiabNew - plantNew - invNew - recNew - mktNew;

    questions.push({
      qNum: qCount++,
      typeBadge: '6 Marks Long Answer',
      marks: 6,
      text: `From the following Balance Sheet of ${comp1} as at 31st March 2025 and 31st March 2026, prepare a Cash Flow Statement as per AS-3 (Revised):`,
      tableData: `<table class="matrix-table">
  <tr><th>Particulars</th><th>31.03.2026 (₹)</th><th>31.03.2025 (₹)</th></tr>
  <tr><th colspan="2" style="text-align:left;">I. EQUITY AND LIABILITIES</th></tr>
  <tr><td>Share Capital</td><td>${shareNew.toLocaleString('en-IN')}</td><td>${shareOld.toLocaleString('en-IN')}</td></tr>
  <tr><td>Surplus (Balance in Statement of P&L)</td><td>${pnlNew.toLocaleString('en-IN')}</td><td>${pnlOld.toLocaleString('en-IN')}</td></tr>
  <tr><td>10% Debentures</td><td>${debNew.toLocaleString('en-IN')}</td><td>${debOld.toLocaleString('en-IN')}</td></tr>
  <tr><td>Trade Payables</td><td>${crdNew.toLocaleString('en-IN')}</td><td>${crdOld.toLocaleString('en-IN')}</td></tr>
  <tr><th>Total Liabilities</th><th>${baseLiabNew.toLocaleString('en-IN')}</th><th>${baseLiabOld.toLocaleString('en-IN')}</th></tr>
  <tr><th colspan="2" style="text-align:left;">II. ASSETS</th></tr>
  <tr><td>Plant & Machinery (Net)</td><td>${plantNew.toLocaleString('en-IN')}</td><td>${plantOld.toLocaleString('en-IN')}</td></tr>
  <tr><td>Current Investments (Marketable)</td><td>${mktNew.toLocaleString('en-IN')}</td><td>${mktOld.toLocaleString('en-IN')}</td></tr>
  <tr><td>Inventories</td><td>${invNew.toLocaleString('en-IN')}</td><td>${invOld.toLocaleString('en-IN')}</td></tr>
  <tr><td>Trade Receivables</td><td>${recNew.toLocaleString('en-IN')}</td><td>${recOld.toLocaleString('en-IN')}</td></tr>
  <tr><td>Cash & Cash Equivalents</td><td>${cashBalNew.toLocaleString('en-IN')}</td><td>${cashBalOld.toLocaleString('en-IN')}</td></tr>
  <tr><th>Total Assets</th><th>${baseLiabNew.toLocaleString('en-IN')}</th><th>${baseLiabOld.toLocaleString('en-IN')}</th></tr>
</table>
<div style="font-size:10pt; margin-top:3pt;">
<b>Additional Information:</b> Depreciation charged on Plant & Machinery was ₹${getRandomChoice([40000, 50000, 60000]).toLocaleString('en-IN')} during the year. Debentures were issued on 31st March 2026.
</div>`,
      answerKey: 'Preparation of Operating, Investing, and Financing cash flows.'
    });

    return {
      questions,
      totalMarks: 80,
      instructions: [
        'This question paper contains 34 questions divided into two Parts – Part A and Part B.',
        'Part A: Accounting for Partnership Firms and Companies (Questions 1 to 26 - 60 Marks).',
        'Part B: Analysis of Financial Statements (Questions 27 to 34 - 20 Marks).',
        'Questions 1 to 16 and 27 to 30 carry 1 mark each.',
        'Questions 17 to 20 and 31 to 32 carry 3 marks each.',
        'Questions 21, 22 and 33 carry 4 marks each.',
        'Questions 23 to 26 and 34 carry 6 marks each.',
        'Internal choices have been provided in questions of 3 marks, 4 marks, and 6 marks.',
        'All calculations must be accompanied by detailed working notes.'
      ]
    };
  }

  // =========================================================================
  // 3. GENERAL SUBJECT FALLBACK
  // =========================================================================
  const subCode = cleanSub.match(/\d+/)?.[0] || '2026';
  const genericQuestions: FullGeneratedQuestion[] = [];
  let cnt = 1;

  for (let i = 1; i <= 20; i++) {
    genericQuestions.push({
      qNum: cnt++,
      typeBadge: '1 Mark MCQ',
      marks: 1,
      text: `Which of the following principles forms the foundation of Unit ${Math.ceil(i / 4)} under the prescribed CBSE curriculum?`,
      options: {
        optA: `Standard statutory formulation for Code ${subCode}`,
        optB: `Secondary operational hypothesis`,
        optC: `Empirical observation limit`,
        optD: `Inverse constraint framework`
      },
      answerKey: '(A) Core standard formulation.'
    });
  }

  for (let i = 1; i <= 6; i++) {
    genericQuestions.push({
      qNum: cnt++,
      typeBadge: '3 Marks Question',
      marks: 3,
      text: `Differentiate between fundamental principles and applied practices in Unit ${i} of ${subjectName} with two illustrative examples.`,
      orOptionText: `Explain the procedural workflow and theoretical justification applicable to Unit ${i} of ${subjectName}.`,
      answerKey: 'Stepwise differentiation supported with real-world examples.'
    });
  }

  for (let i = 1; i <= 4; i++) {
    genericQuestions.push({
      qNum: cnt++,
      typeBadge: '4 Marks Question',
      marks: 4,
      text: `Analyze the key concepts and governing laws associated with Unit ${i} in ${subjectName}. Support your answer with a neat labeled diagram or mathematical derivation.`,
      answerKey: 'Complete stepwise technical explanation with accurate labelling and working.'
    });
  }

  for (let i = 1; i <= 4; i++) {
    genericQuestions.push({
      qNum: cnt++,
      typeBadge: '6 Marks Long Answer',
      marks: 6,
      text: `COMPREHENSIVE CASE STUDY - ${subjectName}:\nAnalyze the practical scenario involving parameter variations in Unit ${i}. Calculate the resultant values, evaluate system constraints, and outline remedial measures.`,
      orOptionText: `Elaborate upon the statutory and analytical guidelines prescribed for Unit ${i} in ${subjectName} with detailed stepwise working notes.`,
      answerKey: 'Comprehensive evaluation covering working steps, final numerical calculations, and analytical justification.'
    });
  }

  return {
    questions: genericQuestions,
    totalMarks: 70,
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
