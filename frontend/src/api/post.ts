
export const getAllPost = async (token: string) => {

  return await fetch(`${import.meta.env.VITE_DATABASE_URL}/api/post`, {
    headers: {
      'Authorization': 'Bearer ' + token
    },
  }).then(data => {
    console.log(data)
    return data.json();
  }).then(response => {
    console.log(response);
  }).catch(e => {
    console.log(e);
  });

}