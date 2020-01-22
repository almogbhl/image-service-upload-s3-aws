const getImages = () => "SELECT * FROM images";

const insertImage = values => {
  const keys = Object.keys(values).join(", ");
  const vals = Object.values(values)
    .map(item => `'${item}'`)
    .join(", ");

  return `INSERT INTO images (${keys}) VALUES (${vals})`;
};

module.exports = { getImages, insertImage };
