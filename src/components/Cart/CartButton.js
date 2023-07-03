import {useDispatch, useSelector} from 'react-redux';

import classes from './CartButton.module.css';
import { cartActions } from '../../store/cartStore';

const CartButton = (props) => {
  const dispatch = useDispatch()
  const cartQuantity = useSelector(state => state.cartItems.totalQuantity)

  const handleCartToggle = () => {
    dispatch(cartActions.toggleShowCart())
  }

  return (
    <button className={classes.button} onClick={handleCartToggle}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
