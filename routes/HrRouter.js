const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const key = 'shawerma';
//const authenticate = require('../authenticate.js');
const faculty = require('../models/faculty');
const Location = require('../models/location.js');

const HrRouter = express.Router();

HrRouter.use(bodyParser.json());
HrRouter.use(express.json());
HrRouter.use(authenticate);

HrRouter.route('/addLocation')
.post( async(req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    const payload = jwt.verify(req.header('auth-token'),key);
    //console.log(payload.id);
    if (!((payload.id).includes("hr"))){ 
        //console.log(payload.id);
        return res.status(401).send("not authorized");
    }else{
        //verify that the needed credentials are given
        if (req.body.name == null){
            return res.status(400).send("name of location should be given in body");
        }else if (req.body.capacity == null){
            return res.status(400).send("capacity of location should be given in body");
        }else if (req.body.type == null){
            return res.status(400).send("capacity of location should be given in body");
        }else{
            //all data required are given
            //verify that the capacity matches the type 
            //e.g if a lab or room capacity <= 25
            const cap = req.body.capacity;
            let maxCap = 0;
            if (req.body.type == "Lab" || req.body.type == "Room"){
                maxCap = 25;
            }else if (req.body.type == "Lecture Hall"){
                maxCap = 250;
            }else{
                //it is an office
                maxCap = 5;
            }
            if (cap > maxCap){
                return res.status(400).send("capacity of location exceeds limit");
            }else{
                //make a new location 
                const loc = new Location({
                    name: req.body.name,
                    capacity : req.body.capacity,
                    type: req.body.type
                });
                await loc.save();
                console.log("Location added");
            }
            
        }
        
    }
    
});

HrRouter.route('/deleteLocation/:name')
.delete(async(req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    const payload = jwt.verify(req.header('auth-token'),key);
    //console.log(payload.id);
    if (!((payload.id).includes("hr"))){ 
        //console.log(payload.id);
        return res.status(401).send("not authorized");
    }else{
        //verify that there is a location with the name = id
        const loc = await location.find({"name": req.params.name});
        if(!loc){
            return res.status(400).send("name of location is not found");
        }
        else{
             //delete the existing location with all slots in this location and ask what should happen to the offices
           await Location.findOneAndDelete({"name": req.params.name});
            res.send("loc deleted");
        }
        
    }
    
});

HrRouter.route('/updateLocation/:id')
.put((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    //verify that the needed credentials are given
    //verify that there is a location with the name = id
    //update the existing location
});



HrRouter.route('/addFaculty')
.post(async (req,res,next) =>{
    //authenticate that this is a valid member
  // authenticate();
    // const f = new faculty({
    //     name: req.body.name
    // });
    // await f.save();
    // res.send("bravo");
    //authorize that this is a Hr member
    //verify that the needed credentials are given
    //add a new faculty
});

HrRouter.route('/updateFaculty/:id')
.put((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    //verify that the needed credentials are given
    //verify that there is a faculty with the name = id
    //update the existing faculty
});

HrRouter.route('/deleteFaculty/:id')
.delete((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    //verify that the needed credentials are given
    //verify that there is a faculty with the name = id
    //delete the existing faculty with the corresponding departments
});

HrRouter.route('/addDepartment')
.post((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    //verify that the needed credentials are given
    //get the faculty from the body
    //add a new department to this faculty
});

HrRouter.route('/updateDepartment/:id')
.put((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    //verify that the needed credentials are given
    //get the faculty from the body
    //verify that there is a department with the name = id
    //update the existing department
});

HrRouter.route('/deleteDepartment/:id')
.delete((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    //verify that the needed credentials are given
    //verify that there is a department with the name = id
    //delete the existing department 
    //update the academic members table by removing the HOD fieldn of the corresponding head
});

HrRouter.route('/addCourse')
.post((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    //verify that the needed credentials are given
    //get the faculty from the body
    //get the department from the body
    //verify that the department and faculty exist
    //add a new course to this department
});

HrRouter.route('/updateCourse/:name')
.put(async (req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    const payload = jwt.verify(req.header('auth-token'),key);
    //console.log(payload.id);
    if (!((payload.id).includes("hr"))){ 
        //console.log(payload.id);
        return res.status(401).send("not authorized");
    }else{
        //console.log(req.params.name);
        //verify that there is a course with the name = :name
        const cour = await course.find({"name": req.params.name});
        if(cour.length == 0){
            return res.status(400).send("name of course is not found");
        }
        else{
             //verify that the needed credentials are given
             if (req.body.creditHours != null){
                    //update the existing course
                     await course.findOneAndUpdate({"name": req.params.name}, {"creditHours": req.body.creditHours});
                     //res.send("course credit hours is updated")
             }
             if (req.body.numberOfSlotsNeeded != null){
                //update the existing course
                 await course.findOneAndUpdate({"name": req.params.name}, {"numberOfSlotsNeeded": req.body.numberOfSlotsNeeded});
                 //res.send("course number of needed slots is updated")
         }
         res.send("course updated");
        }
    }
});

