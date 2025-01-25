import React from "react";
import { Link } from "react-router-dom";
import styles from "./Categories.module.css";

const categories = [
  { id: 1, name: "Nature", image: "/Images/illustration/nature.jpeg", path: "/blogs/nature" },
  { id: 2, name: "Travel", image: "/Images/illustration/travelling.jpg", path: "/blogs/travel" },
  { id: 3, name: "Food", image: "/Images/illustration/food.avif", path: "/blogs/food" },
  { id: 4, name: "Technology", image: "/Images/illustration/technology.jpeg", path: "/blogs/technology" },
  { id: 5, name: "Books", image: "/Images/illustration/books.jpg", path: "/blogs/books" },
  { id: 6, name: "Gaming", image: "/Images/illustration/gaming.jpg", path: "/blogs/gaming" },
  { id: 7, name: "Photography", image: "/Images/illustration/photography.jpg", path: "/blogs/photography" },
];

const Category = () => {
  return (
    <div className={styles.categoryContainer}>
      <h2 className={styles.header}>Categories</h2>
      <div className={styles.categoryGrid}>
        {categories.map((category) => (
          <Link key={category.id} to={category.path} className={styles.categoryCard}>
            <img
              src={category.image}
              alt={category.name}
              className={styles.categoryImage}
            />
            <p className={styles.categoryName}>{category.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
