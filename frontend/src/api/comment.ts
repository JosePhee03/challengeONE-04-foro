import { CreateComment, ErrorResponse } from "./api";

export const createComment = async (
  token: string | null,
  comment: CreateComment
) => {
  return await fetch(`${import.meta.env.VITE_DATABASE_URL}/api/comment`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  }).then((data) => {
    if (!data.ok) return Promise.reject(data);
    return data.json() as Promise<ErrorResponse>;
  });
};

export const deleteComment = async (
  token: string | null,
  commentId: number
) => {
  return await fetch(
    `${import.meta.env.VITE_DATABASE_URL}/api/comment/${commentId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  ).then((data) => {
    if (!data.ok) return Promise.reject(data);
  });
};
