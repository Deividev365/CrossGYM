const fs = require('fs');
const { parse } = require('path');
const data = require("./data.json");

//show instructor with 'id'
 exports.show = (req, res) => {
    
    const {id} = req.params;
    
    const foundInstructor = data.instructors.find( (instructor) => {
        return id == instructor.id;
    })

    if(!foundInstructor) {
        return res.send("Sorry, instructor not found :(");
    }


    function userAge(timestamp) {
        const today = new Date(); //
        const birthDate = new Date(timestamp);
    

        let userAge = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
    
    
        if(month < 0 ||
           month == 0 &&
           today.getDate() <= birthDate.getDate()) {

            userAge = userAge - 1;
        }
    
        return userAge;
    }
        
        const instructor = {
            ...foundInstructor,
            age: userAge(foundInstructor.birth),
            services: foundInstructor.services.split(","),
            created_at: "",
        }
        return res.render("instructors/showInstructor", {instructor});
    }
    

// create // instructor
exports.post = (req, res) => {

    const keys = Object.keys(req.body);

    for(key of keys) {
        if(req.body[key] == "") {
            res.send("Preencha os Dados, Por Favor");
        }
    }
    // desestruturação do meu 'req.body' que possui todos os dados do meu form // 
    let { avatar_url, birth, gender, services, name } = req.body;


    birth = Date.parse(birth);

    const created_at = Date.now();

    const id = Number(data.instructors.length + 1);


// fazendo o push pra array dentro do data.json item por item // 
    // [...]
    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at,
    }); // [ {...}, {...} ]



    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if(err) return res.send("writeFile error");

        return res.redirect("/instructors");

    });

   // return res.send(req.body);
}        