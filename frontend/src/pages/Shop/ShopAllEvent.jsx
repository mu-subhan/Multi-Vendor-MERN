import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSidebar'
import AllEvent from '../../components/Shop/AllEvent.jsx'

const ShopAllEvent = () => {
  return (
 <div>
        <DashboardHeader/>
                <div className="flex justify-between w-full">
                    <div className="w-[88px] 800px:w-[330px]">
                        <DashboardSideBar active={5} />
                    </div>
                    <div className="w-full justify-center flex">
                      <AllEvent/>
                    </div>
                </div>
    </div>  )
}

export default ShopAllEvent