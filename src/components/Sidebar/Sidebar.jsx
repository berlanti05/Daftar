import "./Sidebar.css";
import { MdNote, MdLightbulb, MdShoppingCart, MdCalendarToday } from "react-icons/md";

export default function Sidebar() {
  const menuItems = [
    { label: "دفاتري", icon: <MdNote /> },
    { label: "اقتراحاتي", icon: <MdLightbulb /> },
    { label: "التسوق", icon: <MdShoppingCart /> },
    { label: "المخطط", icon: <MdCalendarToday /> },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <img src="/images/logo2.jpeg" alt="دفتر" />
          <div>
            <h1>دفتر</h1>
            <p>دفتر زمان... بذكاء زماننا</p>
          </div>
        </div>
      </div>

      <nav className="sidebar-menu">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>
      
<div className="side-stitch">                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
      </div>

      <div className="sidebar-footer">
        <button>+ وصفة جديدة</button>
      </div>
    </aside>
  );
}