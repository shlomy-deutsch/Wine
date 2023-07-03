<template>
  <div>
    <div class="search">
      <input type="text" placeholder="חיפוש לפי יקב" v-model="brandSearch" />
      <button @click="BrandSearch">חפש</button>
      <br />
      <input
        type="text"
        placeholder="חפש לפי זן ענבים"
        v-model="varietySearch"
      />
      <button @click="VarietySearch">חפש</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Search",
  data() {
    return {
      brandSearch: "",
      varietySearch: "",
    };
  },
  methods: {
    BrandSearch() {
      axios
        .get(
          "https://salomon-wine-64bcf32bff86.herokuapp.com/api/products/brand/" +
            this.brandSearch
        )
        .then((response) => {
          this.items = response.data;
        });
    },
    VarietySearch() {
      axios
        .get(
          "https://salomon-wine-64bcf32bff86.herokuapp.com/api/products/variety/" +
            this.varietySearch
        )
        .then((response) => {
          this.items = response.data;
        });
    },
  },
};
</script>

<style scoped></style>
