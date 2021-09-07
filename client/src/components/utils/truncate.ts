const truncate = (text: string, limite?: number) => {
  let limit = limite ? limite : 15;
  return text.length > limit ? text.substring(0, 15) + "..." : text;
}

export default truncate;
