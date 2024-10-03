type Content = [string, string];

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

export const buttons: Content[][] = [greekLower, greekUpper];
