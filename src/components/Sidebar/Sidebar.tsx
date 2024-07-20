import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CogIcon,
  GlobeAltIcon,
  HomeIcon,
  ShieldCheckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import { hasPermission } from "../../utils/ClientsideHelpers/hasPermission";
import { useSelf } from "../../utils/ClientsideHelpers/useSelf";
import { GivenUser, UserTags } from "../../utils/types/user";
import { UserProfile } from "../user/UserProfile";
import { SidebarItem } from "./SidebarItem";
import { useLocalStorage } from "tet-hooklib";
import Link from "next/link";

export const Sidebar = (props: { user: GivenUser }) => {
  const user = useSelf(props.user);
  const router = useRouter();
  const [open, setOpen] = useLocalStorage("sidebarOpen", true);
  return (
    <div
      className={`${
        open ? "w-96" : "w-40"
      }  h-screen bg-gray-100 p-8 shrink-0 transition-all duration-300`}
    >
      <div
        className={`bg-gray-50 flex flex-col gap-8 p-8 h-full ${
          open ? "rounded-3xl" : "rounded-xl p-2 py-6 items-center"
        } shadow-md transition-all duration-300`}
      >
        <div
          className={`flex ${
            open ? `flex-row gap-4` : `flex-col gap-2`
          } justify-between items-center`}
        >
          <div className={`flex flex-row gap-4 items-center`}>
            <Link href="/dashboard">
              <Image
                src={"/logo.png"}
                width={48}
                height={48}
                className={`${
                  open ? `rounded-3xl` : `rounded-xl`
                } bg-gray-100 p-1 border border-gray-900/10 hover:brightness-110 transition-all duration-300`}
                alt={"Logo"}
              />
            </Link>
            <span
              className={`font-poppins text-xl font-bold text-gray-700 ${
                !open ? "hidden" : ""
              }`}
            >
              Gunn Alumni
            </span>
          </div>

          <div
            className={`p-2 rounded-xl hover:bg-gray-900/10 transition-all duration-300 `}
            onClick={() => setOpen(!open)}
          >
            <ChevronLeftIcon
              className={`h-4 w-4 cursor-pointer ${!open && `rotate-180`}`}
            />
          </div>
        </div>
        <div className={`flex flex-col gap-0`}>
          <span
            className={`font-poppins text-sm font-bold uppercase text-gray-900/30 pb-2
             ${!open && "hidden"}`}
          >
            Quick Access
          </span>

          <SidebarItem
            icon={<HomeIcon className={`h-6 w-6`} />}
            text="Home"
            href="/dashboard"
            open={open}
          />
          <SidebarItem
            icon={<UserGroupIcon className={`h-6 w-6`} />}
            text="Class Directory"
            href="/class/directory"
            open={open}
          />
          <SidebarItem
            icon={<GlobeAltIcon className={`h-6 w-6`} />}
            text="Networking"
            href="/settings"
            open={open}
          />
          {/* <SidebarItem
          icon={<CogIcon className={`h-6 w-6`} />}
          text="Settings"
          href="/settings"
        /> */}
        </div>

        {/* <div className={`flex flex-col gap-0`}>
        <span
          className={`font-poppins text-sm font-bold uppercase text-gray-900/30 pb-2`}
        >
          Class
        </span>

        <SidebarItem
          icon={<HomeIcon className={`h-6 w-6`} />}
          text="Home"
          href="/dashboard"
        />
        <SidebarItem
          icon={<UserGroupIcon className={`h-6 w-6`} />}
          text="Class Directory"
          href="/settings"
        />
      </div> */}
        {hasPermission(user, "manageClass") && (
          <div className={`flex flex-col gap-0`}>
            <span
              className={`font-poppins text-sm font-bold uppercase text-gray-900/30 pb-2 ${
                !open && `hidden`
              }`}
            >
              SEC Stuff
            </span>

            <SidebarItem
              icon={<HomeIcon className={`h-6 w-6`} />}
              text="Home"
              href="/dashboard"
              open={open}
            />
            <SidebarItem
              icon={<UserGroupIcon className={`h-6 w-6`} />}
              text="Manage Class"
              href="/settings"
              open={open}
            />
          </div>
        )}
        {hasPermission(user, "viewAdminPanel") && (
          <div className={`flex flex-col gap-0`}>
            <span
              className={`font-poppins text-sm font-bold uppercase text-gray-900/30 pb-2 ${
                !open && `hidden`
              }`}
            >
              Admin
            </span>

            <SidebarItem
              icon={<ShieldCheckIcon className={`h-6 w-6`} />}
              text="Security"
              href="/dashboard"
              open={open}
            />
            <SidebarItem
              icon={<CogIcon className={`h-6 w-6`} />}
              text="Settings"
              href="/settings"
              open={open}
            />
          </div>
        )}
        <div className="flex-grow" />
        <div
          className={`flex flex-row gap-4 ${
            open ? `p-4 rounded-3xl` : `p-1 rounded-xl`
          } bg-gray-100  border border-gray-900/10`}
        >
          <UserProfile
            user={user}
            className={`${
              open ? `w-16 h-16` : `w-12 h-12`
            } rounded-2xl transition-all duration-300`}
          />
          <div className={`flex flex-col justify-evenly ${!open && `hidden`}`}>
            <span className={` text-base font-bold text-gray-900`}>
              {user.firstName} {user.lastName}
            </span>
            <span className={` text-sm font-medium text-gray-900/30`}>
              @{user.username}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
