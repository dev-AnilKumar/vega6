const express = require('express');
const app = express();
const dbConnect = require('./config/dbConnect');
const dotenv = require('dotenv');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const userRoute = require("./routes/UserRoutes")
const blogRoute = require("./routes/BlogRoutes")
dotenv.config();
dbConnect();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(fileUpload({
    useTempFiles: true
}))

app.get("/", (req, res) => res.send("Express "));
app.get("/hello", (req, res) => res.send("Hello "));


app.use("/api/user", userRoute)
app.use("/api/blog", blogRoute)

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})


