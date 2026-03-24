import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, X, Server, ShieldCheck, Terminal, AlertTriangle, Cpu, Radio } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Html, RoundedBox, Float, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { useNodeStore } from '../../store/useNodeStore';
import { useSimulation } from '../../hooks/useSimulation';

const NODE_DEFS = {
  n1: { label: "SAP Mainframe", pos: [-6, 0, 0], icon: Server },
  n2: { label: "Thermal Array", pos: [-2, 2.5, 0], icon: Radio },
  n3: { label: "Assembly Arm C", pos: [-2, -2.5, 0], icon: Cpu },
  n4: { label: "Ceyel Engine", pos: [2, 0, 0], icon: Activity },
  n5: { label: "ZK Blockchain", pos: [6, 0, 0], icon: ShieldCheck }
};

const EDGES = [
  { id: 'e1', from: 'n1', to: 'n4' },
  { id: 'e2', from: 'n2', to: 'n4' },
  { id: 'e3', from: 'n3', to: 'n4' },
  { id: 'e4', from: 'n4', to: 'n5' }
];

// Helper to determine material colors globally
const getStatusColor = (status) => {
  if (status === 'Error') return '#f43f5e'; // Rose 500
  if (status === 'Warning') return '#eab308'; // Yellow 500
  return '#10b981'; // Emerald 500 (Active)
};

