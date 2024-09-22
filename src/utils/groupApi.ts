import axios, { AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/groups",
  withCredentials: true,
});

export const createGroup = async (name: string) => {
  await axiosInstance.post("/", { name });
};

export const addUserToGroup = async (userId: string, groupId: string) => {
  await axiosInstance.post("/add-user", { userId, groupId });
};

export const removeUserFromGroup = async (userId: string, groupId: string) => {
  await axiosInstance.post("/remove-user", { userId, groupId });
};
export const getGroupData = async (groupId: string) => {
  if (!groupId) return {};
  const res = await axiosInstance.get(`/${groupId}`);

  return res.data.data.group;
};
