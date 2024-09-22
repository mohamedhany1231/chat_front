import Loader from "./Loader";
import useContacts from "../hooks/contacts/useContacts";
import Modal from "./Modal";
import { motion } from "framer-motion";
import useGroup from "../hooks/group/useGroup";
import useAddToGroup from "../hooks/group/useAddToGroup";
import { FaUserPlus } from "react-icons/fa";
import { useState } from "react";
import { TiUserAdd } from "react-icons/ti";

export function AddUserToGroup({ groupId }) {
  const { contacts, isLoading } = useContacts();
  const { group, isLoading: isLoadingGroup } = useGroup(groupId);
  const { addUserToGroup, isLoading: isAdding } = useAddToGroup();
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading || isLoadingGroup) return <Loader />;

  async function addToGroup(userId: string) {
    await addUserToGroup({ groupId, userId });
  }

  return (
    <>
      {
        <button
          className=" text-3xl  text-white"
          onClick={() => setIsOpen((o) => !o)}
        >
          <FaUserPlus />
        </button>
      }

      {/* mask */}
      {isOpen && (
        <div
          onClick={() => {
            setIsOpen(false);
          }}
          className=" fixed top-0 left-0 h-[100vh] w-[200vw] bg-black bg-opacity-30  z-0 "
        ></div>
      )}

      <motion.div
        initial={{ x: "100%" }}
        variants={{ open: { x: "0" }, close: { x: "100%" } }}
        transition={{ type: "spring", duration: 0.4 }}
        animate={isOpen ? "open" : "close"}
        className=" flex flex-col gap-2 absolute top-0 right-0 min-w-[30vw] bg-bg_dark h-screen overflow-y-auto z-20 max-w-[50vw] px-4 py-8"
      >
        <h3 className=" text-xl sm:text-2xl lg:text-4xl capitalize text-center">
          add to {group.name}
        </h3>
        {contacts?.map((con) => {
          if (con.type === "group") return;
          // if (
          //   group?.contact?.filter(
          //     (groupCon) => groupCon.userId == con.contactId
          //   ).length > 0
          // )
          //   return <p className=" text-2xl ">no contacts to add</p>;
          return (
            <div className="  flex gap-2  sm:gap-8 items-center   ">
              <img
                className=" rounded-full sm:h-10 sm:w-10 w-6 h-6"
                src={con.photo || "./no-picture.webp"}
                alt=""
              />
              <p className=" font-bold text-lg sm:text-xl">{con.name}</p>
              <div className=" ml-auto">
                <button
                  className=" font-bold text-5xl px-2 hover:text-cyan-100 "
                  onClick={() => addToGroup(con.contactId)}
                  disabled={isAdding}
                >
                  <TiUserAdd />
                </button>
              </div>
            </div>
          );
        })}
      </motion.div>
    </>
  );
}
