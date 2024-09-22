import { getGroupData } from "../../utils/groupApi";

import { useQuery } from "@tanstack/react-query";

export default function useGroup(groupId: string) {
  const { data: group, isLoading } = useQuery({
    queryKey: ["group", groupId],
    queryFn: () => getGroupData(groupId),
  });

  return { group, isLoading };
}
