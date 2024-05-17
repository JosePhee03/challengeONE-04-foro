export const getCategories = async (token: string | null) => {
  return await fetch(`${import.meta.env.VITE_DATABASE_URL}/api/category`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then((data) => {
    if (!data.ok) return Promise.reject(data);
    return data.json() as unknown;
  });
};
