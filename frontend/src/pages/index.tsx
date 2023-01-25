import { Transition } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next/types";
import { useEffect, useState } from "react";
import { NotLoggedInLanding } from "../components/NotLoggedIn";
import { UserProfile } from "../components/user/UserProfile";
import { getUserID } from "../utils/Clients/AuthManager";
import { siteURL } from "../utils/constants";
import { getUser } from "../utils/ServersideHelpers/getUser";
import { GivenUser } from "../utils/types/user";

export default function Home(props: { user?: GivenUser }) {
  const { user } = props;
  const [startAnim, setStartAnim] = useState(!!user);
  const router = useRouter();
  useEffect(() => {
    router.isReady && setStartAnim(true);
    return () => {};
  }, [router.isReady]);

  return (
    <div className={`w-full h-full relative`}>
      <div className="container flex items-center p-4 mx-auto min-h-screen justify-center z-10 relative">
        <Transition
          show={startAnim}
          enter="transition-all duration-500 delay-1000"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-500"
        >
          <div className="absolute top-0 left-0 w-full h-full meshy opacity-20"></div>
        </Transition>
        <main className={`flex flex-col gap-12 max-w-full z-10`}>
          <Transition
            show={startAnim}
            enter="transition-all duration-500"
            enterFrom="opacity-0 scale-50 origin-bottom translate-y-10"
            enterTo="opacity-100"
            leave="transition-opacity duration-500"
          >
            <h1 className="font-poppins text-6xl font-bold">
              Gunn Alumni Network
            </h1>
          </Transition>
          <Transition
            show={startAnim}
            enter="transition-all duration-500 delay-500"
            enterFrom="opacity-0 origin-bottom -translate-y-10"
            enterTo="opacity-100"
            leave="transition-opacity duration-500"
          >
            {/* description */}
            <h3 className="font-wsans text-2xl font-medium">
              The official alumni network for Gunn High School.
            </h3>
          </Transition>
          {/* add pretty red button here */}
          {user ? (
            <div className="flex flex-row gap-4 items-center">
              <Link href="/dashboard" className={`no-underline`}>
                <div
                  className={`flex flex-row rounded-full p-2 pr-4 bg-gray-50 w-fit gap-2 items-center shadow-md border-gray-900/10 hover:bg-white cursor-pointer`}
                >
                  <UserProfile
                    user={user}
                    className={`rounded-full w-12 h-12`}
                  />
                  <div className="flex flex-row gap-1">
                    <span className={`font-medium text-gray-900/80`}>
                      Continue as
                    </span>
                    <span className={`font-bold text-gray-900/80`}>
                      {user.firstName}
                    </span>
                  </div>
                  {/* <div className="p-1 bg-gray-900 rounded-full items-center">
                <ChevronRightIcon className="w-4 h-4 text-white stroke-2" />
              </div> */}
                </div>
              </Link>
              <span className="font-wsans text-lg text-gray-900/40">or</span>
              <Link href="/logout">
                <span className="font-wsans text-lg hover:text-rose-500 underline text-gray-600 duration-200 transition-all">
                  Logout
                </span>
              </Link>
            </div>
          ) : (
            <div className="flex flex-row gap-4 items-center">
              <Link href="/auth/register">
                <button className="btn-primary">Join Network</button>
              </Link>
              <span className="font-wsans text-lg">or</span>
              <Link href="/auth/login">
                <span className="font-wsans text-lg hover:text-rose-500 underline text-gray-600 duration-200 transition-all">
                  Login
                </span>
              </Link>
            </div>
          )}

          {/* <h1 className="font-mono text-xl code">Welcome Gunn Alumni!</h1> */}
        </main>
      </div>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const userID = await getUserID(context.req);
  const refer = context.req.headers.referer && new URL(context.req.headers.referer);
  if (userID) {
    if (!context.req.headers.referer || !refer.pathname.startsWith("/dashboard")) {
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false,
        },
      };
    }
    const user = await getUser(userID);
    delete user.password;
    return {
      props: {
        user: user,
      },
    };
  }
  return {
    props: {},
  };
  // ...
};
