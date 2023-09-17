import type { NextPage } from "next";
import PostService from "../services/PostService";
import PostType from "../types/PostType";
import usePostListSwr from "../hooks/ser/usePostListSwr";
import PostBox from "../components/molecules/PostBox";
import Layout from "../components/templates/Layout";

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
    <Layout>
      <div className="flex w-main  mx-auto gap-4">
        {postList!.map((post) => {
          return (
            <div key={post.id} className="w-1/3">
              <PostBox post={post} />
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Home;
