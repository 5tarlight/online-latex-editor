import React, { useRef } from 'react';
import { mathjax } from 'mathjax-full/js/mathjax.js';
import { TeX } from 'mathjax-full/js/input/tex.js';
import { SVG } from 'mathjax-full/js/output/svg.js';
import { browserAdaptor } from 'mathjax-full/js/adaptors/browserAdaptor.js';
import { RegisterHTMLHandler } from 'mathjax-full/js/handlers/html.js';
import { AllPackages } from 'mathjax-full/js/input/tex/AllPackages.js';
import cn from '../../lib/cn';

export default function ExportToPng(props: { children: string }) {
  const { children } = props;
  const containerRef = useRef<HTMLDivElement>(null);

  const convertLatexToPNG = () => {
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
    }

    // 다음 프레임에서 실행하여 SVG가 렌더링되도록 함
    requestAnimationFrame(() => {
      if (!containerRef.current) {
        console.error('컨테이너를 찾을 수 없습니다.');
        return;
      }

      const svgElement = containerRef.current.querySelector('svg');
      if (!svgElement) {
        console.error('SVG 요소를 찾을 수 없습니다.');
        return;
      }

      // SVG 요소를 직렬화
      const data = new XMLSerializer().serializeToString(svgElement);
      const svgDataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(data);

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        console.error('2D 컨텍스트를 가져올 수 없습니다.');
        return;
      }

      const img = new Image();

      // CORS 설정
      img.crossOrigin = 'Anonymous';

      img.onload = () => {
        // 이미지 크기 설정
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        // PNG 데이터 URL 생성
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);

            // 다운로드 링크 생성 및 클릭
            const link = document.createElement('a');
            link.download = 'equation.png';
            link.href = url;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // 메모리 정리
            URL.revokeObjectURL(url);
          } else {
            console.error('Blob 생성 실패');
          }
        }, 'image/png');
      };

      img.onerror = (err) => {
        console.error('이미지 로드 중 오류 발생:', err);
      };

      img.src = svgDataUrl;
    });
  };

  return (
    <div>
      <button 
        onClick={convertLatexToPNG} 
        className={cn(
          "border-2 border-gray-300 rounded-md p-2 mt-4",
          "hover:bg-gray-300"
        )}
      >
        export to PNG
      </button>
      <div ref={containerRef} style={{ display: 'none' }}></div>
    </div>
  );
}
