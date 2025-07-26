import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import styles from '../styles/styles';
import ProductCard from '../components/Route/ProductCard/ProductCard';
import { useSelector } from "react-redux";
import Loader from '../components/Layout/Loader';

const ProductPage = () => {
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (categoryData === null) {
      setData(allProducts);
    } else {
      const filteredProducts = allProducts && allProducts.filter((i) => i.category === categoryData);
      setData(filteredProducts);
    }
  }, [allProducts, categoryData]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header activeHeading={3} />
      <main className="flex-grow">
        <div className={`${styles.section} py-8`}>
          {isLoading ? (
            <div className="flex justify-center items-center h-[50vh]">
              <Loader />
            </div>
          ) : (
            <>
              <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12'>
                {data && data.map((i, index) => (
                  <ProductCard data={i} key={index} />
                ))}
              </div>
              {data && data.length === 0 && (
                <div className="w-full flex justify-center items-center">
                  <h1 className='text-center pb-[100px] text-[20px] text-gray-500'>
                    No Products Found
                  </h1>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ProductPage