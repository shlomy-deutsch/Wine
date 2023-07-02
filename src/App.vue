<template>
  <div>
    <div class="header">
    <h1>אתר הניהול של זלמי ושמואל</h1>
  </div>
    <div class="search">
      <input type="text" placeholder="חיפוש לפי יקב" v-model="brandSearch">
      <button @click="BrandSearch">חפש</button>
      <br>
<input type="text" placeholder="חפש לפי זן ענבים" v-model="varietySearch">
<button @click="VarietySearch">חפש</button>
    </div>
    <div class="btns">
    <button @click="calculateTotalValue">שווי נוכחי של כל המוצרים יחד</button>
    <button @click="calculateTotalInvesting">סכום הכסף שהושקע</button>
    <button @click="calculateProfit">ממוצע רווחים שנתי</button>
  </div>
    <form @submit="CreatePost">
      <input type="text" placeholder="מותג" v-model="formValues.Brand" />
      <input type="text" placeholder="זן ענבים" v-model="formValues.Variety" />
      <input type="number" placeholder="שנה" v-model="formValues.Year" />
      <label for="">תאריך רכישה:</label>
      <input type="Date" placeholder="תאריך רכישה" v-model="formValues.Date_purchase" />
      <input type="number" placeholder="כמות" v-model="formValues.Count" />
      <input type="number" placeholder="מחיר רכישה" v-model="formValues.Purchase_price"/>
      <input type="text" placeholder="שם הקונה" v-model="formValues.Buyer_name"/>
      <input type="Date" placeholder="תאריך מכירה" v-model="formValues.Date_selling"/>
      <label for="">:תאריך מכירה</label>
      <input type="number" placeholder="שווי כיום" v-model="formValues.Value" />
      <input type="text" placeholder="שם המוכר" v-model="formValues.Seller_name" />
      <input type="text" placeholder="מיקום" v-model="formValues.Position" />

      <select v-model="formValues.Investor">
  <option disabled value="">שם המשקיע</option>
  <option value="זלמי">זלמי</option>
  <option value="שמואל">שמואל</option>
