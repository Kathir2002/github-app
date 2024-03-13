import axios from "axios";
import { MdLogout } from "react-icons/md";
import { useAuthContext } from "../context/authContext";
import { toast } from "react-toastify";
import { apiUrlDB } from "../lib/functions";
// TODO Implement Logout functionality

const Logout = () => {
  const { authUser, setAuthUser }: any = useAuthContext();
  const handleLogout = async () => {
    await axios
      .get(`${apiUrlDB}/api/auth/logout`)
      .then((res) => {
        setAuthUser(null);
        toast.success(res?.data?.message);
      })
      .catch((err) => {
        toast.error(err?.message);
      });
  };
  return (
    <>
      <img
        src={authUser?.avatarUrl}
        className="w-10 h-10 rounded-full border border-gray-800"
      />

      <div
        className="cursor-pointer flex items-center p-2 rounded-lg bg-glass mt-auto border border-gray-800"
        onClick={() => handleLogout()}
      >
        <MdLogout size={22} />
      </div>
    </>
  );
};

export default Logout;
