// import { Navigate } from 'react-router-dom';
import { useToken } from "./frontendAuth";

function SignOut() {
  const [, , logout] = useToken();
  logout();
  // return <Navigate to="/" />;
}

export default SignOut;
