import Link from "next/link";
import { useRouter } from "next/router";

export const SidebarItem = (props: {
  icon: JSX.Element;
  text: string;
  href: string;
}) => {
  const router = useRouter();
  const { icon, text, href } = props;
  const selected = router.pathname === href;
  return (
    <Link href={href} className={`no-underline`}>
      <div
        className={`flex flex-row items-center gap-4 px-6 py-4 cursor-pointer ${
          selected && `text-rose-900`
        } text-gray-600 hover:text-rose-600 hover:bg-gray-150 rounded-2xl transition-colors duration-150 font-medium stroke-2`}
      >
        {icon}
        <span className={``}>{text}</span>
      </div>
    </Link>
  );
};
