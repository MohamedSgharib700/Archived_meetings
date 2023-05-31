const videoDto = (data: any): any => {
  return {
    description: data.description,
    url: data.url,
    category_id: data.category_id,
  };
};

export { videoDto };
