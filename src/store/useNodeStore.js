import { create } from 'zustand';

// Global state holding live node telemetry & logs
export const useNodeStore = create((set) => ({
  nodes: {
    "n1": { Latency: "12ms", Status: "Active", Throughput: "1.2GB/s", logs: ["[00:00:00] Initializing SAP Connection..."] },
    "n2": { Temp: "42°C", Bandwidth: "14Mbps", Status: "Active", logs: ["[00:00:00] Thermal array online."] },
    "n3": { Throughput: "5k/hr", Wear: "12%", Status: "Active", logs: ["[00:00:00] Assembly Arm C calibrated."] },
    "n4": { Parallel_Threads: "2048", Load: "62%", Status: "Active", logs: ["[00:00:00] Ceyel Engine booted."] },
    "n5": { Block: "#849202", Finality: "1.2s", Status: "Active", logs: ["[00:00:00] Polygon anchor verified."] }
  },
  updateNode: (id, { newLog, ...data }) => set((state) => {
    const currentNode = state.nodes[id];
    const updatedLogs = newLog ? [newLog, ...currentNode.logs].slice(0, 15) : currentNode.logs; // keep last 15
    return {
      nodes: {
        ...state.nodes,
        [id]: { ...currentNode, ...data, logs: updatedLogs }
      }
    };
  })
}));
