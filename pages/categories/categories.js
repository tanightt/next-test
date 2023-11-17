import { useEffect, useState } from "react";
import styles from "./categories.module.css";
import Plus from "@/public/images/plus";
import Category from "../categoryItem/categoryItem";
import Check from "@/public/images/check";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newVisibility, setNewVisibility] = useState(false);

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await fetch("/api/categories");
  //       if (response.ok) {
  //         const data = await response.json();
  //         setCategories(data.categories);
  //       } else {
  //         console.error("Failed to fetch categories");
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  //   fetchCategories();
  // }, []);

  const handleSaveCategory = async () => {
    if (!newCategoryName) {
      alert("Failed to create category: Name is empty");
      return;
    }

    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        body: JSON.stringify({
          name: newCategoryName,
          visibility: newVisibility,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const newCategory = await response.json();
        setCategories([...categories, newCategory]);
        setNewCategoryName("");
        setIsCreatingCategory(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCancelCategory = () => {
    setNewCategoryName("");
    setIsCreatingCategory(false);
  };

  return (
    <main className={styles.main}>
      <button
        className={styles.addBtn}
        onClick={() => setIsCreatingCategory(true)}
      >
        <Plus />
        Create a Category
      </button>
      {isCreatingCategory && (
        <div className={styles.createInputContainer}>
          <Category name={newCategoryName} initialVisibility={newVisibility} />
          <input
            type="text"
            placeholder="Enter Category Name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className={styles.createInput}
          />
        </div>
      )}
      <ul className={styles.categoriesList}>
        {categories.map(({ _id, name, visibility }) => (
          <Category
            key={_id}
            id={_id}
            name={name}
            initialVisibility={visibility}
          />
        ))}
      </ul>

      {isCreatingCategory && (
        <div className={styles.changeBtnContainer}>
          <button onClick={handleSaveCategory} className={styles.saveBtn}>
            <Check /> Save Changes
          </button>
          <button onClick={handleCancelCategory} className={styles.cancelBtn}>
            Cancel
          </button>
        </div>
      )}
    </main>
  );
};

export default Categories;
