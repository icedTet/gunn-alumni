import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { GivenUser } from "../../utils/types/user";

export const CompleteSetup = (props: { user: GivenUser }) => {
  const { user } = props;
  // if user is missing any of the following fields, they need to complete setup
  if (user.pfp && !user.bio && !user.classOf) return null;
  const router = useRouter();
  return (
    <div
      className={`w-[45ch] xl:hidden min-h-screen flex flex-row p-8 shrink-0`}
    >
      <div
        className={`w-full h-fit bg-gray-50 z-10 rounded-3xl shadow p-8 flex flex-col gap-6`}
      >
        <div className="flex flex-col gap-2">
          <div className={`flex flex-col gap-4`}>
            <h1 className="font-poppins text-xl font-semibold text-gray-700 pb-4">
              What&apos;s next?
            </h1>
            {/* <p className="font-wsans leading-snug text-gray-600">
              
            </p> */}
          </div>
          <div className="flex flex-col gap-4">
            <div
              className={`auth-nextAction ${
                user.pfp ? `opacity-50` : `opacity-100`
              }`}
              onClick={() => {
                !user.pfp && router.push("/settings/me");
              }}
            >
              <span className={`text-3xl`}>👦</span>{" "}
              <div className="flex flex-col gap-1 flex-grow">
                <span className="font-poppins text-sm font-semibold">
                  Set a profile picture
                </span>
                <span className="font-wsans text-xs text-gray-600">
                  Upload a picture to let people know who you are!
                </span>
              </div>
              <ChevronRightIcon className="w-4 h-4 text-gray-900/40 shrink-0" />
            </div>
            <div className={`auth-nextAction`}>
              <span className={`text-3xl shrink-0`}>✍️</span>{" "}
              <div className="flex flex-col gap-1 flex-grow">
                <span className="font-poppins text-sm font-semibold">
                  Write a bio
                </span>
                <span className="font-wsans text-xs text-gray-600">
                  Tell people about yourself!
                </span>
              </div>
              <ChevronRightIcon className="w-4 h-4 text-gray-900/40 shrink-0" />
            </div>
            <div className={`auth-nextAction`}>
              <span className={`text-3xl shrink-0`}>👨‍🎓</span>{" "}
              <div className="flex flex-col gap-1 flex-grow">
                <span className="font-poppins text-sm font-semibold">
                  Enter graduation year
                </span>
                <span className="font-wsans text-xs text-gray-600">
                  Get matched with people in your grade!
                </span>
              </div>
              <ChevronRightIcon className="w-4 h-4 text-gray-900/40 shrink-0" />
            </div>
          </div>
        </div>
        <div
          className={`w-full h-2 rounded-full bg-gray-200 relative shadow-inner`}
        >
          <div
            className={`h-full rounded-full absolute top-0 left-0 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500`}
            style={{ width: `33%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
