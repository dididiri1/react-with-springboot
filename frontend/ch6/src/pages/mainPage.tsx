import { NavLink } from "react-router";

function MainPage() {
  return (
    <div className="text-3xl">
      <div className="flex">
        <NavLink to="/">Main</NavLink>
      </div>
    </div>
  );
}

export default MainPage;
