import React from "react";
import { useActionState } from "react";

interface LoginResult {
  email: string;
  signed: boolean;
}

const initState: LoginResult = {
  email: "",
  signed: false,
};

function LoginComponent() {
  const [state, action, isPending] = useActionState(
    async (state: LoginResult, formData: FormData) => {
      // 2초간 delay 시뮬레이션 (예: 로그인 API 호출)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // 폼 데이터에서 이메일 가져오기 (예시)
      const email = formData.get("email") as string | null;
      const pw = formData.get("pw") as string | null;

      // 간단 검증 및 상태 변경 (예시)
      if (email && pw) {
        return {
          email,
          signed: true,
        };
      }

      // 로그인 실패 시 초기 상태 반환
      return initState;
    },
    initState
  );

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {isPending && <div>로그인 처리중...</div>}
      <form action={action}>
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
              autoComplete="username"
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
              autoComplete="current-password"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full justify-center">
            <div className="w-2/5 p-6 flex justify-center font-bold">
              <button
                type="submit"
                className="rounded p-4 w-36 bg-blue-500 text-xl text-white"
              >
                LOGIN
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="mt-6 text-center">
        {state.signed ? (
          <div>환영합니다, {state.email}님!</div>
        ) : (
          <div>로그인 해주세요.</div>
        )}
      </div>
    </div>
  );
}

export default LoginComponent;
