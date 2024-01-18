const express = require('express')
const router = new express.Router()
const userController = require('../Controllers/userController')
const projectController = require('../Controllers/projectController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')
//register
router.post('/user/register',userController.register)
//login
router.post('/user/login',userController.login)
//addproject
router.post('/project/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProjects)
//getuserprojects
router.get('/user/all-projects',jwtMiddleware,projectController.allUserProjects)
//getallprojects
router.get('/projects/all',jwtMiddleware,projectController.getAllProjects)
//gethomeprojeccts
router.get('/projects/home-projects',projectController.getHomeprojects)
//editProjects
router.put('/projects/edit/:id',jwtMiddleware,multerConfig.single('projectImage'),projectController.editProjectController)
//deleteProject
router.delete('/projects/delete/:id',jwtMiddleware,projectController.deleteProjectController)
//update User
router.put('/user/edit',jwtMiddleware,multerConfig.single('profileImage'),userController.updateUser)
//export router
module.exports = router