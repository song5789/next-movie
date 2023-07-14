import NavBar from "./Nav";
import ToTop from "./ToTop";

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <div>{children}</div>
      <ToTop />
    </>
  );
}
