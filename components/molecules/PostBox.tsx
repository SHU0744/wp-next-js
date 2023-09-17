import PostType from "../../types/PostType";
import CommonImage from "../atoms/image/CommonImage";
import CategoryLabel from "../atoms/label/CategoryLabel";
import ArticleHeading from "../atoms/text/ArticleHeading";
import DateText from "../atoms/text/DateText";

const PostBox = ({ post }: { post: PostType }) => {
  return (
    <article className="shadow-sm shadow-gray-100">
      <div>
        <CommonImage
          src={post.featuredImage.url}
          alt=""
          className="w-full h-56"
        />
      </div>
      <div className="py-4 px-5">
        <div className="flex gap-2 mb-2">
          <CategoryLabel>{post.category.name}</CategoryLabel>
          <DateText>{post.date}</DateText>
        </div>
        <ArticleHeading>{post.title}</ArticleHeading>
        <div
          className="mt-1"
          dangerouslySetInnerHTML={{ __html: post.excerpt }}
        ></div>
      </div>
    </article>
  );
};

export default PostBox;
