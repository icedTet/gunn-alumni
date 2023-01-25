import { PublicUser } from "../../utils/types/user";

function xmur3(str: string) {
  for (var i = 0, h = 1779033703 ^ str.length; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h ^= h >>> 16) >>> 0;
  };
}
export const MonogramPFP = (props: {
  firstName: string;
  lastName: string;
  className: string;
}) => {
  const { firstName, lastName, className } = props;
  if (!firstName || !lastName) return null;
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;
  // generate hash from name
  const hash = Math.floor((xmur3(`${firstName}${lastName}`)() / 2 ** 32) * 5);
  const gradients = [
    // "linear-gradient(68deg bottom, rgb(236, 72, 153), rgb(239, 68, 68), rgb(234, 179, 8))",
    // "linear-gradient(68deg bottom, rgb(134, 239, 172), rgb(59, 130, 246), rgb(147, 51, 234))",
    // "linear-gradient(68deg top, rgb(249, 168, 212), rgb(216, 180, 254), rgb(129, 140, 248))",
    "linear-gradient(68deg, rgb(199, 210, 254), rgb(254, 202, 202), rgb(254, 249, 195))",
    "linear-gradient(68deg top, rgb(254, 202, 202), rgb(252, 165, 165), rgb(254, 240, 138))",
    "linear-gradient(68deg, rgb(187, 247, 208), rgb(134, 239, 172), rgb(59, 130, 246))",
    // "linear-gradient(43deg bottom, rgb(254, 240, 138), rgb(187, 247, 208), rgb(134, 239, 172))",
    "linear-gradient(68deg, rgb(134, 239, 172), rgb(192, 132, 252))",
    "linear-gradient(43deg top, rgb(254, 240, 138), rgb(251, 207, 232), rgb(244, 114, 182))",
    // "linear-gradient(68deg, rgb(251, 113, 133), rgb(217, 70, 239), rgb(99, 102, 241))",
    // "linear-gradient(68deg bottom, rgb(253, 186, 116), rgb(253, 164, 175))",
    // "linear-gradient(68deg top, rgb(153, 246, 228), rgb(217, 249, 157))",
    // "linear-gradient(68deg, rgb(192, 132, 252), rgb(250, 204, 21))",
  ];

  return (
    <div
      className={` ${className} flex flex-row items-center justify-center text-2xl flex-shrink-0`}
      style={{
        background: gradients[hash],
      }}
    >
      <div className="text-center">
        <span className="font-bold font-wsans text-gray-900/60">
          {initials}
        </span>
      </div>
    </div>
  );
};

export const UserProfile = (props: {
  user?: PublicUser;
  pfp?: string;
  className: string;
}) => {
  const { user, className, pfp } = props;
  if (user?.pfp || pfp) {
    return (
      <img src={pfp || user?.pfp} alt="Profile Picture" className={className} />
    );
  }
  return (
    <MonogramPFP
      firstName={user?.firstName}
      lastName={user?.lastName}
      className={className}
    />
  );
};
