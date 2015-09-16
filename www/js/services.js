angular.module('starter.services', [])
.factory('Localizacion', function($cordovaGeolocation, FurgoPerfectos) {
    var localizacion = []
    console.log("Somos el servicio localización");
    $cordovaGeolocation.getCurrentPosition().
    then(function(position) {
        console.log("Posicion encontrada dentro del servicio Localizacion");
        localizacion.lat = position.coords.latitude;
        localizacion.lng = position.coords.longitude;
        FurgoPerfectos.refresh(position.coords.latitude,position.coords.longitude)
    });;
    return {
        localizacion: localizacion,
    };
})
// Might use a resource here that returns a JSON array
.factory('FurgoPerfectos', function($http) {
    console.log("Somos el service FurgoPerfectos");
    var fps = {}  ;
    var  fp_downloaded = 0;
    var status = "Descargando...";
    var icons = [
        'http://www.furgovw.org/mapa_imagenes/furgonetikaiconozo2.png',
        'http://www.furgovw.org/mapa_imagenes/balonrojodu6.png',
        'http://www.furgovw.org/mapa_imagenes/balonverdese8.png',
        '',
        'http://www.furgovw.org/mapa_imagenes/campingnh4.png',
        'http://www.furgovw.org/mapa_imagenes/centrocomercialdo4.jpg',
        'http://www.furgovw.org/mapa_imagenes/campingtp.jpg'
    ];
    function refresh (lat,lng) {
        $http.get("http://www.furgovw.org/api.php?latitude="+lat+"&longitude="+lng).
                then(function(response) {
                    console.log("Hemos recibido la respuesta de la API",response.status);
                    console.log("hemos leido en el service "+response.data.length+" FPs");
                    console.log("Los almacenamos");
                    fps = response.data;
                    fp_downloaded=response.data.length;
                    fp_download=1;
                
            }, function(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log("Error descargando los FPs");
                status="Error descargando los FPs";
                console.log(response.status);
            }
            );
    }
	function getStatus() {
		return status;
	}
    function all(localizacion) {        
        console.log("Vamos a buscar FPs cerca de "+localizacion.lat+","+localizacion.lng);
        return fps
    };
    function allMarkers() {
		markers = [];
		for (var i = 0; i < fps.length; i++) {
			console.log("Añadiendo marker "+fps[i].id+" en "+fps[i].lat+ " "+fps[i].lng);
			markers.push({
                lat: parseInt(fps[i].lat),
                lng: parseInt(fps[i].lng),
                focus: true,
                message: fps[i].nombre,
                
            })
			};
			return markers;
			
	};
    function getFp(fpId) {
          console.log("Vamos a buscar el fp "+fpId);
          
          //console.log(fps[fpId]);
          for (var i = 0; i < fps.length; i++) {
            console.log("Buscando si "+i+"con el id "+fps[i].id+" es el id "+fpId);
            if (parseInt(fps[i].id) === parseInt(fpId)) {
              return fps[i];
            }
          }
          return null;
    };
    
  return {
        refresh: refresh,
		getStatus: getStatus,
        fps: fps,
        all: all,
        allMarkers: allMarkers,
        getFp: getFp,
        icons: icons,
        };
});
