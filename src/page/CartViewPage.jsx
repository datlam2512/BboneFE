import { Helmet } from "react-helmet";
import  CartView  from "../section/CartPage/CartView";

function CartViewPage() {
  return (
    <div>
      <Helmet>
        <title>Giỏ hàng</title>
      </Helmet>
      <CartView />
    </div>
  );
}
export default CartViewPage;
