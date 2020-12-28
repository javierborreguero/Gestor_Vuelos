var xhttp = new XMLHttpRequest();
/* ----- LECTURA DE DATOS ----- */
xhttp.open("GET", "http://localhost/Javier/adat_vuelos/main/read_flight.php", true);
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
                var table = document.getElementById("tableContent");
                var row = table.insertRow(0);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);
                var cell6 = row.insertCell(5);
                var cell7 = row.insertCell(6);
                var cell8 = row.insertCell(7);
                cell1.innerHTML = arrayOfFlight[index].id;
                cell2.innerHTML = arrayOfFlight[index].codigo;
                cell3.innerHTML = arrayOfFlight[index].origen;
                cell4.innerHTML = arrayOfFlight[index].destino;
                cell5.innerHTML = arrayOfFlight[index].fecha;
                cell6.innerHTML = arrayOfFlight[index].hora;
                cell7.innerHTML = arrayOfFlight[index].plazas_totales;
                cell8.innerHTML = arrayOfFlight[index].plazas_disponibles;

            }
        }


    };
}
xhttp.onload = readFlight();
xhttp.send();

function insertNewFlight() {
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
    var xhttp = new XMLHttpRequest();
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
                var flightContainer = document.getElementById("sh");
                readFlight();
            }
        }
    };
    xhttp.open("POST", "http://localhost/Javier/adat_vuelos/main/write_flight.php", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    var data = JSON.stringify(insertRequest);
    xhttp.send(data);
}
