import { useEffect, useState } from "react";
import styles from "./Posts.module.css";
import axios from "axios";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/homePosts")
      .then((success) => {
        console.log(success);
        setPosts(success.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <main>
        <div className={styles.postsDiv}>
          <div className="container">
            <div className="row">
              {posts.map((post, index) => (
                <div className="col-6 mb-4" key={index}>
                  <div className={`${styles.blogPost}`}>
                    <div className={styles.imageWrapper}>
                      <img src={post.BlogImg} alt={post.Title} className={styles.image} />
                      <div className={styles.category}>{post.Category}</div>
                    </div>
                    <div className={styles.content}>
                      <h3 className={styles.title}>{post.Title}</h3>
                      <p className={styles.author}>
                        Author: <span>{post.Author}</span>
                      </p>
                      <p className={styles.date}>
                        Date: <span>{post.Date}</span>
                      </p>
                      <p className={styles.description}>{post.Description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