HrRouter.route('/deleteCourse/:name')
.delete(async(req,res,next) =>{
     //authenticate that this is a valid member
    //authorize that this is a Hr member
    const payload = jwt.verify(req.header('auth-token'),key);
    //console.log(payload.id);
    if (!((payload.id).includes("hr"))){ 
        //console.log(payload.id);
        return res.status(401).send("not authorized");
    }else{
        //verify that there is a department with the name = :name
        const cour = await course.find({"name": req.params.name});
        if(cour.length == 0){
            return res.status(400).send("name of course is not found");
        }
        else{
            //get the department from the body
            if (req.body.department == null){
                return res.status(400).send("name of department should be given in the body");
            }else{
                //check if there exists a department with this name
                const dep = await department.find({"name": req.body.department});
                if (dep.length == 0){
                    return res.status(400).send("name of department is not found");
                }else{
                    //delete the slots with this course
                    const s = await slot.find({});
                    //console.log(s);
                    for (let i = 0 ; i < s.length ; i++){
                        if (s[i].course == cour._id + ""){
                            //console.log(s[i]);
                            const teacher = s[i].memberid;
                            const corTeacher = await academicMember.findById(teacher);
                            const sched = corTeacher.schedule;
                            for (let q = 0 ; q < sched.length; q++){
                                if (sched[q]._id == s[i]._id + ""){
                                    sched.splice(q,1);
                                }
                            }
                            await academicMember.findByIdAndUpdate(teacher, {"schedule": sched});
                            console.log("slot deleted from member schedule");
                            await slot.findByIdAndDelete(s[i]._id);
                            console.log("slot deleted");
                        }  
                    }
                    //delete the course from academic members and make the coordinator back to academic member
                    const coordinator = cour.courseCoordinator;
                    const m = await academicMember.find({});
                    for (let j = 0 ; j < m.length ; j++){
                        const mC = m[j].courses;
                        for (let z = 0 ; z < mC.length; z++){
                            if (mC._id == cour._id + ""){
                                mC.splice(z,1);
                            }
                        }
                        await academicMember.findByIdAndUpdate(m[j]._id, {"courses": mC});
                        console.log("course removed from academic member");
                    }
                    await academicMember.findByIdAndUpdate(coordinator, {"type": "academic member"});
                    console.log("course coordinator back to academic member");
                    //delete the course from department
                    const dC = dep[0].courses;
                    for (let w = 0 ; w < dC.length ; w++){
                        if (dC._id == cour._id + ""){
                            dC.splice(w,1);
                        }
                    }
                    await department.findByIdAndUpdate(dep._id, {"courses": dC});
                    console.log("course removed from department");
                    await course.findByIdAndDelete(cour[0]._id);
                    res.send("course deleted");
                }
            }
        }  
    }   
});

HrRouter.route('/addStaffMember')
.post((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    //verify that the given mail is unique
    //make the system automatically increment the ids
    //check if this is an academic member of hr to make the id prefix 
    //put this member to the corresponding table(academic/hr)
    //prompt the user to change the password on first login
    //check that the office given is not full
    //check that there is no course assigned to this member if academic
    //if this is an HR member make the dayoff Saturday
});

HrRouter.route('/updateStaffMember/:id')
.put((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    //verify that there is a member with this id
    //update this member
});

HrRouter.route('/deleteStaffMember/:id')
.delete((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    //verify that there is a member with this id
    //delete this member
});

HrRouter.route('/addSignInorOut/:id')
.put((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    //verify that there is a member with this id and is not the same as the doer
    //get the date from the body
    //add signin or signout that is missing
    //decrement the missing days
});

HrRouter.route('/viewAttendance/:id')
.get((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    //verify that there is a member with this id
    //view the attendance record of this member
});

HrRouter.route('/viewMissing')
.get((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    //view members with missings more than 0
});

HrRouter.route('/updateSalary/:id')
.get((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    //verify that there is a member with this id
    //compute the deductions using the missings table
});

module.exports = HrRouter;

