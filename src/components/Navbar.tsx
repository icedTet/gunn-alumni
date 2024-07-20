import Image from "next/image";
import { useSelf } from "../utils/ClientsideHelpers/useSelf";
import { useRouter } from "next/router";
import Link from "next/link";
import { UserProfile } from "./user/UserProfile";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { NavbarUser } from "./Navbar/NavbarUser";
export const NavbarLink = (props: {
  href: string;
  title: string;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const { href, title, className, style } = props;
  const router = useRouter();
  const selected = router.pathname.toLowerCase() === href;
  return (
    <Link href={href}>
      <div
        className={`flex flex-row items-center gap-4 cursor-pointer ${
          selected && `text-rose-900`
        } text-gray-600 hover:text-rose-800 hover:underline hover:bg-gray-150 rounded-2xl transition-all duration-150 font-medium stroke-2 px-4 py-2
                ${className ? className : ``} `}
        style={style}
      >
        {title}
      </div>
    </Link>
  );
};

export const Navbar = () => {
  const user = useSelf();
  const router = useRouter();
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <>
      <div className={` md:block hidden`}>
        <button
          className={`fixed top-4 left-4  z-30`}
          onClick={() => setOpenSidebar(true)}
        >
          <Image
            src="/logo.png"
            width={48}
            height={48}
            alt="Logo"
            className={`p-1 border border-gray-900/10 hover:brightness-110 transition-all duration-300 rounded-xl saturate-50 bg-white/20 backdrop-blur-lg`}
          />
        </button>
        <div
          className={`w-full min-h-screen overflow-auto bg-white top-0 left-0 ${
            openSidebar ? `translate-x-0` : `-translate-x-full`
          } z-40 fixed w-[80%] p-4 flex flex-col gap-4 transition-all duration-150 pt-8 grow`}
        >
          <div className={`flex flex-row gap-4 items-center px-4`}>
            <Image
              src="/logo.png"
              width={48}
              height={48}
              alt="Logo"
              className={`p-1 border border-gray-900/10 hover:brightness-110 transition-all duration-300 rounded-xl saturate-50 bg-white`}
            />
            <span className={`font-wsans text-xl font-bold text-gray-900`}>
              Gunn Alumni
            </span>
          </div>
          <div className={`flex flex-col gap-2 items-center w-full grow pb-4`}>
            <div className={`flex flex-col gap-1 items-start w-full`}>
              {/* <NavbarLink href="/dashboard" title="Dashboard" /> */}
              <NavbarLink href="/about" title="About" />
              <NavbarLink href="/events" title="Events" />
              <NavbarLink href="/class/directory" title="Directory" />
              <NavbarLink href="/contact" title="Contact" />
              {/* {JSON.stringify(user)} */}

              {/* <NavbarLink href="/login" title="Login" /> */}
            </div>
            <div className={`grow bg-gray grow w-full`} />
            {user ? (
              <div
                className={`flex flex-row gap-4 p-2 rounded-2xl bg-white  border border-gray-900/10 min-w-[16rem] lg:w-full`}
              >
                <UserProfile
                  user={user}
                  className={`w-12 h-12 rounded-2xl transition-all duration-300`}
                />
                <div
                  className={`flex flex-row gap-2 justify-between grow items-center`}
                >
                  <div
                    className={`flex flex-col justify-evenly ${
                      !open && `hidden`
                    }`}
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
                  >
                    <ChevronUpIcon className={`w-4 h-4 text-gray-900`} />
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div
          className={`fixed top-0 left-0 w-full h-full bg-gray-900/10 z-30 backdrop-blur-md ${
            openSidebar
              ? `pointer-events-auto`
              : `pointer-events-none opacity-0`
          } transition-all duration-300`}
          onClick={() => {
            setOpenSidebar(false);
          }}
        ></div>
      </div>
      <div
        className={`flex flex-row gap-2 justify-center w-full p-4 items-center top-0 md:hidden`}
      >
        <div
          className={`w-full max-w-6xl flex flex-row gap-2 justify-between items-center backdrop-blur-xl z-50 lg:flex-col
        `}
        >
          <div className={`flex flex-row gap-4 items-center`}>
            <Image
              src="/logo.png"
              width={48}
              height={48}
              alt="Logo"
              className={`p-1 border border-gray-900/10 hover:brightness-110 transition-all duration-300 rounded-xl saturate-50 bg-white`}
            />
            <span className={`font-wsans text-xl font-bold text-gray-900`}>
              Gunn Alumni
            </span>
          </div>
          <div className={`flex flex-row gap-2 items-center md:flex-col`}>
            <div className={`flex flex-row gap-1 items-center`}>
              {/* <NavbarLink href="/dashboard" title="Dashboard" /> */}
              <NavbarLink href="/about" title="About" />
              <NavbarLink href="/events" title="Events" />
              <NavbarLink href="/class/directory" title="Directory" />
              <NavbarLink href="/contact" title="Contact" />
              {/* {JSON.stringify(user)} */}

              {/* <NavbarLink href="/login" title="Login" /> */}
            </div>

            <NavbarUser user={user} />
          </div>
        </div>
      </div>
    </>
  );
};
