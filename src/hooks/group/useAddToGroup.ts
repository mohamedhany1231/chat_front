import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUserToGroup as addUserToGroupApi } from "../../utils/groupApi";
export default function useAddToGroup() {
  const { mutateAsync: addUserToGroup, isPending: isLoading } = useMutation({
    mutationFn: (userGroup: userGroupOption) =>
      addUserToGroupApi(userGroup.userId, userGroup.groupId),
  });

  return { addUserToGroup, isLoading };
}
