const filterDuplicate = (array: string[]) => {
  let hash: any[] = [];
  let result = array.filter((current: any) => {
    var exists = !hash[current.value];
    hash[current.value] = true;
    return exists;
  });
  return result;
}

export default filterDuplicate;
