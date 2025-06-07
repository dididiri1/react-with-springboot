import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../store";
import { loginPostAsync, logout, save } from "../features/loginSlice";
import { Navigate, useNavigate } from "react-router";
import { useEffect } from "react";
import { getCookie } from "../util/cookieUtil";

const useCustomLogin = () => {
  const dispatch = useDispatch<AppDispatch>();

  const loginState = useSelector((state: RootState) => state.loginSlice);

  const loginStatus = loginState.status;

  useEffect(() => {
    if (!loginStatus) {
      const cookieData = getCookie("member");

      if (cookieData) {
        dispatch(save(cookieData));
      }
    }
  }, []);

  const navigate = useNavigate();

  const doLogin = async (email: string, pw: string) => {
    dispatch(loginPostAsync({ email, pw }));
  };

  const doLogout = () => {
    dispatch(logout(null));
  };

  const moveToLogin = () => {
    navigate("/member/login");
  };

  const moveToLoginReturn = () => {
    // 로그인 페이지로 이동 컴포넌트
    return <Navigate replace to="/member/login" />;
  };

  const moveToPath = (path: string) => {
    // 페이지 이동
    navigate({ pathname: path }, { replace: true });
  };

  return {
    loginState,
    loginStatus,
    doLogin,
    doLogout,
    moveToLogin,
    moveToLoginReturn,
    moveToPath,
  };
};

export default useCustomLogin;
