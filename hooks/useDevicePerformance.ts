import { useState, useEffect } from 'react';

export type PerformanceLevel = 'high' | 'medium' | 'low';

interface DevicePerformance {
  level: PerformanceLevel;
  isMobile: boolean;
  isLowEnd: boolean;
  cpuCores: number;
  deviceMemory: number;
}

export function useDevicePerformance(): DevicePerformance {
  const [performance, setPerformance] = useState<DevicePerformance>({
    level: 'high',
    isMobile: false,
    isLowEnd: false,
    cpuCores: 4,
    deviceMemory: 4,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    // @ts-ignore - These are experimental APIs
    const cpuCores = navigator.hardwareConcurrency || 4;
    // @ts-ignore
    const deviceMemory = navigator.deviceMemory || 4;

    // Determine performance level
    let level: PerformanceLevel = 'high';
    let isLowEnd = false;

    if (isMobile) {
      // Mobile devices - more conservative
      if (cpuCores <= 2 || deviceMemory <= 2) {
        level = 'low';
        isLowEnd = true;
      } else if (cpuCores <= 4 || deviceMemory <= 4) {
        level = 'medium';
      }
    } else {
      // Desktop devices
      if (cpuCores <= 2 || deviceMemory <= 2) {
        level = 'low';
        isLowEnd = true;
      } else if (cpuCores <= 4 || deviceMemory <= 4) {
        level = 'medium';
      }
    }

    setPerformance({
      level,
      isMobile,
      isLowEnd,
      cpuCores,
      deviceMemory,
    });
  }, []);

  return performance;
}

// Throttle helper function
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
