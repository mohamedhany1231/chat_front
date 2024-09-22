import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/users",
  withCredentials: true,
});

export async function login({ email, password }: loginObject): Promise<void> {
  await axiosInstance.post("/login", { email, password });
}

export async function signUp({
  name,
  email,
  password,
  confirmPassword,
}: signUpObject): Promise<void> {
  await axiosInstance.post("/signup", {
    name,
    email,
    password,
    confirmPassword,
  });
}

export async function getUserData() {
  const res = await axiosInstance.get("/me");

  const user: user = res.data.data.user;

  return user;
}

export async function getUser(id: string) {
  const res = await axiosInstance.get(`/${id}`);

  const user: user = res.data.data.user;

  return user;
}

export async function updateUser(data) {
  const body = new FormData();
  body.append("photo", data.photo[0]);
  body.append("name", data.name);
  await axiosInstance.post("/update-me", body);
}
