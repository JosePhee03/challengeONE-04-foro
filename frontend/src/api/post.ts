import { CreatePost, ErrorResponse, UpdatePost } from "./api";

export const getAllPost = async (
  token: string | null,
  page: number,
  q?: string,
  direction?: string,
  categories?: number[],
  status?: boolean,
  signal?: AbortSignal,
  userId?: number
) => {
  const userURL = userId == undefined ? "" : `/user/${userId}`;

  const buildRequest = new URL(
    `${import.meta.env.VITE_DATABASE_URL}/api/post${userURL}`
  );

  buildRequest.searchParams.set("page", `${page}`);
  buildRequest.searchParams.set("size", "5");

  if (q != undefined) buildRequest.searchParams.set("q", q);
  if (direction != undefined)
    buildRequest.searchParams.set("direction", direction);
  if (categories != undefined)
    buildRequest.searchParams.set("categories", categories.join(","));
  if (status != undefined)
    buildRequest.searchParams.set("status", status ? "1" : "0");

  return await fetch(buildRequest, {
    headers: {
      Authorization: "Bearer " + token,
    },
    signal,
  }).then((data) => {
    if (!data.ok) return Promise.reject(data);
    return data.json() as unknown;
  });
};

export const createPost = async (token: string | null, post: CreatePost) => {
  return await fetch(`${import.meta.env.VITE_DATABASE_URL}/api/post`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  }).then((data) => {
    return data.json() as Promise<ErrorResponse>;
  });
};

export const getPost = async (token: string | null, postId: number) => {
  return await fetch(
    `${import.meta.env.VITE_DATABASE_URL}/api/post/${postId}`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  ).then((data) => {
    if (!data.ok) return Promise.reject(data);
    return data.json() as unknown;
  });
};

export const getCommentFromPost = async (
  token: string | null,
  postId: number,
  direction: "ASC" | "DESC"
) => {
  const buildRequest = new URL(
    `${
      import.meta.env.VITE_DATABASE_URL
    }/api/post/${postId}/comment?direction=${direction}`
  );
  if (direction != undefined)
    buildRequest.searchParams.set("direction", direction);

  return await fetch(buildRequest, {
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then((data) => {
    if (!data.ok) return Promise.reject(data);
    return data.json() as unknown;
  });
};

export const deletePost = async (token: string | null, postId: number) => {
  return await fetch(
    `${import.meta.env.VITE_DATABASE_URL}/api/post/${postId}`,
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

export const updateStatusFromPost = async (
  token: string | null,
  postId: number,
  status: UpdatePost["status"]
) => {
  return await fetch(
    `${import.meta.env.VITE_DATABASE_URL}/api/post/${postId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: status }),
    }
  ).then((data) => {
    return data.json() as Promise<ErrorResponse>;
  });
};
