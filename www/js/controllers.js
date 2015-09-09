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

  $scope.fps = FurgoPerfectos.all();
})

.controller('MapaCtrl', function($scope, FurgoPerfectos) {
  $scope.$on('$ionicView.enter', function(e) {
          $scope.map = {
          defaults: {
            tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            maxZoom: 18,
            zoomControlPosition: 'bottomleft'
          },
          markers : {},
          events: {
            map: {
              enable: ['context'],
              logic: 'emit'
            }
          }
        };

        $scope.goTo(0);
  });
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
