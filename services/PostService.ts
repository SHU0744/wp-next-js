import PostConst from "../constants/PostConst";
import RepositoryFactory from "../repositories/RepositoryFactory";
import OffsetPaginationType from "../types/OffsetPaginationType";
import PostOnListType from "../types/PostOnListType";
import PostType from "../types/PostType";

class PostService {
  static async getList({
    page,
    categoryId,
  }: {
    page: number;
    categoryId?: number;
  }): Promise<[PostOnListType[], number]> {
    try {
      const offsetPagination = this._makeOffestPaginationFromPage(page);
      const res = await RepositoryFactory.post.getList({
        offsetPagination,
        categoryId,
      });
      const postList = res.data.data.posts.edges.map((data: any) => {
        const post: PostOnListType = {
          id: data.node.id,
          title: data.node.title,
          slug: data.node.slug,
          date: data.node.date,
          excerpt: data.node.excerpt,
          featuredImage: {
            url: data.node.featuredImage.node.sourceUrl,
          },
          category: {
            name: data.node.categories.edges[0].node.name,
            slug: data.node.categories.edges[0].node.slug,
          },
        };
        return post;
      });
      const total = res.data.data.posts.pageInfo.offsetPagination.total;
      return [postList, total];
    } catch (error) {
      return [[], 0];
    }
  }

  // slugから記事単体を取得
  static async getOne({ id }: { id: string }): Promise<PostType | null> {
    // console.log(id);
    try {
      const res = await RepositoryFactory.post.getOne({ id });
      // console.log(res.data.data);
      const data = res.data.data.post;
      const post: PostType = {
        id: data.id,
        title: data.title,
        slug: data.slug,
        date: data.date,
        content: data.content,
        featuredImage: {
          url: data.featuredImage.node.sourceUrl,
        },
        category: {
          name: data.categories.edges[0].node.name,
          slug: data.categories.edges[0].node.slug,
        },
      };

      return post;
    } catch (error) {
      return null;
    }
  }
  // 全記事のslugを取得
  static async getAllSlugList(): Promise<
    {
      params: {
        slug: string;
      };
    }[]
  > {
    try {
      const res = await RepositoryFactory.post.getAllSlugList();
      return res.data.data.posts.edges.map((data: any) => {
        return { params: { slug: data.node.slug } };
      });
    } catch (error) {
      return [];
    }
  }

  static async getAllPageAndCategoryList() {
    const total = await this.getTotal();
    const pageList = this._makePageList(total);
    let allPageAndCategoryList = pageList.map((page: number) => {
      return { params: { param: ["page", page.toString()] } };
    });

    const res = await RepositoryFactory.post.getAllCategorySlugList();
    res.data.data.categories.edges.forEach((data: any) => {
      const categorySlug = data.node.slug;
      const total = data.node.posts.pageInfo.offsetPagination.total;
      const pageList = this._makePageList(total);
      pageList.forEach((page: number) => {
        allPageAndCategoryList.push({
          params: {
            param: ["category", categorySlug, "page", page.toString()],
          },
        });
      });
    });

    return allPageAndCategoryList;
  }

  // 全カテゴリースラッグ取得
  static async getAllCategorySlugList(): Promise<
    {
      params: {
        slug: string;
      };
    }[]
  > {
    try {
      const res = await RepositoryFactory.post.getAllCategorySlugList();
      return res.data.data.categories.edges.map((data: any) => {
        return { params: { slug: data.node.slug } };
      });
    } catch (error) {
      return [];
    }
  }

  static async getAllPageList(): Promise<
    {
      params: {
        page: string;
      };
    }[]
  > {
    const total = await this.getTotal();
    const pageTotal = Math.ceil(total / PostConst.sizePerPage);
    const pageList = [...Array(pageTotal)].map((_, i) => i + 1);
    return pageList.map((page: number) => {
      return { params: { page: page.toString() } };
    });
  }

  // カテゴリースラッグからカテゴリーIDを取得
  static async getCategoryIdBySlug({
    slug,
  }: {
    slug: string;
  }): Promise<number> {
    const res = await RepositoryFactory.post.getCategoryIdBySlug({ slug });
    return res.data.data.category.categoryId;
  }

  // 記事の数を取得
  static async getTotal(): Promise<number> {
    const res = await RepositoryFactory.post.getTotal();
    return res.data.data.posts.pageInfo.offsetPagination.total;
  }

  private static _makeOffestPaginationFromPage(
    page: number
  ): OffsetPaginationType {
    return {
      offset: (page - 1) * PostConst.sizePerPage,
      size: PostConst.sizePerPage,
    };
  }

  private static _makePageList(total: number) {
    const pageTotal = Math.ceil(total / PostConst.sizePerPage);
    return [...Array(pageTotal)].map((_, i) => i + 1);
  }
}

export default PostService;
