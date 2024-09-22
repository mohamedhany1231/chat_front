import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../utils/userApi";

export default function useLogin() {
  const queryClient = useQueryClient();
  const { mutateAsync: login, isPending: isLoading } = useMutation({
    mutationFn: (data: loginObject) => loginApi(data),

    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["me"] }),
  });

  return { login, isLoading };
}
