import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../../store";
import { save } from "../../features/loginSlice";

const KaKaoRedirectPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [searchParams] = useSearchParams();

  const authCode = searchParams.get("code");

  useEffect(() => {
    if (authCode) {
      getAccessToken(authCode).then((aceesToken) => {
        getMemberWithAccessToken(aceesToken).then((result) => {
          dispatch(save(result));
        });
      });
    }
  }, [authCode]);

  return (
    <div>
      <div>Kakao Login Redirect</div>
      <div>{authCode}</div>
    </div>
  );
};

export default KaKaoRedirectPage;
