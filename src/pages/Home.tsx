import React, { createContext, useState } from "react";
import ChatBox from "../ui/ChatBox";
import Contacts from "../ui/Contacts";
import useUserData from "../hooks/user/useUserData";
import { Outlet, useNavigate } from "react-router-dom";
import ChatContext from "../context/ActiveChatContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function Home() {
  const [activeChat, setActiveChat] = useState<messageOptions>({
    destinationId: "",
    destinationType: "user",
  });

  return (
    <ChatContext.Provider value={{ activeChat, setActiveChat }}>
      <div className=" h-[100vh] bg-bg_darker text-white  ">
        <div className="flex  xl:grid xl:grid-cols-[1fr_3fr] h-full divide-x-2 divide-slate-800 divide-opacity-40">
          <Contacts />
          <div className=" w-[100vw] xl:w-auto  flex-grow">
            <Outlet />
          </div>
        </div>
      </div>

      <ReactQueryDevtools initialIsOpen={false} />
    </ChatContext.Provider>
  );
}

export { ChatContext };
