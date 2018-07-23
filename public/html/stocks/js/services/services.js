'use strict';

var Services = angular.module('stocks.services', []);

Services.service('Market', [function MarketService() {
  var Market = {
    companies: {},
    priceVariation: 0.2,

    calculateDiffs: _calculateDiffs,
    addCompany: _addCompany,
    toArray: _toArray,
    randomName: _randomName,
    step: _step,
  };

  function init() {
    for (var i = 0; i < 10; i++) {
      Market.addCompany();
    }

    return Market;
  };

  function _step() {
    var newCompanies = Math.floor(Math.random()*5);

    Object.keys(Market.companies).forEach(function forEachCompany(companyName) {
      var company = Market.companies[companyName];

      if (!company.dead) {
        company.history.push(company.value);

        if (Math.random() > 0.5) {
          company.value += company.value*Market.priceVariation*Math.random();
        }
        else {
          company.value -= company.value*Market.priceVariation*Math.random();

          if (company.value < 0.01) {
            company.dead = true;
            company.value = 0;
          }
        }
      }
      else {
        delete Market.companies[companyName];
      }
    });

    if (Math.random() > 0.4) {
      for (var i = 0 ; i < newCompanies; i++ ) {
        Market.addCompany();
      }
    }

    Market.calculateDiffs();
  };

  function _calculateDiffs() {
    Object.keys(Market.companies).forEach(function forEachCompany(companyName) {
      var company = Market.companies[companyName];
      var last;
      var actual;
      var diff;

      if (!company.dead && company.history.length) {
        last = company.history[company.history.length - 1];
        actual = company.value;
        diff = actual - last;
        company.variation = diff / actual;
      }
    });
  };

  function _addCompany() {
    var companyName = Market.randomName(6);
    Market.companies[companyName] = {
      name: companyName,
      value: Math.random()*12000,
      history: [],
      variation: 0,
      dead: false,
    };
  };

  function _toArray() {
    var result = [];

    Object.keys(Market.companies).forEach(function forEachCompany(companyName) {
      result.push(Market.companies[companyName]);
    });

    return result;
  };

  function _randomName(length) {
    var result = '';

    for (var i = 0 ; i < length; i++) {
      result += String.fromCharCode(Math.floor(Math.random()*25) + 65);
    }

    return result[0] + result.slice(1).toLowerCase();
  };

  return init();
}]);

Services.service('Broker', ['Market', function BrokerService(Market) {
  window.Broker = Broker;
  var Broker = {
    value: 10000,
    marketShare: {},
    work: _work,
    top: 5,
    tolerance: 0.5,
    stinginess: 1.2,

    getSharesValue: _getSharesValue,
    sharesToArray: _sharesToArray,
    removeShare: _removeShare,
    processShare: _processShare,
    haveShare: _haveShare,
    lastPrice: _lastPrice,
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
    var companies = Market.toArray();

    // SELL
    Broker.sharesToArray().forEach(function forEachMarketShare(share) {
      if (share.sold || !Market.companies[share.name] || Market.companies[share.name].dead) {
        delete Broker.marketShare[share.name];
      }
      else {
        Broker.processShare(share);
      }
    });

    //BUY
    companies = Market.toArray().map(function mapCompanies(company) {
      company.score = company.value * company.variation;
      return company;
    });

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

  return Broker;
}]);



