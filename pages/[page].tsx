import type { NextPage } from "next";
import PostService from "../services/PostService";
import usePostListSwr from "../hooks/swr/usePostListSwr";
import PostBox from "../components/molecules/PostBox";
import Layout from "../components/templates/Layout";
import PostOnListType from "../types/PostOnListType";
import PostConst from "../constants/PostConst";

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
  const page = parseInt(params.page);
  const [staticPostList, staticTotal] = await PostService.getList({ page });

  return {
    props: {
      staticPostList,
      staticTotal,
      page,
    },
    revalidate: 10,
  };
}

const Home: NextPage<{
  staticPostList: PostOnListType[];
  staticTotal: number;
  page: number;
}> = ({ staticPostList, staticTotal, page }) => {
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
      <p>{staticTotal}</p>
      <p>{page}</p>
    </Layout>
  );
};

export default Home;
