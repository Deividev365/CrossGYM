const { json } = require('express');
const fs = require('fs');
const data = require('./data.json');
const { userAge, date } = require('./utils');

//show instructor with 'id'
 exports.show = (req, res) => {
    
    const {id} = req.params;
    
    const foundInstructor = data.instructors.find( (instructor) => {
        return id == instructor.id;
    })

    if(!foundInstructor) {
        return res.send("Sorry, instructor not found :(");
    }
        
        const instructor = {
            ...foundInstructor,
            age: userAge(foundInstructor.birth),
            services: foundInstructor.services.split(","),
            created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at)
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

        return res.redirect(`/instructors/`);

    });

   // return res.send(req.body);
}


// edit instructor
exports.edit = (req, res) => {

    const {id} = req.params;
    
    const foundInstructor = data.instructors.find( (instructor) => {
        return id == instructor.id;
    })

    if(!foundInstructor) {
        return res.send("Sorry, instructor not found :(");
    }

    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth)
    }



    return res.render('instructors/edit', {instructor} );
}

// atualizar dados do instructor
exports.put = (req, res)  => {

    const {id} = req.body;

    let index = 0;
    
    const foundInstructor = data.instructors.find( (instructor, foundIndex) => {
        if(id == instructor.id) {
            index = foundIndex;
            return true;
        }
    })

    if(!foundInstructor) {
        return res.send("Sorry, instructor not found :(");      
    }


    const instructor = {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }

    
    data.instructors[index] = instructor;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if(err) return res.send("Algo deu errado!");

        return res.redirect(`/instructors/${id}`);
        
    })


}

// deletar todos os dados do instrutor


exports.delete = (req, res) => {

    const {id} = req.body;

    const filteredInstructors = data.instructors.filter((instructor) => {
        return instructor.id != id; // false
    })

    data.instructors = filteredInstructors;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if(err) return res.send("Error!!");


        return res.redirect("/instructors");
    });


}