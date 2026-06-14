const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { getDeals, createDeal, updateDeal, deleteDeal } = require('../controllers/dealController');
/**
 * @swagger
 * /api/deals:
 *   get:
 *     summary: Get all deals
 *     tags: [Deals]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of deals
 */
router.get('/', verifyToken, getDeals);
/**
 * @swagger
 * /api/deals:
 *   post:
 *     summary: Create new deal
 *     tags: [Deals]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               value:
 *                 type: number
 *               stage:
 *                 type: string
 *     responses:
 *       201:
 *         description: Deal created
 */
router.post('/', verifyToken, createDeal);
/**
 * @swagger
 * /api/deals/{id}:
 *   put:
 *     summary: Update deal
 *     tags: [Deals]
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
 *         description: Deal updated
 */
router.put('/:id', verifyToken, updateDeal);
/**
 * @swagger
 * /api/deals/{id}:
 *   delete:
 *     summary: Delete deal
 *     tags: [Deals]
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
 *         description: Deal deleted
 */
router.delete('/:id', verifyToken, deleteDeal);

module.exports = router;