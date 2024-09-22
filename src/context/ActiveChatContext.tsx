import { createContext } from "react";

const contextDefault: {
  activeChat: messageOptions;
  setActiveChat: (x: messageOptions) => void;
} = {
  activeChat: { socketId: "", destinationType: "user", id: "" },
  setActiveChat: () => {
    return;
  },
};
const ChatContext = createContext(contextDefault);

export default ChatContext;
