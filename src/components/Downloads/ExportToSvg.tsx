import React, { useRef } from 'react';
import { mathjax } from 'mathjax-full/js/mathjax.js';
import { TeX } from 'mathjax-full/js/input/tex.js';
import { SVG } from 'mathjax-full/js/output/svg.js';
import { browserAdaptor } from 'mathjax-full/js/adaptors/browserAdaptor.js';
import { RegisterHTMLHandler } from 'mathjax-full/js/handlers/html.js';
import { AllPackages } from 'mathjax-full/js/input/tex/AllPackages.js';
import cn from '../../lib/cn';

interface ExportToSvgProps {
  children: string;
  fontsize: number;
}

export default function ExportToSvg({ children, fontsize }: ExportToSvgProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const convertLatexToSVG = () => {
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
      
      // null 체크 후 동작 진행
      if (svgElement) {
        svgElement.style.fontSize = `${fontsize}px`;

        // SVG 데이터를 직렬화하여 Blob 생성
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        // 다운로드 링크 생성 및 클릭
        const link = document.createElement('a');
        link.href = url;
        link.download = 'equation.svg';
        link.click();
        URL.revokeObjectURL(url);
      } else {
        console.error('SVG 요소를 찾을 수 없습니다.');
      }
    }
  };

  return (
    <div>
      <button
        onClick={convertLatexToSVG}
        className={cn(
          "border-2 border-gray-300 rounded-md p-2 mt-4",
          "hover:bg-gray-300"
        )}
      >
        export to SVG
      </button>
      <div ref={containerRef} style={{ display: 'none' }}></div>
    </div>
  );
}
