import { Request, Response } from "express";
import { IRequest } from "../interface/express";
import { Comments } from "../model/commentmodel";
import mongoose from "mongoose";
import { usePagination } from "../service/blog.service";

const createComment = async (req: IRequest, res: Response) => {
  if (!req.user)
    return res.status(400).json({ message: "Invalid Authentication" });
  try {
    const { content, blog_id, blog_user_id } = req.body;
    const newComment = new Comments({
      user: req.user._id,
      content,
      blog_id,
      blog_user_id,
    });

    await newComment.save();
    return res
      .status(201)
      .json({ message: "comment create successfully!", newComment });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getComment = async (req: Request, res: Response) => {
  const { skip, limit } = usePagination(req);

  try {
    const data = await Comments.aggregate([
      {
        $facet: {
          totalData: [
            {
              $match: {
                blog_id: new mongoose.Types.ObjectId(req.params.id),
              },
            },
            {
              $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user",
              },
            },
            {
              $unwind: "$user",
            },
            {
              $sort: { createdAt: -1 },
            },
          ],
          totalCount: [
            { $match: { blog_id: new mongoose.Types.ObjectId(req.params.id) } },
            { $count: "count" },
            { $limit: limit },
            { $skip: skip },
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

    const comments = data[0].totalData;
    const count = data[0].count;
    let total = 0;
    if (count % limit === 0) {
      total = count / limit;
    } else {
      total = Math.floor(count / limit) + 1;
    }

    return res.status(200).json({ comments, total });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const replyComment = async (req: IRequest, res: Response) => {
  try {
    // const {}=

    return res.status(200).json({ message: "you are in reply comment route" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const commentController = {
  createComment,
  getComment,
  replyComment,
};
