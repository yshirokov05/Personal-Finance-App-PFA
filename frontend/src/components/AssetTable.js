import React from 'react';

const AssetTable = ({ assets }) => {
    return (
        <div>
            <h3>Asset Allocation</h3>
            <table>
                <thead>
                    <tr>
                        <th>Ticker</th>
                        <th>Shares</th>
                        <th>Cost Basis</th>
                    </tr>
                </thead>
                <tbody>
                    {assets.map((asset) => (
                        <tr key={asset.ticker}>
                            <td>{asset.ticker}</td>
                            <td>{asset.shares}</td>
                            <td>${asset.cost_basis.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AssetTable;
