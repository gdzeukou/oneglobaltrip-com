
import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

interface MobileOptimizedNavProps {
  items: NavItem[];
  className?: string;
}

export const MobileOptimizedNav = ({ items, className }: MobileOptimizedNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (label: string) => {
    setExpandedItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1]
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1]
      }
    }
  };

  const itemVariants: Variants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <nav className={cn("relative", className)}>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.div>
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-lg rounded-xl border border-white/20 shadow-premium overflow-hidden md:hidden z-50"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="p-4 space-y-2">
              {items.map((item, index) => (
                <motion.div
                  key={item.label}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  transition={{ delay: index * 0.1 }}
                >
                  {item.children ? (
                    <div>
                      <button
                        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/10 transition-colors"
                        onClick={() => toggleExpanded(item.label)}
                      >
                        <span className="font-medium">{item.label}</span>
                        <motion.div
                          animate={{ rotate: expandedItems.includes(item.label) ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown size={20} />
                        </motion.div>
                      </button>
                      
                      <AnimatePresence>
                        {expandedItems.includes(item.label) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-4 mt-2 space-y-1"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.label}
                                to={child.href}
                                className="block p-2 rounded-lg hover:bg-white/10 transition-colors text-sm"
                                onClick={() => setIsOpen(false)}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className="block p-3 rounded-lg hover:bg-white/10 transition-colors font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-8">
        {items.map((item) => (
          <div key={item.label} className="relative group">
            {item.children ? (
              <div>
                <button className="flex items-center space-x-1 font-medium hover:text-blue-600 transition-colors">
                  <span>{item.label}</span>
                  <ChevronDown size={16} />
                </button>
                
                <div className="absolute top-full left-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="bg-white rounded-xl border border-gray-200 shadow-premium p-4 min-w-48">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.href}
                        className="block p-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to={item.href}
                className="font-medium hover:text-blue-600 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default MobileOptimizedNav;
