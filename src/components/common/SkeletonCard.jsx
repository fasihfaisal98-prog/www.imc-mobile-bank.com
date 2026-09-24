import React from "react";

export const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 h-[380px] animate-pulse flex flex-col justify-between">
      <div className="space-y-3">
        <div className="w-full h-44 bg-slate-200 rounded-xl"></div>
        <div className="flex justify-between">
          <div className="w-16 h-4 bg-slate-200 rounded"></div>
          <div className="w-20 h-4 bg-slate-200 rounded"></div>
        </div>
        <div className="w-3/4 h-5 bg-slate-200 rounded"></div>
        <div className="w-1/2 h-3 bg-slate-100 rounded"></div>
      </div>
      <div className="space-y-3 pt-3 border-t border-slate-100">
        <div className="w-24 h-6 bg-slate-200 rounded"></div>
        <div className="w-full h-10 bg-slate-200 rounded-xl"></div>
      </div>
    </div>
  );
};
