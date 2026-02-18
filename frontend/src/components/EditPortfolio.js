import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';

const EditPortfolio = ({ onSave, assets: initialAssets, incomes: initialIncomes }) => {
    const [assets, setAssets] = useState([]);
    const [incomes, setIncomes] = useState([]);

    useEffect(() => {
        setAssets(initialAssets || []);
        setIncomes(initialIncomes || []);
    }, [initialAssets, initialIncomes]);

    const handleAssetChange = (index, field, value) => {
        const updatedAssets = [...assets];
        updatedAssets[index] = { ...updatedAssets[index], [field]: value };
        setAssets(updatedAssets);
    };

    const addAsset = () => {
        setAssets([...assets, { ticker: '', shares: 0, cost_basis: 0 }]);
    };

    const removeAsset = (index) => {
        const updatedAssets = assets.filter((_, i) => i !== index);
        setAssets(updatedAssets);
    };

    const handleIncomeChange = (index, field, value) => {
        const updatedIncomes = [...incomes];
        updatedIncomes[index] = { ...updatedIncomes[index], [field]: value };
        setIncomes(updatedIncomes);
    };

    const addIncome = () => {
        setIncomes([...incomes, { income_type: 'SALARY', monthly_income: 0, hourly_wage: 0, hours_worked: 0 }]);
    };

    const removeIncome = (index) => {
        const updatedIncomes = incomes.filter((_, i) => i !== index);
        setIncomes(updatedIncomes);
    };

    const handleSave = () => {
        onSave({
            assets: assets.map(asset => ({
                ...asset,
                shares: Number(asset.shares),
                cost_basis: Number(asset.cost_basis),
            })),
            incomes: incomes.map(income => ({
                ...income,
                monthly_income: Number(income.monthly_income),
                hourly_wage: Number(income.hourly_wage),
                hours_worked: Number(income.hours_worked),
            })),
        });
    };

    return (
        <div className="space-y-6">
            {/* Assets Section */}
            <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Assets</h3>
                <div className="space-y-2">
                    {assets.map((asset, index) => (
                        <div key={index} className="grid grid-cols-4 gap-2 items-center">
                            <input
                                type="text"
                                placeholder="Ticker"
                                value={asset.ticker}
                                onChange={(e) => handleAssetChange(index, 'ticker', e.target.value.toUpperCase())}
                                className="col-span-1 mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <input
                                type="number"
                                placeholder="Shares"
                                value={asset.shares}
                                onChange={(e) => handleAssetChange(index, 'shares', e.target.value)}
                                className="col-span-1 mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <input
                                type="number"
                                placeholder="Cost Basis / Share"
                                value={asset.cost_basis}
                                onChange={(e) => handleAssetChange(index, 'cost_basis', e.target.value)}
                                className="col-span-1 mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                disabled={asset.ticker === 'CASH'}
                            />
                            <button onClick={() => removeAsset(index)} className="col-span-1 text-red-500 hover:text-red-700 justify-self-center">
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                </div>
                <button onClick={addAsset} className="flex items-center text-blue-500 hover:text-blue-700 mt-2">
                    <PlusCircle size={20} className="mr-2" />
                    Add Asset
                </button>
            </div>

            <hr />

            {/* Incomes Section */}
            <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Incomes</h3>
                <div className="space-y-2">
                    {incomes.map((income, index) => (
                        <div key={index} className="grid grid-cols-4 gap-2 items-center">
                            <select
                                value={income.income_type}
                                onChange={(e) => handleIncomeChange(index, 'income_type', e.target.value)}
                                className="col-span-1 mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="SALARY">Salary</option>
                                <option value="HOURLY">Hourly</option>
                            </select>

                            {income.income_type === 'SALARY' ? (
                                <input
                                    type="number"
                                    placeholder="Monthly Income"
                                    value={income.monthly_income}
                                    onChange={(e) => handleIncomeChange(index, 'monthly_income', e.target.value)}
                                    className="col-span-2 mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            ) : (
                                <>
                                    <input
                                        type="number"
                                        placeholder="Hourly Wage"
                                        value={income.hourly_wage}
                                        onChange={(e) => handleIncomeChange(index, 'hourly_wage', e.target.value)}
                                        className="col-span-1 mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Hours/Week"
                                        value={income.hours_worked}
                                        onChange={(e) => handleIncomeChange(index, 'hours_worked', e.target.value)}
                                        className="col-span-1 mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </>
                            )}
                            <button onClick={() => removeIncome(index)} className="col-span-1 text-red-500 hover:text-red-700 justify-self-center">
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                </div>
                <button onClick={addIncome} className="flex items-center text-blue-500 hover:text-blue-700 mt-2">
                    <PlusCircle size={20} className="mr-2" />
                    Add Income
                </button>
            </div>

            <div className="flex justify-end mt-6">
                <button 
                    onClick={handleSave}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default EditPortfolio;

