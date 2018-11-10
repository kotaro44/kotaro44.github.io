'use strict';

Services.service('Broker', ['Market', function BrokerService(Market) {
  var Broker = {
    value: 10000,
    marketShare: {},
    work: _work,
    top: 5,
    tolerance: 0.5,
    stinginess: 1.2,
    shouldWork: true,

    getSharesValue: _getSharesValue,
    sharesToArray: _sharesToArray,
    removeShare: _removeShare,
    processShare: _processShare,
    haveShare: _haveShare,
    lastPrice: _lastPrice,
    analyzeCompany: _analyzeCompany,
    buy: _buy,
    sell: _sell,
  };

  function _haveShare(companyName) {
    return !!marketShare[companyName];
  };

  function _sharesToArray() {
    return Object.keys(Broker.marketShare).map(function mapShares(share) {
      return Broker.marketShare[share];
    });
  };

  function _getSharesValue() {
    return Broker.sharesToArray().reduce(function forEachShare(total, company) {
      return total + company.shares.length * Market.companies[company.name].value;
    }, 0);
  };

  function _buy(companyName, amount) {
    if (!amount) {
      amount = 1;
    }

    if (Broker.value - Market.companies[companyName].value*amount < 0) {
      return false;
    }

    var companyShare = null;

    if (!Broker.marketShare[companyName]) {
      Broker.marketShare[companyName] = {
        name: companyName,
        shares: [],
      };
    }

    companyShare = Broker.marketShare[companyName];

    if (companyShare.sold) {
      return false;
    }

    Broker.value -= Market.companies[companyName].value*amount;
    for (var i = 0 ; i < amount; i++) {
      companyShare.shares.push({
        price: Market.companies[companyName].value,
      });
    }

    return true;
  };

  function _sell(companyName, amount) {
    var company = Market.companies[companyName];
    var companyShare = Broker.marketShare[companyName];

    if (!amount) {
      amount = 1;
    }

    if (companyShare.shares.length < amount) {
      return;
    }

    companyShare.income = company.value*amount;
    Broker.value += companyShare.income;

    for (var i = 0 ; i < amount; i++) {
      Broker.removeShare(companyShare.shares);
    }

    if (companyShare.shares.length <= 0) {
      companyShare.sold = true;
    }
  };

  function _removeShare(shares) {
    shares.sort(function sortShares(shareA, shareB) {
      return shareA.price - shareB.price;
    });

    shares.shift();
  };

  function _work() {
    var companies = Market.toArray().map(Broker.analyzeCompany);

    // SELL
    Broker.sharesToArray().forEach(function forEachMarketShare(share) {
      if (share.sold || !Market.companies[share.name] || Market.companies[share.name].dead) {
        delete Broker.marketShare[share.name];
      }
      else {
        if (!Broker.shouldWork) {
          Broker.processShare(share);
        }
      }
    });

    if (!Broker.shouldWork) {
      return;
    }

    //buy new shares
    companies.filter(function filterLameCompanies(company) {
      return company.score > 0;
    }).sort(function sortCompanies(companyA, companyB) {
      return companyB.score - companyA.score;
    });

    var midPrice = (companies[0].value + companies[companies.length-1].value) / 2;
    var maxShares = Math.floor( Broker.value / midPrice );

    companies.forEach(function forEachTopCompany(company, index) {
      for (var i = (maxShares - index); i > 0 ; i-- ) {
        if (Broker.buy(company.name, i)) {
          i = 0;
        }
      }
    });
  };

  function _processShare(share) {
    var company = Market.companies[share.name];
    var lastPrice = Broker.lastPrice(share);

    if (lastPrice*Broker.stinginess < company.value) {
      //yay there is income here~~
      Broker.sell(share.name, share.shares.length);
    }
    else if (company.value < lastPrice*Broker.tolerance) {
      //kill it
      Broker.sell(share.name, share.shares.length);
    }
  };

  function _lastPrice(share) {
    share.shares.sort(function sortShares(shareA, shareB) {
      return shareB.price - shareA.price;
    });

    return share.shares[0].price;
  };

  function _analyzeCompany(company) {
    company.score = company.variation;

    return company;
  };

  return Broker;
}]);
