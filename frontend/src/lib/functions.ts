export const apiUrlDB = "https://github-app-api.onrender.com";
export const handleLoginWithSignin = () => {
  window.open(`${apiUrlDB}/api/auth/github`, "_self");
};
