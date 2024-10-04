import { mathjax } from 'mathjax-full/js/mathjax.js';
import { TeX } from 'mathjax-full/js/input/tex.js';
import { SVG } from 'mathjax-full/js/output/svg.js';
import { browserAdaptor } from 'mathjax-full/js/adaptors/browserAdaptor.js';
import { RegisterHTMLHandler } from 'mathjax-full/js/handlers/html.js';
import { AllPackages } from 'mathjax-full/js/input/tex/AllPackages.js';

export function convertLatexToSVG(children: string, fontsize: number, containerRef: React.RefObject<HTMLDivElement>) {
  const adaptor = browserAdaptor();
  RegisterHTMLHandler(adaptor);

  const texInput = new TeX({ packages: AllPackages });
  const svgOutput = new SVG({ fontCache: 'none' });

  const html = mathjax.document(document, {
    InputJax: texInput,
    OutputJax: svgOutput,
  });

  // LaTeX를 SVG로 변환하여 실제 DOM에 추가
  const node = html.convert(children, { display: true });
  if (containerRef.current) {
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(node);

    // SVG에 fontsize를 적용
    const svgElement = containerRef.current.querySelector('svg');
    if (svgElement) {
      svgElement.style.fontSize = `${fontsize}px`;
    }

    return svgElement;
  }

  return null;
}
