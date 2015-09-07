angular.module('starter.services', [])
// Might use a resource here that returns a JSON array
.factory('FurgoPerfectos', function($http) {
  var fps = [] ;
  
  
    
  return {
    all: function() {
        console.log("Vamos a bajarnos los FPs");
        $http.get("http://www.furgovw.org/api.php?getEverything=&withoutBody=").
            then(function(response) {
                console.log("Hemos recibido la respuesta",response.status);
                data = response.data;                
                fps = data;
                console.log("Los tenemos?");
                console.log(fps[0].nombre);
                return fps;
            }, function(response,status) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log("Error descargando los FPs");
                console.log(response);
                console.log(response.status);
                fps = [{"nombre":"error de conexion"}]
                return fps;
                
            });
            
    },
    get: function(fpId) {
      for (var i = 0; i < fps.length; i++) {
        if (fps[i].id === parseInt(fpId)) {
          return fps[i];
        }
      }
      return null;
    }
  };
});
