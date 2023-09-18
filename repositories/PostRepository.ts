import { WpGraphQlPostConst } from "../constants/WpGraphQlConst";
import Repository from "./Repository";

// 全記事取得
class PostRepository {
  static getList() {
    return Repository(WpGraphQlPostConst.list).getWp();
  }

  static getOne({ id }: { id: string }) {
    // console.log(id);
    return Repository(WpGraphQlPostConst.one, { variables: { id } }).getWp();
  }
  static getAllSlugList() {
    return Repository(WpGraphQlPostConst.allSlugList).getWp();
  }
}

export default PostRepository;
