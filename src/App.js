import React from "react";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import RouterContainer from "./route/Route";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <RouterContainer />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
