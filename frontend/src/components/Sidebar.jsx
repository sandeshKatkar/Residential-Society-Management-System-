import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ links }) => {
  const location = useLocation();

  return (
    <div className="bg-secondary text-white w-64 min-h-screen p-4">
      <nav className="space-y-2">
        {links.map((link, idx) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={idx}
              to={link.path}
              className={`block px-4 py-3 rounded hover:bg-primary transition ${
                isActive ? 'bg-primary' : ''
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;