// const pool = require("pg").Pool;
import Pool from "pg-pool";

const dbPool = new Pool({
    // user: "postgres",
    // host: "127.0.0.1",
    // database: "shortit",
    // password: "1",
    // port: 5432,
    connectionString:'postgres://lhpkvvzf:j1jbVUZ1_B7yFWuMCmKWRMeS0rB7ddDL@tiny.db.elephantsql.com/lhpkvvzf',
});

export default dbPool;