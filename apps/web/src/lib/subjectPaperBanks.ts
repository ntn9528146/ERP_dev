export interface FullGeneratedQuestion {
  qNum: number;
  section: string;
  marks: number;
  text: string;
  answerKey: string;
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateExactSubjectPaper(subjectName: string, className: string): {
  questions: FullGeneratedQuestion[];
  instructions: string[];
  totalMarks: number;
} {
  if (subjectName.includes('Computer Science') || subjectName.includes('083')) {
    // Dynamic values for uniqueness in every generation
    const numInt = getRandomChoice([45, 62, 74, 88, 93]);
    const strWord = getRandomChoice(['the Truth', 'cyber Realm', 'data Matrix', 'cloud Vault']);
    const listLen = getRandomInt(5, 8);
    const popIdx = listLen;
    const aVal = getRandomInt(1, 4);
    const bVal = getRandomInt(2, 5);
    const stockCode = getRandomChoice(['AF', 'BF', 'CF', 'DF']) + '0.5';
    const numEmp = getRandomInt(3, 7);

    const csQuestions: FullGeneratedQuestion[] = [
      // SECTION A: Q1 to Q21 (21 Marks)
      {
        qNum: 1, section: 'A', marks: 1,
        text: `State True or False:\nIn Python, data type of ${numInt} is same as the data type of ${numInt}.0.`,
        answerKey: `False. ${numInt} is an int (integer) while ${numInt}.0 is a float (floating-point number).`
      },
      {
        qNum: 2, section: 'A', marks: 1,
        text: `Identify the output of the following code snippet:\ns = "${strWord}"\nprint(s.capitalize())\n(A) ${strWord.toLowerCase()}    (B) ${strWord.toUpperCase()}\n(C) ${strWord[0].toUpperCase() + strWord.slice(1).toLowerCase()}    (D) ${strWord}`,
        answerKey: `(C) ${strWord[0].toUpperCase() + strWord.slice(1).toLowerCase()}. capitalize() converts first character to uppercase and the rest to lowercase.`
      },
      {
        qNum: 3, section: 'A', marks: 1,
        text: 'Which of the following expressions in Python evaluates to True?\n(A) 2 > 3 and 2 < 3\n(B) 3 > 1 and 2\n(C) 3 > 1 and 3 > 2\n(D) 3 > 1 and 3 < 2',
        answerKey: '(C) 3 > 1 and 3 > 2 evaluates to True because both conditions are True.'
      },
      {
        qNum: 4, section: 'A', marks: 1,
        text: "What is the output of the following code snippet?\ns = 'War and Peace by Leo Tolstoy'\nprint(s.partition('by'))\n(A) ('War and Peace ', 'by', ' Leo Tolstoy')\n(B) ['War and Peace ', 'by', ' Leo Tolstoy']\n(C) ('War and Peace ', ' Leo Tolstoy')\n(D) ['War and Peace ', ' Leo Tolstoy']",
        answerKey: "(A) ('War and Peace ', 'by', ' Leo Tolstoy'). partition() returns a 3-element tuple."
      },
      {
        qNum: 5, section: 'A', marks: 1,
        text: 'What will be the output of the following statement?\nprint("PythonProgram"[-1:2:-2])',
        answerKey: 'Output: "mrorP"'
      },
      {
        qNum: 6, section: 'A', marks: 1,
        text: "What will be the output of the following code snippet?\nt = tuple('tuple')\nt2 = t[2],\nt += t2\nprint(t)\n(A) ('tuple')             (B) ('tuple', 'p')\n(C) ('t', 'u', 'p', 'l', 'e', 'p')    (D) ('t', 'u', 'p', 'l', 'e')",
        answerKey: "(C) ('t', 'u', 'p', 'l', 'e', 'p')."
      },
      {
        qNum: 7, section: 'A', marks: 1,
        text: 'Which of the following statements is true about dictionaries in Python?\n(A) A dictionary is an example of sequence datatype.\n(B) A dictionary cannot have two elements with same key.\n(C) A dictionary cannot have two elements with same value.\n(D) The key and value of an element cannot be the same.',
        answerKey: '(B) A dictionary cannot have two elements with same key.'
      },
      {
        qNum: 8, section: 'A', marks: 1,
        text: `If L is a list with ${listLen} elements, then which of the following statements will raise an exception?\n(A) L.pop(1)    (B) L.pop(${popIdx})\n(C) L.insert(1, 6)    (D) L.insert(6, 1)`,
        answerKey: `(B) L.pop(${popIdx}) raises IndexError because valid indices range from 0 to ${listLen - 1}.`
      },
      {
        qNum: 9, section: 'A', marks: 1,
        text: `What will be the output of the following code?\ndef f1(a, b=1):\n    print(a + b, end='-')\nc = f1(${aVal}, ${bVal})\nprint(c, sep='*')\n(A) ${aVal + bVal}-${bVal}    (B) ${aVal + bVal}-None\n(C) ${aVal + bVal}-None*    (D) ${aVal + bVal}*None-`,
        answerKey: `(B) ${aVal + bVal}-None. f1() returns None implicitly.`
      },
      {
        qNum: 10, section: 'A', marks: 1,
        text: 'Consider the statement given below:\nf1 = open("pqr.dat", "____")\nWhich of the following is the correct file mode to open the file in read only binary mode?\n(A) a    (B) rb    (C) r+    (D) rb+',
        answerKey: '(B) rb'
      },
      {
        qNum: 11, section: 'A', marks: 1,
        text: 'State whether the following statement is True or False:\nIn Python, Logical errors can be handled using try...except...finally statement.',
        answerKey: 'False. try...except handles runtime exceptions, not flaws in logic.'
      },
      {
        qNum: 12, section: 'A', marks: 1,
        text: 'A table has two candidate keys, one of which is chosen as the primary key. How many alternate keys does this table have?\n(A) 0    (B) 1    (C) 2    (D) 3',
        answerKey: '(B) 1 (Alternate Keys = Candidate Keys - Primary Key = 2 - 1 = 1).'
      },
      {
        qNum: 13, section: 'A', marks: 1,
        text: 'Which of the following SQL commands can change the degree of an existing relation?\n(A) DROP TABLE    (B) ALTER TABLE    (C) UPDATE...SET    (D) DELETE',
        answerKey: '(B) ALTER TABLE'
      },
      {
        qNum: 14, section: 'A', marks: 1,
        text: 'What will be the output of the query?\nSELECT MACHINE_ID, MACHINE_NAME FROM INVENTORY WHERE QUANTITY <= 100;\n(A) All columns of INVENTORY table with quantity greater than 100\n(B) ID and name of machines with quantity less than 100 from INVENTORY table\n(C) All columns of INVENTORY table with quantity greater than or equal to 100\n(D) ID and name of machines with quantity less than or equal to 100 from INVENTORY table.',
        answerKey: '(D) ID and name of machines with quantity less than or equal to 100 from INVENTORY table.'
      },
      {
        qNum: 15, section: 'A', marks: 1,
        text: `A relation in MySQL database consists of 2 tuples and 3 attributes. If 2 attributes are deleted and ${numEmp} tuples are added, what will be the cardinality of the relation?\n(A) 4    (B) ${2 + numEmp}\n(C) ${3 + numEmp}    (D) 8`,
        answerKey: `(B) ${2 + numEmp}. Cardinality is the total count of tuples (2 + ${numEmp} = ${2 + numEmp}).`
      },
      {
        qNum: 16, section: 'A', marks: 1,
        text: 'Which aggregate function in SQL returns the smallest value from a column in a table?\n(A) MIN()    (B) MAX()    (C) SMALL()    (D) LOWER()',
        answerKey: '(A) MIN()'
      },
      {
        qNum: 17, section: 'A', marks: 1,
        text: 'With respect to computer networks, which of the following is the correct expanded form of RJ 45?\n(A) Radio Jockey 45    (B) Registered Jockey 45\n(C) Radio Jack 45      (D) Registered Jack 45',
        answerKey: '(D) Registered Jack 45'
      },
      {
        qNum: 18, section: 'A', marks: 1,
        text: 'Which network device serves as the entry and exit point of a network, routing all incoming and outgoing data between dissimilar protocols?\n(A) Modem    (B) Gateway    (C) Switch    (D) Repeater',
        answerKey: '(B) Gateway'
      },
      {
        qNum: 19, section: 'A', marks: 1,
        text: 'Expand the term XML.\n(A) Extensible Markup Language    (B) Extended Media Link\n(C) External Markup Link           (D) Expressive Machine Language',
        answerKey: '(A) Extensible Markup Language'
      },
      {
        qNum: 20, section: 'A', marks: 1,
        text: "Assertion (A): [1, 2, 3] + '123' is an invalid expression in Python.\nReason (R): In Python, a list cannot be concatenated with a string.\n(A) Both Assertion (A) and Reason (R) are true and Reason (R) is the correct explanation for Assertion (A).\n(B) Both Assertion (A) and Reason (R) are true and Reason (R) is not the correct explanation for Assertion (A).\n(C) Assertion (A) is true, but Reason (R) is false.\n(D) Assertion (A) is false, but Reason (R) is true.",
        answerKey: '(A) Both Assertion (A) and Reason (R) are true and Reason (R) correctly explains Assertion (A).'
      },
      {
        qNum: 21, section: 'A', marks: 1,
        text: 'Assertion (A): The PRIMARY KEY constraint in SQL ensures that each value in the column(s) is unique and cannot be NULL.\nReason (R): Candidate keys are not eligible to become a primary key.\n(A) Both Assertion (A) and Reason (R) are true and Reason (R) is the correct explanation for Assertion (A).\n(B) Both Assertion (A) and Reason (R) are true and Reason (R) is not the correct explanation for Assertion (A).\n(C) Assertion (A) is true, but Reason (R) is false.\n(D) Assertion (A) is false, but Reason (R) is true.',
        answerKey: '(C) Assertion (A) is true, but Reason (R) is false.'
      },

      // SECTION B: Q22 to Q28 (14 Marks)
      {
        qNum: 22, section: 'B', marks: 2,
        text: 'What is the difference between default parameters and positional parameters in Python? Also give an example of a function header which uses both.',
        answerKey: 'Positional parameters must match the number and order of arguments in function call. Default parameters assign default values if not passed.\nExample: def Interest(principal, rate, time=2):'
      },
      {
        qNum: 23, section: 'B', marks: 2,
        text: 'Write a Python statement to perform the following tasks: (USE BUILT_IN FUNCTIONS/METHODS ONLY)\n(i) To create a new list L1 containing the elements of list L arranged in ascending order, without modifying list L.\n(ii) A statement to check whether the given character, ch is an alphabet or a number.',
        answerKey: '(i) L1 = sorted(L)\n(ii) ch.isalnum()'
      },
      {
        qNum: 24, section: 'B', marks: 2,
        text: "Assuming that D1 is a dictionary in Python,\n(i) (a) Write a Python expression to check if the key 'RNO' is present in D1.\nOR\n(b) Write a Python expression to check if any key in D1 has a value 12.\n(ii) (a) Write a single statement using a BUILT_IN function to add the key:value pair 'RNo': 12, if 'RNo' is not present in D1; if present, return its value.\nOR\n(b) Write a single statement to delete all elements from D1.",
        answerKey: "(i)(a) 'RNO' in D1  OR  (b) 12 in D1.values()\n(ii)(a) D1.setdefault('RNo', 12)  OR  (b) D1.clear()"
      },
      {
        qNum: 25, section: 'B', marks: 2,
        text: "What possible output(s) from the given options will NOT be displayed when the following code is executed? Also mention for how many iterations the for loop will run:\n\nimport random\na = [1, 2, 3, 4, 5, 6]\nfor i in range(4):\n    j = random.randrange(i, 5)\n    print(a[j], end='-')\nprint()\n\nOptions: (A) 3-4-5-4-    (B) 2-2-4-5-    (C) 4-3-3-5-    (D) 5-1-2-4-",
        answerKey: 'Option (D) will NOT be displayed because in later iterations j cannot take lower bounds. The loop runs for 4 iterations.'
      },
      {
        qNum: 26, section: 'B', marks: 2,
        text: "The function given below is written to accept a string s as a parameter and return the number of vowels appearing in the string. The code has errors. Rewrite it after removing all logical and syntax errors:\n\ndef CountVowels(s):\n    c = 0\n    for ch in range(s):\n        if 'aeiouAEIOU' in ch:\n            c =+ 1\n    return (ch)",
        answerKey: "def CountVowels(s):\n    c = 0\n    for ch in s:                 # Correction 1: iterate over s, not range(s)\n        if ch in 'aeiouAEIOU':     # Correction 2: check if ch is in vowels\n            c += 1               # Correction 3: c += 1 instead of =+\n    return c                     # Correction 4: return count c"
      },
      {
        qNum: 27, section: 'B', marks: 2,
        text: 'Ms. Zoya is creating a table W_STOCK in a factory with fields: W_Code CHAR(5) Primary Key, W_Description VARCHAR(20), B_Qty INTEGER, U_Price FLOAT.\n(i) Write SQL command to create the table W_STOCK.\n(ii) Write SQL command to add an attribute E_Date (DATE type) to W_STOCK.',
        answerKey: '(i) CREATE TABLE W_STOCK (W_Code CHAR(5) PRIMARY KEY, W_Description VARCHAR(20), B_Qty INT, U_Price FLOAT);\n(ii) ALTER TABLE W_STOCK ADD E_Date DATE;'
      },
      {
        qNum: 28, section: 'B', marks: 2,
        text: '(a) List one advantage and one disadvantage of Bus topology.\nOR\n(b) What is a protocol in computer networks? Which protocol is used to transmit hypertext across the web?',
        answerKey: '(a) Advantage: Easy to install, uses minimal cabling. Disadvantage: Entire network fails if main backbone cable breaks.\n(b) Protocol is a set of standard rules governing data exchange. Protocol for hypertext: HTTP / HTTPS.'
      },

      // SECTION C: Q29 to Q31 (9 Marks)
      {
        qNum: 29, section: 'C', marks: 3,
        text: 'Write a Python function that counts and returns the number of digits appearing in the text file "Space.txt".\nOR\nWrite a Python function that displays words where lowercase letter "e" appears at least twice in text file "Space.txt".',
        answerKey: 'def CountDigits():\n    d_count = 0\n    with open("Space.txt", "r") as f:\n        for ch in f.read():\n            if ch.isdigit():\n                d_count += 1\n    return d_count'
      },
      {
        qNum: 30, section: 'C', marks: 3,
        text: 'A stack named FruitStack contains records of fruits as dictionaries: {\'Name\': str, \'Origin\': str, \'Price\': int, \'Expiry\': str}.\nWrite Python user-defined functions:\n(i) push_fruit(FruitStack, Fruit): Pushes Fruit onto stack if Price < 100.\n(ii) pop_fruit(FruitStack): Pops and returns topmost record or prints "UNDERFLOW".\n(iii) display(FruitStack): Displays elements from topmost or prints "EMPTY STACK".',
        answerKey: 'def push_fruit(FruitStack, Fruit):\n    if Fruit["Price"] < 100:\n        FruitStack.append(Fruit)\n\ndef pop_fruit(FruitStack):\n    if not FruitStack:\n        print("UNDERFLOW")\n        return None\n    return FruitStack.pop()\n\ndef display(FruitStack):\n    if not FruitStack:\n        print("EMPTY STACK")\n    else:\n        for f in reversed(FruitStack):\n            print(f)'
      },
      {
        qNum: 31, section: 'C', marks: 3,
        text: 'Write the output of the following code:\n\ndef Exam2026(given):\n    new = []\n    for ch in given[1:-1]:\n        if ch.isupper():\n            new.reverse()\n        elif ch not in new:\n            new.append(ch)\n        elif ch in new:\n            new.pop()\n    print(new)\n\nExam2026("Gold-24Medals")',
        answerKey: "Output: ['l', 'd', '-', '2', '4', 'e', 'd', 'a', 'l']"
      },

      // SECTION D: Q32 to Q35 (16 Marks)
      {
        qNum: 32, section: 'D', marks: 4,
        text: `Consider table STOCK(Code, Type, Volume, Qty, Price) with sample code "${stockCode}". Write SQL queries:\n(i) Display Type and maximum Price for each Type of milk.\n(ii) Increase Price by 0.50 where Type is 'F'.\n(iii) Display the total stock value (sum of Qty * Price).\n(iv) Display all records where Code starts with 'A'.`,
        answerKey: "(i) SELECT Type, MAX(Price) FROM STOCK GROUP BY Type;\n(ii) UPDATE STOCK SET Price = Price + 0.50 WHERE Type = 'F';\n(iii) SELECT SUM(Qty * Price) FROM STOCK;\n(iv) SELECT * FROM STOCK WHERE Code LIKE 'A%';"
      },
      {
        qNum: 33, section: 'D', marks: 4,
        text: 'A CSV file "States.csv" contains records: [StateName, Capital, Population, Language].\nWrite a Python program that reads this file and appends all records where population is greater than 10000000 into another CSV file "More.csv", skipping the header row.',
        answerKey: 'import csv\n\nwith open("States.csv", "r") as fin, open("More.csv", "a", newline="") as fout:\n    reader = csv.reader(fin)\n    writer = csv.writer(fout)\n    next(reader)  # Skip header\n    for row in reader:\n        if row and int(row[2]) > 10000000:\n            writer.writerow(row)'
      },
      {
        qNum: 34, section: 'D', marks: 4,
        text: 'Consider tables CUSTOMERS(CID, CName, Phone) and LOANS(SNo, CID, LAmt, LDate, Terms, RoI). Write SQL queries for:\n(i) Count records in LOANS where RoI > 7.0.\n(ii) Names of customers whose loan amount (LAmt) is above 1000000.\n(iii) Display CID, CName, and Terms where LDate is after "2024-12-31".\n(iv) Details of all loans in descending order of RoI.',
        answerKey: '(i) SELECT COUNT(*) FROM LOANS WHERE RoI > 7.0;\n(ii) SELECT CName FROM CUSTOMERS C, LOANS L WHERE C.CID = L.CID AND LAmt > 1000000;\n(iii) SELECT C.CID, CName, Terms FROM CUSTOMERS C, LOANS L WHERE C.CID = L.CID AND LDate > "2024-12-31";\n(iv) SELECT * FROM LOANS ORDER BY RoI DESC;'
      },
      {
        qNum: 35, section: 'D', marks: 4,
        text: 'Write a Python program connecting to MySQL database "SCHOOL" (User: admin, Password: root, Host: localhost) to fetch and display student records from table "Account"(Stud_id, Sname, Class, Fees) whose Fees is less than 5000.',
        answerKey: 'import mysql.connector\n\ncon = mysql.connector.connect(host="localhost", user="admin", password="root", database="SCHOOL")\ncur = con.cursor()\ncur.execute("SELECT * FROM Account WHERE Fees < 5000")\nfor row in cur.fetchall():\n    print(row)\ncur.close()\ncon.close()'
      },

      // SECTION E: Q36 to Q37 (10 Marks)
      {
        qNum: 36, section: 'E', marks: 5,
        text: 'An ICT training organization stores data of Resource Persons in binary file "RESOURCES.DAT" as tuples: (RID, RName, RExpertise, Charges).\nWrite user-defined functions in Python:\n(i) Append(): Takes inputs for RID, RName, RExpertise, Charges and dumps tuple to RESOURCES.DAT.\n(ii) Update(): Traverses file and increases Charges of every resource person by 500.',
        answerKey: 'import pickle\n\ndef Append():\n    r_id = int(input("RID: "))\n    name = input("Name: ")\n    exp = input("Expertise: ")\n    chg = float(input("Charges: "))\n    with open("RESOURCES.DAT", "ab") as f:\n        pickle.dump((r_id, name, exp, chg), f)\n\ndef Update():\n    records = []\n    with open("RESOURCES.DAT", "rb") as f:\n        try:\n            while True:\n                records.append(pickle.load(f))\n        except EOFError:\n            pass\n    with open("RESOURCES.DAT", "wb") as f:\n        for r in records:\n            pickle.dump((r[0], r[1], r[2], r[3] + 500), f)'
      },
      {
        qNum: 37, section: 'E', marks: 5,
        text: 'CASE STUDY - CAMPUS NETWORKING:\nAmritsar Campus has 4 blocks: ADMIN (25 computers), ACADEMIC (600 computers), HOSTEL (120 computers), SPORTS (50 computers).\nDistances: ADMIN to ACADEMIC = 60m, ADMIN to HOSTEL = 160m, ADMIN to SPORTS = 80m, ACADEMIC to HOSTEL = 40m, ACADEMIC to SPORTS = 120m, HOSTEL to SPORTS = 150m.\n(i) Suggest appropriate location of server with justification.\n(ii) Draw cable layout to connect all blocks.\n(iii) Name two wired media to connect computers within a block.\n(iv) Which communication medium is used by FM radio: Radio waves, Micro waves, or Infrared waves?\n(v) Full name of protocol for audio-visual communication OR place where repeater is needed.',
        answerKey: '(i) ACADEMIC Block (holds 600 computers, maximum count adhering to 80-20 rule).\n(ii) Star Topology with ACADEMIC Block at center.\n(iii) CAT 6 Twisted Pair Cable and Coaxial Cable.\n(iv) Radio Waves.\n(v) VoIP (Voice over Internet Protocol) OR Repeater between HOSTEL and SPORTS (150m > 100m Ethernet limit).'
      }
    ];

    return {
      questions: csQuestions,
      totalMarks: 70,
      instructions: [
        'This question paper contains 37 questions divided into 5 Sections - A, B, C, D and E.',
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

  return { questions: [], totalMarks: 70, instructions: ['CBSE session guidelines applicable.'] };
}
