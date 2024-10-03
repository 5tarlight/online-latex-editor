import { useRef } from 'react';
import { convertLatexToSVG } from '../../lib/LatexToSvg';
import cn from '../../lib/cn';

interface ExportToSvgProps {
  children: string;
  fontsize: number;
}

export default function ExportToSvg({ children, fontsize }: ExportToSvgProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleExportToSvg = () => {
    const svgElement = convertLatexToSVG(children, fontsize, containerRef);
    
    if (svgElement) {
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
  };

  return (
    <div>
      <button
        onClick={handleExportToSvg}
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
