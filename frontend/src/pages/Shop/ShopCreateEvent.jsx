import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSidebar'
import CreateEvent from '../../components/Shop/CreateEvent.jsx'
const ShopCreateEvent = () => {
  return (
    <div>
        <DashboardHeader/>
                <div className="flex justify-between w-full">
                    <div className="w-[88px] 800px:w-[330px]">
                        <DashboardSideBar active={6} />
                    </div>
                    <div className="w-full justify-center flex">
                      <CreateEvent/>
                    </div>
                </div>
    </div>
  )
}

export default ShopCreateEvent