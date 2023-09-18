import { NextPage } from "next";
import PostService from "../../services/PostService";
import usePostSwr from "../../hooks/swr/usePostSwr";
import PostType from "../../types/PostType";
import Layout from "../../components/templates/Layout";
import CommonImage from "../../components/atoms/image/CommonImage";
import CategoryLabel from "../../components/atoms/label/CategoryLabel";
import DateText from "../../components/atoms/text/DateText";

import PostHeading from "../../components/atoms/text/PostHeading";
import Link from "next/link";

export const getStaticPaths = async () => {
  const paths = await PostService.getAllSlugList();
  // console.log(paths);
  return {
    paths,
    fallback: false,
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
  const staticPost = await PostService.getOne({ id: slug });

  if (!staticPost) {
    return { notFound: true };
  }

  return {
    props: { slug, staticPost },
    revalidate: 10,
  };
};

const Post: NextPage<{ slug: string; staticPost: PostType }> = ({
  staticPost,
  slug,
}) => {
  const post = usePostSwr({ id: slug, staticPost });
  return (
    <>
      <Layout>
        <div className="w-main mx-auto">
          <article>
            <CommonImage
              src={post!.featuredImage.url}
              alt=""
              className="w-full h-96"
            />
            <div className="flex gap-2 mb-2">
              <Link href={post!.category.slug}>
                <a>
                  <CategoryLabel>{post!.category.name}</CategoryLabel>
                </a>
              </Link>
              <DateText>{post!.date}</DateText>
            </div>
            <div>
              <PostHeading>{post!.title}</PostHeading>
            </div>
            <div
              className="mt-1"
              dangerouslySetInnerHTML={{ __html: post!.content }}
            ></div>
          </article>
        </div>
      </Layout>
    </>
  );
};

export default Post;
