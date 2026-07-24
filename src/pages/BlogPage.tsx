import React, { useState } from 'react';
import { BookOpen, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { MOCK_BLOG_ARTICLES } from '../data/mockData';
import { BlogArticle } from '../types';
import { Modal } from '../components/common/Modal';
import { Breadcrumb } from '../components/common/Breadcrumb';

export const BlogPage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const featured = MOCK_BLOG_ARTICLES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-10">
      <Breadcrumb items={[{ label: 'Relational Blog & Guides' }]} />

      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">DateMentor Research & Insights</h1>
        <p className="text-xs text-slate-500">Expert articles written by certified relationship psychologists & Gottman counselors.</p>
      </div>

      {/* Featured Banner Article */}
      <div
        onClick={() => setSelectedArticle(featured)}
        className="cursor-pointer glass-card bg-slate-900 text-white rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-slate-800 shadow-2xl hover:border-indigo-500 transition-all"
      >
        <div className="lg:col-span-6 p-8 flex flex-col justify-between space-y-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-indigo-600 text-white font-bold text-[10px] uppercase">
              Featured Article
            </span>
            <h2 className="text-2xl font-black mt-3 leading-tight hover:text-indigo-300 transition-colors">
              {featured.title}
            </h2>
            <p className="text-xs text-slate-300 mt-2 line-clamp-3">
              {featured.summary}
            </p>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <img src={featured.authorAvatar} alt={featured.author} className="w-7 h-7 rounded-full object-cover" />
              <span>{featured.author}</span>
            </div>
            <span className="flex items-center gap-1 text-indigo-400 font-bold">Read Guide <ArrowRight className="w-4 h-4" /></span>
          </div>
        </div>
        <div className="lg:col-span-6 relative h-64 lg:h-auto">
          <img src={featured.image} alt={featured.title} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_BLOG_ARTICLES.map((art) => (
          <div
            key={art.id}
            onClick={() => setSelectedArticle(art)}
            className="group cursor-pointer glass-card bg-white dark:bg-slate-800/90 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="h-44 relative overflow-hidden">
                <img src={art.image} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-slate-900/80 text-white text-[10px] font-bold">
                  {art.category}
                </span>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors line-clamp-2">
                  {art.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {art.summary}
                </p>
              </div>
            </div>
            <div className="px-5 pb-5 pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 dark:border-slate-800">
              <span>{art.readTime}</span>
              <span className="font-bold text-indigo-600 dark:text-indigo-400">Read</span>
            </div>
          </div>
        ))}
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <Modal isOpen={!!selectedArticle} onClose={() => setSelectedArticle(null)} title={selectedArticle.title} maxWidth="max-w-3xl">
          <div className="space-y-4 text-slate-800 dark:text-slate-200">
            <div className="flex items-center gap-3 text-xs text-slate-500 pb-2 border-b border-slate-100 dark:border-slate-800">
              <img src={selectedArticle.authorAvatar} alt={selectedArticle.author} className="w-8 h-8 rounded-full object-cover" />
              <div>
                <div className="font-bold text-slate-900 dark:text-white">{selectedArticle.author}</div>
                <div>{selectedArticle.date} • {selectedArticle.readTime}</div>
              </div>
            </div>
            <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-64 rounded-2xl object-cover" />
            <div className="text-xs sm:text-sm leading-relaxed space-y-4 whitespace-pre-line pt-2">
              {selectedArticle.content}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
