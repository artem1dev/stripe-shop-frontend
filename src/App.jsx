import { Routes, Route } from "react-router-dom";
import HomePage from "./components/home-page";
import NotFound from "./components/not-found";
import Shop from "./components/pages/shop/shop";
import SingleProduct from "./components/single-product/single-product";
import CartPage from "./components/pages/cart-page/cart-page";
import Checkout from "./components/checkout/checkout";
import Success from "./components/checkout/stripe-checkout/success";
import Canceled from "./components/checkout/stripe-checkout/canceled";
import SignUp from "./components/sign-up/sign-up";
import SignIn from "./components/sign-in/sign-in";
import "./App.scss";

export default function App() {
    return (
        <Routes>
            <Route>
                <Route index element={<HomePage />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<SingleProduct />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/success" element={<Success />} />
                <Route path="canceled" element={<Canceled />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}
