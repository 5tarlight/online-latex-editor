import { mathjax } from 'mathjax-full/js/mathjax.js';
import { TeX } from 'mathjax-full/js/input/tex.js';
import { SVG } from 'mathjax-full/js/output/svg.js';
import { liteAdaptor } from 'mathjax-full/js/adaptors/liteAdaptor.js';
import { RegisterHTMLHandler } from 'mathjax-full/js/handlers/html.js';
import { AllPackages } from 'mathjax-full/js/input/tex/AllPackages.js';

export default function ExportToSvg({ children }: { children: string }) {
  const convertLatexToSVG = () => {
    const adaptor = liteAdaptor();
    RegisterHTMLHandler(adaptor);

    const texInput = new TeX({ packages: AllPackages });
    const svgOutput = new SVG({ fontCache: 'local' });

    const mathDocument = mathjax.document('', {
      InputJax: texInput,
      OutputJax: svgOutput,
    });

    const node = mathDocument.convert(children, { display: true });
    const svgData = adaptor.outerHTML(node);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'equation.svg';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={convertLatexToSVG} className="border-2 border-gray-300 rounded-md p-2 mt-4">
      Export to SVG
    </button>
  );
}
