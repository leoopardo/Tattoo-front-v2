import { useAuth } from "../contexts/Auth";
import { FC, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

type Props = {
  children: JSX.Element;
};
const RequireAuth: FC = () => {
  const { user, signInByStorage } = useAuth();
  const location = useLocation();
  const [element, setElement] = useState(<></>);

  useEffect(() => {
    (async () => {
      if (!user && !(await signInByStorage())) {
        setElement(
          <Navigate
            to="/welcome"
            replace
            state={{ path: location.pathname }}
          />,
        );
      } else {
        setElement(<Outlet />);
      }
    })();
  }, []);

  return element;
};

export default RequireAuth;
