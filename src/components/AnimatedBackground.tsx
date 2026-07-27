import React from 'react';
import { motion } from 'motion/react';

export const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-[#FAF6F0] overflow-hidden pointer-events-none">
      {/* Base tech grid pattern */}
      <div className="absolute inset-0 bg-tech-grid" />

      {/* Floating poetry/tech particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 bg-[#800020]/5 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          animate={{
            y: [0, -100],
            opacity: [0, 0.4, 0],
            x: [0, Math.random() * 50 - 25],
          }}
          transition={{
            duration: Math.random() * 6 + 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Subtle gradient overlays */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 via-transparent to-[#800020]/0"
        animate={{
          opacity: [0.02, 0.08, 0.02],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating code/poetry snippets */}
      {[
        { text: '01', x: '5%', y: '10%', delay: 0 },
        { text: '10', x: '95%', y: '20%', delay: 1 },
        { text: 'verse', x: '10%', y: '80%', delay: 2 },
        { text: 'code', x: '85%', y: '75%', delay: 0.5 },
        { text: '11', x: '50%', y: '5%', delay: 1.5 },
      ].map((item, i) => (
        <motion.div
          key={`snippet-${i}`}
          className="absolute font-mono-code text-xs text-[#800020]/10 font-bold"
          style={{
            left: item.x,
            top: item.y,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: item.delay,
            ease: 'easeInOut',
          }}
        >
          {item.text}
        </motion.div>
      ))}

      {/* Subtle line decorations */}
      <svg
        className="absolute inset-0 w-full h-full opacity-5"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#800020" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>
        </defs>
        {/* Diagonal connecting lines */}
        <line x1="0" y1="0" x2="1200" y2="800" stroke="url(#lineGradient)" strokeWidth="1" />
        <line x1="1200" y1="0" x2="0" y2="800" stroke="url(#lineGradient)" strokeWidth="1" />
        {/* Circuit-like paths */}
        <path d="M 100 100 L 300 100 L 300 300 L 500 300" stroke="url(#lineGradient)" fill="none" strokeWidth="1" />
        <path d="M 800 200 L 1000 200 L 1000 500 L 900 500" stroke="url(#lineGradient)" fill="none" strokeWidth="1" />
      </svg>

      {/* Pulsing accent circles */}
      {[
        { x: '15%', y: '20%', delay: 0, size: 'w-32 h-32' },
        { x: '80%', y: '60%', delay: 1, size: 'w-48 h-48' },
        { x: '50%', y: '80%', delay: 2, size: 'w-40 h-40' },
      ].map((circle, i) => (
        <motion.div
          key={`circle-${i}`}
          className={`absolute rounded-full border border-[#800020]/10 ${circle.size}`}
          style={{
            left: circle.x,
            top: circle.y,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: circle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};
