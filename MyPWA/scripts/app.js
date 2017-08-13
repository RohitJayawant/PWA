if('serviceWorker' in navigator) {

    navigator.serviceWorker
    .register('./service-worker.js', {scope: './'})
    .then(function(registration){
        console.log('Service worker registered');
    })
    .catch(function(error){
        console.log('Service worker failed to register',error);
    })
}

var get = function(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var result = xhr.responseText
                result = JSON.parse(result);
                resolve(result);
            } else {
                reject(xhr);
            }
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
  }); 
};

get('https://newsapi.org/v1/articles?source=the-hindu&sortBy=top&apiKey=1ebfc6a70ead4f268a28a536239abaa0')
  .then(function(response) {
    document.getElementById('news').innerText = response["source"];
  })
  .catch(function(err) {
      get('./offline.json')
      .then(function(response){
           document.getElementById('news').innerText = response["source"];
      })
      //console.log("Error", err);
  })