import React from 'react';
import { FiZap } from 'react-icons/fi';

const ExpressRepairBadge = () => (
  <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/35 px-4 py-2.5 backdrop-blur-md sm:px-5 sm:py-3">
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 sm:h-10 sm:w-10">
      <FiZap className="h-4 w-4 text-white sm:h-5 sm:w-5" aria-hidden="true" />
    </span>
    <div className="text-left">
      <p className="text-sm font-bold leading-tight text-white sm:text-base">Naprawy ekspresowe od ręki</p>
      <p className="text-xs text-white/80 sm:text-sm">Nawet do 30 minut</p>
    </div>
  </div>
);

export default ExpressRepairBadge;
