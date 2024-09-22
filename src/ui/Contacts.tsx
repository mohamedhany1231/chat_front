import React, { useContext, useState } from "react";
import Contact from "./Contact";
import AddContact from "./AddContact";
import useContacts from "../hooks/contacts/useContacts";
import Loader from "./Loader";
import { addContact } from "../utils/contactsApi";
import ActiveChatContext from "../context/ActiveChatContext";
import useUserData from "../hooks/user/useUserData";
import { useNavigate } from "react-router-dom";
import UserHeader from "./UserHeader";
import { motion } from "framer-motion";
import { IoMdContact } from "react-icons/io";
import { FaAnglesLeft } from "react-icons/fa6";

export default function Contacts() {
  const { user, isLoading: isLoadingUser } = useUserData();
  const navigate = useNavigate();
  if (!isLoadingUser && !user) navigate("/login");

  const [showAddContact, setShowAddContact] = useState(true);
  const { contacts, isLoading } = useContacts();

  const { activeChat, setActiveChat } = useContext(ActiveChatContext);

  const [isOpen, setIsOpen] = useState(true);
  if (isLoading || isLoadingUser) return <Loader />;

  const variants = {
    open: { x: "0%" },
    closed: { x: "-100%" },
  };

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{
        ...(isOpen ? variants.open : variants.closed),
        transition: {
          type: "spring",
          bounce: 0.4,
          duration: 0.4,
        },
      }}
      variants={variants}
      className=" absolute xl:relative h-full   xl:!translate-x-0 z-20"
    >
      <button
        onClick={() => setIsOpen((o) => !o)}
        className={`${
          isOpen
            ? "translate-x-[50%] hover:translate-x-[45%] -translate-y-[100%]"
            : " translate-x-[100%]"
        }  text-6xl absolute -right-0  top-[10%] z-10 bg-bg_darker   rounded-full p-2 hover:text-main_light transition-all   xl:hidden`}
      >
        {isOpen ? <FaAnglesLeft /> : <IoMdContact />}
      </button>

      {/* mask */}
      {isOpen && (
        <div
          onClick={() => {
            setIsOpen(false);
          }}
          className="xl:hidden fixed top-0 left-0 h-[100vh] w-[200vw] bg-black bg-opacity-30  z-0 "
        ></div>
      )}
      <div className="relative  h-full bg-bg_dark py-6  flex flex-col gap-8 min-w-0  overflow-y-auto">
        <h1 className="ml-10 text-3xl font-bold">Chats</h1>

        <div className="px-6">
          <div className=" mb-6">
            <UserHeader />
          </div>

          {showAddContact && <AddContact />}
        </div>
        {/* TODO: add buttons (unread groups all) */}

        <div className=" divide-y divide-slate-800 divide-opacity-40 flex flex-col  ">
          {contacts?.map((con) => (
            <Contact
              key={con.id}
              name={con.name}
              message={con.message}
              id={con.contactId}
              type={con.type}
              photo={con.photo}
              email={con.email}
              isActive={con.contactId === activeChat.destinationId}
              clickHandler={() => {
                setActiveChat({
                  // destinationId: con.userId,
                  destinationId: con.contactId,
                  // TODO: change destination  type
                  destinationType: con.email ? "user" : "group",
                });
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
