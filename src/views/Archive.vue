<template>
  <md-content class="wrapper">
    <md-table md-card class="table">
      <md-table-toolbar class="table__header archive-search">
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
      </md-table-row>

      <Rent
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
      />
    </md-table>
  </md-content>
</template>

<script>
import firebase from 'firebase';
import debounce from 'lodash.debounce';
import Rent from '@/components/Rent';

export default {
  name: 'Rents',
  data() {
    return {
      rents: [],
      rent: {},
      flag: true,
      flag: false,
      sort: 'wykonanie',
      sortOrder: 'asc',
      search: null,
      searched: [],
    };
  },
  components: {
    Rent,
  },
  methods: {
    getRents(sort, flagChange) {
      const sortOrder = this.flag === true ? 'asc' : 'desc';

      this.flag = flagChange ? !this.flag : this.flag;

      this.sort = sort || this.sort;

      const newRents = [];
     firebase
        .firestore()
        .collection("Wypozyczenia")
        .where("archive", "==", true)
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
    searchOnTable: debounce(function () {
      this.rents = this.searchByName(this.rents, this.search);
    }, 500),
    toLower(text) {
      return text.toString().toLowerCase();
    },

    searchByName(items, term) {
      if (term) {
        return items.filter(item => this.toLower(item.search).includes(this.toLower(term)));
      }
      return this.frozenRents;
    },
  },
  mounted() {
    this.getRents();
  },
  created() {
    this.searched = this.rents;
  },
};
</script>
<style lang="scss" scoped>
.archive-search {
  width: 80% !important ;
  margin: 0 10% !important ;
  @media only screen and (min-width: 1200px) {
    width: 30% !important ;
    margin-left: 50px !important ;
  }
}
</style>
