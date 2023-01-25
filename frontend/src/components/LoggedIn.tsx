import { Transition } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const Login = () => {
  const [startAnim, setStartAnim] = useState(false);
  const router = useRouter();
  useEffect(() => {
    router.isReady && setStartAnim(true);
    return () => {};
  }, [router.isReady]);

  return (
    <div className={`w-full h-full relative`}>
      <div className="container flex items-center p-4 mx-auto min-h-screen justify-center z-10 relative">
        <Transition
          show={startAnim}
          enter="transition-all duration-500 delay-1000"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-500"
        >
          <div className="absolute top-0 left-0 w-full h-full meshy opacity-20"></div>
        </Transition>
        <main className={`flex flex-col gap-12 max-w-full z-10`}>
          <Transition
            show={startAnim}
            enter="transition-all duration-500"
            enterFrom="opacity-0 scale-50 origin-bottom translate-y-10"
            enterTo="opacity-100"
            leave="transition-opacity duration-500"
          >
            <h1 className="font-poppins text-6xl font-bold">
              Gunn Alumni Network
            </h1>
          </Transition>
          <Transition
            show={startAnim}
            enter="transition-all duration-500 delay-500"
            enterFrom="opacity-0 origin-bottom -translate-y-10"
            enterTo="opacity-100"
            leave="transition-opacity duration-500"
          >
            {/* description */}
            <h3 className="font-wsans text-2xl font-medium">
              The official alumni network for Gunn High School.
            </h3>
          </Transition>
          {/* add pretty red button here */}
          <div className="flex flex-row gap-4 items-center">
            <Link href="/auth/register">
              <button className="btn-primary">
                Join Network
              </button>
            </Link>
            <span className="font-wsans text-lg">or</span>
            <Link href="/login">
              <span className="font-wsans text-lg hover:text-rose-500 underline text-gray-600 duration-200 transition-all">
                Login
              </span>
            </Link>
          </div>

          {/* <h1 className="font-mono text-xl code">Welcome Gunn Alumni!</h1> */}
        </main>
      </div>
    </div>
  );
};
