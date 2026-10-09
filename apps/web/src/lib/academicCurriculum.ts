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
  { id: 'c3', name: 'Class 3', availableSubjects: ['English', 'Mathematics', 'Hindi', 'The World Around Us (Science)', 'Computer Applications'] },
  { id: 'c4', name: 'Class 4', availableSubjects: ['English', 'Mathematics', 'Hindi', 'Science Explorer', 'Social Studies', 'Coding & Computer Science'] },
  { id: 'c5', name: 'Class 5', availableSubjects: ['English', 'Mathematics', 'Hindi', 'Science Explorer', 'Social Studies', 'Coding & AI Foundations'] },
  { id: 'c6', name: 'Class 6', availableSubjects: ['English (Poorvi)', 'Mathematics (Ganita)', 'Hindi (Malhar)', 'Science (Curiosity)', 'Social Science', 'Sanskrit (Deepakam)', 'AI & Robotics'] },
  { id: 'c7', name: 'Class 7', availableSubjects: ['English Core', 'Mathematics', 'Hindi Course A', 'General Science', 'Social Science', 'Sanskrit', 'Coding & Robotics'] },
  { id: 'c8', name: 'Class 8', availableSubjects: ['English Core', 'Mathematics', 'Hindi Course A', 'General Science', 'Social Science', 'Sanskrit', 'AI & Robotics'] },
  { id: 'c9', name: 'Class 9', availableSubjects: ['English Language & Literature (184)', 'Mathematics Standard (041)', 'Science (086)', 'Social Science (087)', 'Hindi Course A (002)', 'Information Technology (402)', 'Artificial Intelligence (417)'] },
  { id: 'c10', name: 'Class 10', availableSubjects: ['English Language & Literature (184)', 'Mathematics Standard (041)', 'Mathematics Basic (241)', 'Science (086)', 'Social Science (087)', 'Hindi Course A (002)', 'Information Technology (402)', 'Artificial Intelligence (417)'] },
  { id: 'c11-sci', name: 'Class 11 (Science)', availableSubjects: ['Physics (Code 042)', 'Chemistry (Code 043)', 'Mathematics (Code 041)', 'Computer Science (Code 083)', 'Informatics Practices (Code 065)', 'Biology (Code 044)', 'Yoga (Code 841)', 'English Core (Code 301)', 'Physical Education (Code 048)'] },
  { id: 'c11-comm', name: 'Class 11 (Commerce)', availableSubjects: ['Accountancy (Code 055)', 'Business Studies (Code 054)', 'Economics (Code 030)', 'Mathematics (Code 041)', 'Informatics Practices (Code 065)', 'Computer Science (Code 083)', 'Yoga (Code 841)', 'English Core (Code 301)'] },
  { id: 'c11-hum', name: 'Class 11 (Humanities)', availableSubjects: ['History (Code 027)', 'Political Science (Code 028)', 'Geography (Code 029)', 'Economics (Code 030)', 'Informatics Practices (Code 065)', 'Yoga (Code 841)', 'Hindi Core (Code 302)', 'English Core (Code 301)'] },
  { id: 'c12-sci', name: 'Class 12 (Science)', availableSubjects: ['Physics (Code 042)', 'Chemistry (Code 043)', 'Mathematics (Code 041)', 'Computer Science (Code 083)', 'Informatics Practices (Code 065)', 'Biology (Code 044)', 'Yoga (Code 841)', 'English Core (Code 301)', 'Physical Education (Code 048)'] },
  { id: 'c12-comm', name: 'Class 12 (Commerce)', availableSubjects: ['Accountancy (Code 055)', 'Business Studies (Code 054)', 'Economics (Code 030)', 'Mathematics (Code 041)', 'Informatics Practices (Code 065)', 'Computer Science (Code 083)', 'Yoga (Code 841)', 'English Core (Code 301)'] },
  { id: 'c12-hum', name: 'Class 12 (Humanities)', availableSubjects: ['History (Code 027)', 'Political Science (Code 028)', 'Geography (Code 029)', 'Economics (Code 030)', 'Informatics Practices (Code 065)', 'Yoga (Code 841)', 'English Core (Code 301)', 'Hindi Core (Code 302)'] }
];

export const ACADEMIC_CLASSES = ALL_CBSE_CLASSES;

