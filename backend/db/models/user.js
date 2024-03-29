"use strict";
const { Model, Validator } = require("sequelize");

const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      // context will be the User instance
      const { id, firstName, lastName, email } = this;
      return { id, firstName, lastName, email };
    }

    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }

    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }

    static async login({ credential, password }) {
      const { Op } = require("sequelize");
      const user = await User.scope("loginUser").findOne({
        where: {
          [Op.or]: {
            email: credential,
          },
        },
      });
      if (user && user.validatePassword(password)) {
        return await User.scope("currentUser").findByPk(user.id);
      }
    }

    static async signup({ firstName, lastName, email, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        firstName,
        lastName,
        email,
        hashedPassword,
      });
      return await User.scope("currentUser").findByPk(user.id);
    }

    static associate(models) {
      // define association here
      User.hasMany(models.Order, { foreignKey:'userId' })
      User.hasMany(models.UserDesign, { foreignKey:'userId' })
      User.hasOne(models.Cart, { foreignKey:'userId' })
    }
  }

  User.init(
    {
      firstName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
          len: [3, 256],
          isEmail: true,
        },
      },
      admin: {
        type: DataTypes.BOOLEAN
      },
      hashedPassword: {
        allowNull: false,
        type: DataTypes.STRING.BINARY,
        validate: {
          len: [60, 60],
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] },
        },
        loginUser: {
          attributes: {},
        },
      },
    }
  );
  return User;
};
