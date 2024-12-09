const app = Vue.createApp({
  data() {
    return {
      meals: [],
      categories: [],
      searchQuery: "",
      selectedCategory: "",
      cart: JSON.parse(localStorage.getItem("cart")) || [],
    };
  },
  computed: {
    filteredMeals() {
      return this.meals.filter(
        (meal) =>
          (!this.selectedCategory ||
            meal.strCategory === this.selectedCategory) &&
          meal.strMeal.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    progressPercentage() {
      return this.meals.length > 0 ? (this.cart.length / this.meals.length) * 100 : 0;
    },
  },
  methods: {
    fetchMeals() {
      axios.get("https://www.themealdb.com/api/json/v1/1/search.php?s=")
        .then((response) => {
          this.meals = response.data.meals;
        });
    },
    fetchCategories() {
      axios.get("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
        .then((response) => {
          this.categories = response.data.meals.map((cat) => cat.strCategory);
        });
    },
    viewDetails(meal) {
      localStorage.setItem("currentMeal", JSON.stringify(meal)); // Guardar el platillo seleccionado en localStorage
      window.location.href = "detalles.html"; // Redirigir a detalles.html
    },
    updateLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
  },
  mounted() {
    this.fetchMeals();
    this.fetchCategories();
  },
});

app.mount("#app");
