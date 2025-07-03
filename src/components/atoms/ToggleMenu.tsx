'use client';

import { IconMenu2, IconX } from '@tabler/icons-react';

interface ToggleMenuProps {
  handleToggleMenuOnClick: () => void;
  isToggleMenuOpen: boolean;
}

const ToggleMenu = ({ handleToggleMenuOnClick, isToggleMenuOpen }: ToggleMenuProps) => {
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200 dark:focus:ring-slate-700"
      aria-controls="navbar-sticky"
      aria-expanded={isToggleMenuOpen}
      onClick={handleToggleMenuOnClick}
    >
      <span className="sr-only">Open main menu</span>
      {isToggleMenuOpen ? (
        <IconX className="h-6 w-6" />
      ) : (
        <IconMenu2 className="h-6 w-6" />
      )}
    </button>
  );
};

export default ToggleMenu; 