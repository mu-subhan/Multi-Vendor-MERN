import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import styles from '../styles/styles';
import ProductCard from '../components/Route/ProductCard/ProductCard';
import { useSelector } from "react-redux";
import Loader from '../components/Layout/Loader';

const BestSellingPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { allProducts } = useSelector((state) => state.products);

  useEffect(() => {
    setIsLoading(true);
    const d = allProducts && [...allProducts].sort((a, b) => b.sold_out - a.sold_out);
    setData(d);
    setIsLoading(false);
  }, [allProducts]);

  return (
    <div>
      <Header activeHeading={2} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        {isLoading ? (
          <div className="flex justify-center items-center h-[50vh]">
            <Loader />
          </div>
        ) : (
          <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12'>
            {data && data.map((i, index) => (
              <ProductCard data={i} key={index} />
            ))}
            {data && data.length === 0 && (
              <div className="w-full flex justify-center items-center">
                <h1 className='text-center pb-[100px] text-[20px] text-gray-500'>
                  No Products Found
                </h1>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default BestSellingPage
