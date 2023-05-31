import User from "./models/user.model";
import { storeDto, updateDto } from "./user.dto";

const getAllUsersRepo = async (): Promise<object> => {
  const users = await User.findAll();
  return users;
};

const storeUserRepo = async (data: object): Promise<object> => {
  const user = await User.create(storeDto(data));
  return user;
};

const updateuserRepo = async (data: object, id: string): Promise<object> => {
  const user = await User.update(updateDto(data), {
    where: { id },
    returning: true,
  });
  return user[1][0];
};

const showUserRepo = async (id: string): Promise<object | null> => {
  const user = await User.findByPk(id);
  return user;
};

const destroyUserRepo = (id: string): void => {
  User.destroy({ where: { id } });
};

export {
  getAllUsersRepo,
  storeUserRepo,
  updateuserRepo,
  showUserRepo,
  destroyUserRepo,
};
