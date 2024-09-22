import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeUserFromGroup as removeUserFromGroupApi } from "../../utils/groupApi";
export default function useRemoveFromGroup() {
  const { mutateAsync: removeUserFromGroup, isPending: isLoading } =
    useMutation({
      mutationFn: (userGroup: userGroupOption) =>
        removeUserFromGroupApi(userGroup.userId, userGroup.groupId),
    });

  return { removeUserFromGroup, isLoading };
}
