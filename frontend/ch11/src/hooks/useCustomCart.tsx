import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../store";
import { useEffect } from "react";
import useCustomLogin from "./useCustomLogin";
import { getCartItemsAsync } from "../features/cartSlice";

function useCustomCart() {
  const { loginState, loginStatus } = useCustomLogin();
  const cartItems = useSelector((state: RootState) => state.cartSlice);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (loginStatus) {
      dispatch(getCartItemsAsync());
    }
  }, [loginStatus]);

  return { loginState, loginStatus, cartItems };
}

export default useCustomCart;
