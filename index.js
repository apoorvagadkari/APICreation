const express=require('express');
const app=express();

app.use(express.json());

const courses=[
    {id: 1, name: 'Data Structures'},
    {id: 2, name: 'Computer Architecture'},
    {id: 3, name: 'Databases'},
    {id: 4, name: 'Games Development'}
];

app.get('/',(req,res) =>{
    res.send('Hello World!');
});
app.get('/api/courses',(req,res) =>{
    res.send(courses);
});

app.post('/api/courses', (req,res)=>{
    if(!req.body.name){
        res.status(400).send('Not a valid name');
        return;
    }
    const course ={
        id: courses.length+1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id',(req,res) =>{
    const course=courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course was not found.Please check the id');
    if(!req.body.name){
        res.status(400).send('Not a valid name');
        return;
    }
    course.name=req.body.name;
    res.send(course.name);
});

app.get('/api/courses/:id', (req,res) => {
    const course=courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course was not found.Please check the id');
    res.send(course.name);
});
const port=process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
