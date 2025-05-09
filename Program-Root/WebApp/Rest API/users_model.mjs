// Get the mongoose object
import mongoose from 'mongoose';
import 'dotenv/config';

let connection = undefined;

const errorIncorrectPassword = { Error: 'Incorrect Password' };
const errorStringInvalid = { Error: 'Invalid request' };

/**
 * This function connects to the MongoDB server.
 */
async function connect(){
    try{
        await mongoose.connect(process.env.MONGODB_CONNECT_STRING);
        connection = mongoose.connection;
        console.log("Successfully connected to MongoDB using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

//check if json is valid
function isValid(exerciseString){
    return true
    /*
    if(exerciseString.name == null || exerciseString.reps == null || exerciseString.weight == null || exerciseString.unit == null || exerciseString.date == null){
        console.log("null values");
        return false;
    }
    if(exerciseString.reps > 0 && exerciseString.weight > 0 && exerciseString.name !== "" && exerciseString.date !== "" ){
        if(exerciseString.unit == "lbs" || exerciseString.unit == "kgs"){
            const mdy = exerciseString.date.split('-'); //month day year

            if(parseInt(mdy[0]) < 1 || parseInt(mdy[0]) > 12 || Number.isNaN(parseInt(mdy[0]))){
                console.log("invalid month");
                return false;
            }
            if(parseInt(mdy[1]) > 31 || Number.isNaN(parseInt(mdy[1]))){
                console.log("invalid day");
                return false;
            }
            if(parseInt(mdy[2]) < 0 || parseInt(mdy[2]) > 99 || Number.isNaN(parseInt(mdy[2]))){
                console.log("invalid year");
                return fasle;
            }
            console.log(mdy);
            return true;
        }
        console.log("invalid unit");
        return false;
    }
    console.log("invalid name/date/reps/weight");
    return false;
    */
}
const userSchema = mongoose.Schema({
    userName: { type: String, required: true},
    password: { type: String, required: true},


}, {collection: 'Users'});

const User = mongoose.model("Users", userSchema);


const groupSchema = mongoose.Schema({
    groupName: { type: String, required: true},
    password: { type: String, required: true},
    booktitle: { type: String, required: true},
    users: { type: Array, required: false},
    admin: {type: String, required: true}


}, {collection: 'Groups'});

const Group = mongoose.model("Groups", groupSchema);

const createUser = async (userName, password) =>{
    const user = new User({userName: userName, password: password});
    if (isValid(user)){
        return user.save();
     } else{
        console.log("bad id request");
        return errorStringInvalid;
     }
}

const createGroup = async (groupName, password, booktitle, users, admin) =>{
    let idArr = [];
    console.log("Creating Group")
    for(let i = 0;i < users.length; ++i){
        let userId = await findUserName({userName: users[i]})
        idArr.push(userId);
    }

    let adminId = await findUserName({userName: admin})
    console.log((adminId[0]._id))
    adminId = adminId[0]._id

    const group = new Group({groupName: groupName, password: password, booktitle: booktitle, users: idArr, admin: adminId});
    if (isValid(group)){
        return group.save();
     } else{
        console.log("bad id request");
        return errorStringInvalid;
     }
}

const findUserName = async (filter = {}) => {
    const query = User.find(filter, '_id');
    return query.exec();

}

const addGroupMember = async (_id, user) => {
    let userId = await findUserName({userName: user})
    console.log(userId)
    if (userId){
        const filter = {_id: _id}
        //const updatedGroups = Group.updateOne(filter, update);

        const idQuery = Group.findById(_id);

        let updateGroup = await idQuery.exec(); 
        console.log("testval", updateGroup.users[0])
        updateGroup.users[0].push(userId[0])

        const updatedUsers = Group.updateOne({_id: _id}, updateGroup);
    
        let returnVal = await updatedUsers.exec();  //await for the return so that it can be checked if null
        if (returnVal.matchedCount === 0){
           console.log("id request fot found");
           returnVal = errorStringNotFound;
        }else{
            returnVal = findGroup(_id);
        }
    
        return returnVal;
     } else{
        console.log("bad id request");
        return errorStringInvalid;
     }

}


const removeGroupMember = async (_id, user) => {
    let userId = await findUserName({userName: user})
    console.log(userId)
    if (userId){
        const filter = {_id: _id}
        //const updatedGroups = Group.updateOne(filter, update);

        const idQuery = Group.findById(_id);

        let updateGroup = await idQuery.exec(); 
        console.log("userlsit", updateGroup.users[0])
        updateGroup.users[0] = updateGroup.users[0].filter(item => item !== userId[0][0]) 

        console.log("looking")
        for(let i = 0; i < (updateGroup.users[0]).length; ++i){
            console.log(String(updateGroup.users[0][i]._id), userId[0]._id, (String(updateGroup.users[0][i]._id) == String(userId[0]._id)))
            if (String(updateGroup.users[0][i]._id) == String(userId[0]._id)){
                console.log("deleted") 
                updateGroup.users[0].splice(i, 1)
            }
        }
        console.log("done")

        console.log("userlsit after", updateGroup.users[0])

        const updatedUsers = Group.updateOne({_id: _id}, updateGroup);
    
        let returnVal = await updatedUsers.exec();  //await for the return so that it can be checked if null
        if (returnVal.matchedCount === 0){
           console.log("id request fot found");
           returnVal = errorStringNotFound;
        }else{
            returnVal = findGroup(_id);
        }
    
        return returnVal;
     } else{
        console.log("bad id request");
        return errorStringInvalid;
     }

}

const findGroup = async (filter = {}) => {
    const query = Group.find(filter);
    return query.exec();

}



const userLogin = async (id, password) => {
    console.log(id)
    const idQuery = User.findById(id);
    let returnVal = await idQuery.exec();  //await for the return so that it can be checked if null
    console.log(returnVal)
    if (returnVal.password !== password){
       console.log("Incorrect Password");
       returnVal = errorIncorrectPassword;
    }

    return returnVal;

}

/*

const findExercisesbyId = async (id) => {
     const idQuery = Exercise.findById(id);

     let returnVal = await idQuery.exec();  //await for the return so that it can be checked if null
     if (returnVal == null){
        console.log("bad id request");
        returnVal = errorStringNotFound;
     }

     return returnVal;
}

const updateExercises = async (id, update) => {

    if (isValid(update)){
        const filter = {_id: id}
        const updatedExercise = Exercise.updateOne(filter, update);
    
        let returnVal = await updatedExercise.exec();  //await for the return so that it can be checked if null
        if (returnVal.matchedCount === 0){
           console.log("id request fot found");
           returnVal = errorStringNotFound;
        }else{
            returnVal = findExercisesbyId(id);
        }
    
        return returnVal;
     } else{
        console.log("bad id request");
        return errorStringInvalid;
     }

}

const deleteExercises = async (filter) => {
    const result = await Exercise.deleteMany(filter);
    return result.deletedCount;

}

const deleteExercisesbyId = async (id) => {
    const result = await Exercise.deleteOne({_id: id});
    if (result.deletedCount === 0){
        console.log("bad id request");
        return errorStringNotFound;
     }else{
        return;                  //returns an empty body
     }

}

export { connect, createExercises, findExercises, findExercisesbyId, updateExercises, deleteExercises, deleteExercisesbyId };
*/

export { connect, createUser, createGroup, userLogin, findUserName, findGroup, addGroupMember, removeGroupMember};
