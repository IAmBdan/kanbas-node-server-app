import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import express from "express";
import cors from "cors";
import UserRoutes from "../src/Kanbas/Users/routes.js";
import "dotenv/config";
import session from "express-session";
import CourseRoutes from "../src/Kanbas/Courses/routes.js";
import ModuleRoutes from "../src/Kanbas/Courses/Modules/routes.js";
import AssignmentRoutes from "../src/Kanbas/Courses/Assignments/routes.js";

const app = express();

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}

app.use(cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:3000",
  })
 );
 
app.use(session(sessionOptions)); 
app.use(express.json());


UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
Lab5(app);
Hello(app);


app.listen(process.env.PORT || 4000)