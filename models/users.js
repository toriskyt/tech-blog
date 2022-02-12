const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class User extends Model {
    checkPassword(plainText){
        return bcrypt.compareSync(plainText, this.password)
    };
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4]
        }
    }
},{
    sequelize, 
    timestamps: false,
    freezeTableName: true,
    modelName: "user",
    hooks: {
        async beforeCreate(newUser){
            newUser.password = await bcrypt.hash(newUser.password, 10)
            return newUser
        }, 
        async beforeUpdate(newUser){
            newUser.password = await bcrypt.hash(newUser.password, 10)
            return newUser
        }, 
    }
})

module.exports = User