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
  return (
    <>
      {postList!.map((post) => {
        return <p key={post.id}>{post.title}</p>;
      })}
    </>
  );
};

export default Home;
