import { NavLink } from "react-router";
import useZustandCount from "../zstore/useZustandCount";

function MainPage() {
  const { current, inc, dec } = useZustandCount();

  return (
    <div className="text-3xl">
      <div className="flex">
        <NavLink to="/">Main</NavLink>
      </div>

      <div>Main Page</div>
      <div>{current}</div>
      <button onClick={inc}>INC</button>
      <button onClick={dec}>INC</button>
    </div>
  );
}

export default MainPage;
