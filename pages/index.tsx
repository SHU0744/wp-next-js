import type { NextPage } from "next";
import PostService from "../services/PostService";
import PostType from "../types/PostType";

import usePostListSwr from "../hooks/ser/usePostListSwr";

export async function getStaticProps() {
  const staticPostList = await PostService.getList();
  // console.log("SSGです。");
  return {
    props: {
      staticPostList,
    },
    revalidate: 10,
  };
}

const Home: NextPage<{ staticPostList: PostType[] }> = ({ staticPostList }) => {
  const postList = usePostListSwr(staticPostList);
  // console.log(postList);
  return (
    <div className="flex">
      {postList!.map((post) => {
        return (
          <div key={post.id} className="w-1/3 p-4">
            <article className="shadow-sm shadow-gray-100">
              <div>
                <img
                  className="w-full h-56 object-cover"
                  src={post.featuredImage.url}
                />
              </div>
              <div className="py-4 px-5">
                <span>{post.category.name}</span>
                <h2 className="font-body">{post.title}</h2>
                <p>{post.excerpt}</p>
                <span> {post.date}</span>
              </div>
            </article>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
