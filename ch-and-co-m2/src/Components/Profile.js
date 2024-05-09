import {ReactComponent as ProfileSVG} from '../SVGs/profile.svg';
import {ReactComponent as MailSVG} from '../SVGs/mail.svg';
import {ReactComponent as PhoneSVG} from '../SVGs/phone.svg';
import {ReactComponent as LocationSVG} from '../SVGs/location.svg';
import {ReactComponent as EditSVG} from '../SVGs/edit.svg';
import { useContext, useState } from 'react';
import { UserTypeContext } from "../App";
import EditProfile from './EditProfile';
import cv from '../PDFs/cv.pdf';
import Maps from './Maps';

function Profile(props) {
    const { userType } = useContext(UserTypeContext);
    const [edit, setEdit] = useState(false);

    const [formData, setFormData] = useState({
        email: userType + "@gmail.com",
        password: userType,
        contact: "+20 109 251 9019",
        address: "Buidling 6, Mecca Street",
        governorate: "Cairo",
        area: "Nasr City",
    });
    
    const [teacherData, setTeacherData] = useState({
        subject: "Computer Science",
        numCases: 10,
        address: "Building 12, Street 35",
        area: "5th Settlement",
        governorate: "Cairo"
    });
    const [doctorData, setDoctorData] = useState({
        address: "Building 12, Street 35",
        area: "5th Settlement",
        governorate: "Cairo",
        specialty: "dermatology",
        numCases: 5
    });
    const [orgData, setOrgData] = useState({
        address: "Building 12, Street 35",
        area: "5th Settlement",
        governorate: "Cairo",
    })

    const [file, setFile] = useState(undefined);

    const downloadCv = (e) => {
        e.preventDefault();
        const pdfUrl = cv;
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = "Farah Ahmad - CV.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            {(edit === true && (userType === "donor" || userType === "teacher" || userType === "doctor" )) ?
                <div className='w-full flex justify-center'>
                    <EditProfile formData={formData} setFormData={setFormData}
                        teacherData={teacherData} setTeacherData={setTeacherData}
                        doctorData={doctorData} setDoctorData={setDoctorData}
                        file={file} setFile={setFile} setEdit={setEdit} />
                </div>
            :
            <div className="w-full h-screen flex justify-center items-center -mb-8 -mt-24">
                <div className="h-max-content w-[600px] bg-white rounded-md shadow-lg flex flex-col p-7 gap-4">
                    <div className="flex gap-6">
                        <ProfileSVG className="h-32 w-32 -m-2" />
                        <div className="flex flex-col w-full">
                            <div className='flex justify-between'>
                                <h1 className="font-bold text-2xl">Farah Ahmad <span className="text-farahgray font-normal text-lg">(F)</span></h1>
                                <button onClick={() => setEdit(true)}>
                                    <EditSVG className="h-6 w-6" />
                                </button>
                            </div>
                            <div className="flex gap-2">
                                <MailSVG className="h-5 w-5" />
                                <p>{formData.email}</p>
                            </div>
                            <div className="flex gap-2">
                                <PhoneSVG className="h-5 w-5" />
                                <p>{formData.contact}</p>
                            </div>
                            <div className="flex gap-2">
                                <LocationSVG className="h-6 w-6" />
                                <p>{formData.address}, {formData.area}, {formData.governorate}</p>
                            </div>
                        </div>
                    </div>
                    <hr className="border-t-2 w-11/12 mx-auto" />
                    <div className="flex flex-col gap-4 items-center">
                        <div className="bg-farahgreen-200 rounded-md text-center py-2 w-full text-farahgreen-700">
                            <h3>You are registered as a {userType === "teacher" ? "teacher" :
                                                        userType === "doctor" ? "doctor" : 
                                                        userType === "admin" ? "admin" : 
                                                        userType === "organization" ? "organization" : "donor"}
                            </h3>
                            {(userType === "doctor" || userType === "teacher") &&
                                <button className="underline cursor-pointer w-max mx-auto italic" onClick={downloadCv}>
                                    View your CV
                                </button>
                            }
                        </div>
                        {userType === "donor" && <div>
                            <p className='underline cursor-pointer w-max mx-auto italic'
                                onClick={() => props.setPage("teachdocform")}>
                                Get verified as a teacher/doctor
                            </p>
                        </div>}
                        {userType === "teacher" && <div>
                            <h3 className="text-center">You teach <span className="font-semibold italic">{teacherData.subject}</span>.
                            You can teach <span className="font-semibold italic">{teacherData.numCases}</span> pro-bono classes per week.</h3>
                        </div>}
                        {userType === "doctor" && <div>
                            <h3 className="text-center">You specialise in <span className="font-semibold italic">{doctorData.specialty}</span>.
                            You can take <span className="font-semibold italic">{doctorData.numCases}</span> pro-bono visits per week.</h3>
                        </div>}
                        {(userType === "doctor" || userType === "teacher"|| userType === "organization") && <div>
                            <h3 className="text-center -mb-2">
                                <span className="font-semibold">
                                {userType === "doctor"? "Clinic Location: ": userType === "teacher"? "Teaching Post Location: ": "Organization Location: "}
                                </span>
                                {userType === "doctor"? doctorData.address: userType === "teacher"? teacherData.address : orgData.address}, 
                                {userType === "doctor"? doctorData.area: userType === "teacher"? teacherData.area : orgData.area}, 
                                {userType === "doctor"? doctorData.governorate: userType === "teacher"? teacherData.governorate : orgData.governorate}
                                </h3>
                        </div>}
                        { (userType === "doctor" || userType === "teacher" || userType === "organization") && <div className='w-96 h-96 bg-farahgreen-400 rounded-md flex justify-center items-center'>
                            <Maps isStaticMap={true} Location={userType === "doctor"? "Clinic" :userType === "teacher"? "Teaching Post": userType === "organization"? "Organization":"My"}/>
                        </div>}
                    </div>
                </div>
            </div>
            }
        </div>
    )
}

export default Profile;