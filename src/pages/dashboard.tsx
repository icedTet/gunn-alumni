import { GetServerSideProps } from "next/types";
import { getUserID } from "../utils/Clients/AuthManager";
import { getUser } from "../utils/ServersideHelpers/getUser";
import { GivenUser } from "../utils/types/user";

export const Dashboard = (props: { user: GivenUser }) => {
  return (
    <div>
      Dashboard {JSON.stringify(props.user)} <a href="/">back</a>
    </div>
  );
};
export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userID = await getUserID(context.req);
  if (userID) {
    console.log("user is logged in", { userID });
    const user = await getUser(userID);
    delete user.password;
    console.log({ user });
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
