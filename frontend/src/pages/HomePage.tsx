import Search from "../components/Search";
import SortRepos from "../components/SortRepos";
import ProfileInfo from "../components/ProfileInfo";
import Repos from "../components/Repos";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Spinner from "../components/Spinner";

const HomePage = () => {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [repos, setRepos] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [sortType, setSortType] = useState("recent");

  const getUserProfileAndRepos = useCallback(
    async (userName: string = "Kathir2002") => {
      setLoading(true);
      await axios
        .get(`http://localhost:5000/api/users/profile/${userName}`, {})
        .then(async (res: any) => {
          console.log(res);

          setUserProfile(res?.data?.userProfile);
          setLoading(false);
          repos.sort(
            (a: any, b: any) =>
              new Date(b?.created_at) - new Date(a?.created_at)
          );
          setRepos(res?.data?.repos);
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err?.message);
        });
    },
    []
  );

  useEffect(() => {
    getUserProfileAndRepos();
  }, [getUserProfileAndRepos]);

  const onSearch = async (event: any, userName: any) => {
    event.preventDefault();
    setLoading(true);
    setRepos([]);
    setUserProfile(null);
    await getUserProfileAndRepos(userName);
    setSortType("recent");
  };

  const onSort = (sortType: string) => {
    if (sortType == "recent") {
      repos.sort(
        (a: any, b: any) => new Date(b.created_at) - new Date(a.created_at)
      ); //descending order
    } else if (sortType == "stars") {
      repos.sort((a: any, b: any) => b.stargazers_count - a.stargazers_count); // descending order
    } else if (sortType == "forks") {
      repos.sort((a: any, b: any) => b.forks_count - a.forks_count);
    }
    setSortType(sortType);
    setRepos([...repos]);
  };

  return (
    <div className="m-4">
      <Search onSearch={onSearch} />
      {repos?.length > 0 && <SortRepos onSort={onSort} sortType={sortType} />}
      <div className="flex gap-4 flex-col lg:flex-row justify-center items-start">
        {userProfile && !loading && <ProfileInfo userProfile={userProfile} />}
        {!loading && <Repos repos={repos} />}
        {loading && <Spinner />}
      </div>
    </div>
  );
};

export default HomePage;
