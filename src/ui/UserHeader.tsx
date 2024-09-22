import React from "react";
import Modal from "./Modal";
import Loader from "./Loader";
import useUserData from "../hooks/user/useUserData";
import { useForm } from "react-hook-form";
import InputRow from "./InputRow";
import useUpdateUser from "../hooks/user/useUpdateUser";

export default function UserHeader() {
  const { register, handleSubmit } = useForm();
  const { user, isLoading: isLoadingUser } = useUserData();
  const { isUpdating, updateUser, isSuccess } = useUpdateUser();

  if (isLoadingUser) return <Loader />;

  function handleValid(data) {
    updateUser(data);
  }

  return (
    <Modal>
      <Modal.Open>
        <div className=" text-white text-xl font-bold flex  items-center cursor-pointer hover:underline hover:text-slate-200 transition-colors ">
          <img
            className=" rounded-full h-14 w-14 inline-block mr-2"
            src={user?.photo || "./no-picture.webp"}
          />

          <span>{user?.name}</span>
        </div>
      </Modal.Open>
      <Modal.Window title={"profile settings"}>
        <form
          className="flex flex-col gap-6 sm:gap-10"
          onSubmit={handleSubmit(handleValid)}
        >
          <InputRow
            fieldName={"photo"}
            type={"file"}
            register={{
              ...register("photo"),
            }}
            // error={response?.error}
          />

          <InputRow
            fieldName={"name"}
            type={"text"}
            register={{
              ...register("name", {
                required: { value: true, message: "field required" },
                value: user?.name,

                minLength: {
                  value: 3,
                  message: "name must be 3 or more characters",
                },
                maxLength: {
                  value: 20,
                  message: "name must be 20 or less characters",
                },
              }),
            }}
            // error={errors?.name?.message}
          />

          <div className=" flex flex-col-reverse justify-end gap-4 sm:flex-row sm:gap-6 ">
            <Modal.Close>
              <button
                type="reset"
                className=" text-bold mr-4 rounded-full bg-red-500 px-4 py-2 text-lg  font-bold text-[#fff] hover:bg-red-600 sm:mt-4 sm:px-8 sm:py-4 sm:text-3xl"
              >
                Cancel
              </button>
            </Modal.Close>
            <button
              disabled={isUpdating}
              className=" text-bold mr-4 rounded-full bg-slate-500 px-4 py-2 text-lg  font-bold text-[#fff] hover:bg-slate-400 sm:mt-4 sm:px-8 sm:py-4 sm:text-3xl"
            >
              Update
            </button>
          </div>
        </form>
      </Modal.Window>
    </Modal>
  );
}
