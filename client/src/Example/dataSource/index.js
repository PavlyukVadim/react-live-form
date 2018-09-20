const dataSource = {
  d: {
    date: {},
  },
};

const getDateValue = () => new Date();

dataSource.d.date.getDateValue = getDateValue;

export default dataSource;
