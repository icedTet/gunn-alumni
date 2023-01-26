import { GetServerSideProps } from "next/types";
import { CompleteSetup } from "../components/Dashboard/ToDo";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { getUserID } from "../utils/Clients/AuthManager";
import { useSelf } from "../utils/ClientsideHelpers/useSelf";
import { getUser } from "../utils/ServersideHelpers/getUser";
import { GivenUser } from "../utils/types/user";

export const Dashboard = (props: { user: GivenUser }) => {
  const user = useSelf(props.user)
  return (
    <div className={`w-full min-h-screen flex flex-row`}>
      <Sidebar user={user} />
      <div className={`flex-grow h-screen break-all`}>
        Dashboard {JSON.stringify(props.user)} <a href="/">back</a>
      </div>
      <CompleteSetup user={user} />
    </div>
  );
};
export default Dashboard;

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
