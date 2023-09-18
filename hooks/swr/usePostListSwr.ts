import useSWR from "swr";
import { WpGraphQlPostConst } from "../../constants/WpGraphQlConst";

import PostService from "../../services/PostService";
import PostOnListType from "../../types/PostOnListType";

const usePostListSwr = (staticPostList: PostOnListType[]) => {
  const { data: postList } = useSWR(
    WpGraphQlPostConst.list,
    PostService.getList,
    { fallbackData: staticPostList } //初期値
  );
  return postList;
};

export default usePostListSwr;
