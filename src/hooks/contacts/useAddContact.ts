import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addContact as addContactApi } from "../../utils/contactsApi";

export default function useAddContact() {
  const queryClient = useQueryClient();
  const { mutateAsync: addContact, isPending: isLoading } = useMutation({
    mutationFn: (data: addContactRequest) => addContactApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });

  return { addContact, isLoading };
}
