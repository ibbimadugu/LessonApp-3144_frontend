<template>
  <div class="home">
    <LessonsList />
    <div style="display: flex; justify-content: center; align-items: center">
      <!-- Use the CartButton component here -->
      <CartButton />
    </div>
  </div>
</template>

<script>
import LessonsList from "@/components/LessonsList.vue";
import CartButton from "@/components/CartButton.vue"; // Import CartButton component

export default {
  name: "Home",
  components: {
    LessonsList,
    CartButton, // Declare CartButton in the components object
  },
  data() {
    return {
      cart: this.getCartFromLocalStorage(),
    };
  },
  computed: {
    isCartEmpty() {
      return this.cart.length === 0;
    },
  },
  methods: {
    getCartFromLocalStorage() {
      const cart = localStorage.getItem("cart");
      return cart ? JSON.parse(cart) : [];
    },
    saveCartToLocalStorage(cart) {
      localStorage.setItem("cart", JSON.stringify(cart));
    },
    addToCart(item) {
      this.cart.push(item);
      this.saveCartToLocalStorage(this.cart);
    },
    removeFromCart(itemId) {
      this.cart = this.cart.filter((item) => item.id !== itemId);
      this.saveCartToLocalStorage(this.cart);
    },
    viewCart() {
      console.log("View Cart clicked!"); // Logic for viewing the cart, e.g., navigate to the cart page
    },
  },
  watch: {
    cart(newCart) {
      this.saveCartToLocalStorage(newCart); // Sync cart with localStorage on changes
    },
  },
};
</script>

<style scoped>
.home {
  padding: 20px;
}
</style>
