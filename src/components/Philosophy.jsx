import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Statement = ({ children, align = "center" }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`max-w-4xl mx-auto py-24 md:py-32 ${align === "left" ? "text-left" : "text-center"}`}
    >
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium leading-tight text-primaryText tracking-tight">
        {children}
      </h2>
    </motion.div>
  );
};

const Philosophy = () => {
  return (
    <section className="w-full bg-background relative z-10 px-6 pb-20">
      <div className="max-w-6xl mx-auto">
        <Statement>
          Complex processes hide <br />
          <span className="text-secondaryText">invisible inefficiencies.</span>
        </Statement>
        
        <Statement>
          Data exists everywhere. <br />
          <span className="text-accent">Insight doesn’t.</span>
        </Statement>

        <Statement>
          Decisions deserve <span className="text-white border-b border-accent/50 pb-2">clarity</span>.
        </Statement>
      </div>

      {/* Decorative vertical line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-divider to-transparent opacity-50 -z-10" />
    </section>
  );
};

export default Philosophy;
