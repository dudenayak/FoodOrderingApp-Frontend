///<reference path="../index.js"/>

app.service('brandService', [
  '$http',
  function ($http) {
    var url = '';
    return {
      createOutletManager: function (outletManager) {
        outletManager.userType = 'outletManager';
        url = 'http://localhost:5000/outlet/registerOutlet';
        return $http.post(url, outletManager);
      },
      getOutletManagers: function (id) {
        url = 'http://localhost:5000/user/outletManager/' + id;
        return $http.get(url);
      },
      getOutlets: function (id) {
        url = 'http://localhost:5000/outlet/' + id;
        return $http.get(url);
      },
      editOutlet: function (id) {
        url = 'http://localhost:5000/outlet/' + id;
        return $http.get(url);
      },
      updateOutlet: function (id, outlet) {
        url = 'http://localhost:5000/outlet/' + id;
        return $http.put(url, outlet);
      },
      updateTrue: function (id, data) {
        url = 'http://localhost:5000/outlet/' + id + '/false';
        return $http.put(url, data);
      },
      updateFalse: function (id, data) {
        url = 'http://localhost:5000/outlet/' + id + '/true';
        return $http.put(url, data);
      },
      createSuper: function (formData, headers) {
        url = 'http://localhost:5000/superCategory/create';
        return $http.post(url, formData, headers);
      },
      getSuper: function (id) {
        url = 'http://localhost:5000/superCategory/' + id;
        return $http.get(url);
      },
      createSub: function (subFood) {
        url = 'http://localhost:5000/subCategory/create';
        return $http.post(url, subFood);
      },
      getSub: function (id) {
        url = 'http://localhost:5000/subCategory/' + id;
        return $http.get(url);
      },
      createFood: function (foodItem) {
        url = 'http://localhost:5000/foodItem/create';
        return $http.post(url, foodItem);
      },
      getFood: function (id) {
        url = 'http://localhost:5000/foodItem/info/' + id;
        return $http.get(url);
      },
    };
  },
]);
