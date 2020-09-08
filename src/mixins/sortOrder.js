export default {
  methods: {
    $changeSortOrder(shouldChange, sortBy) {
      if (shouldChange === true) {
        const sortOrder = this.flag === true ? "asc" : "desc";

        this.flag = shouldChange ? !this.flag : this.flag;

        this.sort = sort || this.sort;
      }
    }
  }
};
