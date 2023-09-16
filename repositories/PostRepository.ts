import Repository from "./Repository";

// 全記事取得
class PostRepository {
  static getList() {
    return Repository(`query PostListQuery {
  posts {
    edges {
      node {
        title
        content
        id
      }
    }
  }
}`).getWp();
  }
}

export default PostRepository;