export const DETAILED_SYLLABUS_2026_27: Record<string, SubjectCurriculum> = {
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
              { q: 'What is the purpose of strip() vs split() method?', a: 'strip() removes leading/trailing whitespaces, whereas split() breaks a string into a list of tokens based on a delimiter.' },
              { q: 'Why is with open(...) preferred over simple open()?', a: 'It guarantees automatic file stream closure even if runtime exceptions are raised.' }
            ]
          },
          {
            expId: 'CS-EXP-02',
            title: 'Binary File Handling: Store student dictionary records using pickle.dump() and search using pickle.load()',
            unitRef: 'Unit I (Pickle)',
            vivaQueries: [
              { q: 'What is Serialization / Pickling in Python?', a: 'Process of converting a Python object hierarchy into a byte stream for permanent persistent storage.' }
            ]
          },
          {
            expId: 'CS-EXP-03',
            title: 'Stack Implementation: Menu-driven Push and Pop operations for book details',
            unitRef: 'Unit I (Data Structures)',
            vivaQueries: [
              { q: 'Explain LIFO principle in Stack.', a: 'Last-In-First-Out: the element inserted last is the first one to be removed via pop().' }
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
        ],
        experiments: [
          {
            expId: 'CS-EXP-04',
            title: 'Network Layout Design: Optimal server placement and cable layout calculation across 4 campus blocks',
            unitRef: 'Unit II (Network Architecture)',
            vivaQueries: [
              { q: 'Where should the main server be placed in a multi-block campus?', a: 'In the block having the maximum number of computers (80-20 rule) to minimize network transit traffic.' }
            ]
          }
        ]
      },
      {
        unitTitle: 'Unit III: Database Management & SQL Integration',
        subTopics: [
          'Relational Model, Primary Key, Candidate Key, Foreign Key',
          'SQL DDL/DML: CREATE, ALTER, INSERT, UPDATE, DELETE, SELECT',
          'SQL Functions: SUM(), AVG(), COUNT(), MAX(), MIN(), GROUP BY, HAVING',
          'Python Database Connectivity: mysql.connector and execute queries'
        ],
        experiments: [
          {
            expId: 'CS-EXP-05',
            title: 'MySQL Integration: Connect Python script with MySQL database and insert/fetch employee tuples',
            unitRef: 'Unit III (Database Connectivity)',
            vivaQueries: [
              { q: 'What is a database cursor object in Python?', a: 'A control structure used to execute SQL queries and iterate over retrieved result sets row by row.' }
            ]
          }
        ]
      }
    ]
  },

  'Informatics Practices (Code 065)': {
    name: 'Informatics Practices',
    code: '065',
    theoryMarks: 70,
    practicalMarks: 30,
    units: [
      {
        unitTitle: 'Unit I: Data Handling using Pandas and Data Visualization',
        subTopics: [
          'Series: Creation from ndarray, dictionary, scalar value; Head and Tail methods',
          'DataFrame: Creation from dictionary of Series, list of dictionaries; loc and iloc indexing',
          'Data Visualization: Line plot, Bar chart, Histogram using Matplotlib library'
        ],
        experiments: [
          {
            expId: 'IP-EXP-01',
            title: 'Create a Pandas DataFrame for student marks and generate a customized Matplotlib Bar Chart',
            unitRef: 'Unit I (Data Visualization)',
            vivaQueries: [
              { q: 'Difference between loc and iloc in Pandas?', a: 'loc performs label-based indexing while iloc performs integer position-based indexing.' }
            ]
          }
        ]
      },
      {
        unitTitle: 'Unit II: Database Query using SQL',
        subTopics: [
          'Math Functions: POWER(), ROUND(), MOD()',
          'Text Functions: UCASE(), LCASE(), MID(), LENGTH(), LEFT(), RIGHT(), TRIM()',
          'Date Functions: NOW(), DATE(), MONTH(), YEAR(), DAYNAME()',
          'Aggregate Functions and Joins (Equi-Join, Natural Join)'
        ],
        experiments: [
          {
            expId: 'IP-EXP-02',
            title: 'Execute SQL Single-Row Date and String manipulation queries on employee records',
            unitRef: 'Unit II (SQL Functions)',
            vivaQueries: [
              { q: 'Difference between COUNT(*) and COUNT(column)?', a: 'COUNT(*) counts all rows including NULLs, whereas COUNT(column) ignores NULL values.' }
            ]
          }
        ]
      },
      {
        unitTitle: 'Unit III: Introduction to Computer Networks & Societal Impacts',
        subTopics: [
          'Web Technologies: URL, Domain name, Web Browsers, Web Servers',
          'Digital Footprints, Net Etiquettes, Cybercrime (Phishing, Identity Theft)',
          'E-waste Management and IT Act 2000'
        ]
      }
    ]
  },

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
          'Drift Velocity (v_d = -eEτ/m), Ohm’s Law & Kirchhoff’s Laws (ΣI = 0, ΣΔV = 0)',
          'Wheatstone Bridge Condition: P/Q = R/S'
        ],
        experiments: [
          {
            expId: 'PHY-EXP-01',
            title: 'Determine resistivity of two wires by plotting a graph of potential difference versus current (Ohm’s Law)',
            unitRef: 'Unit II (Current Electricity)',
            vivaQueries: [
              { q: 'Why is voltmeter connected in parallel and ammeter in series?', a: 'Voltmeter has high resistance to draw minimum current; ammeter has very low resistance so it does not alter circuit current.' },
              { q: 'State factors on which resistance of a conductor depends.', a: 'Directly proportional to length (l), inversely proportional to area (A), and depends on material resistivity (ρ) and temperature.' }
            ]
          },
          {
            expId: 'PHY-EXP-02',
            title: 'Find resistance of a given wire using Metre Bridge and determine the specific resistance of its material',
            unitRef: 'Unit II (Wheatstone Bridge)',
            vivaQueries: [
              { q: 'Why is null point preferred near the center of the metre bridge wire (40-60 cm)?', a: 'To minimize experimental error and achieve maximum sensitivity of the bridge.' }
            ]
          }
        ]
      },
      {
        unitTitle: 'Unit III & IV: Magnetic Effects, EMI & Alternating Currents',
        subTopics: [
          'Biot-Savart Law (dB = (μ₀/4π) · (I dl × r̂)/r²) & Ampere Circuital Law',
          'Faraday’s Law of EMI (ε = -dΦ_B/dt) & Lenz’s Law',
          'AC Series LCR Resonance: f_r = 1 / (2π√(LC)) & Quality Factor Q'
        ],
        experiments: [
          {
            expId: 'PHY-EXP-03',
            title: 'Determine frequency of AC mains using a sonometer and electromagnet',
            unitRef: 'Unit IV (Alternating Currents)',
            vivaQueries: [
              { q: 'What is resonance in a sonometer wire?', a: 'When the natural frequency of the vibrating string matches the driving frequency of the alternating magnetic field.' }
            ]
          }
        ]
      },
      {
        unitTitle: 'Unit V & VI: Optics & Optical Instruments',
        subTopics: [
          'Lens Maker’s Formula: 1/f = (μ - 1)(1/R₁ - 1/R₂)',
          'Prism Formula: μ = sin((A + δ_m)/2) / sin(A/2)',
          'Wave Optics: Fringe Width β = λD/d in Young’s Double Slit Experiment'
        ],
        experiments: [
          {
            expId: 'PHY-EXP-04',
            title: 'Find the focal length of a convex lens by plotting graphs between u and v',
            unitRef: 'Unit VI (Ray Optics)',
            vivaQueries: [
              { q: 'What is index error in an optical bench?', a: 'The difference between actual distance of needle from lens and reading recorded on scale.' }
            ]
          }
        ]
      }
    ]
  },

  'Yoga (Code 841)': {
    name: 'Yoga',
    code: '841',
    theoryMarks: 50,
    practicalMarks: 50,
    units: [
      {
        unitTitle: 'Unit 1 – Introduction to Yoga and Yogic Practices – II',
        subTopics: [
          'Shatkarma: Meaning, Purpose and Significance in Hatha Yoga',
          'Yogasana: Principles, Physical Alignment & Health Benefits',
          'Pranayama (Anulom-Vilom, Bhastrika, Sheetali) & Dhyana'
        ],
        experiments: [
          {
            expId: 'YOG-EXP-01',
            title: 'Demonstration and Vetting of Surya Namaskara (12 Steps) with corresponding Mantras and Breathing Cycle',
            unitRef: 'Unit 1 (Asana Practice)',
            vivaQueries: [
              { q: 'What are the physiological benefits of Bhujangasana?', a: 'Expands thoracic cavity, strengthens lumbar spine, and stimulates abdominal digestive organs.' }
            ]
          }
        ]
      },
      {
        unitTitle: 'Unit 2 – Introduction to Yoga Texts & Mental Well-being',
        subTopics: [
          'Concepts of Mitahara (Diet) according to Hatha Pradipika',
          'Patanjali Ashtanga Yoga: Yama, Niyama, Asana, Pranayama, Pratyahara, Dharana, Dhyana, Samadhi',
          'Yogic Stress Management Frameworks'
        ]
      }
    ]
  }
};
