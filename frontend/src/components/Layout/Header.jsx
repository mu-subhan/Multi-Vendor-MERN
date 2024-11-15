import React, { useState } from 'react'
import styles from '../../styles/styles'
import { Link } from 'react-router-dom';
import logo from "../../assests/logo.png"
import { AiOutlineSearch } from 'react-icons/ai';
import {productData} from "../../static/data";
import {IoIosArrowForward} from "react-icons/io"

const Header = () => {
 const [searchTerm,setSearchTerm] = useState();
    const [searchData,setSearchData] = useState(null);

    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term); 

        const filteredProducts = productData.filter((product) =>
        
            product.name.toLowerCase().includes(term.toLowerCase())
);
setSearchData(filteredProducts);
    };

  return (
    <div className={`${styles.section}`}>
       <div className="hidden lg:flex items-center justify-between my-[20px] h-[600px]">
  <div>
    <Link to="/">
      <img src={logo} alt="logo img" className="w-[10%]" />
    </Link>
  </div>
  {/* search box */}
  <div className='w-[50%] relative'>
    <input type='text' 
    placeholder='Search Product...'
    value={searchTerm}
    onChange={handleSearchChange}
    className='h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md'/>
<AiOutlineSearch size ={30} className='absolute right-2 top-1.5 cursor-pointer' />
{
    searchData && searchData.length !== 0 ? (
        <div className='absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4'>
            {searchData && searchData.map((i,index) => {
                const d = i.name;

                const Product_name = d.replace(/\s+/g,"-");
                return(
                    <Link to={`/product/${Product_name}`}>
                        <div className="w-full flex items-start-py-3">
                            <img src={i.image_Url[0].url} alt=''
                            className='w-[40px] h-[40px] mr-[10px]'/>
                        <h1>{i.name}</h1>
                        </div>
                    </Link>
                )
            })}
            
            </div>

    ):null
}
  </div>
  
<div className={`${styles.button}`}>
 <Link to='/seller'>
 <h1 className='text-[#fff] flex items-center'>
    Become Seller <IoIosArrowForward className ="ml-1" />
 </h1>
 </Link>

</div>

</div>  
</div>
  );
};

export default Header;
