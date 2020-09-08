<template>
  <md-table-row>
    <md-table-cell>{{czyja}}</md-table-cell>
    <md-table-cell>{{dane}}</md-table-cell>
    <md-table-cell>
      <a :href="`tel:${nr}`">{{nr}}</a>
    </md-table-cell>
    <md-table-cell>{{email}}</md-table-cell>
    <md-table-cell>{{miejscowosc}}</md-table-cell>
    <md-table-cell>{{informacje}}</md-table-cell>
    <md-table-cell>{{srednica}}</md-table-cell>
    <md-table-cell>{{rozpoczecie}}</md-table-cell>
    <md-table-cell>{{formattedWykonanie}}</md-table-cell>
    <md-table-cell>{{pracownicy}}</md-table-cell>
    <md-table-cell>{{metry}}</md-table-cell>
    <md-table-cell>{{zaplacono}}</md-table-cell>
    <md-table-cell v-if="this.archive === false">
      <md-button class="md-icon-button md-accent" @click.native="archiveRent">
        <md-icon>archive</md-icon>
      </md-button>
    </md-table-cell>
    <md-table-cell v-if="this.archive === false">
      <md-button class="md-icon-button md-primary" @click.native="editRent">
        <md-icon>create</md-icon>
      </md-button>
    </md-table-cell>
  </md-table-row>
</template>

<script>
export default {
  name: "Rent",
  props: {
      czyja: "",
      dane: "",
      nr: "",
      email: "",
      miejscowosc: "",
      informacje: "",
      srednica: "",
      rozpoczecie: "",
      wykonanie: "",
      formattedWykonanie: "",
      pracownicy: "",
      metry: "",
      zaplacono: "",
      archive: false
  },

  methods: {
    archiveRent() {
      this.$emit("archiveRent");
    },
    editRent() {
      this.$emit("editRent");
    }
  }
};
</script>


