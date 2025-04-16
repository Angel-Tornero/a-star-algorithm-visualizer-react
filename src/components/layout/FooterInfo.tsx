import React from 'react';
import { FaGithub } from 'react-icons/fa';

const FooterInfo: React.FC = () => {
  return (
    <div className="text-xs text-slate-400 mt-8 pt-6 border-t border-slate-700 space-y-1">
      <p>Created by Ángel Tornero Hernández</p>
      <p>
        <a
          href="mailto:angeltornerohdez@gmail.com"
          className="!text-slate-300 hover:!text-white transition-colors duration-200"
        >
          angeltornerohdez@gmail.com
        </a>
      </p>
      <p className="flex items-center gap-1 justify-center">
        <a
            href="https://github.com/Angel-Tornero/a-star-algorithm-visualizer-react"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 !text-slate-300 hover:!text-white transition-colors duration-200"
            >
            <FaGithub />
            <span>GitHub Repository</span>
        </a>

      </p>
    </div>
  );
};

export default FooterInfo;
