import React from 'react';
import { motion } from 'motion/react';

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale';
  duration?: number;
  delay?: number;
  threshold?: number;
  className?: string;
  id?: string;
}

export default function ScrollReveal({
  children,
  variant = 'slideUp',
  duration = 0.8,
  delay = 0,
  threshold = 0.1,
  className = '',
  id
}: ScrollRevealProps) {
  
  const variants = {
    hidden: {
      opacity: 0,
      y: variant === 'slideUp' ? 40 : variant === 'slideDown' ? -40 : 0,
      x: variant === 'slideLeft' ? 40 : variant === 'slideRight' ? -40 : 0,
      scale: variant === 'scale' ? 0.95 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.16, 1, 0.3, 1], // Premium cinematic cubic-bezier curve
      }
    }
  };

  return (
    <motion.div
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

// Stagger Animation Wrapper for grids of items (such as services, credentials, process steps)
interface StaggerContainerProps {
  children: React.ReactNode;
  staggerChildren?: number;
  delayChildren?: number;
  className?: string;
  viewportAmount?: number;
  id?: string;
  key?: React.Key;
}

export function StaggerContainer({
  children,
  staggerChildren = 0.12,
  delayChildren = 0,
  className = '',
  viewportAmount = 0.05,
  id
}: StaggerContainerProps) {
  return (
    <motion.div
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: viewportAmount }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren,
            delayChildren
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

// Child element to place inside a StaggerContainer
interface StaggerItemProps {
  children: React.ReactNode;
  variant?: 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'fade' | 'scale';
  className?: string;
  key?: React.Key;
}

export function StaggerItem({
  children,
  variant = 'slideUp',
  className = ''
}: StaggerItemProps) {
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: variant === 'slideUp' ? 25 : variant === 'slideDown' ? -25 : 0,
      x: variant === 'slideLeft' ? 25 : variant === 'slideRight' ? -25 : 0,
      scale: variant === 'scale' ? 0.97 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
