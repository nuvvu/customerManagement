<template>
  <div>
    <md-field>
      <label class="label">{{label}}</label>
      <md-input v-if="this.text" type="text" @input="handleChange" :value="this.value" />
      <md-input v-if="this.password" type="password" @input="handleChange" :value="this.value" />
      <md-input v-if="this.mail" type="email" @input="handleChange" :value="this.value" />
      <md-input
        placeholder="Data"
        v-if="this.date"
        min="2019-01-01"
        max="2030-12-31"
        type="date"
        @input="handleChange"
        :value="this.value"
      />
    </md-field>
  </div>
</template>

<script>
export default {
  name: "Input",
  props: {
    label: "",
    value: "",
    date: false,
    mail: false,
    password: false,
    text: false
  },
  methods: {
    handleChange(e) {
      this.$emit("input", e);
    }
  }
};
</script>

