import Link from "next/link";
import PostType from "../../types/PostType";
import CommonImage from "../atoms/image/CommonImage";
import CategoryLabel from "../atoms/label/CategoryLabel";
import ArticleHeading from "../atoms/text/ArticleHeading";
import DateText from "../atoms/text/DateText";
import PostOnListType from "../../types/PostOnListType";

const PostBox = ({ post }: { post: PostOnListType }) => {
  return (
    <article className="shadow-sm shadow-gray-100">
      <div>
        <Link href={`/post/${post.slug}`}>
          <a>
            <CommonImage
              src={post.featuredImage.url}
              alt=""
              className="w-full h-56"
            />
          </a>
        </Link>
      </div>
      <div className="py-4 px-5">
        <div className="flex gap-2 mb-2">
          <Link href={`/category/${post.category.slug}`}>
            <a>
              <CategoryLabel>{post.category.name}</CategoryLabel>
            </a>
          </Link>
          <DateText>{post.date}</DateText>
        </div>
        <Link href={`/post/${post.slug}`}>
          <a>
            <ArticleHeading>{post.title}</ArticleHeading>
          </a>
        </Link>
        <div
          className="mt-1"
          dangerouslySetInnerHTML={{ __html: post.excerpt }}
        ></div>
      </div>
    </article>
  );
};

export default PostBox;
