export const getParams = ({ page, limit }: ApiPayload) => {
  let params = `page=${page}`;
  params += limit ? `&limit=${limit}` : "";
  return params;
};
