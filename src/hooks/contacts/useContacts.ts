import { useQuery } from "@tanstack/react-query";
import { getContacts } from "../../utils/contactsApi";

export default function useContacts() {
  const { data: contacts, isLoading } = useQuery({
    queryKey: ["contacts"],
    queryFn: getContacts,
  });

  return { contacts, isLoading };
}
