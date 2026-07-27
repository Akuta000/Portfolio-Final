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

    const duration = 6500; // 6.5 seconds total
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(interval);
        setTimeout(onComplete, 300);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-gradient-to-br from-[#1C0508] via-[#2B080D] to-[#1C0508] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#D4AF37] rounded-full opacity-60"
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              opacity: Math.random() * 0.5 + 0.3,
            }}
            animate={{
              y: [0, -100],
              opacity: [0.3, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8">
        {/* Typewriter + Circuit Board Icon */}
        <motion.div
          className="relative w-32 h-32"
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        >
          {/* Outer glow ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-[#D4AF37]"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Inner rotating circle */}
          <motion.div
            className="absolute inset-0 rounded-full border border-[#800020]/50"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />

          {/* Center icon - Poetry meets Technology */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              className="w-24 h-24 text-[#D4AF37]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              {/* Typewriter keys */}
              <circle cx="30" cy="50" r="3" fill="currentColor" />
              <circle cx="45" cy="50" r="3" fill="currentColor" />
              <circle cx="60" cy="50" r="3" fill="currentColor" />
              <circle cx="75" cy="50" r="3" fill="currentColor" />

              {/* Circuit traces */}
              <path d="M 30 50 L 30 30 L 50 30 L 50 50 L 70 50 L 70 30" />
              <path d="M 45 50 L 45 70 L 65 70 L 65 50" />

              {/* Poetry lines */}
              <path d="M 20 20 Q 40 15 60 25" strokeLinecap="round" />
              <path d="M 25 80 Q 50 75 75 85" strokeLinecap="round" />

              {/* Binary code dots */}
              <circle cx="35" cy="35" r="1.5" fill="currentColor" opacity="0.6" />
              <circle cx="55" cy="35" r="1.5" fill="currentColor" opacity="0.6" />
              <circle cx="45" cy="65" r="1.5" fill="currentColor" opacity="0.6" />
              <circle cx="65" cy="65" r="1.5" fill="currentColor" opacity="0.6" />
            </svg>
          </div>
        </motion.div>

        {/* Loading text */}
        <div className="text-center space-y-4">
          <motion.h2
            className="font-serif-display text-3xl font-bold text-[#D4AF37]"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Loading Portfolio
          </motion.h2>

          <motion.p
            className="font-serif-body text-sm text-[#FAF6F0]/70 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <span className="text-[#800020]">Poetry</span> meets{' '}
            <span className="text-[#D4AF37]">Technology</span>
          </motion.p>

          {/* Poetic loading messages */}
          <motion.div
            className="h-6 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            {[
              'Compiling verses into code...',
              'Weaving circuits with words...',
              'Bridging the digital and lyrical...',
              'Crafting the portfolio...',
            ].map((text, i) => (
              <motion.p
                key={i}
                className="font-mono-code text-xs text-[#D4AF37]/80 h-6 flex items-center"
                initial={{ y: 24 }}
                animate={{ y: -24 * i }}
                transition={{
                  duration: 0.5,
                  delay: 1 + i * 1.5,
                  ease: 'easeInOut',
                }}
              >
                &gt; {text}
              </motion.p>
            ))}
          </motion.div>
        </div>

        {/* Progress bar */}
        <motion.div className="w-64 h-1 bg-[#2B080D] rounded-full overflow-hidden border border-[#800020]/50">
          <motion.div
            className="h-full bg-gradient-to-r from-[#800020] via-[#D4AF37] to-[#800020]"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </motion.div>

        {/* Subtle footer text */}
        <motion.p
          className="font-mono-code text-[10px] text-[#574B4E] tracking-widest uppercase"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Initializing...
        </motion.p>
      </div>

      {/* Floating code/poetry snippets in background */}
      <motion.div
        className="absolute bottom-10 left-10 font-mono-code text-xs text-[#800020]/30"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        &lt;poem&gt;
      </motion.div>
      <motion.div
        className="absolute top-10 right-10 font-mono-code text-xs text-[#D4AF37]/30"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
      >
        &lt;/code&gt;
      </motion.div>
    </motion.div>
  );
};
