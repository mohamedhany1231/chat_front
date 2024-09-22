import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../utils/userApi";

export default function useSignUp() {
  const { mutateAsync: signUp, isPaused: isLoading } = useMutation({
    mutationFn: (data: signUpObject) => signUpApi(data),
  });

  return { signUp, isLoading };
}
