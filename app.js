import express from "express";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
// import groupRoutes from "./routes/groupRoutes.js";
// import surveyRoutes from "./routes/surveyRoutes.js";
// import questionsRoutes from "./routes/questionsRoutes.js";

//import auth from "./middleware/auth.js";

const app = express();
app.use(cors());
app.use(express.json());
 
 app.use("/auth", authRoutes);
// app.use("/group", auth, groupRoutes);
// app.use("/survey", auth, surveyRoutes);
// app.use('/questions', auth, questionsRoutes);

app.listen(1001, () => console.log("Server running on port 1001"));
