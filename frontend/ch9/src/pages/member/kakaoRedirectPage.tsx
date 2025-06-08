import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi";

const KaKaoRedirectPage = () => {
  const [searchParams] = useSearchParams();

  const authCode = searchParams.get("code");

  useEffect(() => {
    if (authCode) {
      getAccessToken(authCode).then((aceesToken) => {
        console.log(aceesToken);

        getMemberWithAccessToken(aceesToken);
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
