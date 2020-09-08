<template>
  <div id="app" class="app">
    <transition
      mode="out-in"
      appear
      enter-class="slideInNav"
      leave-to-class="slideOutNav"
      enter-active-class="slideInNav--time"
      leave-active-class="slideOutNav--time"
    >
      <Nav v-if="navShow === true" />
    </transition>
    <transition
      mode="out-in"
      appear
      enter-class="slideInLeft"
      leave-to-class="slideOutLeft"
      enter-active-class="slideInLeft--time"
      leave-active-class="slideOutLeft--time"
    >
      <router-view />
    </transition>
  </div>
</template>

<script>
import Nav from "@/components/Nav";

export default {
  components: {
    Nav
  },
  data() {
    return {
      navShow: false
    };
  },

  mounted() {
    if (this.$route.name !== "Home" && this.$route.name !== "Login") {
      this.navShow = true;
    } else {
      this.navShow = false;
    }
  },
  watch: {
    $route(to, from) {
      if (this.$route.name !== "Home" && this.$route.name !== "Login") {
        this.navShow = true;
      } else {
        this.navShow = false;
      }
    }
  }
};
</script>


<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap&subset=latin-ext");
input[type="date"]::-webkit-clear-button,
input[type="date"]::-webkit-inner-spin-button,
input[type="date"]::-webkit-outer-spin-button {
  display: none;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html {
  font-size: 62.5%;
  font-family: "Montserrat", sans-serif;
}

body {
  @media screen and (min-width: 768px) {
    overflow-x: hidden;
  }
}

a {
  text-decoration: none !important;
}

.slideInNav--time {
  transition: 0.5s;
  will-change: transform;
}
.slideOutNav--time {
  transition: 0.5s;
  will-change: transform;
}

.slideInNav {
  transform: translateX(-10vw);
}

.slideOutNav {
  transform: translateX(-10vw);
}

.slideInLeft--time {
  transition: 1s;
  will-change: transform;
}
.slideOutLeft--time {
  transition: 0.5s;
  will-change: transform;
}

.slideInLeft {
  opacity: 0;
  @media screen and (min-width: 768px) {
    transform: translateX(-10vw);
  }
}

.slideOutLeft {
  opacity: 0;
  @media screen and (min-width: 768px) {
    transform: translateX(10vw);
  }
}

.slideDown--time {
  transition: 0.5s;
  will-change: transform;
}

.slideDown {
  opacity: 0;
  transform: translateY(-10vh);
}

.wrapper {
  @media screen and (min-width: 768px) {
    padding-top: 10px
  }
}

.table__title {
  position: relative;
  z-index: 9999;
  font-weight: 900 !important;
  flex-grow: 3 !important;
}

.nav {
  .md-ripple {
    justify-content: flex-start !important;
  }
}
.empty {
  height: calc(100vh - 50px);
  cursor: pointer;
}

.table {
  font-size: 1px;
  // margin: 0 auto;
  margin-bottom: 10vh;
  @media screen and (min-width: 768px) {
    // width: 75%;
    margin-left: 8%;
  }
  @media screen and (min-width: 1367px) {
    // width: 75%;
    // margin: 0 auto;
    margin-bottom: 10vh;
  }
}
.table--row {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  text-transform: capitalize;
  .md-table-head {
    width: 25vw;
    text-align: center;
  }
  .md-table-cell {
    width: 25vw;
    height: auto !important;
    text-align: center;
  }

  @media screen and (min-width: 768px) {
    display: table-row;
    &:nth-of-type(1) {
      display: table-row;
    }
  }
}
.table--sort {
  cursor: pointer;
  &:hover {
    background-color: #ddd;
  }
}
.md-table-cell {
  @media screen and (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
}

.md-menu-content {
  z-index: 99999 !important;
}
@media screen and (max-width: 768px) {
  .md-table-cell-container {
    padding: 4px 8px !important;
  }
  .md-table-head-label {
    padding: 0 8px !important;
  }
}
.logo__container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  @media screen and (max-width: 768px) {
    display: none;
  }
}
.logo__logo {
  margin: 0 auto;
  width: 15%;
}
.table__header {
  @media screen and (max-width: 768px) {
    margin-top: 10px;
    display: flex !important;
    flex-flow: column nowrap !important;
    justify-content: center !important;
    align-items: center !important;
  }
}

.table__search {
  @media screen and (min-width: 768px) {
    margin-right: 40px !important;
  }
}
</style>
