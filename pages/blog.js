import { useEffect, useState } from "react";
import styles from "../styles/Blog.module.css";
import Link from "next/link";
import * as fs from "fs";

// step 1: Collect all the files from blogdata directory
// step 2: Iterate through them and display them

const Blog = ({ allBlogs }) => {
  const [blogs, setBlogs] = useState(allBlogs);
  // Client Side Rendering not effecient for SEO
  // useEffect(() => {
  //   fetch("http://localhost:3000/api/blogs")
  //     .then((data) => data.json())
  //     .then((parsedData) => setBlogs(parsedData));
  // }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className="blogs">
          {blogs?.map((blogsItems) => (
            <div key={blogsItems.title} className={styles.blogItem}>
              <Link href={`/blogpost/${blogsItems.slug}`}>
                <a>
                  <h3>{blogsItems.title}</h3>
                </a>
              </Link>
              <p className={styles.blogItemP}>
                {blogsItems.content.substr(0, 140)}...
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export async function getStaticProps() {
  // add logic which is written in api
  let data = await fs.promises.readdir("blogdata");
  let myfile;
  let allBlogs = [];
  for (let index = 0; index < data.length; index++) {
    const item = data[index];
    myfile = await fs.promises.readFile(`blogdata/${item}`, "utf-8");
    allBlogs.push(JSON.parse(myfile));
  }
  return { props: { allBlogs } };
}

// export async function getServerSideProps() {
// Fetch data from external API
//   const res = await fetch("http://localhost:3000/api/blogs");
//   const allBlogs = await res.json();
// Pass data to the page via props
//   return { props: { allBlogs } };
// }

export default Blog;
