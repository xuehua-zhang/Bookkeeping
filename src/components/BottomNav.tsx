type TabChange = "home"|"add"|"manage";
type BottomNavProps = {
 activeTab:TabChange;
 setActiveTab:(value:TabChange)=>void;
}

const activeClass = "flex-1 py-3 bg-theme-page text-foreground rounded-xs";
const bassClass = "flex-1 py-3 bg-theme-muted text-theme-muted-foreground rounded-xs";

export default function BottomNav({activeTab,setActiveTab}:BottomNavProps){
    return(
        <div className="fixed bottom-0 w-full flex justify-around gap-0.25 bg-theme-page">
         <button
          type="button"
          onClick={()=>setActiveTab("home")}
          className={activeTab === "home" ? activeClass : bassClass}
         >首页</button>

         <button
           type="button"
           onClick={()=>setActiveTab("add")}
           className={activeTab === "add" ? activeClass : bassClass}
         >新增</button>

         <button
           type="button"
           onClick={()=>setActiveTab("manage")}
           className={activeTab === "manage" ? activeClass : bassClass}   
         >管理</button>
        </div>
    )
}