import { SetStateAction } from "react";
import socket from "./socket";
import { QueryClient } from "@tanstack/react-query";
import { sortContacts } from "./helperFunctions";

export function setUpChatSocket(
  queryClient: QueryClient,
  activeChat: messageOptions,
  setIsTyping: {
    (value: SetStateAction<string[]>): void;
  }
) {
  socket.on("message", (message: string, sendingOptions: messageOptions) => {
    const msgObject: message = {
      from: sendingOptions.destinationId,
      content: message,
      sentAt: Date.now(),
      readBy: [],
    };
    const queryKey = [
      "chat",
      sendingOptions.destinationId,
      sendingOptions.destinationType,
    ];

    const queryState = queryClient.getQueryState(queryKey);

    if (queryState?.status === "success") {
      queryClient.setQueryData(
        queryKey,
        (msgs: { pages: message[][]; pageParams: number[] }) => {
          const newPages = msgs.pages.map((p) => [...p]);
          newPages[0].unshift(msgObject);

          return {
            ...msgs,
            pages: newPages,
            msgObject,
          };
        }
      );
    }
    // else {
    //   queryClient.fetchInfiniteQuery({
    //     queryKey,
    //     initialPageParam: 1,
    //   });
    // }

    queryClient.setQueryData(["contacts"], (cons: contact[]): contact[] => {
      return sortContacts(
        cons,
        {
          destinationId: sendingOptions.destinationId,
          destinationType: "user",
        },
        msgObject.content
      );
    });
  });

  let timeoutId: number | undefined = undefined;
  socket.on("typing", (options: messageOptions, userId: string) => {
    if (options.destinationId === activeChat.destinationId) {
      clearTimeout(timeoutId);
      setIsTyping((typing) =>
        typing.includes(userId) ? typing : [...typing, userId]
      );
      timeoutId = setTimeout(() => {
        setIsTyping([]);
      }, 1000);
    }
  });

  socket.on("userChatRead", (userId: string) => {
    const queryKey = ["chat", userId, "user"];

    const queryState = queryClient.getQueryState(queryKey);

    if (queryState?.status === "success") {
      queryClient.setQueryData(
        queryKey,
        (messages: { pages: message[][]; pageParams: number[] }) => {
          return {
            pageParams: messages.pageParams,
            pages: [...messages.pages].map((p) =>
              p.map((msg) => {
                return { ...msg, isRead: true };
              })
            ),
          };
        }
      );
    }
    //  else
    //   queryClient.fetchInfiniteQuery({
    //     queryKey,
    //     initialPageParam: 1,
    //     queryFn: () => getChat,
    //   });
  });
  return () => {
    socket.off("message");
    socket.off("typing");
    socket.off("userChatRead");
  };
}
