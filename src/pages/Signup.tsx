import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../ui/InputField";
import { useNavigate } from "react-router-dom";
import useSignUp from "../hooks/user/useSignUp";
import useUserData from "../hooks/user/useUserData";

export default function SignUp() {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<signUpObject>();
  const { signUp, isLoading } = useSignUp();

  const { user, isLoading: isLoadingUser } = useUserData();

  if (!isLoadingUser && user) navigate("/");

  function signUpFunc(data: signUpObject) {
    signUp(data);
  }
  return (
    <div className=" h-[100vh] bg-slate-950 text-stone-50 py-[5%]">
      <h1 className=" text-center text-5xl font-bold mb-4"> Chat App</h1>
      <p className=" text-2xl text-center opacity-70">start chatting ✉️</p>
      <form
        className=" bg-slate-900 bg-opacity-40 mx-auto border-cyan-200 border-opacity-25 border min-h-[60%] p-[2%] mt-10 w-[50%]  rounded-3xl flex flex-col gap-10 "
        onSubmit={handleSubmit(signUpFunc)}
      >
        <div>
          <h1 className=" text-center text-3xl font-bold mb-4 ">SIGN UP</h1>
          <p className="text-center text-xl opacity-70">
            new here ? , start chatting now.
          </p>
        </div>
        <div className=" flex flex-col gap-10">
          <InputField register={register} name="name" label="name" />
          <InputField register={register} name="email" label="email" />
          <InputField register={register} name="password" label="password" />
          <InputField
            register={register}
            name="confirmPassword"
            label="confirm password"
          />
        </div>
        <button
          className=" text-xl bg-sky-900 rounded-xl ml-auto disabled:opacity-40 py-2 px-4"
          disabled={isLoading}
        >
          SIGN UP
        </button>

        <p className="mt-auto text-end">
          has account ? go to
          <span
            className=" underline text-cyan-700 cursor-pointer hover:text-cyan-100"
            onClick={() => navigate("/login")}
          >
            login page
          </span>
        </p>
      </form>
    </div>
  );
}
