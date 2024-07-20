import { useMemo, useState } from "react";
import { PossibleUser, PublicUser } from "../../utils/types/user";
import { ExpandAllChip, UserChip } from "./UserChip";
import { motion } from "framer-motion";
import { animateData, animateTitle } from "../../utils/types/animationVariants";

export const ClassGroup = (props: {
  users: PossibleUser[];
  className?: string;
  classOf: string;
  index: number;
}) => {
  const { users, className, classOf, index } = props;
  const [expanded, setExpanded] = useState(false);
  const { verifiedUsers, unverifiedUsers, extra } = useMemo(() => {
    let verifiedUsers: PublicUser[] = [];
    let unverifiedUsers: PossibleUser[] = [];
    users.forEach((u) => {
      if (u.type === 1) {
        verifiedUsers.push(u as PublicUser);
      } else {
        unverifiedUsers.push(u);
      }
    });
    verifiedUsers.sort((a, b) => a.lastName.localeCompare(b.lastName));
    unverifiedUsers.sort((a, b) => a.lastName.localeCompare(b.lastName));
    let extra = 0;
    if (!expanded) {
      // only show 10 users, prioritizing verified users
      if (verifiedUsers.length > 10) {
        extra = unverifiedUsers.length + (verifiedUsers.length - 10);
        unverifiedUsers = [];
        verifiedUsers = verifiedUsers.slice(0, 10);
      } else if (verifiedUsers.length + unverifiedUsers.length > 10) {
        extra = verifiedUsers.length + unverifiedUsers.length - 10;
        unverifiedUsers = unverifiedUsers.slice(0, 10 - verifiedUsers.length);
      }
    }
    return {
      verifiedUsers,
      unverifiedUsers,
      extra,
    };
  }, [users, expanded]);

  return (
    <motion.div
      className={`flex flex-col gap-4 ${className} w-full`}
      {...animateData(0.2 * index, 0.05)}
    >
      <motion.div
        className={`flex flex-row gap-4 items-center`}
        variants={animateTitle}
      >
        <h2 className={`text-xl font-bold font-poppins w-full`}>{classOf}</h2>

        {(!!extra || expanded) && (
          <button
            className={`text-sm font-bold font-poppins text-red-700 hover:underline`}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? `Collapse` : `Expand`}
          </button>
        )}
      </motion.div>
      <motion.div
        className={`grid grid-cols-4 2.5xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-4 grow items-stretch will-change-transform w-full`}
        {...animateData(0.2 * index + 0.1, 0.05)}
      >
        {verifiedUsers?.map((u) => (
          <UserChip user={u} verified />
        ))}
        {unverifiedUsers?.map((u) => (
          <UserChip user={u} verified={false} />
        ))}
        {extra > 0 && (
          <ExpandAllChip onClick={() => setExpanded(true)} extra={extra} />
        )}
      </motion.div>
    </motion.div>
  );
};
