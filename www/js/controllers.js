angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, FurgoPerfectos, Localizacion) {
	$scope.localizacion=Localizacion.localizacion;
	$scope.status = FurgoPerfectos.getStatus;
    fps = FurgoPerfectos.all(Localizacion.localizacion);
    //$scope.fps=fps
	$scope.counter = fps.lengt;
	})

.controller('ListaCtrl', function($scope, FurgoPerfectos,Localizacion) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.fps = FurgoPerfectos.all(Localizacion.localizacion);
})

.controller('MapaCtrl', function($scope, $cordovaGeolocation, FurgoPerfectos, Localizacion) {
	
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
              layers: {
                    baselayers: {
                        tileLayer: {
                            name: 'OpenStreetMap',
                            type: 'xyz',
                            url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        }
                    },
                    overlays: {
                        furpoperfectos: {
                            name: "Furgo Perfectos",
                            type: "markercluster",
                            visible: true
                        },
                        campings: {
                            name: "Campings",
                            type: "markercluster",
                            visible: true
                        },
                        acs: {
                            name: "Areas Auto Caravanas",
                            type: "markercluster",
                            visible: true
                        },
                    }
               },
			  center: {
				lat:  42,
				lng: -3,
				zoom: 12
			   }
        };
        //~ console.log("Tenemos el mapa "+$scope.map);
        
        console.log("Lanzando geolocalizacion...");
        $cordovaGeolocation
          .getCurrentPosition()
          .then(function (position) {
				console.log("Ya hemos localizado la posicion, Centramos el mapa");
				$scope.map.center  = {
						  lat : position.coords.latitude,
						  lng : position.coords.longitude,
						  zoom : 12
						};
				
				console.log("Añadiendo markers");
				//marcadores = FurgoPerfectos.allMarkers();
				fps = FurgoPerfectos.all(Localizacion.localizacion);
				for (var i = 0; i < fps.length; i++) {
					console.log("Añadiendo marker "+fps[i].id+" "+fps[i].nombre+" en "+fps[i].lat+ " "+fps[i].lng);
                    console.log("Icono "+FurgoPerfectos.icons[parseInt(fps[i].icono)]);
                    var markerHTML =
                    '<div class="mapaFurgoperfectoSpot">' +
                        '<h3>' +
                            '<a target="_blank" href="' + fps[i].link + '">' + fps[i].nombre + '</a>' +
                        '</h3>' +
                        '<a target="_blank" href="' + fps[i].link + '">' +
                            '<img src="' + fps[i].imagen + '">' +
                        '</a>' +
                        '<br>' +
                        'A&ntilde;adido por ' + fps[i].autor;
					$scope.map.markers[i]={
                        //~ layer : "furgoperfectos",
						lng: parseFloat(fps[i].lat),
						lat: parseFloat(fps[i].lng),
						focus: true,
						title: fps[i].nombre,
                        message: markerHTML,
                        icon: { 'iconUrl': FurgoPerfectos.icons[parseInt(fps[i].icono)] },

					};
                    
				};
				//~ console.log("Son "+marcadores.lenght);
				//~ $scope.map.markers = marcadores;

          }, function(err) {
            // error
            console.log("Location error!");
            console.log(err);
          });
  });
  //$scope.fps = FurgoPerfectos.all();
})

.controller('DetalleCtrl', function($scope, $stateParams, FurgoPerfectos) {
    $scope.fp = FurgoPerfectos.getFp($stateParams.fpId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
