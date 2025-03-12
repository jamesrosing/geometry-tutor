// src/components/modules/pythagorean-demo.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface PythagoreanDemoProps {
  initialValues?: {
    a: number;
    b: number;
  };
}

const PythagoreanDemo: React.FC<PythagoreanDemoProps> = ({ 
  initialValues = { a: 3, b: 4 } 
}) => {
  const [valueA, setValueA] = useState(initialValues.a);
  const [valueB, setValueB] = useState(initialValues.b);
  const [valueC, setValueC] = useState(0);
  const [showSquares, setShowSquares] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Calculate hypotenuse (c) using the Pythagorean theorem
  useEffect(() => {
    const c = Math.sqrt(valueA * valueA + valueB * valueB);
    setValueC(parseFloat(c.toFixed(2)));
  }, [valueA, valueB]);

  // Draw the triangle and squares on the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const scale = 30; // Scale factor to make the triangle visible
    const offsetX = 50;
    const offsetY = canvas.height - 50;

    // Draw axes
    ctx.strokeStyle = '#ccc';
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    ctx.lineTo(offsetX + 300, offsetY);
    ctx.moveTo(offsetX, offsetY);
    ctx.lineTo(offsetX, offsetY - 200);
    ctx.stroke();

    // Add axis labels
    ctx.fillStyle = '#666';
    ctx.font = '12px Arial';
    ctx.fillText('X', offsetX + 290, offsetY + 15);
    ctx.fillText('Y', offsetX - 15, offsetY - 190);

    // Draw the right triangle
    const ax = offsetX;
    const ay = offsetY;
    const bx = offsetX + valueA * scale;
    const by = offsetY;
    const cx = offsetX;
    const cy = offsetY - valueB * scale;

    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);
    ctx.lineTo(cx, cy);
    ctx.closePath();
    ctx.stroke();

    // Label the sides
    ctx.fillStyle = '#0066cc';
    ctx.font = '16px Arial';
    ctx.fillText(`a = ${valueA}`, ax + (bx - ax) / 2 - 20, ay + 20);
    ctx.fillText(`b = ${valueB}`, cx - 40, cy + (ay - cy) / 2);
    ctx.fillText(`c = ${valueC}`, ax + (cx - ax) / 2 + 5, ay - (ay - cy) / 2 - 10);

    // Draw right angle symbol
    ctx.beginPath();
    ctx.moveTo(ax + 10, ay);
    ctx.lineTo(ax + 10, ay - 10);
    ctx.lineTo(ax, ay - 10);
    ctx.stroke();

    // Draw squares on sides if enabled
    if (showSquares) {
      // Square on side a
      ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(bx, by);
      ctx.lineTo(bx, by - valueA * scale);
      ctx.lineTo(ax, ay - valueA * scale);
      ctx.closePath();
      ctx.fill();
      
      // Label square a
      ctx.fillStyle = '#000';
      ctx.fillText(`a² = ${valueA * valueA}`, 
        ax + (bx - ax) / 2 - 20, 
        ay - valueA * scale / 2);

      // Square on side b
      ctx.fillStyle = 'rgba(0, 0, 255, 0.3)';
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(cx, cy);
      ctx.lineTo(cx + valueB * scale, cy);
      ctx.lineTo(ax + valueB * scale, ay);
      ctx.closePath();
      ctx.fill();
      
      // Label square b
      ctx.fillStyle = '#000';
      ctx.fillText(`b² = ${valueB * valueB}`, 
        ax + valueB * scale / 2, 
        ay - (ay - cy) / 2);

      // Square on hypotenuse (approximate position)
      ctx.fillStyle = 'rgba(0, 255, 0, 0.3)';
      
      // This is a simplified approach - a proper implementation would 
      // involve rotating the square to align with the hypotenuse
      const midX = (cx + bx) / 2;
      const midY = (cy + by) / 2;
      const halfSide = valueC * scale / 2;
      
      ctx.beginPath();
      ctx.moveTo(midX - halfSide, midY - halfSide);
      ctx.lineTo(midX + halfSide, midY - halfSide);
      ctx.lineTo(midX + halfSide, midY + halfSide);
      ctx.lineTo(midX - halfSide, midY + halfSide);
      ctx.closePath();
      ctx.fill();
      
      // Label square c
      ctx.fillStyle = '#000';
      ctx.fillText(`c² = ${(valueC * valueC).toFixed(2)}`, 
        midX - 25, 
        midY - halfSide - 10);
        
      // Add the formula
      ctx.fillStyle = '#0066cc';
      ctx.font = 'bold 18px Arial';
      ctx.fillText(`a² + b² = c²`, 
        offsetX + 200, 
        offsetY - 140);
      
      ctx.fillText(`${valueA * valueA} + ${valueB * valueB} = ${(valueC * valueC).toFixed(2)}`, 
        offsetX + 200, 
        offsetY - 110);
    }

  }, [valueA, valueB, valueC, showSquares]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Pythagorean Theorem Explorer</h2>
      <p className="text-gray-600 mb-4">
        Adjust the sliders to change the sides of the right triangle and see how the Pythagorean Theorem (a² + b² = c²) works.
      </p>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <canvas 
            ref={canvasRef} 
            width={500} 
            height={400} 
            className="border border-gray-200 rounded bg-gray-50"
          />
          
          <div className="mt-2 flex items-center">
            <input
              type="checkbox"
              id="showSquares"
              checked={showSquares}
              onChange={(e) => setShowSquares(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="showSquares">Show squares on sides</label>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Side a: {valueA}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              step="0.5"
              value={valueA}
              onChange={(e) => setValueA(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Side b: {valueB}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              step="0.5"
              value={valueB}
              onChange={(e) => setValueB(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h3 className="font-semibold text-lg mb-2">Results:</h3>
            <p>Side a = {valueA}</p>
            <p>Side b = {valueB}</p>
            <p>Hypotenuse (c) = {valueC}</p>
            <p className="mt-2 font-medium">Pythagorean Theorem:</p>
            <p>a² + b² = c²</p>
            <p>{valueA}² + {valueB}² = {valueC}²</p>
            <p>{valueA * valueA} + {valueB * valueB} = {(valueC * valueC).toFixed(2)}</p>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
            <h3 className="font-semibold mb-2">Try it yourself!</h3>
            <p>If a = 5 and b = 12, what would c be?</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setValueA(5);
                setValueB(12);
              }}
              className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-4 rounded text-sm"
            >
              Show me
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PythagoreanDemo;