import UserModel from "../models/user.model";

class user {
  async getUserProfileAndRepo(req: any, res: any) {
    try {
      const { username } = req.params;
      await fetch(`https://api.github.com/users/${username}`, {
        headers: {
          Authorization: `token ${process.env.GITHUB_API}`,
        },
      }).then(async (userRes) => {
        const userProfile = await userRes.json();
        await fetch(userProfile?.repos_url, {
          headers: {
            Authorization: `token ${process.env.GITHUB_API}`,
          },
        }).then(async (reposRes) => {
          const reposData = await reposRes.json();
          res
            ?.status(200)
            ?.json({ userProfile: userProfile, repos: reposData });
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
      const userToLike = await UserModel.findOne({ username: username });
      if (!userToLike) {
        return res?.status(404).json({ message: "No such user found" });
      }
      if (user?.likedProfiles.includes(userToLike.username)) {
        return res
          ?.status(400)
          .json({ message: "You already liked this profile" });
      }
      userToLike.likedBy.push({
        username: user?.username,
        avatarUrl: user?.avatarUrl,
        likedDate: Date.now(),
      });
      user?.likedProfiles.push(userToLike.username);
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
