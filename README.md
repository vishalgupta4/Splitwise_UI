Code in C++ is :

#include <iostream>
#include <unordered_map>
#include <vector>
#include <cmath>
#include <iomanip>
#include <queue>

using namespace std;

// Rounds a double value to the specified number of decimal places
double roundTo(double value, int decimalPlaces) {
    double scale = pow(10.0, decimalPlaces);
    return round(value * scale) / scale;
}

// Function to settle debts among a group
void settleDebts(unordered_map<string, double>& balances) {
    priority_queue<pair<double, string>> creditors;
    priority_queue<pair<double, string>, vector<pair<double, string>>, greater<pair<double, string>>> debtors;

    // Separate creditors and debtors
    for (const auto& entry : balances) {
        if (entry.second > 0) {
            creditors.push({entry.second, entry.first});
        } else if (entry.second < 0) {
            debtors.push({entry.second, entry.first});
        }
    }

    // Settle debts
    while (!creditors.empty() && !debtors.empty()) {
        pair<double, string> maxPair = creditors.top(); creditors.pop();
        pair<double, string> minPair = debtors.top(); debtors.pop();

        double credit = maxPair.first;
        string creditor = maxPair.second;
        double debt = minPair.first;
        string debtor = minPair.second;

        double amount = min(credit, -debt);
        amount = roundTo(amount, 2);

        cout << debtor << " needs to pays " << creditor << ": " << fixed << setprecision(2) << amount << endl;

        credit -= amount;
        debt += amount;

        if (credit > 0) {
            creditors.push({credit, creditor});
        }
        if (debt < 0) {
            debtors.push({debt, debtor});
        }
    }
}

