AcademicMemberRouter.route('/sendSlotLinkReq')
    .post(async(req, res, next) =>
    {
        try
        {
            //authenticate that this is a valid member
            //authorize that this is a AM member
            const payload = jwt.verify(req.header('auth-token'), key);
            if (!((payload.id).includes("ac")))
            {
                return res.status(401).send("not authorized");
            }
            else
            {
                //get the memberID from the token
                const token = req.header('auth-token');
                const DecodeToken = jwt_decode(token);
                const CurrentID = DecodeToken.id;
                const found = await member.findOne(
                {
                    id: CurrentID
                });
                const FoundID = found._id;
                if (req.body.memberID == null)
                {
                    return res.status(400).send("your ID should be given!!");
                }
                else if (req.body.courseID == null)
                {
                    return res.status(400).send("The course you are assigned to should be given!!");
                }
                else if (req.body.requestedSlot == null)
                {
                    return res.status(400).send("Please enter the requested slot!!");
                }
                else
                {
                    //all data required are given 
                    //verfiy that this member is assigned to the course of this slot
                    const acfound = await academicMember.findOne(
                    {
                        Memberid: FoundID
                    });
                    const coursefound = await course.findOne(
                    {
                        _id: req.body.courseID
                    })
                    if (coursefound == null)
                    {
                        res.send("no course ofiund")
                        return
                    }
                    const acfound = await academicMember.findOne(
                    {
                        Memberid: FoundID,
                        course: req.body.courseID
                    });
                    if (acfound == null)
                    {
                        res.send("meber mesh bydy el course ");
                        return
                    }
                    const slot = await slots.findOne(
                    {
                        course: req.body.courseID,
                        _id: req.body.requestedSlot
                    })
                    if (slot == null)
                    {
                        res.send("slot mesh mawgoda fl course");
                        return
                    }
                    const LinkingRequest = new Linkreq(
                    {
                        requestID: req.body.requestID,
                        memberID: req.body.memberID,
                        courseID: req.body.courseID,
                        requestedSlot: req.body.requestedSlot,
                        comment: req.body.comment
                    });

                    await LinkingRequest.save();
                    res.send("Link Request added");
                    console.log("ya3am added");
                }
            }
        }

        catch (error)
        {
            res.status(500).json(
            {
                error: error.message
            })
        }
    });