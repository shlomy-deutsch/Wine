<template>
  <div>
    <form @submit="CreatePost" class="container">
     <input type="text" class="aks-input" placeholder="מותג" v-model="formValues.Brand" /> 
      <input type="text" placeholder="זן ענבים" v-model="formValues.Variety" />
      <input type="number" placeholder="שנה" v-model="formValues.Year" style="width: 70px;"/>
      <label for="">תאריך רכישה:</label>
      <br>
      <input
        type="Date"
        placeholder="תאריך רכישה"
        v-model="formValues.Date_purchase"
      />
      <input type="number" placeholder="כמות" v-model="formValues.Count" style="width: 70px;"/>
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
      <input type="number" placeholder="שווי כיום" v-model="formValues.Value" style="width: 90px"/>
      <input
        type="text"
        placeholder="שם המוכר"
        v-model="formValues.Seller_name"
      />
      <input type="text" placeholder="מיקום" v-model="formValues.Position" />

      <select v-model="formValues.Investor">
        <option disabled value="">המשקיע</option>
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

<style scoped>
label{color: black;}
input, select{
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
                width: 100px;
                /* :hover {
                    border-color: #ccc;
                }; */
                /* :focus{
                    border-color: #9147ff;
                    background: #fff;
                } */
              }
              .container{
                width: 39%;

  display: flex;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    align-items: flex-start;
    margin: auto;

}
button{
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  display: inline-block;
                    outline: 0;
                    border: 0;
                    cursor: pointer;
                    background-color: #df46ee;
                    border-radius: 50px;
                    padding: 2px 10px;
    font-size: 12px;
                    font-weight: 700;
                    color: white;
                    line-height: 26px;
                    margin: auto;
    margin-bottom: 6px;
    margin-top: 2px;
}
</style>
