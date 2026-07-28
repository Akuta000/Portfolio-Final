import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface LoadingScreenProps {
  isVisible: boolean;
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ isVisible, onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 12000; // 12 seconds total
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(interval);
        setTimeout(onComplete, 500);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  const loadingMessages = [
    'Initializing editorial environment...',
    'Fetching poetic artifacts...',
    'Compiling verses into machine logic...',
    'Weaving digital circuits with lyrical intent...',
    'Bridging the gap between code and soul...',
    'Rendering the literary gazette...',
    'Finalizing technical architecture...',
    'Welcome to the synergy.',
  ];

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-gradient-to-br from-[#1C0508] via-[#2B080D] to-[#1C0508] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#D4AF37] rounded-full opacity-60"
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              opacity: Math.random() * 0.5 + 0.3,
            }}
            animate={{
              y: [0, -200],
              opacity: [0.3, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-10 max-w-md px-6">
        {/* Typewriter + Circuit Board Icon */}
        <motion.div
          className="relative w-40 h-40"
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        >
          {/* Outer glow ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-[#D4AF37]"
            animate={{ 
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Inner rotating circle */}
          <motion.div
            className="absolute inset-0 rounded-full border border-[#800020]/50"
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          />

          {/* Center icon - Poetry meets Technology */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              className="w-28 h-28 text-[#D4AF37]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              {/* Typewriter keys */}
              <circle cx="30" cy="55" r="2.5" fill="currentColor" />
              <circle cx="43" cy="55" r="2.5" fill="currentColor" />
              <circle cx="56" cy="55" r="2.5" fill="currentColor" />
              <circle cx="69" cy="55" r="2.5" fill="currentColor" />

              {/* Circuit traces */}
              <path d="M 30 55 L 30 35 L 50 35 L 50 55 L 70 55 L 70 35" strokeDasharray="4 2" />
              <path d="M 43 55 L 43 75 L 63 75 L 63 55" strokeDasharray="4 2" />

              {/* Poetry lines (Stylized Quill Tip) */}
              <path d="M 50 20 C 45 30 40 40 50 50 C 60 40 55 30 50 20" fill="#800020" opacity="0.4" />
              <path d="M 50 20 L 50 50" strokeLinecap="round" />
              
              {/* Floating words/code snippets */}
              <text x="15" y="25" fontSize="6" fill="currentColor" opacity="0.5" className="font-mono-code">01</text>
              <text x="75" y="80" fontSize="6" fill="currentColor" opacity="0.5" className="font-mono-code">VER</text>
            </svg>
          </div>
        </motion.div>

        {/* Loading text */}
        <div className="text-center space-y-6 w-full">
          <div className="space-y-2">
            <motion.h2
              className="font-serif-display text-3xl font-bold text-[#D4AF37] tracking-widest uppercase"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              Initializing Portfolio
            </motion.h2>

            <motion.p
              className="font-serif-body text-base text-[#FAF6F0]/80 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1.5 }}
            >
              Where <span className="text-[#800020] font-bold">Poetry</span> converges with{' '}
              <span className="text-[#D4AF37] font-bold">Technology</span>
            </motion.p>
          </div>

          {/* Poetic loading messages - Slower transitions for 12s duration */}
          <div className="h-8 overflow-hidden relative">
            {loadingMessages.map((text, i) => (
              <motion.p
                key={i}
                className="font-mono-code text-xs text-[#D4AF37]/70 h-8 flex items-center justify-center italic"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: progress > (i * 12.5) && progress < ((i + 1) * 12.5) ? 1 : 0,
                  y: progress > (i * 12.5) && progress < ((i + 1) * 12.5) ? 0 : (progress >= ((i + 1) * 12.5) ? -20 : 20)
                }}
                transition={{ duration: 0.6 }}
                style={{ position: 'absolute', width: '100%' }}
              >
                &gt; {text}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Progress bar container */}
        <div className="w-full space-y-2">
          <div className="flex justify-between items-end font-mono-code text-[10px] text-[#D4AF37]/60 uppercase tracking-tighter">
            <span>System.Load()</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <motion.div className="w-full h-1.5 bg-[#1C0508] rounded-full overflow-hidden border border-[#800020]/30 shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-[#800020] via-[#D4AF37] to-[#800020]"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </motion.div>
        </div>

        {/* Floating background elements */}
        <motion.div
          className="absolute top-20 left-10 font-mono-code text-[10px] text-[#800020]/20 whitespace-pre"
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          {`def write_poem():\n  soul = True\n  return verses`}
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-10 font-serif-body italic text-[10px] text-[#D4AF37]/20 text-right"
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 5, repeat: Infinity, delay: 2.5 }}
        >
          {`"In the silence of the circuits,\na voice begins to sing."`}
        </motion.div>
      </div>
    </motion.div>
  );
};
