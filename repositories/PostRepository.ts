import { WpGraphQlPostConst } from "../constants/WpGraphQlConst";
import OffsetPaginationType from "../types/OffsetPaginationType";
import Repository from "./Repository";

// 全記事取得
class PostRepository {
  static getList({
    offsetPagination,
    categoryId,
  }: {
    offsetPagination: OffsetPaginationType;
    categoryId?: number;
  }) {
    if (categoryId) {
      return Repository(WpGraphQlPostConst.listByCategory, {
        variables: { offsetPagination, categoryId },
      }).getWp();
    }
    return Repository(WpGraphQlPostConst.list, {
      variables: { offsetPagination },
    }).getWp();
  }

  // slugから記事単体を取得
  static getOne({ id }: { id: string }) {
    // console.log(id);
    return Repository(WpGraphQlPostConst.one, { variables: { id } }).getWp();
  }
  // 全記事のslugを取得
  static getAllSlugList() {
    return Repository(WpGraphQlPostConst.allSlugList).getWp();
  }

  // 全かてごりーslugを取得
  static getAllCategorySlugList() {
    return Repository(WpGraphQlPostConst.allCategorySlugList).getWp();
  }

  // カテゴリースラッグからカテゴリーIDを取得
  static getCategoryIdBySlug({ slug }: { slug: string }) {
    return Repository(WpGraphQlPostConst.categoryIdBySlug, {
      variables: { id: slug },
    }).getWp();
  }
}

export default PostRepository;
