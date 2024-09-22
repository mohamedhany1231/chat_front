import React, { useEffect, useReducer, useRef } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface inputFieldProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  label?: string;
  placeHolder?: string;
  chat?: messageOptions;
  inputChangeHandler?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  type?: string;
}

export default function InputField<T extends FieldValues>({
  register,
  name,
  label,
  placeHolder,
  inputChangeHandler,
  chat,
  type = "text",
}: inputFieldProps<T>) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [chat]);

  const { ref, ...rest } = { ...register(name) };
  return (
    <div className={label && `grid grid-cols-[100px_1fr] items-center`}>
      {label && <label className=" bold text-lg sm:text-xl">{label}</label>}
      <input
        // onKeyDownCapture={keyDownHandler}
        type={type}
        {...rest}
        onInput={inputChangeHandler}
        placeholder={placeHolder}
        autoComplete="off"
        ref={(e) => {
          ref(e);
          inputRef.current = e;
        }}
        className={` ${
          label ? "" : "w-full"
        } text-wrap  h-full min-h-10  grow border-2 border-main_dark border-opacity-50 transition-colors   focus:border-opacity-100  rounded-3xl min-w-12  text-stone-50 bg-secondary_darker  outline-none px-4 `}
      />
    </div>
  );
}
