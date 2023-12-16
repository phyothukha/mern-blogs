import { useQuery } from "@tanstack/react-query";
import { axios } from "..";
import { BlogDetailByCategoryType, BlogPostType } from "../interface";
import { BlogByCategoryPayload } from "./interface";
import { getParams } from "../../../utils/getParams";

const getBlog = async () => {
  const res = await axios.get("/get/blogs");
  return res.data;
};

export const useGetBlogs = () => {
  return useQuery({
    queryKey: ["get-blogs"],
    queryFn: () => getBlog(),
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

  const res = await axios.get(`/blogs/${id}?${params}`);
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
