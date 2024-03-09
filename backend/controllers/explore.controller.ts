import axios from "axios";

class explore {
  async explorePopularRepos(req: any, res: any) {
    try {
      const { language, offset } = req.params;
      await axios
        .get(
          `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=${offset}`,
          {
            headers: {
              Authorization: `token ${process.env.GITHUB_API}`,
            },
          }
        )
        .then(async (popularRepos) => {
          res?.status(200)?.json({ popularRepos: popularRepos?.data?.items });
        });
    } catch (err: any) {
      res?.status(500)?.json({ message: err?.message });
    }
  }
}

export const Explore = new explore();
