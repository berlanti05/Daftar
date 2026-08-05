import styles from "./ShoppingList.module.css";
import ShoppingItem from "./ShoppingItem";
import { useShopping } from "../contexts/ShoppingContext";

import { useState } from "react";
import { CiShoppingCart } from "react-icons/ci";

export default function ShoppingList() {
  const [input, setInput] = useState("");
  const { list, setList } = useShopping();

  function deleteAll() {
    setList([]);
  }

  function deleteCheck() {
    setList(
      list.filter((item) => {
        return !item.check;
      }),
    );
  }

  function handleAdd() {
    if (!input) return;
    setList([...list, { name: input, check: false, id: Date.now() }]);
    setInput("");
  }

  return (
    <>
      <div className={styles.header}>
        <h1>قائمة التسوق</h1>
        <p> ضيفي المكونات يلي لازم تشتريها </p>
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="مثال: بندورة"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <button onClick={handleAdd}>+</button>
      </div>
      {list.length ? (
        <>
          {list.map((item, index) => (
            <div className={styles.shoppingList}>
              <ShoppingItem key={index} item={item} />
            </div>
          ))}
          <div className={styles.delete}>
            <p onClick={deleteAll}>امسحي كلشي</p>
            {list.filter((item) => {
              return item.check;
            }).length > 0 ? (
              <p onClick={deleteCheck}>امسحي المشطوب</p>
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <div className={styles.EmptyshoppingList}>
          <CiShoppingCart className={styles.shoppingCartIcon} />
          <p>قائمتك فاضية، ضيفي أول غرض!</p>
        </div>
      )}
    </>
  );
}
