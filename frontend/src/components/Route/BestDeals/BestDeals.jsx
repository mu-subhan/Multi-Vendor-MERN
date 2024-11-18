import React, { useEffect, useState } from 'react'
import { productData } from '../../../static/data';
import styles from '../../../styles/styles';
import ProductCard from "../productCard/productCard"; 

const BestDeals = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (productData && Array.isArray(productData)) {
            // Sort by total_sell in descending order
            const sortedData = productData.sort((a, b) => b.total_sell - a.total_sell);
            
            // Slice first 5 items
            const firstFive = sortedData.slice(0, 5);
            setData(firstFive);
        }
    }, []);

    return (
        <div>
            <div className={`${styles.section}`}>
                <div className={`${styles.heading}`}>
                    <h1>Best Deals</h1>
                </div>

                <div className='grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]'>
                    {data && data.map((item, index) => (
                        <ProductCard data={item} key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BestDeals;
