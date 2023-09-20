import { NextPage } from "next";
import PostBox from "../../components/molecules/PostBox";
import Layout from "../../components/templates/Layout";
import usePostListSwr from "../../hooks/swr/usePostListSwr";
import PostService from "../../services/PostService";
import PostOnListType from "../../types/PostOnListType";

export const getStaticPaths = async () => {
  const paths = await PostService.getAllCategorySlugList();
  return {
    paths,
    // fallback: false,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const slug = params.slug;
  const categoryId = await PostService.getCategoryIdBySlug({ slug });
  const staticPostList = await PostService.getList({ categoryId });
  return {
    props: {
      categoryId,
      staticPostList,
    },
    revalidate: 10,
  };
};

const PostListByCategory: NextPage<{
  categoryId: number;
  staticPostList: PostOnListType[];
}> = ({
  categoryId,
  staticPostList,
}: {
  categoryId: number;
  staticPostList: any;
}) => {
  const postList = usePostListSwr({ categoryId, staticPostList });

  return (
    <Layout>
      <div className="flex w-main  mx-auto gap-4 flex-wrap">
        {postList!.map((post: any) => {
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
export default PostListByCategory;
