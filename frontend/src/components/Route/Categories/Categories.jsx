import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { brandingData, categoriesData } from '../../../static/data';

const Categories = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Branding Section */}
      <div className="hidden sm:block mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-white p-6 rounded-xl shadow-md">
          {brandingData.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="flex items-start p-4 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="text-3xl text-blue-600 mr-4">{item.icon}</div>
              <div>
                <h3 className="font-bold text-lg text-gray-800 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.Description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-white p-8 rounded-xl shadow-md mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Shop by Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categoriesData.map((category) => (
            <motion.div
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/product?category=${category.title}`)}
              className="group relative h-40 bg-gray-50 rounded-lg overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
              <img
                src={category.image_Url}
                alt={category.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 z-20 p-4 w-full bg-gradient-to-t from-black/70 to-transparent">
                <h3 className="text-lg font-semibold text-white">{category.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
