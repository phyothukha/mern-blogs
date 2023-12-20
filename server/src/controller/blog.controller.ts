import { Request, Response } from "express";
import { IRequest } from "../interface/express";
import { Blogs } from "../model/blogmodel";
import mongoose from "mongoose";
import { usePagination } from "../service/blog.service";

const createBlog = async (req: IRequest, res: Response) => {
  if (!req.user)
    return res.status(400).json({ message: "Invalid Authentication!" });
  try {
    const { title, content, description, thumbnail, category } = req.body;

    const newBlog = new Blogs({
      user: req.user._id,
      title,
      content,
      description,
      thumbnail,
      category,
    });

    await newBlog.save();

    return res
      .status(200)
      .json({ message: "blog-create successfully!", newBlog });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getHomeBlog = async (req: Request, res: Response) => {
  try {
    const blogs = await Blogs.aggregate([
      /* to relation with user collection and blog collection! */
      {
        $lookup: {
          from: "users",
          let: { user_id: { $toObjectId: "$user" } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$user_id"] },
              },
            },
            /*the resetting of the values of existing fields  */
            { $project: { password: 0 } },
          ],
          as: "user",
        },
      },
      /* this data return user collection is array, to change array to object use $unwind! */
      {
        $unwind: "$user",
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      /* sorting this  */
      { $sort: { createdAt: -1 } },
      /* group by */
      {
        $group: {
          _id: "$category._id",
          name: { $first: "$category.name" },
          blogs: { $push: "$$ROOT" },
          // count: { $count: {} },
          count: { $sum: 1 },
        },
      },
      // pagination for blogs
      {
        $project: {
          name: 1,
          count: 1,
          blogs: {
            $slice: ["$blogs", 0, 4],
          },
        },
      },
    ]);

    return res.status(200).json(blogs);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getBlogsByCategory = async (req: IRequest, res: Response) => {
  try {
    const { limit, skip } = usePagination(req);

    const Data = await Blogs.aggregate([
      {
        $facet: {
          totalData: [
            {
              $match: {
                category: new mongoose.Types.ObjectId(req.params.id),
              },
            },
            {
              $lookup: {
                from: "users",
                let: { user_id: { $toObjectId: "$user" } },
                pipeline: [
                  { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                  { $project: { password: 0 } },
                ],
                as: "user",
              },
            },

            //array to object
            { $unwind: "$user" },
            // sorting

            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
          ],
          totalCount: [
            {
              $match: {
                category: new mongoose.Types.ObjectId(req.params.id),
              },
            },
            {
              $count: "count",
            },
          ],
        },
      },
      {
        $project: {
          count: { $arrayElemAt: ["$totalCount.count", 0] },
          totalData: 1,
        },
      },
    ]);

    const blogs = Data[0].totalData;
    const count = Data[0].count;

    // total page calculation
    let total = 0;
    if (count % limit === 0) {
      total = count / limit;
    } else {
      total = Math.floor(count / limit) + 1;
    }

    return res.status(200).json({ blogs, total });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getBlogsByUser = async (req: Request, res: Response) => {
  try {
    const { limit, skip } = usePagination(req);

    const Data = await Blogs.aggregate([
      {
        $facet: {
          totalData: [
            {
              $match: {
                user: new mongoose.Types.ObjectId(req.params.id),
              },
            },
            //user
            {
              $lookup: {
                from: "users", //from join collection
                let: { user_id: "$user" },
                pipeline: [
                  { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                  { $project: { password: 0 } },
                ],
                as: "user",
              },
            },
            { $unwind: "$user" },
            {
              $sort: { createdAt: -1 },
            },
            {
              $skip: skip,
            },
            {
              $limit: limit,
            },
          ],
          totalCount: [
            {
              $match: {
                user: new mongoose.Types.ObjectId(req.params.id),
              },
            },
            {
              $count: "count",
            },
          ],
        },
      },
      {
        $project: {
          count: {
            $arrayElemAt: ["$totalCount.count", 0],
          },
          totalData: 1, // 1 is not a varibale value this is true for database 0 false (just boolean)
        },
      },
    ]);
    const blogs = Data[0].totalData;
    const count = Data[0].count;
    const total =
      count % limit === 0 ? count / limit : Math.floor(count / limit) + 1;

    return res.status(200).json({ blogs, total });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const BlogController = {
  createBlog,
  getHomeBlog,
  getBlogsByCategory,
  getBlogsByUser,
};
