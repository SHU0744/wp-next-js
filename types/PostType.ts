import CategoryType from "./CategoryType";
import FeaturedImageType from "./FeaturedImageType";

interface PostType {
  id: string;
  title: string;
  slug: string;
  date: string;
  content: string;
  featuredImage: FeaturedImageType;
  category: CategoryType;
}

export default PostType;
