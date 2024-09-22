import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "./InputField";
import { IoMdSend } from "react-icons/io";
import socket from "../utils/socket";
import ActiveChatContext from "../context/ActiveChatContext";
import useChat from "../hooks/chat/useChat";
import { useQueryClient } from "@tanstack/react-query";
import useUserData from "../hooks/user/useUserData";
import Loader from "./Loader";
import { setUpChatSocket } from "../utils/setUpChatSocket";
import { sortContacts } from "../utils/helperFunctions";
import { useInView } from "react-intersection-observer";
import { IsTyping } from "./IsTyping";
import useGroup from "../hooks/group/useGroup";
import useUser from "../hooks/user/useUser";
import { AddUserToGroup } from "./AddUserToGroup";
import { LoadMessagesPages } from "./LoadMessagesPages";
import MessageField from "./MessageField";

export default function ChatBox() {
  const { register, handleSubmit, setValue } = useForm();
  const queryClient = useQueryClient();
  const [isTyping, setIsTyping] = useState<string[]>([]);
  const { activeChat } = useContext(ActiveChatContext);
  const { user, isLoading: isLoadingUser } = useUserData();

  const { messages, isLoading, fetchNextPage, hasNextPage } =
    useChat(activeChat);

  const { inView, ref: chatTop } = useInView();

  const chatBoxRef = useRef<HTMLElement>();

  useEffect(() => {
    if (
      !chatBoxRef.current ||
      chatBoxRef.current?.scrollHeight - chatBoxRef.current?.scrollTop ===
        chatBoxRef.current?.clientHeight
    ) {
      chatBottom.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isTyping, activeChat, messages]);

  useEffect(() => {
    if (hasNextPage) {
      if (inView) fetchNextPage();
    }
  }, [inView, fetchNextPage, isLoading, hasNextPage]);

  const chatBottom = useRef<null | HTMLElement>(null);

  const [messageInfoIndex, setMessageInfoIndex] = useState(-1);

  function handleMessageInfoIndex(i: number): void {
    if (i === messageInfoIndex) setMessageInfoIndex(-1);
    else setMessageInfoIndex(i);
  }

  useEffect(() => {
    return setUpChatSocket(queryClient, activeChat, setIsTyping);
  }, [queryClient, activeChat]);

  // disable is typing when receive a message
  useEffect(() => {
    setIsTyping([]);
  }, [messages]);

  // remove notifications when open chat
  useEffect(() => {
    if (activeChat.destinationId && messages?.pages) {
      queryClient.setQueryData(
        ["chat", activeChat.destinationId, activeChat.destinationType],
        (msgs: { pages: message[][]; pageParams: number[] }) => {
          const newPages = [...msgs.pages].map((page, i) => {
            if (i !== 0) return page;
            else
              return page.map((msg) =>
                msg.from === user?.id || msg.readBy.includes(user?.id as string)
                  ? msg
                  : { ...msg, readBy: [...msg.readBy, user?.id] }
              );
          });

          return {
            ...msgs,
            pages: newPages,
          };
        }
      );
    }
  }, [messages, activeChat, queryClient, user]);

  if (activeChat.destinationId && (isLoading || isLoadingUser))
    return <Loader />;

  if (!activeChat.destinationId)
    return <h1 className=" text-8xl text-center text-white"> LET'S CHAT</h1>;

  function sendMessage(formData: { message?: string }) {
    if (!formData.message) return;
    socket.emit("send-message", formData.message, activeChat);

    const msgObject: message = {
      from: user.id,
      content: formData.message,
      sentAt: Date.now(),
      readBy: [],
    };
    setValue("message", "");

    queryClient.setQueryData(
      ["chat", activeChat.destinationId, activeChat.destinationType],
      (msgs: { pages: message[][]; pageParams: number[] }) => {
        const newPages = msgs.pages.map((p) => [...p]);
        newPages[0].unshift(msgObject);

        return {
          ...msgs,
          pages: newPages,
        };
      }
    );

    queryClient.setQueryData(["contacts"], (cons: contact[]): contact[] => {
      return sortContacts(cons, activeChat, msgObject.content);
    });
  }

  socket.emit("readChat", activeChat);

  return (
    <div className="  overflow-hidden relative  h-full w-full grid grid-rows-[1fr_auto_auto] mx-auto  gap-2 divide-y-2 divide-slate-800 divide-opacity-40 px-2 pb-4">
      <div className=" px-2 pt-2 ">
        <ChatHeader activeChat={activeChat} />
      </div>
      <div
        className=" overflow-auto self-end max-h-full  flex flex-col-reverse"
        ref={chatBoxRef}
      >
        {/* <span ref={chatTop}></span> */}
        {/* {messages?.map((msg, i) => (
          <Message
            message={msg}
            showImg={msg.from !== messages[i + 1]?.from}
            handleClick={handleMessageInfoIndex}
            showMessageInfo={messageInfoIndex === i}
            index={i}
            showDate={i === 0 || !isSameDay(msg.sentAt, messages[i - 1].sentAt)}
          />
        ))} */}
        {isTyping.length > 0 && <IsTyping usersId={isTyping} />}
        <LoadMessagesPages
          data={messages || []}
          handleMessageClick={handleMessageInfoIndex}
          messageInfoIndex={messageInfoIndex}
          refChatTop={chatTop}
        />

        <span ref={chatBottom}></span>
      </div>

      <form
        className=" grid grid-cols-[5fr_auto] items-center  sm:gap-4 sm:p-4 gap-2 p-2  "
        onSubmit={handleSubmit(sendMessage)}
      >
        <MessageField
          register={register}
          name={"message"}
          inputChangeHandler={(e) => {
            if (e.target instanceof HTMLInputElement && e.target.value) {
              socket.emit("typing", activeChat);
            }
          }}
          chat={activeChat}
        />

        <button className=" p-2 bg-secondary_dark text-white text-center flex items-center justify-center  text-3xl sm:text-2xl rounded-lg">
          <IoMdSend />
        </button>
      </form>
    </div>
  );
}

function ChatHeader({ activeChat }: { activeChat: messageOptions }) {
  return activeChat.destinationType === "user" ? (
    <UserChatHeader id={activeChat.destinationId} />
  ) : (
    <GroupChatHeader id={activeChat.destinationId} />
  );
}

function UserChatHeader({ id }: { id: string }) {
  const { isLoading, user } = useUser(id);
  if (isLoading) return;

  return (
    <div className=" flex items-center gap-6">
      <img
        className=" rounded-full h-10 w-10"
        src={user?.photo || "./no-picture.webp"}
        alt=""
      />
      <h3 className=" text-xl font-semibold text-white">{user?.name}</h3>
    </div>
  );
}

function GroupChatHeader({ id }: { id: string }) {
  const { isLoading, group } = useGroup(id);
  if (isLoading) return;

  return (
    <div className=" flex items-center gap-6">
      <img
        className=" rounded-full h-10 w-10"
        src={group?.photo || "./no-picture.webp"}
        alt=""
      />
      <h3 className=" text-2xl font-semibold text-white">{group?.name}</h3>

      <div className=" ml-auto mr-4">
        <AddUserToGroup groupId={group.id} />
      </div>
    </div>
  );
}
