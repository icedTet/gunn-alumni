import Link from "next/link";
import { PossibleUser } from "../../utils/types/user";
import Image from "next/image";
import { MonogramPFP, UserProfile } from "../user/UserProfile";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Variants, motion } from "framer-motion";
import { animateEntry } from "../../utils/types/animationVariants";

export const UserChip = (props: { user: PossibleUser; verified: boolean }) => {
  const { user } = props;
  return (
    <motion.div className={`w-full h-fit`} variants={animateEntry}>
      <Link
        href={user.type ? `/class/user/${props.user._id}` : `#`}
        className={`w-full`}
      >
        <div
          id={props.user._id}
          className={`bg-white rounded-full border border-gray-900/10 pr-6 p-2 hover:shadow-lg shadow-sm hover:border- transition-shadow cursor-pointer flex flex-row gap-2 justify-between items-center relative ${
            user.type === 0
              ? `bg-opacity-40 hover:shadow-sm cursor-not-allowed group`
              : ``
          }`}
        >
          <div
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[calc(100%+0.5rem)] group-hover:scale-100 scale-0 transition-all bg-gray-900 z-30 text-white p-2 rounded-xl text-xs font-wsans font-medium whitespace-nowrap origin-top`}
          >
            This user is not registered.
          </div>

          <UserProfile
            user={user}
            className={`w-12 h-12 rounded-full !text-lg ${
              user.type === 0 && `opacity-40`
            }`}
          />
          <div
            className={`flex flex-col flex-grow justify-evenly ${
              user.type === 0 && `opacity-40`
            }`}
          >
            <div className={`flex flex-row items-center gap `}>
              <span
                className={`text-base font-montserrat font-bold text-gray-900 whitespace-pre-wrap`}
              >
                {user.firstName.length > 10
                  ? `${user.firstName.slice(0, 10)}...`
                  : user.firstName}{" "}
              </span>
              <span
                className={`text-base font-montserrat font-bold text-gray-900 whitespace-pre-wrap`}
              >
                {user.lastName.length > 10
                  ? `${user.lastName.slice(0, 1)}.`
                  : user.lastName}
              </span>
            </div>
            <span className={`text-sm font-wsans font-medium text-gray-900/60`}>
              {user.type === 1 ? `@${user.username}` : `Unregistered`}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
export const ExpandAllChip = (props: {
  extra: number;
  onClick: () => void;
}) => {
  const { extra, onClick } = props;
  return (
    <motion.button
      className={`bg-white rounded-full border border-gray-900/10 pr-6 p-2 hover:shadow-lg shadow-sm hover:border- transition-shadow cursor-pointer flex flex-row gap-2 justify-between items-center relative`}
      onClick={onClick}
      variants={animateEntry}
    >
      <div
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[calc(100%+0.5rem)] group-hover:scale-100 scale-0 transition-all bg-gray-900 z-30 text-white p-2 rounded-xl text-xs font-wsans font-medium whitespace-nowrap origin-top`}
      >
        Only shown first 10 users.
      </div>

      <div className={`w-12 h-12 rounded-full bg-red-900 p-2`}>
        <PlusIcon className={`w-full h-full text-white`} />
      </div>
      <div className={`flex flex-col flex-grow justify-evenly items-start`}>
        <div className={`flex flex-row items-center gap `}>
          <span
            className={`text-base font-montserrat font-bold text-gray-900 whitespace-pre-wrap`}
          >
            View all {extra + 10} users
          </span>
        </div>
        <span className={`text-sm font-wsans font-medium text-gray-900/60`}>
          Click to expand class list
        </span>
      </div>
    </motion.button>
  );
};
