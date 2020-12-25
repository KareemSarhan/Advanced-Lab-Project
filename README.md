Advanced-Lab-Project
Passant Farouk           T-26            43-0775
Nour Ali Fouda           T-26            43-0518
Safa Magdy               T-38            43-2214
Farah Ahmed Atef         T-26            43-5680
Kareem Sarhan            T-26            43-4577
















File to run: server.js this is located in the root folder 
You can run this file by typing (nodemon start) in the terminal
Port : 3000
HR member credentials: email: testHR1@gmail.com
                                  Password: “123456”
Routes
GUC Staff Members Functionalities:
Functionality: Login
Route: /Member/login
Request type: POST
Request body: {“email”: “farah@gmail.com" , "password": "123456"}
Response: This route will tell you “please enter an email or password” if you did not enter one of them (email or password), it will tell you “not found member “ if it did not find the member mail in the database and if the password is wrong it will return “invalid Password “,it may return “Please enter a correct email format “ if you enter for example “farah” instead of “farah@gmail.com” . if the password and mail match it will return logged in successfully. You will need to have a member in the member collection with email farah@gmail.com and password 123456.


Functionality: LogOut
Route: /Member/logout
Request type: GET
Response: This route will logout the user. If he requested that route and then tried any route like viewing my profile and will send him “sorry you are logged out”.


Functionality: ViewProfile .
Route: /Member/viewProfile
Request type: GET
Response: This route will show you your profile if you are an academic member it will show the email, faculty , department ,office location , salary, salarySoFar and your day off . if you hr it will show your name, email , salary, salarySoFar, annual balance  and office location .






Functionality: UpdateProfile .
Route: /Member/updateProfile
Request type: POST
Request body: {"NewOfficehours" : "2nd-Monday","NewPhonenumber" : 4444}
Response: This route will update the user data in the database and return “updated successfully “ if the user is hr it can update his/her phone number and secondary email and if he is an academic member it can update it secondary email , phone number and his/her office hours or only one of them . if you entered the secondary email in not email format it will return “please enter the email in a correct email format “ , if you entered a number but not phone number it will return “its is not a phone number “.


Functionality: Reset Password.
Route: /Member/resetPassword
Request type: POST
Request body: {"NewPassword": "12345678"}
Response: This route will reset the password of the member who is logged in and it must be 8 characters . it will update the database with the new hashed password for this member.


Functionality: SignIn.
Route: /Member/signIn
Request type: POST
Response: This route will insert the date and time of entering the member to the campus to attendance collection with the sign in attribute with the member id , with duration 0 by default (as it will be calculated when he signs out ) and signOut with null value .










Functionality: SignOut.
Route: /Member/signOut
Request type: POST
Response: This route will insert the date and time to attendance collection in the sign Out attribute with the member id for the last sign in without sign out in the same  day and same month also will calculate the duration the member spent but Note  there is a time difference(2 hours) in mongoDB so if you signed in at 8:00 am according to our time it will enter it 10:00 am that why in the sign out instead of 7 pm (19) i putted 9 m (21) so when u sign in at 8 am and sign out at 7 pm your duration will be 11 hours but in the record it will be stated as 10 am (sign in ) and 9 pm (sign out ). As it gets the hour and minutes and calculates  the differences between them for every sign in and sign out records. For example you spend 8 hours and 30 minutes in the campus it will show 8.5 hours the 0.5 is for the 30 minutes.


Functionality: viewAllAttendance
Route: /Member/viewAllAttendance
Request type: Get
Response: This route will show all the records (sign in , sign out ) for the logged in member even if he/she made multiple sign in and sign outs in one day .


Functionality: viewAttendanceByMonth
Route: /Member/viewAttendanceByMonth
Request Body : {“Month : “december”}
Request type: Get
Response: This route will show all the records (sign in , sign out ) for the logged in member even if he/she made multiple sign in and sign outs in one day during the entered month.


Functionality: viewMissingDays
Route: /Member/viewMissingDays
Request type: Get
Response: This route will show all the missing days till the current month.




Functionality: viewHours
Route: /Member/viewHours
Request type: Get
Response: This route will show all the spent hours  , Missing hours and the extra hours i spent so far by adding the durations of all records from 11th of this month till the 10th of the following month . The extra hours are the hours he/she stayed more than the required hours . the missing hours  are calculated as the difference between the required hours (180 )  and the spent hours .










































Hr Functionalities:
Functionality: Add a location
Route: /Hr/addLocaction
Request type: POST
Request body: {“name”: “D6,203" , "capacity": 25 , "type": "Room"}
Response: This route might give you an error if any of the attributes stated are not given in the body, the user is not authenticated, the user in not an HR member, the capacity of the location does not suit the type for example the room's max capacity is 25, the office's max capacity is 5, the lecture hall is 250 and the lab is 25. If there was any violation of these capacities this will produce an error that the data is incorrect. The types of locations available are [Room, Lecture Hall, Lab, office] 


Functionality: Update a location
Route: /Hr/updateLocaction/:name
(the :name refers to the location's name)
Request type: PUT
Request body: { "capacity": 20}
Response: This route might give you an error if the user is not authenticated, the user is not an HR member,there is no location with this name, the capacity of the location does not suit the type for example the room's max capacity is 25, the office's max capacity is 5, the lecture hall is 250 and the lab is 25. If there was any violation of these capacities this will produce an error that the data is incorrect. The types of locations available are [Room, Lecture Hall, Lab, office]. The attribute that can get updated is only the capacity of the location as logically we should not change the name nor the type of the location because they are related to real-life sizes and maps. 










Functionality: Delete a location
Route: /Hr/deleteLocaction/:name
(the :name refers to the location's name)
Request type: DELETE
Request body: {}
Response: This route might give you an error if the user is not authenticated, the user is not an HR member or if there is no location with this name. This route will affect office locations of members or slot locations if the location was a tutorial, lab or lecture hall. The effect will be nullyfing the corresponding location for the records under consideration


Functionality: Add a faculty
Route: /Hr/addFaculty
Request type: POST
Request body: {“name”: “BI", "numberOfYears": 5}
Response: This route might give you an error if any of the attributes stated are not given in the body, the user is not authenticated, the user is not an HR member, or if there exists a faculty with this name. The number of years attribute is not mandatory.


Functionality: Update a Faculty
Route: /Hr/updateFaculty/:name
(the :name refers to the faculty's name)
Request type: PUT
Request body: {"number": 4} (this number refers to the number of years of the faculty
Response: This route might give you an error if the user is not authenticated, the user is not an HR member or if there is no faculty with this name. This route will affect the number of years of the faculty. We cannot change the name of the faculty.










Functionality: Delete a Faculty
Route: /Hr/deleteFaculty/:name
(the :name refers to the faculty's name)
Request type: DELETE
Request body: {}
Response: This route might give you an error if the user is not authenticated, the user is not an HR member or if there is no faculty with this name. This route will affect faculty names of academic members and departments.


Functionality: Add a department
Route: /Hr/addDepartment
Request type: POST
Request body: {"name": "DMET","faculty": "MET", "code": "DMET"}
Response: This route might give you an error if any of the attributes stated are not given in the body(the code is not mandatory), the user is not authenticated, the user is not an HR member, if there does not exist a faculty with this name.


Functionality: Update a Department
Route: /Hr/updateDepartment/:name
(the :name refers to the department's name)
Request type: PUT
Request body: {"code": "DMET", "headOfDepartment": "ac-5"} 
Response: This route might give you an error if the user is not authenticated, the user is not an HR member , if there is no department with this name, if there is no academic member with this ID, if this member does not belong to the same faculty as the department. This route will affect the head of department field inside the department and the academic member type and if there exists an academic member who was previously the head of the department they will return back to being a course instructor.








Functionality: Delete a Department
Route: /Hr/deleteDepartment/:name
(the :name refers to the department's name)
Request type: DELETE
Request body: {}
Response: This route might give you an error if the user is not authenticated, the user is not an HR member or if there is no department with this name. This route will affect department names of academic members and the head of this department will return to being a course instructor. Also this department will be removed from the faculty departments array.


Functionality: Add a Course
Route: /Hr/addCourse
Request type: POST
Request body: {"name": "Analysis","department": "CS", "code": "CSEN702", "numberOfSlotsNeeded": 10, "creditHours": 4}
Response: This route might give you an error if any of the attributes stated are not given in the body, the user is not authenticated, the user is not an HR member, if there does not exist a department with this name, or if there exists a course with same name and/or code.


Functionality: Update a Course
Route: /Hr/updateCourse/:name
(the :name refers to the course's name)
Request type: PUT
Request body: {"numberOfSlotsNeeded": 15, "creditHours": 5} 
Response: This route might give you an error if the user is not authenticated, the user is not an HR member. These attributes are not mandatory.








Functionality: Delete a Course
Route: /Hr/deleteCourse/:name
(the :name refers to the courses's name)
Request type: DELETE
Request body: {"department": "CS"}
Response: This route might give you an error if the user is not authenticated, the user is not an HR member, if there is no course with this name or if there is no department with this name. This route will affect department courses, courses taught by academic members and the course coordinator will return to being an academic member. Also this course will be removed from the corresponding department array and the slots containing this course will be removed from both the slot table and the members schedule.


Functionality: Add a staff member
Route: /Hr/addStaffMember
Request type: POST
Request body:for academic members {"name": "testAC",  "type": "ac",            "email": "testAC@gmail.com",  "salary": 5000,  "officeLocation": "c3.217", "phoneNumber":11234567890,  "SecondayMail": "testAC@hotmail.com",     "gender": "Female",  "faculty": "MET",  "department": "CS", "dayOff": "Tuesday", "academicType": "academic member"}
(the academic types available to be used here are academic member or CourseInstructor)(academic member represents teaching assistants)(course coordinators and head of departments are assigned by other staff members not entered in this route)(the types of members are either ac or HR)
for HR members{ "name": "testHR",  "type": "HR",  "email": "testHR@gmail.com", "salary": 5000,  "officeLocation": "c3.217", "phoneNumber":11234567890,  "SecondayMail": "testHR@hotmail.com",  "gender": "Male"}
Response: This route might give you an error if any of the attributes stated are not given in the body(phone number, secondayMail and gender are not mandatory), the user is not authenticated, the user is not an HR member,if there does not exist a department with this name, if there does not exist a faculty with this name, if the office is full, if the mail is not unique. This route will affect the members table, the office location capacity will be incremented by 1 for each member. If the member is academic the academic members table will be affected, so as the department table where this member will either be added to the array of instructors or teaching assistants in this department.




Functionality: Update a Staff member
Route: /Hr/updateStaffMember/:id
(the :id refers to the member's id)
Request type: PUT
Request body: {"officeLocation": "c7.103"} 
Response: This route might give you an error if the user is not authenticated, the user is not an HR member, there is no member with this id, or there is no office with this name. These attributes are not mandatory.


Functionality: Delete a Staff member
Route: /Hr/deleteStaffMember/:id
(the :id refers to the member's id)
Request type: DELETE
Request body: {}
Response: This route might give you an error if the user is not authenticated, the user is not an HR member, or if there is no member with this id. This route will affect the office capacity which will be decremented by 1. If this is an academic member, this route will affect department and faculty teaching assistants/instructors as this member will be removed from them also if he was a head of department this will be removed. Also this will affect courses' teaching assistants/instructors array if he was there he will be removed. Also if he was a course coordinator this will be removed. Also the slots taught by this academic member will for now not have an academic member and will affect the unassigned slots of the course and therefore the coverage.


Functionality: Assign Hod to department
Route: /Hr/assignHod/:depName
(the :id refers to the member's id)
Request type: PUT
Request body: {"id”: “ac-1”} 
Response: This route might give you an error if the user is not authenticated, the user is not an HR member, there is no member with this id, or there is no department with this name.


Functionality: add a missing sign in
Route: /Hr/addSignIn/:id
(the :id refers to the member's id)
Request type: PUT
Request body: {"year":2020, "month": 12, "day": 15, "hour": 9, "minute":0} 
Response: This route might give you an error if the user is not authenticated, the user is not an HR member, there is no member with this id, or the same HR member is trying to add it to himself. These attributes are mandatory Note  there is a time difference(2 hours) in mongoDB so if you signed in at 8:00 am according to our time it will enter it 10:00 am that why in the sign out instead of 7 pm (19) i putted 9 m (21) so when u sign in at 8 am and sign out at 7 pm your duration will be 11 hours but in the record it will be stated as 10 am (sign in ) and 9 pm (sign out ). As it gets the hour and minutes and calculates  the differences between them for every sign in and sign out records. For example you spend 8 hours and 30 minutes in the campus it will show 8.5 hours the 0.5 is for the 30 minutes.


Functionality: add a missing sign out
Route: /Hr/addSignOut/:id
(the :id refers to the member's id)
Request type: PUT
Request body: {"year":2020, "month": 12, "day": 15, "hour": 9, "minute":0} 
Response: This route might give you an error if the user is not authenticated, the user is not an HR member, there is no member with this id, or the same HR member is trying to add it to himself. These attributes are mandatory.Note  there is a time difference(2 hours) in mongoDB so if you signed in at 8:00 am according to our time it will enter it 10:00 am that why in the sign out instead of 7 pm (19) i putted 9 m (21) so when u sign in at 8 am and sign out at 7 pm your duration will be 11 hours but in the record it will be stated as 10 am (sign in ) and 9 pm (sign out ). As it gets the hour and minutes and calculates  the differences between them for every sign in and sign out records. For example you spend 8 hours and 30 minutes in the campus it will show 8.5 hours the 0.5 is for the 30 minutes.










Functionality: view a member's attendance record
Route: /Hr/viewAttendance/:id
(the :id refers to the member's id)
Request type: GET
Request body: {} 
Response: This route might give you an error if the user is not authenticated, the user is not an HR member, there is no member with this id.
Output: 
[{"duration":7,"_id":"5fe26d6ada332f39d6c62336","Memberid":"5fe24adb38d2e41f4818bc01","signIn":"2020-12-11T08:00:26.575Z","__v":0,"signOut":"2020-12-11T04:00:31.948Z"},{"duration":7,"_id":"5fe26d81da332f39d6c62338","Memberid":"5fe24adb38d2e41f4818bc01","signIn":"2020-12-20T08:00:49.386Z","__v":0,"signOut":"2020-12-20T04:00:54.533Z"},{"duration":7.133333333333334,"_id":"5fe26e5fb87a053a593996ad","Memberid":"5fe24adb38d2e41f4818bc01","signIn":"2020-12-20T09:08:31.516Z","__v":0,"signOut":"2020-12-20T16:00:00.000Z"},{"duration":0,"_id":"5fe27cbdad7df012ac85d0a0","Memberid":"5fe24adb38d2e41f4818bc01","signIn":"2020-12-27T09:00:49.386Z","signOut":"2020-12-27T15:00:54.533Z"}]


Functionality: view members with missing hours/days
Route: /Hr/viewMissing
Request type: GET
Request body: {} 
Response: This route might give you an error if the user is not authenticated, the user is not an HR member.
Output: [{"missingDays":13,"remainingDays":-2,"ExtraHours":0,"missingHours":-7.133333333333334,"remainingHours":157.866667,"_id":"5fe276b9de79af3bafdc7baa","Memberid":"5fe24adb38d2e41f4818bc01","ExtraHour":0,"__v":0}] 














Functionality: update member salary
Route: /Hr//updateSalary/:id
Request type: PUT
Request body: {"newSalary": 50000} 
Response: This route might give you an error if the user is not authenticated, the user is not an HR member. This route will update the salary with the new salary if given in case of a promotion and will update the salarySoFar after deductions.














































Academic Members Functionalities:


HOD Functionalities:


Functionality: Assign an instructor to a course
Route: /Hod/assignInstructor
Request type: POST
Request body: {“id”:”ac-3”, “code”:”CSEN704”} 
Response: This route will give you an error if the user is not authenticated or not a head of department. If the user is a head of department and the course does not exist a message is displayed that this course does not exist. If the instructor does not exist a message will be displayed that the instructor does not exist and if the instructor is not in his department the message will be that this instructor does not exist in his department.If the course is not in the same department as the HOD the message will be this course is not in your department. Else the instructor will be assigned to the course by adding the instructor to the instructors array in the course model and the course will be added to the courses array in the academic member model of the specified instructor. If the id and code were not given as a string in the request body a message will be displayed to enter them in string format.


Functionality: Remove an instructor from a course
Route: /Hod/DeleteInstructor
Request type: DELETE
Request body: {“id”:”ac-3”, “code”:”CSEN704”}
Response: This route will give you an error if the user is not authenticated or not a head of department. If the user is a head of department and the course does not exist a message is displayed that this course does not exist. If the instructor does not exist a message will be displayed that the instructor does not exist and if the instructor is not in his department the message will be that this instructor does not exist in his department. If the course is not in the same department as the HOD  a message will be displayed that this course is not in his department. If the instructor is not assigned to the mentioned course a message will be displayed that the instructor is not assigned to this course. Else the instructor will be deleted from the course by removing the instructor from the instructors array in the course model and the course will be removed from the courses array in the academic member model of the specified instructor. The slot assignments will be removed from the instructor’s schedule of the old course as well as the memberID will be null in the slot which he was assigned to in the slot schema. Also, the number of slots assigned of the course will be decremented accordingly and the course coverage will be updated. If the id and code were not given as a string in the request body a message will be displayed to enter them in string format.
Functionality: Remove an instructor from a course and assign him to another course
Route: /Hod/UpdateInstructor
Request type: PUT
Request body: {“id”:”ac-3”, “codeOld”:”CSEN704”, “codeNew”:”CSEN701”}
Response: This route will give you an error if the user is not authenticated or not a head of department. If the user is a head of department and the course does not exist a message is displayed that this course does not exist. If the instructor does not exist a message will be displayed that the instructor does not exist and if the instructor is not in his department the message will be that this instructor does not exist in his department. If the old course is not in his department the message will be that the old course does not belong to his department same for the new course.   Else the instructor will be removed from the old course and added to the new course which will be updated in the courses array in the academic staff model and he will be removed from the instructors array of the old course in the course model also he will be added to the instructors array in the course model for the new course and the new course will be added in the courses array in the academic staff model. The slot assignments will be removed from the instructor’s schedule of the old course as well as the memberID will be null in the slot which he was assigned to in the slot schema. The number of slots assigned of the old course will be decremented accordingly and the course coverage will be updated. If the id, codeOld and codeNew were not given as a string in the request body a message will be displayed to enter them in string format.




Functionality: View all members in my department
Route: /Hod/viewMembersDep
Request type: GET
Response: This route will give you an error if the user is not authenticated or not a head of department. If the user is a head of department then it will view all the instructors and TAs in his/her department displaying their name, id, email, courses they teach, type, faculty, department, office location, office hours and day off.


















Functionality: View staff members per course in my department
Route: /Hod/viewMembers/:cID
Request type: GET
Response: This route will give you an error if the user is not authenticated or not a head of department. If there does not exist a course with the id cID a message will be displayed that this course does not exist or if the course does not belong to the department he will receive a message. If the user is a head of department then it will view all staff members profiles (name, id, email, courses, type, faculty, department, office location, office hours and day off) that are assigned to the course with id cID in his/her department only. 


Functionality: View the day off of all the staff in my department
Route: /Hod//viewDaysOffAll
Request type: GET
Response: This route will give you an error if the user is not authenticated or not a head of department. If the user is a head of department then it will view all member names’, ids’ and their day off.


Functionality: View the day off of a specific staff member in my department
Route: /Hod/viewDaysOff/:memID
Request type: GET
Response: This route will give you an error if the user is not authenticated or not a head of department. If the memID does not exist he will receive a message that this user does not exist.  If the memID is of an hr member he will get a message that this user is not an academic staff member. If the user is a head of department and the memID is of an academic staff who is in another department he will get a message that this user is not in his department. Else the user will be an academic member and exists in his department so he will view this member’s name, id and day off.












Functionality: View the day off of all staff member in my department
Route: /Hod/viewDayOffReq
Request type: GET
Response: This route will give you an error if the user is not authenticated or not a head of department. If the user is a head of department he will view all the day off requests of the staff in his department showing the members’ names, ids, request id, request status, requested day and comment.


Functionality: View all leave requests of all the staff in my department
Route: /Hod//viewLeaveReq
Request type: GET
Response: This route will give you an error if the user is not authenticated or not a head of department. If the user is a head of department then it will view all the leave requests of the members in my department. Accidental leave will display the name, id, leave type, number of days, status, reason and annual balance. Annual leave will view name, id, leave type, number of days, status, date of leave and annual balance. Compensation leave will display name, id, leave type, date of absence, status, date of compensation and reason. Maternity leave will display name, id, document, status and date of leave. Sick leave will display name, id, leave type, document, status, date of leave and date of document.


Functionality: Update the status of a day off request to accepted and update day off
Route: /Hod/acceptDayOffReq/:reqID
Request type: PUT
Response: This route will give you an error if the user is not authenticated or not a head of department. If the user is a head of department and there is no request with the id reqID a message will be displayed that this request does not exist. If the user of the request is not in his department a message will be displayed that this user is not in your department. Else the request status will be updated to accepted and the user’s day off will be updated with the requested day.










Functionality: Update the status of a leave request to accepted and update missing days
Route: /Hod/acceptLeaveReq/:reqID
Request type: PUT
Response: This route will give you an error if the user is not authenticated or not a head of department. If the user is a head of department and there is no request with the id reqID a message will be displayed that this request does not exist. If the user of the request is not in his department a message will be displayed that this user is not in your department. Else the request status will be updated to accepted and the number of days of the leave request will be removed from the missing days of this user as well as the remaining days in the missing model. And if the leave was of type annual or accidental the accidental leave balance will be decremented according to the number of days of the leave request.


Functionality: Update the status of a day off request to rejected
Route: /Hod/rejectDayOffReq/:reqID
Request type: PUT
Request body: {“comment”: “Busy day”}
Response: This route will give you an error if the user is not authenticated or not a head of department. If the user is a head of department and there is no request with the id reqID a message will be displayed that this request does not exist.If the user of the request is not in his department a message will be displayed that this user is not in your department. Else it will update the status of the request with id reqID to rejected and update the comment with the comment in the body which is the reason why the request was rejected. If the comment was not given as a string in the request body a message will be displayed to enter them in string format.


















Functionality: Update the status of a leave request to rejected
Route: /Hod/rejectLeaveReq/:reqID
Request type: PUT
Request body: {“comment”: “Busy day”}
Response: This route will give you an error if the user is not authenticated or not a head of department. If the user is a head of department and there is no request with the id reqID a message will be displayed that this request does not exist.If the user of the request is not in his department a message will be displayed that this user is not in your department. Else it will update the status of the request with id reqID to rejected and update the HodComment with the comment in the body which is the reason why the request was rejected and if the comment in the body was not stated he will receive a message to add a comment.  If the comment was not given as a string in the request body a message will be displayed to enter them in string format.




Functionality: View the coverage of each course in my department
Route: /Hod/viewCoverage
Request type: GET
Response: This route will give you an error if the user is not authenticated or not a head of department. If the user is a head of department then it will view the course code and its coverage for all courses in his/her department.




Functionality: View the teaching assignments of a course in my department
Route: /Hod/viewSlotAssignments/:cID
Request type: GET
Response: This route will give you an error if the user is not authenticated or not a head of department. If the user is a head of department and the cID is of a course that does not exist it will give him a message that this course does not exist else if the course is in his department then it will view the slot assignments the TA/instructor name and id, the slot timing and location and its type (Lecture/Lab/Tutorial).










Academic member Functionalities:
Functionality: View Schedule
Route: /AM/viewSchedule
Request type: GET
Response: This route will view all the slots this member has in his/her schedule , viewing the details of each slot (  type of the slot as lect/tut/lab,location,timing (day and which slot in the day (1st/2nd..) and if there is any accepted replacement request this member is the member the request was sent to it will display it’s date and which slot of the day(2nd,3rd,..)  with its location . IF this member doesn’t have compensation slots then the compensation slots array will be displayed empty viewing only his original schedule.
[
    [
        "Type: Lecture",
        "Timing :Monday-2nd",
        "location :H14",
        "Date :Thu Dec 31 2020 00:00:00 GMT+0200 (Eastern European Standard Time)",
        "Slot :1st"
    ]
]




















Functionality: View Replacement Requests
Route: /AM/viewReplacementReq
Request type: GET
Response: This route will view all the replacement requests this member has, viewing the details of each request( the request number, the requestedID(the member to send the request to),date of replacement , slot timing , status of the request(Accepted or pending,..) and an optional comment if provided.
[
    [
        "RequestID :R-2",
        "RequestedID :5fd7ff2753274b1d68920a3f",
        "Requested Day :Thu Dec 31 2020 00:00:00 GMT+0200 (Eastern European Standard Time)",
        "Requested Slot :1st",
        "Status :Accepted",
        "comment :elahy tenseter"
    ],
    [
        "RequestID :R-5",
        "RequestedID :5fd7ff2753274b1d68920a3f",
        "Requested Day :Tue Dec 01 2020 00:00:00 GMT+0200 (Eastern European Standard Time)",
        "Requested Slot :5fd89007cdf43d117c3ae194",
        "Status :Pending",
        "comment :undefined"
    ]
]






Functionality: Add Replacement Request
Route: /AM/sendReplacementReq
Request type: POST
Request body:{“memberID”: “5fd7ff2753274b1d68920a3f”,
“requestedID” : “5fd7ff2853274b1d68920a41”,
“requestedDay” : “2020/12/31”,
“requestedSlot” : “5fe26fe4613cecec0284096e”,
“Comment” : “anything”
}
Response: This route might give you an error message if any of the required attributes stated are not given in the body defining the missing attribute or if the entered data type is not the required one for example requestedDay must be a date cannot be entered as a string so it checks the validation of all entered data (memberID which is an object id referencing academic member,requestedID which is objectID referencing academic member too, requestedDay is a date and requestedSlot is an object id referencing the slot needed).There is also an optional comment that can be added and it must be a string . Otherwise, it will add a new record in the database in the replacement request table . The requestID identifying the request is auto increment having the initials of each request followed by it’s number automatically so it is not entered in the body , for example (R-1,R-2,..). The status is by default a pending one . Also, the replacement request by default must be sent before the replacement date.






















Functionality: Send change day off request
Route: /AM/sendChangeDayOffReq
Request type: POST
Request body:{“memberID”: “5fd7ff2753274b1d68920a3f”,
“requestedDay” : “Wednesday”,
“comment” : “anything to be written”}
Response: The requestID here is auto incremented so you don’t enter it in the body , it identifies the request type tpp for example (DayOff-1, DayOff-2,..).This route might give you an error message if any of the required attributes stated are not given in the body defining the missing attribute of ir the validation of the data types entered are not correct (day must be a string not number , member ID must be objectID referencing academic member ), or if the requested day the user already have slots in it is not empty, it will give an error too informing the user that the day is busy and the request won’t be sent and if the user is requesting a day which is his dayoff already it will display to him that this is his actual dayoff. Otherwise, it will add a new record in the database in the Day Off request table .A comment may be optionally added if needed and the status is by default a Pending one 






Functionality: Send a Leave request
Route: /AM/sendLeaveReq
Request type: POST
Request body:{“StaffID”: “5fd7ff2753274b1d68920a3f”,
“Leavetype” : “Accidental or annual or maternity or sick or compensation”,
“numberOfdays” : “5”,
“reason” : “anything to be written”}
Response: The request id is auto incremented identifying the type of leave request sent : Ac-number --->for accidental leave 
         An-number---> for annual leave
          M-number → for maternity leave
          S-number----> for sick leave
         C-number → for compensation leave 
The common attributes StaffID and Leave type must be stated in all of them 
If the staffID is not an object id referencing member model or not the one logged in (in other words the member cannot send a leave request for another member ) or if the staff id is not given in the body will give you an error message.
The leave type must be stated as string type (validation) and must be stated in the body(required) the naming convention we are using is as follows:
Accidental=for accidental leave 
And the number of days must be stated in the body in this type of leave as a number, and optional reason might be provided.
“Annual”= for annual leave , and the number of days must be stated in the body in this type of leave as a number, dateOf leave of type date , replacementID of type objectID referencing academic member model ,and optional reason might be provided of type string .
“Compensation”= for compensation leave, and the date of compensation ,date of absence must be provided and of type date also a reason here MUST be provided and of type string.
“Maternity”= for maternity leave, and date of leave must be provided of type date, a document of type string is to be provided too and optional reason of type string . Also, it checks if this member gender is Female otherwise it will give an error message that the gender is not a female.
“Sick” = for sick leave , and date of leave ,date of document must be provided and of type date , a document should be provided too of type string and an optional reason of type string 
By default the status is Pending in all types of requests.












































Functionality: Send a slot linking request
Route: /AM/sendSlotLinkReq
Request type: POST
Request body:{”memberID”: “5fd7ff2753274b1d68920a3f”,
“courseID” : “5fda68ce4424bd3aa0a022c5”,
“requestedSlot” : “5fd88fea53f2611d28807bee”,
“comment” : “anything to be written”}
Response: The requestID here is auto incremented so you don’t enter it in the body , it identifies the request type tpp for example (SL-1, SL-2,..)This route might give you an error message if any of the required attributes stated are not given in the body defining the missing attribute or if the validation of data is incorrect as stated in the previous routes(courseID,memberID,requestedSlot must be object ids and the comment must be a string), the comment is optional. If the memberID is not a valid one , course id doesn’t exist or this member is not assigned to the course he/she chose or if the requested slot is not assigned to the chosen course or the slot requested doesn’t exist too. Otherwise, the request will be sent successfully. The status is by default pending .


Functionality: Notify the user when their requests are accepted or rejected
Route: /AM/notification
Request type: GET
Response: This route will view all the accepted or rejected requests of the entered  member . 
[
    {
        "status": "rejected",
        "_id": "5fde6f2e6b5b834c38bd0d95",
        "Notification": "False",
        "requestID": 5,
        "memberID": "5fd884047ec2633330867a19",
        "requestedDay": "Sunday",
        "__v": 0,
        "comment": "la222"
    },
    {
        "status": "Accepted",
        "_id": "5fdca25679638beaa0c834f1",
        "requestID": 2,
        "memberID": "5fd7ff2753274b1d68920a3f",
        "requestedID": "slim",
        "requestedDay": "2020-11-30T22:00:00.000Z",
        "requestedSlot": "1st",
        "comment": "elahy tenseter"
   }
]






Functionality: View All Requests
Route: /AM/viewAllReq
Request type: GET
Response: This route will view all the requests this member has (replacement, day off and slot linking and any leave request), viewing the details of each request
.
[
    {
        "status": "Pending",
        "Notification": "False",
        "_id": "5fdcfc639b4ff25ce8eb5947",
        "memberID": "5fd884047ec2633330867a19",
        "requestedDay": "Monday",
        "comment": "edoni agaza wenabi",
        "__v": 0
    },
    {
        "status": "Pending",
        "_id": "5fdc568979638beaa0c834ee",
        "requestID": 1,
        "memberID": "5fd7ff2753274b1d68920a3f",
        "requestedID": "ay had fady",
        "requestedDay": "2019-12-31T22:00:00.000Z",
        "requestedSlot": "3rd",
        "comment": "rodo besor3a"
    },
    {
        "status": "Rejected",
        "_id": "5fde31564ca5332c608f0d31",
        "requestID": 1,
        "memberID": "5fd884047ec2633330867a19",
        "courseID": "5fd8e94eb423a903d0381f79",
        "comment": "",
        "__v": 0
    },
    null,
    {
        "status": "Accepted",
        "_id": "5fdca25679638beaa0c834f1",
        "requestID": 2,
        "memberID": "5fd7ff2753274b1d68920a3f",
        "requestedID": "slim",
        "requestedDay": "2020-11-30T22:00:00.000Z",
        "requestedSlot": "1st",
        "comment": "elahy tenseter"
    },
    null,
    null,
    {
        "status": "Pending",
        "_id": "5fdcbe95850e0331d8e865a0",
        "memberID": "5fd7ff2753274b1d68920a3f",
        "requestedID": "Slim",
        "requestedDay": "2020-12-24T22:00:00.000Z",
        "requestedSlot": "4th",
        "__v": 0
    },
    null,
    null,
    {
        "status": "Pending",
        "_id": "5fdcc3f4fe9c6a7514303cb8",
        "memberID": "5fd7ff2753274b1d68920a3f",
        "requestedID": "Slim",
        "requestedDay": "2020-12-19T22:00:00.000Z",
        "requestedSlot": "1st",
        "__v": 0
    },
    null,
    null,
    null,
    null,
    null,
    null,
    null
]




Functionality: View All Accepted Requests
Route: /AM/viewAcceptedReq
Request type: GET
Response: This route will view all the accepted requests this member has (replacement, day off and slot linking,and any leave request), viewing the details of each request. The accept in status must be written “Accepted “
[
    {
        "status": "Accepted",
        "_id": "5fdca25679638beaa0c834f1",
        "requestID": 2,
        "memberID": "5fd7ff2753274b1d68920a3f",
        "requestedID": "slim",
        "requestedDay": "2020-11-30T22:00:00.000Z",
        "requestedSlot": "1st",
        "comment": "elahy tenseter"
    }






Functionality: View All Pending Requests
Route: /AM/viewPendingReq
Request type: GET
Response: This route will view all the pending requests this member has (replacement, day off and slot linking,and any leave request), viewing the details of each request.
[
    {
        "status": "Pending",
        "_id": "5fdcfc639b4ff25ce8eb5947",
        "memberID": "5fd884047ec2633330867a19",
        "requestedDay": "Monday",
        "comment": "edoni agaza wenabi",
        "__v": 0
    },
    {
        "status": "Pending",
        "_id": "5fdc568979638beaa0c834ee",
        "requestID": 1,
        "memberID": "5fd7ff2753274b1d68920a3f",
        "requestedID": "ay had fady",
        "requestedDay": "2019-12-31T22:00:00.000Z",
        "requestedSlot": "3rd",
        "comment": "rodo besor3a"
    },
    {
        "status": "Pending",
        "_id": "5fdcbe95850e0331d8e865a0",
        "memberID": "5fd7ff2753274b1d68920a3f",
        "requestedID": "Slim",
        "requestedDay": "2020-12-24T22:00:00.000Z",
        "requestedSlot": "4th",
        "__v": 0
    },
    {
        "status": "Pending",
        "_id": "5fdcc3f4fe9c6a7514303cb8",
        "memberID": "5fd7ff2753274b1d68920a3f",
        "requestedID": "Slim",
        "requestedDay": "2020-12-19T22:00:00.000Z",
        "requestedSlot": "1st",
        "__v": 0
    }
]
























Functionality: View All Rejected Requests
Route: /AM/viewRejectedReq
Request type: GET
Response: This route will view all the rejected requests this member has (replacement, day off and slot linking,and any leave request), viewing the details of each request. The rejected request must be written “rejected”
[
    {
        "status": "rejected",
        "_id": "5fde6f2e6b5b834c38bd0d95",
        "Notification": "False",
        "requestID": 5,
        "memberID": "5fd884047ec2633330867a19",
        "requestedDay": "Sunday",
        "__v": 0,
        "comment": "la222"
    }
]


Functionality: Accept a request
Route: /AM/AcceptReq
Request type: Post
Request body: { “requestID”: “R-1”or”R-2”.....
}
Response: This route accepts the pending replacement requests if the member is the requested one to replace another one and the status is pending it will accept otherwise, if the request id doesn’t exist or the requestedID is not the logged in member  it will display an error message.




Functionality: Cancel a request
Route: /AM/viewRejectedReq
Request type: DELETE
Request body: { “requestID”: “DayOff-1”/ “SL-1”/”R-2”/”Ac-1”.....or any other type of leave
}
Response: This route cancels the request specified by the requestID if the request status is pending and the request belongs to the logged in member .But ,if the request id doesn’t exist or written in a wrong format it will display an error message.  
If it is a slotlink request : the slot will be canceled if its status is pending or accepted.
If it is a replacement request: it will be canceled only if its status is pending or accepted but the requested day hasn't come yet.
If it is a day off request: it will be cancelled only if the status is pending.
If it is accidental leave: it will be cancelled only if it’s status is pending too.
If it is Annual leave : it will be cancelled if its status is pending or if it is accepted but its day hasn't come yet and the number of days will be added to the user’s annual balance once deleted .
If it is compensation leave: it will be cancelled if its status is pending or accepted and its day hasn't come yet and the missing days of the user will be incremented by 1.
























CourseCoordinator Functionalities:
Route: /CC/viewSlotLinkReq
Request type: GET
Response: This route will view all the slot linked requests for the course you are coordinator for providing you with all the information about this request .


Functionality: Update a slot
Route: /CC/updateSlot
Request type: POST
Request body: {“SlotMember”: “ac-1”, “SlotTiming” : “Monday-2nd”, “NewTiming : “Saturday-3rd”,”NewLocation” :”H14 “}
Response: This route will update a slot of a specific member with specific timing and you can update the time and the location of this slot or one of them with the new attributes you give them . this will return “please enter the required data .” if you did not enter any of them (SlotMember,SlotTiming). The slot for a course i am coordinator for and i can only be a coordinator for 1 course , i can not update slots for courses i am not its coordinator .it will update a slot in a course that you are its coordinator only , you can be a coordinator of only one course .In order to update this slot you have to be the coordinator which mean in course collection the course coordinator must equal your object ID of the academic member then you will be able to update this slot and the course id in slot collection must equal the course object id to the course in slot collection .


Functionality: Delete a slot
Route: /CC/deleteSlot
Request type: DELETE
Request body: {“SlotMember”: “ac-1”, “SlotTiming” : “Monday-2nd“}
Response: This route will delete a slot of a specific member with specific timing. It will delete it from the slots and the course schedule and from the academic member schedule , this will return “please enter the required data .” if you did not enter any of them (SlotMember,SlotTiming).it will delete a slot in a course that you are its coordinator only , you can be a coordinator of only one course .In order to delete this slot you have to be the coordinator which mean in course collection the course coordinator must equal your object ID of the academic member and  the course id in slot collection must equal the course object id in the course collection ,then you will be able to delete this slot it will delete it from the member you entered his id schedule and from the course slots , it will also update the assigned and needed slot also will update the coverage of this course you are coordinator of .






Route: /CC/addSlot
Request type: POST
Request body: {“location”: “c5.105", "type": "Tutorial" , "timing": "Tuesday 2nd"}
Response: This route might give you an error if any of the attributes stated are not given in the body, the user is not authenticated, the user in not a CC member, if there does not exist a location with this name.This route will affect the slots table, the course slots array, the course coverage as the number of needed slots will increase
the types of slots available are [Lab, Lecture, Tutorial]


Functionality: Reject  a Linked slot request
Route: /CC/rejectslotLinkReq
Request type: PUT
Request body: {“id”: “ac-1”}
Response: This route will reject a slot Linking request of the given staff member id and will return “ Please enter an Id for the academic member you want” if you did not enter a member ID.it will only reject a request for a course that you are its coordinator .In order to reject this request you have to be the coordinator which mean in course collection the course coordinator must equal your object ID of the academic member and the course id in slotLinkReq collection must equal the course object id course collection ,then you will be able to reject this request.












Functionality: Accept a Linked slot request
Route: localhost:3000/CC/AcceptSlotLinkReq
Request type: PUT
Header:
auth-token
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTUiLCJpYXQiOjE2MDg5MTczMDF9.Da2U1WXYYlHxGo04I5Owq_US3JpVWUcFygLcup4k_NE


Request body:{"RequestID": "Sl-2"
}
Response: "Request Accepted, Academic member have been Assigned to this Slot."


Course Instructor Functionalities:


View Coverage
GET
localhost:3000/CourseInstructor/ViewCoverage
Views all the Courses associated with the logged in Course instructor with their Coverage .


HEADERS


Auth-token 
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTMiLCJpYXQiOjE2MDg4NjIwNDF9.0GD-JWRB89efIDBXNwoXJVR7k9GR2xaI6V8DbSI3-vE
Authentication-Token of the logged in member.
    "Courses": [
    {
      "numberOfSlotsAssigned": 0,
      "name": "Software Engineering",
      "code": "CSEN702",
      "numberOfSlotsNeeded": 10,
      "coverage": 0
    },
    {
      "numberOfSlotsAssigned": 0,
      "name": "Advanced Computer lab",
      "code": "CSEN704",
      "numberOfSlotsNeeded": 3,
      "coverage": 0
    }
  ]
}


 
View Slot Assignment
GET
localhost:3000/CourseInstructor/ViewSlotAssignment
Views all the slots of all the courses that this Course Instructor is a part of.


HEADERS
auth-token 
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTMiLCJpYXQiOjE2MDg4NjIwNDF9.0GD-JWRB89efIDBXNwoXJVR7k9GR2xaI6V8DbSI3-vE
{
  "Courses": [
    {
      "slots": [
        {
          "type": "Tutorial",
          "location": {
            "name": "testRoom1",
            "type": "Room"
          },
          "timing": "Tuesday 2nd",
          "memberID": {
            "Memberid": {
              "name": "Passant",
              "id": "ac-5",
              "email": "passant@gmail.com",
              "officeLocation": null,
              "dayOff": "Thursday"
            },
            "type": "academic member",
            "officeHourse": ""
          }
        }
      ],
      "name": "Software Engineering",
      "code": "CSEN702"
    },
    {
      "slots": [],
      "name": "Advanced Computer lab",
      "code": "CSEN704"
    }
  ]
 
View In Department Staff
GET
localhost:3000/CourseInstructor/ViewInDepStaff
Views all Staff in the same Department as the Course Instructor.


HEADERS
auth-token
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTMiLCJpYXQiOjE2MDg4NjIwNDF9.0GD-JWRB89efIDBXNwoXJVR7k9GR2xaI6V8DbSI3-vE
Authentication-Token of the logged in member.
  "In Department Staff": {
    "teachingAssistants": [
      {
        "courses": [
          {
            "name": "Software Engineering",
            "code": "CSEN702"
          }
        ],
        "Memberid": {
          "name": "Safa",
          "id": "ac-2",
          "email": "safa@gmail.com",
          "officeLocation": {
            "name": "testOffice1",
            "type": "office"
          },
          "dayOff": "Tuesday"
        },
        "faculty": "MET",
        "officeHourse": ""
      },
      {
        "courses": [],
        "Memberid": {
          "name": "Noor",
          "id": "ac-4",
          "email": "noor@gmail.com",
          "officeLocation": {
            "name": "testOffice1",
            "type": "office"
          },
          "dayOff": "Monday"
        },
        "faculty": "MET",
        "officeHourse": ""
      },
      {
        "courses": [
          {
            "name": "Software Engineering",
            "code": "CSEN702"
          }
        ],
        "Memberid": {
          "name": "Passant",
          "id": "ac-5",
          "email": "passant@gmail.com",
          "officeLocation": null,
          "dayOff": "Thursday"
        },
        "faculty": "MET",
        "officeHourse": ""
      }
    ],
    "instructors": [
      {
        "courses": [
          {
            "name": "Software Engineering",
            "code": "CSEN702"
          },
          {
            "name": "Advanced Computer lab",
            "code": "CSEN704"
          }
        ],
        "Memberid": {
          "name": "Kareem",
          "id": "ac-3",
          "email": "kareem@gmail.com",
          "officeLocation": {
            "name": "testOffice1",
            "type": "office"
          },
          "dayOff": "Wednesday"
        },
        "faculty": "MET",
        "officeHourse": ""
      },
      {
        "courses": [
          {
            "name": "Software Engineering",
            "code": "CSEN702"
          }
        ],
        "Memberid": {
          "name": "Farah",
          "id": "ac-1",
          "email": "farah@gmail.com",
          "officeLocation": {
            "name": "testOffice1",
            "type": "office"
          },
          "dayOff": "Wednesday"
        },
        "faculty": "MET",
        "officeHourse": "Saturday-2nd"
      }
    ],
    "_id": "5fe249fb7d02830f7ca23552",
    "headOfDep": {
      "courses": [
        {
          "name": "Software Engineering",
          "code": "CSEN702"
        }
      ],
      "Memberid": {
        "name": "Farah",
        "id": "ac-1",
        "email": "farah@gmail.com",
        "officeLocation": {
          "name": "testOffice1",
          "type": "office"
        },
        "dayOff": "Wednesday"
      },
      "faculty": "MET",
      "officeHourse": "Saturday-2nd"
    }
  }
}


View In Course Staff
GET
localhost:3000/CourseInstructor/ViewInCourseStaff
Views all Staff in a specific course.


HEADERS


Auth-token
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTEiLCJpYXQiOjE2MDgxNDIzNTB9.M5vwXfPH7DlQERqqxzZLR3orp5MgyozJn0UmC8c-PCg
Authentication-Token of the logged in member.
 
BODY raw
{
    "CourseID" : "5fd8e94eb423a903d0381f79"
}
Example Response
 
You are not a Course Instructor.
 


 
Assign Member To Slot
PUT
localhost:3000/CourseInstructor/AssignMemberToSlot


HEADERS
auth-token
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTMiLCJpYXQiOjE2MDg4NjIwNDF9.0GD-JWRB89efIDBXNwoXJVR7k9GR2xaI6V8DbSI3-vE
BODY raw


{"AcID": "5fe24b5b174d5231c80c8dba",
"CourseID": "5fe24d78174d5231c80c8dc2",
"SlotID": "5fe3dc75899b862bf06b630c"
}
Academic member have been Assigned to this Slot.










Remove Member From Slot
DEL 
localhost:3000/CourseInstructor/RemoveMemberFromSlot
HEADERS
auth-token
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTMiLCJpYXQiOjE2MDg4NjIwNDF9.0GD-JWRB89efIDBXNwoXJVR7k9GR2xaI6V8DbSI3-vE
BODY raw
{"AcID": "5fe24b5b174d5231c80c8dba",
"CourseID": "5fe24d78174d5231c80c8dc2",
"SlotID": "5fe3dc75899b862bf06b630c"
}
Example Response
Academic member have been Removed From this Slot.


Add Member To Course
PUT
localhost:3000/CourseInstructor/AddMemberToCourse


Adds an Academic Member To Course.
auth-token
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTMiLCJpYXQiOjE2MDg4NjIwNDF9.0GD-JWRB89efIDBXNwoXJVR7k9GR2xaI6V8DbSI3-vE
{"AcID": "5fe24bc2174d5231c80c8dc0",
"CourseID":"5fe24d78174d5231c80c8dc2"
}


Remove Member From Slot
DEL
localhost:3000/CourseInstructor/RemoveMemberFromSlot
auth-token
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTMiLCJpYXQiOjE2MDg4NjIwNDF9.0GD-JWRB89efIDBXNwoXJVR7k9GR2xaI6V8DbSI3-vE
{"AcID": "5fe24b5b174d5231c80c8dba",
"CourseID": "5fe24d78174d5231c80c8dc2",
"SlotID": "5fe3dc75899b862bf06b630c"
}
Academic member have been Removed From this Slot.


Add Member To Course
PUT
 localhost:3000/CourseInstructor/AddMemberToCourse
Adds an Academic Member To Course.
auth-token
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTMiLCJpYXQiOjE2MDg4NjIwNDF9.0GD-JWRB89efIDBXNwoXJVR7k9GR2xaI6V8DbSI3-ve
{"AcID": "5fe24bc2174d5231c80c8dc0",
"CourseID": "5fe24d78174d5231c80c8dc2"
}
Academic member have been Added to this Course.


DEL 
Remove Member From Course
localhost:3000/CourseInstructor/RemoveMemberFromCourse
Removes an Academic Member From Course.
auth-token
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTMiLCJpYXQiOjE2MDg4NjIwNDF9.0GD-JWRB89efIDBXNwoXJVR7k9GR2xaI6V8DbSI3-vE
{"AcID": "5fe24bc2174d5231c80c8dc0",
"CourseID": "5fe24d78174d5231c80c8dc2"
}
Academic member have been removed from Course


Update Member Course
PUT 
localhost:3000/CourseInstructor/UpdateMemberCourse
Removes the academic member from a course and add him to another
auth-token
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTMiLCJpYXQiOjE2MDg4NjIwNDF9.0GD-JWRB89efIDBXNwoXJVR7k9GR2xaI6V8DbSI3-vE
{"AcID": "5fe24bc2174d5231c80c8dc0",
"FromCourseID": "5fe24d78174d5231c80c8dc2",
"ToCourseID": "5fe24bc2174d5231c80c8dc0"
}
Academic member have been removed from the First Course and added to the Second Course






Assign As Course Coordinator
PUT 
localhost:3000/CourseInstructor/AssignAsCoordinator


Assign Academic member as a course coordinator for a specific course.


auth-token
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTMiLCJpYXQiOjE2MDg4NjIwNDF9.0GD-JWRB89efIDBXNwoXJVR7k9GR2xaI6V8DbSI3-vE
{
    "AcID": "5fe24bc2174d5231c80c8dc0",
"CourseID": "5fd8e94eb423a903d0381f79"
}
Academic member is now the Course Coordinator