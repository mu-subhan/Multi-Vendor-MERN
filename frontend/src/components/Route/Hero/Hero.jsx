import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative pt-[80px] min-h-[70vh] 800px:min-h-[80vh] w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="E-commerce shopping"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center h-full">
        <div className="container mx-auto px-4 800px:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-[800px] text-white"
          >
            <h1 className="text-4xl 800px:text-6xl font-bold leading-tight mb-4">
              Your Ultimate <br />Online Shopping Destination
            </h1>
            
            <p className="text-lg 800px:text-xl mb-8 max-w-[600px] leading-relaxed">
              Discover amazing deals on fashion, electronics, home goods and more. Fast delivery and easy returns across India.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/products" 
                className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg px-8 py-3 text-lg transition-colors duration-300 shadow-lg"
              >
                Shop Now
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-white text-2xl"
        >
          ↓
        </motion.div>
      </div> */}
    </div>
  );
};

export default Hero;