// 3D Visual representation of a Data Packet flowing
const DataParticle = ({ start, end, status }) => {
  const meshRef = useRef();
  // We use a math constant to define the progress of particle
  const progress = useRef(Math.random()); 
  const speed = status === 'Error' ? 0.05 : (status === 'Warning' ? 0.2 : 0.6); // Errors halt flow, warnings slow it down
  
  const startVec = useMemo(() => new THREE.Vector3(...start), [start]);
  const endVec = useMemo(() => new THREE.Vector3(...end), [end]);

  useFrame((state, delta) => {
    progress.current += delta * speed;
    if (progress.current > 1) progress.current = 0; // Reset back to start
    meshRef.current.position.lerpVectors(startVec, endVec, progress.current);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshBasicMaterial color={getStatusColor(status)} />
    </mesh>
  );
};

// Represents physical cables connecting nodes
const PipelineEdge = ({ edge }) => {
  const startPos = NODE_DEFS[edge.from].pos;
  const endPos = NODE_DEFS[edge.to].pos;
  
  // To check if the source node is failing and thus halting edge particles
  const sourceStats = useNodeStore(state => state.nodes[edge.from]);
  
  return (
    <group>
      <Line points={[startPos, endPos]} color="#334155" lineWidth={2} dashed={true} dashScale={5} />
      <DataParticle start={startPos} end={endPos} status={sourceStats?.Status} />
    </group>
  );
};

// The 3D System Node Instance
const WebGLNode = ({ id, nodeDef, isSelected, onClick }) => {
  const stats = useNodeStore(state => state.nodes[id]);
  const color = getStatusColor(stats?.Status);
  const meshRef = useRef();

  useFrame((state, delta) => {
    // Subtle breathing animation for 'Alive' feeling
    meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.02);
  });

  return (
    <Float floatIntensity={0.5} rotationIntensity={0.2} speed={2}>
      <group position={nodeDef.pos} onClick={(e) => { e.stopPropagation(); onClick(id); }}>
        <RoundedBox ref={meshRef} args={[1.5, 1.5, 1.5]} radius={0.2} smoothness={4}>
          <meshStandardMaterial 
            color="#1e293b" 
            emissive={color} 
            emissiveIntensity={isSelected ? 0.8 : (stats?.Status === 'Active' ? 0.2 : 0.6)} 
            roughness={0.2} 
            metalness={0.8} 
          />
        </RoundedBox>
        
        {/* HTML Tag hovering exactly over the 3D Node tracking its position */}
        <Html position={[0, -1.2, 0]} center transform style={{ width: '150px' }}>
          <div onClick={() => onClick(id)} className="flex flex-col items-center justify-center p-2 backdrop-blur-md bg-gray-900/60 border border-gray-700/50 rounded-xl transition-all cursor-pointer shadow-xl hover:scale-110">
            <h4 className="text-white text-[10px] font-bold tracking-widest uppercase mb-1">{nodeDef.label}</h4>
            <div className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${stats?.Status === 'Active' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : (stats?.Status === 'Warning' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-rose-500/20 text-rose-400 border-rose-500/30')}`}>
              {stats?.Status}
            </div>
          </div>
        </Html>
      </group>
    </Float>
  );
};

const TwinViewer = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const activeStats = useNodeStore(state => selectedNode ? state.nodes[selectedNode] : null);

  // Initialize Real-Time WebSocket backend
  useSimulation();

  return (
    <div className="w-full h-[600px] bg-[#0f1115] rounded-[32px] border border-gray-800 relative overflow-hidden shadow-2xl">
      {/* Absolute Grid Background matching product dark themes */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: "linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)", backgroundSize: '40px 40px' }} />

      {/* Top Left Status Indicator */}
      <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
        <Activity className="text-blue-500 w-5 h-5" />
        <h3 className="text-white font-bold tracking-tight">Functional Twin Interface</h3>
        <span className="ml-2 px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] uppercase font-bold rounded-lg border border-emerald-500/20 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          Live System Running
        </span>
      </div>

      {/* Bottom Left Legend */}
      <div className="absolute bottom-6 left-6 z-20 flex bg-gray-900/80 backdrop-blur-md border border-gray-800 p-2 rounded-xl gap-4">
        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Active</div>
        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase"><span className="w-2.5 h-2.5 rounded-full bg-yellow-500" /> Warning</div>
        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Error</div>
      </div>

      {/* Context Viewer Panel (Right Side Slide-In) */}
      <AnimatePresence>
        {selectedNode && activeStats && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute top-4 right-4 bottom-4 w-80 bg-gray-900/95 backdrop-blur-2xl border border-gray-700/50 rounded-2xl p-5 shadow-2xl z-30 flex flex-col"
          >
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-white font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                {React.createElement(NODE_DEFS[selectedNode].icon, { className: "w-4 h-4 text-blue-400" })}
                {NODE_DEFS[selectedNode].label}
              </h4>
              <button onClick={() => setSelectedNode(null)} className="p-1 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {Object.entries(activeStats).filter(([k]) => k !== 'logs' && k !== 'newLog' && k !== 'Status').map(([k, v]) => (
                <div key={k} className="bg-gray-800/50 border border-gray-700/50 p-3 rounded-xl flex flex-col gap-1">
                  <span className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">{k.replace("_", " ")}</span>
                  <span className="text-white font-mono text-sm">{v}</span>
                </div>
              ))}
            </div>

            {/* Live Terminal Feed */}
            <div className="flex-1 flex flex-col overflow-hidden bg-black/40 rounded-xl border border-gray-800">
              <div className="px-3 py-2 bg-gray-800/50 border-b border-gray-800 flex items-center gap-2">
                <Terminal className="w-3 h-3 text-gray-400" />
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Node Log Stream</span>
              </div>
              <div className="p-3 flex-1 overflow-y-auto flex flex-col gap-2 relative">
                <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                {activeStats.logs?.map((log, i) => (
                  <motion.div 
                    key={`${i}-${log}`} 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: Math.max(0.1, 1 - i * 0.15), x: 0 }}
                    className={`font-mono text-[10px] leading-relaxed break-words ${log.includes('CRITICAL') || log.includes('Error') ? 'text-rose-400' : (log.includes('WARN') ? 'text-yellow-400' : 'text-emerald-400/80')}`}
                  >
                    {log}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The 3D WebGL Context representing physical data architecture */}
      <Canvas 
        className="w-full h-full z-10" 
        camera={{ position: [0, 2, 12], fov: 45 }}
        onPointerMissed={() => setSelectedNode(null)}
      >
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 20, 10]} angle={0.15} penumbra={1} intensity={2} color="#ffffff" />
        <directionalLight position={[-10, -10, -10]} intensity={1} color="#0071E3" />
        
        {/* Render Structural Nodes */}
        {Object.entries(NODE_DEFS).map(([id, def]) => (
          <WebGLNode key={id} id={id} nodeDef={def} isSelected={selectedNode === id} onClick={setSelectedNode} />
        ))}
        
        {/* Render Moving Flow Edges */}
        {EDGES.map(edge => (
          <PipelineEdge key={edge.id} edge={edge} />
        ))}

        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
          maxAzimuthAngle={Math.PI / 6}
          minAzimuthAngle={-Math.PI / 6}
        />
      </Canvas>
    </div>
  );
};

export default TwinViewer;
