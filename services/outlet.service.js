///<reference path="../index.js"/>

app.service('outletService', [
  '$http',
  function ($http) {
    var url = '';
    return {
      // GET OUTLET INFO
      outletInfo: function (id) {
        url = 'http://localhost:5000/api/outlet/manager/' + id;
        return $http.get(url);
      },

      // GET OUTLET INFO
      outletInfoEmp: function (id) {
        url = 'http://localhost:5000/api/outlet/employee/' + id;
        return $http.get(url);
      },

      // GET OUTLET DATA
      outletData: function (id) {
        url = 'http://localhost:5000/api/outlet/' + id;
        return $http.get(url);
      },

      // GET SUPER CATEGORY BY BRAND
      getSuper: function (id) {
        url = 'http://localhost:5000/api/superCategory/' + id;
        return $http.get(url);
      },

      // GET SUB CATEGORY BY BRAND AND SUPER
      getSub: function (id) {
        url = 'http://localhost:5000/api/subCategory/' + id;
        return $http.get(url);
      },

      // GET SUB CATEGORY OF SUPER CATEGORY
      fetchSub: function (id) {
        url = 'http://localhost:5000/api/subCategory/fetch/' + id;
        return $http.get(url);
      },

      fetchItem: function (id) {
        url = 'http://localhost:5000/api/foodItem/fetch/' + id;
        return $http.get(url);
      },
      createOutletItem: function (foodItem) {
        url = 'http://localhost:5000/api/foodItemOutlet/create';
        return $http.post(url, foodItem);
      },
      getOutletItemInfo: function (id) {
        url = 'http://localhost:5000/api/foodItem/info' + id;
        return $http.get(url);
      },

      // GET FOOD ITEMS PER OUTLET
      getOutletItems: function (id) {
        url = 'http://localhost:5000/api/foodItemOutlet/' + id;
        return $http.get(url);
      },

      // CREATE OUTLET EMPLOYEE
      createOutletEmployee: function (outletEmployee) {
        outletEmployee.userType = 'outletEmployee';
        url = 'http://localhost:5000/api/outlet/registerEmployee';
        return $http.post(url, outletEmployee);
      },
    };
  },
]);
