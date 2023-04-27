///<reference path="../index.js"/>

app.factory('brandFactory', function (brandService) {
  var allOutlets = [];

  return {
    outletManager: function (outletManager) {
      return brandService.createOutletManager(outletManager);
    },

    outletInfo: function (brandId, pageno, cb) {
      brandService
        .getOutlets(brandId, pageno)
        .then(function (res) {
          allOutlets = res.data.outlet;
          //   console.log(allOutlets);
          cb(allOutlets);
          return allOutlets;
        })
        .catch(function (err) {
          console.log(err);
        });
    },

    createSuper: function (superFood) {
      return brandService.createSuper(superFood);
    },

    createSub: function (subFood) {
      return brandService.createSub(subFood);
    },
  };
});
