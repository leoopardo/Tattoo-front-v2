import { useEffect, useState } from "react";
import "./App.css";
import Loading from "./components/loading/loading";
import { useNavigate } from "react-router-dom";
import { AllRoutes } from "./pages/Routes";

function App() {
  const [rootElement, setRootElement] = useState(<Loading />);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);

  function setRoutes() {
    setRootElement(<AllRoutes />);
  }

  useEffect(() => {
    (async () => {
      await localStorage.getItem("refreshToken");
    })();
  });

  useEffect(() => {
    setRootElement(<Loading />);
    setTimeout(setRoutes, 3000);
  }, []);

  return <div className="App">{rootElement}</div>;
}

export default App;
