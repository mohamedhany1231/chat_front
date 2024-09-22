import { useForm } from "react-hook-form";
import InputField from "../ui/InputField";
import useLogin from "../hooks/user/useLogin";
import { useNavigate } from "react-router-dom";
import useUserData from "../hooks/user/useUserData";
import { useEffect } from "react";

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<loginObject>();
  const { login, isLoading } = useLogin();

  const { user, isLoading: isLoadingUser } = useUserData();

  useEffect(() => {
    if (!isLoadingUser && user) navigate("/");
  }, [isLoadingUser, user, navigate]);

  function loginFunc(data: loginObject) {
    login(data);
  }

  return (
    <div className=" h-[100vh] bg-slate-950 text-stone-50 py-[5%]">
      <h1 className=" text-center text-5xl font-bold mb-4"> Chat App</h1>
      <p className=" text-2xl text-center opacity-70">start chatting ✉️</p>
      <form
        className=" bg-slate-900 bg-opacity-40 mx-auto border-cyan-200 border-opacity-25 border min-h-[60%] p-[2%]  mt-10 w-[50%]  rounded-3xl flex flex-col gap-10 "
        onSubmit={handleSubmit(loginFunc)}
      >
        <div>
          <h1 className=" text-center text-3xl font-bold mb-4 ">LOGIN</h1>
          <p className="text-center text-xl opacity-70">
            One log in, endless conversations.
          </p>
        </div>
        <div className=" flex flex-col gap-10">
          <InputField register={register} name="email" label="email" />
          {/* <input {...register("test")} /> */}
          <InputField
            register={register}
            name="password"
            label="password"
            type="password"
          />
        </div>
        <button
          className=" text-xl bg-sky-900 rounded-xl ml-auto disabled:opacity-40 py-2 px-4"
          disabled={isLoading}
        >
          LOGIN
        </button>
        <p className="mt-auto text-end">
          got to
          <span
            className=" underline text-cyan-700 cursor-pointer hover:text-cyan-100"
            onClick={() => navigate("/signup")}
          >
            sign-up page
          </span>
        </p>
      </form>
    </div>
  );
}
