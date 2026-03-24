import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);

  const bootLogs = [
    "INITIALIZING EDGE NODE...",
    "V 2.04.8 LOADED",
    "BYPASSING SECURITY PROTOCOLS...",
    "ESTABLISHING SECURE HANDSHAKE...",
    "LOADING NEURAL WEIGHTS...",
    "SYNCING WITH MAINNET...",
    "SYSTEM OPTIMAL."
  ];

  useEffect(() => {
    // Disable scrolling while preloader is active
    document.body.style.overflow = 'hidden';
    
    // Simulate fast logs
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < bootLogs.length) {
        setLogs(prev => [...prev, bootLogs[logIndex]]);
        logIndex++;
      } else {
        clearInterval(logInterval);
      }
    }, 150);

    // Simulate progress 0 -> 100
    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 10) + 2;
      if (currentProgress >= 100) {
        setProgress(100);
        clearInterval(progressInterval);
        
        setTimeout(() => {
          document.body.style.overflow = '';
          onComplete();
        }, 600);
      } else {
        setProgress(currentProgress);
      }
    }, 80);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#040608',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '3rem',
        color: '#6366F1',
        fontFamily: 'monospace',
      }}
    >
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden' }}>
        {logs.map((log, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, x: -10 }} 
            animate={{ opacity: 1, x: 0 }} 
            style={{ marginBottom: '0.4rem', fontSize: '0.85rem', letterSpacing: '0.05em' }}
          >
            &gt; {log}
          </motion.div>
        ))}
      </div>
      
      <div style={{
        marginTop: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        borderTop: '1px solid rgba(99,102,241,0.3)',
        paddingTop: '1rem'
      }}>
        <div style={{ fontSize: '0.8rem', letterSpacing: '0.1em' }}>
          CEYEL OS / SEQUENCE START
        </div>
        <div style={{
          fontSize: '4rem',
          fontWeight: 300,
          color: '#E5E7EB',
          lineHeight: 1,
          fontFamily: 'Inter, sans-serif',
          letterSpacing: '-0.04em'
        }}>
          {progress}%
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;
