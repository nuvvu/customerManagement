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
        md-label="Nie dodano żadnej rozmowy"
        md-description="Kliknij, aby dodać rozmowe"
        @click.native="$handleModalOpen"
      />
    </transition>

    <md-table v-if="this.empty === false" md-card class="table">
      <md-table-toolbar class="table__header">
        <h1 class="md-title table__title">Rozmowy w trakcie: {{talks.length}}</h1>
        <router-link style="margin: 8px 16px" to="/Archiwum">
          <md-button class="md-raised md-primary">
            <md-icon>archive</md-icon>Archiwum
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
        <md-table-head>Spotkanie</md-table-head>
        <md-table-head>Rozpoczecie</md-table-head>
        <!-- <md-table-head>Wykonanie</md-table-head> -->
        <!-- <md-table-head>Pracownicy</md-table-head> -->
        <!-- <md-table-head>Metry</md-table-head> -->
        <!-- <md-table-head>Zapłacono</md-table-head> -->
        <md-table-head>Archiwizuj</md-table-head>
        <md-table-head>Edytuj</md-table-head>
      </md-table-row>

      <Talk
        :archive="false"
        class="table--row"
        :key="index"
        v-for="(talk, index) in talks"
        :index="index"
        :czyja="talk.czyja"
        :dane="talk.dane"
        :nr="talk.nr"
        :email="talk.email"
        :miejscowosc="talk.miejscowosc"
        :informacje="talk.informacje"
        :srednica="talk.srednica"
        :spotkanie="talk.spotkanie"
        :rozpoczecie="talk.rozpoczecie"
        @archiveTalk="archiveTalk(talk)"
        @editTalk="editTalk(talk)"
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
        @addTalk="addTalk"
        :defaultTalk="this.talk"
        :edit="this.edit"
        v-if="modal"
        talks="true"
        title="Klienta"
      />
    </transition>
  </md-content>
</template>

<script>
import firebase from "firebase";
import debounce from "lodash.debounce";
import Talk from "@/components/Talk";
import Modal from "@/components/Modal";
import modalMixin from "../mixins/modalMixin";

export default {
  name: "Talks",
  mixins: [modalMixin],
  data() {
    return {
      talks: [],
      talk: {},
      frozenTalks: [],
      modal: false,
      edit: false,
      empty: false,
      search: null,
      searched: [],
      flag: false,
      sort: "spotkanie",
      sortOrder: "asc"
    };
  },
  components: {
    Talk,
    Modal
  },
  methods: {
    handleModalClose() {
      this.talk = {};
      this.modal = false;
      this.edit = false;
      this.getTalks(false, false);
    },

    addTalk(talk) {
      this.empty = false;
      firebase
        .firestore()
        .collection("Rozmowy")
        .doc(`${talk.spotkanie}_${talk.miejscowosc}_${talk.czyja}`)
        .set({
          czyja: talk.czyja,
          dane: talk.dane ? talk.dane : "-",
          nr: talk.nr ? talk.nr : "-",
          email: talk.email ? talk.email : "-",
          miejscowosc: talk.miejscowosc,
          informacje: talk.informacje,
          srednica: talk.srednica,
          spotkanie: talk.spotkanie,
          rozpoczecie: talk.rozpoczecie,
          // wykonanie: talk.wykonanie ? talk.wykonanie : "Jeszcze nie wykonana",
          // pracownicy: talk.pracownicy ? talk.pracownicy : "-",
          // metry: talk.metry ? talk.metry : "Jeszcze nie wykonana",
          // zaplacono: talk.zaplacono ? talk.zaplacono : "-",
          archive: false
        })
        .then(this.handleModalClose);
    },

    editTalk(talk) {
      this.deleteTalk(talk);
      this.talk = talk;
      console.log(talk);
      this.edit = true;
      this.$handleModalOpen();
    },

    archiveTalk(talk) {
      firebase
        .firestore()
        .collection("Rozmowy")
        .doc(`${talk.spotkanie}_${talk.miejscowosc}_${talk.czyja}`)
        .set({
          czyja: talk.czyja,
          dane: talk.dane,
          nr: talk.nr,
          email: talk.email,
          miejscowosc: talk.miejscowosc,
          informacje: talk.informacje,
          srednica: talk.srednica,
          spotkanie: talk.spotkanie,
          rozpoczecie: talk.rozpoczecie,
          // wykonanie: talk.wykonanie,
          // pracownicy: talk.pracownicy,
          // metry: talk.metry,
          // zaplacono: talk.zaplacono,
          archive: true
        })
        .then(this.getTalks(false, false));
    },

    deleteTalk(talk) {
      firebase
        .firestore()
        .collection("Rozmowy")
        .doc(`${talk.spotkanie}_${talk.miejscowosc}_${talk.czyja}`)
        .delete();
    },

    getTalks(sort, flagChange) {
      this.flag = flagChange ? !this.flag : this.flag;
      let sortOrder = this.flag === true ? "asc" : "desc";
      this.sort = sort ? sort : this.sort;
      
      const newTalks = [];
      
      firebase
        .firestore()
        .collection("Rozmowy")
        .where("archive", "==", false)
        .orderBy(this.sort, sortOrder)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(element => {
            const object = element.data();
            object.formattedSpotkanie = this.$formatDate(
              object.spotkanie,
            );
            object.search = `${object.miejscowosc} ${object.informacje} ${object.nr} ${object.email}`;
            newTalks.push(object);
          });
        })
        .then(() => {
          if (Object.is(this.talks, newTalks) === false) {
            this.talks = newTalks;
            this.frozenTalks = newTalks;
          }
          if (this.talks.length === 0) {
            this.empty = true;
          }
        });
    },
    searchOnTable: debounce(function() {
      this.talks = this.searchByName(this.talks, this.search);
    }, 500),
    toLower(text) {
      return text.toString().toLowerCase();
    },

    searchByName(items, term) {
      items = this.frozenTalks;
      if (term) {
        return items.filter(item =>
          this.toLower(item.search).includes(this.toLower(term))
        );
      } else {
        return this.frozenTalks;
      }
    }
  },
  mounted() {
    this.getTalks();
    console.log(firebase.auth().currentUser);
  },
  created() {
    this.searched = this.talks;
  }
};
</script>
