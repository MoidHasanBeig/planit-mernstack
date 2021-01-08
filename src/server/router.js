import authRouter from './routes/auth';
import projectRouter from './routes/project';
import renderHtml from './routes/render';
import userRouter from './routes/user';

const checkAuth = (req,res,next) => {
  if(req.isAuthenticated()) next();
  else res.redirect('/login');
}

const router = (app,routerConf) => {

  //authentication
  app.use("/auth/google", authRouter);

  //login
  app.use("/login", (req,res) => {
    if(req.isAuthenticated()) res.redirect("/");
    else renderHtml(req,res,routerConf.prodMode,routerConf.compiler);
  });

  //logout
  app.use("/logout", (req,res) => {
    req.logout();
    res.redirect("/login");
  });

  //redirect after auth check
  app.all('*',checkAuth);

  //project
  app.use("/project", projectRouter);

  //user
  app.use("/getuser", userRouter);

  //render html layout
  app.use((req,res) => renderHtml(req,res,routerConf.prodMode,routerConf.compiler));
}

export default router;
