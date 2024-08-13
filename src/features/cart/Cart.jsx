import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "./cartSlice";

function Cart() {
  const username = useSelector((state) => state.user.username);

  const cart = useSelector(getCart);

  const dispatch = useDispatch();

  function handleClearCart() {
    dispatch(clearCart());
  }

  return (
    <div className='py-3 px-4 '>
      <LinkButton to='/menu'>&larr; Back to menu</LinkButton>
      <h2 className='mt-7 text-xl font-semibold'>
        Your cart, {cart.length > 0 && username}{" "}
        {cart.length === 0 && "is empty"}
      </h2>

      <ul className='divide-y divide-stone-200 border-b mt-3'>
        {cart.map((item) => (
          <CartItem item={item} key={item.key} />
        ))}
      </ul>
      {cart.length === 0 ? (
        "Please add items into your cart"
      ) : (
        <div className='mt-6 space-x-2'>
          <Button to='/order/new' type='primary'>
            Order pizzas
          </Button>

          <Button type='secondary' onClick={handleClearCart}>
            Clear cart
          </Button>
        </div>
      )}
    </div>
  );
}

export default Cart;
