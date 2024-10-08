type Content = [string, string];

const common: Content[] = [
  ["\\frac{a}{b}", "\\frac{}{}"],
  ["\\sqrt{a}", "\\sqrt{}"],
  ["\\sqrt[n]{a}", "\\sqrt[]{}"],
  ["a_{b}", "_{}"],
  ["a^{b}", "^{}"],
  ["\\int_{a}^{b}", "\\int_{}^{}"],
  ["\\sum_{a}^{b}", "\\sum_{}^{}"],
  ["\\prod_{a}^{b}", "\\prod_{}^{}"],
  ["\\lim_{a \\to b}", "\\lim_{}^{}"],
  ["\\log_{a}^{b}", "\\log_{}^{}"],
];

const symbols: Content[] = [
  ["\\infty", "\\infty"],
  ["\\pm", "\\pm"],
  ["\\mp", "\\mp"],
  ["\\times", "\\times"],
  ["\\div", "\\div"],
  ["\\neq", "\\neq"],
  ["\\forall", "\\forall"],
  ["\\exists", "\\exists"],
  ["\\nexists", "\\nexists"],
  ["\\angle", "\\angle"],
  ["\\blacksquare", "\\blacksquare"],
  ["\\triangle", "\\triangle"],
];

const logic: Content[] = [
  ["\\land", "\\land"],
  ["\\lor", "\\lor"],
  ["\\lnot", "\\lnot"],
  ["\\models", "\\models"],
  ["\\vdash", "\\vdash"],
  ["\\vDash", "\\vDash"],
  ["\\Vdash", "\\Vdash"],
  ["\\Vvdash", "\\Vvdash"],
  ["\\bot", "\\bot"],
  ["\\top", "\\top"],
  ["\\perp", "\\perp"],
  ["\\parallel", "\\parallel"],
  ["\\nparallel", "\\nparallel"],
];

const calculus: Content[] = [
  ["\\partial", "\\partial"],
  ["\\nabla", "\\nabla"],
  ["\\int", "\\int"],
  ["\\oint", "\\oint"],
  ["\\iint", "\\iint"],
  ["\\iiint", "\\iiint"],
  ["\\iiiint", "\\iiiint"],
  ["\\idotsint", "\\idotsint"],
  ["\\frac{d}{dx}", "\\frac{d}{dx}"],
  ["\\frac{\\partial}{\\partial x}", "\\frac{\\partial}{\\partial x}"],
];

const greekLower: Content[] = [
  ["\\alpha", "\\alpha"],
  ["\\beta", "\\beta"],
  ["\\gamma", "\\gamma"],
  ["\\delta", "\\delta"],
  ["\\epsilon", "\\epsilon"],
  ["\\zeta", "\\zeta"],
  ["\\eta", "\\eta"],
  ["\\theta", "\\theta"],
  ["\\vartheta", "\\vartheta"],
  ["\\iota", "\\iota"],
  ["\\kappa", "\\kappa"],
  ["\\lambda", "\\lambda"],
  ["\\mu", "\\mu"],
  ["\\nu", "\\nu"],
  ["\\xi", "\\xi"],
  ["\\pi", "\\pi"],
  ["\\rho", "\\rho"],
  ["\\sigma", "\\sigma"],
  ["\\tau", "\\tau"],
  ["\\upsilon", "\\upsilon"],
  ["\\phi", "\\phi"],
  ["\\chi", "\\chi"],
  ["\\psi", "\\psi"],
  ["\\omega", "\\omega"],
];

const greekUpper: Content[] = [
  ["\\Gamma", "\\Gamma"],
  ["\\Delta", "\\Delta"],
  ["\\Theta", "\\Theta"],
  ["\\Lambda", "\\Lambda"],
  ["\\Xi", "\\Xi"],
  ["\\Pi", "\\Pi"],
  ["\\Sigma", "\\Sigma"],
  ["\\Upsilon", "\\Upsilon"],
  ["\\Phi", "\\Phi"],
  ["\\Psi", "\\Psi"],
  ["\\Omega", "\\Omega"],
];

const inequality: Content[] = [
  ["\\leq", "\\leq"],
  ["\\geq", "\\geq"],
  ["\\ll", "\\ll"],
  ["\\gg", "\\gg"],
  ["\\neq", "\\neq"],
  ["\\approx", "\\approx"],
  ["\\simeq", "\\simeq"],
  ["\\cong", "\\cong"],
  ["\\equiv", "\\equiv"],
  ["\\propto", "\\propto"],
];

const trigonometry: Content[] = [
  ["\\sin", "\\sin"],
  ["\\cos", "\\cos"],
  ["\\tan", "\\tan"],
  ["\\csc", "\\csc"],
  ["\\sec", "\\sec"],
  ["\\cot", "\\cot"],
  ["\\sinh", "\\sinh"],
  ["\\cosh", "\\cosh"],
  ["\\tanh", "\\tanh"],
  ["\\coth", "\\coth"],
];

