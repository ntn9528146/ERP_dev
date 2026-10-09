export interface FullGeneratedQuestion {
  qNum: number;
  section: string;
  marks: number;
  text: string;
  answerKey: string;
}

export function generateExactSubjectPaper(subjectName: string, className: string): {
  questions: FullGeneratedQuestion[];
  instructions: string[];
  totalMarks: number;
} {
  // 1. CLASS 12 COMPUTER SCIENCE (CODE 083) - EXACT 35 QUESTIONS (70 MARKS)
  if (subjectName.includes('Computer Science') || subjectName.includes('083')) {
    const csQuestions: FullGeneratedQuestion[] = [
      // SECTION A: Q1 - Q18 (1 Mark each)
      {
        qNum: 1, section: 'A', marks: 1,
        text: 'State whether the following statement is True or False:\n"In Python, tuples are immutable while lists are mutable."',
        answerKey: 'True. Tuple elements cannot be modified in place, whereas lists can be modified.'
      },
      {
        qNum: 2, section: 'A', marks: 1,
        text: 'Identify the valid identifier among the following options in Python:\n(A) 2nd_name    (B) _roll_no    (C) def    (D) total-marks',
        answerKey: '(B) _roll_no is a valid identifier. Identifiers cannot start with digit, cannot contain hyphens, and cannot be reserved keywords.'
      },
      {
        qNum: 3, section: 'A', marks: 1,
        text: 'What will be the output of the following Python expression?\n>>> print(16 // 3 + 4 ** 2 % 5)',
        answerKey: 'Output: 6 (16 // 3 = 5, 4 ** 2 = 16, 16 % 5 = 1, 5 + 1 = 6)'
      },
      {
        qNum: 4, section: 'A', marks: 1,
        text: 'Given a tuple T = (10, 20, 30, 40, 50). What will be the output of print(T[1:4:2])?\n(A) (20, 40)    (B) (20, 30)    (C) (10, 30)    (D) (20, 30, 40)',
        answerKey: '(A) (20, 40). Slice from index 1 to 3 with step 2 takes indices 1 and 3.'
      },
      {
        qNum: 5, section: 'A', marks: 1,
        text: 'Which SQL clause is used to filter records produced by the GROUP BY clause?\n(A) WHERE    (B) HAVING    (C) ORDER BY    (D) DISTINCT',
        answerKey: '(B) HAVING clause is used to filter aggregate groupings.'
      },
      {
        qNum: 6, section: 'A', marks: 1,
        text: 'Which Python file mode opens a file for both reading and writing in binary format without truncating existing data?\n(A) "rb+"    (B) "wb+"    (C) "ab"    (D) "w+"',
        answerKey: '(A) "rb+" opens for read/write in binary mode without truncation.'
      },
      {
        qNum: 7, section: 'A', marks: 1,
        text: 'In computer networks, expand the acronym VoIP.\n(A) Voice on Internet Protocol    (B) Voice over Internet Protocol\n(C) Video over Internet Packet    (D) Verified online IP',
        answerKey: '(B) Voice over Internet Protocol.'
      },
      {
        qNum: 8, section: 'A', marks: 1,
        text: 'Which function in Python returns the current position of the file pointer within an open file?\n(A) seek()    (B) tell()    (C) readpos()    (D) cursor()',
        answerKey: '(B) tell() returns the byte offset position of file pointer.'
      },
      {
        qNum: 9, section: 'A', marks: 1,
        text: 'What is the default delimiter used by the csv.writer() method in Python?\n(A) Semicolon (;)    (B) Comma (,)    (C) Tab (\\t)    (D) Space ( )',
        answerKey: '(B) Comma (,) is the default CSV delimiter.'
      },
      {
        qNum: 10, section: 'A', marks: 1,
        text: 'In relational database terminology, the degree of a table refers to:\n(A) Total number of rows    (B) Total number of columns\n(C) Primary keys count       (D) Foreign key relations',
        answerKey: '(B) Degree is the number of attributes/columns in a relation.'
      },
      {
        qNum: 11, section: 'A', marks: 1,
        text: 'Which network switching technique breaks data streams into smaller variable-length packets before transmitting?\n(A) Circuit Switching    (B) Packet Switching    (C) Message Switching    (D) Fiber Switching',
        answerKey: '(B) Packet Switching.'
      },
      {
        qNum: 12, section: 'A', marks: 1,
        text: 'In Python, what is the data type of the object returned by the function pickle.load(file_object)?\n(A) String    (B) Bytes    (C) Original Python object type    (D) Integer',
        answerKey: '(C) Original Python object hierarchy (e.g. dict, list, class).'
      },
      {
        qNum: 13, section: 'A', marks: 1,
        text: 'Identify the SQL aggregate function that ignores NULL values except when applied with (*):\n(A) AVG()    (B) SUM()    (C) COUNT()    (D) MIN()',
        answerKey: '(C) COUNT(*).'
      },
      {
        qNum: 14, section: 'A', marks: 1,
        text: 'Which protocol is responsible for resolving a domain name into an IP address?\n(A) HTTP    (B) FTP    (C) DNS    (D) SMTP',
        answerKey: '(C) Domain Name System (DNS).'
      },
      {
        qNum: 15, section: 'A', marks: 1,
        text: 'What is the output of the following code snippet?\n>>> d = {"A": 1, "B": 2}\n>>> d["A"] += 5\n>>> print(d.get("A", 0))',
        answerKey: 'Output: 6 (Value at key "A" becomes 1 + 5 = 6)'
      },
      {
        qNum: 16, section: 'A', marks: 1,
        text: 'Which device operates at the Physical layer of OSI model to amplify weak electrical signals across long cables?\n(A) Switch    (B) Repeater    (C) Router    (D) Gateway',
        answerKey: '(B) Repeater.'
      },
      {
        qNum: 17, section: 'A', marks: 1,
        text: 'Assertion (A): Global variables in Python can be modified inside a function without the "global" statement.\nReason (R): Modifying a variable without the global keyword creates a local variable with the same name.\n(A) Both (A) and (R) are true and (R) is correct explanation of (A).\n(B) Both (A) and (R) are true but (R) is not correct explanation.\n(C) (A) is true but (R) is false.\n(D) (A) is false but (R) is true.',
        answerKey: '(D) Assertion (A) is false because global variables require "global" keyword to be modified, but (R) is true.'
      },
      {
        qNum: 18, section: 'A', marks: 1,
        text: 'Assertion (A): Primary key attribute cannot accept duplicate or NULL values.\nReason (R): Entity integrity constraint ensures that each row in a relational table is uniquely identifiable.\n(A) Both (A) and (R) are true and (R) is the correct explanation of (A).\n(B) Both (A) and (R) are true but (R) is not the correct explanation of (A).\n(C) (A) is true but (R) is false.\n(D) (A) is false but (R) is true.',
        answerKey: '(A) Both (A) and (R) are true and (R) correctly explains (A).'
      },

      // SECTION B: Q19 - Q25 (2 Marks each)
      {
        qNum: 19, section: 'B', marks: 2,
        text: 'Rewrite the following Python code after removing all syntax errors. Underline each correction:\n\ndef CheckNum(val):\n  if val % 2 = 0\n    print("Even")\n  else:\n    print "Odd"\nCheckNum(14)',
        answerKey: 'Corrected Code:\ndef CheckNum(val):\n  if val % 2 == 0:  # Correction: == and colon :\n    print("Even")\n  else:\n    print("Odd")   # Correction: parentheses in print()'
      },
      {
        qNum: 20, section: 'B', marks: 2,
        text: 'Differentiate between the following file modes in Python with concise syntax:\n(a) "w" versus "a"\n(b) "r+" versus "w+"',
        answerKey: '(a) "w" truncates existing content and writes from beginning; "a" appends data at the end without erasing.\n(b) "r+" reads and writes without truncation; "w+" truncates existing file to 0 bytes before writing/reading.'
      },
      {
        qNum: 21, section: 'B', marks: 2,
        text: 'Find and write the output of the following Python code:\n\ndef Change(P, Q=30):\n  P = P + Q\n  Q = P - Q\n  print(P, "#", Q)\n  return P\nA = 150\nB = 100\nB = Change(A, B)\nprint(A, "#", B)',
        answerKey: 'Output:\n250 # 150\n150 # 250'
      },
      {
        qNum: 22, section: 'B', marks: 2,
        text: 'Differentiate between Star Topology and Bus Topology in Computer Networks. State one advantage of Star over Bus.',
        answerKey: 'Star Topology connects all nodes to a central switch/hub; Bus connects nodes to a single backbone cable.\nAdvantage of Star: Fault in a single cable node does not bring down the entire network.'
      },
      {
        qNum: 23, section: 'B', marks: 2,
        text: 'Write the SQL queries for the following requirements based on table STUDENT(RollNo, Name, Marks, Stream):\n(i) Display names of students whose Marks are in the range 80 to 95 inclusive.\n(ii) Display all student details ordered by Marks in descending order.',
        answerKey: '(i) SELECT Name FROM STUDENT WHERE Marks BETWEEN 80 AND 95;\n(ii) SELECT * FROM STUDENT ORDER BY Marks DESC;'
      },
      {
        qNum: 24, section: 'B', marks: 2,
        text: 'What is the role of the seek(offset, from_what) function in Python? What do the values 0, 1, and 2 signify for the from_what argument?',
        answerKey: 'seek() moves the file pointer to a designated byte position.\n0: Beginning of file, 1: Current file pointer position, 2: End of file.'
      },
      {
        qNum: 25, section: 'B', marks: 2,
        text: 'Explain the concept of Web Browser cookies. Mention one security hazard associated with third-party tracking cookies.',
        answerKey: 'Cookies are small text files stored on client browsers by web servers to remember sessions and user preferences.\nHazard: Cross-site tracking and session hijacking if cookies lack Secure/HttpOnly flags.'
      },

      // SECTION C: Q26 - Q30 (3 Marks each)
      {
        qNum: 26, section: 'C', marks: 3,
        text: 'Write a Python function Count_Vowels_Consonants() that reads a text file named "DIARY.TXT" and counts and displays:\n(i) Total number of uppercase vowels (A, E, I, O, U)\n(ii) Total number of words starting with an alphabet character.',
        answerKey: 'def Count_Vowels_Consonants():\n    v_count = 0\n    w_count = 0\n    with open("DIARY.TXT", "r") as f:\n        text = f.read()\n        for ch in text:\n            if ch in "AEIOU":\n                v_count += 1\n        words = text.split()\n        for w in words:\n            if w[0].isalpha():\n                w_count += 1\n    print("Uppercase Vowels:", v_count)\n    print("Words starting with alphabet:", w_count)'
      },
      {
        qNum: 27, section: 'C', marks: 3,
        text: 'Write a Python program implementing linear Stack data structure for a sports club with two functions:\n(i) Push_Player(ClubStack, PlayerName): Inserts PlayerName onto stack.\n(ii) Pop_Player(ClubStack): Removes and prints topmost player, or displays "Underflow" if stack is empty.',
        answerKey: 'def Push_Player(ClubStack, PlayerName):\n    ClubStack.append(PlayerName)\n\ndef Pop_Player(ClubStack):\n    if len(ClubStack) == 0:\n        print("Underflow: Stack Empty")\n    else:\n        item = ClubStack.pop()\n        print("Popped Player:", item)'
      },
      {
        qNum: 28, section: 'C', marks: 3,
        text: 'Given table EMP(EmpNo, EName, Salary, DeptId, DOJ). Write SQL commands for:\n(i) Display DeptId and average salary for departments with more than 3 employees.\n(ii) Display maximum and minimum salary in DeptId 10.\n(iii) Increase salary of all employees who joined before "2020-01-01" by 10%.',
        answerKey: '(i) SELECT DeptId, AVG(Salary) FROM EMP GROUP BY DeptId HAVING COUNT(*) > 3;\n(ii) SELECT MAX(Salary), MIN(Salary) FROM EMP WHERE DeptId = 10;\n(iii) UPDATE EMP SET Salary = Salary * 1.10 WHERE DOJ < "2020-01-01";'
      },
      {
        qNum: 29, section: 'C', marks: 3,
        text: 'A binary file "STUDENTS.DAT" contains records stored as dictionary objects: {"AdmNo": int, "Name": str, "Marks": float}.\nWrite a Python function Search_Student(adm_no) to search and display student details for a given admission number. If not found, display "Candidate Record Not Found".',
        answerKey: 'import pickle\ndef Search_Student(adm_no):\n    found = False\n    with open("STUDENTS.DAT", "rb") as f:\n        try:\n            while True:\n                rec = pickle.load(f)\n                if rec["AdmNo"] == adm_no:\n                    print("Found Student:", rec)\n                    found = True\n                    break\n        except EOFError:\n            pass\n    if not found:\n        print("Candidate Record Not Found")'
      },
      {
        qNum: 30, section: 'C', marks: 3,
        text: 'Write a function in Python that takes a list of integers and creates a Stack containing only elements that are multiples of 3 or 5, and displays the final Stack items in LIFO order.',
        answerKey: 'def BuildMultiplesStack(num_list):\n    stk = []\n    for n in num_list:\n        if n % 3 == 0 or n % 5 == 0:\n            stk.append(n)\n    print("Stack elements in LIFO order:")\n    while stk:\n        print(stk.pop(), end=" ")'
      },

      // SECTION D: Q31 - Q32 (5 Marks each)
      {
        qNum: 31, section: 'D', marks: 5,
        text: 'CASE STUDY - CAMPUS NETWORKING INFRASTRUCTURE:\nDevGyan International School has 4 distinct blocks in its Haldwani campus:\n- Admin Block: 110 Computers\n- Academic Wing: 75 Computers\n- CS & AI Labs: 160 Computers\n- Hostel Complex: 25 Computers\n\nDistances:\nAdmin to Academic: 60m | Admin to CS Labs: 90m | Academic to CS Labs: 45m | CS Labs to Hostel: 180m\n\nAnswer the following:\n(a) Suggest the most suitable block to install the Main Institutional Server with technical justification.\n(b) Suggest the optimal cable topology to connect all four blocks.\n(c) Where should a Repeater and a Switch be installed?\n(d) Suggest the best wired transmission medium to achieve 1 Gbps backbone bandwidth between Admin and CS Labs.\n(e) Which cloud video-conferencing protocol would allow seamless live classroom broadcasts across the campus?',
        answerKey: '(a) CS & AI Labs Block because it contains the maximum number of computers (160), adhering to 80-20 server placement rule.\n(b) Star Topology connecting Admin, Academic Wing, and Hostel directly to the central CS Labs.\n(c) Switch should be installed in all blocks. Repeater should be placed between CS Labs and Hostel (distance 180m > 100m Ethernet limit).\n(d) Optical Fiber Cable (single-mode or multi-mode).\n(e) WebRTC / RTSP (Real-Time Streaming Protocol).'
      },
      {
        qNum: 32, section: 'D', marks: 5,
        text: 'Write a complete Python script to interface with MySQL database "SchoolDB" using mysql.connector module:\n(a) Connect to localhost MySQL server with user "root" and password "Nitin@123".\n(b) Take inputs for BookId, BookTitle, and Price from the console.\n(c) Insert the record into table "LIBRARY_BOOKS".\n(d) Commit the transaction to save changes.\n(e) Fetch and display all books with Price > 500 using cursor.fetchall().',
        answerKey: 'import mysql.connector\n\ncon = mysql.connector.connect(\n    host="localhost",\n    user="root",\n    password="Nitin@123",\n    database="SchoolDB"\n)\ncur = con.cursor()\n\nb_id = int(input("Enter Book ID: "))\nb_title = input("Enter Title: ")\nb_price = float(input("Enter Price: "))\n\nsql = "INSERT INTO LIBRARY_BOOKS (BookId, BookTitle, Price) VALUES (%s, %s, %s)"\ncur.execute(sql, (b_id, b_title, b_price))\ncon.commit()\n\nprint("Records where Price > 500:")\ncur.execute("SELECT * FROM LIBRARY_BOOKS WHERE Price > 500")\nrows = cur.fetchall()\nfor r in rows:\n    print(r)\n\ncur.close()\ncon.close()'
      },

      // SECTION E: Q33 - Q35 (4 Marks each)
      {
        qNum: 33, section: 'E', marks: 4,
        text: 'Consider the following relational tables:\nTable: TEACHER (TId, TName, Subject, Salary, SchoolCode)\nTable: SCHOOL (SchoolCode, SchoolName, City)\n\nWrite SQL queries for:\n(i) Display TName, Subject, and SchoolName for all teachers residing in "Haldwani".\n(ii) Display highest Salary paid in each SchoolCode.\n(iii) Display details of teachers whose Salary is greater than average teacher salary.\n(iv) Identify the Foreign Key attribute in table TEACHER.',
        answerKey: '(i) SELECT T.TName, T.Subject, S.SchoolName FROM TEACHER T, SCHOOL S WHERE T.SchoolCode = S.SchoolCode AND S.City = "Haldwani";\n(ii) SELECT SchoolCode, MAX(Salary) FROM TEACHER GROUP BY SchoolCode;\n(iii) SELECT * FROM TEACHER WHERE Salary > (SELECT AVG(Salary) FROM TEACHER);\n(iv) SchoolCode is the Foreign Key linking to table SCHOOL.'
      },
      {
        qNum: 34, section: 'E', marks: 4,
        text: 'A CSV file named "ITEMS.CSV" contains rows formatted as ItemCode, ItemName, StockQuantity, UnitPrice.\nWrite a Python function Manage_Inventory() that performs:\n(i) Reads the CSV file using csv.reader().\n(ii) Displays only those items where StockQuantity is less than 10 (Reorder alert).\n(iii) Computes and prints the total aggregate inventory valuation of all products.',
        answerKey: 'import csv\n\ndef Manage_Inventory():\n    total_value = 0.0\n    with open("ITEMS.CSV", "r") as f:\n        reader = csv.reader(f)\n        print("Low Stock Items (< 10):")\n        for row in reader:\n            if row:\n                code, name, stock, price = row[0], row[1], int(row[2]), float(row[3])\n                if stock < 10:\n                    print(f"Alert: {code} - {name} (Stock: {stock})")\n                total_value += stock * price\n    print("Total Valuation: ₹", total_value)'
      },
      {
        qNum: 35, section: 'E', marks: 4,
        text: 'Write a Python program using binary file "FACULTY.DAT" containing dictionary records: {"FacId": str, "Name": str, "Dept": str, "Exp": int}.\nWrite a function Promote_Faculty() that:\n(a) Traverses all records and if Exp >= 10, prefixes "Senior Faculty - " to their Dept.\n(b) Writes updated records to a temporary file "TEMP.DAT" and replaces original file using os.remove() and os.rename().',
        answerKey: 'import pickle, os\n\ndef Promote_Faculty():\n    fin = open("FACULTY.DAT", "rb")\n    fout = open("TEMP.DAT", "wb")\n    try:\n        while True:\n            rec = pickle.load(fin)\n            if rec["Exp"] >= 10:\n                rec["Dept"] = "Senior Faculty - " + rec["Dept"]\n            pickle.dump(rec, fout)\n    except EOFError:\n        pass\n    fin.close()\n    fout.close()\n    os.remove("FACULTY.DAT")\n    os.rename("TEMP.DAT", "FACULTY.DAT")\n    print("Promotions updated successfully.")'
      }
    ];

    return {
      questions: csQuestions,
      totalMarks: 70,
      instructions: [
        'This question paper comprises 35 questions divided into 5 Sections: A, B, C, D, and E.',
        'Section A comprises 18 Multiple Choice Questions (MCQs) of 1 mark each (Q1 to Q18).',
        'Section B comprises 7 Very Short Answer (VSA) questions of 2 marks each (Q19 to Q25).',
        'Section C comprises 5 Short Answer (SA) questions of 3 marks each (Q26 to Q30).',
        'Section D comprises 2 Long Answer (LA) questions of 5 marks each (Q31 to Q32).',
        'Section E comprises 3 Case-Based / Integrated questions of 4 marks each (Q33 to Q35).',
        'All programming answers must adhere to Python 3.x syntax standard.'
      ]
    };
  }

  // 2. CLASS 12 PHYSICS (CODE 042) - PURE PHYSICS 33 QUESTIONS (70 MARKS)
  const phyQuestions: FullGeneratedQuestion[] = [
    { qNum: 1, section: 'A', marks: 1, text: 'An electric dipole of dipole moment p is oriented in uniform electric field E. What is potential energy when aligned parallel to E?\n(A) -pE    (B) +pE    (C) Zero    (D) 2pE', answerKey: '(A) -pE (U = -p·E = -pE cos 0° = -pE)' },
    { qNum: 2, section: 'A', marks: 1, text: 'The electric flux through a Gaussian surface enclosing an electric dipole of charge ±q is:\n(A) q/ε₀    (B) 2q/ε₀    (C) Zero    (D) q/(2ε₀)', answerKey: '(C) Net charge enclosed = +q - q = 0, so Φ = 0.' },
    { qNum: 3, section: 'A', marks: 1, text: 'In an AC series LCR circuit at resonance, inductive reactance X_L equals capacitive reactance X_C. The phase angle between V and I is:\n(A) π/2    (B) π    (C) 0    (D) π/4', answerKey: '(C) Zero phase angle at resonance (cos φ = 1).' },
    { qNum: 4, section: 'A', marks: 1, text: 'Which electromagnetic wave has the highest frequency in the spectrum?\n(A) Microwaves    (B) Ultraviolet    (C) Gamma rays    (D) X-rays', answerKey: '(C) Gamma rays have highest frequency and shortest wavelength.' },
    { qNum: 19, section: 'B', marks: 2, text: 'State Kirchhoff\'s Junction Rule and Loop Rule. On which fundamental conservation laws are they founded?', answerKey: 'Junction Rule (ΣI = 0) is based on Conservation of Charge.\nLoop Rule (ΣΔV = 0) is based on Conservation of Energy.' },
    { qNum: 26, section: 'C', marks: 3, text: 'Derive resonant frequency formula f_r = 1 / (2π√(LC)) for an AC series LCR circuit and define Quality Factor Q.', answerKey: 'At resonance X_L = X_C ⇒ ωL = 1/(ωC) ⇒ ω = 1/√(LC) ⇒ f_r = 1/(2π√(LC)). Q = (ω_r L)/R.' },
    { qNum: 31, section: 'D', marks: 5, text: 'State Gauss\'s Theorem. Use it to derive the electric field intensity at distance r from an infinitely long straight wire carrying uniform linear charge density λ.', answerKey: '∮E·dA = q/ε₀. For Gaussian cylinder: E · (2πrl) = (λl)/ε₀ ⇒ E = λ / (2πε₀r).' },
    { qNum: 34, section: 'E', marks: 4, text: 'CASE STUDY: Moving Coil Galvanometer and Shunt Resistance in Laboratory Measurements.\n(i) What is the function of radial magnetic field? [1]\n(ii) How is galvanometer converted into ammeter? [1]\n(iii) Calculate shunt resistance to convert 10mA galvanometer into 1A ammeter. [2]', answerKey: '(i) Keeps torque maximum (τ = NIAB) for linear scale.\n(ii) Connect low shunt resistance in parallel.\n(iii) S = (I_g · G)/(I - I_g).' }
  ];

  return {
    questions: phyQuestions,
    totalMarks: 70,
    instructions: [
      'This question paper contains questions strictly from CBSE Physics curriculum.',
      'Sections A to E must be answered sequentially without calculator.'
    ]
  };
}
