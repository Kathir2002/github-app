import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import Repos from "../components/Repos";

const ExplorePage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [repoLoading, setRepoLoading] = useState<boolean>(false);
  const [repos, setRepos] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [offset, setOffset] = useState(10);

  useEffect(() => {
    if (offset > 10 && selectedLanguage != "") {
      exploreRepos(selectedLanguage, 0);
    }
  }, [offset]);

  const EXPLORE_LANGUAGES = [
    { languageName: "javascript", imgSrc: "/javascript.svg" },
    { languageName: "typescript", imgSrc: "/typescript.svg" },
    { languageName: "c++", imgSrc: "/c++.svg" },
    { languageName: "python", imgSrc: "/python.svg" },
    { languageName: "java", imgSrc: "/java.svg" },
  ];

  const exploreRepos = async (language: string, limit?: any) => {
    setSelectedLanguage(language);
    if (offset == 10) setLoading(true);
    if (limit > 0) setOffset(10);
    await axios
      .get(`/api/explore/${language}/${limit > 0 ? limit : offset}`)
      .then((res) => {
        setRepoLoading(false);
        setRepos(res?.data?.popularRepos);
        setLoading(false);
      })
      .catch((err) => {
        setRepoLoading(false);
        setLoading(false);
        toast.error(err.message);
      });
  };
  const handleScroll = () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    setRepoLoading(true);
    setTimeout(() => {
      if (scrollTop + clientHeight >= scrollHeight) {
        setOffset((pre) => {
          return pre + 10;
        });
      }
    }, 500);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="px-4">
      <div className="bg-glass max-w-2xl mx-auto rounded-md p-4">
        <h1 className="text-xl font-bold text-center">
          Explore Popular Repositories
        </h1>
        <div className="flex flex-wrap gap-2 my-2 justify-center">
          {EXPLORE_LANGUAGES.map((language, index) => (
            <img
              key={index}
              onClick={() => {
                exploreRepos(language?.languageName, 10);
              }}
              src={language?.imgSrc}
              alt={`${language.languageName} logo`}
              className="h-11 sm:h-20 cursor-pointer"
            />
          ))}
        </div>
        {repos?.length > 0 && (
          <h2 className="text-lg font-semibold text-center my-4">
            <span className="bg-blue-100 text-blue-800 font-medium me-2 px-2.5 py-0.5 rounded-full">
              {selectedLanguage.toUpperCase()}
            </span>{" "}
            Repositories
          </h2>
        )}
        {!loading && repos?.length > 0 && (
          <Repos
            repos={repos}
            allwaysFullWidth={true}
            repoLoading={repoLoading}
          />
        )}
        {loading && <Spinner />}
      </div>
    </div>
  );
};

export default ExplorePage;
