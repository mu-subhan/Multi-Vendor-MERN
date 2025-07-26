import DashboardHeader from "../../components/Shop/Layout/DashboardHeader.jsx"
import DashboardSideBar from "../../components/Shop/Layout/DashboardSidebar.jsx"
import WithDrawMoney from "../../components/Shop/WithDrawMoney.jsx"

const ShopWithDrawPage = () => {
  return (
    <div>
         <DashboardHeader/>
         <div className="flex items-start justigy-between w-full">
           <div className="w-[80px] 800px:w-[330px]">
            <DashboardSideBar active={7}/>
           </div>
           <WithDrawMoney/>
         </div>
       </div>
  )
}

export default ShopWithDrawPage