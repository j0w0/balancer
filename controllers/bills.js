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

        const arr = [0,1,2,3];
        const installments = [];
        const paySchedule = bill.budget.paySchedule;

        // get original values to persist
        const inst0 = bill.installments[0];
        const inst1 = bill.installments[1];
        const inst2 = bill.installments[2];
        const inst3 = bill.installments[3];

        if(paySchedule === "Monthly") {
            // update 0 // keep 1,2,3
            installments[0] = req.body[`installments[0]`]
            installments[1] = inst1;
            installments[2] = inst2;
            installments[3] = inst3;
        } else if(paySchedule === "Bi-Weekly" || paySchedule === "Semi-Monthly") {
            // update 0,1 // keep 2,3
            installments[0] = req.body[`installments[0]`];
            installments[1] = req.body[`installments[1]`];
            installments[2] = inst2;
            installments[3] = inst3;
        } else if(paySchedule === "Weekly") {
            // update 0,1,2,3 (all)
            arr.forEach(idx => {
                const inst = req.body[`installments[${idx}]`];
                inst ? installments.push(parseFloat(inst).toFixed(2)) : installments.push(parseFloat(0).toFixed(2));
            });
        }

        bill.installments = installments;

        bill.save(err => {
            res.redirect(`/dashboard`);
        });
    }).populate('budget');
}