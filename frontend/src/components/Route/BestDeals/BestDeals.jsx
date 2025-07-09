import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";
import Loader from "../../Layout/Loader";

const BestDeals = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { allProducts } = useSelector((state) => state.products);

  useEffect(() => {
    setIsLoading(true);
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort((a,b) => b.sold_out - a.sold_out); 
    const firstFive = sortedData && sortedData.slice(0, 5);
    setData(firstFive);
    setIsLoading(false);
  }, [allProducts]);
  
  return (
    <div className={`${styles.section}`}>
      <div className={`${styles.heading}`}>
        <h1>Best Deals</h1>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {data && data.length > 0 ? (
            data.map((i, index) => <ProductCard data={i} key={index} />)
          ) : (
            <div className="w-full flex justify-center items-center">
              <h4 className="text-gray-500">No products found!</h4>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BestDeals;