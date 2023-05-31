import sequelize from "../../../configs/DB/sequelize";
import {
  DataTypes,
  HasManyAddAssociationsMixin,
  HasManyGetAssociationsMixin,
  HasManyRemoveAssociationsMixin,
  Model,
} from "sequelize";
import bcrypt from "bcryptjs";
import { Permission } from "../../../models";
import Role from "../../roles/models/role.model";

class User extends Model {
  declare addRoles: HasManyAddAssociationsMixin<Role, Array<object>>;
  declare getRoles: HasManyGetAssociationsMixin<Role>;
  declare removeRoles: HasManyRemoveAssociationsMixin<Role, Role>;

  id!: number;
  name!: string;
  email!: string;
  photo!: string;
  phone!: string;
  address!: string;
  password!: string;
  passwordConfirm!: Date;
  passwordChangedAt: Date | undefined;
  permissions!: Permission[] | string[];
  roles!: Role[];

  correctPassword(candidatePassword: string, userPassword: string): boolean {
    return bcrypt.compareSync(candidatePassword, userPassword);
  }

  changedPasswordAfter(JWTTimestamp: number): boolean {
    if (this.passwordChangedAt) {
      const changedTimestamp = this.passwordChangedAt.getTime() / 1000;

      return JWTTimestamp < changedTimestamp;
    }
    return false;
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: false,
    },

    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value: string) {
        const hashedPassword = bcrypt.hashSync(value, 10); // hash the password with 10 salt rounds
        this.setDataValue("password", hashedPassword); // set the hashed password as the value for the password field
      },
    },
    passwordConfirm: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    photo: {
      type: DataTypes.STRING,
      allowNull: true, // or false, depending on your requirements
    },

    phone: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },

    address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: false,
    },
    passwordChangedAt: {
      type: DataTypes.DATE,
    },
    passwordResetToken: {
      type: DataTypes.STRING,
    },
    passwordResetExpires: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    tableName: "users",
  }
);

User.addHook(
  "afterUpdate",
  "updatePasswordChangedAt",
  async (user: User): Promise<void> => {
    if (user.changed("password")) {
      user.passwordChangedAt = new Date(Date.now() - 1000);
      user.save();
    }
  }
);

export default User;
