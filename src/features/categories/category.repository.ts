import { categoryDto } from "./category.dto";
import { Category } from "./models/category.model";

const getAllCategoriesRepo = async (): Promise<object> => {
  const categories = await Category.findAll();
  return categories;
};

const createCategoryRepo = async (data: object): Promise<object> => {
  const category = await Category.create(categoryDto(data));
  return category;
};

const showCategoryRepo = async (id: string): Promise<object | null> => {
  const category = await Category.findByPk(id);
  return category;
};

const updateCategoryRepo = async (
  data: object,
  id: string
): Promise<object> => {
  const category = await Category.update(categoryDto(data), {
    where: { id },
    returning: true,
  });
  return category[1][0];
};

const destroyCategoryRepo = (id: string): void => {
  Category.destroy({ where: { id } });
};

export {
  getAllCategoriesRepo,
  createCategoryRepo,
  updateCategoryRepo,
  showCategoryRepo,
  destroyCategoryRepo,
};
