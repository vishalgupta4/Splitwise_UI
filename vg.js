let balances = {};

// Function to add a person and their balance
function addPerson() {
    const name = document.getElementById('name').value.trim();
    const balance = parseFloat(document.getElementById('balance').value);

    if (name && !isNaN(balance)) {
        balances[name] = (balances[name] || 0) + balance;
        document.getElementById('name').value = '';
        document.getElementById('balance').value = '';
    } else {
        alert('Please enter a valid name and balance.');
    }
}

// Function to round numbers to 2 decimal places
function roundTo(value) {
    return Math.round(value * 100) / 100;
}

// Function to settle debts and display results
function settleDebts() {
    const creditors = [];
    const debtors = [];

    // Separate creditors and debtors
    for (const [name, balance] of Object.entries(balances)) {
        if (balance > 0) {
            creditors.push({ name, balance });
        } else if (balance < 0) {
            debtors.push({ name, balance });
        }
    }

    // Settle debts
    const results = [];
    while (creditors.length && debtors.length) {
        const creditor = creditors.pop();
        const debtor = debtors.pop();

        const amount = Math.min(creditor.balance, -debtor.balance);
        results.push(`${debtor.name} needs to pay ${creditor.name}: ${roundTo(amount).toFixed(2)}`);

        creditor.balance -= amount;
        debtor.balance += amount;

        if (creditor.balance > 0) {
            creditors.push(creditor);
        }
        if (debtor.balance < 0) {
            debtors.push(debtor);
        }
    }

    // Display results
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = results.map(result => `<li>${result}</li>`).join('');
}
