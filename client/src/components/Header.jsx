import Logo from "./Logo";
import Nav from "./Nav";

const Header = () => {
  return (
    <header className="bg-dark-bckground sticky top-0 flex-wrap z-[20] mx-auto flex w-full items-center justify-between border-b border-gray-500 p-2 mb-0">
      <Logo />
      <Nav />
    </header>
  );
};

export default Header;
