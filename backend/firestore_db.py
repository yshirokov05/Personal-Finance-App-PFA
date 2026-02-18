import firebase_admin
from firebase_admin import credentials, firestore
from models import User, Income, Asset, Debt, FilingStatus, USState, IncomeType, AssetType

# We move the client creation inside a function so it doesn't slow down the boot-up
def get_db():
    try:
        firebase_admin.get_app()
    except ValueError:
        firebase_admin.initialize_app()
    return firestore.client()

def get_user_data(user_id="default_user"):
    """Fetches user tax info, incomes, assets, and debts from Firestore."""
    db = get_db()
    user_ref = db.collection('users').document(user_id)
    doc = user_ref.get()
    
    if not doc.exists:
        # Return default if not found
        return (
            User(filing_status=FilingStatus.SINGLE, state=USState.CA),
            [Income(income_type=IncomeType.SALARY, amount=120000, monthly_income=10000)],
            [
                Asset(ticker='QQQ', shares=100, cost_basis=30000, asset_type=AssetType.STOCK),
                Asset(ticker='NVDA', shares=50, cost_basis=10000, asset_type=AssetType.STOCK),
                Asset(ticker='CASH', shares=25000, cost_basis=1, asset_type=AssetType.CASH)
            ],
            [Debt(name='Student Loan', initial_amount=30000, amount_paid=10000, monthly_payment=500, interest_rate=0.05)]
        )
    
    data = doc.to_dict()
    
    # Reconstruct objects
    user = User(
        filing_status=FilingStatus[data.get('filing_status', 'SINGLE')],
        state=USState[data.get('state', 'CA')]
    )
    
    incomes = []
    for inc in data.get('incomes', []):
        incomes.append(Income(
            income_type=IncomeType[inc['income_type']],
            amount=inc['amount'],
            monthly_income=inc.get('monthly_income'),
            hourly_wage=inc.get('hourly_wage'),
            hours_worked=inc.get('hours_worked')
        ))
        
    assets = []
    for ass in data.get('assets', []):
        assets.append(Asset(
            ticker=ass['ticker'],
            shares=ass['shares'],
            cost_basis=ass['cost_basis'],
            asset_type=AssetType[ass['asset_type']]
        ))
        
    debts = []
    for dbt in data.get('debts', []):
        debts.append(Debt(
            name=dbt['name'],
            initial_amount=dbt['initial_amount'],
            amount_paid=dbt['amount_paid'],
            monthly_payment=dbt.get('monthly_payment'),
            interest_rate=dbt.get('interest_rate')
        ))
        
    return user, incomes, assets, debts

def save_user_data(user, incomes, assets, debts, user_id="default_user"):
    """Saves the entire state to Firestore."""
    db = get_db()
    user_ref = db.collection('users').document(user_id)
    
    data = {
        'filing_status': user.filing_status.name,
        'state': user.state.name,
        'incomes': [{
            'income_type': i.income_type.name,
            'amount': i.amount,
            'monthly_income': i.monthly_income,
            'hourly_wage': i.hourly_wage,
            'hours_worked': i.hours_worked
        } for i in incomes],
        'assets': [{
            'ticker': a.ticker,
            'shares': a.shares,
            'cost_basis': a.cost_basis,
            'asset_type': a.asset_type.name
        } for a in assets],
        'debts': [{
            'name': d.name,
            'initial_amount': d.initial_amount,
            'amount_paid': d.amount_paid,
            'monthly_payment': d.monthly_payment,
            'interest_rate': d.interest_rate
        } for d in debts]
    }
    
    user_ref.set(data)
