import { ReactNode } from "react";

const PostHeading = ({ children }: { children: ReactNode }) => {
  return <h2 className="font-body text-3xl">{children}</h2>;
};

export default PostHeading;
