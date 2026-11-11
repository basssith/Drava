import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface TerminalCharStreamProps {
  text: string;
  className?: string;
  highlightText?: string;
  highlightColor?: string;
  baseColor?: string;
  speed?: number; // seconds per char
  initialDelay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
}

export function TerminalCharStream({
  text,
  className = '',
  highlightText,
  highlightColor = '#92ff5f',
  baseColor = '#ffffff',
  speed = 0.024,
  initialDelay = 0.05,
  as = 'div',
}: TerminalCharStreamProps) {
  // Split lines if text contains \n
  const lines = useMemo(() => text.split('\n'), [text]);

  // Compute character-level indices for consistent sequential stagger
  let globalCharIndex = 0;

  const renderedContent = lines.map((line, lineIdx) => {
    const chars = Array.from(line);
    const lineElements = chars.map((char) => {
      const idx = globalCharIndex++;
      const delay = initialDelay + idx * speed;

      // Check if this character is part of the highlighted section
      const isHighlighted =
        highlightText &&
        line.includes(highlightText) &&
        char !== ' ';

      const charColor = isHighlighted ? highlightColor : baseColor;

      if (char === ' ') {
        return (
          <span key={idx} className="inline-block">
            &nbsp;
          </span>
        );
      }

      return (
        <motion.span
          key={idx}
          className="inline-block relative"
          style={{ color: charColor }}
          initial={{
            opacity: 0,
            y: 5,
            filter: 'blur(3px)',
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
          }}
          transition={{
            duration: 0.18,
            delay,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char}
          {/* Subtle cursor spark for the leading edge */}
          <motion.span
            className="absolute left-full top-0 bottom-0 w-[2px] pointer-events-none"
            style={{ backgroundColor: highlightColor }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 0.12,
              delay,
              times: [0, 0.4, 1],
            }}
          />
        </motion.span>
      );
    });

    return (
      <React.Fragment key={lineIdx}>
        <span className="inline-block whitespace-nowrap">{lineElements}</span>
        {lineIdx < lines.length - 1 && <br />}
      </React.Fragment>
    );
  });

  const Component = as as any;

  return <Component className={className}>{renderedContent}</Component>;
}

