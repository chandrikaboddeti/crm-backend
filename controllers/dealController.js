const Deal = require('../models/Deal');

const getDeals = async (req, res) => {
  try {
    const deals = await Deal.find()
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });
    res.json(deals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createDeal = async (req, res) => {
  try {
    const { title, stage, revenue } = req.body;
    const deal = await Deal.create({
      title, stage, revenue,
      assignedTo: req.user._id
    });
    res.status(201).json(deal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateDeal = async (req, res) => {
  try {
    const deal = await Deal.findByIdAndUpdate(
      req.params.id, req.body, { new: true }
    );
    if (!deal) return res.status(404).json({ message: 'Deal not found' });
    res.json(deal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteDeal = async (req, res) => {
  try {
    const deal = await Deal.findByIdAndDelete(req.params.id);
    if (!deal) return res.status(404).json({ message: 'Deal not found' });
    res.json({ message: 'Deal deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDeals, createDeal, updateDeal, deleteDeal };