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

  // =========================================================================
  // 1. CLASS 10 INFORMATION TECHNOLOGY (CODE 402) - EXACT CBSE 50 MARKS PATTERN
  // =========================================================================
  if (normSub.includes('information technology') || normSub.includes('402')) {
    const poolPartA = [
      { text: 'Which of the following is an effective technique for managing work-related stress?', opts: { optA: 'Time Management', optB: 'Procrastination', optC: 'Isolation', optD: 'Overworking' }, ans: '(A) Time Management' },
      { text: 'What type of feedback provides specific advice on how to improve performance?', opts: { optA: 'Constructive Feedback', optB: 'Negative Feedback', optC: 'Formal Feedback', optD: 'Passive Feedback' }, ans: '(A) Constructive Feedback' },
      { text: 'Which key combination is used to permanently delete a file in Windows without sending it to Recycle Bin?', opts: { optA: 'Shift + Delete', optB: 'Ctrl + Delete', optC: 'Alt + Delete', optD: 'Tab + Delete' }, ans: '(A) Shift + Delete' },
      { text: 'A person who starts a business venture by taking financial risks is known as:', opts: { optA: 'Entrepreneur', optB: 'Wage worker', optC: 'Apprentice', optD: 'Administrator' }, ans: '(A) Entrepreneur' },
      { text: 'Which of the following is one of the United Nations 17 Sustainable Development Goals (SDGs)?', opts: { optA: 'Quality Education', optB: 'High Industrial Waste', optC: 'Fossil Fuel Subsidy', optD: 'Deforestation' }, ans: '(A) Quality Education' },
      { text: 'Non-verbal communication includes which of the following elements?', opts: { optA: 'Body Language and Gestures', optB: 'Written Reports', optC: 'Telephone Conversations', optD: 'Emails' }, ans: '(A) Body Language and Gestures' }
    ];

    const poolPartB_MCQ = [
      { text: 'Which style in LibreOffice Writer affects the formatting of an entire paragraph including margins and tabs?', opts: { optA: 'Paragraph Style', optB: 'Character Style', optC: 'Frame Style', optD: 'Page Style' }, ans: '(A) Paragraph Style' },
      { text: 'Which feature in a word processor allows sending identical letters with customized recipient addresses to hundreds of people?', opts: { optA: 'Mail Merge', optB: 'AutoCorrect', optC: 'Macro Recording', optD: 'Style Inspector' }, ans: '(A) Mail Merge' },
      { text: 'In LibreOffice Calc, which What-If analysis tool finds the input necessary to achieve a desired formula target?', opts: { optA: 'Goal Seek', optB: 'Consolidate', optC: 'Subtotal', optD: 'Scenario Manager' }, ans: '(A) Goal Seek' },
      { text: 'A table in RDBMS consists of columns and rows. Another technical term for a row in a relational table is:', opts: { optA: 'Tuple', optB: 'Attribute', optC: 'Domain', optD: 'Relation' }, ans: '(A) Tuple' },
      { text: 'Which SQL command is used to retrieve data records matching specified conditions from a database table?', opts: { optA: 'SELECT', optB: 'CREATE', optC: 'INSERT', optD: 'ALTER' }, ans: '(A) SELECT' },
      { text: 'Which of the following field types is ideal for storing telephone numbers with fixed 10 digits?', opts: { optA: 'CHAR(10)', optB: 'FLOAT', optC: 'DATE', optD: 'BOOLEAN' }, ans: '(A) CHAR(10)' },
      { text: 'Which of the following acts as a private network connecting computers within a single school campus?', opts: { optA: 'LAN (Local Area Network)', optB: 'WAN', optC: 'MAN', optD: 'PAN' }, ans: '(A) LAN' },
      { text: 'Which cyber threat involves tricking users into disclosing sensitive personal credentials via fraudulent emails?', opts: { optA: 'Phishing', optB: 'Adware', optC: 'Trojan', optD: 'Spam' }, ans: '(A) Phishing' },
      { text: 'In database management, which key uniquely distinguishes every row and cannot contain duplicate or NULL values?', opts: { optA: 'Primary Key', optB: 'Foreign Key', optC: 'Alternate Key', optD: 'Secondary Key' }, ans: '(A) Primary Key' },
      { text: 'Which accessibility feature in Windows is intended for users with auditory impairments?', opts: { optA: 'SoundSentry / ShowSounds', optB: 'StickyKeys', optC: 'FilterKeys', optD: 'ToggleKeys' }, ans: '(A) SoundSentry' },
      { text: 'To consolidate data from three quarterly sheets into a master yearly summary in Calc, which tool is used?', opts: { optA: 'Data Consolidate', optB: 'Goal Seek', optC: 'Scenario', optD: 'Solver' }, ans: '(A) Data Consolidate' },
      { text: 'Which protocol securely encrypts communication between a web browser and an institutional payment portal?', opts: { optA: 'HTTPS (Port 443)', optB: 'FTP (Port 21)', optC: 'Telnet (Port 23)', optD: 'SMTP (Port 25)' }, ans: '(A) HTTPS' },
      { text: 'What is the full form of DBMS?', opts: { optA: 'Database Management System', optB: 'Digital Base Modeling System', optC: 'Data Binary Master Script', optD: 'Database Monitoring Server' }, ans: '(A) Database Management System' },
      { text: 'Which feature in spreadsheets allows grouping and summarizing data by calculating subtotals automatically?', opts: { optA: 'Subtotals', optB: 'Goal Seek', optC: 'Validation', optD: 'Data Sort' }, ans: '(A) Subtotals' },
      { text: 'Which shortcut key opens the Styles and Formatting deck in LibreOffice Writer?', opts: { optA: 'F11', optB: 'F5', optC: 'F7', optD: 'Ctrl + F1' }, ans: '(A) F11' }
    ];

    const pool2M = [
      { text: 'Differentiate between Character Styles and Paragraph Styles in LibreOffice Writer with examples.', ans: 'Paragraph styles format entire blocks (alignment, line spacing), while Character styles format inline words (bold, font color).' },
      { text: 'What is the utility of Table of Contents (ToC) in a technical document? How is it generated automatically?', ans: 'ToC provides document outline with page numbers. It is generated by mapping heading styles (H1, H2, H3).' },
      { text: 'Explain the difference between Goal Seek and Solver in spreadsheet software.', ans: 'Goal Seek works with a single variable to reach a target, whereas Solver optimizes multiple constraint variables.' },
      { text: 'What is a Foreign Key? How does it enforce referential integrity between two related tables?', ans: 'A foreign key is an attribute in one table that references the primary key of another table, ensuring link consistency.' },
      { text: 'State any two essential workplace fire safety guidelines and evacuation protocols.', ans: 'Keep fire extinguishers accessible, conduct regular evacuation drills, and never use elevators during a fire alarm.' },
      { text: 'Define the term Macro in spreadsheets. Mention one advantage of using macros for grade registers.', ans: 'A macro is a saved sequence of commands. Advantage: automates repetitive calculation workflows like term mark consolidation.' }
    ];

    const pool4M = [
      { text: 'Explain the detailed procedure of creating a Mail Merge document in LibreOffice Writer to dispatch parent meeting circulars.', ans: 'Step 1: Create Main Document, Step 2: Select/Create Data Source (CSV/Calc), Step 3: Insert merge fields, Step 4: Preview and Merge to print.' },
      { text: 'Given a database table "LIBRARY" with fields (BookID, Title, Author, Price, Status). Write SQL queries to:\n(i) Display all available books with Price < 400.\n(ii) Increase Price by 10% for Author "Sumita Arora".\n(iii) Count total books categorized as "Issued".\n(iv) Delete records where BookID is "B105".', ans: '(i) SELECT * FROM LIBRARY WHERE Price < 400;\n(ii) UPDATE LIBRARY SET Price = Price * 1.10 WHERE Author = "Sumita Arora";\n(iii) SELECT COUNT(*) FROM LIBRARY WHERE Status = "Issued";\n(iv) DELETE FROM LIBRARY WHERE BookID = "B105";' },
      { text: 'What are the main security threats associated with computer networks? Describe three preventive security measures including Firewalls and Antivirus.', ans: 'Threats: Viruses, Worms, Phishing, Ransomware. Prevention: Enable hardware/software firewalls, install updated antivirus, and avoid suspicious links.' }
    ];

    const selectedPartA = shuffleArray(poolPartA).slice(0, 5);
    const selectedPartB_MCQ = shuffleArray(poolPartB_MCQ).slice(0, 15);
    const selected2M = shuffleArray(pool2M).slice(0, 6);
    const selected4M = shuffleArray(pool4M).slice(0, 3);

    const questions: FullGeneratedQuestion[] = [];
    let qCount = 1;

    // Section A: Objective (20 Qs x 1M)
    [...selectedPartA, ...selectedPartB_MCQ].forEach(q => {
      questions.push({ qNum: qCount++, section: 'A', marks: 1, text: q.text, options: q.opts, answerKey: q.ans });
    });

    // Section B: Subjective (6 Qs x 2M)
    selected2M.forEach(q => {
      questions.push({ qNum: qCount++, section: 'B', marks: 2, text: q.text, answerKey: q.ans });
    });

    // Section C: Long Subjective (3 Qs x 4M + 1 Q x 6M)
    selected4M.forEach(q => {
      questions.push({ qNum: qCount++, section: 'C', marks: 4, text: q.text, answerKey: q.ans });
    });
    questions.push({
      qNum: qCount++,
      section: 'C',
      marks: 6,
      text: 'Case Study: School Cloud Digital Transformation.\nAn educational trust with 1500 students plans to deploy an online marks and fee portal.\n(i) Suggest suitable database schema attributes for fee challan tracking. [2]\n(ii) Which network topology is best suited to connect 3 IT labs with 120 computers? [2]\n(iii) Outline data backup protocols to protect against disk failure. [2]',
      answerKey: '(i) ChallanNo (PK), StudentID (FK), Amount, PaidDate, Status.\n(ii) Star Topology with Gigabit Switches.\n(iii) Automated daily off-site cloud backups and weekly localized NAS mirrored drive snapshots.'
    });

    return {
      questions,
      totalMarks: 50,
      instructions: [
        'Please read all instructions carefully. This question paper comprises 2 Sections: Section A and Section B.',
        'Section A has Objective Type Questions (20 Marks).',
        'Section B has Subjective Type Questions (30 Marks).',
        'Maximum Marks: 50. Time Allowed: 2 Hours.'
      ]
    };
  }

  // =========================================================================
  // 2. CLASS 3 HINDI (VEENA / SARANGI) - DYNAMIC AGE-APPROPRIATE CURRICULUM
  // =========================================================================
  if (normSub.includes('hindi') || normSub.includes('hin')) {
    const hindiMCQ = [
      { text: 'नीचे दिए गए शब्दों में से सही वर्तनी (शुद्ध शब्द) को चुनिए:', opts: { optA: 'विद्यालय', optB: 'विदयालय', optC: 'विदालय', optD: 'विद्द्यालय' }, ans: '(A) विद्यालय' },
      { text: '"फूल" शब्द का सही पर्यायवाची शब्द कौन सा है?', opts: { optA: 'सुमन', optB: 'पवन', optC: 'गगन', optD: 'जलज' }, ans: '(A) सुमन' },
      { text: '"बड़ा" शब्द का सही विलोम (उलटा अर्थ वाला) शब्द क्या होगा?', opts: { optA: 'छोटा', optB: 'मोटा', optC: 'नाटा', optD: 'लंबा' }, ans: '(A) छोटा' },
      { text: 'नीचे दिए गए वाक्यों में से "संज्ञा" शब्द पहचानिए:\n"मोहन गेंद से खेल रहा है।"', opts: { optA: 'मोहन और गेंद', optB: 'खेल रहा', optC: 'से', optD: 'है' }, ans: '(A) मोहन और गेंद' },
      { text: '"किताब" शब्द का बहुवचन रूप क्या होगा?', opts: { optA: 'किताबें', optB: 'किताबों', optC: 'किताबी', optD: 'किताबा' }, ans: '(A) किताबें' },
      { text: '"मोर" का स्त्रीलिंग शब्द क्या होगा?', opts: { optA: 'मोरनी', optB: 'शेरनी', optC: 'हथिनी', optD: 'चिड़िया' }, ans: '(A) मोरनी' },
      { text: 'जो जूते बनाता या ठीक करता है, उसे क्या कहते हैं?', opts: { optA: 'मोची', optB: 'बढ़ई', optC: 'दर्जी', optD: 'कुम्हार' }, ans: '(A) मोची' },
      { text: '"दिन" का विलोम शब्द क्या है?', opts: { optA: 'रात', optB: 'सुबह', optC: 'शाम', optD: 'दोपहर' }, ans: '(A) रात' }
    ];

    const hindiShort = [
      { text: 'निम्नलिखित शब्दों के दो-दो पर्यायवाची शब्द लिखिए:\n(i) सूर्य &nbsp;&nbsp;&nbsp;&nbsp; (ii) पानी', ans: '(i) सूर्य: रवि, सूरज\n(ii) पानी: जल, नीर' },
      { text: 'दिए गए शब्दों से अर्थपूर्ण वाक्य बनाइए:\n(i) तिरंगा &nbsp;&nbsp;&nbsp;&nbsp; (ii) परिश्रम', ans: '(i) तिरंगा हमारे देश का राष्ट्रीय ध्वज है।\n(ii) परिश्रम करने से सफलता मिलती है।' },
      { text: 'नीचे लिखे वाक्यों में रेखांकित सर्वनाम शब्द पहचानकर लिखिए:\n(i) वह कल दिल्ली जाएगा।\n(ii) हम सब मिलकर पढ़ाई करते हैं।', ans: '(i) वह (ii) हम' },
      { text: 'वचन बदलो:\n(i) लड़का - _______\n(ii) चिड़िया - _______', ans: '(i) लड़के (ii) चिड़ियाँ' }
    ];

    const hindiLong = [
      { text: 'अपनी पाठ्यपुस्तक की किसी मनपसंद कविता की चार पंक्तियाँ सुंदर अक्षरों में लिखिए और कवि का नाम बताइए।', ans: 'विद्यार्थी द्वारा अपनी पाठ्यपुस्तक की कविता की चार पंक्तियाँ शुद्ध सुलेख में लिखी जानी हैं।' },
      { text: '"मेरा प्रिय मित्र" अथवा "मेरा विद्यालय" विषय पर 5 सुंदर और शुद्ध वाक्य लिखिए।', ans: 'विषय से संबंधित 5 शुद्ध वाक्य लिखना।' }
    ];

    const questions: FullGeneratedQuestion[] = [];
    let qCount = 1;

    shuffleArray(hindiMCQ).slice(0, 6).forEach(q => {
      questions.push({ qNum: qCount++, section: 'A', marks: 1, text: q.text, options: q.opts, answerKey: q.ans });
    });

    shuffleArray(hindiShort).slice(0, 4).forEach(q => {
      questions.push({ qNum: qCount++, section: 'B', marks: 2, text: q.text, answerKey: q.ans });
    });

    shuffleArray(hindiLong).slice(0, 2).forEach(q => {
      questions.push({ qNum: qCount++, section: 'C', marks: 3, text: q.text, answerKey: q.ans });
    });

    return {
      questions,
      totalMarks: 20,
      instructions: [
        'सभी प्रश्न अनिवार्य हैं।',
        'उत्तर सुंदर और स्पष्ट लिखावट में लिखिए।',
        'प्रश्नों के अंक उनके सामने अंकित हैं।'
      ]
    };
  }

  // =========================================================================
  // 3. CLASS 12 YOGA (CODE 841) - TRUE RANDOMIZED VARIATIONS
  // =========================================================================
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
      qNum: qCount++,
      section: 'C',
      marks: 3,
      text: 'Describe the stepwise technique, breathing synchronization, and anatomical benefits of Bhujangasana (Cobra Pose).',
      answerKey: 'Lie prone, palms under shoulders, inhale and gently arch thoracic spine upwards while keeping navel grounded.'
    });

    questions.push({
      qNum: qCount++,
      section: 'D',
      marks: 5,
      text: 'Case Study: Workplace Psychosomatic Stress.\nDesign a comprehensive 30-minute Yogic routine for corporate professionals suffering from postural fatigue, cervical strain, and chronic anxiety.',
      answerKey: 'Structure: 5 min Sukshma Vyayama (neck/shoulder rolls), 10 min restorative asanas (Tadasana, Vakrasana, Bhujangasana), 10 min Pranayama (Nadi Shodhana, Bhramari), 5 min Shavasana relaxation.'
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

  // =========================================================================
  // 4. CLASS 12 COMPUTER SCIENCE (CODE 083) - TRUE DYNAMIC RANDOM POOLS
  // =========================================================================
  const numInt = getRandomChoice([32, 45, 64, 78, 91, 108]);
  const strWord = getRandomChoice(['the Truth', 'data Stream', 'cyber Realm', 'cloud Vault', 'matrix Space']);
  const listLen = getRandomChoice([5, 6, 7, 8, 9]);

  const poolQ1 = [
    { text: `State True or False:\nIn Python, data type of ${numInt} is same as the data type of ${numInt}.0.`, ans: `False. ${numInt} is of type int while ${numInt}.0 is of type float.` },
    { text: 'State True or False:\nIn Python, dictionary keys must belong to immutable data types.', ans: 'True. Keys must be hashable and immutable.' },
    { text: 'State True or False:\nTuple slicing in Python creates a new tuple and does not modify the original tuple.', ans: 'True. Tuples are immutable.' }
  ];

  const poolQ2 = [
    { text: 'Identify the output of the following code snippet:', code: `s = "${strWord}"\nprint(s.capitalize())`, opts: { optA: strWord.toLowerCase(), optB: strWord.toUpperCase(), optC: strWord[0].toUpperCase() + strWord.slice(1).toLowerCase(), optD: strWord }, ans: `(C) ${strWord[0].toUpperCase() + strWord.slice(1).toLowerCase()}` },
    { text: 'Identify the output of the following code snippet:', code: 's = "cbse EXAM 2026"\nprint(s.title())', opts: { optA: 'Cbse Exam 2026', optB: 'CBSE EXAM 2026', optC: 'cbse exam 2026', optD: 'Cbse exam 2026' }, ans: '(A) Cbse Exam 2026' },
    { text: 'Identify the output of the following code snippet:', code: 's = "Pygame"\nprint(s[-1:1:-1])', opts: { optA: 'emag', optB: 'emagP', optC: 'game', optD: 'ag' }, ans: '(A) emag' }
  ];

  const poolQ3 = [
    { text: 'Which of the following expressions in Python evaluates to True?', opts: { optA: '2 > 3 and 2 < 3', optB: '3 > 1 and 2 == 5', optC: '3 > 1 and 3 > 2', optD: '3 > 1 and 3 < 2' }, ans: '(C) 3 > 1 and 3 > 2' },
    { text: 'Which of the following logical expressions in Python evaluates to False?', opts: { optA: 'bool([])', optB: 'bool("False")', optC: 'bool([0])', optD: 'bool(1)' }, ans: '(A) bool([])' }
  ];

  const poolQ4 = [
    { text: 'What is the output of the following code snippet?', code: "s = 'War and Peace by Leo Tolstoy'\nprint(s.partition('by'))", opts: { optA: "('War and Peace ', 'by', ' Leo Tolstoy')", optB: "['War and Peace ', 'by', ' Leo Tolstoy']", optC: "('War and Peace ', ' Leo Tolstoy')", optD: "['War and Peace ', ' Leo Tolstoy']" }, ans: "(A)" },
    { text: 'What is the output of the following code snippet?', code: "s = 'AI-ROBOTICS-PYTHON'\nprint(s.split('-', 1))", opts: { optA: "['AI', 'ROBOTICS-PYTHON']", optB: "['AI', 'ROBOTICS', 'PYTHON']", optC: "('AI', 'ROBOTICS-PYTHON')", optD: "['AI-ROBOTICS', 'PYTHON']" }, ans: "(A)" }
  ];

  const poolQ5 = [
    { text: 'What will be the output of the following statement?', code: 'print("PythonProgram"[-1:2:-2])', ans: 'Output: "mrorP"' },
    { text: 'What will be the output of the following statement?', code: 'print("DataScience"[1:9:3])', ans: 'Output: "atc"' }
  ];

  const poolQ6 = [
    { text: 'What will be the output of the following code snippet?', code: "t = tuple('tuple')\nt2 = t[2],\nt += t2\nprint(t)", opts: { optA: "('tuple')", optB: "('tuple', 'p')", optC: "('t', 'u', 'p', 'l', 'e', 'p')", optD: "('t', 'u', 'p', 'l', 'e')" }, ans: "(C)" },
    { text: 'What will be the output of the following code snippet?', code: "t = (10, 20, 30)\nt = t * 2\nprint(len(t))", opts: { optA: "3", optB: "6", optC: "9", optD: "Error" }, ans: "(B) 6" }
  ];

  const poolQ7 = [
    { text: 'Which of the following statements is true about dictionaries in Python?', opts: { optA: 'A dictionary is an example of sequence datatype.', optB: 'A dictionary cannot have two elements with same key.', optC: 'A dictionary cannot have two elements with same value.', optD: 'The key and value of an element cannot be the same.' }, ans: '(B)' },
    { text: 'Which dictionary method returns all key-value pairs as a sequence of tuples?', opts: { optA: 'd.items()', optB: 'd.values()', optC: 'd.keys()', optD: 'd.tuples()' }, ans: '(A) d.items()' }
  ];

  const poolQ8 = [
    { text: `If L is a list with ${listLen} elements, then which of the following statements will raise an exception?`, opts: { optA: 'L.pop(1)', optB: `L.pop(${listLen})`, optC: 'L.insert(1, 6)', optD: 'L.insert(6, 1)' }, ans: `(B) L.pop(${listLen})` },
    { text: 'If L is a list of 4 elements [10, 20, 30, 40], which statement raises an IndexError?', opts: { optA: 'L[0]', optB: 'L[-4]', optC: 'L[4]', optD: 'L.pop()' }, ans: '(C) L[4]' }
  ];

  const poolQ9 = [
    { text: 'What will be the output of the following code?', code: "def f1(a, b=1):\n    print(a + b, end='-')\nc = f1(1, 2)\nprint(c, sep='*')", opts: { optA: '3-2', optB: '3-2*', optC: '3-None', optD: '3*None-' }, ans: '(C) 3-None' },
    { text: 'What will be the output of the following code?', code: "def Multiply(x, y=5):\n    return x * y\nprint(Multiply(4))", opts: { optA: '20', optB: '4', optC: '5', optD: 'None' }, ans: '(A) 20' }
  ];

  const poolQ10 = [
    { text: 'Consider the statement given below:\nf1 = open("pqr.dat", "____")\nWhich of the following is the correct file mode to open the file in read only binary mode?', opts: { optA: 'a', optB: 'rb', optC: 'r+', optD: 'rb+' }, ans: '(B) rb' },
    { text: 'Which file mode in Python opens a file for writing in binary format, overwriting existing data?', opts: { optA: 'wb', optB: 'rb', optC: 'ab', optD: 'w+' }, ans: '(A) wb' }
  ];

  const poolQ11 = [
    { text: 'State whether the following statement is True or False:\nIn Python, Logical errors can be handled using try...except...finally statement.', ans: 'False.' },
    { text: 'State whether the following statement is True or False:\nZeroDivisionError is raised when the second argument of a division or modulo operation is zero.', ans: 'True.' }
  ];

  const poolQ12 = [
    { text: 'A table has two candidate keys, one of which is chosen as the primary key. How many alternate keys does this table have?', opts: { optA: '0', optB: '1', optC: '2', optD: '3' }, ans: '(B) 1' },
    { text: 'A relation with 3 candidate keys has 1 primary key chosen. How many alternate keys exist?', opts: { optA: '1', optB: '2', optC: '3', optD: '4' }, ans: '(B) 2' }
  ];

  const poolQ13 = [
    { text: 'Which of the following SQL command can change the degree of the existing relation?', opts: { optA: 'DROP TABLE', optB: 'ALTER TABLE', optC: 'UPDATE...SET', optD: 'DELETE' }, ans: '(B) ALTER TABLE' },
    { text: 'Which SQL command permanently removes all tuples from a table while keeping the structure intact?', opts: { optA: 'DELETE FROM', optB: 'DROP TABLE', optC: 'ALTER TABLE', optD: 'REMOVE' }, ans: '(A) DELETE FROM' }
  ];

  const poolQ14 = [
    { text: 'What will be the output of the query?\nSELECT MACHINE_ID, MACHINE_NAME FROM INVENTORY WHERE QUANTITY <= 100;', opts: { optA: 'All columns of INVENTORY table with quantity greater than 100', optB: 'ID and name of machines with quantity less than 100 from INVENTORY table', optC: 'All columns of INVENTORY table with quantity greater than or equal to 100', optD: 'ID and name of machines with quantity less than or equal to 100 from INVENTORY table.' }, ans: '(D)' },
    { text: 'What is the output of query: SELECT COUNT(DISTINCT City) FROM Student;', opts: { optA: 'Counts unique non-null city values', optB: 'Counts all cities including duplicates', optC: 'Lists cities', optD: 'Throws syntax error' }, ans: '(A)' }
  ];

  const poolQ15 = [
    { text: 'A relation in MySQL database consists of 2 tuples and 3 attributes. If 2 attributes are deleted and 4 tuples are added, what will be the cardinality of the relation?', opts: { optA: '4', optB: '5', optC: '6', optD: '7' }, ans: '(C) 6' },
    { text: 'A relation has 4 tuples and 5 attributes. If 2 tuples are removed and 1 attribute is added, what will be degree and cardinality?', opts: { optA: 'Degree: 6, Cardinality: 2', optB: 'Degree: 2, Cardinality: 6', optC: 'Degree: 5, Cardinality: 2', optD: 'Degree: 4, Cardinality: 4' }, ans: '(A) Degree: 6, Cardinality: 2' }
  ];

  const poolQ16 = [
    { text: 'Which aggregate function in SQL returns the smallest value from a column in a table?', opts: { optA: 'MIN()', optB: 'MAX()', optC: 'SMALL()', optD: 'LOWER()' }, ans: '(A) MIN()' },
    { text: 'Which aggregate function in SQL calculates the arithmetic mean of numeric column values?', opts: { optA: 'AVG()', optB: 'MEAN()', optC: 'COUNT()', optD: 'SUM()' }, ans: '(A) AVG()' }
  ];

  const poolQ17 = [
    { text: 'With respect to computer networks, which of the following is the correct expanded form of RJ 45?', opts: { optA: 'Radio Jockey 45', optB: 'Registered Jockey 45', optC: 'Radio Jack 45', optD: 'Registered Jack 45' }, ans: '(D) Registered Jack 45' },
    { text: 'Which connector is standardly used with unshielded twisted pair (UTP) Ethernet network cables?', opts: { optA: 'RJ-45', optB: 'BNC', optC: 'USB-C', optD: 'VGA' }, ans: '(A) RJ-45' }
  ];

  const poolQ18 = [
    { text: 'Which network device serves as the entry and exit point of a network, routing all incoming and outgoing data between dissimilar protocols?', opts: { optA: 'Modem', optB: 'Gateway', optC: 'Switch', optD: 'Repeater' }, ans: '(B) Gateway' },
    { text: 'Which network device amplifies weak signals over long transmission distances to prevent attenuation?', opts: { optA: 'Repeater', optB: 'Hub', optC: 'Switch', optD: 'Bridge' }, ans: '(A) Repeater' }
  ];

  const poolQ19 = [
    { text: 'Expand the term XML.', opts: { optA: 'Extensible Markup Language', optB: 'Extended Media Link', optC: 'External Markup Link', optD: 'Expressive Machine Language' }, ans: '(A) Extensible Markup Language' },
    { text: 'Expand the term VoIP in computer networks.', opts: { optA: 'Voice over Internet Protocol', optB: 'Video on Internet Protocol', optC: 'Voice online IP', optD: 'Visual Internet Protocol' }, ans: '(A) Voice over Internet Protocol' }
  ];

  const poolQ20 = [
    { text: "Assertion (A): [1, 2, 3] + '123' is an invalid expression in Python.\nReason (R): In Python, a list cannot be concatenated with a string.", opts: { optA: 'Both (A) and (R) are true and (R) is correct explanation for (A).', optB: 'Both (A) and (R) are true but (R) is not correct explanation.', optC: '(A) is true, but (R) is false.', optD: '(A) is false, but (R) is true.' }, ans: '(A)' },
    { text: "Assertion (A): Python strings are immutable.\nReason (R): Modifying an individual character in a string using assignment raises a TypeError.", opts: { optA: 'Both (A) and (R) are true and (R) is correct explanation for (A).', optB: 'Both (A) and (R) are true but (R) is not correct explanation.', optC: '(A) is true, but (R) is false.', optD: '(A) is false, but (R) is true.' }, ans: '(A)' }
  ];

  const poolQ21 = [
    { text: 'Assertion (A): The PRIMARY KEY constraint in SQL ensures that each value in the column(s) is unique and cannot be NULL.\nReason (R): Candidate keys are not eligible to become a primary key.', opts: { optA: 'Both (A) and (R) are true and (R) is correct explanation for (A).', optB: 'Both (A) and (R) are true but (R) is not correct explanation.', optC: '(A) is true, but (R) is false.', optD: '(A) is false, but (R) is true.' }, ans: '(C)' },
    { text: 'Assertion (A): A database table can have only one Primary Key.\nReason (R): A Primary Key can be composed of multiple columns as a Composite Primary Key.', opts: { optA: 'Both (A) and (R) are true and (R) is correct explanation for (A).', optB: 'Both (A) and (R) are true but (R) is not correct explanation.', optC: '(A) is true, but (R) is false.', optD: '(A) is false, but (R) is true.' }, ans: '(B)' }
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
      answerKey: 'Positional parameters must match the number and order of arguments. Default parameters provide fallback values if arguments are omitted.\nExample: def Calc(p, r, t=2):'
    },
    {
      qNum: 23, section: 'B', marks: 2,
      text: 'Write a Python statement to perform the following tasks: (USE BUILT_IN FUNCTIONS/METHODS ONLY)\n(i) To create a new list L1 containing the elements of list L arranged in ascending order, without modifying list L.\n(ii) A statement to check whether the given character, ch is an alphabet or a number.',
      answerKey: '(i) L1 = sorted(L)\n(ii) ch.isalnum()'
    },
    {
      qNum: 24, section: 'B', marks: 2,
      text: "Assuming that D1 is a dictionary in Python,\n(i) (a) Write a Python expression to check if the key, 'RNO' is present in D1.\nOR\n(b) Write a Python expression to check if any key in D1 has a value 12.\n(ii) (a) Write a single statement using a BUILT_IN function to add the key:value pair 'RNo': 12, if 'RNo' is not present in D1; if present, return its value.\nOR\n(b) Write a single statement to delete all elements from D1.",
      answerKey: "(i)(a) 'RNO' in D1  OR  (b) 12 in D1.values()\n(ii)(a) D1.setdefault('RNo', 12)  OR  (b) D1.clear()"
    },
    {
      qNum: 25, section: 'B', marks: 2,
      text: 'What possible output(s) from the given options will NOT be displayed when the following code is executed? Also, mention for how many iterations the for loop will run?',
      codeBlock: "import random\na = [1, 2, 3, 4, 5, 6]\nfor i in range(4):\n    j = random.randrange(i, 5)\n    print(a[j], end='-')\nprint()",
      options: { optA: '3-4-5-4-', optB: '2-2-4-5-', optC: '4-3-3-5-', optD: '5-1-2-4-' },
      answerKey: 'Option (D) will NOT be displayed because j cannot be lower than i in later iterations. Loop runs 4 iterations.'
    },
    {
      qNum: 26, section: 'B', marks: 2,
      text: 'The function given below is written to accept a string s as a parameter and return the number of vowels appearing in the string. The code has certain errors. Observe the code carefully and rewrite it after removing all logical and syntax errors. Underline all corrections made:',
      codeBlock: "def CountVowels(s):\n    c = 0\n    for ch in range(s):\n        if 'aeiouAEIOU' in ch:\n            c =+ 1\n    return (ch)",
      answerKey: "def CountVowels(s):\n    c = 0\n    for ch in s:                 # Correction 1: iterate over s, not range(s)\n        if ch in 'aeiouAEIOU':     # Correction 2: check if ch is in vowels\n            c += 1               # Correction 3: increment += 1\n    return c                     # Correction 4: return count c"
    },
    {
      qNum: 27, section: 'B', marks: 2,
      text: 'Ms. Zoya is creating a table W_STOCK with fields: W_Code CHAR(5) Primary Key, W_Description VARCHAR(20), B_Qty INTEGER, U_Price FLOAT.\n(i) Write SQL command to create the table W_STOCK.\n(ii) Write SQL command to add an attribute E_Date (DATE type) to the table W_STOCK.',
      answerKey: '(i) CREATE TABLE W_STOCK(W_Code CHAR(5) PRIMARY KEY, W_Description VARCHAR(20), B_Qty INT, U_Price FLOAT);\n(ii) ALTER TABLE W_STOCK ADD E_Date DATE;'
    },
    {
      qNum: 28, section: 'B', marks: 2,
      text: '(a) List one advantage and one disadvantage of Bus topology.\nOR\n(b) What is protocol in the context of computer networks? Which protocol is used to transmit hypertext across the web?',
      answerKey: '(a) Advantage: Easy installation, cost-effective cabling. Disadvantage: Entire network down if central backbone cable fails.\n(b) Protocol is standard rule set. Protocol: HTTP / HTTPS.'
    }
  ];

  const sectionCQuestions: FullGeneratedQuestion[] = [
    {
      qNum: 29, section: 'C', marks: 3,
      text: 'Write a Python function that counts and returns the number of digits appearing in the text file "Space.txt".\nOR\nWrite a Python function that displays the words in which lowercase letter "e" appears at least twice in text file "Space.txt".',
      answerKey: 'def CountDigits():\n    c = 0\n    with open("Space.txt", "r") as f:\n        for ch in f.read():\n            if ch.isdigit():\n                c += 1\n    return c'
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
      answerKey: '(i) ACADEMIC Block (maximum computers: 600, 80-20 rule).\n(ii) Star layout centered at ACADEMIC Block.\n(iii) Twisted Pair Cable (Cat6) and Coaxial Cable.\n(iv) Radio Waves.\n(v) VoIP (Voice over Internet Protocol) OR Repeater between HOSTEL and SPORTS.'
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