const geometry: Content[] = [
  ["\\angle", "\\angle"],
  ["\\triangle", "\\triangle"],
  ["\\square", "\\square"],
  ["\\rectangle", "\\rectangle"],
  ["\\circle", "\\circle"],
  ["\\ell", "\\ell"],
  ["\\parallel", "\\parallel"],
  ["\\perp", "\\perp"],
  ["\\cong", "\\cong"],
  ["\\sim", "\\sim"],
  ["\\perpendicular", "\\perpendicular"],
  ["\\congruent", "\\congruent"],
  ["\\similar", "\\similar"],
  ["\\mid", "\\mid"],
  ["\\angle", "\\angle"],
  ["\\triangle", "\\triangle"],
  ["\\square", "\\square"],
  ["\\rectangle", "\\rectangle"],
  ["\\circle", "\\circle"],
  ["\\ell", "\\ell"],
  ["\\parallel", "\\parallel"],
  ["\\perp", "\\perp"],
  ["\\cong", "\\cong"],
  ["\\sim", "\\sim"],
  ["\\perpendicular", "\\perpendicular"],
  ["\\congruent", "\\congruent"],
  ["\\similar", "\\similar"],
  ["\\mid", "\\mid"],
];

const setTheory: Content[] = [
  ["\\emptyset", "\\emptyset"],
  ["\\varnothing", "\\varnothing"],
  ["\\in", "\\in"],
  ["\\notin", "\\notin"],
  ["\\subset", "\\subset"],
  ["\\subseteq", "\\subseteq"],
  ["\\supset", "\\supset"],
  ["\\supseteq", "\\supseteq"],
  ["\\cup", "\\cup"],
  ["\\cap", "\\cap"],
  ["\\setminus", "\\setminus"],
  ["\\complement", "\\complement"],
  ["\\bigcup", "\\bigcup"],
  ["\\bigcap", "\\bigcap"],
  ["\\biguplus", "\\biguplus"],
  ["\\bigvee", "\\bigvee"],
  ["\\bigwedge", "\\bigwedge"],
  ["\\bigodot", "\\bigodot"],
  ["\\bigotimes", "\\bigotimes"],
  ["\\bigoplus", "\\bigoplus"],
  ["\\biguplus", "\\biguplus"],
  ["\\bigvee", "\\bigvee"],
  ["\\bigwedge", "\\bigwedge"],
  ["\\bigodot", "\\bigodot"],
  ["\\bigotimes", "\\bigotimes"],
  ["\\bigoplus", "\\bigoplus"],
];

const linearAlgebra: Content[] = [
  [
    "\\begin{matrix} a & b \\\\ c & d \\end{matrix}",
    "\\begin{matrix}\n & \\\\\n & \n\\end{matrix}",
  ],
  [
    "\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}",
    "\\begin{bmatrix}\n & \\\\\n & \n\\end{bmatrix}",
  ],
  [
    "\\begin{Bmatrix} a & b \\\\ c & d \\end{Bmatrix}",
    "\\begin{Bmatrix}\n & \\\\\n & \n\\end{Bmatrix}",
  ],
  [
    "\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix}",
    "\\begin{vmatrix}\n & \\\\\n & \n\\end{vmatrix}",
  ],
  [
    "\\begin{Vmatrix} a & b \\\\ c & d \\end{Vmatrix}",
    "\\begin{Vmatrix}\n & \\\\\n & \n\\end{Vmatrix}",
  ],
  [
    "\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}",
    "\\begin{pmatrix}\n & \\\\\n & \n\\end{pmatrix}",
  ],
];

const statistics: Content[] = [
  ["\\bar{x}", "\\bar{}"],
  ["\\hat{x}", "\\hat{}"],
  ["\\tilde{x}", "\\tilde{}"],
  ["\\dot{x}", "\\dot{}"],
  ["\\ddot{x}", "\\ddot{}"],
  ["\\overline{x}", "\\overline{}"],
  ["\\underline{x}", "\\underline{}"],
  ["\\vec{x}", "\\vec{}"],
  ["\\overrightarrow{x}", "\\overrightarrow{}"],
  ["\\overleftarrow{x}", "\\overleftarrow{}"],
  ["\\overleftrightarrow{x}", "\\overleftrightarrow{}"],
  ["\\widehat{x}", "\\widehat{}"],
  ["\\widetilde{x}", "\\widetilde{}"],
  ["\\overbrace{x}", "\\overbrace{}"],
];

const physics: Content[] = [
  ["\\hbar", "\\hbar"],
  ["\\hslash", "\\hslash"],
];

