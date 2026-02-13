import React, { useState, useEffect } from 'react';
import AssetTable from './AssetTable';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {
    const [netWorth, setNetWorth] = useState(0);
    const [assets, setAssets] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/net_worth')
            .then(response => {
                const fetchedAssets = response.data.assets.map(asset => ({
                    ...asset,
                    name: asset.ticker,
                    value: asset.shares * (asset.current_price || 0) // we need current price here
                }));
                setAssets(fetchedAssets);
                setNetWorth(response.data.real_time_net_worth);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    
    // The API does not return the current price, so we need to calculate it. For now, let's use cost basis
    const chartData = assets.map(asset => ({ name: asset.ticker, value: asset.cost_basis }));

    return (
        <div>
            <h1>Net Worth Command Center</h1>
            <h2>Real-Time Net Worth: ${netWorth.toLocaleString()}</h2>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <AssetTable assets={assets} />
                <PieChart width={400} height={400}>
                    <Pie
                        data={chartData}
                        cx={200}
                        cy={200}
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>
        </div>
    );
};

export default Dashboard;
