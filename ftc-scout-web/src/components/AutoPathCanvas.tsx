import React, { useRef, useEffect, useState } from 'react';
import './AutoPathCanvas.css';

interface AutoPathCanvasProps {
  onSave: (imageData: string) => void;
  initialImage?: string;
}

const AutoPathCanvas: React.FC<AutoPathCanvasProps> = ({ onSave, initialImage }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const fieldImageLoaded = useRef(false);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setContext(ctx);

    // Load field image background (placeholder - you can replace with actual FTC field image)
    const fieldImage = new Image();
    fieldImage.onload = () => {
      ctx.drawImage(fieldImage, 0, 0, canvas.width, canvas.height);
      fieldImageLoaded.current = true;
      
      // If there's an initial image, load it
      if (initialImage) {
        const savedImage = new Image();
        savedImage.onload = () => {
          ctx.drawImage(savedImage, 0, 0);
        };
        savedImage.src = initialImage;
      }
    };
    
    // Use a placeholder field (you can replace with actual FTC field image URL)
    fieldImage.src = createFieldPlaceholder();
  }, [initialImage]);

  const createFieldPlaceholder = () => {
    // Create a simple field placeholder
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 600;
    tempCanvas.height = 600;
    const tempCtx = tempCanvas.getContext('2d');
    
    if (tempCtx) {
      // Background
      tempCtx.fillStyle = '#2a2a2a';
      tempCtx.fillRect(0, 0, 600, 600);
      
      // Grid lines
      tempCtx.strokeStyle = '#444444';
      tempCtx.lineWidth = 1;
      for (let i = 0; i <= 600; i += 100) {
        tempCtx.beginPath();
        tempCtx.moveTo(i, 0);
        tempCtx.lineTo(i, 600);
        tempCtx.stroke();
        
        tempCtx.beginPath();
        tempCtx.moveTo(0, i);
        tempCtx.lineTo(600, i);
        tempCtx.stroke();
      }
      
      // Center line
      tempCtx.strokeStyle = '#666666';
      tempCtx.lineWidth = 2;
      tempCtx.beginPath();
      tempCtx.moveTo(300, 0);
      tempCtx.lineTo(300, 600);
      tempCtx.stroke();
      
      tempCtx.beginPath();
      tempCtx.moveTo(0, 300);
      tempCtx.lineTo(600, 300);
      tempCtx.stroke();
      
      // Label
      tempCtx.fillStyle = '#808080';
      tempCtx.font = '20px sans-serif';
      tempCtx.textAlign = 'center';
      tempCtx.fillText('FTC Field', 300, 30);
    }
    
    return tempCanvas.toDataURL();
  };

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ('touches' in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    } else {
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!context) return;
    
    const { x, y } = getCoordinates(e);
    context.beginPath();
    context.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context) return;
    
    e.preventDefault();
    const { x, y } = getCoordinates(e);
    
    context.lineTo(x, y);
    context.strokeStyle = '#007AFF';
    context.lineWidth = 3;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !context) return;

    // Redraw field background
    const fieldImage = new Image();
    fieldImage.onload = () => {
      context.drawImage(fieldImage, 0, 0, canvas.width, canvas.height);
    };
    fieldImage.src = createFieldPlaceholder();
  };

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const imageData = canvas.toDataURL('image/png');
    onSave(imageData);
  };

  return (
    <div className="auto-path-canvas-container">
      <canvas
        ref={canvasRef}
        width={600}
        height={600}
        className="auto-path-canvas"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
      <div className="canvas-controls">
        <button type="button" onClick={clearCanvas} className="btn-secondary">
          Clear
        </button>
        <button type="button" onClick={saveCanvas} className="btn-primary">
          Save Path
        </button>
      </div>
    </div>
  );
};

export default AutoPathCanvas;
