import Logo from "./Logo";
import AssociationNav from "./AssociationNav";
import { useParams } from "react-router-dom";

const Header = () => {
  const { associationName } = useParams();
  console.log("NOMBRE ASOCIACION en Header", associationName);
  return (
    <header className="bg-dark-bckground sticky top-0 flex-wrap z-[20] mx-auto flex w-full items-center justify-between border-b border-gray-500 p-4">
      <Logo />
      <AssociationNav associationName={associationName} />
    </header>
  );
};

export default Header;
