export default {
  methods: {
    $handleModalOpen() {
      this.modal = true;
    },
  },
  mounted() {
    this.$root.$on('handleModalOpen', () => {
      this.modal = true;
    });
  },
};
