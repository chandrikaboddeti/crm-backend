const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const activityController = require('../controllers/activityController');
/**
 * @swagger
 * /api/activities:
 *   get:
 *     summary: Get all activities
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of activities
 */
// Activity routes
router.get('/', verifyToken, activityController.getActivities);
/**
 * @swagger
 * /api/activities:
 *   post:
 *     summary: Create new activity
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               dueDate:
 *                 type: string
 *     responses:
 *       201:
 *         description: Activity created
 */
router.post('/', verifyToken, activityController.createActivity);
/**
 * @swagger
 * /api/activities/{id}:
 *   put:
 *     summary: Update activity
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Activity updated
 */
router.put('/:id', verifyToken, activityController.updateActivity);
/**
 * @swagger
 * /api/activities/{id}:
 *   delete:
 *     summary: Delete activity
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Activity deleted
 */
router.delete('/:id', verifyToken, activityController.deleteActivity);

// Task routes
router.get('/tasks', verifyToken, activityController.getTasks);
router.post('/tasks', verifyToken, activityController.createTask);
router.put('/tasks/:id', verifyToken, activityController.updateTask);
router.delete('/tasks/:id', verifyToken, activityController.deleteTask);

module.exports = router;