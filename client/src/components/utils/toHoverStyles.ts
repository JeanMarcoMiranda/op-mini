const toHoverStyle = (stylesOnHover: string): string => {
  const stylesSplited = stylesOnHover.split(' ');
  let hoverStyles = '';

  stylesSplited.forEach((style, index) => {
    let newStyle = `hover:${style}`;
    if (index !== stylesSplited.length - 1) {
      newStyle = newStyle + ' ';
    }
    hoverStyles = hoverStyles + newStyle;
  });

  return hoverStyles;
}

export default toHoverStyle
