import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSidebar'
import AllRefundOrder from "../../components/ShopAllRefundOrder"
const ShopAllRefunds = () => {
  return (
    <div>
        <DashboardHeader/>
        <div className="flex justify-between w-full">
            <div className="w-[88px] 800px:w-[330px]">
                <DashboardSideBar active={10}/>

            </div>
            <div className="w-full justify-center flex">
                <AllRefundOrder/>
            </div>
        </div>
    </div>
  )
}

export default ShopAllRefunds