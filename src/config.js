import "dotenv/config"


const DB_PASSWORD = process.env.DB_PASSWORD


export default {

    mongoDB: {
        URL: (database) => `mongodb+srv://tomas:${DB_PASSWORD}@cluster0.lefks.mongodb.net/${database}?retryWrites=true&w=majority`,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }

}
