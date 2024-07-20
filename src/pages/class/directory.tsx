import { GetServerSideProps, GetStaticProps } from "next/types";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { getUserID } from "../../utils/Clients/AuthManager";
import { useSelf } from "../../utils/ClientsideHelpers/useSelf";
import {
  getAllUnverifiedUsers,
  getAllUsers,
  getUser,
} from "../../utils/ServersideHelpers/getUser";
import { GivenUser, PublicUser } from "../../utils/types/user";
import { DirectoryViewer } from "../../components/Users/ClassDirectory";
import { SidebarPage } from "../../components/General/SidebarPage";
import { PageLayout } from "../../components/General/PageLayout";
import { motion } from "framer-motion";
import {
  animateData,
  animateEntry,
  animateEntryDown,
  animateTitle,
} from "../../utils/types/animationVariants";

export const ClassDirectory = (props: {
  users: PublicUser[];
  user?: GivenUser;
}) => {
  const { users } = props;
  return (
    <PageLayout user={props.user}>
      <motion.div
        className={`w-full flex flex-col grow items-center lg:items-center justify-start gap-8 max-w-full box-border`}
      >
        {/* Class Directory {JSON.stringify(props.users)} <a href="/">back</a> */}
        <motion.div
          className={`flex flex-row gap-4 justify-between w-full lg:flex-col`}
          {...animateData(0.1, 0.1)}
        >
          <motion.div
            className={`flex flex-col gap-4`}
            {...animateData(0.1, 0.2)}
          >
            <motion.h1
              className={`text-5xl lg:text-3xl font-black font-poppins grow`}
              variants={animateTitle}
            >
              Alumni Directory
            </motion.h1>
            <motion.span
              className={`text-lg lg:text-lg font-wsans text-gray-900/50`}
              variants={animateEntryDown}
            >
              A list of all the alumni of the school
            </motion.span>
          </motion.div>

          <input
            type={"text"}
            placeholder="Search"
            className="basicinput !w-72 lg:!w-full !shadow-sm !bg-gray-50 sticky top-0 "
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
          />
        </motion.div>
        <DirectoryViewer users={users} />
      </motion.div>
    </PageLayout>
  );
};
export const getStaticProps: GetStaticProps = async (context) => {
  console.log("Gennign directory1")
  const [users, unverifiedUsers] = await Promise.all([
    getAllUsers(),
    getAllUnverifiedUsers(),
  ]);
  console.log("Gennign directory")
  return {
    props: {
      users: [...users, ...unverifiedUsers],
    },
    revalidate: 60,
  };
  return {
    redirect: {
      destination: "/auth/login",
      permanent: false,
    },
  };
  // ...
};
export default ClassDirectory;
