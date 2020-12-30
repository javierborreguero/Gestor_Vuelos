/*----- CONTANTES A USAR */
var xhttp = new XMLHttpRequest();
var table = document.getElementById("tableContent");
/* ----- LECTURA DE DATOS ----- */
xhttp.open("GET", "http://localhost/Javier/adat_vuelos/main/read_flight.php", true);
xhttp.setRequestHeader("Content-Type", "application/json");
function readFlight() {
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //Contendor para pintar los datos de los vuelos
            var flightContainer = document.getElementById("showDataDiv");
            // Parso JSON para poder acceder a los datos del servidor y pintarlo en pantalla
            var readFlight = JSON.parse(this.responseText);
            var numberOfFlights = readFlight.numeroVuelos;
            var arrayOfFlight = readFlight.vuelos;
            flightContainer.innerHTML = "";
            // Bucle que permite mostrar los datos en um párrafo
            for (let index = 0; index < numberOfFlights; index++) {
                var row = table.insertRow(0);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);
                var cell6 = row.insertCell(5);
                var cell7 = row.insertCell(6);
               /* var cell8 = row.insertCell(7); */
                cell1.innerHTML = arrayOfFlight[index].codigo;
                cell2.innerHTML = arrayOfFlight[index].origen;
                cell3.innerHTML = arrayOfFlight[index].destino;
                cell4.innerHTML = arrayOfFlight[index].fecha;
                cell5.innerHTML = arrayOfFlight[index].hora;
                cell6.innerHTML = arrayOfFlight[index].plazas_totales;
                cell7.innerHTML = arrayOfFlight[index].plazas_disponibles; 
  
            }

        }


    };
}
xhttp.onload = readFlight();
xhttp.send();

function insertNewFlight() {
    xhttp.open("POST", "http://localhost/Javier/adat_vuelos/main/write_flight.php", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    var code = document.getElementById("flightCode").value;
    var origin = document.getElementById("flightOrigin").value;
    var destiny = document.getElementById("flightDestiny").value;
    var date = document.getElementById("flightDate").value;
    var time = document.getElementById("flightTime").value;
    var totalNumberPlaces = document.getElementById("flightTotalNumberPlaces").value;
    var availablePlaces = document.getElementById("flightAvailablePlaces").value;
    var insertFlight = { "codigo": code, "origen": origin, "destino": destiny, "fecha": date, "hora": time, "plazas_totales": totalNumberPlaces, "plazas_disponibles": availablePlaces };
    var insertRequest = { "peticion": "add", "vuelo": insertFlight };
    console.log(code);
    xhttp.onreadystatechange = function () {
         if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
              // Parso JSON para poder acceder a los datos del servidor y pintarlo en pantalla
            var readFlight = JSON.parse(this.responseText);
            var numberOfFlights = readFlight.numeroVuelos;
            var arrayOfFlight = readFlight.vuelos;
            // Bucle que permite mostrar los datos en um párrafo
            for (let index = 0; index < numberOfFlights; index++) {
                //Contendor para pintar los datos de los vuelos
                var flightContainer = document.getElementById("showDataDiv");
                readFlight();
            } 
        } 
    };

    var data = JSON.stringify(insertRequest);
    xhttp.send(data);
}
function deleteOneFlight() {
    xhttp.open("POST", "http://localhost/Javier/adat_vuelos/main/delete_one_PHP.php", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    var code = document.getElementById("deleteFlightCode").value;
    var deleteFlight = { "codigo": code};
    var deleteRequest = { "peticion": "delete", "vuelo": deleteFlight };
    console.log(code);
    xhttp.onreadystatechange = function () {
         if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        } 
    };

    var data = JSON.stringify(deleteRequest);
    xhttp.send(data);
}
function deleteAllFlights(){
    xhttp.open("POST", "http://localhost/Javier/adat_vuelos/main/delete_all.php", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    }
    xhttp.send();
}
function selectFlight(){
    xhttp.open("GET", "http://localhost/Javier/adat_vuelos/main/read_flight.php", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    var origin = document.getElementById("selectFlightOrigin").value;
    var destiny = document.getElementById("selectFlightDestiny").value;
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //console.log(this.responseText);
            var readFlight = JSON.parse(this.responseText);
            var numberOfFlights = readFlight.numeroVuelos;
            var arrayOfFlight = readFlight.vuelos;
            // Bucle que permite mostrar los datos en um párrafo
            for (let index = 0; index < numberOfFlights; index++) {
                if((origin == arrayOfFlight[index].origen) && (destiny == arrayOfFlight[index].destino)){
                    console.log("Has elegido el vuelo con origen " + arrayOfFlight[index].origen + " y destino " + arrayOfFlight[index].destino);
                    while(table.rows.length > 0) {
                        table.deleteRow(0);
                   } 
                   var row = table.insertRow(0);
                   var cell1 = row.insertCell(0);
                   var cell2 = row.insertCell(1);
                   var cell3 = row.insertCell(2);
                   var cell4 = row.insertCell(3);
                   var cell5 = row.insertCell(4);
                   var cell6 = row.insertCell(5);
                   var cell7 = row.insertCell(6);
                   cell1.innerHTML = arrayOfFlight[index].codigo;
                   cell2.innerHTML = arrayOfFlight[index].origen;
                   cell3.innerHTML = arrayOfFlight[index].destino;
                   cell4.innerHTML = arrayOfFlight[index].fecha;
                   cell5.innerHTML = arrayOfFlight[index].hora;
                   cell6.innerHTML = arrayOfFlight[index].plazas_totales;
                   cell7.innerHTML = arrayOfFlight[index].plazas_disponibles; 
                }
            }
        }
    }
    xhttp.send();
} 
