import React from 'react'
import styles from '../../styles/styles'
import CountDown from "./CountDown.jsx"
const EventCard = ({active}) => {
  return (
    <div className={`w-full block bg-white rounded-lg ${active ? "unset" :"mb-12"} lg:flex p-2`}>
        <div className='w-full lg:w-[50%] m-auto'>
            <img src='https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg' alt=''/>
            </div>
      <div className="w-full lg:[w-50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>IPhone 15pro max 8/256gb</h2>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus molestiae temporibus optio ad. Ipsam eveniet obcaecati quos facere voluptatibus nam, distinctio, incidunt quas, tenetur reprehenderit ducimus commodi corrupti nostrum cumque!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus molestiae temporibus optio ad. Ipsam eveniet obcaecati quos facere voluptatibus nam, distinctio, incidunt quas, tenetur reprehenderit ducimus commodi corrupti nostrum cumque!
        </p>
        <div className='flex py-2 justify-between'>
            <div className='flex'>
                <h5 className='font-[500] text-[18px] text-[#d55b45] pr-3 line-through'>
                    10995
                </h5>
                <h5 className='font-bold text-[20px] text-black font-Roboto'>
                    999$
                </h5>
            </div>
            <span className='pr-3 font-[400] text-[17px] text-[#44a55e]'>
                120 Sold
            </span>
        </div>
            <CountDown />
        </div>  
    </div>
  )
}

export default EventCard
