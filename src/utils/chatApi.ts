import axios, { AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/messages",
  withCredentials: true,
});

interface getChatProps extends messageOptions {
  page: number;
}
export const getChat = async (options: getChatProps) => {
  if (!options.destinationId) return;
  const res: AxiosResponse<{ data: { messages: message[] } }> =
    options.destinationType === "user"
      ? await axiosInstance.get(
          `/chat/${options.destinationId}?page=${options.page}`
        )
      : await axiosInstance.get(
          `/group/${options.destinationId}?page=${options.page}`
        );

  const messages = res.data.data.messages;

  return messages;
};
