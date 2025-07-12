import React, { useEffect, useState } from 'react'

const CountDown = ({data}) => {

    const [timeLeft,setTImeLeft] = useState(calculateTimeLeft());

    useEffect(() =>{
        const timer = setTimeout(() => {
            setTImeLeft(calculateTimeLeft());

        },1000);
        return () => clearTimeout(timer);
    });

      function calculateTimeLeft () {
        const difference = +new Date(data ? data.end_Date : "") - +new Date();
        let timeLeft = {};

        if(difference >0){
            timeLeft={
    days:Math.floor(difference / (1000*60*60*24)),
    hours:Math.floor((difference / (1000 *60*60))%24),
    minutes:Math.floor((difference / 1000/60)%60),
    seconds:Math.floor((difference / 1000) %60),
            }
        }
        return timeLeft;
      }

const timeComponents = Object.keys(timeLeft).map((interval) =>{
    if(!timeLeft[interval]){
        return null;
    }

   return (
    <span className='text-[25px] text-[#475ad2]'>
    {timeLeft[interval]} {interval} {" "}
</span>
   );

})  


  return (
   <div>
    {timeComponents.length ? timeComponents : <span className='text-red-700 text-[25px]'>Time's Up!</span>}
   </div>
  )
}

export default CountDown
