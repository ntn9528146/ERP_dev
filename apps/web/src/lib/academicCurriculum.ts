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
  { id: 'c11-sci', name: 'Class 11 (Science)', availableSubjects: ['Physics (Code 042)', 'Chemistry (Code 043)', 'Mathematics (Code 041)', 'Computer Science (Code 083)', 'Informatics Practices (Code 065)', 'Biology (Code 044)', 'Yoga (Code 841)', 'English Core (Code 301)', 'Physical Education (Code 048)'] },
  { id: 'c11-comm', name: 'Class 11 (Commerce)', availableSubjects: ['Accountancy (Code 055)', 'Business Studies (Code 054)', 'Economics (Code 030)', 'Mathematics (Code 041)', 'Informatics Practices (Code 065)', 'Computer Science (Code 083)', 'Yoga (Code 841)', 'English Core (Code 301)'] },
  { id: 'c11-hum', name: 'Class 11 (Humanities)', availableSubjects: ['History (Code 027)', 'Political Science (Code 028)', 'Geography (Code 029)', 'Economics (Code 030)', 'Informatics Practices (Code 065)', 'Yoga (Code 841)', 'Hindi Core (Code 302)', 'English Core (Code 301)'] },
  { id: 'c12-sci', name: 'Class 12 (Science)', availableSubjects: ['Computer Science (Code 083)', 'Physics (Code 042)', 'Chemistry (Code 043)', 'Mathematics (Code 041)', 'Informatics Practices (Code 065)', 'Biology (Code 044)', 'Yoga (Code 841)', 'English Core (Code 301)', 'Physical Education (Code 048)'] },
  { id: 'c12-comm', name: 'Class 12 (Commerce)', availableSubjects: ['Accountancy (Code 055)', 'Business Studies (Code 054)', 'Economics (Code 030)', 'Mathematics (Code 041)', 'Informatics Practices (Code 065)', 'Computer Science (Code 083)', 'Yoga (Code 841)', 'English Core (Code 301)'] },
  { id: 'c12-hum', name: 'Class 12 (Humanities)', availableSubjects: ['History (Code 027)', 'Political Science (Code 028)', 'Geography (Code 029)', 'Economics (Code 030)', 'Informatics Practices (Code 065)', 'Yoga (Code 841)', 'English Core (Code 301)', 'Hindi Core (Code 302)'] }
];

export const ACADEMIC_CLASSES = ALL_CBSE_CLASSES;

