import React from "react";
import { Formik, Field, Form } from "formik";
import Image from "next/image";
import logo from "../../public/images/logo.png";
import styles from "./header.module.css";
import Search from "@/public/images/search";

const Header = () => {
  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/categories");
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories);
      } else {
        console.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <header className={styles.header}>
      <a href="./index.html">
        <Image src={logo} alt="logo" className={styles.logoImg} />
        <span className={styles.partLogo}>Memes</span>
      </a>
      <Formik initialValues={{ name: "" }} onSubmit={handleSubmit}>
        <Form className={styles.searchForm}>
          <Field
            type="text"
            name="search"
            placeholder="Search"
            className={styles.searchInput}
          />
          <span className={styles.searchSvg}>
            <Search />
          </span>
        </Form>
      </Formik>
    </header>
  );
};

export default Header;
