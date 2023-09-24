import type { NextPage } from "next";
import PostService from "../services/PostService";
import usePostListSwr from "../hooks/swr/usePostListSwr";
import PostBox from "../components/molecules/PostBox";
import Layout from "../components/templates/Layout";
import PostOnListType from "../types/PostOnListType";
import PostConst from "../constants/PostConst";
import Pagenation from "../components/molecules/Pagenation";

export const getStaticPaths = async () => {
  const paths = await PostService.getAllPageList();

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
  const currentPage = parseInt(params.page);
  const [staticPostList, staticTotal] = await PostService.getList({
    page: currentPage,
  });

  return {
    props: {
      staticPostList,
      staticTotal,
      currentPage,
    },
    revalidate: 10,
  };
}

const Home: NextPage<{
  staticPostList: PostOnListType[];
  staticTotal: number;
  currentPage: number;
}> = ({ staticPostList, staticTotal, currentPage }) => {
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
      <Pagenation
        total={staticTotal}
        currentPage={currentPage}
        sizePerPage={PostConst.sizePerPage}
        path=""
      />
    </Layout>
  );
};

export default Home;
