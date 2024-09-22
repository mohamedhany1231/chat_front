import React from "react";
import InputField from "../ui/InputField";
import { useForm } from "react-hook-form";
import useCreateGroup from "../hooks/group/useCreateGroup";
import useAddToGroup from "../hooks/group/useAddToGroup";

export default function Group() {
  const { handleSubmit, formState, register } = useForm();

  const { createGroup, isLoading: isCreatingGroup } = useCreateGroup();

  async function submitGroup(data) {
    await createGroup(data.title);
  }

  const { addUserToGroup, isLoading: isAdding } = useAddToGroup();

  async function addUser(data) {
    await addUserToGroup({ userId: data.userId, groupId: data.groupId });
  }

  return (
    <div>
      <div className=" border border-cyan-700">
        <h2 className="text-3xl text-center"> create group</h2>
        <form onSubmit={handleSubmit(submitGroup)}>
          <InputField register={register} placeHolder="title" name="title" />
          <button disabled={isCreatingGroup}> create</button>
        </form>
      </div>
      <div className=" border border-cyan-700 mt-4">
        <h2 className="text-3xl text-center"> create group</h2>
        <form onSubmit={handleSubmit(addUser)}>
          <InputField register={register} placeHolder="userId" name="userId" />
          <InputField
            register={register}
            placeHolder="groupId"
            name="groupId"
          />
          <button disabled={isCreatingGroup}> create</button>
        </form>
      </div>
    </div>
  );
}