</select>
      <input type="number" placeholder="מחיר מכירה" v-model="formValues.Selling_price"/>
      <button type="submit">שלח</button>
    </form>
    <div class="container">
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
          <th><button @click="toggleInput(index ,i)">עריכה</button></th>
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

          <div v-if="bool && index === activeIndex" :key="'input-' + activeIndex" class="form">
            <br />
            <table>
              <tr>
                <td>
                  <form @submit="Update">
                    <label for="">מותג:</label>
                    <input :value="i.Brand" @input="formValues.Brand = $event.target.value"/>
                    <br />
                    <label for="">זן ענבים:</label>
                    <input
                      :value="i.Variety"
                      @input="formValues.Variety = $event.target.value"
                    />
                    <br />
                    <label for="">שנה:</label>
                    <input
                      :value="i.Year" type="number"
                      @input="formValues.Year = $event.target.value"
                    />
                    <br />
                    <label for="">כמות</label>
                    <input
                      :value="i.Count" type="number"
                      @input="formValues.Count = $event.target.value"
                    />
                    <br />
                    <label for="">מחיר רכישה:</label>
                    <input
                      :value="i.Purchase_price" type="number"
                      @input="formValues.Purchase_price = $event.target.value"
                    />
                    <br />
                    <label for="">שם הקונה:</label>
                    <input :value="i.Buyer_name" @input="formValues.Buyer_name = $event.target.value"/>
                    <br />
                    <label for="">תאריך מכירה:</label>
                    <input type="Date"
                      :value="i.Date_selling"
                      @input="formValues.Date_selling = $event.target.value"
                    />
                    <br />
                    <label for="">שווי כרגע:</label>
                    <input
                      :value="i.Value" type="number"
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
                    <input type="Date" :value="i.Date_purchase" @input="formValues.Date_purchase = $event.target.value" />
                    <br />
                    <label for="">שם המשקיע:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    <select :value="i.Investor" @input="formValues.Investor = $event.target.value">
                    <option disabled value="">שם המשקיע</option>
  <option value="זלמי">זלמי</option>
  <option value="שמואל">שמואל</option>
                    </select>
                    <br />
                    <label for="">מחיר מכירה:</label>
                    <input type="number" :value="i.Selling_price" @input="formValues.Selling_price = $event.target.value"/>
                    <button type="submit">שלח</button>
                  </form>
                </td>
              </tr>
            </table>
          </div>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
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
      brandSearch: '',
      varietySearch: '',
    };
  },
  mounted() {
    axios.get("http://localhost:3000/api/products").then((response) => {
      this.items = response.data;
    });
  },
  methods: {
    slicedDate(date) {
      if (date) {
        return date.slice(0, 10);
      }
    },
    toggleInput(index ,i) {
      this.formValues = i
      this.bool = !this.bool;
      this.activeIndex = index;
    },
    CreatePost() {
      const oneDay = 24 * 60 * 60 * 1000;
  const start = new Date(this.formValues.Date_purchase);
  const end = new Date(this.formValues.Date_selling);
  const ds = Math.round(Math.abs((start - end) / oneDay));

      const a = this.formValues.Purchase_price/this.formValues.Selling_price;
      const p = a*100;
      const i = 100 - p ;
      const y = i/365;
      this.formValues.Profit = ds*y;
      axios
        .post("http://localhost:3000/api/products", this.formValues)
        .then((response) => {
          alert("העדכון הוצע בהצלחה");
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    Update() {
  const oneDay = 24 * 60 * 60 * 1000;
  const start = new Date(this.formValues.Date_purchase);
  const end = new Date(this.formValues.Date_selling);
  const ds = Math.round(Math.abs((start - end) / oneDay));

      const a = this.formValues.Purchase_price/this.formValues.Selling_price;
      const p = a*100;
      const i = 100 - p ;
      const y = i/365;
      this.formValues.Profit = ds*y;
      axios
        .put("http://localhost:3000/api/products/"+this.formValues.ID, this.formValues)
        .then((response) => {
          alert("העדכון הוצע בהצלחה");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    calculateTotalValue() {
      const t = this.items.reduce((total, item) => total + item.Over_all_value, 0);
  alert(t.toLocaleString());
},

calculateTotalInvesting() {
      const t = this.items.reduce((total, item) => total + item.Over_all_purchase_price, 0);
      const z = this.items.reduce((total, item) => {
  if (item.Investor == 'זלמי') {
    return total + item.Over_all_purchase_price;
  } else {
    return total;
  }
}, 0);
const s = this.items.reduce((total, item) => {
  if (item.Investor == 'שמואל') {
    return total + item.Over_all_purchase_price;
  } else {
    return total;
  }
}, 0);

  alert("סכום כולל שהושקע: "+ t.toLocaleString()+ ", " + "הסכום שהושקע ע''י זלמי: " + z.toLocaleString() + ", " + "הסכום שהושקע ע''י שמואל: " + s.toLocaleString());
  },
  calculateProfit(){
    const t = this.items.reduce((total, item) => total + item.Profit, 0);
    const count = this.items.reduce((total, item) => total + (item.Profit !== 0 ? 1 : 0), 0);
 const y = t/count;
 alert(y);
  },
  BrandSearch(){
    axios.get("http://localhost:3000/api/products/brand/" + this.brandSearch).then((response) => {
      this.items = response.data;
    });
  },
  VarietySearch(){
    axios.get("http://localhost:3000/api/products/variety/" + this.varietySearch).then((response) => {
      this.items = response.data;
    });
  }
}
}
</script>

<style scoped>
table {
  width: 100%;
  background-color: white;
  direction: rtl;
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
.form table {
  height: 67px;
}
.search{
  border-width: 1px;
  border-style: solid;
padding: 5px;
width: 19%;
margin: auto;
}
.header{
  margin-left: 35% ;
}
.btns{
  margin-left: 33% ;
}
</style>