import { GetServerSideProps } from "next/types";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { getUserID } from "../../utils/Clients/AuthManager";
import { getUser } from "../../utils/ServersideHelpers/getUser";
import { GivenUser } from "../../utils/types/user";

export const ClassDirectory = (props: { user: GivenUser }) => {
  const { user } = props;
  return (
    <div className={`w-full min-h-screen flex flex-row`}>
      <Sidebar user={user} />
      <div className={`flex-grow h-screen bg-gray-50`}>
        Class Directory {JSON.stringify(props.user)} <a href="/">back</a>
      </div>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const userID = await getUserID(context.req);
  if (userID) {
    const user = await getUser(userID);
    delete user.password;
    return {
      props: {
        user: user,
      },
    };
  }
  return {
    redirect: {
      destination: "/auth/login",
      permanent: false,
    },
  };
  // ...
};
export default ClassDirectory;