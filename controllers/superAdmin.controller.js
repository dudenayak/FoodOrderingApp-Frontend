///<reference path="../index.js"/>

// SUPER ADMIN CONTROLLER
app.controller('superCtrl', [
  '$scope',
  '$http',
  '$window',
  'superAdminService',
  function ($scope, $http, $window, superAdminService) {
    var data = JSON.parse(localStorage.getItem('user'));
    $scope.brandData = data;
    $scope.brandUsername = data.username;

    // ADD BRAND INFO AND ADMIN INFO
    $scope.openModal = function () {
      // $http('#createModal').modal('show');
    };

    $scope.registerBrand = [];

    $scope.saveBrand = function ($event) {
      $event.preventDefault();
      // $http.post('http://localhost:5000/brand/registerBrand', $scope.brandUser)
      superAdminService
        .createBrandUser($scope.brandUser)
        .then(function (res) {
          console.log(res);
          $window.location.reload();
        })
        .catch(function (err) {
          console.log(err);
        });
    };

    // Loading brand data from DB
    $scope.allBrands = [];
    superAdminService
      .getBrands()
      .then(function (res) {
        // $scope.allBrands = res.data.brandData;
        $scope.allBrands.splice(
          0,
          $scope.allBrands.length,
          ...res.data.brandData
        );
        // console.log($scope.allBrands.length);
      })
      .catch(function (err) {
        console.log(err);
      });

    // all outlets
    $scope.allOutlets = [];
    superAdminService
      .getOutlets()
      .then(function (res) {
        $scope.allOutlets = res.data.outletData[0];
        // console.log($scope.allOutlets);
      })
      .catch(function (err) {
        console.log(err);
      });

    // get order sum
    $scope.orderSum = [];
    superAdminService
      .getOrderSum()
      .then(function (res) {
        $scope.orderSum = res.data.orderSum[0];
        // console.log($scope.orderSum);
      })
      .catch(function (err) {
        console.log(err);
      });

    // get prfitable outlet
    $scope.profitableOutlet = [];
    superAdminService
      .getProfitableOutlet()
      .then(function (res) {
        $scope.profitableOutlet = res.data.profitableOutlet[0];
        // console.log($scope.profitableOutlet);
      })
      .catch(function (err) {
        console.log(err);
      });

    // get best brand
    // $scope.bestBrand = [];
    // superAdminService
    //   .getBestBrand()
    //   .then(function (res) {
    //     $scope.bestBrand = res.data.bestBrand[0];
    //     console.log($scope.bestBrand);
    //   })
    //   .catch(function (err) {
    //     console.log(err);
    //   });

    // Loading owner data from DB
    $scope.allOwners = [];
    superAdminService
      .getBrandOwners()
      .then(function (res) {
        $scope.allOwners = res.data.userData;
        // console.log($scope.allOwners);
      })
      .catch(function (err) {
        console.log(err);
      });

    // OPEN EDIT MODAL OWNER
    $scope.openModalEditOwner = function (ownerData) {
      $scope.owner = {};
      $scope.owner.username = ownerData.username;
      $scope.owner.brandName = ownerData.brand.brandName;
      // console.log($scope.owner.brandname);
      $scope.owner.phone = ownerData.phone;
      $scope.owner.email = ownerData.email;
      $scope.owner.id = ownerData._id;
      // $http.get('#editModalOwner').modal('show');
    };

    // UPDATE BRAND OWNER DATA
    $scope.saveOwnerData = function ($event) {
      $event.preventDefault();
      if (confirm('Are you sure you want to change data?')) {
        // console.log($scope.owner);
        superAdminService
          .updateOwner($scope.owner.id, $scope.owner)
          .then(function (res) {
            // console.log(res);
            $window.location.reload();
            // console.log($scope.owner);
          })
          .catch(function (err) {
            console.log(err);
          });
      }
    };

    // OPEN EDIT MODAL
    $scope.openModalEdit = function (brandData) {
      $scope.brand = [];
      superAdminService
        .editBrand(brandData._id)
        .then(function (res) {
          $scope.brand = res.data.brand;
        })
        .catch(function (err) {
          console.log(err);
        });
      // $http.get('#editModal').modal('show');
    };

    // LOGOUT
    $scope.logout = function ($event) {
      $event.preventDefault();
      localStorage.removeItem('user');
      localStorage.removeItem('outletInfo');
      $state.go('login');
    };

    // UPDATE BRAND DATA
    $scope.saveData = function ($event) {
      $event.preventDefault();
      if (confirm('Are you sure you want to change data?')) {
        superAdminService
          .updateBrand($scope.brand._id, $scope.brand)
          .then(function (res) {
            // console.log($scope.brand.id);
            // console.log(res);
            $window.location.reload();
          })
          .catch(function (err) {
            console.log(err);
          });
      }
    };

    // UPDATE BRAND STATE
    $scope.handleToggle = function (res, _id) {
      if (res == true) {
        if (confirm('Are you sure you want to toggle off?')) {
          $http
            .put(
              'http://localhost:5000/api/brand/' + _id + '/false',
              $scope.brand
            )
            // superAdminService
            // .updateTrue($scope.brand.id, $scope.brand)
            .then(function (res) {
              // console.log($scope.brand._id);
              // console.log(res);
              $window.location.reload();
            })
            .catch(function (err) {
              console.log(err);
            });
        }
      } else if (res == false) {
        if (confirm('Are you sure you want to toggle on?')) {
          // superAdminService;
          // .updateFalse($scope.brand._id, $scope.brand)
          $http
            .put(
              'http://localhost:5000/api/brand/' + _id + '/true',
              $scope.brand
            )
            .then(function (res) {
              // console.log(res);
              $window.location.reload();
            })
            .catch(function (err) {
              console.log(err);
            });
        }
      }
    };

    // GET TOTAL ORDER CREATED
    $scope.totalOrders = [];
    superAdminService
      .getTotalOrderCreated()
      .then(function (res) {
        $scope.totalOrders = res.data.totalOrderCreated[0].totalOrders;
        // console.log($scope.totalOrders);
      })
      .catch(function (err) {
        console.log(err);
      });

    // getUserCreated
    $scope.userCreated = [];
    var dateLabel = [];
    var countDataset = [];
    superAdminService
      .getUserCreated()
      .then(function (res) {
        $scope.userCreated = res.data.userCreated;
        // console.log($scope.userCreated);
        for (var i = 0; i < $scope.userCreated.length; i++) {
          dateLabel.push($scope.userCreated[i]._id);
          countDataset.push($scope.userCreated[i].count);
        }

        new Chart('myChart', {
          type: 'line',
          data: {
            labels: dateLabel,
            datasets: [
              {
                label: 'Number of Users',
                data: countDataset,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                // backgroundColor: [
                //   'rgba(255, 99, 132, 0.2)',
                //   'rgba(54, 162, 235, 0.2)',
                //   'rgba(255, 206, 86, 0.2)',
                //   'rgba(75, 192, 192, 0.2)',
                //   'rgba(153, 102, 255, 0.2)',
                //   'rgba(255, 159, 64, 0.2)',
                //   'rgba(125, 19, 4, 0.2)',
                //   'rgba(55, 159, 64, 0.2)',
                // ],
                // borderColor: [
                //   'rgba(255, 99, 132, 1)',
                //   'rgba(54, 162, 235, 1)',
                //   'rgba(255, 206, 86, 1)',
                //   'rgba(75, 192, 192, 1)',
                //   'rgba(153, 102, 255, 1)',
                //   'rgba(255, 159, 64, 1)',
                //   'rgba(125, 19, 4, 1)',
                //   'rgba(55, 159, 64, 1)',
                // ],
                // borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    max: 6,
                  },
                },
              ],
            },
            title: {
              display: true,
              text: 'User Createion Date',
              position: 'bottom',
            },
          },
        });
      })
      .catch(function (err) {
        console.log(err);
      });

    // getBrandCreated
    $scope.brandCreated = [];
    var dateBrandLabel = [];
    var countBrandDataset = [];
    superAdminService
      .getBrandCreated()
      .then(function (res) {
        $scope.brandCreated = res.data.brandCreated;
        // console.log($scope.brandCreated);
        for (var i = 0; i < $scope.brandCreated.length; i++) {
          dateBrandLabel.push($scope.brandCreated[i]._id);
          countBrandDataset.push($scope.brandCreated[i].count);
        }

        new Chart('myChart1', {
          type: 'line',
          data: {
            labels: dateBrandLabel,
            datasets: [
              {
                label: 'Number of Brands',
                data: countBrandDataset,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                // fill: false,
                // tension: 0.5,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    max: 6,
                  },
                },
              ],
            },
            title: {
              display: true,
              text: 'Brand Creation Date',
              position: 'bottom',
            },
          },
        });
      })
      .catch(function (err) {
        console.log(err);
      });

    // getOutletCreated
    $scope.outletCreated = [];
    var dateOutletLabel = [];
    var countOutletDataset = [];
    superAdminService
      .getOutletCreated()
      .then(function (res) {
        $scope.outletCreated = res.data.outletCreated;
        // console.log($scope.outletCreated);
        for (var i = 0; i < $scope.outletCreated.length; i++) {
          dateOutletLabel.push($scope.outletCreated[i]._id);
          countOutletDataset.push($scope.outletCreated[i].count);
        }

        new Chart('myChart2', {
          type: 'line',
          data: {
            labels: dateOutletLabel,
            datasets: [
              {
                label: 'Number of Outlets',
                data: countOutletDataset,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    max: 6,
                  },
                },
              ],
            },
            title: {
              display: true,
              text: 'Outlet Creation Date',
              position: 'bottom',
            },
          },
        });
      })
      .catch(function (err) {
        console.log(err);
      });

    // getFoodItemCreated
    $scope.foodItemCreated = [];
    var dateFoodItemLabel = [];
    var countFoodItemDataset = [];
    superAdminService
      .getFoodItemCreated()
      .then(function (res) {
        $scope.foodItemCreated = res.data.foodItemCreated;
        // console.log($scope.foodItemCreated);
        for (var i = 0; i < $scope.foodItemCreated.length; i++) {
          dateFoodItemLabel.push($scope.foodItemCreated[i]._id);
          countFoodItemDataset.push($scope.foodItemCreated[i].count);
        }

        new Chart('myChart3', {
          type: 'line',
          data: {
            labels: dateFoodItemLabel,
            datasets: [
              {
                label: 'Number of Food Items',
                data: countFoodItemDataset,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    max: 10,
                  },
                },
              ],
            },
            title: {
              display: true,
              text: 'Food Item Creation Date',
              position: 'bottom',
            },
          },
        });
      })
      .catch(function (err) {
        console.log(err);
      });

    // getUserCount
    $scope.userCount = [];
    var userTypeLabel = [];
    var userCountDataset = [];
    superAdminService
      .getUserCount()
      .then(function (res) {
        $scope.userCount = res.data.userCount;
        // console.log($scope.userCount);
        for (var i = 0; i < $scope.userCount.length; i++) {
          userTypeLabel.push($scope.userCount[i]._id);
          userCountDataset.push($scope.userCount[i].count);
        }

        new Chart('myChart4', {
          type: 'pie',
          data: {
            labels: userTypeLabel,
            datasets: [
              {
                label: 'Number of Food Items',
                data: userCountDataset,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  // 'rgba(75, 192, 192, 0.2)',
                  // 'rgba(153, 102, 255, 0.2)',
                  // 'rgba(255, 159, 64, 0.2)',
                  // 'rgba(125, 19, 4, 0.2)',
                  // 'rgba(55, 159, 64, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  // 'rgba(75, 192, 192, 1)',
                  // 'rgba(153, 102, 255, 1)',
                  // 'rgba(255, 159, 64, 1)',
                  // 'rgba(125, 19, 4, 1)',
                  // 'rgba(55, 159, 64, 1)',
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            maintainAspectRatio: false,
            responsive: true,
            scales: {
              // yAxes: [
              //   {
              //     ticks: {
              //       beginAtZero: true,
              //       max: 20,
              //     },
              //   },
              // ],
            },
            title: {
              display: true,
              text: 'Types of Users',
              position: 'bottom',
            },
          },
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  },
]);
