import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../../utils/userApi";

export default function useUserData() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getUserData,
    retry: false,
  });

  return { user, isLoading };
}
