import { useEffect, useState } from "react";
import "./App.css";
import Loading from "./components/loading/loading";
import PublicRoutes from "./pages/public/publicRoutes";

function App() {
  const [rootElement, setRootElement] = useState(<Loading />);

  function setPublicRoutes() {
    setRootElement(<PublicRoutes route="/"/>);
  }

  useEffect(() => {
    setTimeout(setPublicRoutes, 3000);
  }, []);
  return <div className="App">{rootElement}</div>;
}

export default App;
