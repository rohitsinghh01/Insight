import React from 'react';
import { AnimatePresence, animate, motion } from 'framer-motion';

export default function PageAnimation({
  children,
  keyvalue,
  className,
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  transition = { duration: 1 },
}) {
  return (
    <AnimatePresence>
      <motion.div
        key={keyvalue}
        initial={initial}
        animate={animate}
        transition={transition}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
