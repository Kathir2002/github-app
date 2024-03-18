export async function ensureAuthenticated(req: any, res: any, next: any) {
  const { session } = req;
  console.log(session?.passport?.user, "++++++++++");
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect(process.env.CLIENT_BASE_URL + "/login");
}
