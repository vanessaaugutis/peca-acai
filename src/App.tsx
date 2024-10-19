import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./store";
import Order from "./pages/order";
import Header from "./pages/header";
import Home from "./pages/home";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/order" element={<Order />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
