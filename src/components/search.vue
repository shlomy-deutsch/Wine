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
      this.$emit("BrandSearch", this.brandSearch);

    },
    VarietySearch() {
      this.$emit("VarietySearch", this.varietySearch);
    },
  },
};
</script>

<style scoped></style>
