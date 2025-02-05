import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, onClick }) {
  const base =
    "bg-yellow-400 uppercase font-semibold text-stone-800 inline-block tracking-wide rounded-full hover:bg-yellow-300 transition-colors focus:outline-none focus:ring focus:ring-yellow-300 focus:bg-yellow-300 disabled:cursor-not-allowed ";

  const styles = {
    primary: base + " py-3 px-4 md:px-6 md:py-4",
    small: base + " py-2 px-3 md:px-5 md:py-3",
    round: base + " py-1 px-2.5 md:px-3.5 md:py-2 text-sm",
    secondary:
      "border-2 border-stone-200 uppercase font-semibold text-stone-700 inline-block tracking-wide rounded-full hover:bg-stone-300 transition-colors focus:outline-none focus:ring focus:ring-stone-300 focus:bg-stone-300 disabled:cursor-not-allowed py-3 px-4 md:px-6 md:py-4 ",
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  if (onClick)
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );
  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
