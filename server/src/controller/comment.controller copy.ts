import { Request, Response } from "express";
import { Comments } from "../model/commentmodel";
import { IRequest } from "../interface/express";
import mongoose from "mongoose";
import { usePagination } from "../service/blog.service";

const createComment = async (req: IRequest, res: Response) => {
  if (!req.user)
    return res.status(400).json({ message: "invalid Authentication!" });

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
      .status(200)
      .json({ message: "comment create successsfully!", newComment });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getComments = async (req: Request, res: Response) => {
  const { limit, skip } = usePagination(req);

  try {
    const data = await Comments.aggregate([
      {
        $facet: {
          totalData: [
            {
              $match: {
                blog_id: new mongoose.Types.ObjectId(req.params.id),
                // comment_root: { $exists: false },
                // reply_user: { $exists: false },
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
            { $unwind: "$user" },
            {
              $lookup: {
                from: "comments",
                let: { cm_id: "$replyCM" },
                pipeline: [
                  { $match: { $expr: { $in: ["$_id", "$$cm_id"] } } },
                  {
                    $lookup: {
                      from: "users",
                      localField: "user",
                      foreignField: "_id",
                      as: "user",
                    },
                  },
                  { $unwind: "$user" },
                  {
                    $lookup: {
                      from: "users",
                      localField: "reply_user",
                      foreignField: "_id",
                      as: "reply_user",
                    },
                  },
                  { $unwind: "$reply_user" },
                ],
                as: "replyCM",
              },
            },
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
          ],
          totalCount: [
            {
              $match: {
                blog_id: new mongoose.Types.ObjectId(req.params.id),
                comment_root: { $exists: false },
                reply_user: { $exists: false },
              },
            },
            { $count: "count" },
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

    return res.json({ comments, total });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const replyComment = async (req: IRequest, res: Response) => {
  if (!req.user)
    return res.status(400).json({ msg: "invalid Authentication." });

  try {
    const { content, blog_id, blog_user_id, comment_root, reply_user } =
      req.body;

    const newComment = new Comments({
      user: req.user._id,
      content,
      blog_id,
      blog_user_id,
      comment_root,
      reply_user: reply_user._id,
    });

    await Comments.findOneAndUpdate(
      { _id: comment_root },
      {
        $push: { replyCM: newComment._id },
      }
    );

    await newComment.save();

    return res.json(newComment);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const CommentController = {
  createComment,
  getComments,
  replyComment,
};
