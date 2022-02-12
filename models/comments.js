const { Model, DataTypes } = require("sequelize")
const sequelize = require("../config/connection")
const bcrypt = require("bcrypt")

class Comments extends Model {
    checkPassword(plainText) {
        return bcrypt.compareSync(plainText, this.password)
    }
}

Comments.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4]
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id"
        }
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "posts",
            key: "id"
        }
    },
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: "comments",
})

module.exports = Comments