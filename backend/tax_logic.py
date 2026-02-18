
FEDERAL_TAX_BRACKETS_2026 = {
    'single': {
        'deduction': 16100,
        'brackets': [
            {'rate': 0.10, 'up_to': 12400},
            {'rate': 0.12, 'up_to': 50400},
            {'rate': 0.22, 'up_to': 105700},
            {'rate': 0.24, 'up_to': 201775},
            {'rate': 0.32, 'up_to': 256225},
            {'rate': 0.35, 'up_to': 640600},
            {'rate': 0.37, 'up_to': float('inf')}
        ]
    },
    'married_filing_jointly': {
        'deduction': 32200,
        'brackets': [
            {'rate': 0.10, 'up_to': 24800},
            {'rate': 0.12, 'up_to': 100800},
            {'rate': 0.22, 'up_to': 211400},
            {'rate': 0.24, 'up_to': 403550},
            {'rate': 0.32, 'up_to': 512450},
            {'rate': 0.35, 'up_to': 768700},
            {'rate': 0.37, 'up_to': float('inf')}
        ]
    },
    'head_of_household': {
        'deduction': 24150,
        'brackets': [
            {'rate': 0.10, 'up_to': 17700},
            {'rate': 0.12, 'up_to': 67500},
            {'rate': 0.22, 'up_to': 105700},
            {'rate': 0.24, 'up_to': 201750},
            {'rate': 0.32, 'up_to': 256200},
            {'rate': 0.35, 'up_to': 640600},
            {'rate': 0.37, 'up_to': float('inf')}
        ]
    },
    'married_filing_separately': {
        'deduction': 16100,
        'brackets': [
            {'rate': 0.10, 'up_to': 12400},
            {'rate': 0.12, 'up_to': 50400},
            {'rate': 0.22, 'up_to': 105700},
            {'rate': 0.24, 'up_to': 201775},
            {'rate': 0.32, 'up_to': 256225},
            {'rate': 0.35, 'up_to': 384350},
            {'rate': 0.37, 'up_to': float('inf')}
        ]
    }
}
# Qualifying widow usually uses MFJ brackets
FEDERAL_TAX_BRACKETS_2026['qualifying_widow'] = FEDERAL_TAX_BRACKETS_2026['married_filing_jointly']

STATE_TAX_BRACKETS_2026 = {
    'CA': {
        'single': {
            'deduction': 5706,
            'brackets': [
                {'rate': 0.01, 'up_to': 11079},
                {'rate': 0.02, 'up_to': 26264},
                {'rate': 0.04, 'up_to': 41452},
                {'rate': 0.06, 'up_to': 57542},
                {'rate': 0.08, 'up_to': 72724},
                {'rate': 0.093, 'up_to': 371479},
                {'rate': 0.103, 'up_to': 445771},
                {'rate': 0.113, 'up_to': 742953},
                {'rate': 0.123, 'up_to': float('inf')}
            ],
            'mental_health_tax_rate': 0.01,
            'mental_health_tax_threshold': 1000000
        },
        'married_filing_jointly': {
            'deduction': 11412,
            'brackets': [
                {'rate': 0.01, 'up_to': 22158},
                {'rate': 0.02, 'up_to': 52528},
                {'rate': 0.04, 'up_to': 82904},
                {'rate': 0.06, 'up_to': 115084},
                {'rate': 0.08, 'up_to': 145448},
                {'rate': 0.093, 'up_to': 742958},
                {'rate': 0.103, 'up_to': 891542},
                {'rate': 0.113, 'up_to': 1485906},
                {'rate': 0.123, 'up_to': float('inf')}
            ],
            'mental_health_tax_rate': 0.01,
            'mental_health_tax_threshold': 1000000
        },
        'head_of_household': {
            'deduction': 8243,
            'brackets': [
                {'rate': 0.01, 'up_to': 22170},
                {'rate': 0.02, 'up_to': 52530},
                {'rate': 0.04, 'up_to': 67715},
                {'rate': 0.06, 'up_to': 83808},
                {'rate': 0.08, 'up_to': 98988},
                {'rate': 0.093, 'up_to': 505199},
                {'rate': 0.103, 'up_to': 606239},
                {'rate': 0.113, 'up_to': 1000000}, # Actually continues
                {'rate': 0.123, 'up_to': float('inf')}
            ],
            'mental_health_tax_rate': 0.01,
            'mental_health_tax_threshold': 1000000
        }
    }
}
STATE_TAX_BRACKETS_2026['CA']['married_filing_separately'] = STATE_TAX_BRACKETS_2026['CA']['single']
STATE_TAX_BRACKETS_2026['CA']['qualifying_widow'] = STATE_TAX_BRACKETS_2026['CA']['married_filing_jointly']

