import { createApp } from "vue";
import App from "./App.vue";
import "./main.css";
import * as VueRouter from "vue-router";
import ShoppingCartPage from "./pages/ShoppingCartPage.vue";
import ProductDetailPage from "./pages/ProductDetailPage.vue";
import ProductsPage from "./pages/ProductsPage.vue";
import NotFoundPage from "./pages/NotFoundPage.vue";

import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEeSXEKiD1ELsmq07nTl3N8urhzw2-oCU",
  authDomain: "vue-ecommerce-875c3.firebaseapp.com",
  projectId: "vue-ecommerce-875c3",
  storageBucket: "vue-ecommerce-875c3.appspot.com",
  messagingSenderId: "870860277002",
  appId: "1:870860277002:web:fafe5a8f8ef6160dd726f3",
};

// Initialize Firebase
initializeApp(firebaseConfig);

createApp(App)
  .use(
    VueRouter.createRouter({
      history: VueRouter.createWebHistory(process.env.BASE_URL),
      routes: [
        {
          path: "/cart",
          component: ShoppingCartPage,
        },
        {
          path: "/products",
          component: ProductsPage,
        },
        {
          path: "/products/:productId",
          component: ProductDetailPage,
        },
        {
          path: "/",
          redirect: "/products",
        },
        {
          path: "/:pathMatch(.*)*",
          component: NotFoundPage,
        },
      ],
    })
  )
  .mount("#app");
