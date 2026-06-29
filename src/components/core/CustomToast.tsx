"use client";

import React, { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { Icon } from '@iconify/react';
import { motion, useAnimation } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CustomToastProps {
  t: number | string;
  title: string;
  description?: string;
  icon?: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
}

export const CustomToast: React.FC<CustomToastProps> = ({
  t,
  title,
  description,
  icon,
  type = 'info',
  duration = 3000,
}) => {
  const controls = useAnimation();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    controls.set({ width: '100%' });
    controls.start({
      width: '0%',
      transition: { duration: duration / 1000, ease: 'linear' },
    });

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      toast.dismiss(t);
    }, duration);
  };

  const handleMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    controls.stop();
    controls.set({ width: '100%' }); // reset width
  };

  const handleMouseLeave = () => {
    startTimer();
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const typeStyles = {
    info: 'border-primary/20 bg-card text-foreground',
    success: 'border-green-500/50 bg-green-500/10 text-green-500',
    warning: 'border-yellow-500/50 bg-yellow-500/10 text-yellow-500',
    error: 'border-red-500/50 bg-red-500/10 text-red-500',
  };

  const defaultIcon = {
    info: 'lucide:info',
    success: 'lucide:check-circle',
    warning: 'lucide:alert-triangle',
    error: 'lucide:x-circle',
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border shadow-lg backdrop-blur-md transition-all p-4 w-full flex gap-3 min-w-[300px]',
        typeStyles[type]
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex-shrink-0 pt-0.5">
        <Icon icon={icon || defaultIcon[type]} className="w-5 h-5" />
      </div>
      <div className="flex flex-col gap-1 w-full pr-6">
        <span className="font-semibold text-sm">{title}</span>
        {description && <span className="text-xs opacity-80">{description}</span>}
      </div>

      <button
        onClick={() => toast.dismiss(t)}
        className="absolute top-3 right-3 p-1 rounded-md opacity-50 hover:opacity-100 transition-opacity"
      >
        <Icon icon="lucide:x" className="w-4 h-4" />
      </button>

      {/* Progress Line */}
      <motion.div
        animate={controls}
        className={cn(
          'absolute bottom-0 left-0 h-1',
          type === 'info' ? 'bg-primary' : 'bg-current opacity-50'
        )}
      />
    </div>
  );
};
