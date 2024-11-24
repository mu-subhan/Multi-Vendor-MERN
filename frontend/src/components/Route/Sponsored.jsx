import React from 'react'
import styles from '../../styles/styles'

const Sponsored = () => {
  return (
    <div className={`${styles.section} hidden sm:block bg-white py-18 px-5 mb-12 cursor-pointer rounded-xl`}>

        <div className='flex justify-between w-full'>
            <div className='flex items-center'>
                <img 
               src='https://logos-world.net/wp-content/uploads/2020/06/Sony-Logo.jpg'
                alt=''
                style={{width:"150px",objectFit:"contain"}}
                />
            </div>
            <div className='flex items-start'>
                <img 
                src='https://cdn.worldvectorlogo.com/logos/dell-1.svg'
                alt=''
                style={{width:"150px",objectFit:"contain"}}
                />
            </div>
            <div className='flex items-start'>
                <img 
                src='https://cdn.icon-icons.com/icons2/3912/PNG/512/lg_logo_icon_247849.png'
                alt=''
                style={{width:"150px",objectFit:"contain"}}
                />
            </div>
            <div className='flex items-center'>
                <img 
                src='https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/RWCZER-Legal-IP-Trademarks-CP-MS-logo-740x417-1?wid=406&hei=230&fit=crop'
                alt=''
                style={{width:"280px",objectFit:"contain"}}
                />
            </div>
            <div className='flex items-center'>
                <img 
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzMQlTFIqSvr519IoFmi1feJwNZ2C4muAp6Q&s'
                alt=''
                style={{width:"150px",objectFit:"contain"}}
                />
            </div>
        </div>
     
    </div>
  )
}

export default Sponsored
