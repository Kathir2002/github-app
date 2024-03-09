import axios from "axios";

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
}

export const User = new user();
