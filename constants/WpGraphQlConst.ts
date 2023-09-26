export class WpGraphQlPostConst {
  private static _ItemsOnList = `
  categories {
          edges {
            node {
              name
              slug
            }
          }
        }
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
          }
        }
        id
        slug
        title
  `;

  private static _ItemOnOne = `
  categories {
          edges {
            node {
              name
              slug
            }
          }
        }
        date
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
        id
        slug
        title
  `;

  static list = `query PostListQuery($offsetPagination: OffsetPagination!) {
  posts(where: {offsetPagination: $offsetPagination})  {
    edges {
      node {
        ${this._ItemsOnList}
      }
    }
    pageInfo {
      offsetPagination {
        total
      }
    }
  }
}`;

  //カテゴリーIDからカテゴリー一覧を取得
  static listByCategory = `query PostListByCategoryQuery($offsetPagination: OffsetPagination!,$categoryId:Int) {
  posts(where: {offsetPagination: $offsetPagination,categoryId: $categoryId}) {
    edges {
      node {
        ${this._ItemsOnList}
      }
    }
    pageInfo {
      offsetPagination {
        total
      }
    }
  }
}`;
  // slugから記事単体を持ってくる
  static one = `query PostQuery($id: ID!) {
      post(id: $id, idType: SLUG) {
        ${this._ItemOnOne}
      }
    }`;
  // 全記事のslugを持ってくる
  static allSlugList = `query PostAllSlugListQuery {
  posts(first: 10000) {
    edges {
      node {
        slug
      }
    }
  }
}`;

  // 全カテゴリースラッグ取得
  static allCategorySlugList = `query PostCategorySlugListQuery {
  categories {
    edges {
      node {
        slug
        posts {
          pageInfo {
            offsetPagination {
              total
            }
          }
        }
      }
    }
  }
}`;

  // カテゴリースラッグからカテゴリーIDを取得
  static categoryIdBySlug = `query PostCategoryIdBySlugQuery($id: ID!) {
  category(id: $id, idType: SLUG) {
    categoryId
  }
}`;

  // 記事の数を取得
  static total = `query PostTotalQuery {
  posts {
    pageInfo {
      offsetPagination {
        total
      }
    }
  }
}`;
}
