import { WpGraphQlPostConst } from "../constants/WpGraphQlConst";
import Repository from "./Repository";

// 全記事取得
class PostRepository {
  static getList() {
    return Repository(WpGraphQlPostConst.list).getWp();
  }
}

export default PostRepository;
