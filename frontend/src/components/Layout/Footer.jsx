import React from 'react'
import logo from "../../assests/logo.png"
import { AiFillFacebook, AiFillInstagram, AiFillLinkedin, AiOutlineTwitter } from 'react-icons/ai'
import { footercompanyLinks, footerProductLinks, footerSupportLinks } from '../../static/data'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className='bg-black text-white'>
      <div className='md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#342ac8] py-7'>
        <h1 className='lg-text4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:2/5'>
        <span className='text-[#56d879]'>
            Subcribe

        </span>us for get news <br />events and offer
        </h1>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 sm:text-center'>
        <ul className='px-5 text-center sm:text-start flex sm:block flex-col items-center'>
            <img 
            src={logo}
            alt=''
            style={{filter:"brightness(0) invert(1)"}}
            />
            <br/>
            <p>The home and elements needed to create beatiful products.</p>
            <div className='flex items-center mt-[15px]'>
                <AiFillFacebook size={25} cursor="pointer" />
                <AiOutlineTwitter size={25} cursor="pointer" />
                <AiFillInstagram size={25} cursor="pointer" />
                <AiFillLinkedin size={25} cursor="pointer" />

            </div>
        </ul>

    <ul className='text-center sm:text-start'>
        <h1 className='mb-1 font-semibold'>
Company
        </h1>
        {footerProductLinks.map((link) => (
            <li key={link.name}>
                <Link
                className='text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6'
                to={link.link}>
                    {link.name}
                </Link>
            </li>
        ))}
    </ul>

    <ul className='text-center sm:text-start'>
        <h1 className='mb-1 font-semibold'>
Shop
        </h1>
        {footercompanyLinks.map((link) => (
            <li key={link.name}>
                <Link
                className='text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6'
                to={link.link}>
                    {link.name}
                </Link>
            </li>
        ))}
    </ul>

    <ul className='text-center sm:text-start'>
        <h1 className='mb-1 font-semibold'>
Support
        </h1>
        {footerSupportLinks.map((link) => (
            <li key={link.name}>
                <Link
                className='text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6'
                to={link.link}>
                    {link.name}
                </Link>
            </li>
        ))}
    </ul>

    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center pt-2 to-gray-400 text-sm pb-8'>
        <span>2024 .All rights reserved</span>
        <span>Terms . Privacy Poilicy</span>
        <div className="sm:block flex items-center justify-center w-full">
            <img
            src='https://user-images.githubusercontent.com/52581/44514079-4219bb80-a713-11e8-83a4-88f26bd07e2a.png'
            alt=''
            />
        </div>

    </div>

      </div>
    </div>
  )
}

export default Footer