const overUnder: Content[] = [
  ["\\overbrace{x}", "\\overbrace{}^{}"],
  ["\\underbrace{x}", "\\underbrace{}_{}"],
  ["\\overline{x}", "\\overline{}"],
  ["\\underline{x}", "\\underline{}"],
  ["\\overrightarrow{x}", "\\overrightarrow{}"],
  ["\\overleftarrow{x}", "\\overleftarrow{}"],
  ["\\overleftrightarrow{x}", "\\overleftrightarrow{}"],
  ["\\widehat{x}", "\\widehat{}"],
  ["\\widetilde{x}", "\\widetilde{}"],
  ["\\overset{a}{abc}", "\\overset{}{}"],
  ["\\underset{a}{abc}", "\\underset{}{}"],
];

const arrows: Content[] = [
  ["\\leftarrow", "\\leftarrow"],
  ["\\rightarrow", "\\rightarrow"],
  ["\\leftrightarrow", "\\leftrightarrow"],
  ["\\Leftarrow", "\\Leftarrow"],
  ["\\Rightarrow", "\\Rightarrow"],
  ["\\Leftrightarrow", "\\Leftrightarrow"],
  ["\\longleftarrow", "\\longleftarrow"],
  ["\\longrightarrow", "\\longrightarrow"],
  ["\\longleftrightarrow", "\\longleftrightarrow"],
  ["\\Longleftarrow", "\\Longleftarrow"],
  ["\\Longrightarrow", "\\Longrightarrow"],
  ["\\Longleftrightarrow", "\\Longleftrightarrow"],
  ["\\mapsto", "\\mapsto"],
  ["\\longmapsto", "\\longmapsto"],
  ["\\hookleftarrow", "\\hookleftarrow"],
  ["\\hookrightarrow", "\\hookrightarrow"],
  ["\\leftharpoonup", "\\leftharpoonup"],
  ["\\rightharpoonup", "\\rightharpoonup"],
  ["\\leftharpoondown", "\\leftharpoondown"],
  ["\\rightharpoondown", "\\rightharpoondown"],
  ["\\rightleftharpoons", "\\rightleftharpoons"],
  ["\\leadsto", "\\leadsto"],
  ["\\uparrow", "\\uparrow"],
  ["\\downarrow", "\\downarrow"],
  ["\\updownarrow", "\\updownarrow"],
  ["\\Uparrow", "\\Uparrow"],
  ["\\Downarrow", "\\Downarrow"],
  ["\\Updownarrow", "\\Updownarrow"],
];

const brackets: Content[] = [
  ["()", "\\left( \\right)"],
  ["[]", "\\left[ \\right]"],
  ["\\{", "\\{"],
  ["\\}", "\\}"],
  ["\\langle", "\\langle"],
  ["\\rangle", "\\rangle"],
  ["|", "left| \right|"],
  ["\\|", "\\|"],
  ["\\lfloor", "\\lfloor"],
  ["\\rfloor", "\\rfloor"],
  ["\\lceil", "\\lceil"],
  ["\\rceil", "\\rceil"],
];

const specialBold: Content[] = [
  ["\\mathbb{A}", "\\mathbb{}"],
  ["\\mathrm{A}", "\\mathrm{}"],
  ["\\mathcal{A}", "\\mathcal{}"],
  ["\\mathfrak{A}", "\\mathfrak{}"],
  ["\\mathscr{A}", "\\mathcal{}"],
];

const combinations: Content[] = [
  ["\\mathrm{C}_{a}^{b}", "\\mathrm{C}_{}^{}"],
  ["\\mathrm{P}_{a}^{b}", "\\mathrm{P}_{}^{}"],
  ["\\binom{a}{b}", "\\binom{}{}"],
  ["_{a}\\mathrm{C}_{b}", "_{}\\mathrm{C}_{}"],
  ["_{a}\\mathrm{P}_{b}", "_{}\\mathrm{P}_{}"],
];

const multiLine: Content[] = [
  [
    "\\left\\{ \\begin{array}{l}\\cdots \\\\\\cdots \\end{array} \\right.",
    "\\left\\{ \\begin{array}{l}\n\\cdots \\\\\n\\cdots \n\\end{array} \\right.",
  ],
];

export const buttons: Content[][] = [
  common,
  symbols,
  logic,
  calculus,
  greekLower,
  greekUpper,
  inequality,
  brackets,
  trigonometry,
  setTheory,
  statistics,
  physics,
  overUnder,
  arrows,
  combinations,
  specialBold,
  [["\\text{Text}", "\\text{}"]],
  [["\\textbf{TextBF}", "\\textbf{}"]],
  [["\\LaTeX", "\\LaTeX"]],
  linearAlgebra,
  multiLine,
];
