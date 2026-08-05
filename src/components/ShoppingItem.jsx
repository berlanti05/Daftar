import styles from "./ShoppingItem.module.css";
import { useShopping } from "../contexts/ShoppingContext";

import { FaRegCircle } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

export default function ShoppingItem({ item }) {
  const { list, setList } = useShopping();
  function clickCheck() {
    setList(
      list.map((i) => (i.id === item.id ? { ...i, check: !i.check } : i)),
    );
  }

  function deleteItem() {
    setList(list.filter((i) => i.id != item.id));
  }
  return (
    <div className={styles.shoppingItem}>
      <div className={styles.sideStitch}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {item.check ? (
        <>
          <FaCheckCircle className={styles.circleIcon} onClick={clickCheck} />
          <p className={styles.done}>{item.name}</p>
        </>
      ) : (
        <>
          <FaRegCircle className={styles.circleIcon} onClick={clickCheck} />
          <p>{item.name}</p>
        </>
      )}

      <MdDeleteOutline className={styles.deleteIcon} onClick={deleteItem} />
    </div>
  );
}
