from flask import Flask, jsonify, request
from flask_cors import CORS
from .calculations import calculate_net_worth
from .models import User, Income, Asset, FilingStatus, USState, IncomeType

app = Flask(__name__)
CORS(app)

# In-memory data store
user = User(filing_status=FilingStatus.SINGLE, state=USState.CA)
incomes = [Income(income_type=IncomeType.SALARY, amount=120000)]
assets = [
    Asset(ticker='QQQ', shares=100, cost_basis=30000),
    Asset(ticker='NVDA', shares=50, cost_basis=10000),
    Asset(ticker='CASH', shares=25000, cost_basis=1) # Representing cash as an asset
]

def asset_to_dict(asset):
    return {
        'ticker': asset.ticker,
        'shares': asset.shares,
        'cost_basis': asset.cost_basis
    }

def income_to_dict(income):
    # This needs to be improved to return all relevant fields
    # for now, just return what is needed for net_worth calculation
    return {
        'income_type': income.income_type.name,
        'amount': income.amount,
        # Add other fields here as needed by the frontend
        'monthly_income': income.monthly_income if hasattr(income, 'monthly_income') else None,
        'hourly_wage': income.hourly_wage if hasattr(income, 'hourly_wage') else None,
        'hours_worked': income.hours_worked if hasattr(income, 'hours_worked') else None,
    }

@app.route('/api/net_worth', methods=['GET'])
def get_net_worth():
    """Calculates and returns the current net worth."""
    net_worth_data = calculate_net_worth(user, incomes, assets)
    net_worth_data['assets'] = [asset_to_dict(a) for a in assets]
    net_worth_data['incomes'] = [income_to_dict(i) for i in incomes]
    return jsonify(net_worth_data)

@app.route('/api/portfolio', methods=['PUT'])
def update_portfolio():
    """Updates the portfolio based on new share and income data."""
    data = request.get_json()

    # Update assets
    new_assets_data = data.get('assets', [])
    assets.clear()
    for asset_data in new_assets_data:
        cost_basis = asset_data.get('cost_basis') if asset_data.get('ticker') != 'CASH' else 1.0
        assets.append(
            Asset(
                ticker=asset_data['ticker'],
                shares=asset_data['shares'],
                cost_basis=cost_basis
            )
        )

    # Update incomes
    new_incomes_data = data.get('incomes', [])
    incomes.clear()
    for income_data in new_incomes_data:
        income_type = IncomeType[income_data['income_type']]
        amount = 0
        
        income = Income(income_type=income_type)

        if income_type == IncomeType.SALARY:
            monthly_income = income_data.get('monthly_income', 0)
            amount = monthly_income * 12
            income.monthly_income = monthly_income
        elif income_type == IncomeType.HOURLY:
            hourly_wage = income_data.get('hourly_wage', 0)
            hours_worked = income_data.get('hours_worked', 0)
            amount = hourly_wage * hours_worked * 52
            income.hourly_wage = hourly_wage
            income.hours_worked = hours_worked

        income.amount = amount
        incomes.append(income)

    # Recalculate net worth with updated data
    net_worth_data = calculate_net_worth(user, incomes, assets)
    net_worth_data['assets'] = [asset_to_dict(a) for a in assets]
    net_worth_data['incomes'] = [income_to_dict(i) for i in incomes]
    return jsonify(net_worth_data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
