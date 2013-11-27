(function(app, $){
    app.controller("ngDetailsController", function (ngDetailsDAL, $scope, $element, $attrs) {

        var deferredPromise = ngDetailsDAL.getAddress1();
        deferredPromise.then(function () {
            $scope.model = { "address1": ngDetailsDAL.model().Address1 };
        });
    });
}(ngApp, jQuery));