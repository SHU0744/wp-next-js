export class WpGraphQlPostConst {
  static list = `query PostListQuery {
  posts {
    edges {
      node {
        title
        content
        id
      }
    }
  }
}`;
}
