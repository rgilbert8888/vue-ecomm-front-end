<template>
  <div v-if="product">
  <div class="img-wrap">
    <img :src="product.imageUrl" />
  </div>
  <div class="product-details">
    <h1>{{product.name}}</h1>
    <h3 class="price">{{product.price}}</h3>
    <button @click="addToCart" class="add-to-cart" v-if="user && !itemIsInCart">Add to cart</button>
    <button class="grey-button" v-if="user && itemIsInCart">Item already in cart</button>
    <button class="sign-in" v-if="!user" @click="signIn">Sign In</button>
  </div>
  </div>
  <div v-else>
    <NotFoundPage />
  </div>
</template>

<script>
import {getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink} from 'firebase/auth';
import axios from 'axios';
import NotFoundPage from './NotFoundPage.vue';

export default {
  name: "ProductDetailPage",
  props: ['user'],
  data() {
    return {
      // a single product in the products array with ID that matches url param
      // product: products.find(product => product.id === this.$route.params.productId),
      
      product: {},  // set initial product value to empty object,
      cartItems: []
    }
  },
  computed: {
    itemIsInCart(){
      console.log('running item is in cart');
      return this.cartItems.some(item => item.id === this.$route.params.productId);
    }
  },
  methods: {
    async addToCart(){
      await axios.post(`/api/users/${this.user.uid}/cart`, { id: this.$route.params.productId });
      alert("Item added to cart!");
    },
    async signIn() {
      const email = prompt('Please enter your email to sign in:');
      if(email) {
      // then firebase should send an email to this address
      const auth = getAuth();
      const actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: `http://localhost:8080/products/${this.$route.params.productId}`,
        // This must be true.
        handleCodeInApp: true,
      }
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      alert('A login link was sent to the email you provided.');

      // store email for later...
      window.localStorage.setItem('emailForSignIn', email);
    }
  }
  },
  components: {
    NotFoundPage
  },
  watch: {
    async user(newUserValue){
      if(newUserValue) {
        const response_cart = await axios.get(`/api/users/${newUserValue.uid}/cart`);
        const cartItems = response_cart.data;
        this.cartItems = cartItems;
      }
    }
  },
  async created() {

    // did user get to page using email link?
    const auth = getAuth();
    if(isSignInWithEmailLink(auth, window.location.href)) {
      const email = window.localStorage.getItem('emailForSignIn');
      await signInWithEmailLink(auth, email, window.location.href);
      alert('Successfully signed in!');
      window.localStorage.removeItem('emailForSignIn');
    }

    const response = await axios.get(`/api/products/${this.$route.params.productId}`);
    const product = response.data;
    this.product = product;

    if (this.user) {
      const response_cart = await axios.get(`/api/users/${this.user.uid}/cart`);
      const cartItems = response_cart.data;
      this.cartItems = cartItems;
    }

  },
}
</script>