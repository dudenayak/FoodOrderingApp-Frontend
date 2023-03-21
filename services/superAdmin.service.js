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
      getBrandOwners: function () {
        url = 'http://localhost:5000/api/user/';
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
