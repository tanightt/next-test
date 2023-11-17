import styles from "./categoryItem.module.css";
import Delete from "@/public/images/delete";
import Drag from "@/public/images/drag";
import { useState } from "react";

const Category = ({ id, name, initialVisibility }) => {
  const [visibility, setVisibility] = useState(initialVisibility);

  // const handleToggleVisibility = () => {
  //   const updatedVisibility = !visibility;
  //   setVisibility(updatedVisibility);
  // };

  const handleToggleVisibility = async () => {
    try {
      const updatedVisibility = !visibility;
      const response = await fetch(`/api/categories/${id}`, {
        method: "PUT",
        body: JSON.stringify({ visibility: updatedVisibility }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setVisibility(updatedVisibility);
      } else {
        console.error("Failed to update category visibility");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const response = await fetch("/api/categories");
        if (response.ok) {
          const data = await response.json();
          setCategories(data.categories);
        } else {
          console.error("Failed to fetch categories");
        }
      } else {
        console.error("Failed to delete category");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <li className={styles.categoryItem}>
        <p style={{ color: visibility === false ? "#696969" : "#fff" }}>
          {name}
        </p>
        <div className={styles.btnList}>
          <label className={styles.switch}>
            <input
              type="checkbox"
              className={styles.check}
              checked={visibility}
              onChange={handleToggleVisibility}
            />
            {visibility === true ? (
              <p className={styles.onBtn}>On</p>
            ) : (
              <p className={styles.offBtn}>Off</p>
            )}
          </label>
          {name !== "Other" ? (
            <>
              <button onClick={handleDelete}>
                <Delete />
              </button>
              <button>
                <Drag />
              </button>
            </>
          ) : (
            <span style={{ width: "53px" }}></span>
          )}
        </div>
      </li>
    </>
  );
};

export default Category;
