import { motion } from 'framer-motion';
import { sound } from '../../utils/audio';

interface TerminalLine {
  text: string;
  isAccent?: boolean;
}

interface TerminalTypewriterProps {
  lines: TerminalLine[];
  className?: string;
  accentColor?: string;
  speed?: number; // seconds per char
  initialDelay?: number;
  inline?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
}

/**
 * Terminal-style char-by-char typewriter animation replicating the video:
 * Letters appear sequentially from left to right with a glowing green typing caret
 * and smooth synchronized typing audio ticks.
 */
export function TerminalTypewriter({
  lines,
  className = '',
  accentColor = '#92ff5f',
  speed = 0.024,
  initialDelay = 0.05,
  inline = false,
  as = 'div',
}: TerminalTypewriterProps) {
  let runningCharCount = 0;

  const renderedLines = lines.map((lineObj, lineIdx) => {
    const chars = Array.from(lineObj.text);
    const lineStartIndex = runningCharCount;
    runningCharCount += chars.length;

    const lineClass = inline ? "inline whitespace-nowrap" : "block whitespace-nowrap";

    return (
      <span key={lineIdx} className={lineClass}>
        {chars.map((char, charIdx) => {
          const globalIdx = lineStartIndex + charIdx;
          const charDelay = initialDelay + globalIdx * speed;
          const isSpace = char === ' ';

          if (isSpace) {
            return (
              <span key={charIdx} className="inline-block">
                &nbsp;
              </span>
            );
          }

          return (
            <motion.span
              key={charIdx}
              className="inline-block relative"
              style={{
                color: lineObj.isAccent ? accentColor : '#ffffff',
              }}
              initial={{
                opacity: 0,
                y: 4,
                filter: 'blur(2px)',
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
              }}
              onAnimationStart={() => {
                sound.playTypingTick();
              }}
              transition={{
                duration: 0.16,
                delay: charDelay,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {char}
              {/* Green terminal spark / caret indicator following the typing character */}
              <motion.span
                className="absolute left-full top-[10%] bottom-[10%] w-[2.5px] rounded-full pointer-events-none"
                style={{
                  backgroundColor: accentColor,
                  boxShadow: `0 0 10px ${accentColor}`,
                }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 0.12,
                  delay: charDelay,
                  times: [0, 0.3, 1],
                }}
              />
            </motion.span>
          );
        })}
      </span>
    );
  });

  const Component = as as any;

  return <Component className={className}>{renderedLines}</Component>;
}
