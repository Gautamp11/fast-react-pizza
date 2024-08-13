import { useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

// As we are using this component as errorElement in router so it will have access to error that has occured
function Error() {
  // const navigate = useNavigate();
  const error = useRouteError();

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>
      <LinkButton to='-1'>&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
