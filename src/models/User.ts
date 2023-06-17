import { Model, DataTypes } from 'sequelize';
import sequelize from '../helpers/db';
import { hashPassword } from '../services';

export class User extends Model {

    setPassword(password: string) {
        this.password = password;
    }

    declare id: number;
    declare name: string;
    declare email: string;
    declare password: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
    },
    {
        tableName: 'users',
        sequelize,
        timestamps: false
    }
);

User.beforeUpdate((user: User) => {
    if (user.changed('password')) {
        user.setPassword(hashPassword(user.password))
    }
});

User.beforeCreate((user: User) => {
    user.setPassword(hashPassword(user.password))
});
