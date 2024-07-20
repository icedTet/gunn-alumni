import {
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  CogIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { GivenUser } from "../../utils/types/user";
import { UserProfile } from "../user/UserProfile";
import Link from "next/link";
import { SelfUserClass } from "../../utils/classes/UserClass";

export const NavbarUserLink = (props: {
  user?: GivenUser;
  icon: (props: React.ComponentProps<"svg">) => JSX.Element;
  text: string;
  onClick?: () => void;
  href?: string;
  className?: string;
}) => {
  const { user, icon: Icon, text, onClick, href, className } = props;
  const LinkBody = () => (
    <div
      className={`flex flex-row gap-4 px-4 py-2 min-w-[16rem] lg:w-full w-fit relative cursor-pointer ${className} hover:bg-red-800 hover:text-gray-50 transition-all duration-150 text-gray-600`}
      onClick={onClick}
    >
      <Icon className={`w-6 h-6 `} />
      <span className={``}>{text}</span>
    </div>
  );
  return href ? (
    <Link href={href || "#"}>
      <LinkBody />
    </Link>
  ) : (
    <LinkBody />
  );
};

export const NavbarUser = (props: { user?: GivenUser }) => {
  const { user } = props;
  const [openUser, setOpenUser] = useState(false);
  useEffect(() => {
    // on document click, close sidebar
    const closeSidebar = (ev: MouseEvent) => {
      console.log(ev.target);
      // check if the target is an element and if it is a descendant of user-profile-menu
      if (
        ev.target instanceof Element &&
        ev.target.closest(`#user-profile-menu`)
      ) {
        console.log("clicked inside user profile menu");
        // if so, don't close the sidebar
        return;
      }
      setOpenUser(false);
      console.log("clicked outside user profile menu");
    };
    document.addEventListener("click", closeSidebar);
    return () => document.removeEventListener("click", closeSidebar);
  }, []);
  return (
    <>
      {user ? (
        <div
          className={`flex flex-row gap-4 p-2 rounded-2xl bg-white  border border-gray-900/10 min-w-[16rem] lg:w-full w-fit relative cursor-pointer`}
          onClick={() => {
            setOpenUser(!openUser);
          }}
          id="user-profile-menu"
        >
          <UserProfile
            user={user}
            className={`w-12 h-12 rounded-2xl transition-all duration-300 z-30`}
          />
          <div
            className={`flex flex-row gap-2 justify-between grow items-center relative w-fit  z-30`}
          >
            <div
              className={`flex flex-col justify-evenly ${!open && `hidden`}`}
            >
              <span className={` text-base font-bold text-gray-900`}>
                {user.firstName} {user.lastName}
              </span>
              <span className={` text-sm font-medium text-gray-900/30`}>
                @{user.username}
              </span>
            </div>
            <button
              className={`p-2 hover:bg-gray-900/10 h-fit w-fit rounded-xl`}
              onClick={() => {
                setOpenUser(!openUser);
              }}
            >
              <ChevronDownIcon className={`w-4 h-4 text-gray-900`} />
            </button>
          </div>
          <div
            className={`absolute -bottom-4 left-1/2 -translate-x-1/2  w-full h-96 bg-white z-20 rounded-2xl shadow-lg origin-top ${
              openUser ? `scale-100` : ` scale-90 opacity-0 pointer-events-none`
            } transition-all duration-75  translate-y-full py-2
        `}
          >
            <NavbarUserLink icon={CogIcon} text="Settings" />
            <NavbarUserLink
              icon={ArrowRightOnRectangleIcon}
              text="Log Out"
              href="/"
              onClick={() => {
                globalThis.localStorage.clear();
                // clear cookies
                console.log(globalThis?.document.cookie);
                // function to delete cookies

                if (globalThis?.document.cookie) {
                  const cookies = document.cookie.split(";");

                  // set 1 Jan, 1970 expiry for every cookies
                  for (let i = 0; i < cookies.length; i++)
                    document.cookie =
                      cookies[i] + "=;expires=" + new Date(0).toUTCString();
                }
                SelfUserClass.getInstance().user = null
                
              }}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};
