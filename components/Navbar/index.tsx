import { UserContext } from "lib/context";
import Link from "next/link";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import NavItem from "./NavItem";

const Navbar = () => {
  const authenticatedState = useContext(UserContext);
  const [isHidden, setIsHidden] = useState(true);

  const onClick = () => setIsHidden(!isHidden);

  return (
    <nav className="flex flex-col px-4 py-4 drop-shadow-md shadow-slate-800 bg-white">
      <span className="flex justify-between">
        <Link href="/">
          <a>Accueil</a>
        </Link>
        {isHidden ? (
          <FontAwesomeIcon icon={faBars} onClick={onClick} height="30" />
        ) : (
          <FontAwesomeIcon icon={faXmark} onClick={onClick} height="30" />
        )}
      </span>
      {!isHidden && (
        <ul className="flex flex-col gap-4">
          {authenticatedState === "not-authenticated" ? (
            <>
              <NavItem content="Inscription" link="sign-up" />
              <NavItem content="Connexion" link="sign-in" />
            </>
          ) : (
            <NavItem content="Profile" link="profile" />
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
