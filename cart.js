const app = Vue.createApp({
  data() {
    return {
      cart: JSON.parse(localStorage.getItem('cart')) || [], // Carga el carrito desde localStorage
    };
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((sum, meal) => sum + (meal.price * meal.quantity), 0).toFixed(2); // Total del carrito
    }
  },
  methods: {
    increaseQuantity(index) {
      this.cart[index].quantity++; // Aumenta la cantidad del platillo
      this.saveCart(); // Guarda el carrito en localStorage
    },
    decreaseQuantity(index) {
      if (this.cart[index].quantity > 1) {
        this.cart[index].quantity--; // Disminuye la cantidad si es mayor que 1
        this.saveCart(); // Guarda el carrito en localStorage
      }
    },
    removeMeal(index) {
      this.cart.splice(index, 1); // Elimina un platillo del carrito
      this.saveCart(); // Guarda el carrito en localStorage
    },
    saveCart() {
      console.log('Guardando carrito en localStorage:', this.cart); // Muestra el carrito en la consola
      localStorage.setItem('cart', JSON.stringify(this.cart)); // Guarda el carrito en localStorage
    }
  },
  watch: {
    cart: {
      handler() {
        this.saveCart(); // Guarda el carrito cada vez que cambia
      },
      deep: true // Observa cambios profundos en el carrito
    }
  },
  mounted() {
    console.log('Carrito cargado desde localStorage:', this.cart); // Muestra el carrito cargado
  }
});

app.mount("#app");
