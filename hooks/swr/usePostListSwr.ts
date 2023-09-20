import useSWR from "swr";
import { WpGraphQlPostConst } from "../../constants/WpGraphQlConst";

import PostService from "../../services/PostService";
import PostOnListType from "../../types/PostOnListType";

const usePostListSwr = ({
  categoryId,
  staticPostList,
}: {
  categoryId?: number;
  staticPostList: PostOnListType[];
}) => {
  let key, fetcher;
  if (categoryId) {
    key = [WpGraphQlPostConst.listByCategory, categoryId];
    fetcher = () => PostService.getList({ categoryId });
  } else {
    key = WpGraphQlPostConst.list;
    fetcher = PostService.getList;
  }
  const { data: postList } = useSWR(
    key,
    fetcher,
    { fallbackData: staticPostList } //初期値
  );
  return postList;
};

export default usePostListSwr;
