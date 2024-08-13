import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateCartQuantity from "../cart/UpdateCartQuantity";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();

  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currentQuantity = useSelector(getCurrentQuantityById(id));

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice * 1,
    };

    dispatch(addItem(newItem));
  }
  return (
    <li className='flex gap-4 py-2 '>
      <img
        src={imageUrl}
        alt={name}
        className={` h-24 ${soldOut ? "opacity-50 grayscale" : ""}`}
      />
      <div className='flex flex-col flex-grow '>
        <p className='font-semibold'>{name}</p>
        <p className='text-sm italic text-stone-600 capitalize'>
          {ingredients.join(", ")}
        </p>
        <div className='mt-auto flex items-center justify-between '>
          {!soldOut ? (
            <p className='text-sm'>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className='text-sm uppercase font-medium text-stone-500'>
              Sold out
            </p>
          )}

          {!soldOut && (
            <div className='flex gap-2'>
              {currentQuantity === 0 && (
                <Button type='small' onClick={handleAddToCart}>
                  Add to cart
                </Button>
              )}

              {currentQuantity > 0 && (
                <div className='flex gap-2 md:gap-3'>
                  <UpdateCartQuantity
                    pizzaId={id}
                    currentQuantity={currentQuantity}
                  />
                  <DeleteItem pizzaId={id} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
