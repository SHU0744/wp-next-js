import useSWR from "swr";
import { WpGraphQlPostConst } from "../../constants/WpGraphQlConst";
import PostService from "../../services/PostService";
import PostOnListType from "../../types/PostOnListType";

const usePostListSwr = ({
  currentPage,
  categoryId,
  staticPostList,
  staticTotal,
}: {
  currentPage: number;
  categoryId?: number;
  staticPostList: PostOnListType[];
  staticTotal: number;
}) => {
  let key, fetcher;
  if (categoryId) {
    key = [WpGraphQlPostConst.listByCategory, currentPage, categoryId];
    fetcher = () => PostService.getList({ page: currentPage, categoryId });
  } else {
    key = [WpGraphQlPostConst.list, currentPage];
    fetcher = () => PostService.getList({ page: currentPage });
  }
  const { data } = useSWR<[PostOnListType[], number]>(
    key,
    fetcher,
    { fallbackData: [staticPostList, staticTotal] } //初期値
  );
  return data ?? [staticPostList, staticTotal];
};

export default usePostListSwr;
