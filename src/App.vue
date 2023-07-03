<template>
  <div>
    <div class="header">
      <h1>אתר הניהול של זלמי ושמואל</h1>
      <search></search>
      <AddProduct></AddProduct>
    </div>
 
    <div class="btns">
      <button @click="calculateTotalValue">שווי נוכחי של כל המוצרים יחד</button>
      <button @click="calculateTotalInvesting">סכום הכסף שהושקע</button>
      <button @click="calculateProfit">ממוצע רווחים שנתי</button>
    </div>
    <MyTable></MyTable>
  </div>
</template>

<script>
import search from "./components/search.vue";
import AddProduct from "./components/Add-Product.vue";
import MyTable from "./components/Table.vue";
export default {
  components: { AddProduct, MyTable, search },
  name: "App",
  data() {
    return {
      bool: true,
      formValues: {
        ID: null,
        Brand: "",
        Variety: "",
        Year: null,
        Count: null,
        Date_purchase: "",
        Date_selling: "",
        Purchase_price: null,
        Over_all_purchase_price: null,
        Date_selling: "",
        Value: null,
        Over_all_value: null,
        Position: "",
        Date_purchase: "",
        Investor: "",
        Buyer_name: "",
        Profit: null,
        Seller_name: "",
        Selling_price: null,
      },
      items: [],
      activeIndex: -1,
    };
  },
  computed:{
    prod(){
      // return this.$store.state.count   
    }
  },

  methods: {

    calculateTotalValue() {
      const t = this.items.reduce(
        (total, item) => total + item.Over_all_value,
        0
      );
      alert(t.toLocaleString());
    },

    calculateTotalInvesting() {
      const t = this.items.reduce(
        (total, item) => total + item.Over_all_purchase_price,
        0
      );
      const z = this.items.reduce((total, item) => {
        if (item.Investor == "זלמי") {
          return total + item.Over_all_purchase_price;
        } else {
          return total;
        }
      }, 0);
      const s = this.items.reduce((total, item) => {
        if (item.Investor == "שמואל") {
          return total + item.Over_all_purchase_price;
        } else {
          return total;
        }
      }, 0);

      alert(
        "סכום כולל שהושקע: " +
          t.toLocaleString() +
          ", " +
          "הסכום שהושקע ע''י זלמי: " +
          z.toLocaleString() +
          ", " +
          "הסכום שהושקע ע''י שמואל: " +
          s.toLocaleString()
      );
    },
    calculateProfit() {
      const t = this.items.reduce((total, item) => total + item.Profit, 0);
      const count = this.items.reduce(
        (total, item) => total + (item.Profit !== 0 ? 1 : 0),
        0
      );
      const y = t / count;
      alert(y);
    },
  
  },
};
</script>

<style scoped>
.form table {
  height: 67px;
}
.search {
  border-width: 1px;
  border-style: solid;
  padding: 5px;
  width: 19%;
  margin: auto;
}
.header {
  margin-left: 35%;
}
.btns {
  margin-left: 33%;
}
</style>
