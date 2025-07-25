import React, { useState } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { categoriesData, productData } from "../../static/data";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { backend_url } from "../../server";
import Cart from "../Cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import { RxCross1 } from "react-icons/rx";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const [searchTerm, setSearchTerm] = useState("");
  const {isSeller } = useSelector((state)=>state.seller)
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);

  // console.log(user)
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts = productData.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchData(filteredProducts);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  // Update the profile image rendering in both mobile and desktop views
  const renderProfileImage = () => {
    if (loading) return null;
    
    if (isAuthenticated && user) {
      return (
        <Link to="/profile">
          <div className="w-8 h-9 rounded-full border-[3px] border-[#0eae88] overflow-hidden">
  <img
    src={user?.avatar?.url || "/default-avatar.png"}
    alt="profile"
    className="w-full h-full object-cover"
  />
</div>

        </Link>
      );
    }
    
    return (
      <>
        <Link to="/login" className="text-[18px] pr-[10px] text-[#000000b7]">
         <FaUserCircle className="w-12 h-12 mt-4" color="#fff" />
        </Link>
        {/* <Link to="/sign-up" className="text-[18px] text-[#000000b7]">
          Sign up
        </Link> */}
      </>
    );
  };

  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt="logo img"
              />
            </Link>
          </div>
          {/* search box */}
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData &&
                  searchData.map((i, index) => {
                  
                    return (
                      <Link to={`/product/${i._id}`}>
                        <div className="w-full flex items-start-py-3">
                          <img
                            // src={i.image_Url[0].url}
                            src={`${backend_url}${i.image_Url[0]?.url}`}
                            alt=""
                            className="w-[40px] h-[40px] mr-[10px]"
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>

          <div className={`${styles.button}`}>
            <Link to={`${isSeller ? "/dashboard" : "/shop-create"}`}>
              <h1 className="text-[#fff] flex items-center">
               {isSeller ?  "Seller Dashboard": "Become Seller "}  <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`${styles.section} relative ${styles.normalFlex} justify-between`}
      ></div>

      {/* mobile header */}

       <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        }
      w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt=""
                className="mt-3 cursor-pointer"
              />
            </Link>
          </div>
          <div>
            <div className="relative mr-[20px]">
              <AiOutlineShoppingCart size={30} />
              <span class="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                {cart && cart.length} 
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* header sidebar */}
      {open && (
        <div className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}>
          <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
            {/* overflow-y-scroll */}
           
            <div className="w-full justify-between flex pr-3">
              <div>
                <div
                  className="relative mr-[15px]"
                  onClick={() => setOpenWishlist(true) || setOpen(false)}
                >
  
                  <AiOutlineHeart size={30} className="mt-5 ml-5" />
                  <span class="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                    {wishlist && wishlist.length}1
                  </span>
                </div> 
              </div>
               <RxCross1
                  size={30}
                  className="ml-4 mt-5"
                  onClick={() => setOpen(false)}
                />
            </div>
           <div className="my-8 w-[92%] m-auto h-[40px relative]">
                <input
                  type="search"
                  placeholder="Search Product..."
                  className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
{searchData && (
                  <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                    {searchData.map((i) => {
                    
                      return (
                        <Link to={`/product/${i._id}`}>
                          <div className="flex items-center">
                            <img
                              src={i.image_Url[0]?.url}
                              alt=""
                              className="w-[50px] mr-2"
                            />
                            <h5>{i.name}</h5>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
            </div>
 
         <Navbar active={activeHeading} />
         <div className={`${styles.button} ml-4 !rounded-[4px]`}>
          <Link
          to='/shop-create'> 
            <h1 className="text-[#fff] flex items-center">
            Become Seller
            <IoIosArrowForward className="ml-1"/>
            </h1>
          </Link>
         </div>
          <br />
              <br />
              <br />

              <div className="flex w-full justify-center">
                {renderProfileImage()}
              </div>
            </div>
          </div>
      )}

      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-between w-full bg-gray-800 h-[70px]`}
      >
        <div className={`flex items-center justify-between px-8`}>
          {/* categories */}

          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button
                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
              >
                All Categories
              </button>
              <IoIosArrowDown
                size={25}
                className="absolute right-2 top-4 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </div>
        </div>

        {/* Nav items */}

        <div className={`flex-1 flex justify-center`}>
          <Navbar active={activeHeading} />
        </div>

        <div className="flex">
          <div className={`${styles.normalFlex}`}>
            <div
              className="relative cursor-pointer mr-[15px]"
              onClick={() => setOpenWishlist(true)}
            >
              <AiOutlineHeart size={30} color="rgb(255 255 255 /83%)" />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                {wishlist && wishlist.length ? wishlist.length : 0}
              </span>
            </div>
          </div>

          <div className={`${styles.normalFlex}`}>
            <div
              className="cursor-pointer relative mr-[15px]"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} color="rgb(255 255 255 /83%)" />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                {cart && cart.length ? cart.length : 0}
              </span>
            </div>

            <div className={`${styles.normalFlex}`}>
              <div className="cursor-pointer relative mr-[15px]">
                {renderProfileImage()}
              </div>
            </div>

            {/* cart Popup*/}

            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

            {/* Wishlist Popup*/}

            {openWishlist ? (
              <Wishlist setOpenWishlist={setOpenWishlist} />
            ) : null}
          </div>
        </div>
      </div>
    </> 
  );
};

export default Header;
