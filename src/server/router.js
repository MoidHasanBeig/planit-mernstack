import authRouter from './routes/auth';
import projectRouter from './routes/project';

const checkAuth = (req,res,next) => {
  if(req.isAuthenticated()) next();
  else res.redirect('/login');
}

const router = (app) => {
  //redirect after auth check
  app.all("/", checkAuth);

  //authentication
  app.use("/auth/google",authRouter);

  //login
  app.use("/login", (req,res,next) => {
    if(req.isAuthenticated()) res.redirect("/");
    else next();
  });

  //logout
  app.use("/logout", (req,res) => {
    req.logout();
    res.redirect("/login");
  });

  //project routes
  app.use("/project", projectRouter);
}

export default router;
