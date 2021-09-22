const truncate = (text: string, limite?: number) => {
  let limit = limite ? limite : 15;
  return text.length > limit ? text.substring(0, limit) + "..." : text.substring(0, 15);
}

export default truncate;
