import "./Sidebar.css";
import {
  MdNote,
  MdLightbulb,
  MdShoppingCart,
  MdCalendarToday,
} from "react-icons/md";
import AddRecipeModal from "../AddRecipeModal/AddRecipeModal";
import { useRecipe } from "../../contexts/RecipeContext";

export default function Sidebar() {
  const { isOpen, setIsOpen } = useRecipe();

  const menuItems = [
    { label: "دفتري", icon: <MdNote /> },
    { label: "اقترحيلي", icon: <MdLightbulb /> },
    { label: "التسوق", icon: <MdShoppingCart /> },
    { label: "المخطط", icon: <MdCalendarToday /> },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <img src="/images/logo5.png" alt="دفتر" />
          <h1>سيدة ملعقة</h1>
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

      <div className="side-stitch">
        {" "}
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="sidebar-footer">
        <button
          onClick={() => {
            setIsOpen(true);
          }}
        >
          + وصفة جديدة
        </button>
        {isOpen ? <AddRecipeModal /> : <></>}
      </div>
    </aside>
  );
}
