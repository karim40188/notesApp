import { Navigate } from "react-router-dom";

function ProtectedRouter(props) {
  if (localStorage.getItem("userToken")) {
    return props.children;
  } else {
    return <Navigate to={"/login"} />;
  }
}

export default ProtectedRouter;
