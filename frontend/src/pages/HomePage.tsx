import Search from "../components/Search";
import SortRepos from "../components/SortRepos";
import ProfileInfo from "../components/ProfileInfo";
import Repos from "../components/Repos";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Spinner from "../components/Spinner";
import { apiUrlDB } from "../lib/functions";
import { useAuthContext } from "../context/authContext";

const HomePage = () => {
  console.log(document.cookie, "----------------");

  const [userProfile, setUserProfile] = useState<any>(null);
  const [repos, setRepos] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { authUser }: any = useAuthContext();

  const [sortType, setSortType] = useState("recent");

  const getUserProfileAndRepos = useCallback(
    async (
      username: string = authUser?.username ? authUser?.username : "Kathir2002"
    ) => {
      setLoading(true);
      await axios
        .get(`${apiUrlDB}/api/users/profile/${username}`)
        .then(async (res: any) => {
          setUserProfile(res?.data?.userProfile);
          setLoading(false);
          res?.data?.repos.sort(
            (a: any, b: any) =>
              //@ts-ignore
              new Date(b?.created_at) - new Date(a?.created_at)
          );
          setRepos(res?.data?.repos);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err?.message);

          toast.error("Something went wrong! Please try again later.");
        });
    },
    []
  );

  useEffect(() => {
    getUserProfileAndRepos();
  }, [getUserProfileAndRepos]);

  const onSearch = async (event: any, username: any) => {
    event.preventDefault();
    setLoading(true);
    setRepos([]);
    setUserProfile(null);
    await getUserProfileAndRepos(username);
    setSortType("recent");
  };

  const onSort = (sortType: string) => {
    if (sortType == "recent") {
      repos.sort(
        //@ts-ignore
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
    <div className={`m-4`}>
      <Search onSearch={onSearch} />
      {repos?.length > 0 && <SortRepos onSort={onSort} sortType={sortType} />}
      <div className="flex gap-4 flex-col lg:flex-row justify-center items-start">
        {userProfile && !loading && <ProfileInfo userProfile={userProfile} />}
        {!loading && <Repos repos={repos} />}
        {loading && (
          <div className="flex self-center ">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
