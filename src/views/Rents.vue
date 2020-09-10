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
        md-label="Nie dodano żadnej studni"
        md-description="Kliknij, aby dodać studnie"
        @click.native="$handleModalOpen"
      />
    </transition>

    <md-table v-if="this.empty === false" md-card class="table">
      <md-table-toolbar class="table__header">
        <h1 class="md-title table__title">Ilość studni: {{rents.length}}</h1>
        <router-link style="margin: 8px 16px" to="/Archiwum">
          <md-button class="md-raised md-primary">
            <md-icon>archive</md-icon>Zrobione
          </md-button>
        </router-link>
        <md-field md-clearable class="table__search md-toolbar-section-end">
          <md-input placeholder="Wyszukaj..." v-model="search" @input="searchOnTable" />
        </md-field>
      </md-table-toolbar>
      <md-table-row class="table--row">
        <md-table-head>Czyja</md-table-head>
        <md-table-head>Dane</md-table-head>
        <md-table-head>Numer</md-table-head>
        <md-table-head>E-mail</md-table-head>
        <md-table-head>Miejscowość</md-table-head>
        <md-table-head>Informacje</md-table-head>
        <md-table-head>Średnica Ø</md-table-head>
        <md-table-head>Rozpoczecie</md-table-head>
        <md-table-head>Wykonanie</md-table-head>
        <md-table-head>Pracownicy</md-table-head>
        <md-table-head>Metry</md-table-head>
        <md-table-head>Zapłacono</md-table-head>
        <md-table-head>Archiwizuj</md-table-head>
        <md-table-head>Edytuj</md-table-head>
      </md-table-row>

      <Rent
        :archive="false"
        class="table--row"
        :key="index"
        v-for="(rent, index) in rents"
        :index="index"
        :czyja="rent.czyja"
        :dane="rent.dane"
        :nr="rent.nr"
        :email="rent.email"
        :miejscowosc="rent.miejscowosc"
        :informacje="rent.informacje"
        :srednica="rent.srednica"
        :rozpoczecie="rent.rozpoczecie"
        :formattedWykonanie="rent.formattedWykonanie"
        :pracownicy="rent.pracownicy"
        :metry="rent.metry"
        :zaplacono="rent.zaplacono"
        @archiveRent="archiveRent(rent)"
        @editRent="editRent(rent)"
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
        @addRent="addRent"
        :defaultRent="this.rent"
        :edit="this.edit"
        v-if="modal"
        rents="true"
        title="Klienta"
      />
    </transition>
  </md-content>
</template>

<script>
import firebase from "firebase";
import debounce from "lodash.debounce";
import Rent from "@/components/Rent";
import Modal from "@/components/Modal";
import modalMixin from "../mixins/modalMixin";

export default {
  name: "Rents",
  mixins: [modalMixin],
  data() {
    return {
      rents: [],
      rent: {},
      frozenRents: [],
      modal: false,
      edit: false,
      empty: false,
      search: null,
      searched: [],
      flag: false,
      sort: "wykonanie",
      sortOrder: "asc"
    };
  },
  components: {
    Rent,
    Modal
  },
  methods: {
    handleModalClose() {
      this.rent = {};
      this.modal = false;
      this.edit = false;
      this.getRents(false, false);
    },

    addRent(rent) {
      this.empty = false;
      firebase
        .firestore()
        .collection("Wypozyczenia")
        .doc(`${rent.wykonanie}_${rent.miejscowosc}_${rent.czyja}`)
        .set({
          czyja: rent.czyja,
          dane: rent.dane ? rent.dane : "-",
          nr: rent.nr ? rent.nr : "-",
          email: rent.email ? rent.email : "-",
          miejscowosc: rent.miejscowosc,
          informacje: rent.informacje,
          srednica: rent.srednica,
          rozpoczecie: rent.rozpoczecie,
          wykonanie: rent.wykonanie ? rent.wykonanie : "Jeszcze nie wykonana",
          pracownicy: rent.pracownicy ? rent.pracownicy : "-",
          metry: rent.metry ? rent.metry : "Jeszcze nie wykonana",
          zaplacono: rent.zaplacono ? rent.zaplacono : "-",
          archive: false
        })
        .then(this.handleModalClose);
    },

    editRent(rent) {
      this.deleteRent(rent);
      this.rent = rent;
      console.log(rent);
      this.edit = true;
      this.$handleModalOpen();
    },

    archiveRent(rent) {
      firebase
        .firestore()
        .collection("Wypozyczenia")
        .doc(`${rent.wykonanie}_${rent.miejscowosc}_${rent.czyja}`)
        .set({
          czyja: rent.czyja,
          dane: rent.dane,
          nr: rent.nr,
          email: rent.email,
          miejscowosc: rent.miejscowosc,
          informacje: rent.informacje,
          srednica: rent.srednica,
          rozpoczecie: rent.rozpoczecie,
          wykonanie: rent.wykonanie,
          pracownicy: rent.pracownicy,
          metry: rent.metry,
          zaplacono: rent.zaplacono,
          archive: true
        })
        .then(this.getRents(false, false));
    },

    deleteRent(rent) {
      firebase
        .firestore()
        .collection("Wypozyczenia")
        .doc(`${rent.wykonanie}_${rent.miejscowosc}_${rent.czyja}`)
        .delete();
    },

    getRents(sort, flagChange) {
      this.flag = flagChange ? !this.flag : this.flag;
      let sortOrder = this.flag === true ? "asc" : "desc";
      this.sort = sort ? sort : this.sort;
      
      const newRents = [];
      
      firebase
        .firestore()
        .collection("Wypozyczenia")
        .where("archive", "==", false)
        .orderBy(this.sort, sortOrder)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(element => {
            const object = element.data();
            object.formattedWykonanie = this.$formatDate(
              object.wykonanie,
            );
            object.search = `${object.miejscowosc} ${object.informacje} ${object.nr} ${object.email}`;
            newRents.push(object);
          });
        })
        .then(() => {
          if (Object.is(this.rents, newRents) === false) {
            this.rents = newRents;
            this.frozenRents = newRents;
          }
          if (this.rents.length === 0) {
            this.empty = true;
          }
        });
    },
    searchOnTable: debounce(function() {
      this.rents = this.searchByName(this.rents, this.search);
    }, 500),
    toLower(text) {
      return text.toString().toLowerCase();
    },

    searchByName(items, term) {
      items = this.frozenRents;
      if (term) {
        return items.filter(item =>
          this.toLower(item.search).includes(this.toLower(term))
        );
      } else {
        return this.frozenRents;
      }
    }
  },
  mounted() {
    this.getRents();
    console.log(firebase.auth().currentUser);
  },
  created() {
    this.searched = this.rents;
  }
};
</script>
