const app = Vue.createApp({
    data() {
      return {
        currentMeal: null, // Platillo seleccionado
        quantity: 1, // Cantidad inicial
        cart: JSON.parse(localStorage.getItem("cart")) || [], // Carrito almacenado
      };
    },
    methods: {
      loadMeal() {
        // Carga los datos del platillo desde localStorage
        const mealData = localStorage.getItem("currentMeal");
        if (mealData) {
          this.currentMeal = JSON.parse(mealData);
        } else {
          alert("No se encontró el platillo seleccionado.");
          window.location.href = "index.html";
        }
      },
      incrementQuantity() {
        if (this.quantity < 6) this.quantity++;
      },
      decrementQuantity() {
        if (this.quantity > 1) this.quantity--;
      },
      addToCart() {
        if (!this.currentMeal) return;
  
        const existingItem = this.cart.find(item => item.idMeal === this.currentMeal.idMeal);
        if (existingItem) {
          existingItem.quantity += this.quantity;
        } else {
          this.cart.push({
            ...this.currentMeal,
            quantity: this.quantity,
            price: Math.floor(Math.random() * 200) + 50, // Precio simulado
          });
        }
  
        localStorage.setItem("cart", JSON.stringify(this.cart));
        alert("Platillo agregado al carrito.");
      },
      goBack() {
        window.location.href = "index.html";
      },
    },
    mounted() {
      this.loadMeal();
    },
  });
  
  app.mount("#app");
  