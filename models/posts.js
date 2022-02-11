const {Model, DataTypes} = require("sequelize")
const sequelize = require("../config/connection")
const bcrypt = require("bcrypt")

class Posts extends Model {
    checkPassword(plainText){
        return bcrypt.compareSync(plainText, this.password)
    }
}

Posts.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: "user",
            key: "id"
        }
    }
},{
    sequelize, 
    timestamps: false,
    freezeTableName: true,
    modelName: "post",
})

module.exports = Posts