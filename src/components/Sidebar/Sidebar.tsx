import {
  CogIcon,
  GlobeAltIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import { hasPermission } from "../../utils/ClientsideHelpers/hasPermission";
import { useSelf } from "../../utils/ClientsideHelpers/useSelf";
import { GivenUser, UserTags } from "../../utils/types/user";
import { UserProfile } from "../user/UserProfile";
import { SidebarItem } from "./SidebarItem";

export const Sidebar = (props: { user: GivenUser }) => {
    const user = useSelf(props.user)
  const router = useRouter();
  return (
    <div className={`w-96 h-screen bg-gray-100 p-8 shrink-0`}>
      <div
        className={`bg-gray-50 flex flex-col gap-8 p-8 h-full rounded-3xl shadow-md`}
      >
        <div className={`flex flex-row gap-4 items-center`}>
          <Image
            src={"/logo.png"}
            width={64}
            height={64}
            className={`rounded-3xl bg-white p-1 border border-gray-900/5`}
            alt={"Logo"}
          />
          <span className={`font-poppins text-2xl font-bold text-gray-700`}>
            Gunn Alumni
          </span>
        </div>
        <div className={`flex flex-col gap-0`}>
          <span
            className={`font-poppins text-sm font-bold uppercase text-gray-900/30 pb-2`}
          >
            Quick Access
          </span>

          <SidebarItem
            icon={<HomeIcon className={`h-6 w-6`} />}
            text="Home"
            href="/dashboard"
          />
          <SidebarItem
            icon={<UserGroupIcon className={`h-6 w-6`} />}
            text="Class Directory"
            href="/class/directory"
          />
          <SidebarItem
            icon={<GlobeAltIcon className={`h-6 w-6`} />}
            text="Networking"
            href="/settings"
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
              className={`font-poppins text-sm font-bold uppercase text-gray-900/30 pb-2`}
            >
              SEC Stuff
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
          </div>
        )}
        {hasPermission(user, "viewAdminPanel") && (
          <div className={`flex flex-col gap-0`}>
            <span
              className={`font-poppins text-sm font-bold uppercase text-gray-900/30 pb-2`}
            >
              Funny Admin Stuff
            </span>

            <SidebarItem
              icon={<HomeIcon className={`h-6 w-6`} />}
              text="Home"
              href="/dashboard"
            />
            <SidebarItem
              icon={<CogIcon className={`h-6 w-6`} />}
              text="Settings"
              href="/settings"
            />
          </div>
        )}
        <div className="flex-grow" />
        <div
          className={`flex flex-row gap-4 p-4 bg-gray-100 rounded-3xl border border-gray-900/10`}
        >
          <UserProfile user={user} className={`w-16 h-16 rounded-2xl`} />
          <div className={`flex flex-col justify-evenly`}>
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
