import Sidebar from "../../components/Sidebar/Sidebar";
import ShoppingList from "../../components/ShoppingList/ShoppingList";
import "./ShoppingPage.css";

export default function ShoppingPage() {
  return (
    <div className="app">
      <Sidebar />

      <div className="content">
        <ShoppingList />
      </div>
    </div>
  );
}
