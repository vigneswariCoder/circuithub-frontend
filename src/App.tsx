import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './redux/store';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import PlaceOrder from './pages/PlaceOrder';
import ProductList from './pages/ProductList';
import AuthForm from './components/AuthForm';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/product-list" element={<ProductList />} />
          <Route path="/signin" element={<AuthForm />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
