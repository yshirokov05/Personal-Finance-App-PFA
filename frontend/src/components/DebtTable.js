import React from 'react';

const DebtTable = ({ debts }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Initial Loan</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Paid</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">APY%</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {debts.map((debt, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{debt.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${debt.initial_amount.toLocaleString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">${debt.amount_paid.toLocaleString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-bold">${debt.remaining_balance.toLocaleString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${debt.monthly_payment.toLocaleString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-bold">{(debt.interest_rate * 100).toFixed(2)}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DebtTable;