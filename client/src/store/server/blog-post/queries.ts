import { useQuery } from "@tanstack/react-query";
import { axios } from "..";
import {
  BlogByCategoryPayload,
  BlogByUserPayload,
  BlogDetail,
  BlogDetailByCategoryType,
  BlogDetailByUserType,
  BlogPostType,
  SelectedBlog,
} from "./interface";
import { getParams } from "../../../utils/getParams";

const getBlogs = async () => {
  const res = await axios.get("/get/blogs");
  return res.data;
};

export const useGetBlogs = () => {
  return useQuery({
    queryKey: ["get-blogs"],
    queryFn: () => getBlogs(),
    select: (data: BlogPostType[]) =>
      data.map((blog) => ({
        id: blog._id,
        name: blog.name,
        count: blog.count,
        blogs: blog.blogs,
      })),
  });
};

const getBlogByCategory = async ({
  id,
  ...payload
}: BlogByCategoryPayload): Promise<BlogDetailByCategoryType> => {
  const params = getParams(payload);

  const res = await axios.get(`/blogs/category/${id}?${params}`);
  return res.data;
};

export const useGetBlogByCategory = ({
  id,
  ...payload
}: BlogByCategoryPayload) => {
  return useQuery({
    queryKey: ["get-blog-byCategory", id, payload],
    queryFn: () => getBlogByCategory({ id, ...payload }),
  });
};

const getBlogByUser = async ({
  id,
  ...payload
}: BlogByUserPayload): Promise<BlogDetailByUserType> => {
  const params = getParams(payload);

  const res = await axios.get(`/blogs/user/${id}?${params}`);
  return res.data;
};

export const useGetBlogByUser = ({ id, ...payload }: BlogByUserPayload) => {
  return useQuery({
    queryKey: ["get-blog-byUser", id, payload],
    queryFn: () => getBlogByUser({ id, ...payload }),
  });
};

const getBlog = async (id: string): Promise<BlogDetail> => {
  const res = await axios.get(`/blog/detail/${id}`);

  return res.data;
};

export const useGetBlog = (id: string) => {
  return useQuery({
    queryKey: ["get-blog", id],

    queryFn: () => getBlog(id),
    select: (data): SelectedBlog => ({
      id: data._id,
      content: data.content,
      title: data.title,
      description: data.description,
      BlogImage: data.thumbnail,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      user: data.user,
      userId: data.user._id,
      userImage: data.user.avatar,
    }),
  });
};
