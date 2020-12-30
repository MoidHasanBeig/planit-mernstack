import authRouter from './routes/auth';

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
  //test route
  app.use("/test",checkAuth,(req,res) => res.send('Access granted'));
}

export default router;
