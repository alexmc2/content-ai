import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain } from '@fortawesome/free-solid-svg-icons';

export const Logo = () => {
  return (
    <div className="text-4xl text-center py-5 font-heading">
      CONTENT-AI
      <FontAwesomeIcon icon={faBrain} className="2xl px-2 text-slate-400 " />
    </div>
  );
};
