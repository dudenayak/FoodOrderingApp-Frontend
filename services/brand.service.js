///<reference path="../index.js"/>

app.service('brandService', [
  '$http',
  function ($http) {
    var url = '';
    return {
      createOutletManager: function (outletManager) {
        outletManager.userType = 'outletManager';
        url = 'http://localhost:5000/api/outlet/registerOutlet';
        return $http.post(url, outletManager);
      },
      getOutletManagers: function (id) {
        url = 'http://localhost:5000/api/user/outletManager/' + id;
        return $http.get(url);
      },
      getOutlets: function (id) {
        url = 'http://localhost:5000/api/outlet/' + id;
        return $http.get(url);
      },
      editOutlet: function (id) {
        url = 'http://localhost:5000/api/outlet/' + id;
        return $http.get(url);
      },
      updateOutlet: function (id, outlet) {
        url = 'http://localhost:5000/api/outlet/' + id;
        return $http.put(url, outlet);
      },
      updateTrue: function (id, data) {
        url = 'http://localhost:5000/api/outlet/' + id + '/false';
        return $http.put(url, data);
      },
      updateFalse: function (id, data) {
        url = 'http://localhost:5000/api/outlet/' + id + '/true';
        return $http.put(url, data);
      },
      createSuper: function (formData, headers) {
        url = 'http://localhost:5000/api/superCategory/create';
        return $http.post(url, formData, headers);
      },
      getSuper: function (id) {
        url = 'http://localhost:5000/api/superCategory/' + id;
        return $http.get(url);
      },
      createSub: function (subFood) {
        url = 'http://localhost:5000/api/subCategory/create';
        return $http.post(url, subFood);
      },
      getSub: function (id) {
        url = 'http://localhost:5000/api/subCategory/' + id;
        return $http.get(url);
      },
      createFood: function (foodItem, headers) {
        url = 'http://localhost:5000/api/foodItem/create';
        return $http.post(url, foodItem, headers);
      },
      getFood: function (id) {
        url = 'http://localhost:5000/api/foodItem/info/' + id;
        return $http.get(url);
      },

      getFoodBrand: function (id) {
        url = 'http://localhost:5000/api/foodItem/brand/' + id;
        return $http.get(url);
      },
      getOrderSumBrand: function (id) {
        url = 'http://localhost:5000/api/order/brandRevenue/' + id;
        return $http.get(url);
      },
      getProfitableOutletBrand: function (id) {
        url = 'http://localhost:5000/api/order/profitableOutletBrand/' + id;
        return $http.get(url);
      },
      getOrderCreatedBrand: function (id) {
        url = 'http://localhost:5000/api/order/orderCreatedBrand/' + id;
        return $http.get(url);
      },
      getSalesPerOutlet: function (brandId, outletId) {
        url =
          'http://localhost:5000/api/order/salesPerOutlet/' +
          brandId +
          '/' +
          outletId;
        return $http.get(url);
      },
      getRatioPerOutlet: function (brandId, outletId) {
        url =
          'http://localhost:5000/api/order/ratioPerOutlet/' +
          brandId +
          '/' +
          outletId;
        return $http.get(url);
      },
    };
  },
]);
