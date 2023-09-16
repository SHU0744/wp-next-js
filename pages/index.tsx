import type { NextPage } from "next";
import PostService from "../services/PostService";
import PostType from "../types/PostType";

export async function getStaticProps() {
  const staticPostList = await PostService.getList();
  return {
    props: {
      staticPostList,
    },
  };
}

const Home: NextPage<{ staticPostList: PostType[] }> = ({ staticPostList }) => {
  return (
    <>
      {staticPostList.map((post) => {
        return <p key={post.id}>{post.title}</p>;
      })}
    </>
  );
};

export default Home;
