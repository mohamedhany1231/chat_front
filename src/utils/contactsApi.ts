import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/contacts/my-contacts",
  withCredentials: true,
});

export const addContact = async ({
  userEmail,
}: addContactRequest): Promise<void> => {
  await axiosInstance.post("/", { userEmail });
};

export const getContacts = async (): Promise<contact[]> => {
  const response = await axiosInstance.get<{ data: { contacts: contact[] } }>(
    "/"
  );

  return response.data.data.contacts;
};
