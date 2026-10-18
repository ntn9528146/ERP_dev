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
  // 1. CHEMISTRY (CODE 043) - STRICT CBSE 2026-27 (70 MARKS, EXACT 33 QS)
  // =========================================================================
  if (cleanSub.includes('043') || cleanSub.includes('chemistry')) {
    // Dynamic Chemical Parameters
    const soluteMass = getRandomChoice([3.5, 4.2, 5.0, 6.3, 7.5]);
    const solventMass = getRandomChoice([50, 65, 75, 80, 100]);
    const kfVal = 3.9;
    const deltaTf = ((kfVal * soluteMass * 1000) / (176 * solventMass)).toFixed(2);

    const kRate1 = getRandomChoice(['1.15 x 10⁻³', '2.30 x 10⁻³', '3.45 x 10⁻³']);
    const tempT1 = getRandomChoice([298, 300, 310]);
    const tempT2 = tempT1 + 10;
    const factorTriples = getRandomChoice(['doubles', 'triples', 'quadruples']);

    // MCQs Pool (Patterned after CBSE SQP 043)
    const chemMCQPool = [
      {
        text: 'Which of the following reactions will lead to the formation of ethyl methyl ketone (butan-2-one)?',
        opts: { optA: 'Ozonolysis of CH3-CH2-C(CH3)=CH-CH3 followed by Zn/H2O cleavage', optB: 'Heating 2-methylpropan-1-ol with acidified Na2Cr2O7', optC: 'Passing 2-methylpropan-2-ol vapors over heated copper at 573 K', optD: 'Hydration of ethyne in the presence of HgSO4 and dil. H2SO4' },
        ans: '(A) Ozonolysis of 3-methylpent-2-ene yields butan-2-one.'
      },
      {
        text: 'The counter ion present outside the coordination sphere in [Co(NH3)5(NO2)]Cl2 is:',
        opts: { optA: 'Chloride ion (Cl⁻)', optB: 'Ammine (NH3)', optC: 'Cobalt ion', optD: 'Nitro group (NO2⁻)' },
        ans: '(A) Chloride ion is ionizable counter ion outside coordination sphere.'
      },
      {
        text: 'Which of the following carbohydrates is distinctly laevorotatory in aqueous solution?',
        opts: { optA: 'beta-D-Fructose', optB: 'alpha-D-Glucose', optC: 'beta-D-Glucose', optD: 'Sucrose' },
        ans: '(A) D-Fructose exhibits specific laevorotation of -92.4°.'
      },
      {
        text: 'In o-cresol (2-methylphenol), the -OH group is directly attached to a carbon atom that is:',
        opts: { optA: 'sp² hybridised', optB: 'sp³ hybridised', optC: 'sp hybridised', optD: 'dsp² hybridised' },
        ans: '(A) sp² hybridized aromatic ring carbon.'
      },
      {
        text: 'Which of the following organic compounds will form an orange-yellow precipitate with 2,4-Dinitrophenylhydrazine (2,4-DNP)?',
        opts: { optA: 'Both Propanal and Propanone', optB: 'Propanoic acid only', optC: 'Propan-1-ol', optD: 'Ethyl ethanoate' },
        ans: '(A) Aldehydes and ketones contain carbonyl group reacting with 2,4-DNP.'
      },
      {
        text: 'Which of the following haloalkanes undergoes nucleophilic substitution via SN1 mechanism at the fastest rate?',
        opts: { optA: '2-Bromo-2-methylpropane (tert-butyl bromide)', optB: '2-Bromopropane', optC: '1-Bromopropane', optD: 'Bromomethane' },
        ans: '(A) Forms most stable tertiary carbocation.'
      },
      {
        text: 'The limiting molar conductivity of acetic acid (CH3COOH) can be computed using Kohlrausch’s law from the values of:',
        opts: { optA: 'Λ°m(HCl) + Λ°m(CH3COONa) - Λ°m(NaCl)', optB: 'Λ°m(NaOH) + Λ°m(CH3COOK) - Λ°m(KCl)', optC: 'Λ°m(H2SO4) + Λ°m(Na2SO4) - Λ°m(CH3COONa)', optD: 'Λ°m(NaCl) + Λ°m(HCl)' },
        ans: '(A) Kohlrausch independent ionic migration law.'
      },
      {
        text: 'Transition metal ions form colored complexes primarily due to:',
        opts: { optA: 'd-d electronic transitions in partially filled d-orbitals', optB: 'Presence of completely filled d-subshell', optC: 'High heat of atomization', optD: 'High lattice energy' },
        ans: '(A) d-d transition absorption in visible spectrum.'
      },
      {
        text: 'Assertion (A): Boiling point of ethanol is significantly higher than that of methoxymethane.\nReason (R): Ethanol molecules associate via intermolecular hydrogen bonding whereas ethers lack hydrogen bonding.',
        opts: { optA: 'Both (A) and (R) are true and (R) is correct explanation for (A).', optB: 'Both (A) and (R) are true but (R) is not correct explanation.', optC: '(A) is true, but (R) is false.', optD: '(A) is false, but (R) is true.' },
        ans: '(A) Both are true and (R) correctly explains (A).'
      },
      {
        text: 'Assertion (A): Solutions injected into human bloodstream must possess the same osmotic pressure as that of blood plasma.\nReason (R): Hypotonic solutions cause haemolysis (swelling & bursting) of red blood cells.',
        opts: { optA: 'Both (A) and (R) are true and (R) is correct explanation for (A).', optB: 'Both (A) and (R) are true but (R) is not correct explanation.', optC: '(A) is true, but (R) is false.', optD: '(A) is false, but (R) is true.' },
        ans: '(A) Both are true and (R) explains (A).'
      },
      {
        text: 'Assertion (A): Secondary galvanic cells are widely used in home inverters and automobiles.\nReason (R): Secondary cells can be recharged by passing direct current through them in the reverse direction.',
        opts: { optA: 'Both (A) and (R) are true and (R) is correct explanation for (A).', optB: 'Both (A) and (R) are true but (R) is not correct explanation.', optC: '(A) is true, but (R) is false.', optD: '(A) is false, but (R) is true.' },
        ans: '(A) Both are true and (R) explains (A).'
      },
      {
        text: 'The linkage connecting consecutive amino acid units in a primary protein chain is:',
        opts: { optA: 'Peptide linkage (-CONH-)', optB: 'Glycosidic linkage', optC: 'Phosphodiester linkage', optD: 'Disulfide linkage' },
        ans: '(A) Peptide linkage.'
      },
      {
        text: 'Which transition metal from the 3d series exhibits maximum number of variable oxidation states?',
        opts: { optA: 'Manganese (+2 to +7)', optB: 'Chromium', optC: 'Iron', optD: 'Scandium' },
        ans: '(A) Manganese has maximum unpaired d-electrons ([Ar] 3d⁵ 4s²).'
      },
      {
        text: 'Which reagent is deployed in the Lucas test to distinguish between primary, secondary, and tertiary alcohols?',
        opts: { optA: 'Anhydrous ZnCl2 + concentrated HCl', optB: 'Alkaline KMnO4 solution', optC: 'Acidified K2Cr2O7', optD: 'Pyridinium Chlorochromate (PCC)' },
        ans: '(A) Anhydrous ZnCl2 and conc. HCl.'
      },
      {
        text: 'The unit of rate constant (k) for a zero-order chemical reaction is:',
        opts: { optA: 'mol L⁻¹ s⁻¹', optB: 's⁻¹', optC: 'L mol⁻¹ s⁻¹', optD: 'L² mol⁻² s⁻¹' },
        ans: '(A) mol L⁻¹ s⁻¹.'
      },
      {
        text: 'Which of the following amines will react with benzene sulphonyl chloride (Hinsberg reagent) to form a precipitate that is completely insoluble in aqueous NaOH?',
        opts: { optA: 'Secondary aliphatic amine', optB: 'Primary aliphatic amine', optC: 'Tertiary aliphatic amine', optD: 'Aromatic quaternary salt' },
        ans: '(A) Secondary amines lack acidic hydrogen on nitrogen after sulfonamide formation.'
      }
    ];

    const questions: FullGeneratedQuestion[] = [];
    let qCount = 1;

    // -------------------------------------------------------------
    // SECTION A: Q1 TO Q16 (16 MCQs x 1 Mark = 16 Marks)
    // -------------------------------------------------------------
    shuffleArray(chemMCQPool).slice(0, 16).forEach((q, idx) => {
      questions.push({
        qNum: qCount++,
        partTitle: idx === 0 ? 'SECTION - A: MULTIPLE CHOICE QUESTIONS (16 MARKS)' : undefined,
        typeBadge: '1 Mark MCQ',
        marks: 1,
        text: q.text,
        options: q.opts,
        answerKey: q.ans
      });
    });

    // -------------------------------------------------------------
    // SECTION B: Q17 TO Q21 (5 VSA x 2 Marks = 10 Marks)
    // -------------------------------------------------------------
    questions.push({
      qNum: qCount++,
      partTitle: 'SECTION - B: VERY SHORT ANSWER QUESTIONS (10 MARKS)',
      typeBadge: '2 Marks VSA',
      marks: 2,
      text: `When 50 mL of phenol and 50 mL of aniline are mixed:\n(i) Predict whether the total volume of the resulting solution will be equal to, greater than, or less than 100 mL. Give reason.\n(ii) State the type of deviation from Raoult's Law exhibited by this mixture.`,
      orOptionText: `Answer the following:\n(i) Why does water stop boiling immediately when common salt or sugar is added to vigorously boiling water?\n(ii) If aqueous BaCl2 and Na2SO4 are placed on opposite sides of a semi-permeable membrane, will a white precipitate of BaSO4 appear in the cell? Justify.`,
      answerKey: '(i) Volume will be less than 100 mL due to stronger intermolecular H-bonding between phenol and aniline. (ii) Exhibits negative deviation from Raoult law.'
    });

    questions.push({
      qNum: qCount++,
      typeBadge: '2 Marks VSA',
      marks: 2,
      text: `For a chemical reaction H2(g) + I2(g) <=> 2HI(g), the potential energy of reactants is 100 kJ/mol, activation energy for forward reaction is 40 kJ/mol, and enthalpy of reaction ΔH is -20 kJ/mol.\n(i) Calculate the activation energy for the backward reaction.\n(ii) How will the addition of a suitable catalyst influence the value of activation energy?`,
      answerKey: '(i) Ea(backward) = Ea(forward) - ΔH = 40 - (-20) = 60 kJ/mol. (ii) A catalyst lowers activation energy by providing an alternative pathway.'
    });

    questions.push({
      qNum: qCount++,
      typeBadge: '2 Marks VSA',
      marks: 2,
      text: `Carry out the following organic conversions in not more than two steps:\n(i) Nitrobenzene to 4-Bromoaniline\n(ii) Chlorophenylmethane (Benzyl chloride) to 2-Phenylethanamine`,
      answerKey: '(i) Nitrobenzene -> Aniline (Fe/HCl) -> Bromination with Br2/H2O. (ii) Benzyl chloride + KCN -> Benzyl cyanide -> Reduction (LiAlH4) to 2-Phenylethanamine.'
    });

    questions.push({
      qNum: qCount++,
      typeBadge: '2 Marks VSA',
      marks: 2,
      text: `Write the chemical formulas of the following coordination complexes:\n(i) Diaquasilver(I) dicyanidoargentate(I)\n(ii) Dihydroxidobis(triphenylphosphine)nickel(II)`,
      answerKey: '(i) [Ag(H2O)2][Ag(CN)2]. (ii) [Ni(OH)2(PPh3)2].'
    });

    questions.push({
      qNum: qCount++,
      typeBadge: '2 Marks VSA',
      marks: 2,
      text: `What are essential and non-essential amino acids? Give one example of each. Why do amino acids possess amphoteric behavior in aqueous solution?`,
      answerKey: 'Essential cannot be synthesized in human body (e.g. Valine); Non-essential can be synthesized (e.g. Glycine). Amphoteric due to dipolar Zwitter ion.'
    });

    // -------------------------------------------------------------
    // SECTION C: Q22 TO Q28 (7 SA x 3 Marks = 21 Marks)
    // -------------------------------------------------------------
    questions.push({
      qNum: qCount++,
      partTitle: 'SECTION - C: SHORT ANSWER QUESTIONS (21 MARKS)',
      typeBadge: '3 Marks Short Answer',
      marks: 3,
      text: `Calculate the mass of ascorbic acid (Vitamin C, C6H8O6, molar mass = 176 g/mol) to be dissolved in ${solventMass} g of acetic acid to lower its freezing point by ${deltaTf} K. (Kf for acetic acid = ${kfVal} K kg mol⁻¹).`,
      answerKey: `ΔTf = Kf x (w2 x 1000) / (M2 x w1). w2 = (${deltaTf} x 176 x ${solventMass}) / (${kfVal} x 1000) = ${soluteMass} g.`
    });

    questions.push({
      qNum: qCount++,
      typeBadge: '3 Marks Short Answer',
      marks: 3,
      text: `Represent the cell and write the Nernst equation for the following electrochemical reactions at 298 K:\n(i) Ni(s) + Cu²⁺(aq) -> Ni²⁺(aq) + Cu(s)\n(ii) Mg(s) + 2Ag⁺(aq) -> Mg²⁺(aq) + 2Ag(s)\n(iii) Calculate E_cell if standard electrode potentials are E°(Ni²⁺/Ni) = -0.25 V and E°(Cu²⁺/Cu) = +0.34 V with [Ni²⁺]=0.1M and [Cu²⁺]=0.01M.`,
      answerKey: 'E°cell = 0.34 - (-0.25) = 0.59 V. Nernst: Ecell = 0.59 - (0.0591/2) log([Ni²⁺]/[Cu²⁺]) = 0.59 - 0.0295 = 0.56 V.'
    });

    questions.push({
      qNum: qCount++,
      typeBadge: '3 Marks Short Answer',
      marks: 3,
      text: `Assign plausible chemical explanations for the following observations:\n(i) Toluene on chlorination with Cl2 in presence of sunlight yields benzyl chloride, whereas with Cl2 in presence of FeCl3 in dark yields o- and p-chlorotoluene.\n(ii) Finkelstein reaction of alkyl chlorides with NaI is carried out strictly in dry acetone.\n(iii) Neopentyl chloride has a lower boiling point than n-pentyl chloride.`,
      answerKey: '(i) Sunlight favors free radical side-chain substitution; dark FeCl3 promotes electrophilic aromatic substitution. (ii) NaCl precipitates in dry acetone driving reaction forward. (iii) Branching decreases surface area and van der Waals forces.'
    });

    questions.push({
      qNum: qCount++,
      typeBadge: '3 Marks Short Answer',
      marks: 3,
      text: `Account for the following trends in 3d transition metal chemistry:\n(i) Enthalpy of atomization of zinc is the lowest in 3d series (126 kJ/mol).\n(ii) Sc³⁺ and Zn²⁺ salts are completely white and diamagnetic, whereas Ti³⁺ and Cu²⁺ salts are colored.\n(iii) Transition metals act as excellent industrial catalysts.`,
      answerKey: '(i) Zinc has no unpaired d-electrons ([Ar] 3d¹⁰ 4s²), metallic bonding is weak. (ii) Sc³⁺ (3d⁰) and Zn²⁺ (3d¹⁰) have no unpaired electrons for d-d transition. (iii) Variable oxidation states and vacant d-orbitals.'
    });

    questions.push({
      qNum: qCount++,
      typeBadge: '3 Marks Short Answer',
      marks: 3,
      text: `Arrange the following compounds as directed:\n(a) Increasing order of acidic strength: Formic acid, Acetic acid, Chloroacetic acid, Trichloroacetic acid [1]\n(b) Increasing order of boiling point: Butan-1-ol, Butanal, Butane, Ethoxyethane [1]\n(c) Increasing order of basic strength in aqueous solution: (CH3)3N, (CH3)2NH, CH3NH2, NH3 [1]`,
      answerKey: '(a) Acetic < Formic < Chloroacetic < Trichloroacetic. (b) Butane < Ethoxyethane < Butanal < Butan-1-ol. (c) NH3 < (CH3)3N < CH3NH2 < (CH3)2NH.'
    });

    questions.push({
      qNum: qCount++,
      typeBadge: '3 Marks Short Answer',
      marks: 3,
      text: `Write the chemical reaction mechanism for acid-catalyzed hydration of ethene to yield ethanol showing all three distinct mechanistic steps.`,
      orOptionText: `How will you bring about the following transformations:\n(i) Butan-2-one to 3-Methylpentan-3-ol\n(ii) Anisole to 4-Methoxytoluene\n(iii) Phenol to Salicylaldehyde (Reimer-Tiemann Reaction)`,
      answerKey: 'Step 1: Electrophilic attack of H3O⁺ forming carbocation. Step 2: Nucleophilic attack of water. Step 3: Deprotonation.'
    });

    questions.push({
      qNum: qCount++,
      typeBadge: '3 Marks Short Answer',
      marks: 3,
      text: `A first-order thermal decomposition reaction has a rate constant of ${kRate1} s⁻¹. How long will 5.0 g of this reactant take to reduce to 3.0 g? (Given log 5 = 0.6990, log 3 = 0.4771).`,
      answerKey: 't = (2.303 / k) x log([A0]/[A]). Calculate t using log(5/3) = 0.2219.'
    });

    // -------------------------------------------------------------
    // SECTION D: Q29 TO Q30 (2 Case-Based x 4 Marks = 8 Marks)
    // -------------------------------------------------------------
    questions.push({
      qNum: qCount++,
      partTitle: 'SECTION - D: CASE-BASED QUESTIONS (8 MARKS)',
      typeBadge: '4 Marks Case-Based',
      marks: 4,
      text: `CASE STUDY - CONDUCTIVITY & DEGREE OF DISSOCIATION OF ELECTROLYTES:\nElectrical conductivity in aqueous solutions depends on ion mobility and ion concentration. Strong electrolytes (HCl, NaOH, NaCl) dissociate completely even at high concentrations, exhibiting a gradual linear increase in molar conductivity with dilution described by Kohlrausch equation: Λm = Λ°m - A√c. In contrast, weak electrolytes (CH3COOH, NH4OH) have a very low degree of dissociation at high concentrations, but dilute solutions show a sharp parabolic upsurge as dissociation approaches unity.\n\n(i) Explain why molar conductivity of both strong and weak electrolytes increases on dilution. [1]\n(ii) State Kohlrausch’s Law of Independent Migration of Ions. [1]\n(iii) The molar conductivity of 0.025 mol L⁻¹ methanoic acid is 46.1 S cm² mol⁻¹. Calculate its degree of dissociation (α) and dissociation constant (Ka). Given λ°(H⁺) = 349.6 S cm² mol⁻¹ and λ°(HCOO⁻) = 54.6 S cm² mol⁻¹. [2]`,
      orOptionText: `CASE STUDY - CORROSION AS AN ELECTROCHEMICAL PHENOMENON:\n(i) Write the anodic and cathodic chemical reactions occurring during atmospheric rusting of iron. [2]\n(ii) Why is rusting accelerated in saline seawater? [1]\n(iii) Explain how sacrificial cathodic protection using zinc blocks prevents underground iron pipes from rusting. [1]`,
      answerKey: '(i) Dilution increases ionic mobility and increases ionization of weak electrolytes. (ii) Λ°m equals sum of ionic conductivities. (iii) Λ°m = 404.2 S cm²/mol, α = 46.1 / 404.2 = 0.114. Ka = cα²/(1-α) = 3.67 x 10⁻⁴ mol/L.'
    });

    questions.push({
      qNum: qCount++,
      typeBadge: '4 Marks Case-Based',
      marks: 4,
      text: `CASE STUDY - IRON-EDTA COMPLEX & CHELATION IN FOOD FORTIFICATION:\nMicronutrient malnutrition affects over 40% of populations in developing regions. To combat iron deficiency anaemia, staple food products are fortified with iron fortificants. While common ferrous sulphate precipitates and absorbs poorly in the presence of polyphenols in tea, the synthetic complex Sodium Iron(III) Ethylenediaminetetraacetate [Fe(III)-EDTA] remains completely soluble and bioavailable. EDTA is a hexadentate chelating ligand that wraps around the central iron ion forming five-membered chelate rings, imparting extraordinary thermodynamic stability.\n\n(i) What is the denticity of EDTA ligand and through which coordinating donor atoms does it bind to Fe³⁺? [1]\n(ii) Why is [Fe(III)-EDTA] complex thermodynamically much more stable than simple ferrous sulphate salt? [1]\n(iii) Draw the coordination geometry or write the IUPAC name of the complex ion [Fe(EDTA)]⁻. [2]`,
      answerKey: '(i) Hexadentate ligand binding through 2 nitrogen atoms and 4 carboxylate oxygen atoms. (ii) Chelate effect: formation of stable five-membered rings with high entropy change. (iii) Ethylenediaminetetraacetatoferrate(III) ion.'
    });

    // -------------------------------------------------------------
    // SECTION E: Q31 TO Q33 (3 Long Answer x 5 Marks = 15 Marks)
    // -------------------------------------------------------------
    questions.push({
      qNum: qCount++,
      partTitle: 'SECTION - E: LONG ANSWER QUESTIONS (15 MARKS)',
      typeBadge: '5 Marks Long Answer',
      marks: 5,
      text: `(a) An organic compound (A) with molecular formula C8H8O gives an orange-red precipitate with 2,4-DNP reagent and a yellow precipitate of iodoform on heating with I2 and NaOH. It does not reduce Tollens’ reagent or Fehling’s solution. On drastic oxidation with acidified KMnO4, it gives a carboxylic acid (B) having formula C7H6O2. Identify compounds (A) and (B) and write all chemical equations involved. [3]\n(b) Write chemical equations to illustrate the following reactions:\n(i) Cannizzaro reaction of benzaldehyde\n(ii) Wolff-Kishner reduction of propanal [2]`,
      orOptionText: `(a) Describe the stepwise mechanism of nucleophilic addition of HCN to acetaldehyde in weakly alkaline medium. [2]\n(b) Give simple chemical tests to distinguish between:\n(i) Pentan-2-one and Pentan-3-one\n(ii) Benzaldehyde and Acetophenone\n(iii) Phenol and Benzoic acid [3]`,
      answerKey: '(a) Compound A is Acetophenone (C6H5COCH3); Compound B is Benzoic acid (C6H5COOH). (b) Cannizzaro: 2 C6H5CHO + conc NaOH -> C6H5CH2OH + C6H5COONa. Wolff-Kishner: CH3CH2CHO + NH2NH2 -> CH3CH2CH3.'
    });

    questions.push({
      qNum: qCount++,
      typeBadge: '5 Marks Long Answer',
      marks: 5,
      text: `(a) Using Crystal Field Theory (CFT), explain why [Co(NH3)6]³⁺ is a diamagnetic low-spin complex whereas [CoF6]³⁻ is a paramagnetic high-spin complex. (Atomic number of Co = 27). [3]\n(b) Write the IUPAC name and state the type of isomerism shown by the pair:\n[Co(NH3)5(SO4)]Br and [Co(NH3)5Br]SO4. [2]`,
      orOptionText: `(a) What is Lanthanoid Contraction? State its two critical chemical consequences on the properties of 4d and 5d transition series. [3]\n(b) Write balanced ionic equations for the oxidizing action of acidified potassium dichromate (K2Cr2O7) on:\n(i) Fe²⁺ (Ferrous ions)\n(ii) I⁻ (Iodide ions) [2]`,
      answerKey: '(a) NH3 is strong field ligand, Δo > P, pairs electrons in t2g⁶ eg⁰ (diamagnetic). F⁻ is weak field ligand, Δo < P, t2g⁴ eg² (paramagnetic, 4 unpaired electrons). (b) Ionization isomerism.'
    });

    questions.push({
      qNum: qCount++,
      typeBadge: '5 Marks Long Answer',
      marks: 5,
      text: `(a) The rate of a chemical reaction ${factorTriples} when the temperature increases from ${tempT1} K to ${tempT2} K. Calculate the activation energy (Ea) of the reaction. (Given R = 8.314 J K⁻¹ mol⁻¹, log 2 = 0.3010, log 3 = 0.4771). [3]\n(b) Consider the first-order gas phase thermal decomposition: A(g) -> 2B(g) + C(g). The initial pressure was 100 mm Hg and total pressure after 10 minutes was 180 mm Hg. Calculate the rate constant (k). [2]`,
      orOptionText: `(a) Define order and molecularity of a reaction. Why can molecularity of an elementary reaction never be zero or fractional? [2]\n(b) Differentiate between fibrous proteins and globular proteins with one biological example of each. What chemical changes occur during the denaturation of proteins? [3]`,
      answerKey: '(a) log(k2/k1) = Ea/(2.303 R) x [1/T1 - 1/T2]. Calculate Ea in kJ/mol. (b) Gas phase rate constant formula k = (2.303/t) log(pi / (2pi - pt)).'
    });

    return {
      questions,
      totalMarks: 70,
      instructions: [
        'There are 33 questions in this question paper with internal choice.',
        'SECTION A consists of 16 multiple-choice questions carrying 1 mark each.',
        'SECTION B consists of 5 short answer questions carrying 2 marks each.',
        'SECTION C consists of 7 short answer questions carrying 3 marks each.',
        'SECTION D consists of 2 case-based questions carrying 4 marks each.',
        'SECTION E consists of 3 long answer questions carrying 5 marks each.',
        'All questions are compulsory. Use of log tables and calculators is not allowed.'
      ]
    };
  }

  // =========================================================================
  // 2. BUSINESS STUDIES (CODE 054) - 80 MARKS (SINGLE CONTINUOUS SEQUENCE)
  // =========================================================================
  if (cleanSub.includes('054') || cleanSub.includes('businessstudies')) {
    const techFirm = getRandomChoice([
      { name: 'EDT Smart Automations Ltd', product: 'inverter microwave oven', cost: '₹18,500', fault: 'developed an internal short-circuit catching fire during standard domestic use' },
      { name: 'Solaris Appliances India Ltd', product: 'commercial induction cooktop', cost: '₹14,200', fault: 'heating plate suffered a major insulation breakdown emitting electric shocks' },
      { name: 'AeroPure Environmental Tech Ltd', product: 'high-capacity HEPA air purifier', cost: '₹22,000', fault: 'motor blower assembly caught fire emitting toxic plastic fumes' },
      { name: 'Zentech Consumer Hardware Ltd', product: 'digital smart water geyser', cost: '₹16,800', fault: 'heating thermostat failed bursting the inner tank and flooding boiling water' }
    ]);

    const apparelFirm = getRandomChoice([
      { name: 'Welworth Textiles Ltd', gm: 'Mr. Gun Amroha', hr: 'Mr. Akhilesh Banerjee' },
      { name: 'Alankaar Fabrics Limited', gm: 'Mr. Muralidhar Parekh', hr: 'Mr. Pankaj Kumar' },
      { name: 'Vanguard Apparels India Ltd', gm: 'Ms. Manu Priya', hr: 'Mr. Rajesh Sharma' }
    ]);

    const consumerName = getRandomChoice(['Rohan Verma', 'Pooja Aggarwal', 'Deepak Saxena', 'Karan Mehra', 'Sneha Kapoor', 'Manish Pandey']);

    const bstCompetencyMCQs = [
      {
        text: `The project managers at ${apparelFirm.name} set monthly operational targets and outline strategies to achieve them. Simultaneously, they allocate specific roles, motivate team members through regular recognition, and gather continuous feedback. Thus, various management functions are performed concurrently by all managers all the time. Identify the characteristic of management highlighted:`,
        opts: { optA: 'Management is a continuous process', optB: 'Management is a dynamic function', optC: 'Management is an intangible force', optD: 'Management is goal oriented' },
        ans: '(A) Management is a continuous process.'
      },
      {
        text: 'Henri Fayol’s principle of discipline, which emphasizes obedience to organizational rules and respect for employment agreements, evolved out of the collective experience and wisdom of managers. Which nature of principles of management is reflected here?',
        opts: { optA: 'Formed by practice and experimentation', optB: 'Universal applicability', optC: 'Flexible', optD: 'Mainly behavioral' },
        ans: '(A) Formed by practice and experimentation.'
      },
      {
        text: 'Read the following statements: Assertion (A) and Reason (R).\nASSERTION (A): Maslow’s need hierarchy theory of motivation is widely recognized yet criticized.\nREASON (R): Even though Maslow’s theory focuses on needs as a basis of motivation, his propositions are questioned on their rigid classification and linear hierarchy.\nChoose the correct alternative:',
        opts: {
          optA: 'Both Assertion (A) and Reason (R) are true, and Reason (R) is the correct explanation of Assertion (A).',
          optB: 'Both Assertion (A) and Reason (R) are true, but Reason (R) is NOT the correct explanation.',
          optC: 'Assertion (A) is true, but Reason (R) is false.',
          optD: 'Both Assertion (A) and Reason (R) are false.'
        },
        ans: '(A) Both Assertion and Reason are true and (R) correctly explains (A).'
      },
      {
        text: 'Read the following statements carefully:\nStatement I: Values are basic truths or guidelines for behaviour which are formed after research in work situations.\nStatement II: While practising Principles of Management, values cannot be neglected as business organisations have to fulfil ethical responsibility towards society.\nChoose the correct alternative:',
        opts: { optA: 'Statement II is true, Statement I is false', optB: 'Both statements are true', optC: 'Both statements are false', optD: 'Statement I is true, Statement II is false' },
        ans: '(A) Statement II is true, Statement I is false.'
      },
      {
        text: `${apparelFirm.gm} is working as a Senior Functional Head at an annual compensation of ₹12 Lakh per annum and is also offered shares of the company at a set price which is significantly lower than the open market price. The compensation method deployed here is:`,
        opts: { optA: 'Time-based Pay plus Incentives (Co-partnership / Stock option)', optB: 'Indirect financial payment', optC: 'Time-based direct financial payment only', optD: 'Performance-based piecemeal wage' },
        ans: '(A) Stock option / Co-partnership incentive.'
      },
      {
        text: 'Which of the following constitute components of the Social Environment for an enterprise?\n(1) Rate of inflation increases by 2.5% leading to higher procurement cost.\n(2) Growth in demand for organic and health-focused grocery foods.\n(3) Improvement in life expectancy rate in India over the past two decades.\n(4) A company policy guaranteeing equal opportunities for differently-abled employees.',
        opts: { optA: '(2), (3) and (4)', optB: 'Only (2)', optC: '(1), (2) and (3)', optD: '(1) and (4)' },
        ans: '(A) Statements (2), (3) and (4) represent social trends.'
      },
      {
        text: 'Name the element of the Marketing Mix which involves deciding upon features, quality, packaging, labelling, and branding of goods offered to the target market:',
        opts: { optA: 'Product', optB: 'Price', optC: 'Place', optD: 'Promotion' },
        ans: '(A) Product.'
      },
      {
        text: 'Choose the correct statement regarding the controlling function of management:',
        opts: { optA: 'Deviations beyond the acceptable range should be systematically analyzed for root causes', optB: 'Measurement of actual performance should be conducted only after the entire project completes', optC: 'Managers must micromanage each and every trivial deviation', optD: 'No corrective action is needed if deviations occur in Key Result Areas' },
        ans: '(A) Deviations should be analyzed for their critical causes.'
      },
      {
        text: 'Arrange the elements of the Communication Process in the correct chronological sequence:\n(i) Media, (ii) Message, (iii) Sender, (iv) Decoding, (v) Receiver, (vi) Feedback, (vii) Encoding.\nChoose the correct option:',
        opts: { optA: '(iii) -> (ii) -> (vii) -> (i) -> (iv) -> (v) -> (vi)', optB: '(ii) -> (iii) -> (vii) -> (i) -> (v) -> (iv) -> (vi)', optC: '(iii) -> (vii) -> (ii) -> (i) -> (iv) -> (v) -> (vi)', optD: '(i) -> (ii) -> (iii) -> (iv) -> (v) -> (vi) -> (vii)' },
        ans: '(A) Sender -> Message -> Encoding -> Media -> Decoding -> Receiver -> Feedback.'
      },
      {
        text: 'Which of the following is the correct functional role of a Depository in the Indian securities market?',
        opts: { optA: 'A depository holds and transfers securities in dematerialized (electronic) form on behalf of investors', optB: 'A depository acts as a stock broker executing buy and sell bids', optC: 'A depository purchases shares directly from issuers and underwrites retail issues', optD: 'A depository sets the listing price of secondary market shares' },
        ans: '(A) Holds and transfers securities in demat form.'
      },
      {
        text: 'A consumer purchases a branded product only when it is perceived to offer the greatest value and utility for the money spent. Which feature of marketing is reflected in this statement?',
        opts: { optA: 'Customer Value', optB: 'Creating a market offering', optC: 'Exchange mechanism', optD: 'Needs and wants' },
        ans: '(A) Customer Value.'
      },
      {
        text: `${apparelFirm.gm}, General Manager of ${apparelFirm.name}, continuously scans the business environment and adapts the organization to external shifts. Yet, turbulent unforeseen market changes disrupted quarterly targets. Which limitation of planning is highlighted here?`,
        opts: { optA: 'Planning may not work in a dynamic environment', optB: 'Planning leads to rigidity', optC: 'Planning reduces creativity', optD: 'Planning involves huge costs' },
        ans: '(A) Planning may not work in a dynamic environment.'
      },
      {
        text: 'Which step in the Staffing Process enables organizations to offer learning opportunities for career advancement, thereby retaining high-performing employees?',
        opts: { optA: 'Training and Development', optB: 'Placement and Orientation', optC: 'Recruitment', optD: 'Performance Appraisal' },
        ans: '(A) Training and Development.'
      },
      {
        text: `${techFirm.name} has decided to launch a nationwide advertising campaign hiring brand ambassadors involving an outlay of ₹120 Crores. Identify the financial decision involved:`,
        opts: { optA: 'Capital Budgeting / Long-term Investment Decision', optB: 'Financing Decision', optC: 'Working Capital Decision', optD: 'Dividend Decision' },
        ans: '(A) Capital Budgeting / Long-term Investment Decision.'
      },
      {
        text: `${techFirm.name} has a high fixed operating cost (high operating leverage). If the finance manager decides to raise additional long-term funds through debt, the overall business risk will increase significantly. Which factor affecting capital structure is highlighted?`,
        opts: { optA: 'Risk Consideration', optB: 'Cost of Debt', optC: 'Floatation Costs', optD: 'Control' },
        ans: '(A) Risk Consideration.'
      },
      {
        text: 'The Finance Manager approaches a well-regulated financial market that facilitates the mobilization of medium and long-term funds through debt and equity instruments. Identify the market:',
        opts: { optA: 'Capital Market', optB: 'Money Market', optC: 'Call Money Market', optD: 'Commercial Paper Market' },
        ans: '(A) Capital Market.'
      },
      {
        text: 'Companies are legally and contractually required to ensure that dividend payouts do not violate the terms and debt covenants established by lending institutions. Which factor affecting dividend decision is this?',
        opts: { optA: 'Contractual Constraints', optB: 'Access to Capital Market', optC: 'Stock Market Reaction', optD: 'Stability of Earnings' },
        ans: '(A) Contractual Constraints.'
      },
      {
        text: 'Read the following statements carefully:\nStatement I: The primary objective of Financial Management is to maximize the wealth of equity shareholders.\nStatement II: The financing decision of a corporate enterprise is completely unaffected by the extent of retained earnings available.\nChoose the correct alternative:',
        opts: { optA: 'Statement I is true, Statement II is false', optB: 'Both statements are true', optC: 'Both statements are false', optD: 'Statement II is true, Statement I is false' },
        ans: '(A) Statement I is true, Statement II is false.'
      },
      {
        text: 'Under the Consumer Protection Act, 2019, if a consumer is dissatisfied with the verdict of the State Consumer Disputes Redressal Commission, within how many days can an appeal be filed before the National Commission?',
        opts: { optA: '30 Days', optB: '45 Days', optC: '60 Days', optD: '90 Days' },
        ans: '(A) 30 Days.'
      },
      {
        text: 'Which leadership style is characterized by a leader who consults subordinates, invites their suggestions, and encourages two-way participation in decision-making?',
        opts: { optA: 'Democratic / Participative Leadership', optB: 'Autocratic Leadership', optC: 'Laissez-faire Leadership', optD: 'Paternalistic Leadership' },
        ans: '(A) Democratic Leadership.'
      }
    ];

    const questions: FullGeneratedQuestion[] = [];
    let qCount = 1;

    shuffleArray(bstCompetencyMCQs).slice(0, 20).forEach((q) => {
      questions.push({
        qNum: qCount++,
        typeBadge: '1 Mark MCQ',
        marks: 1,
        text: q.text,
        options: q.opts,
        answerKey: q.ans
      });
    });

    const pool3M = [
      {
        text: `State any three points of significance of Decentralization for a fast-growing manufacturing enterprise like ${apparelFirm.name}.`,
        or: `State any three limitations of a Formal Organization Structure in an enterprise.`,
        ans: 'Significance: Develops initiative, quick decisions, relief to top management.'
      },
      {
        text: `CASE SCENARIO:\nAnabel Apparel Creations accumulated an unsold stock of seasonal fashion garments across its retail outlets. In order to clear inventory, the management offered heavy clearance discounts and sponsored college cultural fests to aggressively push sales. However, customer response remained poor as garments did not match prevailing consumer preferences.\n(a) Identify and state the Marketing Management philosophy followed by Anabel Creations. [1.5]\n(b) Name and state any two other philosophies of marketing. [1.5]`,
        or: undefined,
        ans: '(a) Selling Philosophy. (b) Product concept and Marketing concept.'
      },
      {
        text: `Give any three points of distinction between the Money Market and Capital Market on the basis of: (i) Maturity period of instruments, (ii) Degree of liquidity, and (iii) Expected financial returns.`,
        or: `State any three Protective Functions performed by the Securities and Exchange Board of India (SEBI) to safeguard investors.`,
        ans: 'Money Market: short term (< 1 yr), high liquidity. Capital Market: medium/long term, relatively lower liquidity.'
      },
      {
        text: `CASE SCENARIO:\nMuralidhar Parekh established an eco-friendly textile printing unit in Gujarat. To expand market share, he set the organizational goal of achieving a 15% annual sales increase and framed corporate policies. Being overburdened, he appointed qualified managers to supervise daily production and execute plans.\n(a) Identify the level of management at which the workforce was appointed to implement strategies. [1]\n(b) State any two functions performed by managers at this level. [2]`,
        or: undefined,
        ans: '(a) Middle Level Management. (b) Interpret policies, ensure staffing, assign duties.'
      },
      {
        text: `Explain the Principle of Absoluteness of Accountability. Can a top executive delegate accountability along with authority and responsibility? Illustrate with a brief example.`,
        or: `Explain any three features of Coordination as the essence of management.`,
        ans: 'Accountability cannot be delegated. A manager remains answerable to superiors.'
      },
      {
        text: `CASE SCENARIO:\nIn ${techFirm.name}, the production department noticed a minor delivery delay of 2 days which was within tolerance. However, the rejection rate of finished products in quality checks increased from 1% to 8%, which was a Key Result Area.\n(a) Which technique of analyzing deviations in controlling should the manager deploy here? [1.5]\n(b) Differentiate between Critical Point Control (CPC) and Management by Exception (MBE). [1.5]`,
        or: undefined,
        ans: '(a) Critical Point Control. (b) CPC focuses on Key Result Areas; MBE states controlling everything controls nothing.'
      }
    ];

    shuffleArray(pool3M).slice(0, 4).forEach((q) => {
      questions.push({
        qNum: qCount++,
        typeBadge: '3 Marks Short Answer',
        marks: 3,
        text: q.text,
        orOptionText: q.or,
        answerKey: q.ans
      });
    });

    const pool4M = [
      {
        text: `Explain the following two functions of Marketing with suitable business examples:\n(a) Customer Support Services [2]\n(b) Packaging and Labelling [2]`,
        or: `Explain any two distinguishing features of each of the following promotional tools:\n(a) Personal Selling [2]\n(b) Advertising [2]`,
        ans: '(a) Customer support builds brand loyalty. Packaging protects and acts as silent salesman; labelling provides statutory information.'
      },
      {
        text: `Explain why Planning is considered as:\n(a) A pervasive function of management [2]\n(b) A futuristic function of management [2]`,
        or: `Explain the following two types of plans used in business organizations:\n(a) Strategy [2]\n(b) Procedure [2]`,
        ans: '(a) Pervasive across all departments. Futuristic: anticipates future events.'
      },
      {
        text: `CASE SCENARIO - BUSINESS ENVIRONMENT:\nThe market research team at ${techFirm.name} analyzed recent lifestyle shifts among urban professionals. They observed that rising health consciousness, environmental sensitivity towards e-waste, and intensive smartphone usage have generated high demand for eco-certified smart appliances.\n(a) In context of the above case, identify and explain the feature of the business environment highlighted. [2]\n(b) Explain any two other features of the business environment. [2]`,
        or: undefined,
        ans: '(a) Dynamic nature / Inter-relatedness of business forces. (b) Uncertainty and Complexity.'
      },
      {
        text: `'A good controlling system helps an organization in several ways.' Explain any four points highlighting the importance of the Controlling function.`,
        or: undefined,
        ans: 'Accomplishing goals, Judging accuracy of standards, Efficient resource use, Employee motivation.'
      },
      {
        text: `CASE SCENARIO - SCIENTIFIC MANAGEMENT:\nThe factory manager of Manik Steel Plant, Mr. Mussadi Lal, was in dilemma over workers shirking duty and faking illness, leading to underutilization of expensive machinery. The job of the workers was complex and technical. A management expert advised deploying eight specialist supervisors to guide and oversee workers during operations.\nIdentify and explain the technique of scientific management discussed above with its two planning and execution functional heads.`,
        or: undefined,
        ans: 'Functional Foremanship. Planning heads: Route clerk, Instruction card clerk, Time & cost clerk, Disciplinarian. Production heads: Speed boss, Gang boss, Repair boss, Inspector.'
      },
      {
        text: `CASE SCENARIO - SELECTION PROCESS:\n${apparelFirm.name} plans to recruit eight software engineers. The Human Resource Manager eliminated unfit applicants through preliminary screening, conducted written aptitude tests and employment interviews, and verified candidate references.\nIdentify and explain the remaining steps that the manager must undertake to finalize the appointment of the selected engineers.`,
        or: undefined,
        ans: 'Remaining steps: Selection decision, Medical examination, Job offer, and Contract of employment.'
      }
    ];

    shuffleArray(pool4M).slice(0, 6).forEach((q) => {
      questions.push({
        qNum: qCount++,
        typeBadge: '4 Marks Medium Answer',
        marks: 4,
        text: q.text,
        orOptionText: q.or,
        answerKey: q.ans
      });
    });

    questions.push({
      qNum: qCount++,
      typeBadge: '6 Marks Long Answer / Case-Based',
      marks: 6,
      text: `CASE SCENARIO - FINANCIAL MANAGEMENT:\nSatya Prakash runs a wholesale dry fruits distribution enterprise in Rajasthan. He maintains substantial investment in current assets to ensure uninterrupted operations. Recently, he sold merchandise worth ₹50 Lakh on strict 60-day credit to a corporate client. When he placed an emergency replenishment order with his supplier, delivery was delayed by a significant time lag.\n(a) Identify the concept of Financial Management discussed above. [1]\n(b) Explain any four factors that determine the requirement of the concept identified in part (a) with reference to the case. [5]`,
      answerKey: '(a) Working Capital Management. (b) Factors: Credit allowed, Credit availed, Operating cycle/time lag, Scale of operations, Business cycle fluctuations.'
    });

    questions.push({
      qNum: qCount++,
      typeBadge: '6 Marks Long Answer / Case-Based',
      marks: 6,
      text: `CASE SCENARIO - DIRECTING & LEADERSHIP:\nMr. Pankaj Kumar is working as the Human Resource Manager in ${apparelFirm.name} heading a team of fifteen executives. He has played a key role in organizational success by maintaining warm interpersonal relations, actively listening to subordinate concerns, and inspiring them to willingly cooperate to achieve excellence.\n(a) Identify and explain the element of the directing function of management discussed in the case. [2]\n(b) State any four features of the element identified in part (a). [4]`,
      answerKey: '(a) Leadership. (b) Features: Ability of an individual to influence others, continuous process, exercised to achieve common goals, interpersonal relationship.'
    });

    questions.push({
      qNum: qCount++,
      typeBadge: '6 Marks Long Answer / Case-Based',
      marks: 6,
      text: `CASE SCENARIO - ORGANIZATIONAL STRUCTURE:\nMalini established her website development company 'Rapid Software Pvt Ltd'. To maintain smooth workflow, she divided operations into four distinct functional departments: Web Designing, Software Coding, Accounting, and Customer Support, with each department reporting to a functional head.\nShalini joined a large conglomerate 'Babylon Group' which operates independent autonomous businesses: Babylon Web Services, Babylon Prime Media, and Babylon Retail. Shalini was appointed head of Babylon Web Services division and made directly accountable for its profit and loss.\n(a) Identify the types of organizational framework adopted by Malini and Shalini respectively. [2]\n(b) Differentiate between the two structures on the basis of: (i) Formation, (ii) Specialization, (iii) Responsibility, (iv) Managerial development. [4]`,
      answerKey: '(a) Malini: Functional Structure; Shalini: Divisional Structure. (b) Comparison on basis of formation, specialization, responsibility, and managerial development.'
    });

    questions.push({
      qNum: qCount++,
      typeBadge: '6 Marks Long Answer / Case-Based',
      marks: 6,
      text: `CASE SCENARIO - CONSUMER PROTECTION ACT, 2019:\nConsumer ${consumerName} purchased a ${techFirm.product} for ${techFirm.cost} manufactured by ${techFirm.name} from an authorized retail dealer. Within three days of usage, the ${techFirm.fault}. The dealer and company refused to provide a refund or repair, claiming goods once sold cannot be returned under company policy.\n(a) Identify and state two Consumer Rights of ${consumerName} that have been violated in this situation. [2]\n(b) In which consumer dispute redressal forum should ${consumerName} file the formal complaint? Explain the three-tier judicial machinery under the Act. [2]\n(c) State any two reliefs available to ${consumerName} from the consumer commission. [2]`,
      orOptionText: `(a) State any three rights available to a consumer under the Consumer Protection Act, 2019 for the protection and promotion of consumer interests. [3]\n(b) Explain any three consumer responsibilities that a buyer should keep in mind while purchasing goods or services. [3]`,
      answerKey: '(a) Right to Safety and Right to Seek Redressal. (b) District Consumer Commission (claim up to ₹50 Lakh). Three-tier machinery: District, State, National Commissions. (c) Reliefs: Removal of defect, replacement of product, refund of price paid, compensation for damages.'
    });

    return {
      questions,
      totalMarks: 80,
      instructions: [
        'This question paper contains 34 questions.',
        'Marks are indicated against each question.',
        'Answers should be brief and to the point.',
        'Answers to the questions carrying 3 marks may be from 50 to 75 words.',
        'Answers to the questions carrying 4 marks may be about 150 words.',
        'Answers to the questions carrying 6 marks may be about 200 words.',
        'Attempt all parts of the questions together.'
      ]
    };
  }

  // =========================================================================
  // 3. ACCOUNTANCY (CODE 055) - 80 MARKS (PART A 60M + PART B 20M)
  // =========================================================================
  if (cleanSub.includes('055') || cleanSub.includes('accountancy')) {
    const comp1 = getRandomChoice(['Zenith Technologies Ltd', 'Vanguard Solar Power Ltd', 'Apex Infrastructure Ltd', 'Reliance Logistics Ltd', 'Tata Green Energy Ltd']);
    const comp2 = getRandomChoice(['Crown Industries Ltd', 'Nova Pharma Ltd', 'Jupiter Textiles Ltd']);
    const vendor1 = getRandomChoice(['Precision Engineering Works', 'Modern Machines Ltd', 'Sun Solar Systems']);

    const sharesCount = getRandomChoice([50000, 60000, 80000, 100000]);
    const appliedShares = Math.round(sharesCount * getRandomChoice([1.25, 1.4, 1.5]));
    const allottedShares = Math.round(sharesCount * 1.2);
    const premiumVal = getRandomChoice([2, 3, 4]);
    const defaulterShares = getRandomChoice([400, 500, 600, 800]);
    const reissuedShares = Math.round(defaulterShares * getRandomChoice([0.6, 0.75, 0.8]));
    const reissuePrice = getRandomChoice([7, 8, 9]);

    const partnerGroupA = getRandomChoice([
      { p1: 'Aarav', p2: 'Bhavna', p3: 'Chetan', r1: 3, r2: 2, r3: 1, c1: 300000, c2: 200000, c3: 100000 },
      { p1: 'Rohit', p2: 'Kavita', p3: 'Deepak', r1: 5, r2: 3, r3: 2, c1: 500000, c2: 300000, c3: 200000 },
      { p1: 'Varun', p2: 'Tarun', p3: 'Karan', r1: 4, r2: 3, r3: 1, c1: 400000, c2: 300000, c3: 100000 },
      { p1: 'Mohit', p2: 'Shobhit', p3: 'Ankit', r1: 2, r2: 2, r3: 1, c1: 250000, c2: 250000, c3: 150000 }
    ]);

    const partnerGroupB = getRandomChoice([
      { p1: 'Madhav', p2: 'Raghav', newP: 'Keshav', r1: 3, r2: 2, share: '1/5', cap: 80000, gwill: 30000, bld: 140000, mch: 90000, deb: 70000, stk: 50000, crd: 40000, res: 30000 },
      { p1: 'Sanjay', p2: 'Vijay', newP: 'Ajay', r1: 2, r2: 1, share: '1/4', cap: 100000, gwill: 40000, bld: 160000, mch: 110000, deb: 80000, stk: 60000, crd: 50000, res: 40000 },
      { p1: 'Pradeep', p2: 'Kuldeep', newP: 'Sandeep', r1: 3, r2: 1, share: '1/5', cap: 75000, gwill: 25000, bld: 150000, mch: 95000, deb: 75000, stk: 55000, crd: 45000, res: 35000 }
    ]);

    const bankBalAdm = 35000;
    const totAssetsAdm = partnerGroupB.bld + partnerGroupB.mch + (partnerGroupB.deb - 3000) + partnerGroupB.stk + bankBalAdm;
    const capitalsSumAdm = totAssetsAdm - partnerGroupB.crd - partnerGroupB.res;
    const p1CapAdm = Math.round(capitalsSumAdm * (partnerGroupB.r1 / (partnerGroupB.r1 + partnerGroupB.r2)));
    const p2CapAdm = capitalsSumAdm - p1CapAdm;

    const debRate = getRandomChoice([8, 9, 10, 12]);
    const purchasePrice = getRandomChoice([330000, 440000, 550000, 660000]);
    const debPremium = getRandomChoice([10, 20]);
    const debCount = Math.round(purchasePrice / (100 * (1 + debPremium / 100)));

    const partA_MCQ_Bank = [
      { text: `In the absence of a Partnership Deed, interest on loan advanced by partner ${partnerGroupA.p1} to the firm is payable at:`, opts: { optA: '6% p.a.', optB: '10% p.a.', optC: '12% p.a.', optD: 'Zero / Nil' }, ans: '(A) 6% p.a.' },
      { text: `At the time of admission of ${partnerGroupB.newP}, general reserve of ₹${partnerGroupB.res.toLocaleString('en-IN')} appearing in the balance sheet is transferred to:`, opts: { optA: 'Old Partners’ Capital Accounts in Old Ratio', optB: 'All Partners in New Ratio', optC: 'Revaluation Account', optD: 'Sacrificing Ratio' }, ans: '(A) Old Partners in Old Ratio.' },
      { text: 'A company forfeited 100 shares of ₹10 each on which ₹7 was received. What is the maximum discount allowed on reissue of these shares?', opts: { optA: 'Amount received on forfeiture', optB: 'Face value of shares', optC: 'Uncalled amount', optD: 'Statutory 5% limit' }, ans: '(A) Maximum discount allowed equals the amount forfeited per share.' },
      { text: 'Securities Premium Account can be utilized for which of the following purposes as per Section 52(2) of the Companies Act, 2013?', opts: { optA: 'Issuing fully paid bonus shares to members', optB: 'Distribution of dividends', optC: 'Paying trade creditors', optD: 'Writing off general reserve' }, ans: '(A) Issuing fully paid bonus shares.' },
      { text: 'Gaining Ratio is computed by applying which formula?', opts: { optA: 'New Ratio - Old Ratio', optB: 'Old Ratio - New Ratio', optC: 'Old Ratio - Sacrificing Ratio', optD: 'New Ratio + Old Ratio' }, ans: '(A) New Ratio - Old Ratio.' },
      { text: `If partner ${partnerGroupA.p2} withdraws ₹8,000 at the beginning of each calendar month, interest on drawings will be calculated for:`, opts: { optA: '6.5 Months', optB: '6.0 Months', optC: '5.5 Months', optD: '7.0 Months' }, ans: '(A) 6.5 Months.' },
      { text: 'When debentures are issued as Collateral Security for a secured bank loan, the entry passed in books is:', opts: { optA: 'Debit Debenture Suspense A/c and Credit Debentures A/c', optB: 'Debit Bank A/c and Credit Debentures A/c', optC: 'Debit Bank Loan A/c and Credit Debenture Suspense A/c', optD: 'No entry required in journal' }, ans: '(A) Debenture Suspense A/c Dr. to Debentures A/c.' },
      { text: 'Realisation Account prepared at the time of dissolution of a firm is in the nature of:', opts: { optA: 'Nominal Account', optB: 'Personal Account', optC: 'Real Account', optD: 'Representative Personal Account' }, ans: '(A) Nominal Account.' },
      { text: 'Calls in Arrears is deducted from which item in the Notes to Accounts of Balance Sheet?', opts: { optA: 'Subscribed but not fully paid-up capital', optB: 'Authorized Share Capital', optC: 'Issued Share Capital', optD: 'Securities Premium Reserve' }, ans: '(A) Subscribed but not fully paid-up capital.' },
      { text: 'At the time of forfeiture of shares, Share Capital Account is debited with:', opts: { optA: 'Called-up amount on forfeited shares', optB: 'Face value of forfeited shares', optC: 'Paid-up amount on forfeited shares', optD: 'Uncalled amount on forfeited shares' }, ans: '(A) Called-up amount.' },
      { text: `When partner ${partnerGroupA.p3} retires, his share of goodwill is credited to his capital account and debited to continuing partners in their:`, opts: { optA: 'Gaining Ratio', optB: 'Sacrificing Ratio', optC: 'Old Profit Sharing Ratio', optD: 'Capital Ratio' }, ans: '(A) Gaining Ratio.' },
      { text: 'Sacrificing Ratio is used to distribute which of the following items at the time of admission of a partner?', opts: { optA: 'Premium for Goodwill brought by new partner', optB: 'Revaluation Profit', optC: 'General Reserve', optD: 'Accumulated Losses' }, ans: '(A) Premium for Goodwill.' }
    ];

    const partB_MCQ_Bank = [
      { text: `An enterprise has Current Assets ₹8,00,000 and Current Liabilities ₹4,00,000. Payment of ₹50,000 to trade payables will:`, opts: { optA: 'Improve Current Ratio', optB: 'Reduce Current Ratio', optC: 'Not change Current Ratio', optD: 'Make Current Ratio zero' }, ans: '(A) Improve Current Ratio.' },
      { text: 'Which financial ratio measures the proportion of total assets funded through shareholders’ funds?', opts: { optA: 'Proprietary Ratio', optB: 'Debt to Equity Ratio', optC: 'Interest Coverage Ratio', optD: 'Total Assets to Debt Ratio' }, ans: '(A) Proprietary Ratio.' },
      { text: 'Cash outflow on purchase of patent rights is categorized under which cash flow activity (AS-3)?', opts: { optA: 'Investing Activities', optB: 'Operating Activities', optC: 'Financing Activities', optD: 'Cash and Cash Equivalents' }, ans: '(A) Investing Activities.' },
      { text: 'Dividend received on investments by a manufacturing company is shown in Cash Flow Statement as:', opts: { optA: 'Inflow under Investing Activities', optB: 'Inflow under Operating Activities', optC: 'Inflow under Financing Activities', optD: 'Deduction from net profit' }, ans: '(A) Inflow under Investing Activities.' }
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

    const netProf = getRandomChoice([72000, 84000, 96000, 108000]);
    const partnerSal = getRandomChoice([1500, 2000, 2500]);
    questions.push({
      qNum: qCount++,
      typeBadge: '3 Marks Short Answer',
      marks: 3,
      text: `${partnerGroupA.p1}, ${partnerGroupA.p2} and ${partnerGroupA.p3} are partners sharing profits in ${partnerGroupA.r1}:${partnerGroupA.r2}:${partnerGroupA.r3} with capitals ₹${partnerGroupA.c1.toLocaleString('en-IN')}, ₹${partnerGroupA.c2.toLocaleString('en-IN')} and ₹${partnerGroupA.c3.toLocaleString('en-IN')} respectively. Their Partnership Deed provides interest on capital @ 6% p.a. and partner salary of ₹${partnerSal.toLocaleString('en-IN')} per month to ${partnerGroupA.p2}. During the year ended 31st March 2026, the firm earned a net profit of ₹${netProf.toLocaleString('en-IN')}. Prepare Profit and Loss Appropriation Account for the year.`,
      orOptionText: `${partnerGroupA.p1} and ${partnerGroupA.p2} are partners sharing profits equally. On 31st March 2026, after closing books, it was discovered that interest on drawings @ 6% p.a. was omitted. Drawings during the year were: ${partnerGroupA.p1} ₹30,000 and ${partnerGroupA.p2} ₹20,000. Pass necessary single adjusting journal entry showing working notes clearly.`,
      answerKey: 'P&L Appropriation A/c preparation OR Adjusting journal entry.'
    });

    questions.push({
      qNum: qCount++,
      typeBadge: '3 Marks Short Answer',
      marks: 3,
      text: `${comp1} purchased running business of ${vendor1} for ₹${purchasePrice.toLocaleString('en-IN')} payable by issuing ${debRate}% Debentures of ₹100 each at a premium of ${debPremium}%. Pass necessary journal entries in the books of ${comp1}.`,
      orOptionText: `Starline Ltd obtained a bank loan of ₹8,00,000 from State Bank of India and issued 10,000, 9% Debentures of ₹100 each as Collateral Security. Explain how this transaction will be shown in the Balance Sheet and Notes to Accounts under both methods.`,
      answerKey: `Number of debentures = ₹${purchasePrice} / ₹${100 * (1 + debPremium / 100)} = ${debCount}. Entries for purchase and debenture allotment.`
    });

    const deceasedProf = getRandomChoice([120000, 150000, 180000]);
    questions.push({
      qNum: qCount++,
      typeBadge: '3 Marks Short Answer',
      marks: 3,
      text: `${partnerGroupA.p1}, ${partnerGroupA.p2} and ${partnerGroupA.p3} are partners sharing profits in ${partnerGroupA.r1}:${partnerGroupA.r2}:${partnerGroupA.r3}. Partner ${partnerGroupA.p3} dies on 30th June 2026. Partnership deed provides that deceased partner’s share of profit till death be calculated on basis of last year’s profit of ₹${deceasedProf.toLocaleString('en-IN')}. Calculate ${partnerGroupA.p3}’s share of profit and pass necessary journal entry.`,
      orOptionText: `A firm earned average profits of ₹90,000 during the last five years. Capital employed in the business is ₹7,50,000 and the normal rate of return on capital is 10%. Calculate the value of goodwill of the firm by:\n(i) Capitalization of Super Profit Method\n(ii) 3 Years' Purchase of Super Profit Method`,
      answerKey: `Profit till death = ₹${deceasedProf} x 3/12 x ${partnerGroupA.r3}/${partnerGroupA.r1 + partnerGroupA.r2 + partnerGroupA.r3}. Journal entry: P&L Suspense A/c Dr. to Deceased Partner Capital A/c.`
    });

    questions.push({
      qNum: qCount++,
      typeBadge: '3 Marks Short Answer',
      marks: 3,
      text: `Differentiate between "Dissolution of Partnership" and "Dissolution of Partnership Firm" on the basis of:\n(i) Court intervention\n(ii) Continuation of economic business\n(iii) Closure of books of accounts`,
      orOptionText: `Explain Section 48 of the Indian Partnership Act, 1932 regarding the settlement of accounts at the time of dissolution of a partnership firm.`,
      answerKey: '(i) Court: Voluntary vs Court order. (ii) Business continues vs terminates. (iii) Books remain open vs closed permanently.'
    });

    const forfShares1 = getRandomChoice([200, 300, 400]);
    const forfReissue1 = Math.round(forfShares1 * 0.75);
    questions.push({
      qNum: qCount++,
      typeBadge: '4 Marks Medium Answer',
      marks: 4,
      text: `Pass necessary journal entries for forfeiture and reissue in the following independent cases:\n(a) Beta Ltd forfeited ${forfShares1} shares of ₹10 each (₹8 called up) for non-payment of first call of ₹2 per share. Out of these, ${forfReissue1} shares were reissued as ₹8 paid up for ₹7 per share.\n(b) Sigma Ltd forfeited 150 shares of ₹10 each issued at ₹2 premium for non-payment of allotment ₹5 (including premium). Reissued as fully paid for ₹9 per share.`,
      answerKey: 'Entries for share forfeiture, reissue, and transfer of net forfeited balance to Capital Reserve.'
    });

    const crdReal = getRandomChoice([50000, 60000, 75000]);
    questions.push({
      qNum: qCount++,
      typeBadge: '4 Marks Medium Answer',
      marks: 4,
      text: `Pass journal entries on dissolution of a partnership firm:\n(i) Creditors ₹${crdReal.toLocaleString('en-IN')} accepted stock of book value ₹${Math.round(crdReal * 0.8).toLocaleString('en-IN')} in full settlement of ₹${Math.round(crdReal * 0.75).toLocaleString('en-IN')} and remaining in cash.\n(ii) An unrecorded computer realized ₹7,000 in cash.\n(iii) Partner ${partnerGroupA.p1} agreed to pay realization expenses of ₹4,000 for an agreed remuneration of ₹6,000.`,
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

    const retGoodwill = getRandomChoice([60000, 75000, 90000]);
    questions.push({
      qNum: qCount++,
      typeBadge: '6 Marks Long Answer',
      marks: 6,
      text: `${partnerGroupA.p1}, ${partnerGroupA.p2} and ${partnerGroupA.p3} were partners sharing in ${partnerGroupA.r1}:${partnerGroupA.r2}:${partnerGroupA.r3}. Partner ${partnerGroupA.p2} retires on 31st March 2026. Balance Sheet showed Capitals: ${partnerGroupA.p1} ₹${partnerGroupA.c1.toLocaleString('en-IN')}; ${partnerGroupA.p2} ₹${partnerGroupA.c2.toLocaleString('en-IN')}; ${partnerGroupA.p3} ₹${partnerGroupA.c3.toLocaleString('en-IN')}; General Reserve ₹40,000. Goodwill of the firm was valued at ₹${retGoodwill.toLocaleString('en-IN')}. Plant was revalued at ₹20,000 higher and Stock was reduced by ₹10,000. Partner ${partnerGroupA.p2} was paid ₹30,000 in cash and the balance transferred to his loan account. Prepare Revaluation Account and Partners’ Capital Accounts.`,
      orOptionText: `A, B and C dissolve their partnership firm. Assets realized ₹4,20,000 (book value ₹4,60,000). Creditors of ₹80,000 settled at 5% discount. Realisation expenses of ₹5,000 paid by firm. Pass necessary realization and capital ledger entries.`,
      answerKey: 'Revaluation Account, Goodwill adjustment in gaining ratio, and Retiring partner loan balance OR Realisation account entries.'
    });

    const debIssueCount = getRandomChoice([4000, 5000, 6000]);
    const secPremBal = getRandomChoice([50000, 60000, 75000]);
    questions.push({
      qNum: qCount++,
      typeBadge: '6 Marks Long Answer',
      marks: 6,
      text: `Alpha Limited issued ${debIssueCount.toLocaleString('en-IN')}, 9% Debentures of ₹100 each on 1st April 2025. Pass journal entries for issue of debentures and writing off loss/discount in following independent cases:\n(i) Issued at par redeemable at 5% premium.\n(ii) Issued at 5% discount redeemable at 5% premium.\n(iii) Issued at 10% premium redeemable at 5% premium.\nCompany had a balance of ₹${secPremBal.toLocaleString('en-IN')} in Securities Premium Account.`,
      answerKey: 'Record issue of debentures with Loss on Issue of Debentures and Premium on Redemption, followed by writing off loss.'
    });

    // PART B (Q27 to Q34 = 20 Marks)
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

    const revOp = getRandomChoice([1200000, 1500000, 1800000]);
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

    const operNetProf = getRandomChoice([360000, 420000, 480000]);
    const operDep = getRandomChoice([35000, 45000, 55000]);
    const operTax = getRandomChoice([60000, 75000, 85000]);
    const operRecInc = getRandomChoice([20000, 30000, 40000]);
    const operInvDec = getRandomChoice([25000, 35000, 45000]);
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
<b>Additional Information:</b> Depreciation charged on Plant & Machinery was ₹50,000 during the year. Debentures were issued on 31st March 2026.
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
  // 4. FALLBACK FOR REMAINING SUBJECTS
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
