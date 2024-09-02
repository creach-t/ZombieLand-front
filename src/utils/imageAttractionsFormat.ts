const formatAttractionNameToImageFileName = (name: string) => {
  const formattedName = name
    .toLowerCase() // Convertir en minuscule
    .replace(/['\s]+/g, '-'); // Remplacer les espaces et les apostrophes par des tirets

  return `bg-attraction-${formattedName}-zombieland.webp`;
};

export default formatAttractionNameToImageFileName;