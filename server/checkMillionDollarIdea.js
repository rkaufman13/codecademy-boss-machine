const checkMillionDollarIdea = (req, res, next) => {
  const numWeeks = Number(req.body.numWeeks);
  const weeklyRevenue = Number(req.body.weeklyRevenue);
  const totalMoney = numWeeks * weeklyRevenue;
  if (!numWeeks || !weeklyRevenue || isNaN(numWeeks) || isNaN(weeklyRevenue)) {
    console.log("Invalid input");
    res.status(400).send();
  } else if (totalMoney < 1000000) {
    console.log("Not enough money");
    res.status(400).send();
  } else {
    console.log("Good job");
    next();
  }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
