import { useRef } from 'react';
import { convertLatexToSVG } from '../../lib/LatexToSvg';
import cn from '../../lib/cn';

interface ExportToPngProps {
  children: string;
  fontsize: number;
}

export default function ExportToPng({ children, fontsize }: ExportToPngProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleExportToPng = () => {
    const svgElement = convertLatexToSVG(children, fontsize, containerRef);

    if (svgElement) {
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
    }
  };

  return (
    <div>
      <button   
        onClick={handleExportToPng} 
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
