const signupDto = (data: any): any => {
  return {
    name: data.name,
    email: data.email,
    photo: data.photo,
    phone: data.phone,
    address: data.address,
    password: data.password,
    passwordConfirm: data.passwordConfirm,
    role_id: data.role_id,
  };
};

export { signupDto };
