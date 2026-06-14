const Customer = require('../models/customer');
const Lead = require('../models/Lead');
const Deal = require('../models/Deal');
const User = require('../models/user');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalCustomers = await Customer.countDocuments();
    const totalLeads = await Lead.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalDeals = await Deal.countDocuments();

    // Lead conversion rate
    const convertedLeads = await Lead.countDocuments({
      status: 'Converted'
    });
    const conversionRate = totalLeads > 0
      ? ((convertedLeads / totalLeads) * 100).toFixed(1)
      : 0;

    // Lead status breakdown
    const leadsByStatus = await Lead.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // Deals by stage
    const dealsByStage = await Deal.aggregate([
      {
        $group: {
          _id: '$stage',
          count: { $sum: 1 },
          revenue: { $sum: '$value' }
        }
      }
    ]);

    // Total revenue
    const totalRevenueData = await Deal.aggregate([
      { $group: { _id: null, total: { $sum: '$value' } } }
    ]);

    res.json({
      totalCustomers,
      totalLeads,
      totalUsers,
      totalDeals,
      conversionRate,
      leadsByStatus,
      dealsByStage,
      totalRevenue: totalRevenueData[0]?.total || 0
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};