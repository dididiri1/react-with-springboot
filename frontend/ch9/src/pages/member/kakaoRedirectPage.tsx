import { useEffect, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router";
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../../store";
import { save } from "../../features/loginSlice";

const KaKaoRedirectPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [searchParams] = useSearchParams();

  const authCode = searchParams.get("code");

  const [social, setSocial] = useState<boolean>(false);

  useEffect(() => {
    if (authCode) {
      getAccessToken(authCode).then((aceesToken) => {
        getMemberWithAccessToken(aceesToken).then((result) => {
          dispatch(save(result));

          setSocial(result.social);
        });
      });
    }
  }, [authCode]);

  if (social) {
    return <Navigate to={"/member/modify"}></Navigate>;
  }

  return (
    <>
      <Navigate to={"/"}></Navigate>
    </>
  );
};

export default KaKaoRedirectPage;
