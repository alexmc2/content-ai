import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faBrain } from '@fortawesome/free-solid-svg-icons';

export const Logo = () => {
  return (
    <div className="flex items-center gap-3 mx-auto">
      <Link href="/home" legacyBehavior>
        <div className="text-3xl   font-semibold  text-blue-900">
          Content AI
        </div>
      </Link>
    </div>
  );
};
