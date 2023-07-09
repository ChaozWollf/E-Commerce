const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false

    // define columns
  },
prodcut_id: {
  type: DataTypes.INTEGER,
  // add Foriegn key to Products model
  foreignKey: {
    name: 'product_id'
  }
},

tag_id: {
  type: DataTypes.INTEGER,
  //add foriegn key that refernces the Tag model's id
  foreignKey: {
    name: 'tag_id'
}

},
  }, 
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
