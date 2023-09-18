import type { NextPage } from "next";
import PostService from "../services/PostService";
import usePostListSwr from "../hooks/swr/usePostListSwr";
import PostBox from "../components/molecules/PostBox";
import Layout from "../components/templates/Layout";
import PostOnListType from "../types/PostOnListType";

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

const Home: NextPage<{ staticPostList: PostOnListType[] }> = ({
  staticPostList,
}) => {
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
