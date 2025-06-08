import axios from "axios";

export const loginPost = async (email: string, pw: string) => {
  const headers = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const form = new FormData();
  form.append("username", email);
  form.append("password", pw);

  const res = await axios.post(
    "http://localhost:8080/api/member/login",
    form,
    headers
  );

  // 2초간 delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return res.data;
};
