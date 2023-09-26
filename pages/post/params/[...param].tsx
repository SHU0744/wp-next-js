import type { NextPage } from "next";
import PostService from "../../../services/PostService";
import usePostListSwr from "../../../hooks/swr/usePostListSwr";
import PostBox from "../../../components/molecules/PostBox";
import Layout from "../../../components/templates/Layout";
import PostOnListType from "../../../types/PostOnListType";
import PostConst from "../../../constants/PostConst";
import Pagenation from "../../../components/molecules/Pagenation";

export const getStaticPaths = async () => {
  const paths = await PostService.getAllPageAndCategoryList();

  return {
    paths,
    fallback: "blocking",
  };
};

export async function getStaticProps({
  params,
}: {
  params: {
    param: [string, string] | [string, string, string, string];
  };
}) {
  //   console.log(params.param);
  const param = params.param;
  let currentPage = 1;
  let categoryId: number | undefined;
  if (param.length === 2 && param[0] === "page") {
    currentPage = parseInt(param[1]);
  } else if (
    param.length === 4 &&
    param[0] === "category" &&
    param[2] === "page"
  ) {
    categoryId = await PostService.getCategoryIdBySlug({ slug: param[1] });
    currentPage = parseInt(param[3]);
  }
  const [staticPostList, staticTotal] = await PostService.getList({
    page: currentPage,
    categoryId,
  });

  return {
    props: {
      staticPostList,
      staticTotal,
      currentPage,
      staticCategoryId: categoryId ?? null,
    },
    revalidate: 10,
  };
}

const Home: NextPage<{
  currentPage: number;
  staticPostList: PostOnListType[];
  staticTotal: number;
  staticCategoryId: number | null;
}> = ({ staticPostList, staticTotal, currentPage, staticCategoryId }) => {
  const categoryId = staticCategoryId ?? undefined;
  const [postList, total] = usePostListSwr({
    currentPage,
    staticPostList,
    staticTotal,
    categoryId,
  });

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
        total={total}
        currentPage={currentPage}
        sizePerPage={PostConst.sizePerPage}
        path=""
      />
    </Layout>
  );
};

export default Home;
