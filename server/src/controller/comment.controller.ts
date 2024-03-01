import { Request, Response } from "express";
import { IRequest } from "../interface/express";
import { Comments } from "../model/commentmodel";
import mongoose from "mongoose";

const createComment = async (req: IRequest, res: Response) => {
  if (!req.user)
    return res.status(400).json({ message: "INvalid Authentcation" });
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

const getComments = async (req: Request, res: Response) => {
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
          ],
        },
      },
    ]);
    console.log(data);
    // const data = await Comments.aggregate([
    //   {
    //     $facet: {
    //       totalData: [
    //         {
    //           $match: {
    //             blog_id: new mongoose.Types.ObjectId(req.params.id),
    //           },
    //         },
    //         {
    //           $lookup: {
    //             from: "users",
    //             localField: "user",
    //             foreignField: "_id",
    //             as: "user",
    //           },
    //         },
    //         { $unwind: "$user" },
    //       ],
    //       totalCount: [],
    //     },
    //   },
    // ]);

    // const data = await Comments.aggregate([
    //   {
    //     $facet: {
    //       totalData: [
    //         {
    //           $match: {
    //             blog_id: new mongoose.Types.ObjectId(req.params.id),
    //             comment_root: { $exists: false },
    //             reply_user: { $exists: false },
    //           },
    //         },
    //         {
    //           $lookup: {
    //             from: "users",
    //             localField: "user",
    //             foreignField: "_id",
    //             as: "user",
    //           },
    //         },
    //         { $unwind: "$user" },
    //         {
    //           $addFields: {
    //             replyCM: { $ifNull: ["$replyCM", []] },
    //           },
    //         },
    //         {
    //           $lookup: {
    //             from: "comments",
    //             let: { cm_id: "$replyCM" },
    //             pipeline: [
    //               {
    //                 $match: {
    //                   $expr: {
    //                     $in: ["$_id", "$$cm_id"],
    //                   },
    //                 },
    //               },
    //               {
    //                 $lookup: {
    //                   from: "users",
    //                   localField: "user",
    //                   foreignField: "_id",
    //                   as: "user",
    //                 },
    //               },
    //               { $unwind: "$user" },
    //               {
    //                 $lookup: {
    //                   from: "users",
    //                   localField: "reply_user",
    //                   foreignField: "_id",
    //                   as: "reply_user",
    //                 },
    //               },
    //               { $unwind: "$reply_user" },
    //             ],
    //             as: "replyCM",
    //           },
    //         },
    //         { $sort: { createdAt: -1 } },
    //         { $skip: skip },
    //         { $limit: limit },
    //       ],
    //       totalCount: [
    //         {
    //           $match: {
    //             blog_id: new mongoose.Types.ObjectId(req.params.id),
    //             comment_root: { $exists: false },
    //             reply_user: { $exists: false },
    //           },
    //         },
    //         { $count: "count" },
    //       ],
    //     },
    //   },
    //   {
    //     $project: {
    //       count: { $arrayElemAt: ["$totalCount.count", 0] },
    //       totalData: 1,
    //     },
    //   },
    // ]);

    return res.status(200).json({ message: " you are in getComment route!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const replyComment = async (req: IRequest, res: Response) => {
  if (!req.user)
    return res.status(400).json({ message: "Invalidate Authentication!" });

  try {
    const { content, blog_id, blog_user_id, reply_user, comment_root } =
      req.body;

    const newComment = new Comments({
      user: req.user._id,
      content,
      blog_id,
      blog_user_id,
      reply_user,
      comment_root,
    });

    return res.status(200).json(newComment);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const CommentController = {
  createComment,
  getComments,
  replyComment,
};
