import { ObjectId } from "mongodb";
import { PublicUser, UserTags } from "../../utils/types/user";
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
  NextPageContext,
} from "next";
import { cleanUser, getUser } from "../../utils/ServersideHelpers/getUser";
import { PageLayout } from "../../components/General/PageLayout";
import { UserProfile } from "../../components/user/UserProfile";
import {
  ClockIcon,
  EnvelopeIcon,
  GlobeAmericasIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import {
  FaDiscord,
  FaTwitter,
  FaTwitch,
  FaYoutube,
  FaGithub,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaMapMarker,
} from "react-icons/fa";
import { BlurryBg } from "../../components/user/BlurryBg";
export const TagsRenderer = (props: {
  user: PublicUser;
  className?: string;
}) => {
  const { user, className } = props;
  return (
    <div className={`flex flex-row gap-4 flex-wrap relative z-10 ${className}`}>
      <span
        className={`text-lg font-wsans text-gray-50 bg-gray-900 px-3 py-1 rounded-full w-fit font-bold`}
      >
        Class of {user.classOf}
      </span>
      {user.tags?.includes(UserTags.WEBMASTER) && (
        <span
          className={`text-lg font-wsans text-gray-50 bg-gradient-to-br from-rose-400 via-fuchsia-500 to-indigo-500 px-3 py-1 rounded-full w-fit font-bold`}
        >
          Developer
        </span>
      )}
    </div>
  );
};
export const UserLinks = (props: { user: PublicUser; className?: string }) => {
  const { user, className } = props;
  return (
    <div className={`flex flex-row flex-wrap z-10 ${className} gap-4 gap-y-2`}>
      <UserFeature icon={EnvelopeIcon} text={"tet@tet.moe"} href={""} />
      <UserFeature icon={FaDiscord} text={"Tet#6000"} href={""} />
      <UserFeature icon={FaTwitter} text={"@teto"} href={""} />
      <UserFeature icon={FaTwitch} text={"@teto"} href={""} />
      <UserFeature icon={FaYoutube} text={"@tetoYT"} href={""} />
      <UserFeature icon={FaGithub} text={"@icedTet"} href={""} />
      <UserFeature icon={FaInstagram} text={"@teto"} href={""} />
      <UserFeature icon={FaFacebook} text={"@teto"} href={""} />
      <UserFeature icon={FaLinkedin} text={"tet0"} href={""} />
    </div>
  );
};
export const UserFeature = (props: {
  icon: (props: { className?: string }) => JSX.Element;
  text: string;
  href: string;
}) => {
  const { icon: Icon, text, href } = props;
  return (
    <div
      className={`flex flex-row gap-2 items-center text-gray-900/70 font-medium lg:bg-white lg:px-3 lg:py-1.5 rounded-full lg:shadow-sm lg:border border-gray-900/10`}
    >
      <Icon className={`w-6 h-6`} />
      <span className={`text-base font-wsans `}>{text}</span>
    </div>
  );
};
export const userPage = (props: { user: PublicUser }) => {
  const { user } = props;
  return (
    <PageLayout>
      <BlurryBg user={user} />
      <div className={`grid grid-cols-11 lg:grid-cols-8 gap-24 lg:gap-0`}>
        <div
          className={`col-span-3 xl:col-span-4 lg:hidden bg-white shadow-sm rounded-2xl flex flex-col gap-0 overflow-hidden border border-gray-900/10 relative`}
        >
          <div className={`absolute top-0 left-0 w-full h-full z-0`}>
            <div className={`relative w-full h-full`}>
              <div
                className={`w-full h-full absolute top-0 left-0 z-10 bg-gradient-to-b from-white/50 to-white/90`}
              />
              <UserProfile
                user={user}
                className={
                  "h-full aspect-square !text-4xl mx-auto !rounded-2xl p-2 !absolute !top-1/2 !left-1/2 -translate-x-1/2 -translate-y-1/2 blur-lg opacity-60"
                }
              />
            </div>
          </div>
          <UserProfile
            user={user}
            className={
              "w-full aspect-square !text-4xl mx-auto !rounded-2xl p-2 z-10"
            }
          />
          <div className={`flex flex-col gap-1 p-8 pb-4 z-10`}>
            <h3 className={`text-xl font-black font-poppins text-gray-900`}>
              {user.firstName} {user.lastName}
            </h3>
            <span className={`text-lg font-wsans text-gray-900/50`}>
              @{user.username}
            </span>
          </div>
          <div className={`px-8 pb-4`}>
            <TagsRenderer user={user} className={`!gap-2`} />
          </div>
          <UserLinks user={user} className={`!flex-col gap-2 px-8 pb-8`} />
        </div>
        <div
          className={`col-span-8 xl:col-span-7 lg:col-span-8  flex flex-col gap-6 w-full`}
        >
          <div className={`flex flex-col gap-4`}>
            <div
              className={`w-full flex flex-row gap-4 items-center md:items-start md:flex-col`}
            >
              <UserProfile
                user={user}
                className={
                  "w-32 h-32 md:w-full md:h-auto md:aspect-square  !text-4xl !rounded-3xl p-2 z-10 lg:block hidden shrink-0"
                }
              />

              <div className={`flex flex-col gap`}>
                <h1
                  className={`text-5xl lg:text-3xl font-black font-poppins text-gray-900`}
                >
                  {user.firstName} {user.lastName}
                </h1>
                <div className={`hidden lg:flex flex-col gap-2 flex-wrap z-10`}>
                  <span className={`text-lg font-wsans text-gray-900/50`}>
                    @{user.username}
                  </span>
                  <div className={`flex flex-col gap-6`}>
                    <TagsRenderer user={user} />
                  </div>
                </div>
              </div>
            </div>
            <UserLinks user={user} />
          </div>
          <div
            className={`w-full border relative p-8 lg:p-4 lg:gap-0 rounded-2xl shadow-sm flex flex-col gap-2 bg-white`}
          >
            <span
              className={`text-lg font-bold font-poppins text-gray-900/80 lg:text-sm lg:text-gray-900/20`}
            >
              Bio
            </span>
            <span
              className={`text-base  md:text-sm font-wsans text-gray-900/50`}
            >
              I'm Tet, the God of Games, ruling over the marvelous world of
              Disboard. You might know me from the thrilling light novel series
              and anime "No Game No Life," where I take center stage as the
              primary deity. With a mischievous glint in my eyes and a perpetual
              playful grin, I bring an air of joviality and eccentricity to the
              realm. Sporting vibrant red hair and a crown adorned with an
              assortment of game pieces, my humanoid appearance is hard to miss.
              My attire, inspired by the aesthetics of traditional games, adds a
              touch of flair to my divine presence. But don't let my supreme
              status fool you—I'm far from a stiff and distant deity. You see,
              I'm a carefree soul who lives by a set of rules known as the Ten
              Pledges, which I myself crafted. These rules govern the entire
              realm of Disboard, ensuring that all conflicts, even among gods,
              are resolved through games rather than resorting to violence or
              manipulation. It's a way to keep things fair and exciting, to
              bring out the best in everyone. When the previous god mysteriously
              vanished, an opportunity presented itself, and I emerged as the
              victor of a grand divine game. Thus, I ascended to the throne as
              the ruler of Disboard. But what truly piqued my interest was the
              arrival of Sora and Shiro, the brilliant siblings renowned for
              their gaming prowess. Impressed by their skills, I extended an
              invitation for them to join me in Disboard.
            </span>
          </div>
          <div
            className={`w-full h-32 relative overflow-hidden rounded-2xl border border-gray-900/10 flex flex-row gap-4 items-center justify-between text-gray-900 p-8 bg-white`}
          >
            <img
              src="https://news.stanford.edu/wp-content/uploads/2020/08/20200713_Stanford_empty_campus-32-scaled.jpg"
              className={`absolute w-full h-full scale-110 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 blur-md object-cover opacity-10 pointer-events-none`}
            />
            <div className={`flex flex-row gap-4 z-10 items-center`}>
              <MapPinIcon className={`w-12 h-12  z-10`} />
              <div className={`flex flex-col gap-1 z-10`}>
                <span className={`text-lg font-medium font-poppins z-10`}>
                  Located in
                </span>
                <span className={`text-xl font-bold font-poppins z-10`}>
                  Stanford, CA
                </span>
              </div>
            </div>
            <div className={`flex flex-row gap-4 z-10 items-center`}>
              <ClockIcon className={`w-12 h-12  z-10`} />
              <div className={`flex flex-col gap-1 z-10`}>
                <span className={`text-lg font-medium font-poppins z-10`}>
                  Current Time
                </span>
                <span className={`text-xl font-bold font-poppins z-10`}>
                  12:30 PM
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
export default userPage;
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const userID = context.query.user as string;
  if (!ObjectId.isValid(userID)) {
    return {
      notFound: true,
    };
  }
  console.log(userID);
  if (!userID) {
    return {
      notFound: true,
    };
  }
  const user = cleanUser(await getUser(userID));
  if (!user) {
    return {
      notFound: true,
    };
  }
  return {
    props: { user },
  };
};
