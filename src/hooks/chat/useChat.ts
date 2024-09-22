import { useInfiniteQuery } from "@tanstack/react-query";
import { getChat } from "../../utils/chatApi";

export default function useChat(options: messageOptions) {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery<
    message[]
  >({
    queryKey: ["chat", options.destinationId, options.destinationType],
    queryFn: ({ pageParam = 1 }) =>
      getChat({ page: pageParam as number, ...options }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.length === 0) return;
      return allPages.length + 1;
    },
    initialPageParam: 1,
  });

  return { messages: data, isLoading, fetchNextPage, hasNextPage };
}
