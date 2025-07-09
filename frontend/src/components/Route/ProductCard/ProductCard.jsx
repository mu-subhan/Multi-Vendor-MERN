import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import styles from "../../../styles/styles"
import { AiFillHeart, AiFillStar, AiOutlineEye, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineStar } from 'react-icons/ai';
import ProductDetailCard from "../ProductDetailCard/ProductDetailCard"

const ProductCard = ({ data, isShop, isEvent }) => {
    const [click, setClick] = useState(false);
    const [open, setOpen] = useState(false);
    const [imgError, setImgError] = useState(false);

    if (!data) {
        return null;
    }

    const product_name = data.name ? data.name.replace(/\s+/g, "-") : "";

    // Memoize the image URL to prevent recalculation on every render
    const imageUrl = useMemo(() => {
        if (!data) return "/no-image.png";

        // For events
        if (isEvent) {
            if (data.images?.[0]?.url) return data.images[0].url;
            if (data.image_Url?.[0]?.url) return data.image_Url[0].url;
        }
        
        // For products
        if (data.images) {
            if (Array.isArray(data.images) && data.images[0]) {
                if (typeof data.images[0] === 'string') {
                    return `${process.env.REACT_APP_BACKEND_URL}/uploads/${data.images[0]}`;
                }
                return data.images[0].url || "/no-image.png";
            }
            if (typeof data.images === 'string') {
                return `${process.env.REACT_APP_BACKEND_URL}/uploads/${data.images}`;
            }
        }

        if (data.image_Url && Array.isArray(data.image_Url) && data.image_Url[0]) {
            return data.image_Url[0].url || "/no-image.png";
        }

        return "/no-image.png";
    }, [data, isEvent]);

    const handleImageError = (e) => {
        if (!imgError) {
            setImgError(true);
            e.target.src = "/no-image.png";
        }
    };

    return (
        <>
            <div className='w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer'>
                <div className='flex justify-end'></div>
                <Link to={`/product/${product_name}`}>
                    <img 
                        src={imageUrl}
                        alt={data.name || 'Product Image'}
                        className='w-full h-[170px] object-contain'
                        onError={handleImageError}
                        loading="lazy"
                    />
                </Link>
                <Link to={isShop ? `/shop/preview/${data?.shop?._id}` : "/"}>
                    <h5 className={`${styles.shop_name}`}>
                        {data.shop?.name || "Shop Name"}
                    </h5>
                </Link>
                <Link to={`/product/${product_name}`}>
                    <h4 className="pb-3 font-[500]">
                        {data.name && data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
                    </h4>

                    <div className="flex">
                        <AiFillStar className='mr-2 cursor-pointer' color='#F6BA00' size={20} />
                        <AiFillStar className='mr-2 cursor-pointer' color='#F6BA00' size={20} />
                        <AiFillStar className='mr-2 cursor-pointer' color='#F6BA00' size={20} />
                        <AiFillStar className='mr-2 cursor-pointer' color='#F6BA00' size={20} />
                        <AiOutlineStar className='mr-2 cursor-pointer' color='#F6BA00' size={20} />
                    </div>

                    <div className='py-2 flex items-center justify-between'>
                        <div className='flex'>
                            <h5 className={`${styles.productDiscountPrice}`}>
                                {isEvent ? (
                                    `$${data.discountPrice || data.discount_price || 0}`
                                ) : (
                                    `$${data.price === 0 ? data.price : data.discount_price || data.price || 0}`
                                )}
                            </h5>
                            {!isEvent && data.price && data.discount_price && (
                                <h4 className={`${styles.price}`}>
                                    ${data.price}
                                </h4>
                            )}
                        </div>
                        <span className='font-[400] text-[17px] text-[#68d284]'>
                            {data.total_sell || data.sold_out || 0} sold
                        </span>
                    </div>
                </Link>

                {/* side options */}
                <div>
                    {click ? (
                        <AiFillHeart
                            size={22}
                            className='cursor-pointer absolute right-2 top-5'
                            onClick={() => setClick(!click)}
                            color={click ? "red" : "#333"}
                            title='Remove from wishlist'
                        />
                    ) : (
                        <AiOutlineHeart
                            size={22}
                            className='cursor-pointer absolute right-2 top-5'
                            onClick={() => setClick(!click)}
                            color={click ? "red" : "#333"}
                            title='Add to wishlist'
                        />
                    )}
                    <AiOutlineEye
                        size={22}
                        className='cursor-pointer absolute right-2 top-14'
                        onClick={() => setOpen(!open)}
                        color="#333"
                        title='Quick View'
                    />

                    <AiOutlineShoppingCart
                        size={22}
                        className='cursor-pointer absolute right-2 top-24'
                        onClick={() => setOpen(!open)}
                        color="#444"
                        title='Add to cart'
                    />

                    {open && <ProductDetailCard setOpen={setOpen} data={data} />}
                </div>
            </div>
        </>
    );
};

export default ProductCard;
