import useCustomLogin from "../../hooks/useCustomLogin";

const CartComponent = () => {
  const { loginState, loginStatus } = useCustomLogin();

  return (
    <div className="w-full">
      {loginStatus && <div>{loginState.email}님 Cart</div>}
    </div>
  );
};

export default CartComponent;
