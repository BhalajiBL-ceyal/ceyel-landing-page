// Simulates a WebSocket backend emitting high-frequency hardware and software telemetry
class MockSocket {
    constructor() {
      this.listeners = [];
      this.interval = null;
    }
  
    connect() {
      console.log("[MockSocket] Connected to Ceyel Telemetry Stream...");
      this.interval = setInterval(() => {
        this._generateTick();
      }, 1500); // 1.5s tick rate for smoother reading of logs
    }
  
    disconnect() {
      if (this.interval) clearInterval(this.interval);
      console.log("[MockSocket] Disconnected.");
    }
  
    subscribe(callback) {
      this.listeners.push(callback);
      return () => {
        this.listeners = this.listeners.filter(cb => cb !== callback);
      };
    }
  
    _generateTick() {
      const now = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute:"numeric", second:"numeric" });
      
      const fluctuates = {
        "n1": { Latency: `${Math.floor(Math.random() * 10 + 8)}ms`, newLog: `[${now}] Extracted 420 events from SAP ECC.` },
        "n2": { Temp: `${Math.floor(Math.random() * 10 + 44)}°C`, Bandwidth: `${(Math.random() * 5 + 18).toFixed(1)}Mbps`, newLog: `[${now}] Array ping response OK.` },
        "n3": { Throughput: `${Math.floor(Math.random() * 50 + 480)}/min` },
        "n4": { Load: `${Math.floor(Math.random() * 15 + 65)}%`, newLog: `[${now}] Engine computed 14 state vectors.` },
        "n5": { Finality: `${(Math.random() * 0.4 + 0.9).toFixed(2)}s`, newLog: `[${now}] Block validated via Polygon L2.` }
      };
  
      // Simulate real behavioral anomalies on Assembly Arm (n3)
      const randomValue = Math.random();
      if (randomValue > 0.95) {
          fluctuates["n3"] = { ...fluctuates["n3"], Status: "Error", Wear: "14%", newLog: `[${now}] CRITICAL: Latency spike detected on Arm C.` };
      } else if (randomValue > 0.85) {
          fluctuates["n3"] = { ...fluctuates["n3"], Status: "Warning", Wear: "13%", newLog: `[${now}] WARN: Arm C torque resistance increasing.` };
      } else {
          fluctuates["n3"] = { ...fluctuates["n3"], Status: "Active", Wear: "12%", newLog: `[${now}] Arm C operational throughput stable.` }; 
      }
  
      this.listeners.forEach(cb => cb(fluctuates));
    }
  }
  
  export const socketInstance = new MockSocket();
