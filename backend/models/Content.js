// backend/models/Content.js (Sequelize or similar ORM)
module.exports = (sequelize, DataTypes) => {
  const Content = sequelize.define('Content', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    donationInfo: DataTypes.TEXT,
    mediaPath: DataTypes.STRING
  });
  return Content;
};
