angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, FurgoPerfectos) {
	status=FurgoPerfectos.status();
	console.log(status);
	$scope.counter = status.counter;
	})

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

.controller('MapaCtrl', function($scope, $cordovaGeolocation, FurgoPerfectos) {
	
  $scope.$on('$ionicView.enter', function(e) {
		  $scope.center= {
            lat:  42,
            lng: -3,
            zoom: 12
          },
          $scope.map = {
			  defaults: {
				tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
				maxZoom: 12,
				zoomControlPosition: 'bottomleft'
			  },
			  markers : {},
			  events: {
				map: {
				  enable: ['context'],
				  logic: 'emit'
				}
			  },
			  center: {
					lat:  42,
				lng: -3,
				zoom: 12
			   }
        };
        //~ console.log("Tenemos el mapa "+$scope.map);
        //~ console.log("Lanzando geolocalizacion...");
        $cordovaGeolocation
          .getCurrentPosition()
          .then(function (position) {
				console.log("Ya hemos localizado la posicion");
				//~ $scope.map.center.lat  = position.coords.latitude;
				//~ $scope.map.center.lng = position.coords.longitude;
				//~ $scope.map.center.zoom = 15;
				console.log("Centramos el mapa");
				$scope.map.center  = {
						  lat : position.coords.latitude,
						  lng : position.coords.longitude,
						  zoom : 12
						};
				
				console.log("Añadiendo markers");
				//marcadores = FurgoPerfectos.allMarkers();
				fps = FurgoPerfectos.all();
				for (var i = 0; i < fps.length; i++) {
					console.log("Añadiendo marker "+fps[i].id+" "+fps[i].nombre+" en "+fps[i].lat+ " "+fps[i].lng);
					$scope.map.markers[i]={
						lng: parseFloat(fps[i].lat),
						lat: parseFloat(fps[i].lng),
						focus: true,
						message: fps[i].nombre,
						
					}
				};
				//~ console.log("Son "+marcadores.lenght);
				//~ $scope.map.markers = marcadores;

          }, function(err) {
            // error
            console.log("Location error!");
            console.log(err);
          });
		console.log("Lanzado en async");
		console.log("Markers");
		

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
