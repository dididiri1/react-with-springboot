import { useState } from "react";
import ResultModal from "../common/resultModal";
import useCustomLogin from "../../hooks/useCustomLogin";
import KakaoLoginComponent from "./kakaoLoginComponent";

interface LoginResult {
  email: string;
  signed: boolean;
}

const initState: LoginResult = {
  email: "",
  signed: false,
};

function LoginComponent() {
  const { doLogin, loginStatus, moveToPath } = useCustomLogin();

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const handleLogin = () => {
    doLogin(email, pw);
  };

  const closeModal = () => {
    moveToPath("/");
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {loginStatus === "pending" && (
        <div className="bg-amber-300">로그인 중...</div>
      )}

      {loginStatus === "fulfilled" && (
        <ResultModal
          title="Login Result"
          content="로그인 되었습니다."
          callbackFn={closeModal}
        />
      )}
      {loginStatus === "fulfilled" && (
        <div className="bg-green-300">로그인 성공!</div>
      )}
      {loginStatus === "rejected" && (
        <div className="bg-red-300">로그인 실패</div>
      )}

      <div className="flex justify-center">
        <div className="text-4xl m-4 p-4 font-extrabold text-blue-500">
          Login Component
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-full p-6 text-left font-bold">Email</div>
          <input
            className="w-full p-6 rounded-r border border-solid border-neutral-500 shadow-md"
            name="email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-full p-6 text-left font-bold">Password</div>
          <input
            className="w-full p-6 rounded-r border border-solid border-neutral-500 shadow-md"
            name="pw"
            type="password"
            onChange={(e) => setPw(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full justify-center">
          <div className="w-2/5 p-6 flex justify-center font-bold">
            <button
              type="submit"
              className="rounded p-4 w-36 bg-blue-500 text-xl text-white"
              onClick={() => handleLogin()}
            >
              LOGIN
            </button>
          </div>
        </div>
      </div>
      <KakaoLoginComponent />
    </div>
  );
}

export default LoginComponent;
