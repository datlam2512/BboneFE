import create from 'zustand';

export const useCartStore = create((set) => ({
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
  totalQuantity: localStorage.getItem('totalQuantity')
    ? parseInt(localStorage.getItem('totalQuantity'), 10)
    : 0,
  totalPrice: localStorage.getItem('totalPrice')
    ? parseFloat(localStorage.getItem('totalPrice'))
    : 0,

  // Function to add a product to the cart
  addToCart: (product) =>
    set((state) => {
      const existingItem = state.cartItems.find((item) => item.Id === product.Id);
      const newQuantity = product.quantity || 1;

      const updatedState = existingItem
        ? {
            // Update quantity of existing product
            cartItems: state.cartItems.map((item) =>
              item.Id === product.Id
                ? { ...item, quantity: item.quantity + newQuantity }
                : item
            ),
            totalQuantity: state.totalQuantity + newQuantity,
            totalPrice: state.totalPrice + product.Price * newQuantity,
          }
        : {
            // Add new product to the cart
            cartItems: [
              ...state.cartItems,
              { ...product, quantity: newQuantity },
            ],
            totalQuantity: state.totalQuantity + newQuantity,
            totalPrice: state.totalPrice + product.Price * newQuantity,
          };

      // Save the updated state to localStorage
      localStorage.setItem('cartItems', JSON.stringify(updatedState.cartItems));
      localStorage.setItem('totalQuantity', updatedState.totalQuantity);
      localStorage.setItem('totalPrice', updatedState.totalPrice);

      return updatedState;
    }),

  // Function to remove a product from the cart
  removeFromCart: (productId) =>
    set((state) => {
      const removedItem = state.cartItems.find((item) => item.Id === productId);
      const removedQuantity = removedItem ? removedItem.quantity : 0;
      const updatedCartItems = state.cartItems.filter(
        (item) => item.Id !== productId
      );

      const updatedState = {
        cartItems: updatedCartItems,
        totalQuantity: state.totalQuantity - removedQuantity,
        totalPrice: state.totalPrice - removedItem.Price * removedQuantity,
      };

      // Save the updated state to localStorage
      localStorage.setItem('cartItems', JSON.stringify(updatedState.cartItems));
      localStorage.setItem('totalQuantity', updatedState.totalQuantity);
      localStorage.setItem('totalPrice', updatedState.totalPrice);

      return updatedState;
    }),

  // Function to increment product quantity
  incrementQuantity: (productId) =>
    set((state) => {
      const updatedCartItems = state.cartItems.map((item) =>
        item.Id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
      const incrementedItem = state.cartItems.find((item) => item.Id === productId);

      const updatedState = {
        cartItems: updatedCartItems,
        totalQuantity: state.totalQuantity + 1,
        totalPrice: state.totalPrice + (incrementedItem ? incrementedItem.Price : 0),
      };

      // Save the updated state to localStorage
      localStorage.setItem('cartItems', JSON.stringify(updatedState.cartItems));
      localStorage.setItem('totalQuantity', updatedState.totalQuantity);
      localStorage.setItem('totalPrice', updatedState.totalPrice);

      return updatedState;
    }),

  // Function to decrement product quantity
  decrementQuantity: (productId) =>
    set((state) => {
      const item = state.cartItems.find((item) => item.Id === productId);

      if (item.quantity === 1) {
        // If quantity becomes 0, remove item from cart
        const updatedCartItems = state.cartItems.filter(
          (item) => item.Id !== productId
        );

        const updatedState = {
          cartItems: updatedCartItems,
          totalQuantity: state.totalQuantity - 1,
          totalPrice: state.totalPrice - item.Price,
        };

        // Save the updated state to localStorage
        localStorage.setItem('cartItems', JSON.stringify(updatedState.cartItems));
        localStorage.setItem('totalQuantity', updatedState.totalQuantity);
        localStorage.setItem('totalPrice', updatedState.totalPrice);

        return updatedState;
      } else {
        // Otherwise, just decrement the quantity
        const updatedCartItems = state.cartItems.map((cartItem) =>
          cartItem.Id === productId ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
        );

        const updatedState = {
          cartItems: updatedCartItems,
          totalQuantity: state.totalQuantity - 1,
          totalPrice: state.totalPrice - item.Price,
        };

        // Save the updated state to localStorage
        localStorage.setItem('cartItems', JSON.stringify(updatedState.cartItems));
        localStorage.setItem('totalQuantity', updatedState.totalQuantity);
        localStorage.setItem('totalPrice', updatedState.totalPrice);

        return updatedState;
      }
    }),

  // Function to reset the cart after successful payment
  resetCart: () =>
    set(() => {
      // Clear localStorage values
      localStorage.removeItem('cartItems');
      localStorage.removeItem('totalQuantity');
      localStorage.removeItem('totalPrice');

      return {
        cartItems: [],
        totalQuantity: 0,
        totalPrice: 0,
      };
    }),
}));
