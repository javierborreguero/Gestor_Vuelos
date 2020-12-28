var xhttp = new XMLHttpRequest();
/* ----- LECTURA DE DATOS ----- */
xhttp.open("GET", "http://localhost/Javier/adat_vuelos/main/read_flight.php", true);
function readFlight() {
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("BIEEEN");
            //Contendor para pintar los datos de los vuelos
            var flightContainer = document.getElementById("showDataDiv");
            // Parso JSON para poder acceder a los datos del servidor y pintarlo en pantalla
            var readFlight = JSON.parse(this.responseText);
            var numberOfFlights = readFlight.numeroVuelos;
            var arrayOfFlight = readFlight.vuelos;
            flightContainer.innerHTML = "";
            // Bucle que permite mostrar los datos en um párrafo
            for (let index = 0; index < numberOfFlights; index++) {
/*                 var fligthCode = document.createTextNode(arrayOfFlight[index].codigo);
                var flightOrigin = document.createTextNode(arrayOfFlight[index].origen);
                var flightDestiny = document.createTextNode(arrayOfFlight[index].destino);
                var flightDate = document.createTextNode(arrayOfFlight[index].fecha);
                var flighttime = document.createTextNode(arrayOfFlight[index].hora);
                var flightTotalNumberOfPlaces = document.createTextNode(arrayOfFlight[index].plazas_totales);
                var flightNumberOfPlacesAvailable = document.createTextNode(arrayOfFlight[index].plazas_disponibles);
                var dataParagraph = document.createElement("p");
                dataParagraph.appendChild(fligthCode);
                dataParagraph.appendChild(flightOrigin);
                dataParagraph.appendChild(flightDestiny);
                dataParagraph.appendChild(flightDate);
                dataParagraph.appendChild(flighttime);
                dataParagraph.appendChild(flightTotalNumberOfPlaces);
                dataParagraph.appendChild(flightNumberOfPlacesAvailable);
                dataParagraph.setAttribute("class", "data");
                flightContainer.appendChild(dataParagraph); */
                console.log(arrayOfFlight[index].codigo);
                    var table = document.getElementById("tableContent");
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

           
    };
}
xhttp.onload = readFlight();
xhttp.send();
