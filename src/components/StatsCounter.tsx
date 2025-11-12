import { useEffect, useRef, useState } from 'react';

interface StatProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

const StatCounter = ({ end, duration = 2000, suffix = '', prefix = '', label }: StatProps) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          const startTime = Date.now();
          const endTime = startTime + duration;
          
          const updateCount = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeOutQuart * end);
            
            setCount(current);
            
            if (now < endTime) {
              requestAnimationFrame(updateCount);
            } else {
              setCount(end);
            }
          };
          
          requestAnimationFrame(updateCount);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <div ref={elementRef} className="text-center bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 shadow-lg">
      <div className="font-heading font-bold text-3xl md:text-4xl text-secondary" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-white font-medium mt-1" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
        {label}
      </div>
    </div>
  );
};

interface StatsCounterProps {
  stats: StatProps[];
  className?: string;
}

const StatsCounter = ({ stats, className = '' }: StatsCounterProps) => {
  return (
    <div className={`grid ${className}`}>
      {stats.map((stat, index) => (
        <StatCounter key={index} {...stat} />
      ))}
    </div>
  );
};

export default StatsCounter;
