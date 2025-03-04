"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const hardcode_1 = require("./hardcode");
app_1.app.listen(hardcode_1.HARDCODE.PORT, () => {
    console.log('...server started in port ' + hardcode_1.HARDCODE.PORT);
});
