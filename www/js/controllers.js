angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, FurgoPerfectos) {})

.controller('ListaCtrl', function($scope, FurgoPerfectos) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  //~ FurgoPerfectos.all().then(function(lista){
      //~ console.log("Hemos obtenido la lista en el controller")
      //~ $scope.fps = lista;
    //~ });

  $scope.fps = FurgoPerfectos.all();
})

.controller('DetalleCtrl', function($scope, $stateParams, FurgoPerfectos) {
    $scope.fp = FurgoPerfectos.getFp($stateParams.fpId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
