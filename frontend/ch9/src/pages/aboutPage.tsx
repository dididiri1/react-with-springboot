import useCustomLogin from "../hooks/useCustomLogin";

function AboutPage() {
  const { loginStatus, moveToLoginReturn } = useCustomLogin();

  if (!loginStatus) {
    console.log("loginStatus", loginStatus);
    return moveToLoginReturn();
  }
  return (
    <div className="text-3xl">
      <div>About Page</div>
    </div>
  );
}

export default AboutPage;
