<template>
  <md-table-row>
    <md-table-cell>{{srednica}}</md-table-cell>
    <md-table-cell>{{scianka}}</md-table-cell>
    <md-table-cell>{{kogo}}</md-table-cell>
    <md-table-cell>{{ilosc}}</md-table-cell>

    <md-table-cell>
      <md-button class="md-icon-button md-accent" @click.native="deleteCar">
        <md-icon>delete</md-icon>
      </md-button>
    </md-table-cell>
    <md-table-cell>
      <md-button class="md-icon-button md-primary" @click.native="editCar">
        <md-icon>create</md-icon>
      </md-button>
    </md-table-cell>
  </md-table-row>
</template>

<script>
export default {
  name: "Car",
  props: {
    srednica: "",
    scianka: "",
    kogo: "",
    ilosc: "",
  },

  methods: {
    deleteCar() {
      this.$emit("deleteCar");
    },
    editCar() {
      this.$emit("editCar");
    }
  }
};
</script>
