import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  count?: number;
  showText?: boolean;
  size?: number;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  count,
  showText = true,
  size = 16
}) => {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center text-amber-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            className={`${
              star <= Math.round(rating)
                ? 'fill-amber-400 text-amber-400'
                : 'text-slate-300 dark:text-slate-600'
            }`}
          />
        ))}
      </div>
      {showText && (
        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 ml-1">
          {rating.toFixed(1)}
          {count !== undefined && (
            <span className="text-xs font-normal text-slate-500 dark:text-slate-400 ml-1">
              ({count})
            </span>
          )}
        </span>
      )}
    </div>
  );
};
