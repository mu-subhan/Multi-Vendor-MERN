import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSidebar'
import DashboardMessages from "../components/Shop/DashboardMessages.jsx"
const ShopInboxPage = () => {
  return (
    <div>
           <DashboardHeader/>
           <div className="flex items-center justify-between w-full">
               <div className="w-[88px] 800px:w-[330px]">
                   <DashboardSideBar active={8} />
               </div>
               <DashboardMessages/>
           </div>
       </div>
  )
}

export default ShopInboxPage
