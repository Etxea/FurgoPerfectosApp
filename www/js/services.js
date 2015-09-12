angular.module('starter.services', [])
// Might use a resource here that returns a JSON array
.factory('FurgoPerfectos', function($http) {
    console.log("Somos el service FurgoPerfectos");
    var fps = {}  ;
    var  fp_downloaded = 0;
    var icons = [
        'http://www.furgovw.org/mapa_imagenes/furgonetikaiconozo2.png',
        'http://www.furgovw.org/mapa_imagenes/balonrojodu6.png',
        'http://www.furgovw.org/mapa_imagenes/balonverdese8.png',
        '',
        'http://www.furgovw.org/mapa_imagenes/campingnh4.png',
        'http://www.furgovw.org/mapa_imagenes/centrocomercialdo4.jpg',
        'http://www.furgovw.org/mapa_imagenes/campingtp.jpg'
    ];
    $http.get("http://www.furgovw.org/api.php?latitude=43.3518161&longitude=-3.2072419").
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
            console.log(response.status);
        }
        );
	function status() {
		return {"counter": fp_downloaded}
	}
    function all() {        
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
		status: status,
        fps: fps,
        all: all,
        allMarkers: allMarkers,
        getFp: getFp,
        icons: icons,
        };
});
