import "./Sidebar.css";
import { useNavigate, useLocation } from "react-router-dom";
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
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      label: "دفتري",
      icon: <MdNote />,
      path: "/notes",
    },
    {
      label: "اقترحيلي",
      icon: <MdLightbulb />,
      path: "/suggestions",
    },
    {
      label: "التسوق",
      icon: <MdShoppingCart />,
      path: "/shopping",
    },
    {
      label: "المخطط",
      icon: <MdCalendarToday />,
      path: "/planner",
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-image-wrapper">
            <img src="/images/logo2.jpeg" alt="سيدة ملعقة🥄" />
          </div>
          <div className="logo-text">
            <h1>سيدة ملعقة</h1>
            <p>وصفات بحب</p>
          </div>
        </div>
      </div>

      <nav className="sidebar-menu">
        <ul>
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`menu-item ${isActive(item.path) ? "active" : ""}`}
              onClick={() => navigate(item.path)}
            >
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
              {isActive(item.path) && (
                <span className="active-indicator"></span>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="side-stitch">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="sidebar-footer">
        <button
          className="new-recipe-btn"
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
