import React, { useState, ReactPortal } from "react";
import InputField from "./InputField";
import { useForm } from "react-hook-form";
import useAddContact from "../hooks/contacts/useAddContact";
import { createPortal } from "react-dom";
import { ImCross } from "react-icons/im";
import useCreateGroup from "../hooks/group/useCreateGroup";
import { IoTriangle } from "react-icons/io5";

type addContactType = "user" | "group" | "";

export default function AddContact() {
  const [addType, setAddType] = useState<addContactType>("");
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const closeMenu = () => setShowMenu(false);

  const resetMenu = () => {
    closeMenu();
    setAddType("");
  };

  console.log("show menu", showMenu, addType);
  return (
    <div className=" relative h-10">
      {!showMenu &&
        (addType === "group" ? (
          <AddGroup handleClose={resetMenu} />
        ) : addType === "user" ? (
          <AddUser handleClose={resetMenu} />
        ) : (
          <button
            className=" text-5xl text-main_dark ml-auto mr-4 block"
            onClick={() => {
              setShowMenu(true);
            }}
          >
            +
          </button>
        ))}

      <div className=" absolute top-4 right-4">
        {showMenu && (
          <AddContactMenu closeMenu={closeMenu} setAddType={setAddType} />
        )}
      </div>
    </div>
  );
}

function AddContactMenu({ closeMenu, setAddType }) {
  const options: addContactType[] = ["group", "user"];

  return (
    <>
      <div
        onClick={closeMenu}
        className="  h-screen w-screen fixed top-0 left-0 z-[1] "
      ></div>
      <div className="relative flex flex-col text-slate-200 bg-slate-950 text-center bold  divide-y divide-slate-800 divide-opacity-70  rounded-md py-2 z-10  w-40">
        {/* <span className=" absolute -top-4 text-2xl right-2 text-slate-950 ">
          <IoTriangle />
        </span> */}

        {options.map((op) => (
          <button
            className=" capitalize py-2 text-start px-4 w-full hover:bg-blue-200 hover:bg-opacity-5"
            onClick={(e) => {
              e.stopPropagation();
              setAddType(op);
              closeMenu();
            }}
          >
            add {op}
          </button>
        ))}
      </div>
    </>
  );
}

function AddUser({ handleClose }) {
  const { addContact, isLoading } = useAddContact();
  const { register, handleSubmit } = useForm();
  function submit(data) {
    addContact(data);
    handleClose();
  }

  return (
    <form className="flex gap-4 w-full" onSubmit={handleSubmit(submit)}>
      <div className="grow">
        <InputField
          name="userEmail"
          register={register}
          placeHolder={"contact email..."}
        />
      </div>
      <button
        className=" rounded-xl px-4 py-1 font-bold text-xl bg-blue-950"
        disabled={isLoading}
      >
        ADD
      </button>
      <button className=" px-4 py-1 font-bold text-xl" onClick={handleClose}>
        <ImCross />
      </button>
    </form>
  );
}

function AddGroup({ handleClose }) {
  const { createGroup, isLoading } = useCreateGroup();
  const { register, handleSubmit } = useForm();
  async function submit(data) {
    await createGroup(data.title);

    handleClose();
  }

  return (
    <form className="flex gap-4 w-full" onSubmit={handleSubmit(submit)}>
      <div className="grow">
        <InputField
          name="title"
          register={register}
          placeHolder={"group name"}
        />
      </div>
      <button
        className=" rounded-xl px-4 py-1 font-bold text-xl bg-blue-950"
        disabled={isLoading}
      >
        ADD
      </button>
      <button className=" px-4 py-1 font-bold text-xl" onClick={handleClose}>
        <ImCross />
      </button>
    </form>
  );
}
