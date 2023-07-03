import { cartItemsActions } from "./cart-slice";
import { cartActions } from "./cartStore";

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const res = await fetch('https://react-http-d5ecc-default-rtdb.firebaseio.com/cart.json');

            if(!res.ok) {
                throw new Error('Could not fetch cart data!')
            }

            const data = await res.json()
            return data
        };

        try {
            const cartData = await fetchData()
            dispatch(cartItemsActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity
            }))

        } catch (error) {
            sendCartData().catch((error)=>{
                dispatch(cartActions.showNotification({
                  status: 'error',
                  title: 'Error...',
                  message: 'Fetching cart data failed!'
                }))
              })
        }
    }
}

export const sendCartData = (cart)=> {
    return async (dispatch) => {
        dispatch(cartActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!'
          }))

            const sendRequest = async () => {

                const res = await fetch('https://react-http-d5ecc-default-rtdb.firebaseio.com/cart.json', {
                    method: 'PUT',
                    body: JSON.stringify({
                        items: cart.items,
                        totalQuantity: cart.totalQuantity
                    })
                  })
            
                  if(!res.ok) {
                    throw new Error('Sending cart data failed')
                  }
            }

        try {
            await sendRequest()

            dispatch(cartActions.showNotification({
                status: 'success',
                title: 'Success',
                message: 'Sent cart data successfully!'
              }))

        } catch(error) {
            sendCartData().catch((error)=>{
                dispatch(cartActions.showNotification({
                  status: 'error',
                  title: 'Error...',
                  message: 'Sending cart data failed!'
                }))
              })
        }
    }

}