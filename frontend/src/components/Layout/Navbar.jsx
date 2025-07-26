import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navItems } from '../../static/data';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="hidden md:flex items-center space-x-1">
      {navItems.map((item, index) => {
        const isActive = currentPath === item.url;
        
        return (
          <Link 
            to={item.url}
            key={index}
            className="relative px-4 py-2 group"
          >
            <span className={`relative z-10 font-medium transition-colors ${
              isActive ? 'text-white' : 'text-gray-200 hover:text-white'
            }`}>
              {item.title}
            </span>
            
            {isActive && (
              <motion.div 
                layoutId="navUnderline"
                className="absolute bottom-0 left-0 w-full h-1 bg-amber-600 rounded-full"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30
                }}
              />
            )}
            
            {!isActive && (
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 group-hover:w-full transition-all duration-300" />
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navbar;