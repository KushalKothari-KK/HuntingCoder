import { useEffect, useState } from "react";
import styles from "../styles/Blog.module.css";
import Link from "next/link";
import * as fs from "fs";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";

// step 1: Collect all the files from blogdata directory
// step 2: Iterate through them and display them

const Blog = ({ allBlogs, allCount }) => {
  const router = useRouter();
  const [blogs, setBlogs] = useState(allBlogs);
  const [count, setCount] = useState(2);
  // Client Side Rendering not effecient for SEO
  // useEffect(() => {
  //   fetch("http://localhost:3000/api/blogs")
  //     .then((data) => data.json())
  //     .then((parsedData) => setBlogs(parsedData));
  // }, []);
  const changeRoute = (href) => {
    router.push(href);
  };

  const fetchMoreData = async () => {
    const data = await fetch(
      `http://localhost:3000/api/blogs/?count=${count + 2}`
    );
    setCount(count + 2);
    const res = await data.json();
    setBlogs(res);
  };
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <InfiniteScroll
          dataLength={blogs.length}
          next={fetchMoreData}
          hasMore={allCount !== blogs.length}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {blogs?.map((blogsItems) => (
            <div key={blogsItems?.title} className={styles.blogItem}>
              <Link href={`/blogpost/${blogsItems?.slug}`}>
                <a>
                  <h3>{blogsItems?.title}</h3>
                </a>
              </Link>
              <p className={styles.blogItemP}>{blogsItems?.metadesc}...</p>
              <button
                className={styles.btn}
                onClick={() => changeRoute(`/blogpost/${blogsItems?.slug}`)}
              >
                Read More
              </button>
            </div>
          ))}
        </InfiniteScroll>
        {/* <div className="blogs">
          {blogs?.map((blogsItems) => (
            <div key={blogsItems?.title} className={styles.blogItem}>
              <Link href={`/blogpost/${blogsItems?.slug}`}>
                <a>
                  <h3>{blogsItems?.title}</h3>
                </a>
              </Link>
              <p className={styles.blogItemP}>{blogsItems?.metadesc}...</p>
              <button
                className={styles.btn}
                onClick={() => changeRoute(`/blogpost/${blogsItems?.slug}`)}
              >
                Read More
              </button>
            </div>
          ))}
        </div> */}
      </main>
    </div>
  );
};

export async function getStaticProps() {
  // add logic which is written in api
  let data = await fs.promises.readdir("blogdata");
  let allCount = data.length;
  let myfile;
  let allBlogs = [];
  for (let index = 0; index < 2; index++) {
    const item = data[index];
    myfile = await fs.promises.readFile(`blogdata/${item}`, "utf-8");
    allBlogs.push(JSON.parse(myfile));
  }
  return { props: { allBlogs, allCount } };
}

// export async function getServerSideProps() {
// Fetch data from external API
//   const res = await fetch("http://localhost:3000/api/blogs");
//   const allBlogs = await res.json();
// Pass data to the page via props
//   return { props: { allBlogs } };
// }

export default Blog;
