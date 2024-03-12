import axios from "axios";
import UserModel from "../models/user.model";

class user {
  async getUserProfileAndRepo(req: any, res: any) {
    try {
      const { userName } = req.params;
      await axios
        .get(`https://api.github.com/users/${userName}`, {
          headers: {
            Authorization: `token ${process.env.GITHUB_API}`,
          },
        })
        .then(async (userRes) => {
          await axios.get(userRes?.data?.repos_url).then((reposRes) => {
            res
              ?.status(200)
              ?.json({ userProfile: userRes?.data, repos: reposRes?.data });
          });
        });
    } catch (err: any) {
      res?.status(500)?.json({ message: err?.message });
    }
  }

  async likeProfile(req: any, res: any) {
    try {
      const { username } = req?.params;

      const user = await UserModel.findById(req.user._id.toString());
      const userToLike = await UserModel.findOne({ userName: username });
      if (!userToLike) {
        return res?.status(404).json({ message: "No such user found" });
      }
      if (user?.likedProfiles.includes(userToLike.userName)) {
        return res
          ?.status(400)
          .json({ message: "You already liked this profile" });
      }
      userToLike.likedBy.push({
        userName: user?.userName,
        avatarUrl: user?.avatarUrl,
        likedDate: Date.now(),
      });
      user?.likedProfiles.push(userToLike.userName);
      await Promise.all([userToLike.save(), user?.save()]);
      res?.status(200).json({ message: "Liked successfully" });
    } catch (err: any) {
      res.status(500).json({ message: err?.message });
    }
  }

  async getLikes(req: any, res: any) {
    try {
      const user = await UserModel.findById(req.user._id.toString());
      res.status(200).json({ likedBy: user?.likedBy });
    } catch (err: any) {
      res.status(500).json({ message: err?.message });
    }
  }
}

export const User = new user();
