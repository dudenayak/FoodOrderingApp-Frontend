///<reference path="../index.js"/>

app.service('superAdminService', [
  '$http',
  //   'globalConfig',
  function ($http) {
    var url = '';
    return {
      createBrandUser: function (brandUser) {
        brandUser.userType = 'brandOwner';
        url = 'http://localhost:5000/api/brand/registerBrand';
        return $http.post(url, brandUser);
      },
      getBrands: function () {
        url = 'http://localhost:5000/api/brand/';
        return $http.get(url);
      },
      getOutlets: function () {
        url = 'http://localhost:5000/api/outlet/totalOutlets';
        return $http.get(url);
      },
      getOrderSum: function () {
        url = 'http://localhost:5000/api/order/orderSum';
        return $http.get(url);
      },
      getUserCreated: function () {
        url = 'http://localhost:5000/api/user/userCreated';
        return $http.get(url);
      },
      getBrandCreated: function () {
        url = 'http://localhost:5000/api/brand/brandCreated';
        return $http.get(url);
      },
      getOutletCreated: function () {
        url = 'http://localhost:5000/api/outlet/outletCreated';
        return $http.get(url);
      },
      getFoodItemCreated: function () {
        url = 'http://localhost:5000/api/foodItem/foodItemCreated';
        return $http.get(url);
      },
      getUserCount: function () {
        url = 'http://localhost:5000/api/user/userCount';
        return $http.get(url);
      },
      getTotalOrderCreated: function () {
        url = 'http://localhost:5000/api/order/totalOrderCreated';
        return $http.get(url);
      },
      getProfitableOutlet: function () {
        url = 'http://localhost:5000/api/order/profitableOutlet';
        return $http.get(url);
      },
      getBestBrand: function () {
        url = 'http://localhost:5000/api/order/bestBrand';
        return $http.get(url);
      },
      getBrandOwners: function () {
        url = 'http://localhost:5000/api/user/brandOwner';
        return $http.get(url);
      },
      editBrand: function (id) {
        url = 'http://localhost:5000/api/brand/' + id;
        return $http.get(url);
      },
      updateBrand: function (id, brand) {
        url = 'http://localhost:5000/api/brand/' + id;
        return $http.put(url, brand);
      },
      editOwner: function (id) {
        url = 'http://localhost:5000/api/user/' + id;
        return $http.get(url);
      },
      updateOwner: function (id, owner) {
        console.log(owner);
        url = 'http://localhost:5000/api/user/' + id;
        return $http.put(url, owner);
      },
      updateTrue: function (id, data) {
        url = 'http://localhost:5000/api/brand/' + id + '/false';
        return $http.put(url, data);
      },
      updateFalse: function (id, data) {
        url = 'http://localhost:5000/api/brand/' + id + '/true';
        return $http.put(url, data);
      },
    };
  },
]);
