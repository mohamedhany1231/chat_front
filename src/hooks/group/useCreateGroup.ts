import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGroup as createGroupApi } from "../../utils/groupApi";
export default function useCreateGroup() {
  const queryClient = useQueryClient();
  const { mutateAsync: createGroup, isPending: isLoading } = useMutation({
    mutationFn: (name: string) => createGroupApi(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });

  return { createGroup, isLoading };
}
