import Link from "next/link";

type Props = {
  content: string;
  link: string;
};

const NavItem = ({ content, link }: Props) => {
  return (
    <li>
      <Link href={`/${link}`}>
        <a className="w-full sm:max-w-fit">{content}</a>
      </Link>
    </li>
  );
};

export default NavItem;
