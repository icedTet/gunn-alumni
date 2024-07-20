import { useMemo } from "react";
import { PossibleUser, PublicUser, User } from "../../utils/types/user";
import { ClassGroup } from "./ClassGroup";
import { UserChip } from "./UserChip";

export const DirectoryViewer = (props: { users: PossibleUser[] }) => {
  const { users } = props;
  const classGroups = useMemo(() => {
    const groups: { [key: string]: PossibleUser[] } = {};
    const unknowns = [];
    users.forEach((u) => {
      const year = u.classOf || null;
      if (!year) {
        unknowns.push(u);
        return;
      }
      if (!groups[year]) {
        groups[year] = [];
      }
      groups[year].push(u);
    });
    return {
      groups,
      unknowns,
    };
  }, [users]);
  return (
    <>
      {Object.keys(classGroups.groups)
        .sort((a, b) => ~~b - ~~a)
        .map((year, i) => {
          return (
            <ClassGroup
              classOf={`Class of ${year}`}
              users={classGroups.groups[year]}
              index={i}
            />
          );
        })}
      <ClassGroup
        classOf={`Unknown`}
        users={classGroups.unknowns}
        index={Object.keys(classGroups.groups).length}
      />
    </>
  );
};
