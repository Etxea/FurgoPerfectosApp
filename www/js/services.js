angular.module('starter.services', [])
// Might use a resource here that returns a JSON array
.factory('FurgoPerfectos', function($http) {
    console.log("Somos el service FurgoPerfectos");
    var fps = {}  ;
    $http.get("http://www.furgovw.org/api.php?latitude=43.3518161&longitude=-3.2072419").
            then(function(response) {
                console.log("Hemos recibido la respuesta de la API",response.status);
                console.log("hemos leido en el service "+response.data.length+" FPs");
                console.log("Los almacenamos");
                fps = response.data;
            
        }, function(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log("Error descargando los FPs");
            console.log(response.status);
        }
        );
  
    function all() {
        
        return fps
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
        fps: fps,
        all: all,
        getFp: getFp,
        };
});
