import React, { useEffect, useState } from 'react'
import styles from '../../styles/styles';
import ProductCard from "../Route/ProductCard/ProductCard";
import { useSelector } from 'react-redux';

const SuggestedProduct = ({ data }) => {
    const { products } = useSelector((state) => state.products);
    const [suggestedProducts, setSuggestedProducts] = useState([]);

    useEffect(() => {
        if (data && products) {
            const filteredProducts = products.filter((i) => i.category === data.category && i._id !== data._id);
            setSuggestedProducts(filteredProducts);
        }
    }, [data, products]);

    return (
        <div>
            {data && suggestedProducts.length > 0 ? (
                <div className={`${styles.section} p-4`}>
                    <h2 className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}>
                        Related Products
                    </h2>
                    <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12'>
                        {suggestedProducts.map((i, index) => (
                            <ProductCard data={i} key={index} />
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default SuggestedProduct
