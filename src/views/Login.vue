<template>
  <div class="login">
    <img src="../assets/logo-black.png" class="login__logo" />
    <form class="login__form md-layout" @keyup.enter="login">
      <md-card class="md-layout-item md-size-100">
        <md-card-header class="login__header">
          <md-icon style="margin: 0px 12px 0px 4px; color:#fff">lock</md-icon>
          <div class="md-title" style="font-weight:700; text-align:center">Logowanie</div>
        </md-card-header>
        <md-card-content class="login__content md-layout-item">
          <Input style="width:80%" mail="true" label="Email" v-model="email" />
          <Input style="width:80%" password="true" label="Hasło" v-model="password" />
          <md-button class="md-raised md-primary" @click="login">Zaloguj</md-button>
          <div class="login__error" v-if="error">{{this.error}}</div>
          <md-progress-spinner
            v-if="loading"
            style="margin: 16px 0"
            md-stroke="4"
            md-mode="indeterminate"
          />
        </md-card-content>
      </md-card>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";
import Input from "@/components/Input";

export default {
  name: "home",
  components: {
    Input
  },
  data() {
    return {
      email: "",
      password: "",
      error: "",
      loading: false
    };
  },
  methods: {
    login(e) {
      this.loading = true;
      e.preventDefault();
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          () => {
            this.$router.replace("Home");
            this.loading = false;
          },
          error => {
            this.error = error;
            this.loading = false;
          }
        );
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  &__logo {
    margin: 5vh 0;
    width: 15%;
    display: none;
    @media screen and (min-width: 768px) {
      display: block;
    }
  }
  &__form {
    width: 100%;
    height: 100vh;

    @media screen and (min-width: 768px) {
      width: 25%;
      height: 50vh;
    }
  }
  &__header {
    background-color: #5b98ff;
    color: #fff;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 100px;
    @media screen and (min-width: 768px) {
      margin-bottom: 50px;
    }
  }

  &__content {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
  }
  &__error {
    margin: 8px 0;
    font-weight: 700;
  }
}
</style>

