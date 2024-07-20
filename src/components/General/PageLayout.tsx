import { useSelf } from "../../utils/ClientsideHelpers/useSelf";
import { GivenUser } from "../../utils/types/user";
import { Sidebar } from "../Sidebar/Sidebar";
import { Container } from "./Container";

export const PageLayout = (props: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  user?: GivenUser;
}) => {
  const user = useSelf(props.user);
  const { children, className, style } = props;
  return (
    <div className={`w-full text-gray-900 bg-gray-50 flex flex-row justify-center h-fit`} id="baseLayout">
      <div
        className={`w-[90%] relative flex flex-row gap-24 justify-center shrink-0 px-8 h-fit z-10`}
      >
        {/* name, title on left, cool img on right */}
        <Container className={className} style={style}>
          {children}
        </Container>
      </div>
    </div>
  );
};
