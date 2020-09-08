<template>
  <nav class="nav">
    <!-- <img src="../assets/logo.png" class="nav__logo" /> -->
    <router-link class="nav__option" to="/Flota">
      <div class="nav__background nav__background--storage"></div>
      <md-button class="md-raised md-primary">Magazyn</md-button>
    </router-link>
    <router-link class="nav__option" to="/Wypozyczenia">
      <div class="nav__background nav__background--accepted"></div>
      <md-button class="md-raised md-primary">Pewniaki</md-button>
    </router-link>
    <router-link class="nav__option" to="/Rozmowy">
      <div class="nav__background nav__background--talk"></div>
      <md-button class="md-raised md-primary">Wstępne rozmowy</md-button>
    </router-link>
  </nav>
</template>

<script>
import firebase from "firebase";

export default {
  // mounted() {
  //   firebase.auth().signOut();
  // }
};
</script>

<style lang='scss' scoped>
.nav {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  @media screen and (min-width: 768px) {
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
  }

  &__logo {
    display: none;
    @media screen and (min-width: 768px) {
      display: block;
      position: absolute;
      top: 10%;
      left: 50%;
      transform: translate(-50%, -10%);
      width: 20%;
    }
  }

  &__option {
    height: 33.3vh;
    width: 100%;
    position: relative;
    overflow: hidden;

    @media screen and (min-width: 768px) {
      width: 30%;
      height: 40%;
      margin: 0 20px;
    }
  }
  &__background {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-size: cover;
    @media only screen and (min-width: 768px) {
      filter: grayscale(1);
      transition: filter 0.5s ease, transform 0.5s ease;
    }
    &:hover {
      @media only screen and (min-width: 768px) {
        filter: grayscale(0);

        transform: scale(1.15);
      }
    }
    &--storage {
      background-image: url("../assets/storage.jpg");
    }
    &--accepted {
      background-image: url("../assets/accepted.jpg");
    }
    &--talk {
      background-image: url("../assets/talk.jpg");
    }
  }
  .nav__link {
    color: #fff;
    text-decoration: none;
  }
}
</style>