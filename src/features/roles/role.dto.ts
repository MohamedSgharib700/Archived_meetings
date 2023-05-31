const roleDto = (data: any): any => {
  return {
    name: data.name,
    permission_id: data.permission_id,
  };
};

export { roleDto };
