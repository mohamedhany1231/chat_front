import { useQuery } from "@tanstack/react-query";
import { getUser as getUserApi } from "../../utils/userApi";

export default function useUser(id: string) {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserApi(id),
  });

  return { user, isLoading };
}
