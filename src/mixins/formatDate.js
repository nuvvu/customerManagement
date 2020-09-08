export default {
  methods: {
    $formatDate(date) {
      const formatter = new Intl.DateTimeFormat('pl', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

      return date === '-' ? '-' : formatter.format(new Date(date));
    },
  },
};
