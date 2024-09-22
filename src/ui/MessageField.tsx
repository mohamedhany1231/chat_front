import React, { useEffect, useReducer, useRef } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface MessageFieldProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  chat?: messageOptions;
  inputChangeHandler?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function MessageField<T extends FieldValues>({
  register,
  name,
  inputChangeHandler,
  chat,
}: MessageFieldProps<T>) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [chat]);

  const { ref, ...rest } = { ...register(name) };
  return (
    <input
      // onKeyDownCapture={keyDownHandler}
      {...rest}
      onInput={inputChangeHandler}
      autoComplete="off"
      ref={(e) => {
        ref(e);
        inputRef.current = e;
      }}
      className={` 
       
        text-wrap  h-full min-h-10  grow border-2 border-main_dark border-opacity-50 transition-colors   focus:border-opacity-100  rounded-3xl min-w-12  text-stone-50 bg-secondary_darker  outline-none px-4 `}
    />
  );
}
