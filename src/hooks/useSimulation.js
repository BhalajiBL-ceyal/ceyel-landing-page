import { useEffect } from 'react';
import { socketInstance } from '../services/mockSocket';
import { useNodeStore } from '../store/useNodeStore';

export const useSimulation = () => {
  const updateNode = useNodeStore(state => state.updateNode);

  useEffect(() => {
    socketInstance.connect();

    const unsubscribe = socketInstance.subscribe((telemetryTick) => {
      // telemetryTick is an object of node IDs mapping to updated keys
      Object.entries(telemetryTick).forEach(([id, data]) => {
         updateNode(id, data);
      });
    });

    return () => {
      unsubscribe();
      socketInstance.disconnect();
    };
  }, [updateNode]);
};
