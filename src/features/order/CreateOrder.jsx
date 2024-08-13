import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";
import { clearCart, getCart } from "../cart/cartSlice";
import store from "../../store";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const username = useSelector((state) => state.user.username);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // We can get data whatever action has return  , so we will use it to catch error happende din form validation
  const formErrors = useActionData();
  // console.log(formErrors);

  // const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);

  if (!cart.length) return <h2>Cart is Empty</h2>;

  return (
    <div className='px-4 py-6'>
      <h2 className='text-xl font-semibold mb-8'>Ready to order? Let's go!</h2>

      {/* //using Form provided by react */}
      {/* <Form method='POST' action="/order/new"> */}

      <Form method='POST'>
        <div className='mb-5 flex gap-2 flex-col sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>First Name</label>
          <div className='grow'>
            <input
              className='input w-full'
              type='text'
              name='customer'
              defaultValue={username}
              required
            />
          </div>
        </div>

        <div className='mb-5 flex gap-2 flex-col sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Phone number</label>
          <div className='grow'>
            <input className='input w-full' type='tel' name='phone' required />
            {formErrors?.phone && (
              <p className='text-xs mt-2 text-red-700 p-2 bg-red-200 rounded-md'>
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className='mb-5 flex gap-2 flex-col sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Address</label>
          <div className='grow'>
            <input
              className='input w-full'
              type='text'
              name='address'
              required
            />
          </div>
        </div>

        <div className='mb-12 flex items-center gap-5'>
          <input
            className='h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-1'
            type='checkbox'
            name='priority'
            id='priority'
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className='font-semibold' htmlFor='priority'>
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          {/* field that holds cart details, so that we collect it inside our beutiful form data , we have hidden*/}
          <input type='hidden' name='cart' value={JSON.stringify(cart)} />

          <Button type='primary' disabled={isSubmitting}>
            {isSubmitting ? "Placing" : "Order now"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// action to handle form  request submission, again leveraging react-router

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // console.log(data);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };

  //form validation
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "Please give us correct phone number";

  if (Object.keys(errors).length > 0) return errors;

  // if everythung okay redirect to newOrder Page
  // console.log(order);
  const newOrder = await createOrder(order);

  // do not use like this still for this we need to clear cart so that it should not show at below
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
