const fs = require('fs');
const data = require("./data.json");
// create // instructor
exports.post = (req, res) => {

    const keys = Object.keys(req.body);

    for(key of keys) {
        if(req.body[key] == "") {
            res.send("Preencha os Dados, Por Favor");
        }
    }
    // [...]
    data.instructors.push(req.body); // [ {...}, {...} ]

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if(err) return res.send("writeFile error");

        return res.redirect("/instructors");

    });

   // return res.send(req.body);
}