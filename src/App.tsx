import { useEffect, useState } from "react";
import "./App.css";
import Loading from "./components/loading/loading";
import { PrivateRoutes } from "./pages/private/privateRoutes";
import PublicRoutes from "./pages/public/publicRoutes";

function App() {
  const [rootElement, setRootElement] = useState(<Loading />);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);

  function setPublicRoutes() {
    setRootElement(<PublicRoutes route="/" />);
  }
  function setPrivateRoutes() {
    setRootElement(<PrivateRoutes route="/auth" />);
  }

  useEffect(() => {
    (async () => {
      await localStorage.getItem("refreshToken");
    })();
  });

  useEffect(() => {
    setRootElement(<Loading />);
    // if (!localStorage.getItem("refreshToken")) {
    //   setTimeout(setPublicRoutes, 3000);
    // }
    //if (localStorage.getItem("refreshToken")) {
    setTimeout(setPrivateRoutes, 3000);
    //}
  }, []);
  return <div className="App">{rootElement}</div>;
}

export default App;
