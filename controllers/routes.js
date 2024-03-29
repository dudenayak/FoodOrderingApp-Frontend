///<reference path="../index.js"/>

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$httpProvider',
  function ($stateProvider, $urlRouterProvider, $httpProvider) {
    // $httpProvider.interceptors.push(interceptorRequest);
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '../views/home.html',
        controller: 'homeCtrl',
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: '../views/superAdmin/sidebar.html',
        controller: 'superCtrl',
      })
      .state('dashboard.superAdminPortal', {
        url: '/superAdminPortal',
        templateUrl: '../views/superAdmin/superAdminPortal.html',
        controller: 'superCtrl',
      })
      .state('dashboard.viewAllCustomers', {
        url: '/viewAllCustomers',
        templateUrl: '../views/superAdmin/viewAllCustomers.html',
        controller: 'superCtrl',
      })
      .state('dashboard.viewAllBrands', {
        url: '/viewAllBrands',
        templateUrl: '../views/superAdmin/viewAllBrands.html',
        controller: 'superCtrl',
      })
      .state('dashboard.analytics', {
        url: '/analytics',
        templateUrl: '../views/superAdmin/analytics.html',
        controller: 'superCtrl',
      })
      .state('panel', {
        url: '/panel',
        templateUrl: '../views/brand/sidebarBrand.html',
        controller: 'brandCtrl',
      })
      .state('panel.analytics', {
        url: '/analytics',
        templateUrl: '../views/brand/analytics.html',
        controller: 'brandCtrl',
      })
      .state('panel.brandPortal', {
        url: '/brandPortal',
        templateUrl: '../views/brand/brandPortal.html',
        controller: 'brandCtrl',
      })
      .state('panel.brandOutlets', {
        url: '/brandPortalOutlets',
        templateUrl: '../views/brand/brandOutlets.html',
        controller: 'brandCtrl',
      })
      .state('panel.brandOutletManagers', {
        url: '/brandPortalOutletManagers',
        templateUrl: '../views/brand/brandOutletManagers.html',
        controller: 'brandCtrl',
      })
      .state('outlet', {
        url: '/outlet',
        templateUrl: '../views/outlet/sidebarOutlet.html',
        controller: 'outletCtrl',
      })
      .state('outlet.outletPortal', {
        url: '/outletPortal',
        templateUrl: '../views/outlet/outletPortal.html',
        controller: 'outletCtrl',
      })
      .state('outlet.outletItem', {
        url: '/outletItem',
        templateUrl: '../views/outlet/outletItem.html',
        controller: 'outletCtrl',
      })
      .state('outletEmployee', {
        url: '/outletEmployee',
        templateUrl: '../views/outletEmployee/sidebarOutletEmployee.html',
        controller: 'outletEmployeeCtrl',
      })
      .state('outletEmployee.outletEmployeePortal', {
        url: '/outletEmployeePortal',
        templateUrl: '../views/outletEmployee/outletEmployeePortal.html',
        controller: 'outletEmployeeCtrl',
      })
      .state('outletEmployee.dineIn', {
        url: '/dineIn',
        templateUrl: '../views/outletEmployee/dineIn.html',
        controller: 'outletEmployeeCtrl',
      })
      .state('outletEmployee.takeAway', {
        url: '/takeAway',
        templateUrl: '../views/outletEmployee/takeAway.html',
        controller: 'outletEmployeeCtrl',
      })
      .state('outletEmployee.status', {
        url: '/status',
        templateUrl: '../views/outletEmployee/orderStatus.html',
        controller: 'outletEmployeeCtrl',
      })
      .state('outletEmployee.history', {
        url: '/history',
        templateUrl: '../views/outletEmployee/orderHistory.html',
        controller: 'outletEmployeeCtrl',
      })
      .state('login', {
        url: '/',
        templateUrl: '../views/login.html',
        controller: 'myCtrl',
      });
  },
]);
