from flask import Flask, jsonify
from .calculations import calculate_net_worth
from .models import User, Income, Asset, FilingStatus, USState, IncomeType

app = Flask(__name__)

@app.route('/api/net_worth')
def get_net_worth():
    # Example Usage with dummy data
    # In a real application, this data would come from a database
    user = User(filing_status=FilingStatus.SINGLE, state=USState.CA)
    incomes = [Income(income_type=IncomeType.SALARY, amount=120000)]
    assets = [
        Asset(ticker='QQQ', shares=100, cost_basis=30000),
        Asset(ticker='NVDA', shares=50, cost_basis=10000),
        Asset(ticker='CASH', shares=25000, cost_basis=1) # Representing cash as an asset
    ]

    net_worth_data = calculate_net_worth(user, incomes, assets)
    
    return jsonify(net_worth_data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
