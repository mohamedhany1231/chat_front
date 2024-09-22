function InputRow({
  fieldName,
  register,
  type,
  error,
  value,
  disableDarkMode = false,
}) {
  return (
    <div className=" text-base sm:text-lg md:text-xl flex gap-4 items-center ">
      <div className=" flex justify-between">
        <label className=" mb-2 block pl-4 capitalize">
          {fieldName === "confirmPassword" ? "confirm password" : fieldName}
        </label>
        {error && (
          <p className=" ml-auto  inline-block whitespace-nowrap  text-sm font-bold   text-red-500 sm:text-base md:text-lg lg:text-xl ">
            ** {error} **
          </p>
        )}
      </div>

      <input
        type={type}
        value={value}
        className={` block w-full  rounded-[2rem]  border-2  bg-opacity-50 px-3 py-1 outline-none  ${
          disableDarkMode
            ? "border-slate-800 bg-slate-800 focus:border-slate-600"
            : "border-slate-800 bg-slate-50 focus:border-slate-400 dark:border-slate-800 dark:bg-slate-800 dark:focus:border-slate-600"
        }  sm:px-6 sm:py-2`}
        {...register}
      ></input>
    </div>
  );
}
export default InputRow;

//   <p className="text-#f0f0f0  my-4 rounded-3xl border bg-red-400 px-6 py-2 text-xl font-bold dark:border-red-100">
// ** {error} **
// </p>
