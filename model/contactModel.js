module.exports = (sequelize, DataTypes) => {
    const contact = sequelize.define("contacts", {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
    return contact;
  };