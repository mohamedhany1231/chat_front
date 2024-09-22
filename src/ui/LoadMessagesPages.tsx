import { InfiniteData } from "@tanstack/react-query";
import { Message } from "./Message";
import { isSameDay } from "date-fns";

interface loadMessagesPagesPrams {
  data: InfiniteData<message[], unknown>;
  handleMessageClick: (x: number) => void;
  messageInfoIndex: number;
  refChatTop: any;
}
export function LoadMessagesPages({
  data,
  handleMessageClick,
  messageInfoIndex,
  refChatTop,
}: loadMessagesPagesPrams) {
  return data.pages.map((page, pageIndex, arr) => {
    return page.map((msg, i, curPage) => (
      <>
        {/* ref point to message in the middle to fetch new message before user scroll to the top  */}
        {pageIndex === arr.length - 1 && i === page.length - 5 ? (
          <Message
            message={msg}
            showImg={
              // add img to the last message sent by that user
              i !== 0
                ? msg.from !== curPage[i - 1]?.from
                : arr[pageIndex - 1] &&
                  msg.from !== arr[pageIndex - 1].slice(-1)[0]?.from
            }
            handleClick={handleMessageClick}
            showMessageInfo={messageInfoIndex === i}
            index={i}
            showDate={
              // if last array is empty  = all messages has been fetched
              arr[arr.length - 1][0] === undefined &&
              // add date to top of the chat
              pageIndex === arr.length - 2 &&
              i === curPage.length - 1
                ? true
                : // add date to top of the first message in that date
                i === 0
                ? pageIndex === page.length - 1 ||
                  (!(pageIndex === 0) &&
                    !isSameDay(msg.sentAt, arr[pageIndex - 1][0]?.sentAt))
                : !isSameDay(msg.sentAt, curPage[i - 1].sentAt)
            }
            refChatTop={refChatTop}
          />
        ) : (
          <Message
            message={msg}
            showImg={
              i !== 0
                ? msg.from !== curPage[i - 1]?.from
                : arr[pageIndex - 1] &&
                  msg.from !== arr[pageIndex - 1].slice(-1)[0]?.from
            }
            handleClick={handleMessageClick}
            showMessageInfo={messageInfoIndex === i}
            index={i}
            showDate={
              arr[arr.length - 1][0] === undefined &&
              pageIndex === arr.length - 2 &&
              i === curPage.length - 1
                ? true
                : i === 0
                ? pageIndex === page.length - 1 ||
                  (!(pageIndex === 0) &&
                    !isSameDay(msg.sentAt, arr[pageIndex - 1][0]?.sentAt))
                : !isSameDay(msg.sentAt, curPage[i - 1].sentAt)
            }
          />
        )}
      </>
    ));
  });
}
