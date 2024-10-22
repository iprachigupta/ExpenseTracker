const filterFunction = async (req, res) => {
  try {
    const { month, category, transactionType } = req.query;

    let filter = { userId: req.user.id };

    if (month) {
      const [year, monthValue] = month.split("-");
      const startDate = new Date(`${year}-${monthValue}-01`);
      const endDate = new Date(`${year}-${parseInt(monthValue) + 1}-01`);
      filter.date = { $gte: startDate, $lt: endDate };
    }

    if (category) {
      filter.category = category;
    }

    if (transactionType) {
      filter.transactionType = transactionType;
    }

    const expenses = await Expense.find(filter);
    res.status(200).json({ success: true, expenses });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