def calculate_federal_tax(income, filing_status='single'):
    """
    Calculates the federal tax for a given income and filing status.
    """
    if filing_status not in FEDERAL_TAX_BRACKETS_2026:
        # Fallback to single if status not found, or return 0
        status_brackets = FEDERAL_TAX_BRACKETS_2026.get('single')
    else:
        status_brackets = FEDERAL_TAX_BRACKETS_2026[filing_status]

    taxable_income = max(0, income - status_brackets['deduction'])
    
    tax = 0
    previous_bracket_limit = 0
    
    for bracket in status_brackets['brackets']:
        if taxable_income == 0:
            break
            
        bracket_limit = bracket['up_to']
        rate = bracket['rate']
        
        if taxable_income > bracket_limit:
            tax += (bracket_limit - previous_bracket_limit) * rate
            previous_bracket_limit = bracket_limit
        else:
            tax += (taxable_income - previous_bracket_limit) * rate
            break
            
    return tax

def calculate_state_tax(income, state='CA', filing_status='single'):
    """
    Calculates the state tax for a given income, state, and filing status.
    """
    if state not in STATE_TAX_BRACKETS_2026:
        # Default to 0 for states not implemented or with no income tax
        return 0
    
    if filing_status not in STATE_TAX_BRACKETS_2026[state]:
        # Fallback to single for the state
        state_brackets = STATE_TAX_BRACKETS_2026[state].get('single')
    else:
        state_brackets = STATE_TAX_BRACKETS_2026[state][filing_status]

    taxable_income = max(0, income - state_brackets['deduction'])
    
    tax = 0
    previous_bracket_limit = 0
    
    for bracket in state_brackets['brackets']:
        if taxable_income == 0:
            break
            
        bracket_limit = bracket['up_to']
        rate = bracket['rate']
        
        if taxable_income > bracket_limit:
            tax += (bracket_limit - previous_bracket_limit) * rate
            previous_bracket_limit = bracket_limit
        else:
            tax += (taxable_income - previous_bracket_limit) * rate
            break

    # Apply mental health services tax (Specific to CA, but checking generic fields)
    if 'mental_health_tax_threshold' in state_brackets and taxable_income > state_brackets['mental_health_tax_threshold']:
        tax += (taxable_income - state_brackets['mental_health_tax_threshold']) * state_brackets['mental_health_tax_rate']
            
    return tax

def calculate_fica_tax(income, filing_status='single'):
    """
    Calculates FICA taxes (Social Security and Medicare) for 2026.
    Social Security: 6.2% up to $176,100.
    Medicare: 1.45% on all income.
    Additional Medicare: 0.9% above threshold.
    """
    # 2026 Social Security cap estimated
    ss_cap = 176100
    ss_rate = 0.062
    ss_tax = min(income, ss_cap) * ss_rate

    medicare_rate = 0.0145
    medicare_tax = income * medicare_rate

    # Additional Medicare tax
    add_medicare_rate = 0.009
    if filing_status == 'married_filing_jointly':
        threshold = 250000
    elif filing_status == 'married_filing_separately':
        threshold = 125000
    else:
        threshold = 200000

    add_medicare_tax = max(0, income - threshold) * add_medicare_rate

    return ss_tax + medicare_tax + add_medicare_tax

if __name__ == '__main__':
    # Example usage:
    # To be added later
    pass
