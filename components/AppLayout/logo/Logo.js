import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faBrain } from '@fortawesome/free-solid-svg-icons';

export const Logo = () => {
  return (
    <div className="flex items-center gap-3 mx-auto">
      <FontAwesomeIcon icon={faBrain} className="text-2xl text-blue-900" />
      
      <div className="text-3xl mx-auto text-center font-heading font-semibold   text-blue-900">
        Content AI
      </div>
    </div>
  );
};
