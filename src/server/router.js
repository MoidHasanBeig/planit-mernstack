import authRouter from './routes/auth';
import projectRouter from './routes/project';
import renderHtml from './routes/render';
import userRouter from './routes/user';

const checkAuth = (req,res,next) => {
  if(req.isAuthenticated()) next();
  else res.redirect('/login');
}

const router = (app,routerConf) => {
  //redirect after auth check
  app.all("/", checkAuth);

  //authentication
  app.use("/auth/google", authRouter);

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

  //project
  app.use("/project", checkAuth, (req,res) => projectRouter(req,res));

  //user
  app.use("/getuser", checkAuth, userRouter);

  //render html layout
  app.use((req,res) => renderHtml(req,res,routerConf.prodMode,routerConf.compiler));
}

export default router;
