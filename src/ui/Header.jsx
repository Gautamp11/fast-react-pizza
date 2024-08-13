import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

function Header() {
  return (
    <header className='flex items-center justify-between bg-yellow-400 font-semibold uppercase py-3 px-4 border-b-2 border-stone-300 sm:px-6'>
      <Link to='/' className='tracking-widest '>
        Fast React Pizza Co.
      </Link>

      <SearchOrder />

      <Username />
    </header>
  );
}

export default Header;
