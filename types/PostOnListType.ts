import CategoryType from "./CategoryType";
import FeaturedImageType from "./FeaturedImageType";

interface PostOnListType {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  featuredImage: FeaturedImageType;
  category: CategoryType;
}

export default PostOnListType;
