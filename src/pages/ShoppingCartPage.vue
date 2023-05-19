<template>
  <h1>Shopping Cart</h1>
  <div v-if="cartItems.length > 0">
    <ShoppingCartList @remove-from-cart="removeFromCart($event)" :products="cartItems" />
    <!-- TODO: use button below to send to payment processing service like Stripe, etc. -->
    <button class="checkout-button">Proceed to Checkout</button>
  </div>
  <div v-else>
    No items in cart!
  </div>
</template>
<script>

import ShoppingCartList from '@/components/ShoppingCartList.vue';
import axios from 'axios';

export default {
  name: "ShoppingCartPage",
  props: ['user'],
  components: {
    ShoppingCartList,
  },
  data() {
    return {
      // all the items in the cartItems array
      cartItems:[],
    }
  },
  watch: {
    async user(newUserValue) {
      if (newUserValue) {
        const response_cart = await axios.get(`/api/users/${newUserValue.uid}/cart`);
        const cartItems = response_cart.data;
        this.cartItems = cartItems;
      }
    }
  },
  methods: {
    async removeFromCart(productId) {
      console.log(productId);
      const response = await axios.delete(`/api/users/${this.user.uid}/cart/${productId}`);
      const updatedCart = response.data;
      this.cartItems = updatedCart;
      alert("Item removed from cart!");
    }
  },
  async created() {
    if(this.user) {
      const response = await axios.get(`/api/users/${this.user.uid}/cart`);
      const cartItems = response.data;
      this.cartItems = cartItems;
    }
  }
}
</script>