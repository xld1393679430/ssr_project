import { hydrateRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import routers from "@/router";
import { clientStore } from "@/store";

const Client = () => {
  return (
    <Provider store={clientStore}>
      <BrowserRouter>
        <Routes>
          {routers?.map((item, index) => {
            return <Route {...item} key={index} />;
          })}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

hydrateRoot(document.getElementById("root") as Document | Element, <Client />);
