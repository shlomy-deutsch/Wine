<template>
  <div>
    <table>
      <tr>
        <td>עריכה</td>
        <td>מספר</td>
        <td>יקב</td>
        <td>זן ענבים</td>
        <td>שנה</td>
        <td>כמות</td>
        <td>מחיר רכישה</td>
        <td>סהכ מחיר רכישה</td>
        <td>תאריך מכירה</td>
        <td>שווי נוכחי</td>
        <td>סהכ שווי נוכחי</td>
        <td>מיקום</td>
        <td>תאריך רכישה</td>
        <td>משקיע</td>
        <td>שם הקונה</td>
        <td>אחוז הרווח</td>
        <td>שם המוכר</td>
        <td>מחיר מכירה</td>
      </tr>
      <tr v-for="(i, index) in items" :key="i">
        <th><button @click="toggleInput(index, i)">עריכה</button></th>
        <th>{{ index + 1 }}</th>
        <th>{{ i.Brand }}</th>
        <th>{{ i.Variety }}</th>
        <th>{{ i.Year }}</th>
        <th>{{ i.Count }}</th>
        <th>{{ i.Purchase_price }}</th>
        <th>{{ i.Over_all_purchase_price }}</th>
        <th>{{ slicedDate(i.Date_selling) }}</th>
        <th>{{ i.Value }}</th>
        <th>{{ i.Over_all_value }}</th>
        <th>{{ i.Position }}</th>
        <th>{{ slicedDate(i.Date_purchase) }}</th>
        <th>{{ i.Investor }}</th>
        <th>{{ i.Buyer_name }}</th>
        <th>{{ i.Profit }}</th>
        <th>{{ i.Seller_name }}</th>
        <th>{{ i.Selling_price }}</th>
        <div class="container">
          <div
            v-if="bool && index === activeIndex"
            :key="'input-' + activeIndex"
            class="form"
          >
            <br />
            <table>
              <tr>
                <td>
                  <form @submit="Update">
                    <label for="">מותג:</label>
                    <input
                      :value="i.Brand"
                      @input="formValues.Brand = $event.target.value"
                    />
                    <br />
                    <label for="">זן ענבים:</label>
                    <input
                      :value="i.Variety"
                      @input="formValues.Variety = $event.target.value"
                    />
                    <br />
                    <label for="">שנה:</label>
                    <input
                      :value="i.Year"
                      type="number"
                      @input="formValues.Year = $event.target.value"
                    />
                    <br />
                    <label for="">כמות</label>
                    <input
                      :value="i.Count"
                      type="number"
                      @input="formValues.Count = $event.target.value"
                    />
                    <br />
                    <label for="">מחיר רכישה:</label>
                    <input
                      :value="i.Purchase_price"
                      type="number"
                      @input="formValues.Purchase_price = $event.target.value"
                    />
                    <br />
                    <label for="">שם הקונה:</label>
                    <input
                      :value="i.Buyer_name"
                      @input="formValues.Buyer_name = $event.target.value"
                    />
                    <br />
                    <label for="">תאריך מכירה:</label>
                    <input
                      type="Date"
                      :value="i.Date_selling"
                      @input="formValues.Date_selling = $event.target.value"
                    />
                    <br />
                    <label for="">שווי כרגע:</label>
                    <input
                      :value="i.Value"
                      type="number"
                      @input="formValues.Value = $event.target.value"
                    />
                    <br />
                    <label for="">שם המוכר:</label>
                    <input
                      :value="i.Seller_name"
                      @input="formValues.Seller_name = $event.target.value"
                    />
                    <br />
                    <label for="">מיקום:</label>
                    <input
                      :value="i.Position"
                      @input="formValues.Position = $event.target.value"
                    />
                    <br />
                    <label for="">תאריך רכישה:</label>
                    <input
                      type="Date"
                      :value="i.Date_purchase"
                      @input="formValues.Date_purchase = $event.target.value"
                    />
                    <br />
                    <label for=""
                      >שם
                      המשקיע:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label
                    >
                    <select
                      :value="i.Investor"
                      @input="formValues.Investor = $event.target.value"
                    >
                      <option disabled value="">שם המשקיע</option>
                      <option value="זלמי">זלמי</option>
                      <option value="שמואל">שמואל</option>
                    </select>
                    <br />
                    <label for="">מחיר מכירה:</label>
                    <input
                      type="number"
                      :value="i.Selling_price"
                      @input="formValues.Selling_price = $event.target.value"
                    />
                    <button type="submit">שלח</button>
                  </form>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "My-Table",
  props: ['items'],
  data() {
    return {
      // items: [],
      activeIndex: -1,
      bool: true,
    };
  },
  mounted() {
    // axios
    //   .get("https://salomon-wine-64bcf32bff86.herokuapp.com/api/products")
    //   .then((response) => {
    //     this.items = response.data;
    //   });
  },
  methods: {
    slicedDate(date) {
      if (date) {
        return date.slice(0, 10);
      }
    },
    toggleInput(index, i) {
      this.formValues = i;
      this.bool = !this.bool;
      this.activeIndex = index;
    },
    Update() {
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
        .put(
          "https://salomon-wine-64bcf32bff86.herokuapp.com/api/products/" +
            this.formValues.ID,
          this.formValues
        )
        .then((response) => {
          alert("העדכון בוצע בהצלחה");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  background-color: white;
  direction: rtl;
  color: black;
}
th {
  border-width: 1px;
  border-style: solid;
}
td {
  color: red;

  border-width: 1px;
  border-style: solid;
  text-align: -webkit-center;
}
</style>
