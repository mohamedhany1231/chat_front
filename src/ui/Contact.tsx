import { IoCall } from "react-icons/io5";
import useChat from "../hooks/chat/useChat";
import useUser from "../hooks/user/useUser";
import useUserData from "../hooks/user/useUserData";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

interface Contact {
  name: string;
  message: string;
  isActive: boolean;
  type: destination;
  email?: string;
  id: string;
  photo?: string;
  clickHandler?: () => void;
}

export default function Contact({
  name,
  email,
  message,
  type,
  id,
  photo,
  clickHandler,
  isActive = false,
}: Contact) {
  const { messages, isLoadingChat } = useChat({
    destinationType: type,
    destinationId: id,
  });
  const { user, isLoading: isLoadingUser } = useUserData();

  const navigate = useNavigate();
  if (isLoadingChat || isLoadingUser) return <Loader />;

  const notificationCount: number = messages?.pages[0].reduce(
    (acc: number, msg: message) =>
      msg.from !== user?.id && !msg.readBy.includes(user?.id) ? acc + 1 : acc,
    0
  );

  return (
    <div
      className={`flex gap-6 h-20 w-full items-center p-4  transition-colors overflow-hidden    ${
        isActive
          ? " bg-opacity-50 bg-main_dark "
          : "hover:bg-opacity-20 hover:bg-main_dark cursor-pointer"
      }  `}
      onClick={clickHandler}
    >
      <img
        src={photo || "./no-picture.webp"}
        className=" rounded-full object-fill h-full w-12"
      />
      <div className="max-w-full overflow-hidden">
        {/* {TODO: remove email} */}
        <h3 className=" text-lg font-bold">{email || name}</h3>
        <p className=" text-sm text-text_secondary text-nowrap overflow-hidden text-ellipsis">
          {message}
        </p>
      </div>
      <div className=" ml-auto ">
        <p className="font-bold rounded-full bg-gray-700 px-2 bg-opacity-30 text-xl">
          {notificationCount > 0 &&
            (notificationCount >= 9 ? "9+" : notificationCount)}
        </p>
      </div>

      {/* {type === "user" && (
        <div
          className=" bg-gray-600 hover:bg-gray-400"
          onClick={() => {
            navigate(`/call/${id}`);
          }}
        >
          <IoCall />
        </div>
      )} */}
    </div>
  );
}