export const DETAILED_SYLLABUS_2026_27: Record<string, SubjectCurriculum> = {
  // CLASS 10 INFORMATION TECHNOLOGY (CODE 402) - OFFICIAL CBSE CURRICULUM
  'Information Technology (402)': {
    name: 'Information Technology',
    code: '402',
    theoryMarks: 50,
    practicalMarks: 50,
    units: [
      {
        unitTitle: 'Part A: Employability Skills (Unit 1 to 5)',
        subTopics: [
          'Unit 1: Communication Skills-II (Verbal, Non-verbal & Feedback loop)',
          'Unit 2: Self-Management Skills-II (Stress management techniques & Self-regulation)',
          'Unit 3: ICT Skills-II (Operating systems, File maintenance & Internet hygiene)',
          'Unit 4: Entrepreneurial Skills-II (Characteristics, Myths & Role in society)',
          'Unit 5: Green Skills-II (Sustainable development goals & Green economy)'
        ],
        experiments: [
          {
            expId: 'IT-EMP-01',
            title: 'Role play and case analysis on professional business communication and email etiquette',
            unitRef: 'Part A (Communication Skills)',
            vivaQueries: [
              { q: 'What are the 7 Cs of effective communication?', a: 'Clear, Concise, Concrete, Correct, Coherent, Complete, and Courteous.' }
            ]
          }
        ]
      },
      {
        unitTitle: 'Part B - Unit 1: Digital Documentation (Advanced)',
        subTopics: [
          'Create and Apply Styles in LibreOffice Writer / MS Word',
          'Insert and Format Images, Shapes, Grouping and Positioning',
          'Create and Customize Table of Contents (ToC) with Hierarchy',
          'Implement Mail Merge with External Data Source Recipient Lists'
        ],
        experiments: [
          {
            expId: 'IT-DOC-01',
            title: 'Design an institutional newsletter applying custom Heading styles and auto-generated Table of Contents',
            unitRef: 'Part B Unit 1',
            vivaQueries: [
              { q: 'Difference between Paragraph Style and Character Style?', a: 'Paragraph style applies to the entire block of text, whereas Character style applies to individual words or selected letters.' }
            ]
          },
          {
            expId: 'IT-DOC-02',
            title: 'Generate personalized examination admit cards for 50 students using Mail Merge wizard',
            unitRef: 'Part B Unit 1',
            vivaQueries: [
              { q: 'What is a Data Source in Mail Merge?', a: 'A structured file (like spreadsheet, CSV, or database table) containing recipient variable records.' }
            ]
          }
        ]
      },
      {
        unitTitle: 'Part B - Unit 2: Electronic Spreadsheet (Advanced)',
        subTopics: [
          'Analyze Data using Scenarios, Goal Seek and Solver',
          'Consolidate Data from Multiple Worksheets and External Files',
          'Link Spreadsheet Data across Workbooks using Hyperlinks and References',
          'Create, Record and Edit Macros to Automate Repetitive Calculations'
        ],
        experiments: [
          {
            expId: 'IT-CALC-01',
            title: 'Perform Goal Seek analysis to calculate required semester exam marks to achieve 85% aggregate',
            unitRef: 'Part B Unit 2',
            vivaQueries: [
              { q: 'What is Goal Seek in spreadsheets?', a: 'A what-if analysis tool that calculates the input value required to achieve a designated target output.' }
            ]
          }
        ]
      },
      {
        unitTitle: 'Part B - Unit 3: Database Management System (DBMS)',
        subTopics: [
          'Relational Database Concepts, Primary Key and Composite Keys',
          'Create Tables in Design View and SQL DDL Commands',
          'Execute SQL Queries (SELECT, WHERE, ORDER BY, UPDATE, DELETE)',
          'Create Forms and Generate Formatted Academic / Fee Reports'
        ],
        experiments: [
          {
            expId: 'IT-DBMS-01',
            title: 'Create a student marks ledger table, enforce Primary Key constraint, and run filtering queries',
            unitRef: 'Part B Unit 3',
            vivaQueries: [
              { q: 'Why is Primary Key compulsory in database design?', a: 'To uniquely identify each record in a relation and prevent duplicate tuples.' }
            ]
          }
        ]
      },
      {
        unitTitle: 'Part B - Unit 4: Web Applications and Security',
        subTopics: [
          'Working with Accessibility Options on Operating Systems',
          'Networking Fundamentals: Client-Server, P2P, LAN, WAN, Wi-Fi',
          'Instant Messaging, Online Transactions and Blog Publishing',
          'Workplace Cyber Safety, Phishing, Strong Password Policies & Firewalls'
        ],
        experiments: [
          {
            expId: 'IT-SEC-01',
            title: 'Inspect browser security certificates, configure browser privacy settings and multi-factor authentication',
            unitRef: 'Part B Unit 4',
            vivaQueries: [
              { q: 'What is the role of HTTPS over HTTP?', a: 'HTTPS encrypts data transferred between browser and server using SSL/TLS protocol.' }
            ]
          }
        ]
      }
    ]
  },

  // CLASS 3 HINDI (VEENA) - OFFICIAL CBSE CURRICULUM
  'Hindi (Veena)': {
    name: 'Hindi',
    code: 'HIN-03',
    theoryMarks: 50,
    practicalMarks: 50,
    units: [
      {
        unitTitle: 'इकाई 1: बाल कविताएँ और वाचन (हम सब सुमन एक उपवन के, सीखो)',
        subTopics: [
          'सस्वर कविता पाठ और भाव ग्रहण',
          'समान तुक वाले शब्द (Rhyming Words)',
          'कठिन शब्दार्थ एवं नए वाक्यों की रचना'
        ],
        experiments: [
          {
            expId: 'HIN-EXP-01',
            title: 'सुलेख एवं कविता का हाव-भाव सहित मौखिक वाचन',
            unitRef: 'इकाई 1',
            vivaQueries: [
              { q: 'सुमन शब्द का क्या अर्थ है?', a: 'सुमन का अर्थ फूल या पुष्प होता है।' }
            ]
          }
        ]
      },
      {
        unitTitle: 'इकाई 2: कहानियाँ एवं बोध (शेर और खरगोश, बुद्धिमान हंस)',
        subTopics: [
          'कहानी पठन एवं पात्रों की समझ',
          'प्रश्नोत्तर लेखन एवं सत्य-असत्य कथन',
          'कहानी से मिलने वाली नैतिक शिक्षा'
        ]
      },
      {
        unitTitle: 'इकाई 3: व्यावहारिक व्याकरण (संज्ञा, सर्वनाम, विलोम, वचन)',
        subTopics: [
          'संज्ञा की पहचान (व्यक्ति, वस्तु, स्थान)',
          'सर्वनाम शब्दों का प्रयोग (मैं, हम, तुम, वह)',
          'विलोम शब्द (दिन-रात, बड़ा-छोटा, सुख-दुख)',
          'एकवचन और बहुवचन (लड़का-लड़के, किताब-किताबें)',
          'लिंग बदलो (राजा-रानी, मोर-मोरनी)'
        ]
      },
      {
        unitTitle: 'इकाई 4: रचनात्मक लेखन (चित्र वर्णन एवं मेरी प्रिय ऋतु / मेरा प्रिय मित्र)',
        subTopics: [
          'दिए गए चित्र को देखकर 5 सरल वाक्य लिखना',
          'मेरी प्रिय पुस्तक / मेरा विद्यालय पर लघु अनुच्छेद'
        ]
      }
    ]
  },

  // CLASS 12 COMPUTER SCIENCE (CODE 083)
  'Computer Science (Code 083)': {
    name: 'Computer Science',
    code: '083',
    theoryMarks: 70,
    practicalMarks: 30,
    units: [
      {
        unitTitle: 'Unit I: Computational Thinking and Programming - 2',
        subTopics: [
          'Revision of Python Basics, Flow of Control & Strings',
          'Functions: Scope, Parameter Passing & Default Arguments',
          'File Handling: Text, Binary (pickle module), and CSV Operations',
          'Data Structures: Implementation of Linear Stack using Lists'
        ],
        experiments: [
          {
            expId: 'CS-EXP-01',
            title: 'Read a text file line-by-line and display words having character length greater than 4',
            unitRef: 'Unit I (File Handling)',
            vivaQueries: [
              { q: 'What is the purpose of strip() vs split() method?', a: 'strip() removes leading/trailing whitespaces, whereas split() breaks string into tokens.' }
            ]
          },
          {
            expId: 'CS-EXP-02',
            title: 'Binary File Handling: Store student dictionary records using pickle.dump() and search using pickle.load()',
            unitRef: 'Unit I (Pickle)',
            vivaQueries: [
              { q: 'What is Serialization in Python?', a: 'Converting a Python object hierarchy into a byte stream for storage.' }
            ]
          },
          {
            expId: 'CS-EXP-03',
            title: 'Stack Implementation: Menu-driven Push and Pop operations for book details',
            unitRef: 'Unit I (Data Structures)',
            vivaQueries: [
              { q: 'Explain LIFO principle in Stack.', a: 'Last-In-First-Out: element inserted last is removed first.' }
            ]
          }
        ]
      },
      {
        unitTitle: 'Unit II: Computer Networks',
        subTopics: [
          'Evolution of Networking, Switching Techniques & Topologies (Star, Bus, Tree)',
          'Transmission Media (Twisted pair, Co-axial, Fiber Optic, Radio, Micro, Satellite)',
          'Network Devices: NIC, Repeater, Hub, Switch, Bridge, Gateway, Router',
          'Network Protocols: TCP/IP, FTP, PPP, HTTP, HTTPS, SMTP, POP3, VoIP'
        ]
      },
      {
        unitTitle: 'Unit III: Database Management & SQL Integration',
        subTopics: [
          'Relational Model, Primary Key, Candidate Key, Foreign Key',
          'SQL DDL/DML: CREATE, ALTER, INSERT, UPDATE, DELETE, SELECT',
          'SQL Functions: SUM(), AVG(), COUNT(), MAX(), MIN(), GROUP BY, HAVING',
          'Python Database Connectivity: mysql.connector and execute queries'
        ]
      }
    ]
  },

  // CLASS 12 YOGA (CODE 841)
  'Yoga (Code 841)': {
    name: 'Yoga',
    code: '841',
    theoryMarks: 50,
    practicalMarks: 50,
    units: [
      {
        unitTitle: 'Unit 1: Introduction to Yoga and Yogic Practices – II',
        subTopics: [
          'Shatkarma: Meaning, Purpose and Significance in Hatha Yoga',
          'Yogasana: Principles, Physical Alignment & Health Benefits',
          'Pranayama (Anulom-Vilom, Bhastrika, Sheetali) & Dhyana'
        ],
        experiments: [
          {
            expId: 'YOG-EXP-01',
            title: 'Demonstration of Surya Namaskara (12 Steps) with Breathing Synchronization and Mantras',
            unitRef: 'Unit 1 (Asana Practice)',
            vivaQueries: [
              { q: 'What are the physiological benefits of Bhujangasana?', a: 'Expands thoracic cavity, strengthens lumbar spine, and stimulates abdominal digestive organs.' }
            ]
          }
        ]
      },
      {
        unitTitle: 'Unit 2: Introduction to Yoga Texts & Mental Well-being',
        subTopics: [
          'Concepts of Mitahara (Diet) according to Hatha Pradipika',
          'Patanjali Ashtanga Yoga: Yama, Niyama, Asana, Pranayama, Pratyahara, Dharana, Dhyana, Samadhi',
          'Yogic Stress Management Frameworks'
        ]
      },
      {
        unitTitle: 'Unit 3: Yoga for Health Promotion – II',
        subTopics: [
          'Introduction to First Aid, CPR & Sports Safety in Yoga',
          'Yogic Management of Chronic Stress & Modern Lifestyle Disorders',
          'Yogic Prevention of Common Ailments (Hypertension, Diabetes, Asthma)'
        ]
      }
    ]
  },

  // CLASS 12 PHYSICS (CODE 042)
  'Physics (Code 042)': {
    name: 'Physics',
    code: '042',
    theoryMarks: 70,
    practicalMarks: 30,
    units: [
      {
        unitTitle: 'Unit I & II: Electrostatics & Current Electricity',
        subTopics: [
          'Electric Charges, Fields & Gauss Law (Integral Form)',
          'Electrostatic Potential & Energy Density: U = ½ ε₀E²',
          'Drift Velocity (v_d = -eEτ/m), Ohm’s Law & Kirchhoff’s Laws',
          'Wheatstone Bridge Condition: P/Q = R/S'
        ],
        experiments: [
          {
            expId: 'PHY-EXP-01',
            title: 'Determine resistivity of two wires by plotting potential difference versus current (Ohm’s Law)',
            unitRef: 'Unit II',
            vivaQueries: [
              { q: 'Why is voltmeter connected in parallel?', a: 'Voltmeter has high resistance to draw minimum current.' }
            ]
          }
        ]
      },
      {
        unitTitle: 'Unit III & IV: Magnetic Effects, EMI & Alternating Currents',
        subTopics: [
          'Biot-Savart Law & Ampere Circuital Law',
          'Faraday’s Law of EMI & Lenz’s Law',
          'AC Series LCR Resonance: f_r = 1 / (2π√(LC)) & Quality Factor Q'
        ]
      },
      {
        unitTitle: 'Unit V & VI: Optics & Optical Instruments',
        subTopics: [
          'Lens Maker’s Formula: 1/f = (μ - 1)(1/R₁ - 1/R₂)',
          'Prism Formula: μ = sin((A + δ_m)/2) / sin(A/2)',
          'Wave Optics: Fringe Width in Young’s Double Slit Experiment'
        ]
      }
    ]
  }
};
