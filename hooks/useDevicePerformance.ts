import { useState, useEffect } from 'react';

export type PerformanceLevel = 'high' | 'medium' | 'low';

interface DevicePerformance {
  level: PerformanceLevel;
  isMobile: boolean;
  isLowEnd: boolean;
  cpuCores: number;
  deviceMemory: number;
  prefersReducedMotion: boolean;
  shouldReduceEffects: boolean;
}

export function useDevicePerformance(): DevicePerformance {
  const [performance, setPerformance] = useState<DevicePerformance>({
    level: 'high',
    isMobile: false,
    isLowEnd: false,
    cpuCores: 4,
    deviceMemory: 4,
    prefersReducedMotion: false,
    shouldReduceEffects: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // @ts-ignore - These are experimental APIs
    const cpuCores = navigator.hardwareConcurrency || 4;
    // @ts-ignore
    const deviceMemory = navigator.deviceMemory || 4;

    // Determine performance level - MORE CONSERVATIVE
    let level: PerformanceLevel = 'medium'; // Default to medium instead of high
    let isLowEnd = false;

    if (isMobile) {
      // Mobile devices - very conservative
      if (cpuCores <= 4 || deviceMemory <= 3) {
        level = 'low';
        isLowEnd = true;
      } else if (cpuCores <= 6 || deviceMemory <= 6) {
        level = 'medium';
      } else {
        level = 'high';
      }
    } else {
      // Desktop devices - still conservative
      if (cpuCores <= 2 || deviceMemory <= 2) {
        level = 'low';
        isLowEnd = true;
      } else if (cpuCores <= 6 || deviceMemory <= 6) {
        level = 'medium';
      } else {
        level = 'high';
      }
    }

    // If user prefers reduced motion, always use low performance level
    if (prefersReducedMotion) {
      level = 'low';
      isLowEnd = true;
    }

    const shouldReduceEffects = prefersReducedMotion || isLowEnd || isMobile;

    setPerformance({
      level,
      isMobile,
      isLowEnd,
      cpuCores,
      deviceMemory,
      prefersReducedMotion,
      shouldReduceEffects,
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
