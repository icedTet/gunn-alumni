import { PencilIcon } from "@heroicons/react/24/outline";
import { GetServerSideProps } from "next/types";
import { useEffect, useRef, useState } from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { UserProfile } from "../../components/user/UserProfile";
import { getUserID } from "../../utils/Clients/AuthManager";
import { getUser } from "../../utils/ServersideHelpers/getUser";
import { GivenUser } from "../../utils/types/user";

export const UserAppearance = (props: { user: GivenUser }) => {
  const { user } = props;
  const [pfpFile, setPfpFile] = useState(null as File | null);
  const [pfpUrl, setPfpUrl] = useState(user.pfp);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);
  const [changed, setChanged] = useState(false);
  const pfpinput = useRef<HTMLInputElement>(null);
  const revert = () => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setUsername(user.username);
    setPfpFile(null);
    setChanged(false);
  };
  useEffect(() => {
    if (pfpFile) {
      const objectUrl = URL.createObjectURL(pfpFile);
      setPfpUrl(objectUrl);
    }
  }, [pfpFile]);

  return (
    <div className={`w-full min-h-screen flex flex-row`}>
      <Sidebar user={user} />
      <div
        className={`flex-grow h-screen flex flex-col gap-16 items-center py-16`}
      >
        <div className={`flex flex-col gap-4 w-full max-w-prose`}>
          <input
            type="file"
            onChange={(e) => {
              setPfpFile(e.target.files?.[0]!);
              e.target.files = null;
            }}
            className={`hidden`}
            ref={pfpinput}
            accept="image/png, image/jpeg, image/jpg, image/gif"
          />
          <span
            className={`text-gray-900/40 uppercase font-bold font-poppins text-sm`}
          >
            Appearance
          </span>
          <div
            className={`w-full bg-gray-50 dark:bg-gray-750 rounded-3xl flex flex-row p-6 gap-4 border border-gray-900/10`}
          >
            <div className={`flex flex-col gap-4`}>
              <div
                className={`relative group cursor-pointer overflow-hidden rounded-xl w-24 h-24 flex-shrink-0`}
              >
                <UserProfile
                  user={user}
                //   pfp={}
                  className={`w-full h-full drop-shadow-md group-hover:blur-sm transition-all rounded-2xl`}
                />
                <div
                  className={`flex flex-col gap-2 items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900/50 w-full h-full group-hover:opacity-100 opacity-0 transition-all text-gray-300`}
                  onClick={() => pfpinput.current?.click()}
                >
                  <PencilIcon className={`w-6 h-6`} />
                  <span className={`text-sm font-medium`}>Edit Avatar</span>
                </div>
              </div>
            </div>
            <div className={`w-0.5 bg-gray-700/10 h-full`} />
            <div className={`flex flex-col gap-4 w-full`}>
              <div className={`flex flex-row gap-4 w-full`}>
                <div className={`flex flex-col gap-0.5 grow`}>
                  <span className={`inputlabel`}>First Name</span>
                  <input
                    type="text"
                    className={`basicinput`}
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      setChanged(true);
                    }}
                  />
                </div>
                <div className={`flex flex-col gap-0.5 grow`}>
                  <span className={`inputlabel`}>Last Name</span>
                  <input
                    type="text"
                    className={`basicinput`}
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      setChanged(true);
                    }}
                  />
                </div>
              </div>
              <div className={`flex flex-col gap-0.5`}>
                <span className={`inputlabel`}>Username</span>
                <input
                  type="text"
                  className={`basicinput`}
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setChanged(true);
                  }}
                />
              </div>
              <div className={`flex flex-col gap-0.5`}>
                <span className={`inputlabel`}>Email</span>
                <input
                  type="text"
                  className={`basicinput`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setChanged(true);
                  }}
                />
              </div>
              <div className={`flex flex-row justify-end gap-4`}>
                <button
                  className={`px-4 py-2 text-gray-600 rounded-2xl disabled:opacity-0 transition-all duration-150 hover:bg-gray-900 hover:text-gray-50`}
                  disabled={!changed}
                  onClick={revert}
                >
                  Revert
                </button>
                <button className={`btn-primary`} disabled={!changed}>
                  Save Changes
                </button>
              </div>
            </div>

            {/* <div> */}
          </div>
          {/* <UpdateProfileModal
            profilePicture={pfpFile}
            returnCroppedImage={(f) => setcroppedPfpFile(f)}
            onCancel={() => {
              setPfpFile(null);
              setcroppedPfpFile(null);
            }}
          /> */}
        </div>
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
export default UserAppearance;