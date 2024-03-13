export async function ensureAuthenticated(req: any, res: any, next: any) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.res
    .header("Access-Control-Allow-Origin", "*")
    .redirect(process.env.CLIENT_BASE_URL + "/login");
}
