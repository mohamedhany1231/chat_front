import { format } from "date-fns";
import useUser from "../hooks/user/useUser";
import useUserData from "../hooks/user/useUserData";
import Loader from "./Loader";
import { IoCheckmarkDoneSharp, IoCheckmarkOutline } from "react-icons/io5";
import useGroup from "../hooks/group/useGroup";

type messageProps = {
  message: message;
  showImg: boolean;
  showDate: boolean;
  handleClick: (x: number) => void;
  index: number;
  showMessageInfo: boolean;
  refChatTop?: any;
};
export function Message({
  message,
  showImg,
  showDate,
  handleClick,
  index,
  showMessageInfo,
  refChatTop,
}: messageProps) {
  console.log(showDate && message);
  const { user: me, isLoading } = useUserData();
  const { user, isLoading: isLoadingUser } = useUser(message.from);
  const userIsSender = message.from === me.id;
  const { group, isLoading: isLoadingGroup } = useGroup(message.groupId || "");

  if (isLoading || isLoadingUser || isLoadingGroup) return <Loader />;

  const seen =
    message.isRead ||
    (message.groupId
      ? message.readBy.length === group.contact?.length
      : message.readBy.length === 1);

  return (
    <div ref={refChatTop}>
      {showDate && (
        <p className=" mt-6 text-xs sm:text-sm text-center bg-slate-500 bg-opacity-10  font-bold rounded-3xl w-fit px-4 py-1  mx-auto  text-gray-300">
          {format(message.sentAt, "yyyy/MM/dd")}
        </p>
      )}
      <div
        className={`flex ${
          userIsSender && " justify-end "
        } items-center gap-2 mt-2  `}
      >
        {showImg && !userIsSender && (
          <img
            className=" h-8 w-8 rounded-full object-cover"
            src={user?.photo || "./no-picture.webp"}
          />
        )}
        <p
          className={` flex items-center justify-between gap-4 ${
            userIsSender ? " bg-main" : " bg-text_secondary justify-end "
          }   ${
            showImg ? "" : "ml-6"
          }  border-blue-600 text-white text-sm sm:text-base  md:text-xl   rounded-3xl px-2 py-1 sm:py-2 sm:px-4 cursor-pointer hover:bg-opacity-90 transition-colors`}
          onClick={() => handleClick(index)}
        >
          <span>{message.content}</span>
          {userIsSender && (
            <span
              className={`${
                seen ? " opacity-100 text-secondary " : "opacity-30"
              }`}
            >
              <IoCheckmarkOutline />
            </span>
          )}
        </p>
      </div>
      {showMessageInfo && (
        <p
          className={` text-gray-400  ${
            userIsSender ? "text-end mr-4" : "ml-6"
          } `}
        >{`message sent at ${format(message.sentAt, "HH:mm")}`}</p>
      )}
    </div>
  );
}
