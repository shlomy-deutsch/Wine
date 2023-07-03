<template>
  <div>
    <form @submit="CreatePost">
      <input type="text" placeholder="מותג" v-model="formValues.Brand" />
      <input type="text" placeholder="זן ענבים" v-model="formValues.Variety" />
      <input type="number" placeholder="שנה" v-model="formValues.Year" />
      <label for="">תאריך רכישה:</label>
      <input
        type="Date"
        placeholder="תאריך רכישה"
        v-model="formValues.Date_purchase"
      />
      <input type="number" placeholder="כמות" v-model="formValues.Count" />
      <input
        type="number"
        placeholder="מחיר רכישה"
        v-model="formValues.Purchase_price"
      />
      <input
        type="text"
        placeholder="שם הקונה"
        v-model="formValues.Buyer_name"
      />
      <input
        type="Date"
        placeholder="תאריך מכירה"
        v-model="formValues.Date_selling"
      />
      <label for="">:תאריך מכירה</label>
      <input type="number" placeholder="שווי כיום" v-model="formValues.Value" />
      <input
        type="text"
        placeholder="שם המוכר"
        v-model="formValues.Seller_name"
      />
      <input type="text" placeholder="מיקום" v-model="formValues.Position" />

      <select v-model="formValues.Investor">
        <option disabled value="">שם המשקיע</option>
        <option value="זלמי">זלמי</option>
        <option value="שמואל">שמואל</option>
      </select>
      <input
        type="number"
        placeholder="מחיר מכירה"
        v-model="formValues.Selling_price"
      />
      <button type="submit">שלח</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Add-Product",
  data() {
    return {
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
    };
  },
  methods: {
    CreatePost() {
      const oneDay = 24 * 60 * 60 * 1000;
      const start = new Date(this.formValues.Date_purchase);
      const end = new Date(this.formValues.Date_selling);
      const ds = Math.round(Math.abs((start - end) / oneDay));
      const a = this.formValues.Purchase_price / this.formValues.Selling_price;
      const p = a * 100;
      const i = 100 - p;
      const y = i / 365;
      this.formValues.Profit = ds * y;
      axios
        .post(
          "https://salomon-wine-64bcf32bff86.herokuapp.com/api/products",
          this.formValues
        )
        .then((response) => {
          alert("העדכון בוצע בהצלחה");
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
