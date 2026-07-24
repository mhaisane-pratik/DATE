import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PageId } from '../../types';

interface BreadcrumbProps {
  items: { label: string; page?: PageId }[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const { setCurrentPage } = useApp();

  return (
    <nav className="flex items-center text-xs text-slate-500 dark:text-slate-400 py-3 mb-4">
      <button
        onClick={() => setCurrentPage('home')}
        className="flex items-center hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
      >
        <Home className="w-3.5 h-3.5 mr-1" />
        Home
      </button>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="w-3 h-3 mx-2 text-slate-400" />
          {item.page ? (
            <button
              onClick={() => item.page && setCurrentPage(item.page)}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
            >
              {item.label}
            </button>
          ) : (
            <span className="font-semibold text-slate-800 dark:text-slate-200">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
