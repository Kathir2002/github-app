export const apiUrlDB = "http://localhost:5000";
// export const apiUrlDB = "https://github-app-api.onrender.com";
export const handleLoginWithSignin = () => {
  window.open(`http://localhost:5000/api/auth/github`, "_self");
};
