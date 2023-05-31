const storeDto = (data: any): any => {
  return {
    name: data.name,
    email: data.email,
    photo: data.photo,
    phone: data.phone,
    address: data.address,
    password: data.password,
    passwordConfirm: data.passwordConfirm,
  };
};

const updateDto = (data: any): any => {
  return {
    name: data.name,
    email: data.email,
    photo: data.photo,
    phone: data.phone,
    address: data.address,
  };
};

export { storeDto, updateDto };
