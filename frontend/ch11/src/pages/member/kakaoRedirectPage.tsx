import { useEffect } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router";
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi";
import useZustandMember from "../../zstore/useZustandMember";

const KaKaoRedirectPage = () => {
  const { save } = useZustandMember();

  const [searchParams] = useSearchParams();

  const authCode = searchParams.get("code");

  const navigate = useNavigate();

  useEffect(() => {
    if (authCode) {
      getAccessToken(authCode).then((aceesToken) => {
        getMemberWithAccessToken(aceesToken).then((result) => {
          save(result);

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
