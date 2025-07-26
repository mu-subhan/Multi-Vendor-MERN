import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../../redux/actions/product";
import ProductCard from "../ProductCard/ProductCard";
import { FiZap } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BestDeals = () => {
  const [data, setData] = useState([]);
  const { allProducts, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!allProducts || allProducts.length === 0) {
      dispatch(getAllProducts());
    }
  }, [dispatch]);

  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort((a,b) => b.sold_out - a.sold_out); 
    const firstFive = sortedData && sortedData.slice(0, 5);
    setData(firstFive);
  }, [allProducts]);

  return (
<section className="py-12 sm:px-6 lg:px-2 bg-gradient-to-b from-gray-50 to-white">
  <div className="max-w-8xl px-4 sm:px-6 lg:px-2 mx-auto">
    <div className="bg-white p-8 rounded-2xl shadow-xl mb-12">
      <div className="flex items-center mb-8">
        <FiZap className="text-3xl text-yellow-500 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">Best Deals</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {loading ? (
          Array(5).fill(0).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm overflow-hidden p-4 w-full h-full flex flex-col items-center justify-center"
            >
              <Skeleton height={200} />
              <div className="pt-4">
                <Skeleton count={3} />
              </div>
            </div>
          ))
        ) : data && data.length !== 0 ? (
          data.map((product, index) => (
            <div
              key={index}
              className="transform hover:-translate-y-2 transition-transform duration-300 border border-gray-200 rounded-lg"
            >
              <ProductCard data={product}  />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-500 text-lg">No products found</div>
            <button className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              Refresh
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
</section>


  );
};

export default BestDeals;