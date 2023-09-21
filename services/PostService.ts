import RepositoryFactory from "../repositories/RepositoryFactory";
import PostOnListType from "../types/PostOnListType";
import PostType from "../types/PostType";

class PostService {
  static async getList({
    page,
    categoryId,
  }: {
    page?: number;
    categoryId?: number;
  }): Promise<PostOnListType[]> {
    try {
      const offsetPagination = { offset: 18, size: 9 };
      const res = await RepositoryFactory.post.getList({
        offsetPagination,
        categoryId,
      });
      return res.data.data.posts.edges.map((data: any) => {
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
    } catch (error) {
      return [];
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
  // カテゴリースラッグからカテゴリーIDを取得
  static async getCategoryIdBySlug({
    slug,
  }: {
    slug: string;
  }): Promise<number> {
    const res = await RepositoryFactory.post.getCategoryIdBySlug({ slug });
    return res.data.data.category.categoryId;
  }
}

export default PostService;
