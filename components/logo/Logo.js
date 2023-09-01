import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faBrain } from '@fortawesome/free-solid-svg-icons';

export const Logo = () => {
  return (
    <div className="flex items-center gap-3 mx-auto">
      <Link href="/home">
      <div className="text-2xl   font-semibold  text-blue-900">CONTENT AI</div>
      </Link>
    </div>
  );
};
