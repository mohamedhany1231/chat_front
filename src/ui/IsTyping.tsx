import useUser from "../hooks/user/useUser";

export function IsTyping({ usersId }: { usersId: string[] }) {
  return (
    <p
      className={`  mt-4  text-gray-300 text-sm  sm:text-lg    p-2 pb-0   w-fit ml-8`}
    >
      {usersId.map((id) => (
        <TypingUserName id={id} />
      ))}
      is typing <TypingDots />
    </p>
  );
}

function TypingUserName({ id }: { id: string }) {
  const { user, isLoading } = useUser(id);

  if (isLoading) return;

  return <span>{user?.name}, </span>;
}

function TypingDots() {
  return (
    // <div className=" inline-block text-5xl">
    //   <div
    //     className=" inline-block transition-transform translate-y-[-12%] animate-bounce"
    //     style={{ animationDelay: "0.1s" }}
    //   >
    //     .
    //   </div>
    //   <div
    //     className=" inline-block transition-transform translate-y-[-12%] animate-bounce"
    //     style={{ animationDelay: "0.25s" }}
    //   >
    //     .
    //   </div>
    //   <div
    //     className=" inline-block transition-transform translate-y-[-12%] animate-bounce "
    //     style={{ animationDelay: "0.5s" }}
    //   >
    //     .
    //   </div>
    // </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      style={{ display: "inline-block" }}
    >
      <circle cx="4" cy="12" r="3" fill="currentColor">
        <animate
          id="svgSpinners3DotsFade0"
          fill="freeze"
          attributeName="opacity"
          begin="0;svgSpinners3DotsFade1.end-0.25s"
          dur="0.75s"
          values="1;0.2"
        />
      </circle>
      <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.4">
        <animate
          fill="freeze"
          attributeName="opacity"
          begin="svgSpinners3DotsFade0.begin+0.15s"
          dur="0.75s"
          values="1;0.2"
        />
      </circle>
      <circle cx="20" cy="12" r="3" fill="currentColor" opacity="0.3">
        <animate
          id="svgSpinners3DotsFade1"
          fill="freeze"
          attributeName="opacity"
          begin="svgSpinners3DotsFade0.begin+0.3s"
          dur="0.75s"
          values="1;0.2"
        />
      </circle>
    </svg>
  );
}
