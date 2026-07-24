import React from 'react';

export const CoachCardSkeleton: React.FC = () => {
  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-200 dark:border-slate-800 animate-pulse flex flex-col justify-between h-[380px]">
      <div>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
          </div>
        </div>
        <div className="space-y-2 mb-4">
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full" />
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-5/6" />
        </div>
        <div className="flex gap-2 mb-4">
          <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded-full" />
          <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded-full" />
        </div>
      </div>
      <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="h-5 w-20 bg-slate-200 dark:bg-slate-700 rounded" />
        <div className="h-9 w-28 bg-indigo-200 dark:bg-indigo-950 rounded-xl" />
      </div>
    </div>
  );
};
