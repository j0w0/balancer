// conditional bill field based on transaction type
const transactionTypeSelect = document.getElementById('transactionType-radios');
const billSelect = document.getElementById('bill-select');

if(transactionTypeSelect) {
    transactionTypeSelect.addEventListener('click', function(event) {
        if(event.target.localName !== 'input') return;
        billSelect.style.display = event.target.value === "Withdrawal" ? 'block' : 'none';
    });
}

// conditional auto-pay account field
const apCheckbox = document.getElementById('autoPay');
const apAccountContainer = document.getElementById('autoPayAccount-container');
const apAccountInput = document.getElementById('autoPayAccount');

if(apCheckbox) {
    apCheckbox.addEventListener('click', function(event) {
        const currentDisplay = apAccountContainer.style.display;
        apAccountContainer.style.display = currentDisplay === 'none' ? 'block' : 'none';
        apAccountInput.required = currentDisplay === 'none' ? true : false;
    });
}