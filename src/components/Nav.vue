<template>
  <div>
    <md-toolbar class="nav">
      <!-- <img src="../assets/logo-black.png" class="nav__logo" /> -->
      <h3 class="md-title nav__header">Menu</h3>

      <router-link class="nav__router" to="/Flota">
        <md-button class="nav__button">
          <md-icon class="nav__icon">directions_car</md-icon>Magazyn
        </md-button>
      </router-link>
      <router-link class="nav__router" to="/Wypozyczenia">
        <md-button class="nav__button">
          <md-icon class="nav__icon">how_to_reg</md-icon>Pewniaki
        </md-button>
      </router-link>
      <router-link class="nav__router" to="/Rozmowy">
        <md-button class="nav__button">
          <md-icon class="nav__icon">assignment</md-icon>Rozmowy
        </md-button>
      </router-link>

      <md-button class="nav__button" @click.native="handleModalOpen">
        <md-icon class="nav__icon">add</md-icon>
        Dodaj {{type}}
      </md-button>
    </md-toolbar>

    <md-bottom-bar class="nav-mobile">
      <md-bottom-bar-item @click.native="handleModalOpen" md-label="Dodaj" md-icon="add"></md-bottom-bar-item>
      <md-bottom-bar-item to="/Flota" md-label="Magazyn" md-icon="directions_car"></md-bottom-bar-item>
      <md-bottom-bar-item to="/Wypozyczenia" md-label="Pewniaki" md-icon="how_to_reg"></md-bottom-bar-item>
      <md-bottom-bar-item to="/Rozmowy" md-label="Rozmowy" md-icon="assignment"></md-bottom-bar-item>
    </md-bottom-bar>
  </div>
</template>

<script>
export default {
  name: "Nav",
  props: {
    type: null
  },
  methods: {
    handleModalOpen() {
      this.$root.$emit("handleModalOpen");
    }
  }
};
</script>

<style lang='scss' scoped>
.router-link-active {
  @media screen and (min-width: 768px) {
    background-color: #303030;
  }
  .nav {
    &__button {
      color: #fff !important;
    }
    &__icon {
      color: #fff !important;
    }
  }
}
.nav {
  position: fixed;
  width: auto;
  display: none;
  z-index: 900;
  max-width: 16%;
  box-sizing: border-box;
  display: none;
  align-items: flex-start;
  padding: 0;
  background-color: #424242 !important;
  border-radius: 0;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  @media screen and (min-width: 768px) {
    height: 100vh;
    display: flex;
    flex-flow: column nowrap;
  }
  @media screen and (min-width: 1367px) {
    max-width: 10%;
  }
  &__router {
    width: 100%;
  }

  &__header {
    text-align: center;
    padding: 10px 0;
    color: #fff !important;
    width: 100%;
    margin: 0 !important;
    border-bottom: 2px solid #aaa;
  }
  &__logo {
    width: 100%;
    padding: 10px;
  }
  &__button {
    margin: 0 !important;
    padding: 10px 0;
    box-sizing: content-box;
    width: 100% !important;
    font-size: 1.5rem;
    font-weight: 200;
    color: #fff !important;
  }
  &__icon {
    color: #fff !important;
    margin: 0 16px 4px 0px;
  }
}
.nav-mobile {
  position: fixed;
  bottom: 0;
  width: 100vw !important;
  z-index: 999;
  color: #fff !important;
  @media screen and (min-width: 768px) {
    display: none;
  }
}
</style>