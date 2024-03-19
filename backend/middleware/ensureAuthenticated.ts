export async function ensureAuthenticated(req: any, res: any, next: any) {
  console.log(
    req?.session,
    req?.isAuthenticated(),
    req?.user,
    "---------------------------------"
  );
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect(process.env.CLIENT_BASE_URL + "/login");
}
