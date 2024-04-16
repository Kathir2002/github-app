export const apiUrlDB = "https://github-app.cyclic.app";
export const handleLoginWithSignin = () => {
  window.open(`${apiUrlDB}/api/auth/github`, "_self");
};
