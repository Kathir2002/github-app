import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/authContext";

const LikeProfile = ({ userProfile }: any) => {
  const { authUser }: any = useAuthContext();
  const isOwnProfile = authUser?.userName == userProfile?.login;

  const handleLikeProfile = async () => {
    await axios
      .request({
        method: "POST",
        url: `/api/users/like/${userProfile?.login}`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res: any) => {
        toast.success(res?.data?.message);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };
  if (!authUser || isOwnProfile) return null;
  return (
    <button
      onClick={() => handleLikeProfile()}
      className="p-2 text-xs w-full font-medium rounded-md bg-glass border border-blue-400 flex items-center gap-2"
    >
      <FaHeart size={16} /> Like Profile
    </button>
  );
};

export default LikeProfile;
