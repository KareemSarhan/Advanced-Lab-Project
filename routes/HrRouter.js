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
const academicMember = require('../models/academicMember');
const { memberSchema } = require('../models/members');
const members = require('../models/members');
const slot = require('../models/slot');
const department = require('../models/department');
const e = require('express');

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
                res.send("location added");
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
        const loc = (await Location.find({"name": req.params.name}))[0];
      //  console.log(loc);
        if(loc.length == 0){
            return res.status(400).send("name of location is not found");
        }
        else{
             //delete the existing location with all slots in this location and offices
            if (loc.type == "office"){
                //make the office locations of academic members inside this office N/A
                const staff = await members.find({"officeLocation": loc._id});
                for (let i = 0 ; i < staff.length; i++){
                   await  members.findByIdAndUpdate(staff[i]._id, {"officeLocation": null});
                    res.send("office is nullified");
                }
            }else{
                 //make the slot locations N/A
                 //console.log(loc._id);

                 const s = await slot.find({"location": loc._id});
                 for (let j = 0 ; j < s.length; j++){
                     await slot.findByIdAndUpdate(s[j]._id, {"location": null});
                     res.send("slot location is nullified");
                 }
            }
            await Location.findOneAndDelete({"name": req.params.name});
            res.send("loc deleted");
        }
        
    }
    
});

HrRouter.route('/updateLocation/:name')
.put( async(req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    const payload = jwt.verify(req.header('auth-token'),key);
    //console.log(payload.id);
    if (!((payload.id).includes("hr"))){ 
        //console.log(payload.id);
        return res.status(401).send("not authorized");
    }else{
        //verify that there is a location with the name = id
        const loc = await Location.find({"name": req.params.name});
        if(loc.length == 0){
            return res.status(400).send("name of location is not found");
        }
        else{
             //verify that the needed credentials are given
             if (req.body.capacity != null){
                 //check that the capacity is suitable
                 const cap = req.body.capacity;
                 let maxCap = 0;
                 if (loc.type == "Lab" || loc.type == "Room"){
                     maxCap = 25;
                 }else if (loc.type == "Lecture Hall"){
                     maxCap = 250;
                 }else{
                     //it is an office
                     maxCap = 5;
                 }
                 if (req.body.capacity > maxCap){
                    return res.status(400).send("this new capacity exceeds the max capacity of the location");
                 }else{
                       //update the existing location
                     await Location.findOneAndUpdate({"name": req.params.name}, {"capacity": req.body.capacity});
                     res.send("location capacity is updated")
                 }
             }
        }
        
    }
});



HrRouter.route('/addFaculty')
.post(async (req,res,next) =>{
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
            return res.status(400).send("name of faculty should be given in body");
        }else{
            //all data required are given
            const n = await faculty.find({"name": req.body.name});
            if (n != 0){
                return res.status(400).send("there exists a faculty with this name");
            }else{
            //add a new faculty

                const f = new faculty({
                    name: req.body.name,
                    departments: [],
                    teachingAssistants:[],
                    instructors:[]
                });
               // console.log(f);
                await f.save();
                res.send("faculty added");
            }
        }
        
    }
});

HrRouter.route('/updateFaculty/:name')
.put(async (req,res,next) =>{
 //authenticate that this is a valid member
    //authorize that this is a Hr member
    const payload = jwt.verify(req.header('auth-token'),key);
    //console.log(payload.id);
    if (!((payload.id).includes("hr"))){ 
        //console.log(payload.id);
        return res.status(401).send("not authorized");
    }else{
        console.log(req.params.name);
        //verify that there is a faculty with the name = :name
        const fac = await faculty.find({"name": req.params.name});
        console.log(fac);
        if(fac.length == 0){
            return res.status(400).send("name of faculty is not found");
        }
        else{
             //verify that the needed credentials are given
             if (req.body.number != null){
                    //update the existing faculty
                     await faculty.findOneAndUpdate({"name": req.params.name}, {"numberOfYears": req.body.number});
                     res.send("faculty number of years is updated")
             }
        }
        
    }
});

HrRouter.route('/deleteFaculty/:name')
.delete(async (req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    const payload = jwt.verify(req.header('auth-token'),key);
    //console.log(payload.id);
    if (!((payload.id).includes("hr"))){ 
        //console.log(payload.id);
        return res.status(401).send("not authorized");
    }else{
        //verify that there is a faculty with the name = :name
        const fac = await faculty.find({"name": req.params.name});
        if(fac.length == 0){
            return res.status(400).send("name of faculty is not found");
        }
        else{
            //delete the existing faculty and handle academic members
            const m = await academicMember.find({"faculty": req.params.name});
            for (let i = 0 ; i < m.length; i++){
                await academicMember.findByIdAndUpdate(m[i]._id, {"faculty": "N/A"});
            }
            const d = await department.find({"facultyName": req.params.name});
            for (let j = 0 ; j < d.length; j++){
                await department.findByIdAndUpdate(d[j]._id, {"facultyName": "N/A"});
            }
            await faculty.findOneAndDelete({"name": req.params.name});
            res.send("faculty deleted ,faculty name at corresponding department is removed ,faculty name for corresponding academic members is removed" );
        }
        
    }
    
});

