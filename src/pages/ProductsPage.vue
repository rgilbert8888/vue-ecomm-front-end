<template>
  <h1>Products</h1>
  <ProductsList :products="products"/>
</template>

<script>
import ProductsList from '../components/ProductsList.vue';
import axios from 'axios';

export default {
  name: "ProductsPage",
  components:{
    ProductsList,
  },
  data() {
    return {
      // all the products in the products array
      products: [],
    }
  },
  async created() {
    const response = await axios.get('/api/products');
    const products = response.data;
    console.log(products);
    this.products = products;
  }
}
</script>