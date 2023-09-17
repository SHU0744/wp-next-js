import RepositoryFactory from "../repositories/RepositoryFactory";
import PostType from "../types/PostType";

class PostService {
  static async getList(): Promise<PostType[]> {
    try {
      const res = await RepositoryFactory.post.getList();
      return res.data.data.posts.edges.map((data: any) => {
        const post: PostType = {
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
}

export default PostService;
