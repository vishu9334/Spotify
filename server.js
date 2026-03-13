
import app from './src/app.js';
import { DBconnection } from './src/config/db.js';

DBconnection()

app.listen(process.env.PORT, ()=>{
    console.log("server is running on port :",process.env.PORT)
})