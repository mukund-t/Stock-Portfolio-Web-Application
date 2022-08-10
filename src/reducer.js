export const initialState = {
    funds: 25000,
    watchlist : [],
    watchlist_content : [],
    portfolio : [],
    portfolio_stocks : [],
}

const reducer = (state, action) => {
    console.log(action.type);
    switch(action.type){
        case "ADD_TO_WATCHLIST":
            return { ...state, watchlist: [ ...state.watchlist, action.stock ] };
        
        case "ADD_WATCHLIST_CONTENT":
            return { ...state, watchlist_content : [ ...state.watchlist_content, action.item ] };

        case "REMOVE_WATCHLIST_CONTENT":
            let newWatchlistContent = [...state.watchlist_content];
            
            const idx_ = state.watchlist_content.findIndex((watchlistItem) => watchlistItem.ticker === action.stock)

            if (idx_>=0){
                newWatchlistContent.splice(idx_, 1);
            }

            return { ...state, watchlist_content: newWatchlistContent };

        case 'BUY_STOCK':
            let newPortfolio = [...state.portfolio];

            let newPortfolioStocks = [...state.portfolio_stocks];

            let fl=0;
            for(let i=0;i<newPortfolioStocks.length;i++){
                if (newPortfolioStocks[i].ticker === action.item.ticker){
                    fl=1;
                    break;
                }
            }
            if (fl===0){
                newPortfolioStocks = [...state.portfolio_stocks, {ticker:action.item.ticker, name:action.item.name, avg_cost:0, quantity:0, total_cost:0, current_price:0, market_value:0, change_percent:0}];
            }
            
            let newFund = state.funds;
            newFund = newFund - action.item.total;

            console.log(newPortfolioStocks);

            newPortfolio.push({
                ticker:action.item.ticker,
                name:action.item.name,
                price:action.item.price,
                quantity:action.item.quantity,
                total:action.item.total,
            });
            console.log(newPortfolio);
            

            return { ...state, funds: newFund, portfolio: newPortfolio,  portfolio_stocks: newPortfolioStocks };

        case "UPDATE_WATCHLIST_CONTENT":
            let newWatchlistcontent = action.item.watchlist_cont;

            return { ...state, watchlist_content: newWatchlistcontent }

        case "UPDATE_PORTFOLIO_STOCKS":
            let newportfoliostocks = action.item.portfolio_stocks;

            return { ...state, portfolio_stocks: newportfoliostocks }

        case "REMOVE_FROM_WATCHLIST":
            
            let newWatchlist = [...state.watchlist];
            
            const idx = newWatchlist.indexOf(action.stock);

            if (idx>=0){
                newWatchlist.splice(idx, 1);
            }

            return { ...state, watchlist: newWatchlist };
        default:
            return state;
    }
}

export default reducer;