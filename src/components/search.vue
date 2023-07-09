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

<style scoped>
input{
font-size: 14px;
                border-radius: 6px;
                line-height: 1.5;
                padding: 5px 10px;
                transition: box-shadow 100ms ease-in, border 100ms ease-in, background-color 100ms ease-in;
                border: 2px solid #dee1e2;
                color: rgb(178, 57, 154);
                background: #e6aee2;
                display: block;
                height: 30px;
                width: 150px;
              }
              .search{
                display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-content: flex-start;
    align-items: center;
    border: #e40f6d;
    border: solid;
    color: #bd1392;
    /* border-radius: 0%; */
    width: 404px;
    margin: auto;
    margin-bottom: 1%;
    padding: 6px
              }
              button{
                    outline: 0;box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
                    border: 0;
                    cursor: pointer;
                    background-color: #df46ee;
                    border-radius: 50px;
                    padding: 2px 10px;
    font-size: 12px;
                    font-weight: 700;
                    color: white;
                    line-height: 26px;
                
}
              </style>
