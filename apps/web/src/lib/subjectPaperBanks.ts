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

export function generateExactSubjectPaper(subjectName: string, className: string): {
  questions: FullGeneratedQuestion[];
  instructions: string[];
  totalMarks: number;
} {
  if (subjectName.includes('Computer Science') || subjectName.includes('083')) {

    // MULTI-QUESTION RANDOM POOL: HAR QUESTION NUMBER KE LIYE UNIQUE VARIATIONS
    const poolQ1 = [
      { text: 'State True or False:\nIn Python, data type of 74 is same as the data type of 74.0.', ans: 'False. 74 is int and 74.0 is float.' },
      { text: 'State True or False:\nIn Python, tuples are immutable whereas lists are mutable.', ans: 'True. Tuples cannot be modified in place.' },
      { text: 'State True or False:\nA Python dictionary allows duplicate keys if values are distinct.', ans: 'False. Dictionary keys must be unique.' }
    ];

    const poolQ2 = [
      { text: 'Identify the output of the following code snippet:', code: 's = "the Truth"\nprint(s.capitalize())', opts: { optA: 'The truth', optB: 'THE TRUTH', optC: 'The Truth', optD: 'the Truth' }, ans: '(A) The truth' },
      { text: 'Identify the output of the following code snippet:', code: 's = "cyber WORLD"\nprint(s.title())', opts: { optA: 'Cyber world', optB: 'Cyber World', optC: 'CYBER WORLD', optD: 'cyber world' }, ans: '(B) Cyber World' },
      { text: 'Identify the output of the following code snippet:', code: 's = "Examination"\nprint(s[2:7:2])', opts: { optA: 'amn', optB: 'ami', optC: 'aii', optD: 'amt' }, ans: '(A) amn' }
    ];

    const poolQ3 = [
      { text: 'Which of the following expressions in Python evaluates to True?', opts: { optA: '2 > 3 and 2 < 3', optB: '3 > 1 and 2 == 5', optC: '3 > 1 and 3 > 2', optD: '3 > 1 and 3 < 2' }, ans: '(C) 3 > 1 and 3 > 2' },
      { text: 'Which of the following logical expressions in Python evaluates to False?', opts: { optA: 'bool([])', optB: 'bool("False")', optC: 'bool([0])', optD: 'bool(1)' }, ans: '(A) bool([]) evaluates to False' }
    ];

    const poolQ4 = [
      { text: 'What is the output of the following code snippet?', code: "s = 'War and Peace by Leo Tolstoy'\nprint(s.partition('by'))", opts: { optA: "('War and Peace ', 'by', ' Leo Tolstoy')", optB: "['War and Peace ', 'by', ' Leo Tolstoy']", optC: "('War and Peace ', ' Leo Tolstoy')", optD: "['War and Peace ', ' Leo Tolstoy']" }, ans: "(A) ('War and Peace ', 'by', ' Leo Tolstoy')" },
      { text: 'What is the output of the following code snippet?', code: "s = 'CBSE-BOARD-EXAM-2026'\nprint(s.split('-', 2))", opts: { optA: "['CBSE', 'BOARD', 'EXAM-2026']", optB: "['CBSE', 'BOARD', 'EXAM', '2026']", optC: "('CBSE', 'BOARD', 'EXAM-2026')", optD: "['CBSE-BOARD', 'EXAM-2026']" }, ans: "(A) ['CBSE', 'BOARD', 'EXAM-2026']" }
    ];

    const poolQ5 = [
      { text: 'What will be the output of the following statement?', code: 'print("PythonProgram"[-1:2:-2])', ans: 'Output: "mrorP"' },
      { text: 'What will be the output of the following statement?', code: 'print("DataStructure"[1:8:3])', ans: 'Output: "atc"' },
      { text: 'What will be the output of the following statement?', code: 'print("Networking"[-2::-3])', ans: 'Output: "ntk"' }
    ];

    const poolQ6 = [
      { text: 'What will be the output of the following code snippet?', code: "t = tuple('tuple')\nt2 = t[2],\nt += t2\nprint(t)", opts: { optA: "('tuple')", optB: "('tuple', 'p')", optC: "('t', 'u', 'p', 'l', 'e', 'p')", optD: "('t', 'u', 'p', 'l', 'e')" }, ans: "(C) ('t', 'u', 'p', 'l', 'e', 'p')" },
      { text: 'What will be the output of the following code snippet?', code: "t = (10, 20, 30)\nt = t * 2\nprint(len(t))", opts: { optA: "3", optB: "6", optC: "9", optD: "Error" }, ans: "(B) 6" }
    ];

    const poolQ7 = [
      { text: 'Which of the following statements is true about dictionaries in Python?', opts: { optA: 'A dictionary is an example of sequence datatype.', optB: 'A dictionary cannot have two elements with same key.', optC: 'A dictionary cannot have two elements with same value.', optD: 'The key and value of an element cannot be the same.' }, ans: '(B) A dictionary cannot have two elements with same key.' },
      { text: 'Which method returns a list of all key-value tuple pairs from a dictionary in Python?', opts: { optA: 'd.keys()', optB: 'd.values()', optC: 'd.items()', optD: 'd.pairs()' }, ans: '(C) d.items()' }
    ];

    const poolQ8 = [
      { text: 'If L is a list with 6 elements, then which of the following statements will raise an exception?', opts: { optA: 'L.pop(1)', optB: 'L.pop(6)', optC: 'L.insert(1, 6)', optD: 'L.insert(6, 1)' }, ans: '(B) L.pop(6)' },
      { text: 'If L is a list of 4 elements [10, 20, 30, 40], which statement raises an IndexError?', opts: { optA: 'L[0]', optB: 'L[-4]', optC: 'L[4]', optD: 'L.pop()' }, ans: '(C) L[4]' }
    ];

    const poolQ9 = [
      { text: 'What will be the output of the following code?', code: "def f1(a, b=1):\n    print(a + b, end='-')\nc = f1(1, 2)\nprint(c, sep='*')", opts: { optA: '3-2', optB: '3-2*', optC: '3-None', optD: '3*None-' }, ans: '(C) 3-None' },
      { text: 'What will be the output of the following code?', code: "def Calc(x=5, y=10):\n    return x * y\nprint(Calc(y=3))", opts: { optA: '15', optB: '50', optC: '30', optD: 'None' }, ans: '(A) 15' }
    ];

    const poolQ10 = [
      { text: 'Consider the statement given below:\nf1 = open("pqr.dat", "____")\nWhich of the following is the correct file mode to open the file in read only binary mode?', opts: { optA: 'a', optB: 'rb', optC: 'r+', optD: 'rb+' }, ans: '(B) rb' },
      { text: 'Which file mode opens a binary file for appending without truncating data?', opts: { optA: 'w', optB: 'ab', optC: 'wb+', optD: 'r' }, ans: '(B) ab' }
    ];

    const poolQ11 = [
      { text: 'State whether the following statement is True or False:\nIn Python, Logical errors can be handled using try...except...finally statement.', ans: 'False. try...except handles runtime exceptions.' },
      { text: 'State whether the following statement is True or False:\nZeroDivisionError is a standard runtime exception in Python.', ans: 'True.' }
    ];

    const poolQ12 = [
      { text: 'A table has two candidate keys, one of which is chosen as the primary key. How many alternate keys does this table have?', opts: { optA: '0', optB: '1', optC: '2', optD: '3' }, ans: '(B) 1' },
      { text: 'A relation with 4 candidate keys has 1 primary key chosen. How many alternate keys exist?', opts: { optA: '1', optB: '2', optC: '3', optD: '4' }, ans: '(C) 3' }
    ];

    const poolQ13 = [
      { text: 'Which of the following SQL command can change the degree of the existing relation?', opts: { optA: 'DROP TABLE', optB: 'ALTER TABLE', optC: 'UPDATE...SET', optD: 'DELETE' }, ans: '(B) ALTER TABLE' },
      { text: 'Which SQL command is used to remove an attribute/column permanently from a table?', opts: { optA: 'ALTER TABLE ... DROP', optB: 'DROP COLUMN', optC: 'DELETE COLUMN', optD: 'UPDATE ... DROP' }, ans: '(A) ALTER TABLE ... DROP' }
    ];

    const poolQ14 = [
      { text: 'What will be the output of the query?\nSELECT MACHINE_ID, MACHINE_NAME FROM INVENTORY WHERE QUANTITY <= 100;', opts: { optA: 'All columns of INVENTORY table with quantity greater than 100', optB: 'ID and name of machines with quantity less than 100 from INVENTORY table', optC: 'All columns of INVENTORY table with quantity greater than or equal to 100', optD: 'ID and name of machines with quantity less than or equal to 100 from INVENTORY table.' }, ans: '(D)' },
      { text: 'What is the output of SQL command: SELECT DISTINCT Dept FROM Employee;', opts: { optA: 'Displays all departments without duplicates', optB: 'Displays all departments including duplicates', optC: 'Counts departments', optD: 'Orders departments' }, ans: '(A)' }
    ];

    const poolQ15 = [
      { text: 'A relation in MySQL database consists of 2 tuples and 3 attributes. If 2 attributes are deleted and 4 tuples are added, what will be the cardinality of the relation?', opts: { optA: '4', optB: '5', optC: '6', optD: '7' }, ans: '(C) 6' },
      { text: 'A relation has 5 tuples and 4 attributes. If 3 tuples are inserted and 1 attribute is added, what will be degree and cardinality?', opts: { optA: 'Degree: 5, Cardinality: 8', optB: 'Degree: 8, Cardinality: 5', optC: 'Degree: 4, Cardinality: 8', optD: 'Degree: 5, Cardinality: 7' }, ans: '(A) Degree: 5, Cardinality: 8' }
    ];

    const poolQ16 = [
      { text: 'Which aggregate function in SQL returns the smallest value from a column in a table?', opts: { optA: 'MIN()', optB: 'MAX()', optC: 'SMALL()', optD: 'LOWER()' }, ans: '(A) MIN()' },
      { text: 'Which SQL aggregate function ignores NULL values except when executed with an asterisk (*)?', opts: { optA: 'SUM()', optB: 'AVG()', optC: 'COUNT()', optD: 'MAX()' }, ans: '(C) COUNT()' }
    ];

    const poolQ17 = [
      { text: 'With respect to computer networks, which of the following is the correct expanded form of RJ 45?', opts: { optA: 'Radio Jockey 45', optB: 'Registered Jockey 45', optC: 'Radio Jack 45', optD: 'Registered Jack 45' }, ans: '(D) Registered Jack 45' },
      { text: 'What is the maximum data transmission distance for standard Cat6 UTP cable without repeater?', opts: { optA: '50 meters', optB: '100 meters', optC: '500 meters', optD: '1000 meters' }, ans: '(B) 100 meters' }
    ];

    const poolQ18 = [
      { text: 'Which network device serves as the entry and exit point of a network, routing all incoming and outgoing data between dissimilar protocols?', opts: { optA: 'Modem', optB: 'Gateway', optC: 'Switch', optD: 'Repeater' }, ans: '(B) Gateway' },
      { text: 'Which hardware networking device operates at Layer 2 to segment collision domains using MAC addresses?', opts: { optA: 'Hub', optB: 'Switch', optC: 'Repeater', optD: 'Modem' }, ans: '(B) Switch' }
    ];

    const poolQ19 = [
      { text: 'Expand the term XML.', opts: { optA: 'Extensible Markup Language', optB: 'Extended Media Link', optC: 'External Markup Link', optD: 'Expressive Machine Language' }, ans: '(A) Extensible Markup Language' },
      { text: 'Expand the term VoIP in computer communications.', opts: { optA: 'Voice over Internet Protocol', optB: 'Video on Internet Protocol', optC: 'Visual online IP', optD: 'Voice opt IP' }, ans: '(A) Voice over Internet Protocol' }
    ];

    const poolQ20 = [
      { text: "Assertion (A): [1, 2, 3] + '123' is an invalid expression in Python.\nReason (R): In Python, a list cannot be concatenated with a string.", opts: { optA: 'Both (A) and (R) are true and (R) is correct explanation for (A).', optB: 'Both (A) and (R) are true but (R) is not correct explanation.', optC: '(A) is true, but (R) is false.', optD: '(A) is false, but (R) is true.' }, ans: '(A)' },
      { text: "Assertion (A): Keys of a Python dictionary must be of immutable types.\nReason (R): Dictionaries use hash tables internally to access keys in O(1) time.", opts: { optA: 'Both (A) and (R) are true and (R) is correct explanation for (A).', optB: 'Both (A) and (R) are true but (R) is not correct explanation.', optC: '(A) is true, but (R) is false.', optD: '(A) is false, but (R) is true.' }, ans: '(A)' }
    ];

    const poolQ21 = [
      { text: 'Assertion (A): The PRIMARY KEY constraint in SQL ensures that each value in the column(s) is unique and cannot be NULL.\nReason (R): Candidate keys are not eligible to become a primary key.', opts: { optA: 'Both (A) and (R) are true and (R) is correct explanation for (A).', optB: 'Both (A) and (R) are true but (R) is not correct explanation.', optC: '(A) is true, but (R) is false.', optD: '(A) is false, but (R) is true.' }, ans: '(C)' },
      { text: 'Assertion (A): A relation can have multiple Foreign Keys referencing different parent tables.\nReason (R): Foreign Keys enforce referential integrity between tables.', opts: { optA: 'Both (A) and (R) are true and (R) is correct explanation for (A).', optB: 'Both (A) and (R) are true but (R) is not correct explanation.', optC: '(A) is true, but (R) is false.', optD: '(A) is false, but (R) is true.' }, ans: '(A)' }
    ];

    // Pick random question from each pool
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

    // SECTION B: Q22 to Q28 (14 Marks)
    const sectionBQuestions: FullGeneratedQuestion[] = [
      {
        qNum: 22, section: 'B', marks: 2,
        text: 'What is the difference between default parameters and positional parameters in Python? Also give an example of a function header which uses both.',
        answerKey: 'Positional arguments must be passed in order. Default parameters take a default value if argument is omitted.\nExample: def Calc(p, r, t=2):'
      },
      {
        qNum: 23, section: 'B', marks: 2,
        text: 'Write a Python statement to perform the following tasks: (USE BUILT_IN FUNCTIONS/METHODS ONLY)\n(i) To create a new list L1 containing the elements of list L arranged in ascending order, without modifying list L.\n(ii) A statement to check whether the given character, ch is an alphabet or a number.',
        answerKey: '(i) L1 = sorted(L)\n(ii) ch.isalnum()'
      },
      {
        qNum: 24, section: 'B', marks: 2,
        text: "Assuming that D1 is a dictionary in Python,\n(i) (a) Write a Python expression to check if the key, 'RNO' is present in D1.\nOR\n(b) Write a Python expression to check if any key in D1 has a value 12.\n(ii) (a) Write a single statement using a BUILT_IN function to add the key:value pair 'RNo': 12, if 'RNo' is not present in D1. However, if 'RNo' is present, the function should return its value.\nOR\n(b) Write a single statement to delete all elements from D1.",
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
        answerKey: "def CountVowels(s):\n    c = 0\n    for ch in s:                 # Correction 1: iterate over string s\n        if ch in 'aeiouAEIOU':     # Correction 2: check if char is vowel\n            c += 1               # Correction 3: increment += 1\n    return c                     # Correction 4: return count c"
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

    // SECTION C: Q29 to Q31 (9 Marks)
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

    // SECTION D: Q32 to Q35 (16 Marks)
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

    // SECTION E: Q36 to Q37 (10 Marks)
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

    const allQuestions = [
      ...sectionAQuestions,
      ...sectionBQuestions,
      ...sectionCQuestions,
      ...sectionDQuestions,
      ...sectionEQuestions
    ];

    return {
      questions: allQuestions,
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

  return { questions: [], totalMarks: 70, instructions: ['CBSE session instructions.'] };
}
