import useSWR from "swr";
import { WpGraphQlPostConst } from "../../constants/WpGraphQlConst";
import PostType from "../../types/PostType";
import PostService from "../../services/PostService";

const usePostListSwr = (staticPostList: PostType[]) => {
  const { data: postList } = useSWR(
    WpGraphQlPostConst.list,
    PostService.getList,
    { fallbackData: staticPostList } //初期値
  );
  return postList;
};

export default usePostListSwr;
