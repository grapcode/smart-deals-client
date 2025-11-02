import React from 'react';
import { NavLink } from 'react-router';

const MyLink = ({ to, className, children }) => {
  return (
    <div>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? 'text-[#3b25c1]  font-semibold'
            : `${className} font-semibold`
        }
      >
        {children}
      </NavLink>
    </div>
  );
};

export default MyLink;
