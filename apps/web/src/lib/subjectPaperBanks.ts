export interface FullGeneratedQuestion {
  qNum: number;
  section: string;
  marks: number;
  text: string;
  codeBlock?: string;
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
  const normSub = subjectName.toLowerCase();

  // 1. PHYSICAL EDUCATION (CODE 048)
  if (normSub.includes('physical education') || normSub.includes('048')) {
    const peMCQs = [
      { text: 'Which tournament format follows the formula (N - 1) to determine the total number of matches played for N teams?', opts: { optA: 'Knock-Out Tournament', optB: 'League Tournament', optC: 'Round Robin', optD: 'Combination Tournament' }, ans: '(A) Knock-Out Tournament' },
      { text: 'Identify the postural spinal deformity marked by an abnormal outward exaggeration of the thoracic curve (hunchback):', opts: { optA: 'Kyphosis', optB: 'Lordosis', optC: 'Scoliosis', optD: 'Knock Knees' }, ans: '(A) Kyphosis' },
      { text: 'Which Yogic posture is highly effective as a preventive measure against Type-2 Diabetes by stimulating the pancreas?', opts: { optA: 'Ardha Matsyendrasana', optB: 'Shavasana', optC: 'Tadasana', optD: 'Vrikshasana' }, ans: '(A) Ardha Matsyendrasana' },
      { text: 'What is the bench height used in the Harvard Step Test for boys?', opts: { optA: '20 inches (50.8 cm)', optB: '16 inches (40.6 cm)', optC: '14 inches (35.5 cm)', optD: '24 inches (60.9 cm)' }, ans: '(A) 20 inches' },
      { text: 'Newton’s Second Law of Motion is also formally termed in sports biomechanics as:', opts: { optA: 'Law of Acceleration', optB: 'Law of Inertia', optC: 'Law of Action and Reaction', optD: 'Law of Equilibrium' }, ans: '(A) Law of Acceleration' },
      { text: 'Which component of physical fitness is primarily measured by the 8-Foot Up and Go test in Rikli & Jones battery?', opts: { optA: 'Agility and Dynamic Balance', optB: 'Muscular Strength', optC: 'Aerobic Endurance', optD: 'Flexibility' }, ans: '(A) Agility and Dynamic Balance' },
      { text: 'Female Athlete Triad comprises which three interrelated clinical conditions?', opts: { optA: 'Osteoporosis, Amenorrhea, Eating Disorders', optB: 'Hypertension, Diabetes, Fatigue', optC: 'Kyphosis, Scoliosis, Lordosis', optD: 'Anemia, Asthma, Sprain' }, ans: '(A) Osteoporosis, Amenorrhea, Eating Disorders' },
      { text: 'What does the acronym P.R.I.C.E. stand for in initial sports injury management?', opts: { optA: 'Protect, Rest, Ice, Compression, Elevation', optB: 'Pressure, Relaxation, Inhale, Calm, Exercise', optC: 'Physical, Rapid, Inspection, Care, Energy', optD: 'Protect, Relief, Immobilize, Circulation, Exam' }, ans: '(A) Protect, Rest, Ice, Compression, Elevation' },
      { text: 'Which training cycle spans across a micro-cycle in periodization planning?', opts: { optA: '3 to 7 Days', optB: '3 to 6 Weeks', optC: '6 to 12 Months', optD: '4 Years' }, ans: '(A) 3 to 7 Days' },
      { text: 'Which nutrient yields approximately 9 kcal of energy per gram metabolized?', opts: { optA: 'Fats', optB: 'Proteins', optC: 'Carbohydrates', optD: 'Minerals' }, ans: '(A) Fats' }
    ];

    const pe2M = [
      { text: 'Define Extramural tournaments. Mention two key educational benefits of inter-school sports competitions.', ans: 'Extramural tournaments are competitions between teams of different schools. Benefits: fosters national integration and enhances sports talent.' },
      { text: 'Explain the physiological differences between Fast Twitch (White) and Slow Twitch (Red) muscle fibers.', ans: 'Slow twitch fibers have high myoglobin for aerobic endurance; fast twitch fibers contract rapidly for anaerobic power.' },
      { text: 'State the difference between Intrinsic Motivation and Extrinsic Motivation with sports examples.', ans: 'Intrinsic motivation comes from personal satisfaction; Extrinsic motivation comes from medals, cash awards, and recognition.' }
    ];

    const pe3M = [
      { text: 'Draw a knock-out fixture of 13 teams showing clearly the calculation of upper half, lower half, and number of byes.', ans: 'N=13. Next power of 2 = 16. Byes = 16 - 13 = 3. Upper half = (13+1)/2 = 7; Lower half = 6.' },
      { text: 'Describe the procedure, scoring, and significance of the Chair Sit and Reach test for senior citizens.', ans: 'Evaluates lower body hamstring flexibility. Subject reaches towards toes with one leg straight on edge of chair.' }
    ];

    const pe5M = [
      { text: 'Explain the classification of Sports Injuries into Soft Tissue and Bone injuries. Elaborate on PRICER procedure.', ans: 'Soft tissue: sprain, strain, contusion. Bone: fractures. PRICER: Protect, Rest, Ice, Compression, Elevation, Referral.' },
      { text: 'Explain Newton’s three laws of motion and illustrate their practical applications in athletic jumping and sprinting events.', ans: '1st Law: Starting blocks push-off; 2nd Law: Acceleration proportional to force exerted; 3rd Law: Ground reaction propulsion.' }
    ];

    const questions: FullGeneratedQuestion[] = [];
    let qCount = 1;

    shuffleArray(peMCQs).slice(0, 18).forEach(q => {
      questions.push({ qNum: qCount++, section: 'A', marks: 1, text: q.text, options: q.opts, answerKey: q.ans });
    });
    shuffleArray(pe2M).slice(0, 5).forEach(q => {
      questions.push({ qNum: qCount++, section: 'B', marks: 2, text: q.text, answerKey: q.ans });
    });
    shuffleArray(pe3M).slice(0, 5).forEach(q => {
      questions.push({ qNum: qCount++, section: 'C', marks: 3, text: q.text, answerKey: q.ans });
    });
    shuffleArray(pe5M).slice(0, 3).forEach(q => {
      questions.push({ qNum: qCount++, section: 'D', marks: 5, text: q.text, answerKey: q.ans });
    });

    return {
      questions,
      totalMarks: 70,
      instructions: [
        'The question paper consists of 30+ questions.',
        'Section A: 18 questions of 1 mark each.',
        'Section B: Questions 19 to 23 are 2 marks each.',
        'Section C: Questions 24 to 28 are 3 marks each.',
        'Section D: Questions 29 to 31 are 5 marks each.'
      ]
    };
  }

  // 2. ACCOUNTANCY (CODE 055)
  if (normSub.includes('accountancy') || normSub.includes('055')) {
    const accMCQs = [
      { text: 'In the absence of a Partnership Deed, interest on advances/loans given by a partner is payable at what annual rate?', opts: { optA: '6% p.a.', optB: '10% p.a.', optC: '12% p.a.', optD: 'Zero / Nil' }, ans: '(A) 6% p.a.' },
      { text: 'At the time of admission of a new partner, general reserve appearing in the balance sheet is transferred to:', opts: { optA: 'Old Partners’ Capital Accounts in Old Ratio', optB: 'All Partners in New Ratio', optC: 'Revaluation Account', optD: 'Sacrificing Ratio' }, ans: '(A) Old Partners in Old Ratio' },
      { text: 'A company forfeited 100 shares of Rs 10 each on which Rs 7 was paid up. What is the maximum discount permitted on reissue?', opts: { optA: 'Rs 7 per share', optB: 'Rs 3 per share', optC: 'Rs 10 per share', optD: 'Rs 5 per share' }, ans: '(A) Rs 7 per share' }
    ];

    const questions: FullGeneratedQuestion[] = [];
    let qCount = 1;

    shuffleArray(accMCQs).forEach(q => {
      questions.push({ qNum: qCount++, section: 'A', marks: 1, text: q.text, options: q.opts, answerKey: q.ans });
    });

    questions.push({
      qNum: qCount++, section: 'B', marks: 3,
      text: 'A, B and C share profits in 3:2:1. D is admitted for 1/6th share acquired equally from B and C. Calculate new profit sharing ratio and sacrificing ratio.',
      answerKey: 'Sacrificing ratio B and C is 1:1. New ratio: 6:3:1:2.'
    });

    questions.push({
      qNum: qCount++, section: 'C', marks: 6,
      text: 'Alpha Ltd issued 50,000 equity shares of Rs 10 each at a premium of Rs 2. Applications received for 70,000 shares. Pro-rata allotment made to applicants of 60,000 shares. Excess application money adjusted to allotment. Pass journal entries.',
      answerKey: 'Entries for application, allotment, call and securities premium.'
    });

    return {
      questions,
      totalMarks: 80,
      instructions: [
        'Part A: Accounting for Partnership Firms and Companies.',
        'Part B: Financial Statement Analysis.',
        'Support answers with working notes.'
      ]
    };
  }

  // 3. BUSINESS STUDIES (CODE 054)
  if (normSub.includes('business studies') || normSub.includes('054')) {
    const bstMCQs = [
      { text: 'Which principle of management states that an employee should receive orders from one and only one superior?', opts: { optA: 'Unity of Command', optB: 'Unity of Direction', optC: 'Scalar Chain', optD: 'Espirit de Corps' }, ans: '(A) Unity of Command' },
      { text: 'Which level of management is directly responsible for coordinating day-to-day operations and maintaining quality standards?', opts: { optA: 'Supervisory / Operational Management', optB: 'Top Level Management', optC: 'Middle Level Management', optD: 'Board of Directors' }, ans: '(A) Supervisory Management' },
      { text: 'Which money market instrument is issued by commercial banks to finance the working capital requirements of business firms?', opts: { optA: 'Commercial Bill', optB: 'Treasury Bill', optC: 'Call Money', optD: 'Certificate of Deposit' }, ans: '(A) Commercial Bill' }
    ];

    const questions: FullGeneratedQuestion[] = [];
    let qCount = 1;

    shuffleArray(bstMCQs).forEach(q => {
      questions.push({ qNum: qCount++, section: 'A', marks: 1, text: q.text, options: q.opts, answerKey: q.ans });
    });

    questions.push({
      qNum: qCount++, section: 'B', marks: 4,
      text: 'Explain any four features of the Business Environment with relevant Indian industrial examples.',
      answerKey: 'Totality of external forces, Specific and general forces, Dynamic nature, Uncertainty, Complexity.'
    });

    questions.push({
      qNum: qCount++, section: 'C', marks: 6,
      text: 'Case Study: Marketing Mix Strategy.\nA consumer electronics firm launches an inverter AC. Explain how the marketing manager should establish the 4 Ps (Product, Price, Place, Promotion).',
      answerKey: 'Product USP, Penetration pricing, Multi-tier distribution, Digital promotional campaigns.'
    });

    return {
      questions,
      totalMarks: 80,
      instructions: [
        'Answers to 1-mark questions should be brief.',
        'Answers to 4-mark questions should be 100-150 words.',
        'Answers to 6-mark questions should be around 200 words.'
      ]
    };
  }

  // 4. ECONOMICS (CODE 030)
  if (normSub.includes('economics') || normSub.includes('030')) {
    const ecoMCQs = [
      { text: 'Which of the following is NOT included in the estimation of Domestic Income?', opts: { optA: 'Transfer Payments', optB: 'Wages and Salaries', optC: 'Operating Surplus', optD: 'Mixed Income' }, ans: '(A) Transfer payments' },
      { text: 'If Marginal Propensity to Consume (MPC) is 0.8, what is the value of the investment multiplier?', opts: { optA: '5', optB: '4', optC: '2', optD: '1.25' }, ans: '(A) k = 1 / (1 - MPC) = 1 / 0.2 = 5.' },
      { text: 'Which tool of RBI monetary policy involves direct buying and selling of government securities in the open market?', opts: { optA: 'Open Market Operations (OMO)', optB: 'Cash Reserve Ratio', optC: 'Bank Rate', optD: 'Margin Requirements' }, ans: '(A) Open Market Operations' }
    ];

    const questions: FullGeneratedQuestion[] = [];
    let qCount = 1;

    shuffleArray(ecoMCQs).forEach(q => {
      questions.push({ qNum: qCount++, section: 'A', marks: 1, text: q.text, options: q.opts, answerKey: q.ans });
    });

    questions.push({
      qNum: qCount++, section: 'B', marks: 4,
      text: 'Explain the working of the Money Creation / Credit Creation process by commercial banks with an initial deposit of Rs 1,000 and LRR = 20%.',
      answerKey: 'Deposit multiplier = 1/LRR = 5. Total credit created = 1,000 x 5 = Rs 5,000.'
    });

    questions.push({
      qNum: qCount++, section: 'C', marks: 6,
      text: 'Distinguish between Revenue Expenditure and Capital Expenditure in the Government Budget with two examples of each.',
      answerKey: 'Revenue expenditure does not create assets or reduce liabilities. Capital expenditure creates assets or reduces liabilities.'
    });

    return {
      questions,
      totalMarks: 80,
      instructions: [
        'Part A: Macroeconomics. Part B: Indian Economic Development.',
        'All mathematical calculations must be clearly shown.'
      ]
    };
  }

  // 5. ENGLISH CORE (CODE 301)
  if (normSub.includes('english') || normSub.includes('301')) {
    const questions: FullGeneratedQuestion[] = [
      {
        qNum: 1, section: 'A', marks: 5,
        text: 'Read the unseen passage on Sustainable Environmental Transition and answer questions:\n"Human technological acceleration in the 21st century has reached a critical crossroad..."\n(i) Identify the central conflict presented in paragraph 1.\n(ii) What evidence does the author cite regarding carbon offset thresholds?\n(iii) Choose the word nearest in meaning to "indispensable".',
        answerKey: '(i) Ecological balance vs industrial growth. (ii) Quantitative offset thresholds cited. (iii) Crucial / Essential.'
      },
      {
        qNum: 2, section: 'B', marks: 4,
        text: 'You are Cultural Secretary of Arden Progressive School, Haldwani. Draft a formal Notice in not more than 50 words inviting students of Class 11 & 12 to audition for the Inter-House One-Act Play Competition.',
        answerKey: 'Box layout, Header, Notice title, Date, Details, Signature.'
      },
      {
        qNum: 3, section: 'B', marks: 5,
        text: 'Write a formal Letter to the Editor of a national daily drawing urgent attention toward traffic congestion and pedestrian safety around school zones.',
        answerKey: 'Sender address, Date, Receiver, Subject, Salutation, 3-paragraph body, Sign-off.'
      },
      {
        qNum: 4, section: 'C', marks: 5,
        text: 'Explain the deeper metaphorical significance of the "Rattrap" in Selma Lagerlöf’s story. How does kindness redeem the peddler?',
        answerKey: 'World as a rattrap with lures. Edla’s compassion awakened his latent goodness.'
      }
    ];

    return {
      questions,
      totalMarks: 80,
      instructions: [
        'Section A: Reading Skills (22 Marks)',
        'Section B: Creative Writing Skills (18 Marks)',
        'Section C: Literature Textbooks (40 Marks)'
      ]
    };
  }

  // 6. COMPUTER SCIENCE (CODE 083)
  if (normSub.includes('computer science') || normSub.includes('083')) {
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
      qNum: index + 1,
      section: 'A',
      marks: 1,
      text: item.text,
      codeBlock: item.code,
      options: item.opts,
      answerKey: item.ans
    }));

    const sectionBQuestions: FullGeneratedQuestion[] = [
      {
        qNum: 22, section: 'B', marks: 2,
        text: 'What is the difference between default parameters and positional parameters in Python? Also give an example of a function header which uses both.',
        answerKey: 'Positional arguments must match call order. Default parameters take fallback values if omitted.'
      },
      {
        qNum: 23, section: 'B', marks: 2,
        text: 'Write a Python statement to perform the following tasks: (USE BUILT_IN FUNCTIONS/METHODS ONLY)\n(i) To create a new list L1 containing the elements of list L arranged in ascending order, without modifying list L.\n(ii) A statement to check whether the given character, ch is an alphabet or a number.',
        answerKey: '(i) L1 = sorted(L)\n(ii) ch.isalnum()'
      },
      {
        qNum: 24, section: 'B', marks: 2,
        text: "Assuming that D1 is a dictionary in Python,\n(i) (a) Write a Python expression to check if the key, 'RNO' is present in D1.\nOR\n(b) Write a Python expression to check if any key in D1 has a value 12.\n(ii) (a) Write a single statement using a BUILT_IN function to add the key:value pair 'RNo': 12, if 'RNo' is not present in D1. However, if present, return its value.\nOR\n(b) Write a single statement to delete all elements from D1.",
        answerKey: "(i)(a) 'RNO' in D1  OR  (b) 12 in D1.values()\n(ii)(a) D1.setdefault('RNo', 12)  OR  (b) D1.clear()"
      },
      {
        qNum: 25, section: 'B', marks: 2,
        text: 'What possible output(s) from the given options will NOT be displayed when the following code is executed? Also, mention for how many iterations the for loop will run?',
        codeBlock: "import random\na = [1, 2, 3, 4, 5, 6]\nfor i in range(4):\n    j = random.randrange(i, 5)\n    print(a[j], end='-')\nprint()",
        options: { optA: '3-4-5-4-', optB: '2-2-4-5-', optC: '4-3-3-5-', optD: '5-1-2-4-' },
        answerKey: 'Option (D) will NOT be displayed.'
      },
      {
        qNum: 26, section: 'B', marks: 2,
        text: 'The function given below is written to accept a string s as a parameter and return the number of vowels appearing in the string. The code has errors. Rewrite it after removing all logical and syntax errors:',
        codeBlock: "def CountVowels(s):\n    c = 0\n    for ch in range(s):\n        if 'aeiouAEIOU' in ch:\n            c =+ 1\n    return (ch)",
        answerKey: "def CountVowels(s):\n    c = 0\n    for ch in s:\n        if ch in 'aeiouAEIOU':\n            c += 1\n    return c"
      },
      {
        qNum: 27, section: 'B', marks: 2,
        text: 'Ms. Zoya is creating a table W_STOCK with fields: W_Code CHAR(5) Primary Key, W_Description VARCHAR(20), B_Qty INTEGER, U_Price FLOAT.\n(i) Write SQL command to create the table W_STOCK.\n(ii) Write SQL command to add an attribute E_Date (DATE type) to the table W_STOCK.',
        answerKey: '(i) CREATE TABLE W_STOCK(W_Code CHAR(5) PRIMARY KEY, W_Description VARCHAR(20), B_Qty INT, U_Price FLOAT);\n(ii) ALTER TABLE W_STOCK ADD E_Date DATE;'
      },
      {
        qNum: 28, section: 'B', marks: 2,
        text: '(a) List one advantage and one disadvantage of Bus topology.\nOR\n(b) What is protocol in computer networks? Which protocol is used to transmit hypertext across the web?',
        answerKey: '(a) Advantage: Minimal cabling. Disadvantage: Central backbone failure stops whole network.\n(b) Protocol: HTTP / HTTPS.'
      }
    ];

    const sectionCQuestions: FullGeneratedQuestion[] = [
      {
        qNum: 29, section: 'C', marks: 3,
        text: 'Write a Python function that counts and returns the number of digits appearing in the text file "Space.txt".\nOR\nWrite a Python function that displays words where lowercase letter "e" appears at least twice in text file "Space.txt".',
        answerKey: 'def CountDigits():\n    c = 0\n    with open("Space.txt", "r") as f:\n        for ch in f.read():\n            if ch.isdigit(): c += 1\n    return c'
      },
      {
        qNum: 30, section: 'C', marks: 3,
        text: 'A stack named FruitStack contains records of fruits as dictionaries: {\'Name\': str, \'Origin\': str, \'Price\': int, \'Expiry\': str}.\nWrite the following user-defined functions in Python:\n(i) push_fruit(FruitStack, Fruit): Pushes record if Price < 100.\n(ii) pop_fruit(FruitStack): Pops and returns topmost record or prints "UNDERFLOW".\n(iii) display(FruitStack): Displays all elements starting from topmost or prints "EMPTY STACK".',
        answerKey: 'def push_fruit(stk, f):\n    if f["Price"] < 100: stk.append(f)\ndef pop_fruit(stk):\n    return stk.pop() if stk else print("UNDERFLOW")\ndef display(stk):\n    if not stk: print("EMPTY STACK")\n    else:\n        for x in reversed(stk): print(x)'
      },
      {
        qNum: 31, section: 'C', marks: 3,
        text: 'Write the output of the following code:',
        codeBlock: "def Exam2026(given):\n    new = []\n    for ch in given[1:-1]:\n        if ch.isupper():\n            new.reverse()\n        elif ch not in new:\n            new.append(ch)\n        elif ch in new:\n            new.pop()\n    print(new)\n\nExam2026('Gold-24Medals')",
        answerKey: "Output: ['l', 'd', '-', '2', '4', 'e', 'd', 'a', 'l']"
      }
    ];

    const sectionDQuestions: FullGeneratedQuestion[] = [
      {
        qNum: 32, section: 'D', marks: 4,
        text: "Abhishek created table STOCK(Code, Type, Volume, Qty, Price). Write SQL queries:\n(i) Display Type and maximum Price for each Type of milk.\n(ii) For each record, increase Price by 0.5 where Type is 'F'.\n(iii) Display total stock value (total of Qty * Price).\n(iv) Display details of all records where Code starts with 'A'.",
        answerKey: "(i) SELECT Type, MAX(Price) FROM STOCK GROUP BY Type;\n(ii) UPDATE STOCK SET Price = Price + 0.5 WHERE Type = 'F';\n(iii) SELECT SUM(Qty * Price) FROM STOCK;\n(iv) SELECT * FROM STOCK WHERE Code LIKE 'A%';"
      },
      {
        qNum: 33, section: 'D', marks: 4,
        text: 'A CSV file "States.csv" contains: [StateName, Capital, Population, Language]. Write a Python program which reads data from this file and appends all records where population is more than 10000000 into another CSV file "More.csv", skipping the header row.',
        answerKey: 'import csv\nwith open("States.csv", "r") as fin, open("More.csv", "a", newline="") as fout:\n    r = csv.reader(fin)\n    w = csv.writer(fout)\n    next(r)\n    for row in r:\n        if row and int(row[2]) > 10000000:\n            w.writerow(row)'
      },
      {
        qNum: 34, section: 'D', marks: 4,
        text: 'Consider tables CUSTOMERS(CID, CName, Phone) and LOANS(SNo, CID, LAmt, LDate, Terms, RoI). Write SQL queries for:\n(i) Number of records from LOANS table where Rate of Interest (RoI) is above 7.0.\n(ii) Names of customers whose loan amount (LAmt) is above 1000000.\n(iii) CID, CName, and Terms where Loan Date (LDate) is after 31st December, 2024.\n(iv) Details of all loans in descending order of RoI.',
        answerKey: '(i) SELECT COUNT(*) FROM LOANS WHERE RoI > 7.0;\n(ii) SELECT CName FROM CUSTOMERS C, LOANS L WHERE C.CID = L.CID AND LAmt > 1000000;\n(iii) SELECT C.CID, CName, Terms FROM CUSTOMERS C, LOANS L WHERE C.CID = L.CID AND LDate > "2024-12-31";\n(iv) SELECT * FROM LOANS ORDER BY RoI DESC;'
      },
      {
        qNum: 35, section: 'D', marks: 4,
        text: 'Peter created table Account in MySQL database SCHOOL (Username: admin, Password: root, Host: localhost) with fields: Stud_id, Sname, Class, Fees.\nWrite a Python program to display records of those students whose fees is less than 5000.',
        answerKey: 'import mysql.connector\ncon = mysql.connector.connect(host="localhost", user="admin", password="root", database="SCHOOL")\ncur = con.cursor()\ncur.execute("SELECT * FROM Account WHERE Fees < 5000")\nfor row in cur.fetchall(): print(row)\ncur.close()\ncon.close()'
      }
    ];

    const sectionEQuestions: FullGeneratedQuestion[] = [
      {
        qNum: 36, section: 'E', marks: 5,
        text: 'NextStep organization stores data of Resource Persons in binary file RESOURCES.DAT using tuple structure: (RID, RName, RExpertise, Charges).\nWrite the following user-defined functions in Python:\n(i) Append(): Input data of a Resource Person and write it to RESOURCES.DAT.\n(ii) Update(): Increase Charges of each resource person by 500.',
        answerKey: 'import pickle\ndef Append():\n    r = (int(input()), input(), input(), float(input()))\n    with open("RESOURCES.DAT", "ab") as f: pickle.dump(r, f)\ndef Update():\n    recs = []\n    with open("RESOURCES.DAT", "rb") as f:\n        try:\n            while True: recs.append(pickle.load(f))\n        except EOFError: pass\n    with open("RESOURCES.DAT", "wb") as f:\n        for x in recs: pickle.dump((x[0], x[1], x[2], x[3] + 500), f)'
      },
      {
        qNum: 37, section: 'E', marks: 5,
        text: 'CASE STUDY: Amritsar Campus Networking (Blocks: ADMIN, ACADEMIC, HOSTEL, SPORTS).\nComputers: ADMIN=25, ACADEMIC=600, HOSTEL=120, SPORTS=50.\nDistances: ADMIN to ACADEMIC=60m, ADMIN to HOSTEL=160m, ADMIN to SPORTS=80m, ACADEMIC to HOSTEL=40m, ACADEMIC to SPORTS=120m, HOSTEL to SPORTS=150m.\n(i) Suggest the most appropriate location of the server inside the Campus with justification.\n(ii) Draw the cable layout to efficiently connect various blocks.\n(iii) Name any two wired media used to connect computers within a block.\n(iv) Which communication medium is used by FM: Radio waves, Micro waves, or Infrared waves?\n(v) Full name of protocol for audio-visual communication OR where repeater should be installed.',
        answerKey: '(i) ACADEMIC Block (holds 600 computers, 80-20 rule).\n(ii) Star layout centered at ACADEMIC Block.\n(iii) Twisted Pair Cable (Cat6) and Coaxial Cable.\n(iv) Radio Waves.\n(v) VoIP (Voice over Internet Protocol) OR Repeater between HOSTEL and SPORTS.'
      }
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
        'All questions are compulsory. However, internal choices have been provided in some questions. Attempt only one choice.',
        'Section A consists of 21 questions (1 to 21). Each question carries 1 mark.',
        'Section B consists of 7 questions (22 to 28). Each question carries 2 marks.',
        'Section C consists of 3 questions (29 to 31). Each question carries 3 marks.',
        'Section D consists of 4 questions (32 to 35). Each question carries 4 marks.',
        'Section E consists of 2 questions (36 & 37). Each question carries 5 marks.',
        'All programming questions are to be answered using Python Language only.',
        'In case of MCQs, text of the correct answer should also be written.'
      ]
    };
  }

  // 7. YOGA (CODE 841)
  if (normSub.includes('yoga') || normSub.includes('841')) {
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

    shuffleArray(rawYogaA).slice(0, 6).forEach(q => {
      questions.push({ qNum: qCount++, section: 'A', marks: 1, text: q.text, options: q.opts, answerKey: q.ans });
    });

    shuffleArray(rawYogaB).slice(0, 4).forEach(q => {
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
      totalMarks: 22,
      instructions: [
        'This question paper covers CBSE Class 11/12 Yoga (Subject Code 841).',
        'Section A comprises Objective Type Questions (1 Mark each).',
        'Section B & C comprise Applied & Analytical Questions.'
      ]
    };
  }

  // 8. FALLBACK FOR OTHER SUBJECTS
  const genericQuestions: FullGeneratedQuestion[] = [
    { qNum: 1, section: 'A', marks: 1, text: `State the fundamental theorem or principle that defines the foundational study of ${subjectName}.`, answerKey: 'Accurate technical formulation as prescribed in CBSE 2026-27 curriculum.' },
    { qNum: 2, section: 'A', marks: 1, text: `Identify the primary SI unit or standard terminology associated with parameters measured in ${subjectName}.`, answerKey: 'Standard internationally accepted SI unit / nomenclature.' },
    { qNum: 3, section: 'B', marks: 2, text: `Differentiate between empirical observation and theoretical modeling in the context of ${subjectName}.`, answerKey: 'Empirical approaches rely on direct measurement whereas theoretical models use axiomatic deductions.' },
    { qNum: 4, section: 'C', marks: 3, text: `Derive the governing mathematical relationship or elaborate upon the core concept in ${subjectName}. Support with a diagram.`, answerKey: 'Stepwise analytical derivation with labeled schematic diagram.' },
    { qNum: 5, section: 'D', marks: 5, text: `Case Study: Contemporary Real-World Application.\nAnalyze a real-world technological or industrial implementation of ${subjectName} in current society.`, answerKey: 'Comprehensive evaluation of parameters, practical constraints, and remedial measures.' }
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
