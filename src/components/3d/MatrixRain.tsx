import React, { useRef, useEffect } from 'react';

interface MatrixRainProps {
  className?: string;
}

const MatrixRain: React.FC<MatrixRainProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters (AI/ML related symbols and code)
    const matrixChars = 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ←↑→↓∞∂∇∈∉∋∌∝∫∮∑∏∆{}[]()<>=+-*/\\|&^%$#@!?~`.,:;';
    const aiChars = '01101001011010100110';
    const codeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const allChars = matrixChars + aiChars + codeChars;

    const fontSize = 12;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = () => {
      // Create trail effect
      ctx.fillStyle = 'rgba(0, 8, 20, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#4db6ac';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = allChars[Math.floor(Math.random() * allChars.length)];
        
        // Draw character with slight glow effect
        ctx.shadowColor = '#4db6ac';
        ctx.shadowBlur = 3;
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        ctx.shadowBlur = 0;

        // Reset drop when it reaches bottom or randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Move drop down
        drops[i]++;

        // Add some randomness to the movement
        if (Math.random() > 0.95) {
          drops[i] += Math.random() * 2;
        }
      }
    };

    // Animation loop
    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className={`absolute inset-0 ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-30"
        style={{ background: 'transparent' }}
      />
    </div>
  );
};

export default MatrixRain;
