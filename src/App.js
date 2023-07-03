import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
// import { cartActions } from './store/cartStore';
import Notification from './components/UI/Notification';
import { fetchCartData, sendCartData } from './store/cart-action';

let isInitial = true

function App() {
  const showCart = useSelector(state => state.cartShown.isCartShown)
  const notification = useSelector(state => state.cartShown.notification)
  const cart = useSelector(state => state.cartItems)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchCartData())
  }, [dispatch])

  useEffect(()=>{

    if(isInitial) {
      isInitial = false
      return
    }

    if(cart.changed) {
      dispatch(sendCartData(cart))
    }


  }, [cart, dispatch]);


  return (
    <>
    {notification && 
    <Notification 
      status={notification.status} 
      title={notification.title} 
      message={notification.message} 
    />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    
    </>
  );
}

export default App;
