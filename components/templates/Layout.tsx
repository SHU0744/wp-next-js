import { ReactNode } from "react";
import Footer from "../organisms/Footer";
import Header from "../organisms/Header";

const Layout = ({
  children,
  hidept = false,
}: {
  children: ReactNode;
  hidept?: boolean;
}) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className={`mb-auto ${hidept ? "" : "pt-10"}`}>{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
