import yfinance as yf

def get_current_price(ticker_symbol):
    """
    Fetches the current market price for a given ticker symbol using yfinance.
    """
    try:
        ticker = yf.Ticker(ticker_symbol)
        # get historical market data
        todays_data = ticker.history(period='1d')
        return todays_data['Close'][0]
    except Exception as e:
        print(f"Error fetching price for {ticker_symbol}: {e}")
        return None

if __name__ == '__main__':
    # Example usage:
    # price = get_current_price("AAPL")
    # if price:
    #     print(f"AAPL current price: {price}")
    #
    # price = get_current_price("MSFT")
    # if price:
    #     print(f"MSFT current price: {price}")
    pass
