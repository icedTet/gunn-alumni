import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next/types";
import { useEffect } from "react";
import styles from "../../styles/registration.module.css";
import { getUserID } from "../../utils/Clients/AuthManager";
import { siteURL } from "../../utils/constants";
import { getUser } from "../../utils/ServersideHelpers/getUser";
import { GivenUser } from "../../utils/types/user";
export const NextSteps = (props: { user?: GivenUser }) => {
  const router = useRouter();
  const { user } = props;
  useEffect(() => {
    if (router.query.token) {
      localStorage.setItem("token", router.query.token as string);
    }
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [router, user]);
  return (
    <div className="w-full min-h-screen relative">
      <div
        className={`max-w-[90%] w-[45ch] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-50 z-10 rounded-3xl shadow-lg p-10`}
      >
        <div className="flex flex-col gap-8">
          <div className={`flex flex-col gap-4`}>
            <h1 className="font-poppins text-xl font-semibold text-gray-700 pb-4">
              Next Steps
            </h1>
            <p className="font-wsans leading-snug text-gray-600">
              {user
                ? `Congrats ${user.firstName}, your account is now live!`
                : `Congrats, your account is live!`}{" "}
              Now, you can start using the site. Before you do, we recommend you
              take a look at the following:
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className={`auth-nextAction`}>
              <span className={`text-3xl`}>🎨</span>{" "}
              <div className="flex flex-col gap-1 flex-grow">
                <span className="font-poppins text-xl font-semibold">
                  Customize your profile
                </span>
                <span className="font-wsans text-sm text-gray-600">
                  Show off some of that personality!
                </span>
              </div>
              <ChevronRightIcon className="w-4 h-4 text-gray-900/40" />
            </div>
            <div className={`auth-nextAction`}>
              <span className={`text-3xl`}>✍️</span>{" "}
              <div className="auth-nextAction-content">
                <h3 className="">Write a bit about yourself</h3>
                <span className="">Let people know who you are!</span>
              </div>
              <ChevronRightIcon className="w-4 h-4 text-gray-900/40" />
            </div>
          </div>
          <Link href="/dashboard" className={`mutedLink w-fit`}>
            No thanks, I&apos;ll do it later
          </Link>
        </div>
      </div>
      <div
        className={`w-full h-full absolute top-0 left-0 meshy opacity-10 z-0`}
      />
    </div>
  );
};
export default NextSteps;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const userID = await getUserID(context.req);
  if (userID) {
    const user = await getUser(userID);
    context.res.setHeader(
      "Set-Cookie",
      `auth_cookie=${context.query.token};Max-Age=2592000;Path=/;SameSite=Strict`
    );
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
