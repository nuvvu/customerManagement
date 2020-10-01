<template>
  <md-content class="wrapper">
    <transition
      :duration="500"
      mode="out-in"
      appear
      enter-active-class="slideInDown"
      leave-active-class="slideOutDown"
    >
      <md-empty-state
        v-if="this.empty"
        class="empty"
        md-icon="add"
        md-label="Nie dodano żadnych rur"
        md-description="Kliknij, aby dodać rury"
        @click.native="$handleModalOpen"
      />
    </transition>

    <md-table v-if="this.empty === false" md-card class="table">
      <md-table-toolbar class="table__header">
        <h1 class="md-title table__title">
          Magazyn:
        </h1>

        <md-field md-clearable class="table__search md-toolbar-section-end">
          <md-input placeholder="Wyszukaj..." v-model="search" @input="searchOnTable" />
        </md-field>
      </md-table-toolbar>

      <md-table-row class="table--row">
        <md-table-head>Średnica</md-table-head>
        <md-table-head>Grubość ścianki</md-table-head>
        <md-table-head>Od kogo</md-table-head>
        <md-table-head>Rodzaj</md-table-head>
        <md-table-head>Ilość</md-table-head>
        <md-table-head>Usuń</md-table-head>
        <md-table-head>Edytuj</md-table-head>
      </md-table-row>

      <Car
        class="table--row"
        :key="index"
        v-for="(car, index) in cars"
        :index="index"
        :srednica="car.srednica"
        :scianka="car.scianka"
        :kogo="car.kogo"
        :rodzaj="car.rodzaj"
        :ilosc="car.ilosc"
        @deleteCar="deleteCar(car)"
        @editCar="editCar(car)"
      />
      
    </md-table>
    <transition
      mode="out-in"
      appear
      enter-class="slideDown"
      leave-to-class="slideDown"
      enter-active-class="slideDown--time"
      leave-active-class="slideDown--time"
    >
      <Modal
        @handleModalClose="handleModalClose"
        @addCar="addCar"
        @deleteCar="deleteCar(car)"
        :defaultCar="this.car"
        :edit="this.edit"
        v-if="modal"
        fleet="true"
        title="Rury"
      />
    </transition>
  </md-content>
</template>

<script>
import firebase from "firebase";
import debounce from "lodash.debounce";
import Car from "@/components/Car";
import Modal from "@/components/Modal";
import modalMixin from "../mixins/modalMixin";

export default {
  name: "Fleet",
  mixins: [modalMixin],
  data() {
    return {
      cars: [],
      car: {},
      frozenCars: [],
      modal: false,
      edit: false,
      empty: false,
      search: null,
      searched: [],
      flag: false,
      sort: "ilosc",
      sortOrder: "asc"
    };
  },
  components: {
    Car,
    Modal
  },
  methods: {
    handleModalClose() {
      this.car = {};
      this.modal = false;
      this.edit = false;
      this.getCars(false, false);
    },

    addCar(car) {
      this.empty = false;
      firebase
        .firestore()
        .collection("Samochody")
        .doc(`${car.srednica}_${car.scianka}_${car.ilosc}`)
        .set({
          srednica: car.srednica,
          scianka: car.scianka,
          kogo: car.kogo,
          rodzaj: car.rodzaj,
          ilosc: car.ilosc,
        })
        .then(this.handleModalClose);
    },

    editCar(car) {
      this.deleteCar(car);
      this.car = car;
      this.edit = true;
      this.$handleModalOpen();
    },

    deleteCar(car) {
      firebase
        .firestore()
        .collection("Samochody")
        .doc(`${car.srednica}_${car.scianka}_${car.ilosc}`)
        .delete();
    },

    getCars(sort, flagChange) {
      this.flag = flagChange ? !this.flag : this.flag;
      let sortOrder = this.flag === true ? "asc" : "desc";
      this.sort = sort ? sort : this.sort;

      const newCars = [];
      firebase
        .firestore()
        .collection("Samochody")
        .orderBy(this.sort, sortOrder)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(element => {
            const object = element.data();

            // object.formattedOC =
            //   object.oc === "Interpolisa"
            //     ? "Interpolisa"
            //     : this.$formatDate(object.oc);

            // object.formattedPT = this.$formatDate(object.pt);

            object.car = `${object.srednica} ${object.scianka} ${object.kogo} ${object.ilosc}`;
            newCars.push(object);
          });
        })
        .then(() => {
          if (Object.is(this.cars, newCars) === false) {
            this.cars = newCars;
            this.frozenCars = newCars;
          }
          if (this.cars.length === 0) {
            this.empty = true;
          }
        });
    },
    searchOnTable: debounce(function() {
      this.cars = this.searchByName(this.cars, this.search);
    }, 500),
    toLower(text) {
      return text.toString().toLowerCase();
    },

    searchByName(items, term) {
      if (term) {
        return items.filter(item =>
          this.toLower(item.car).includes(this.toLower(term))
        );
      } else {
        return this.frozenCars;
      }
    }
  },
  mounted() {
    this.getCars();
  },
  created() {
    this.searched = this.cars;
  }
};
</script>

