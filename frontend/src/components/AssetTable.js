import React from 'react';

const AssetTable = ({ assets }) => {
    const groupAssets = (allAssets) => {
        const grouped = {
            'Cash & Savings': [],
            'Investments': [],
            'Housing': [],
            'Other': []
        };

        const cashSavingsTypes = ['CASH', 'SAVINGS', 'CHECKING', 'HIGH_YIELD_SAVINGS'];
        const investmentTypes = ['STOCK', 'BOND'];
        const housingTypes = ['HOUSING'];

        allAssets.forEach(asset => {
            if (cashSavingsTypes.includes(asset.asset_type)) {
                grouped['Cash & Savings'].push(asset);
            } else if (investmentTypes.includes(asset.asset_type)) {
                grouped['Investments'].push(asset);
            } else if (housingTypes.includes(asset.asset_type)) {
                grouped['Housing'].push(asset);
            } else {
                grouped['Other'].push(asset);
            }
        });
        return grouped;
    };

    const groupedAssets = groupAssets(assets);

    const renderAssetGroup = (groupName, assetsInGroup) => {
        if (assetsInGroup.length === 0) {
            return null;
        }

        return (
            <div key={groupName} className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">{groupName}</h2>
                <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shares/Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost Basis</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market Value</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gain/Loss</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {assetsInGroup.map((asset, index) => {
                                const isLiquidAsset = ['CASH', 'SAVINGS', 'CHECKING', 'HIGH_YIELD_SAVINGS'].includes(asset.asset_type);
                                const isHousing = asset.asset_type === 'HOUSING';

                                const marketPrice = asset.current_price || (isLiquidAsset || isHousing ? 1 : 0);
                                const costPerShare = asset.shares > 0 && !isLiquidAsset && !isHousing ? asset.cost_basis / asset.shares : 0;
                                const marketValue = (isLiquidAsset || isHousing) ? asset.shares : asset.shares * marketPrice;
                                const gainLoss = marketValue - asset.cost_basis;
                                const gainLossPercent = asset.cost_basis > 0 ? (gainLoss / asset.cost_basis) * 100 : 0;

                                return (
                                    <tr key={`${asset.ticker}-${index}`}>
                                        <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500 uppercase">{asset.asset_type}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{asset.ticker}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.shares.toLocaleString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {!isLiquidAsset && !isHousing ? `$${asset.cost_basis.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                                            {!isLiquidAsset && !isHousing ? `$${marketPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
                                            ${marketValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </td>
                                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            {!isLiquidAsset && !isHousing ? (
                                                <>
                                                    {gainLoss >= 0 ? '+' : ''}${Math.abs(gainLoss).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                    <span className="text-xs ml-1 font-normal">({gainLossPercent.toFixed(2)}%)</span>
                                                </>
                                            ) : '-'}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-8">
            {renderAssetGroup('Cash & Savings', groupedAssets['Cash & Savings'])}
            {renderAssetGroup('Investments', groupedAssets['Investments'])}
            {renderAssetGroup('Housing', groupedAssets['Housing'])}
            {renderAssetGroup('Other', groupedAssets['Other'])}
        </div>
    );
};

export default AssetTable;
