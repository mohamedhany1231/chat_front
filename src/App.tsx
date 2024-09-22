import { useState } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Group from "./pages/Group";
import VideoCall from "./pages/VideoCall";
import ChatBox from "./ui/ChatBox";

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="/" element={<ChatBox />} />
              <Route path="/call/:id" element={<VideoCall />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/group" element={<Group />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
