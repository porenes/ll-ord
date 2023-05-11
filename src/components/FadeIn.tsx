import { PropsWithChildren } from "react";
import { motion } from "framer-motion";

export function FadeIn({ children }: PropsWithChildren) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.33 }}
    >
      {children}
    </motion.div>
  );
}
