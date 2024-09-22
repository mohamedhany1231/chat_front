import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "../../utils/userApi";

export default function useUpdateUser() {
  const queryClient = useQueryClient();
  const {
    mutateAsync: updateUser,
    isPending: isUpdating,
    isSuccess,
  } = useMutation({
    mutationFn: (data) => updateUserApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });

  return { updateUser, isUpdating, isSuccess };
}
