import express from "express";
import sequelize from "./helpers/db";
import "reflect-metadata";
import userRoutes from "./routes/UserRoutes";

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.use("/users", userRoutes);

(async () => {
    try {
        await sequelize.sync()
        console.log('Connection has been established successfully.');

        app.listen(3000, () => {
            console.log("Server started on port 3000");
        });
    } catch (error) {
        console.error(error);
    }
})()

