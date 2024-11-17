import React from 'react'
import styles from '../../../styles/styles'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.normalFlex}`}
    style={{
        
        backgroundImage: "url(https://plus.unsplash.com/premium_photo-1711051505860-346a8b58d882?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGRhaXJ5JTIwYW5kJTIwcGVufGVufDB8fDB8fHww)",
    }}>
        <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
            <h1 className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}>
                Best Collection for <br /> Home Decoration
            </h1>
            <p className='pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum debitis dolor, modi corrupti fuga aliquam vero, saepe iure illo, architecto a inventore sint soluta quia necessitatibus ipsa amet! Sed, dolores.
            </p>
            <Link to="/products" className="inline-block">
            <div className={`${styles.button} mt-5`}>
                <span className='text-[#fff] font-[Poppins] text-[18px]'>
                    Shop Now
                </span>
            </div>
                </Link>
        </div>
      
    </div>
  )
}

export default Hero
