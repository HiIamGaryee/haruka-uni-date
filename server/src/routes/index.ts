import { Router } from 'express'
import { adminAuth } from '../middleware/adminAuth.js'
import { userAuth } from '../middleware/userAuth.js'
import * as adminController from '../controllers/admin.controller.js'
import * as authController from '../controllers/auth.controller.js'
import * as matchController from '../controllers/match.controller.js'

const router = Router()

router.get('/health', (_req, res) => res.json({ status: 'ok', service: 'haruka-match-engine' }))

router.post('/auth/signup', authController.signup)
router.post('/auth/login', authController.login)
router.get('/auth/me', userAuth, authController.me)
router.put('/auth/profile', userAuth, authController.completeProfile)

router.get('/me', userAuth, authController.me)
router.post('/profile', userAuth, authController.saveProfile)
router.post('/match/run', userAuth, matchController.runMatch)
router.get('/match/result/:matchId', userAuth, matchController.getMatchResult)
router.post('/match/schedule/:matchId', userAuth, matchController.scheduleMatch)

router.get('/date-plans/templates', authController.listDatePlanTemplates)

const admin = Router()
admin.use(adminAuth)
admin.get('/verify', adminController.verifyAdmin)
admin.get('/overview', adminController.getOverview)
admin.get('/users', adminController.getUsers)
admin.get('/users/:id/candidates', adminController.getCandidates)
admin.post('/users/:id/ban', adminController.banUser)
admin.delete('/users/:id', adminController.deleteUser)
admin.post('/force-match', adminController.forceMatch)
admin.get('/waiting', adminController.getWaitingPool)
admin.get('/matches', adminController.getMatches)
admin.get('/reports', adminController.getReports)
admin.patch('/reports/:id', adminController.resolveReport)
admin.get('/analytics', adminController.getAnalytics)
admin.get('/logs', adminController.getLogs)

router.use('/admin', admin)

export default router
