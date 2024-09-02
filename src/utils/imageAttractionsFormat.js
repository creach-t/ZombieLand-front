// Fonction utilitaire pour convertir le nom de l'attraction en nom de fichier
const formatAttractionNameToImageFileName = (name) => {
  const formattedName = name.toLowerCase().replace(/\s+/g, '-');
  return `bg-attraction-${formattedName}-zombieland.webp`;
};

export default formatAttractionNameToImageFileName;

