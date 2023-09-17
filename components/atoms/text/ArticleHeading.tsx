import { ReactNode } from "react";

const ArticleHeading = ({ children }: { children: ReactNode }) => {
  return <h2 className="font-body text-lg">{children}</h2>;
};

export default ArticleHeading;
