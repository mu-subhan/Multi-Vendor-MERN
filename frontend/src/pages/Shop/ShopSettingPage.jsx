
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader"
import ShopSetting from "../../components/Shop/ShopSetting"
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar"
const ShopSettingPage = () => {
  return (
    <div>
      <DashboardHeader/>
      <div className="flex items-start justigy-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
         <DashboardSidebar active={11}/>
        </div>
        <ShopSetting/>
      </div>
    </div>
  )
}

export default ShopSettingPage