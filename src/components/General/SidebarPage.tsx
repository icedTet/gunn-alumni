import { useSelf } from "../../utils/ClientsideHelpers/useSelf";
import { GivenUser } from "../../utils/types/user";
import { Sidebar } from "../Sidebar/Sidebar";
import { Container } from "./Container";

export const SidebarPage = (props: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  user?: GivenUser;
}) => {
  const user = useSelf(props.user);
  const { children, className, style } = props;
  return (
    <div
      className={`w-full text-gray-900 bg-gray-100 min-h-screen flex flex-row`}
    >
      <Sidebar user={user} />
      <div
        className={`relative flex flex-row gap-24 justify-center shrink-0 px-8 grow min-h-screen pb-8`}
      >
        {/* name, title on left, cool img on right */}
        <Container className={className} style={style}>
          {children}
        </Container>
      </div>
    </div>
  );
};
