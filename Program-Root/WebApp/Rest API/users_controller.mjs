import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as users from './users_model.mjs';

const app = express();
app.use(express.json())

const PORT = process.env.PORT;

const errorIncorrectPassword = { Error: 'Incorrect Password' };
const errorStringInvalid = { Error: 'Invalid request' };

//returns true if response if the error string
function isError (response, showType = false){
    if(JSON.stringify(response) === JSON.stringify(errorIncorrectPassword) || JSON.stringify(response) === JSON.stringify(errorStringInvalid)  ){
        return true;
    }else{
        return false;
    }
}

app.listen(PORT, async () => {
    await users.connect(false)
    console.log(`Server listening on port ${PORT}...`);
});


app.post('/users', asyncHandler(async (req, res) => {
    
    console.log("got a post request");

    const newUser = req.body;
    console.log(newUser)
    
    const response = await users.createUser(newUser.userName, newUser.password);
    if (isError(response)){
        res.status(400);
    } else{
        res.status(201);
    }
    res.json(response);

}));

//login
app.get('/users', asyncHandler(async (req, res) => {
    
    console.log("got a login request");

    let userInfo = req.query

    const response = await users.findUserName({userName: userInfo.userName});
    console.log(response)
    
    const validatoin = await users.userLogin(response[0]._id, userInfo.password)
    console.log(validatoin)

    if (isError(response.Error)){
        res.status(404);
        console.log("sending error")
    } else{
        res.status(200);
    }
    res.json(validatoin);

}));

app.post('/groups', asyncHandler(async (req, res) => {
    
    console.log("got a group post request");

    const newGroup = req.body;
    console.log(newGroup)
    
    const response = await users.createGroup(newGroup.groupName, newGroup.password, newGroup.booktitle, newGroup.users, newGroup.admin);
    if (isError(response[0])){
        res.status(400);
    } else{
        res.status(201);
    }
    res.json(response);

}));

//Add/remove user from group
app.put('/groups', asyncHandler(async (req, res) => {
    
    console.log("got a put request");

    let query = req.query;

    let group = await users.findGroup({groupName: query.group});

    console.log(query.password, group[0].password)
    if (query.password == group[0].password){
        if(query.remove == "true"){
            users.removeGroupMember(group[0]._id, query.userName)
        }
        else{
            users.addGroupMember(group[0]._id, query.userName)
        }
    }

    let response = null
    switch (isError(response, true)){       //this switch statment is a bit cursed but I like it better than a bunch of elifs
        case 'nf':          //not found
        res.status(404);
        break;
        case 'ir':          //invalid req
        res.status(400);
        break;
        case false:         //no error
        res.status(200);
        break;
    }
    res.json(response);

}));
/*
app.get('/exercises', asyncHandler(async (req, res) => {
    
    console.log("got a get request");

    const filter = req.query;
    console.log(filter);
    const response = await users.findExercises(filter);
    res.status(200);
    res.json(response);

}));
*/


/*

app.put('/exercises/:id', asyncHandler(async (req, res) => {
    
    console.log("got a put request");

    let id = req.path;
    id = id.slice(11);   //removes the "/exercises/" from the id string

    const update = req.body;

    const response = await users.updateExercises(id, update);
    switch (isError(response, true)){       //this switch statment is a bit cursed but I like it better than a bunch of elifs
        case 'nf':          //not found
        res.status(404);
        break;
        case 'ir':          //invalid req
        res.status(400);
        break;
        case false:         //no error
        res.status(200);
        break;
    }
    res.json(response);

}));


app.delete('/exercises/', asyncHandler(async (req, res) => {
    
    console.log("got a delete request");

    const filter = req.query;

    const response = await users.deleteExercises(filter);

    const deletedCount = { deletedCount: response }     //formating for the number of deleted users

    res.status(200);
    res.json(deletedCount);

}));

app.delete('/exercises/:id', asyncHandler(async (req, res) => {
    
    console.log("got a delete by id request");

    let id = req.path;
    id = id.slice(11);   //removes the "/exercises/" from the id string

    const response = await users.deleteExercisesbyId(id);
    if (isError(response)){
        res.status(404);
    } else{
        res.status(204);
    }
    res.json(response);
 
}));

*/
