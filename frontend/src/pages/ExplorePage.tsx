import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const ExplorePage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [repos, setRepos] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const exploreRepos = async (language: string) => {
    setLoading(true);
    await axios
      .get(
        `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=10`
      )
      .then((res) => {
        setRepos(res?.data?.items);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  return (
    <div className="px-4">
      <div className="bg-glass max-w-2xl mx-auto rounded-md p-4">
        <h1 className="text-xl font-bold text-center">
          Explore Popular Repositories
        </h1>
        <div className="flex flex-wrap gap-2 my-2 justify-center">
          <img
            onClick={() => exploreRepos("javascript")}
            src="/javascript.svg"
            alt="JavaScript"
            className="h-11 sm:h-20 cursor-pointer"
          />
          <img
            src="/typescript.svg"
            alt="TypeScript logo"
            className="h-11 sm:h-20 cursor-pointer"
          />
          <img
            src="/c++.svg"
            alt="C++ logo"
            className="h-11 sm:h-20 cursor-pointer"
          />
          <img
            src="/python.svg"
            alt="Python logo"
            className="h-11 sm:h-20 cursor-pointer"
          />
          <img
            src="/java.svg"
            alt="Java logo"
            className="h-11 sm:h-20 cursor-pointer"
          />
        </div>
        {repos?.length > 0 && (
          <h2 className="text-lg font-semibold text-center my-4">
            <span className="bg-blue-100 text-blue-800 font-medium me-2 px-2.5 py-0.5 rounded-full">
              {selectedLanguage.toUpperCase()}
            </span>{" "}
            Repositories
          </h2>
        )}
        {loading && <Spinner />}
      </div>
    </div>
  );
};

export default ExplorePage;
