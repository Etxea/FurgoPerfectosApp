angular.module('starter.services', [])
// Might use a resource here that returns a JSON array
.factory('FurgoPerfectos', function($http) {
  var fps = [] ;
  
  console.log("Somos el service FurgoPerfectos");
  
    
  return {
      
      all: function() {
        
        return $http.get("http://www.furgovw.org/api.php?getEverything=&withoutBody=").
            then(function(response) {
                console.log("Hemos recibido la respuesta de la API",response.status);
                return response.data;
            
        }, function(response,status) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log("Error descargando los FPs");
            console.log(response.status);
            console.log(status);
            return response.status;
        }
        );
        
  
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
