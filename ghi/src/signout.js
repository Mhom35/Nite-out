import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useToken } from "./frontendAuth";

function SignOut() {
  const [, , logout] = useToken();
  const navigate = useNavigate()

  logout();
  useEffect(() => {
    navigate("/")
  }, [navigate])
}

export default SignOut;
