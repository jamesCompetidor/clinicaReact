import app from "./app.js";
import { initDb } from "./database/initDb.js";

const start = async() => {
    await initDb();

    app.listen(3300, () => {
        console.log("Servidor rodando")
    });
};

start();