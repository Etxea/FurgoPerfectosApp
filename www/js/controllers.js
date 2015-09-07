angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ListaCtrl', function($scope, $http, FurgoPerfectos) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  //$scope.fps = FurgoPerfectos.all();
  
  console.log("Vamos a bajarnos los FPs");
        $http.get("http://www.furgovw.org/api.php?getEverything=&withoutBody=").
            then(function(response) {
                console.log("Hemos recibido la respuesta",response.status);
                data = response.data;                
                $scope.fps = data;
                console.log("Los tenemos?");
                console.log($scope.fps[0].nombre);
                
            }, function(response,status) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log("Error descargando los FPs");
                console.log(response);
                console.log(response.status);
                $scope.fps = [{"nombre":"error de conexion"}]
                
                
            });
  
  console.log("Pasado al scope?");
  
})

.controller('DetalleCtrl', function($scope, $stateParams, FurgoPerfectos) {
  
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
