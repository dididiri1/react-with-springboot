import useCustomCart from "../../hooks/useCustomCart";
import CartItemComponent from "../cart/cartItemComponent";

const CartComponent = () => {
  const { loginState, loginStatus, cartItems, changeCart } = useCustomCart();

  return (
    <div className="w-full">
      {loginStatus && (
        <>
          {cartItems.status === "pending" && <div>Loading....</div>}
          {cartItems.status === "fulfilled" && (
            <>
              <div>{loginState.email}님 Cart</div>
              <div className="bg-orange-600 text-center text-white font-bold w-1/5 rounded-full m-1">
                {cartItems.items.length}
              </div>
              <ul>
                {Array.isArray(cartItems.items) &&
                  cartItems.items.map((item) => (
                    <CartItemComponent
                      cartItem={item}
                      key={item.cino}
                      changeCart={changeCart}
                    ></CartItemComponent>
                  ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CartComponent;
