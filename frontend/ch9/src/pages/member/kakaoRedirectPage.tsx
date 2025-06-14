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

  //const [social, setSocial] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (authCode) {
      getAccessToken(authCode).then((aceesToken) => {
        getMemberWithAccessToken(aceesToken).then((result) => {
          dispatch(save(result));

          if (result.social) {
            navigate("/member/modify");
          } else {
            navigate("/");
          }
        });
      });
    }
  }, [authCode]);

  return (
    <>
      <Navigate to={"/"}></Navigate>
    </>
  );
};

export default KaKaoRedirectPage;