HrRouter.route('/addDepartment')
.post(async(req,res,next) =>{
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
            return res.status(400).send("name of department should be given in body");
        }else if (req.body.faculty == null){
            return res.status(400).send("name of faculty should be given in body");
        }else if (req.body.headOfDepartment == null){
            return res.status(400).send("name of head of department should be given in body");
        }else{
            //all data required are given
             //make sure this department does not exist in other faculties
             const otherDep = (await department.find({"name": req.body.name}));
             if (otherDep.length != 0){
                 return res.status(400).send("there exists a department with this name");
             }else{
            let c = "";
            if (req.body.code != null){
                c = req.body.code;
            }
            let f = null;
            const fa = (await faculty.find({"name": req.body.faculty}));
            if(fa.length == 0){
                return res.status(400).send("there does not exist a faculty with this name");
            }else{
                f = fa[0];
                const h1 = (await members.find({"id" : {$in:[req.body.headOfDepartment]}}))[0];
            
            if(!h1){
                return res.status(400).send("there does not exist an instructor with this id");
            }
            else{
                const h = (await academicMember.find({"Memberid": h1._id}))[0]
                const d = new department({
                    name: req.body.name,
                    code: c,
                    facultyName: req.body.faculty,
                    headOfDep: h._id
                });
                //add a new department to this faculty
                await d.save();
                console.log("dep added");
                const dN = (await department.find({"name": req.body.name}))[0];
                //console.log(dN);
                
                let x = [];
                x = f.departments;
                x.push(dN._id);
                //console.log(x);
                await faculty.findByIdAndUpdate(f._id, {"departments" : x});
                console.log("dep added to faculty");
                res.send("department added");
            }
            
            }
            
            }
        }
           
    }
        
});

HrRouter.route('/updateDepartment/:name')
.put( async (req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    const payload = jwt.verify(req.header('auth-token'),key);
    //console.log(payload.id);
    if (!((payload.id).includes("hr"))){ 
        //console.log(payload.id);
        return res.status(401).send("not authorized");
    }else{
        //console.log(req.params.name);
        //verify that there is a department with the name = :name
        const dep = await department.find({"name": req.params.name});
        //console.log(fac);
        if(dep.length == 0){
            return res.status(400).send("name of department is not found");
        }
        else{
             //verify that the needed credentials are given
             if (req.body.code != null){
                    //update the existing faculty
                     await department.findOneAndUpdate({"name": req.params.name}, {"code": req.body.code});
                     console.log("code updated");
             }
             if (req.body.headOfDepartment != null){
                const h1 = (await members.find({"id" : {$in:[req.body.headOfDepartment]}}))[0];
                if (h1){
                    //console.log(h1);
                    const h = (await academicMember.find({"Memberid": h1._id}))[0];
                    //console.log(dep);
                    if (h.faculty == dep[0].facultyName){
                        //console.log(h.faculty);
                        //the proposed head is of the same faculty
                        const prevHead = ((await department.find({"name": req.params.name}))[0]).headOfDep;
                        //console.log(prevHead);
                        //return the previous head back to being a course instructor
                        await academicMember.findByIdAndUpdate(prevHead, {"type": "CourseInstructor"});
                        console.log("prev head updated");
                        await academicMember.findByIdAndUpdate(h._id, {"type": "HeadOfDepartment"});
                        console.log("new head updated");
                        await department.findOneAndUpdate({"name": req.params.name}, {"headOfDep": h._id});
                        console.log("new head assigned to department");
                    }
                    else{
                        return res.status(400).send("this academic member does not belong to the same faculty");
                    }
                }else{
                    return res.status(400).send("there is no academic member of this id");
                }
             }
             res.send("department updated");
        }
        
    }
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

HrRouter.route('/updateCourse/:id')
.put((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    //verify that the needed credentials are given
    //get the faculty from the body
    //get the department from the body
    //verify that there exists a faculty and department and course
    //update the course with code = id
});

HrRouter.route('/deleteCourse/:id')
.delete((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    //verify that the needed credentials are given
    //get the faculty from the body
    //get the department from the body
    //verify that there exists a faculty and department and course
    //delete the course with code = id
    //delete the slots with this course
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

