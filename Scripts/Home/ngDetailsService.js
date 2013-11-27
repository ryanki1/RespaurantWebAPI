(function (app, $) {
    app.factory("ngDetailsDAL", function ($http, $q) {
        var deferred = $q.defer();
        var model = [];
        var ngDetailsDAL = {};

        ngDetailsDAL.getAddress1 = function () {
            $http.get("//localhost:32777/api/restaurant/GetAddress1").
                success(function(data){
                    model = data;
                    deferred.resolve();
                });
            return deferred.promise;
        }
        ngDetailsDAL.model = function () { return model; }
        return ngDetailsDAL;
    });
}(ngApp, jQuery));