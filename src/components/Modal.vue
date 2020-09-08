<template>
  <div class="modal md-layout">
    <div class="outerWrapper" @click="handleModalClose"></div>

    <form class="form md-layout-item">
      <md-card class="form__content md-layout-item">
        <md-card-header>
          <div class="md-title" style="font-weight:700; text-align:center">Dodaj {{title}}</div>
        </md-card-header>

        <md-card-content v-if="this.fleet" class="md-layout-item">
          <Input text="true" label="Średnica" v-model="car.srednica" />
          <Input text="true" label="Grubość ścianki" v-model="car.scianka" />
          <Input text="true" label="Ilość" v-model="car.ilosc" />
          <md-button class="md-raised md-primary" @click="addCar">Dodaj</md-button>
        </md-card-content>

        <md-card-content v-if="this.talks" class="md-layout-item">
          <Input text="true" label="Czyja (Wymagane)" v-model="talk.czyja" />
          <Input text="true" label="Dane" v-model="talk.dane" />
          <Input text="true" label="Numer telefonu" v-model="talk.nr" />
          <Input text="true" label="E-mail" v-model="talk.email" />
          <Input text="true" label="Miejscowosc (Wymagane)" v-model="talk.miejscowosc" />
          <Input text="true" label="Informacje (Wymagane)" v-model="talk.informacje" />
          <md-autocomplete v-model="talk.srednica" :md-options="srednica">
            <label>Średnica Ø (Wymagane)</label>
          </md-autocomplete>
          <Input date="true" label="Data spotkania" v-model="talk.spotkanie" />
          <Input text="true" label="Planowany termin rozpoczęcia prac (Wymagane)" v-model="talk.rozpoczecie" />
          <!-- <Input date="true" label="Termin Wykonania" v-model="talk.wykonanie" /> -->
          <!-- <Input text="true" label="Pracownicy" v-model="talk.pracownicy" /> -->
          <!-- <Input text="true" label="Lustro Statyczne" v-model="talk.statyczne" /> -->
          <!-- <Input text="true" label="Lustro Dynamiczne" v-model="talk.dynamiczne" /> -->
          <!-- <md-autocomplete v-model="talk.zaplacono" :md-options="zaplacono">
            <label>Zapłacono</label>
          </md-autocomplete> -->
          

          <md-button class="md-raised md-primary" @click="addTalk">Dodaj</md-button>
        </md-card-content>

        <md-card-content v-if="this.rents" class="md-layout-item">
          <Input text="true" label="Czyja (Wymagane)" v-model="rent.czyja" />
          <Input text="true" label="Dane" v-model="rent.dane" />
          <Input text="true" label="Numer telefonu" v-model="rent.nr" />
          <Input text="true" label="E-mail" v-model="rent.email" />
          <Input text="true" label="Miejscowosc (Wymagane)" v-model="rent.miejscowosc" />
          <Input text="true" label="Informacje (Wymagane)" v-model="rent.informacje" />
          <md-autocomplete v-model="rent.srednica" :md-options="srednica">
            <label>Średnica Ø (Wymagane)</label>
          </md-autocomplete>
          <Input text="true" label="Planowany termin rozpoczęcia prac (Wymagane)" v-model="rent.rozpoczecie" />
          <Input date="true" label="Termin Wykonania" v-model="rent.wykonanie" />
          <Input text="true" label="Pracownicy" v-model="rent.pracownicy" />
          <Input text="true" label="Ile metrów" v-model="rent.metry" />
          <!-- <Input text="true" label="Lustro Statyczne" v-model="rent.statyczne" /> -->
          <!-- <Input text="true" label="Lustro Dynamiczne" v-model="rent.dynamiczne" /> -->
          <md-autocomplete v-model="rent.zaplacono" :md-options="zaplacono">
            <label>Zapłacono</label>
          </md-autocomplete>
          

          <md-button class="md-raised md-primary" @click="addRent">Dodaj</md-button>
        </md-card-content>
      </md-card>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";
import Input from "@/components/Input";

export default {
  name: "Modal",
  data() {
    return {
      car: Object.assign({}, this.defaultCar),
      talk: Object.assign({}, this.defaultTalk),
      rent: Object.assign({}, this.defaultRent),


      zaplacono: ["Tak", "Nie"],
      srednica: ["125", "140", "160", "200", "225"],

      samochody: []
    };
  },
  components: {
    Input
  },
  props: {
    defaultCar: {
      srednica: "",
      scianka: "",
      ilosc: ""
    },

    defaultTalk: {
      czyja: "",
      dane: "",
      nr: "",
      email: "",
      miejscowosc: "",
      informacje: "",
      srednica: "",
      spotkanie: "",
      rozpoczecie: "",
      // wykonanie: "",
      // pracownicy: "",
      // metry: "",
      // zaplacono: ""
    },

    defaultRent: {
      czyja: "",
      dane: "",
      nr: "",
      email: "",
      miejscowosc: "",
      informacje: "",
      srednica: "",
      rozpoczecie: "",
      wykonanie: "",
      pracownicy: "",
      metry: "",
      // statyczne: "",
      // dynamiczne: "",
      zaplacono: ""
    },
    
    title: "",
    fleet: false,
    talks: false,
    rents: false,
    edit: false
  },

  methods: {
    handleModalClose() {
      if (this.edit === true) {
        this.$emit("addCar", this.defaultCar);
        this.$emit("addTalk", this.defaultTalk);
        this.$emit("addRent", this.defaultRent);
      } else {
        this.$emit("handleModalClose");
      }
    },

    addCar() {
      this.$emit("addCar", this.car);
    },

    addTalk() {
      this.$emit("addTalk", this.talk);
    },

    addRent() {
      this.$emit("addRent", this.rent);
    }
  },
  // mounted() {
  //   firebase
  //     .firestore()
  //     .collection("Samochody")
  //     .orderBy("ilosc", "asc")
  //     .get()
  //     .then(querySnapshot => {
  //       querySnapshot.forEach(element => {
  //         this.samochody.push(
  //           `${element.data().ilosc} ${element.data().srednica} ${
  //             element.data().scianka
  //           }`
  //         );
  //       });
  //     });
  // }
};
</script>

<style lang='scss' scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba($color: #000000, $alpha: 0.25);
  font-size: 3px !important;
  .outerWrapper {
    position: absolute;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba($color: #000000, $alpha: 0.25);
  }
}
.form {
  position: absolute;
  z-index: 9999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100% !important;

  @media screen and (min-width: 768px) {
    width: 40% !important;
  }
}
.form__content {
  flex: auto;
}
</style>