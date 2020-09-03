const transactionTypeSelect = document.querySelector('#transactionType-radios');
const billSelect = document.querySelector('#bill-select');

if(transactionTypeSelect) {
    transactionTypeSelect.addEventListener('click', function(event) {
        if(event.target.localName !== 'input') return;
        billSelect.style.display = event.target.value === "Withdrawal" ? 'block' : 'none';
    });
}