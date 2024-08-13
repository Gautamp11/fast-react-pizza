import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";
function Menu() {
  //useLoaderData from react-router
  const menu = useLoaderData();

  return (
    <ul className='divide-y divide-stone-200 px-2'>
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

//We will use below function to implement react router fetch utility -> new feature that's why we use createBrowserouter
// once it returned, useLoaderData() will catch the res
export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
