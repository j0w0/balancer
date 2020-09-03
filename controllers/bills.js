const Budget = require('../models/budget');
const Bill = require('../models/bill');

module.exports = {
    index,
    new: newBill,
    create,
    show,
    update
}

function index(req, res) {
    res.redirect('/');
}

function newBill(req, res) {
    Budget.findById(req.params.id, (err, budget) => {
        if(!budget || !budget.user.equals(req.user._id) || err) return res.redirect(`/`);
        res.render('bills/new', { budget });
    });
}

function create(req, res) {
    Budget.findById(req.params.id, function(err, budget) {
        if(!budget || !budget.user.equals(req.user._id) || err) return res.redirect(`/`);

        if(!req.body.autoPayAccount) delete req.body.autoPayAccount;

        const budgetId = budget.id;
        req.body.budget = budgetId;
        req.body.user = req.user.id;

        const arr = [0,1,2,3];
        const installments = [];
        
        arr.forEach(idx => {
            const inst = req.body[`installments[${idx}]`];
            inst ? installments.push(parseFloat(inst).toFixed(2)) : installments.push(parseFloat(0).toFixed(2));
        });

        req.body.installments = installments;
        
        // create new bill to budget (parent)
        const newBill = new Bill(req.body);

        newBill.save(err => {

            // add new bill
            budget.bills.push(newBill.id);

            budget.save(err => {
                if(err) res.render('bills/new', { budgetId });
                res.redirect(`/dashboard`);
            });
        });
    });
}

function show(req, res) {
    Bill.findById(req.params.id, function(err, bill) {
        if(!bill || !bill.user.equals(req.user._id) || err) return res.redirect(`/`);
        res.render('bills/show', { bill });
    }).populate('budget');
}

function update(req, res) {
    Bill.findById(req.params.id, function(err, bill) {
        if(!bill || !bill.user.equals(req.user._id) || err) return res.redirect(`/`);

        bill.name = req.body.name;
        bill.dueDate = req.body.dueDate;
        bill.autoPay = req.body.autoPay;
        bill.autoPayAccount = req.body.autoPayAccount;
        bill.total = req.body.total;
        bill.url = req.body.url;

        const paySchedule = bill.budget.paySchedule;

        if(paySchedule === "Monthly") {
            // update 0 // keep 1,2,3
            bill.installments.set(0,req.body[`installments[0]`]);

        } else if(paySchedule === "Bi-Weekly" || paySchedule === "Semi-Monthly") {
            // update 0,1 // keep 2,3
            bill.installments.set(0,req.body[`installments[0]`]);
            bill.installments.set(1,req.body[`installments[1]`]);

        } else if(paySchedule === "Weekly") {
            // update all
            bill.installments.forEach((i, idx) => {
                const inst = req.body[`installments[${idx}]`];
                const newVal = inst ? parseFloat(inst).toFixed(2) : parseFloat(0).toFixed(2);
                bill.installments.set(idx,newVal);
            });
        }

        bill.save(err => {
            res.redirect(`/dashboard`);
        });
    }).populate('budget');
}