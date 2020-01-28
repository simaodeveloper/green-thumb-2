export default [
  {
    label: 'Home',
    state: {
      started: false,
    },
  },
  {
    label: 'Sun',
    state: {
      values: ['high', 'low', 'no'],
      currentValue: null,
    },
  },
  {
    label: 'Water',
    state: {
      values: ['daily', 'regularly', 'rarely'],
      currentValue: null,
    },
  },
  {
    label: 'Pets',
    state: {
      values: ['false', 'true'],
      currentValue: null,
    },
  },
  {
    label: 'Catalog',
    data: {
      plants: [],
    },
  },
  {
    label: 'Product',
    state: {
      plant: {
        id: 1,
        name: 'Euphorbia eritrea',
        sun: 'high',
        water: 'rarely',
        url:
          'https://front-static-recruitment.s3.amazonaws.com/euphorbia-eritrea.jpg',
        price: 25,
        toxicity: false,
      },
      form: {
        fullname: '',
        email: '',
      },
    },
    finished: false,
  },
];
