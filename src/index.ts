import {app} from "./app";
import {HARDCODE} from "./hardcode";

app.listen(HARDCODE.PORT, ()=> {
    console.log('...server started in port ' + HARDCODE.PORT)
})