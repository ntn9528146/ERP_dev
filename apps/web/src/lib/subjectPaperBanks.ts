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
  // 1. ACCOUNTANCY (CODE 055) - STRICT CBSE 34 QUESTIONS WITH SEPARATE PART A & B
  // =========================================================================
  if (cleanSub.includes('055') || cleanSub.includes('accountancy')) {
    // Dynamic Company Pool
    const comp1 = getRandomChoice([
      'Zenith Technologies Ltd', 'Vanguard Solar Power Ltd', 'Apex Infrastructure Ltd',
      'Bharat Global Motors Ltd', 'Reliance Logistics Ltd', 'Tata Green Energy Ltd',
      'Aditya Consumer Goods Ltd', 'Hindustan Heavy Metals Ltd'
    ]);
    const comp2 = getRandomChoice(['Crown Industries Ltd', 'Sterling Steel Ltd', 'Nova Pharma Ltd', 'Jupiter Textiles Ltd']);
    const vendor1 = getRandomChoice(['Sun Solar Systems', 'Modern Machines Ltd', 'Precision Engineering Works', 'Kaveri Industrial Equipment']);
    
    // Dynamic Share Capital Parameters
    const shareCount = getRandomChoice([40000, 50000, 60000, 80000, 100000, 120000]);
    const oversubRatio = getRandomChoice(['3:2', '4:3', '5:4', '1.5x']);
    const appliedShares = Math.round(shareCount * getRandomChoice([1.25, 1.4, 1.5, 1.6]));
    const allottedProRata = Math.round(shareCount * 1.2);
    const premiumVal = getRandomChoice([2, 3, 4, 5]);
    const defaulterShares = getRandomChoice([400, 500, 600, 800, 1000]);
    const reissuedShares = Math.round(defaulterShares * getRandomChoice([0.6, 0.75, 0.8, 1.0]));
    const reissuePrice = getRandomChoice([7, 8, 9]);

    // Dynamic Partners Sets (Unique Scenarios)
    const pSetA = getRandomChoice([
      { p1: 'Aarav', p2: 'Bhavna', p3: 'Chetan', r1: 3, r2: 2, r3: 1, c1: 300000, c2: 200000, c3: 100000 },
      { p1: 'Rohit', p2: 'Kavita', p3: 'Deepak', r1: 5, r2: 3, r3: 2, c1: 500000, c2: 300000, c3: 200000 },
      { p1: 'Varun', p2: 'Tarun', p3: 'Karan', r1: 4, r2: 3, r3: 1, c1: 400000, c2: 300000, c3: 100000 },
      { p1: 'Mohit', p2: 'Shobhit', p3: 'Ankit', r1: 2, r2: 2, r3: 1, c1: 250000, c2: 250000, c3: 150000 }
    ]);

    const pSetB = getRandomChoice([
      { p1: 'Madhav', p2: 'Raghav', newP: 'Keshav', r1: 3, r2: 2, share: '1/5', cap: 80000, gwill: 30000, bld: 120000, mch: 80000, deb: 60000, stk: 50000, crd: 40000, res: 30000 },
      { p1: 'Sanjay', p2: 'Vijay', newP: 'Ajay', r1: 2, r2: 1, share: '1/4', cap: 100000, gwill: 40000, bld: 150000, mch: 100000, deb: 80000, stk: 60000, crd: 50000, res: 40000 },
      { p1: 'Pradeep', p2: 'Kuldeep', newP: 'Sandeep', r1: 3, r2: 1, share: '1/5', cap: 75000, gwill: 25000, bld: 140000, mch: 90000, deb: 70000, stk: 45000, crd: 35000, res: 25000 }
    ]);
    const totLiabAdm = pSetB.crd + pSetB.res + (pSetB.bld + pSetB.mch + pSetB.deb + pSetB.stk - pSetB.crd - pSetB.res);

    // Dynamic Debentures Vendor
    const debRate = getRandomChoice([8, 9, 10, 12]);
    const purchasePrice = getRandomChoice([330000, 440000, 550000, 660000, 770000]);
    const debPremium = getRandomChoice([10, 20]);
    const debCount = Math.round(purchasePrice / (100 * (1 + debPremium / 100)));

    // -----------------------------------------------------------------------
    // PART A MCQs POOL (Strictly Partnership & Companies: 16 Required)
    // -----------------------------------------------------------------------
    const partA_MCQ_Pool = [
      { text: `In the absence of a Partnership Deed, interest on loan advanced by partner ${pSetA.p1} to the firm is payable at:`, opts: { optA: '6% p.a.', optB: '10% p.a.', optC: '12% p.a.', optD: 'Zero / Nil' }, ans: '(A) 6% p.a. as per Section 13(d) of Indian Partnership Act.' },
      { text: `At the time of admission of ${pSetB.newP}, general reserve of ₹${pSetB.res.toLocaleString('en-IN')} appearing in the balance sheet is transferred to:`, opts: { optA: 'Old Partners’ Capital Accounts in Old Ratio', optB: 'All Partners in New Ratio', optC: 'Revaluation Account', optD: 'Sacrificing Ratio' }, ans: '(A) Old Partners in Old Ratio.' },
      { text: `A company forfeited 100 shares of ₹10 each on which ₹${getRandomChoice([6, 7, 8])} was received. What is the maximum discount allowed on reissue of these shares?`, opts: { optA: 'Amount received on forfeiture', optB: 'Face value of shares', optC: 'Uncalled amount', optD: 'Statutory 5% limit' }, ans: '(A) Maximum discount allowed equals the amount forfeited per share.' },
      { text: 'Securities Premium Account can be utilized for which of the following purposes as per Section 52(2) of the Companies Act, 2013?', opts: { optA: 'Issuing fully paid bonus shares to members', optB: 'Distribution of dividends', optC: 'Paying trade creditors', optD: 'Writing off general reserve' }, ans: '(A) Issuing fully paid bonus shares.' },
      { text: 'Gaining Ratio is computed by applying which formula?', opts: { optA: 'New Ratio - Old Ratio', optB: 'Old Ratio - New Ratio', optC: 'Old Ratio - Sacrificing Ratio', optD: 'New Ratio + Old Ratio' }, ans: '(A) New Ratio - Old Ratio.' },
      { text: `If partner ${pSetA.p2} withdraws ₹${getRandomChoice([5000, 8000, 10000]).toLocaleString('en-IN')} at the beginning of each calendar month, interest on drawings will be calculated for:`, opts: { optA: '6.5 Months', optB: '6.0 Months', optC: '5.5 Months', optD: '7.0 Months' }, ans: '(A) 6.5 Months.' },
      { text: `If partner ${pSetA.p1} withdraws ₹${getRandomChoice([4000, 6000, 9000]).toLocaleString('en-IN')} at the end of each calendar month, interest on drawings will be calculated for:`, opts: { optA: '5.5 Months', optB: '6.0 Months', optC: '6.5 Months', optD: '7.0 Months' }, ans: '(A) 5.5 Months.' },
      { text: `On dissolution of firm, an unrecorded computer realized ₹${getRandomChoice([12000, 15000, 18000]).toLocaleString('en-IN')} in cash. In which account and on which side will it be recorded?`, opts: { optA: 'Credit side of Realisation Account', optB: 'Debit side of Realisation Account', optC: 'Credit side of Partners’ Capital Account', optD: 'Debit side of Cash Account only' }, ans: '(A) Credit side of Realisation Account.' },
      { text: 'When debentures are issued as Collateral Security for a secured bank loan, the entry passed in books is:', opts: { optA: 'Debit Debenture Suspense A/c and Credit Debentures A/c', optB: 'Debit Bank A/c and Credit Debentures A/c', optC: 'Debit Bank Loan A/c and Credit Debenture Suspense A/c', optD: 'No entry required in journal' }, ans: '(A) Debenture Suspense A/c Dr. to Debentures A/c.' },
      { text: 'Capital Reserve is created out of which of the following categories of profit?', opts: { optA: 'Capital Profits (Profit on reissue of forfeited shares / sale of fixed assets)', optB: 'Normal operating profits', optC: 'Gross Profit from operations', optD: 'Dividend Equalization Reserve' }, ans: '(A) Capital Profits.' },
      { text: 'Realisation Account prepared at the time of dissolution of a firm is in the nature of:', opts: { optA: 'Nominal Account', optB: 'Personal Account', optC: 'Real Account', optD: 'Representative Personal Account' }, ans: '(A) Nominal Account.' },
      { text: `A firm has capital employed ₹${getRandomChoice([400000, 500000, 600000]).toLocaleString('en-IN')}. Normal rate of return is 10%. Average profit earned is ₹${getRandomChoice([65000, 75000, 85000]).toLocaleString('en-IN')}. Super profit will be:`, opts: { optA: 'Average Profit - Normal Profit', optB: 'Average Profit + Normal Profit', optC: 'Capital Employed / 10%', optD: 'Normal Profit - Average Profit' }, ans: '(A) Super Profit = Average Profit - Normal Profit.' },
      { text: 'Calls in Arrears is deducted from which item in the Notes to Accounts of Balance Sheet?', opts: { optA: 'Subscribed but not fully paid-up capital', optB: 'Authorized Share Capital', optC: 'Issued Share Capital', optD: 'Securities Premium Reserve' }, ans: '(A) Subscribed but not fully paid-up capital.' },
      { text: 'On dissolution of firm, unrecorded liability paid off by partner out of personal funds is credited to:', opts: { optA: 'Concerned Partner’s Capital Account', optB: 'Realisation Account', optC: 'Cash Account', optD: 'Revaluation Account' }, ans: '(A) Concerned Partner’s Capital Account.' },
      { text: 'Assertion (A): Fixed Capital accounts of partners always show a credit balance.\nReason (R): All adjustments regarding drawings, interest, and share of profit are routed through Partners’ Current Accounts.', opts: { optA: 'Both (A) and (R) are true and (R) is correct explanation for (A).', optB: 'Both (A) and (R) are true but (R) is not correct explanation.', optC: '(A) is true, but (R) is false.', optD: '(A) is false, but (R) is true.' }, ans: '(A) Both are true and (R) explains (A).' },
      { text: 'At the time of forfeiture of shares, Share Capital Account is debited with:', opts: { optA: 'Called-up amount on forfeited shares', optB: 'Face value of forfeited shares', optC: 'Paid-up amount on forfeited shares', optD: 'Uncalled amount on forfeited shares' }, ans: '(A) Called-up amount.' },
      { text: `When partner ${pSetA.p3} retires, his share of goodwill is credited to his capital account and debited to continuing partners in their:`, opts: { optA: 'Gaining Ratio', optB: 'Sacrificing Ratio', optC: 'Old Profit Sharing Ratio', optD: 'Capital Ratio' }, ans: '(A) Gaining Ratio.' },
      { text: 'Sacrificing Ratio is used to distribute which of the following items at the time of admission of a partner?', opts: { optA: 'Premium for Goodwill brought by new partner', optB: 'Revaluation Profit', optC: 'General Reserve', optD: 'Accumulated Losses' }, ans: '(A) Premium for Goodwill.' },
      { text: 'Discount on issue of debentures is written off within the tenure of debentures out of:', opts: { optA: 'Securities Premium Reserve / Statement of P&L', optB: 'General Reserve only', optC: 'Capital Redemption Reserve', optD: 'Debenture Redemption Reserve' }, ans: '(A) Securities Premium Reserve or Statement of P&L.' },
      { text: `A, B and C share profits in 3:2:1. If D is admitted for 1/6th share which he acquires entirely from A, new sacrificing ratio of A, B, C is:`, opts: { optA: '1:0:0', optB: '3:2:1', optC: '1:1:1', optD: '0:1:0' }, ans: '(A) 1:0:0 (only A sacrifices).' }
    ];

    // -----------------------------------------------------------------------
    // PART B MCQs POOL (Strictly Financial Statements, Ratios, Cash Flow: 4 Required)
    // -----------------------------------------------------------------------
    const partB_MCQ_Pool = [
      { text: `An enterprise has Current Assets ₹${getRandomChoice([600000, 800000, 1000000]).toLocaleString('en-IN')} and Current Liabilities ₹${getRandomChoice([300000, 400000, 500000]).toLocaleString('en-IN')}. Payment of ₹50,000 to trade payables will:`, opts: { optA: 'Improve Current Ratio', optB: 'Reduce Current Ratio', optC: 'Not change Current Ratio', optD: 'Make Current Ratio zero' }, ans: '(A) Improve Current Ratio.' },
      { text: 'Which financial ratio measures the proportion of total assets funded through shareholders’ funds?', opts: { optA: 'Proprietary Ratio', optB: 'Debt to Equity Ratio', optC: 'Interest Coverage Ratio', optD: 'Total Assets to Debt Ratio' }, ans: '(A) Proprietary Ratio = Shareholders Funds / Total Assets.' },
      { text: 'Cash outflow on purchase of patent rights is categorized under which cash flow activity (AS-3)?', opts: { optA: 'Investing Activities', optB: 'Operating Activities', optC: 'Financing Activities', optD: 'Cash and Cash Equivalents' }, ans: '(A) Investing Activities.' },
      { text: 'Dividend received on investments by a manufacturing company is shown in Cash Flow Statement as:', opts: { optA: 'Inflow under Investing Activities', optB: 'Inflow under Operating Activities', optC: 'Inflow under Financing Activities', optD: 'Deduction from net profit' }, ans: '(A) Inflow under Investing Activities.' },
      { text: 'Which of the following is considered a Cash Equivalent according to AS-3 (Revised)?', opts: { optA: 'Treasury Bills with maturity of 90 days or less', optB: 'Shares held in private limited companies', optC: 'Trade Debtors', optD: 'Long-term Bank Deposits' }, ans: '(A) Treasury Bills with short maturity.' },
      { text: `Operating Ratio of a firm is ${getRandomChoice([75, 80, 82, 85])}%. What will be the Operating Profit Ratio of the enterprise?`, opts: { optA: `${100 - 80}% approx`, optB: '100%', optC: '50%', optD: 'Zero' }, ans: '(A) Operating Profit Ratio = 100% - Operating Ratio.' },
      { text: 'Which of the following is an Activity (Turnover) Ratio?', opts: { optA: 'Trade Receivables Turnover Ratio', optB: 'Current Ratio', optC: 'Debt-Equity Ratio', optD: 'Gross Profit Ratio' }, ans: '(A) Trade Receivables Turnover Ratio.' },
      { text: 'Increase in the amount of Outstanding Expenses during the accounting year results in:', opts: { optA: 'Addition to operating profit before working capital changes', optB: 'Deduction from operating profit', optC: 'Cash outflow from financing', optD: 'No cash flow impact' }, ans: '(A) Cash inflow adjustment under Operating Activities.' }
    ];

    const questions: FullGeneratedQuestion[] = [];
    let qCount = 1;

    // -----------------------------------------------------------------------
    // PART A: QUESTIONS 1 TO 26 (TOTAL 60 MARKS)
    // -----------------------------------------------------------------------
    // Q1 to Q16: 16 MCQs (Partnership & Companies only)
    shuffleArray(partA_MCQ_Pool).slice(0, 16).forEach((q, idx) => {
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

    // Q17 to Q20: 4 Questions x 3 Marks (12 Marks)
    const netProf1 = getRandomChoice([60000, 75000, 90000, 120000]);
    const sal1 = getRandomChoice([1500, 2000, 2500]);
    questions.push({
      qNum: qCount++,
      typeBadge: '3 Marks Short Answer',
      marks: 3,
      text: `${pSetA.p1}, ${pSetA.p2} and ${pSetA.p3} are partners sharing profits in ${pSetA.r1}:${pSetA.r2}:${pSetA.r3} with capitals ₹${pSetA.c1.toLocaleString('en-IN')}, ₹${pSetA.c2.toLocaleString('en-IN')} and ₹${pSetA.c3.toLocaleString('en-IN')} respectively. Their Partnership Deed provides interest on capital @ 6% p.a. and partner salary of ₹${sal1.toLocaleString('en-IN')} per month to ${pSetA.p2}. During the year ended 31st March 2026, the firm earned a net profit of ₹${netProf1.toLocaleString('en-IN')}. Prepare Profit and Loss Appropriation Account for the year.`,
      orOptionText: `${pSetA.p1} and ${pSetA.p2} are partners sharing profits equally. On 31st March 2026, after closing books, it was discovered that interest on drawings @ 6% p.a. was omitted. Drawings during the year were: ${pSetA.p1} ₹${getRandomChoice([30000, 40000]).toLocaleString('en-IN')} and ${pSetA.p2} ₹${getRandomChoice([20000, 25000]).toLocaleString('en-IN')}. Pass necessary single adjusting journal entry showing working notes clearly.`,
      answerKey: 'Preparation of P&L Appropriation A/c with capital interest and salary OR Capital adjustment schedule and single adjusting journal entry.'
    });

    questions.push({
      qNum: qCount++,
      typeBadge: '3 Marks Short Answer',
      marks: 3,
      text: `${comp1} purchased running business of ${vendor1} for ₹${purchasePrice.toLocaleString('en-IN')} payable by issuing ${debRate}% Debentures of ₹100 each at a premium of ${debPremium}%. Pass necessary journal entries in the books of ${comp1}.`,
      orOptionText: `Starline Ltd issued ${getRandomChoice([3000, 4000, 5000])}, ${debRate}% Debentures of ₹100 each at a discount of 5% redeemable at a premium of 5% after 5 years. Pass journal entries for issue of debentures.`,
      answerKey: `Number of debentures issued = ₹${purchasePrice} / ₹${100 * (1 + debPremium / 100)} = ${debCount}. Journal entries for business purchase and debenture allotment.`
    });

    const lastYrProf = getRandomChoice([140000, 160000, 180000, 200000]);
    questions.push({
      qNum: qCount++,
      typeBadge: '3 Marks Short Answer',
      marks: 3,
      text: `${pSetA.p1}, ${pSetA.p2} and ${pSetA.p3} are partners sharing profits in ${pSetA.r1}:${pSetA.r2}:${pSetA.r3}. Partner ${pSetA.p3} dies on 30th June 2026. Partnership deed provides that deceased partner’s share of profit till death be calculated on basis of last year’s profit of ₹${lastYrProf.toLocaleString('en-IN')}. Calculate ${pSetA.p3}’s share of profit and pass necessary journal entry.`,
      orOptionText: `Differentiate between "Dissolution of Partnership" and "Dissolution of Partnership Firm" on the basis of:\n(i) Court intervention\n(ii) Continuation of business\n(iii) Closure of books of accounts`,
      answerKey: `Profit till death = ₹${lastYrProf} x 3/12 x ${pSetA.r3}/${pSetA.r1 + pSetA.r2 + pSetA.r3}. Journal entry: Profit & Loss Suspense A/c Dr. to Deceased Partner Capital A/c.`
    });

    questions.push({
      qNum: qCount++,
      typeBadge: '3 Marks Short Answer',
      marks: 3,
      text: `A firm earned average profits of ₹${getRandomChoice([80000, 90000, 100000]).toLocaleString('en-IN')} during the last five years. Capital employed in the business is ₹${getRandomChoice([600000, 700000, 800000]).toLocaleString('en-IN')} and the normal rate of return on capital is 10%. Calculate the value of goodwill of the firm by:\n(i) Capitalization of Super Profit Method\n(ii) 3 Years' Purchase of Super Profit Method`,
      answerKey: 'Normal Profit = Capital Employed x 10%. Super Profit = Average Profit - Normal Profit. Compute goodwill under both methods.'
    });

    // Q21 to Q22: 2 Questions x 4 Marks (8 Marks)
    questions.push({
      qNum: qCount++,
      typeBadge: '4 Marks Medium Answer',
      marks: 4,
      text: `Pass necessary journal entries for forfeiture and reissue in the following independent cases:\n(a) Beta Ltd forfeited ${getRandomChoice([200, 300, 400])} shares of ₹10 each (₹8 called up) for non-payment of first call of ₹2 per share. Out of these, ${getRandomChoice([150, 200, 250])} shares were reissued as ₹8 paid up for ₹7 per share.\n(b) Sigma Ltd forfeited ${getRandomChoice([100, 150, 200])} shares of ₹10 each issued at ₹2 premium for non-payment of allotment ₹5 (including premium). Reissued as fully paid for ₹9.`,
      answerKey: 'Entries for share forfeiture, reissue, and transfer of forfeited balance to Capital Reserve.'
    });

    questions.push({
      qNum: qCount++,
      typeBadge: '4 Marks Medium Answer',
      marks: 4,
      text: `Pass journal entries on dissolution of firm:\n(i) Creditors ₹${getRandomChoice([50000, 60000, 70000]).toLocaleString('en-IN')} accepted stock of book value ₹${getRandomChoice([40000, 45000]).toLocaleString('en-IN')} in full settlement of ₹42,000 and remaining in cash.\n(ii) An unrecorded computer realized ₹${getRandomChoice([5000, 6500, 8000]).toLocaleString('en-IN')}.\n(iii) Partner ${pSetA.p1} agreed to pay realization expenses of ₹4,000 for an agreed remuneration of ₹6,000.`,
      answerKey: 'Realisation journal entries for assets realization and settlement of liabilities.'
    });

    // Q23 to Q26: 4 Questions x 6 Marks (24 Marks)
    questions.push({
      qNum: qCount++,
      typeBadge: '6 Marks Long Answer',
      marks: 6,
      text: `${comp1} invited applications for issuing ${shareCount.toLocaleString('en-IN')} Equity Shares of ₹10 each at a premium of ₹${premiumVal} per share payable: ₹3 on application, ₹${5 + premiumVal - 2} on allotment (including premium ₹${premiumVal}), and balance on call. Applications were received for ${appliedShares.toLocaleString('en-IN')} shares. Pro-rata allotment was made to applicants of ${allottedProRata.toLocaleString('en-IN')} shares, remaining rejected. Excess application money was adjusted toward allotment.\nA shareholder holding ${defaulterShares} shares failed to pay allotment and call money. His shares were forfeited and ${reissuedShares} of these shares were reissued as fully paid-up for ₹${reissuePrice} per share. Pass necessary Journal Entries.`,
      orOptionText: `${comp2} invited applications for ${Math.round(shareCount * 0.8).toLocaleString('en-IN')} equity shares of ₹10 each at par payable: ₹3 on application, ₹4 on allotment, ₹3 on call. Applications were received for ${(shareCount * 1.2).toLocaleString('en-IN')} shares. Allotment was made pro-rata in 3:2 ratio. Excess application money was adjusted toward allotment. A shareholder allotted 400 shares failed to pay call money. Her shares were forfeited and reissued at ₹8. Pass journal entries.`,
      answerKey: 'Pro-rata allotment table calculations, calls in arrears computation, forfeiture entry, reissue and Capital Reserve transfer.'
    });

    questions.push({
      qNum: qCount++,
      typeBadge: '6 Marks Long Answer',
      marks: 6,
      text: `${pSetB.p1} and ${pSetB.p2} are partners sharing profits in ${pSetB.r1}:${pSetB.r2}. Their Balance Sheet as on 31st March 2026 was as follows:`,
      tableData: `<table class="matrix-table">
  <tr><th>Liabilities</th><th>Amount (₹)</th><th>Assets</th><th>Amount (₹)</th></tr>
  <tr><td>Sundry Creditors</td><td>${pSetB.crd.toLocaleString('en-IN')}</td><td>Cash at Bank</td><td>${(totLiabAdm - pSetB.bld - pSetB.mch - pSetB.deb - pSetB.stk + 3000).toLocaleString('en-IN')}</td></tr>
  <tr><td>General Reserve</td><td>${pSetB.res.toLocaleString('en-IN')}</td><td>Sundry Debtors: ${pSetB.deb.toLocaleString('en-IN')}<br/>Less: Provision: (3,000)</td><td>${(pSetB.deb - 3000).toLocaleString('en-IN')}</td></tr>
  <tr><td>Capitals:</td><td></td><td>Stock</td><td>${pSetB.stk.toLocaleString('en-IN')}</td></tr>
  <tr><td>${pSetB.p1}: ${Math.round((totLiabAdm - pSetB.crd - pSetB.res) * (pSetB.r1 / (pSetB.r1 + pSetB.r2))).toLocaleString('en-IN')}</td><td></td><td>Plant & Machinery</td><td>${pSetB.mch.toLocaleString('en-IN')}</td></tr>
  <tr><td>${pSetB.p2}: ${Math.round((totLiabAdm - pSetB.crd - pSetB.res) * (pSetB.r2 / (pSetB.r1 + pSetB.r2))).toLocaleString('en-IN')}</td><td>${(totLiabAdm - pSetB.crd - pSetB.res).toLocaleString('en-IN')}</td><td>Building</td><td>${pSetB.bld.toLocaleString('en-IN')}</td></tr>
  <tr><th>Total</th><th>${totLiabAdm.toLocaleString('en-IN')}</th><th>Total</th><th>${totLiabAdm.toLocaleString('en-IN')}</th></tr>
</table>`,
      orOptionText: `On 1st April 2026, they admit ${pSetB.newP} into partnership for ${pSetB.share} share on terms:\n(i) ${pSetB.newP} brings ₹${pSetB.cap.toLocaleString('en-IN')} as capital and ₹${pSetB.gwill.toLocaleString('en-IN')} as premium for goodwill in cash.\n(ii) Building is appreciated by 20% and Machinery is depreciated by 10%.\n(iii) Provision for doubtful debts is increased to 5% on debtors.\nPrepare Revaluation Account and Partners’ Capital Accounts.`,
      answerKey: 'Revaluation Account profit/loss distribution in old ratio, Goodwill distribution in sacrificing ratio, and closing capital balances.'
    });

    questions.push({
      qNum: qCount++,
      typeBadge: '6 Marks Long Answer',
      marks: 6,
      text: `${pSetA.p1}, ${pSetA.p2} and ${pSetA.p3} were partners sharing in ${pSetA.r1}:${pSetA.r2}:${pSetA.r3}. Partner ${pSetA.p2} retires on 31st March 2026. Balance Sheet showed Capitals: ${pSetA.p1} ₹${pSetA.c1.toLocaleString('en-IN')}; ${pSetA.p2} ₹${pSetA.c2.toLocaleString('en-IN')}; ${pSetA.p3} ₹${pSetA.c3.toLocaleString('en-IN')}; General Reserve ₹40,000. Goodwill of the firm was valued at ₹${getRandomChoice([60000, 80000, 90000]).toLocaleString('en-IN')}. Plant was revalued at ₹20,000 higher and Stock was reduced by ₹10,000. Partner ${pSetA.p2} was paid ₹30,000 in cash and the balance transferred to his loan account. Prepare Revaluation Account and Partners’ Capital Accounts.`,
      orOptionText: `A, B and C dissolve their partnership firm. Assets realized ₹4,20,000 (book value ₹4,60,000). Creditors of ₹80,000 settled at 5% discount. Realisation expenses of ₹5,000 paid by firm. Pass necessary realization and capital ledger entries.`,
      answerKey: 'Revaluation Account, Goodwill adjustment in gaining ratio, and Retiring partner loan balance OR Realisation account entries.'
    });

    questions.push({
      qNum: qCount++,
      typeBadge: '6 Marks Long Answer',
      marks: 6,
      text: `Alpha Limited issued ${getRandomChoice([5000, 6000, 8000])}, 9% Debentures of ₹100 each on 1st April 2025. Pass journal entries for issue of debentures and writing off loss/discount in following independent cases:\n(i) Issued at par redeemable at 5% premium.\n(ii) Issued at 5% discount redeemable at 5% premium.\n(iii) Issued at 10% premium redeemable at 5% premium.\nCompany had a balance of ₹${getRandomChoice([60000, 75000, 90000]).toLocaleString('en-IN')} in Securities Premium Account.`,
      answerKey: 'Record issue of debentures with Loss on Issue of Debentures and Premium on Redemption, followed by writing off loss.'
    });

    // -----------------------------------------------------------------------
    // PART B: QUESTIONS 27 TO 34 (TOTAL 20 MARKS)
    // -----------------------------------------------------------------------
    // Q27 to Q30: 4 MCQs (Strictly Ratios & Cash Flow) = 4 Marks
    shuffleArray(partB_MCQ_Pool).slice(0, 4).forEach((q, idx) => {
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

    // Q31: 1 Question x 3 Marks = 3 Marks
    const revFromOp = getRandomChoice([1200000, 1500000, 1800000]);
    questions.push({
      qNum: qCount++,
      typeBadge: '3 Marks Short Answer',
      marks: 3,
      text: `From the following information, calculate Inventory Turnover Ratio and Trade Receivables Turnover Ratio:\n- Revenue from Operations: ₹${revFromOp.toLocaleString('en-IN')}\n- Gross Profit: 25% on Cost of Revenue from Operations\n- Opening Inventory: ₹1,60,000; Closing Inventory: ₹2,00,000\n- Net Credit Revenue from Operations: ₹${(revFromOp * 0.8).toLocaleString('en-IN')}\n- Opening Trade Receivables: ₹90,000; Closing Trade Receivables: ₹1,10,000`,
      orOptionText: `Under what major headings and sub-headings will the following items appear in the Balance Sheet of a company as per Schedule III, Part I of the Companies Act, 2013:\n(i) Provision for Tax\n(ii) Capital Work-in-Progress\n(iii) Unpaid / Unclaimed Dividend\n(iv) Trademarks and Patents\n(v) Mining Rights\n(vi) Calls in Advance`,
      answerKey: `Cost of Revenue = ₹${revFromOp} x 100/125. Average inventory = ₹1,80,000. Calculate ratios step by step.`
    });

    // Q32: 1 Question x 3 Marks (or 4 Marks)
    const eqCap = getRandomChoice([600000, 800000, 1000000]);
    const debAmt = getRandomChoice([300000, 400000, 500000]);
    questions.push({
      qNum: qCount++,
      typeBadge: '3 Marks Short Answer',
      marks: 3,
      text: `Calculate Debt to Equity Ratio and Proprietary Ratio from the following details:\n- Equity Share Capital: ₹${eqCap.toLocaleString('en-IN')}\n- Preference Share Capital: ₹2,00,000\n- Reserves and Surplus: ₹2,00,000\n- 10% Debentures: ₹${debAmt.toLocaleString('en-IN')}\n- Long-term Bank Loan: ₹2,00,000\n- Current Liabilities: ₹2,00,000\n- Total Non-Current Assets: ₹14,00,000\n- Current Assets: ₹6,00,000`,
      answerKey: `Debt = ₹${debAmt + 200000}. Equity = ₹${eqCap + 400000}. Total Assets = ₹20,00,000. Calculate ratios.`
    });

    // Q33: 1 Question x 4 Marks = 4 Marks (Operating Cash Flow)
    const cfProfit = getRandomChoice([350000, 420000, 480000, 540000]);
    const cfDep = getRandomChoice([40000, 50000, 60000]);
    const cfTax = getRandomChoice([60000, 70000, 80000]);
    const cfRecInc = getRandomChoice([20000, 30000, 45000]);
    const cfInvDec = getRandomChoice([25000, 35000, 40000]);
    questions.push({
      qNum: qCount++,
      typeBadge: '4 Marks Medium Answer',
      marks: 4,
      text: `Calculate Cash Flow from Operating Activities from the following Statement of Profit and Loss extracts:\n- Net Profit before Tax: ₹${cfProfit.toLocaleString('en-IN')}\n- Depreciation on Plant: ₹${cfDep.toLocaleString('en-IN')}\n- Goodwill amortized: ₹20,000\n- Trade Receivables increased: ₹${cfRecInc.toLocaleString('en-IN')}\n- Inventories decreased: ₹${cfInvDec.toLocaleString('en-IN')}\n- Income Tax Paid: ₹${cfTax.toLocaleString('en-IN')}`,
      answerKey: 'Operating Profit before working capital changes -> Working capital adjustments -> Net cash from operations.'
    });

    // Q34: 1 Question x 6 Marks = 6 Marks (Full Cash Flow Statement with Mathematically Balanced Assets)
    const cfPlantNet = getRandomChoice([700000, 800000, 900000]);
    const cfPlantOld = cfPlantNet - getRandomChoice([150000, 200000]);
    const cfDebNew = getRandomChoice([200000, 250000]);
    const cfDebOld = cfDebNew - getRandomChoice([80000, 100000]);
    const shareCapNew = getRandomChoice([700000, 800000]);
    const shareCapOld = shareCapNew - 150000;
    const surplusNew = 250000;
    const surplusOld = 150000;
    const crdNew = 120000;
    const crdOld = 90000;

    const totLiabNew = shareCapNew + surplusNew + cfDebNew + crdNew;
    const totLiabOld = shareCapOld + surplusOld + cfDebOld + crdOld;

    const invNetNew = 150000;
    const invNetOld = 110000;
    const recNetNew = 120000;
    const recNetOld = 80000;
    const mktNew = 50000;
    const mktOld = 40000;

    const cashNew = totLiabNew - cfPlantNet - invNetNew - recNetNew - mktNew;
    const cashOld = totLiabOld - cfPlantOld - invNetOld - recNetOld - mktOld;

    questions.push({
      qNum: qCount++,
      typeBadge: '6 Marks Long Answer',
      marks: 6,
      text: `From the following Balance Sheet of ${comp1} as at 31st March 2025 and 31st March 2026, prepare a Cash Flow Statement as per AS-3 (Revised):`,
      tableData: `<table class="matrix-table">
  <tr><th>Particulars</th><th>31.03.2026 (₹)</th><th>31.03.2025 (₹)</th></tr>
  <tr><th colspan="2" style="text-align:left;">I. EQUITY AND LIABILITIES</th></tr>
  <tr><td>Share Capital</td><td>${shareCapNew.toLocaleString('en-IN')}</td><td>${shareCapOld.toLocaleString('en-IN')}</td></tr>
  <tr><td>Surplus (Balance in Statement of P&L)</td><td>${surplusNew.toLocaleString('en-IN')}</td><td>${surplusOld.toLocaleString('en-IN')}</td></tr>
  <tr><td>10% Debentures</td><td>${cfDebNew.toLocaleString('en-IN')}</td><td>${cfDebOld.toLocaleString('en-IN')}</td></tr>
  <tr><td>Trade Payables</td><td>${crdNew.toLocaleString('en-IN')}</td><td>${crdOld.toLocaleString('en-IN')}</td></tr>
  <tr><th>Total Liabilities</th><th>${totLiabNew.toLocaleString('en-IN')}</th><th>${totLiabOld.toLocaleString('en-IN')}</th></tr>
  <tr><th colspan="2" style="text-align:left;">II. ASSETS</th></tr>
  <tr><td>Plant & Machinery (Net)</td><td>${cfPlantNet.toLocaleString('en-IN')}</td><td>${cfPlantOld.toLocaleString('en-IN')}</td></tr>
  <tr><td>Current Investments (Marketable)</td><td>${mktNew.toLocaleString('en-IN')}</td><td>${mktOld.toLocaleString('en-IN')}</td></tr>
  <tr><td>Inventories</td><td>${invNetNew.toLocaleString('en-IN')}</td><td>${invNetOld.toLocaleString('en-IN')}</td></tr>
  <tr><td>Trade Receivables</td><td>${recNetNew.toLocaleString('en-IN')}</td><td>${recNetOld.toLocaleString('en-IN')}</td></tr>
  <tr><td>Cash & Cash Equivalents</td><td>${cashNew.toLocaleString('en-IN')}</td><td>${cashOld.toLocaleString('en-IN')}</td></tr>
  <tr><th>Total Assets</th><th>${totLiabNew.toLocaleString('en-IN')}</th><th>${totLiabOld.toLocaleString('en-IN')}</th></tr>
</table>
<div style="font-size:10pt; margin-top:3pt;">
<b>Additional Information:</b> Depreciation charged on Plant & Machinery was ₹${getRandomChoice([35000, 45000, 50000]).toLocaleString('en-IN')} during the year. Debentures were issued on 31st March 2026.
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

  // Fallback for remaining subjects
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
