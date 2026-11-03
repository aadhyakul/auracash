import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showTagline = false,
  className = '',
  onClick
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div 
      className={`inline-flex items-center gap-2.5 cursor-pointer select-none group ${className}`}
      onClick={onClick}
    >
      {/* Icon with glowing aura, wallet/cash and location pin */}
      <div className="relative flex items-center justify-center">
        {/* Animated outer aura ring */}
        <div className={`absolute inset-0 rounded-2xl bg-indigo-500/25 blur-md group-hover:bg-indigo-500/40 transition-all duration-500 animate-pulse`} />
        
        {/* Core emblem container */}
        <div className={`${iconSizes[size]} relative rounded-2xl bg-gradient-to-tr from-violet-700 via-indigo-600 to-purple-500 p-0.5 shadow-md shadow-indigo-600/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}>
          <div className="w-full h-full rounded-[14px] bg-gradient-to-br from-indigo-900/40 to-transparent flex items-center justify-center p-1.5 text-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
              {/* Outer Aura Ring */}
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.3" strokeDasharray="3 3" />
              {/* Pin body */}
              <path d="M12 2C8.5 2 6 4.8 6 8.5c0 4.8 6 12.5 6 12.5s6-7.7 6-12.5C18 4.8 15.5 2 12 2z" fill="currentColor" fillOpacity="0.2" />
              {/* Rupee Symbol inside Pin */}
              <path d="M10 6h4" strokeWidth="1.75" />
              <path d="M10 8.5h3.5" strokeWidth="1.75" />
              <path d="M10 6v6" strokeWidth="1.75" />
              <path d="M10 10c1.5 0 3-.4 3-1.5s-1.5-1.5-3-1.5" strokeWidth="1.75" />
              <path d="M11.8 11.5l2.7 3.5" strokeWidth="1.75" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`${textSizes[size]} font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-violet-900 bg-clip-text text-transparent group-hover:from-indigo-600 group-hover:to-violet-700 transition-colors`}>
            Aura<span className="text-indigo-600">Cash</span>
          </span>
          <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60 tracking-wider">
            MVP
          </span>
        </div>
        {showTagline && (
          <span className="text-[11px] font-medium text-slate-500 tracking-tight -mt-0.5">
            Cash on demand, from someone nearby.
          </span>
        )}
      </div>
    </div>
  );
};
