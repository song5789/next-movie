import NavBar from "./Nav";
import ToTop from "./ToTop";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <div>{children}</div>
      <ToTop />
      <Footer />
    </>
  );
}
