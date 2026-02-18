import React from 'react';
import AssetTable from './AssetTable';
import DebtTable from './DebtTable';
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from './Card';
import { DollarSign, Briefcase, PieChart as PieChartIcon, ArrowDownCircle } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

const Dashboard = ({ netWorth, assets, debts, taxLiability, hideSummary = false, hideAssetSections = false, showDebtAllocation = false }) => {
    const assetValue = assets.reduce((acc, asset) => {
        const marketPrice = asset.current_price || (asset.shares > 0 ? asset.cost_basis / asset.shares : 0) || 0;
        return acc + (asset.shares * marketPrice);
    }, 0);
    const debtValue = debts.reduce((acc, debt) => acc + debt.remaining_balance, 0);

    const chartData = assets.map(asset => {
        const marketPrice = asset.current_price || (asset.shares > 0 ? asset.cost_basis / asset.shares : 0) || 0;
        return { 
            name: asset.ticker, 
            value: asset.shares * marketPrice
        };
    }).filter(item => item.value > 0);

    const debtChartData = debts.map(debt => ({
        name: debt.name,
        value: debt.remaining_balance
    })).filter(item => item.value > 0);

    return (
        <div className="space-y-8">
            {!hideSummary && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card title="Net Worth" icon={<DollarSign className="text-green-500" />}>
                        <p className="text-2xl font-bold">${(netWorth || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        <p className="text-xs text-gray-500 mt-1">Assets - Debts</p>
                    </Card>
                    
                    <Card title="Total Assets" icon={<Briefcase className="text-blue-500" />}>
                        <p className="text-2xl font-bold text-blue-600">${(assetValue || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </Card>

                    <Card title="Total Debts" icon={<ArrowDownCircle className="text-red-500" />}>
                        <p className="text-2xl font-bold text-red-600">${(debtValue || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </Card>

                    <Card title="Est. Annual Tax" icon={<DollarSign className="text-orange-500" />}>
                        <p className="text-2xl font-bold text-orange-600">${(taxLiability?.total || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        <p className="text-xs text-gray-500 mt-1">Informative only</p>
                    </Card>
                </div>
            )}

            {!hideAssetSections && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card title="Asset Breakdown" icon={<Briefcase className="text-blue-500" />}>
                        <AssetTable assets={assets} />
                    </Card>

                    <Card title="Asset Allocation" icon={<PieChartIcon className="text-yellow-500" />}>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <RechartsPieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                                    <Legend />
                                </RechartsPieChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>
            )}
            
            {showDebtAllocation && debts.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card title="Debt Breakdown" icon={<ArrowDownCircle className="text-red-500" />}>
                        <DebtTable debts={debts} />
                    </Card>

                    <Card title="Debt Allocation" icon={<PieChartIcon className="text-red-500" />}>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <RechartsPieChart>
                                    <Pie
                                        data={debtChartData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {debtChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                                    <Legend />
                                </RechartsPieChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>
            )}

            {!showDebtAllocation && debts.length > 0 && (
                <Card title="Debts" icon={<ArrowDownCircle className="text-red-500" />}>
                    <DebtTable debts={debts} />
                </Card>
            )}
        </div>
    );
};

export default Dashboard;
