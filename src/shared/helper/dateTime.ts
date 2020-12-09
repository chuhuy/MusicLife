export const formatYYYYMMDD = (time: any) => {
  let dd = time.getDate();
  let mm = time.getMonth() + 1;

  let yyyy = time.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  return yyyy + '-' + mm + '-' + dd;
};
