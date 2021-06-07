const generateString = (length: number) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  let charactersLength = characters.length;

  for ( var i = 0; i < length; i++ ) {
    result += (characters.charAt(Math.floor(Math.random() * charactersLength)));
  }
  return result;
}

export default generateString
