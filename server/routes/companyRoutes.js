import express from 'express' 
import {changeVisibility,ChangeJobApplicationsStatus,getCompanyPostedJobs,getCompanyJobApplicants, postJob,getCompanyData,loginCompany,registerCompany}  from '../controller/companyController.js'
import upload from '../config/multer.js'
import { protectCompany } from '../middleware/authMiddleware.js'
const router=express.Router()

//Register a company
router.post('/register',upload.single('imageFile'),registerCompany)

//Company Login
router.post('/login',loginCompany)

router.get('/company',protectCompany,getCompanyData)

//Post a Job
router.post('/post-job',protectCompany,postJob)

//Get Applicants
router.get('/application',protectCompany,getCompanyJobApplicants)

//Get Company Job Lists
router.get('/list-jobs',protectCompany,getCompanyPostedJobs)

//Change Application Status
router.post('/change-status',protectCompany,ChangeJobApplicationsStatus)

//change Application Visibility
router.post('/change-visiblity',protectCompany,changeVisibility)

export default router