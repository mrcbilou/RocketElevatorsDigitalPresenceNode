const http = require("http");
const Joi = require("joi");                   
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(express.json());


var corsOptions = {
    origin: "https://louisfelix-rocketelevators.com/form.html",
    optionsSuccessStatus: 200 
  }

const courses= [
{id: 1, name: "course1"},
{id: 2, name: "course2"},
{id: 3, name: "course3"},
];

app.get("/", (req, res)=> {
    res.send("Hello World!!!!");
});
 
app.get("/api/courses", (req, res)=> {
    res.send(courses);
});
// http post request
app.post("/api/courses",(req, res)=>{
    const schema= {
        name : Joi.string().min(3).required()
    };

    const result = Joi.ValidationError(req.body, schema);
        

    if(result.error) {
        // 400 bad request
        res.status(400).send(result.error);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});
//reading the value of the Id
app.get("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send("The course with the given id was not found");
    res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port  ${port} :)`));