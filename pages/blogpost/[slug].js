import { useRouter } from "next/router";
import styles from "../../styles/BlogPost.module.css";
import { useEffect, useState } from "react";
import * as fs from "fs";

// step 1: Find the file corresponding to the slug
// step 2: Populate them inside the page

const Slug = ({ blogResp }) => {
  const [blogData, setBlogData] = useState(blogResp);

  // Client Side Rendering not effecient for SEO

  // const router = useRouter();
  // const { slug } = router.query;
  // useEffect(() => {
  //   if (slug !== undefined) {
  //     fetch(`http://localhost:3000/api/getblogs?slug=${slug}`)
  //       .then((data) => data.json())
  //       .then((parsedData) => setBlogData(parsedData));
  //   }
  // }, [slug]);
  const createMarkup = (content) => {
    return { __html: content };
  };
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>{blogData?.title}</h1>
        <hr />
        {blogData && (
          <div dangerouslySetInnerHTML={createMarkup(blogData?.content)}></div>
        )}
      </main>
    </div>
  );
};

export async function getStaticPaths() {
  // In this we have to specify for how many / which page we need to create static page
  // Instead of this read folder and add paths
  return {
    paths: [
      { params: { slug: "how-to-learn-react" } },
      { params: { slug: "how-to-learn-nextjs" } },
      { params: { slug: "how-to-learn-javascript" } },
      { params: { slug: "how-to-learn-c" } },
      { params: { slug: "how-to-learn-css" } },
      { params: { slug: "how-to-learn-html" } },
      { params: { slug: "how-to-learn-jest" } },
      { params: { slug: "how-to-learn-jquery" } },
      { params: { slug: "how-to-learn-node" } },
    ],
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const slug = context?.params?.slug;
  // Imp:- API is not available at build time so add logic which is written in api
  const blogResp = await fs.promises.readFile(`blogdata/${slug}.json`, "utf-8");
  return { props: { blogResp: JSON.parse(blogResp) } };
}

// export async function getServerSideProps(context) {
//   const slug = context?.query?.slug;
//   const res = await fetch(`http://localhost:3000/api/getblogs?slug=${slug}`);
//   const blogResp = await res?.json();
//   return { props: { blogResp } };
// }

export default Slug;
