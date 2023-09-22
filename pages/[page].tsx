import type { NextPage } from "next";
import PostService from "../services/PostService";
import usePostListSwr from "../hooks/swr/usePostListSwr";
import PostBox from "../components/molecules/PostBox";
import Layout from "../components/templates/Layout";
import PostOnListType from "../types/PostOnListType";
import PostConst from "../constants/PostConst";

export const getStaticPaths = async () => {
  const total = await PostService.getTotal();
  const pageTotal = Math.ceil(total / PostConst.sizePerPage);
  const pageList = [...Array(pageTotal)].map((_, i) => i + 1);

  const paths = pageList.map((page: number) => {
    return { params: { page: page.toString() } };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export async function getStaticProps({
  params,
}: {
  params: {
    page: string;
  };
}) {
  const page = parseInt(params.page);
  const staticPostList = await PostService.getList({ page });
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
  //   const postList = usePostListSwr({ staticPostList });
  const postList = staticPostList;

  return (
    <Layout>
      <div className="flex w-main  mx-auto gap-4 flex-wrap">
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
