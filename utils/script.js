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
/* ----- INSERTAR DATOS ----- */
function openInsertForm() {
    document.getElementById("insertForm").style.display = "flex";
}
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
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            alert("La información ha sido añadida correctamente");
            location.reload();
        } 
    };

    var data = JSON.stringify(insertRequest);
    xhttp.send(data);
}
/* ----- BORRAR UN VUELO ----- */
function openDeleteForm() {
    document.getElementById("deleteForm").style.display = "flex";
}
function deleteOneFlight() {
    xhttp.open("POST", "http://localhost/Javier/adat_vuelos/main/delete_one_PHP.php", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    var code = document.getElementById("deleteFlightCode").value;
    var deleteFlight = { "codigo": code };
    var deleteRequest = { "peticion": "delete", "vuelo": deleteFlight };
    console.log(code);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("El vuelo ha sido eliminado");
            location.reload();
        }
    };

    var data = JSON.stringify(deleteRequest);
    xhttp.send(data);
}
/* ----- BORRAR TODOS LOS VUELOS ----- */
function deleteAllFlights() {
    xhttp.open("POST", "http://localhost/Javier/adat_vuelos/main/delete_all.php", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("La información ha sido eliminada correctamente");
            location.reload();
        }
    }
    xhttp.send();
}
/* ----- FILTRAR UN VUELO ----- */
function openFilterForm() {
    document.getElementById("filterForm").style.display = "flex";
}
function selectFlight() {
    xhttp.open("GET", "http://localhost/Javier/adat_vuelos/main/read_flight.php", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    var origin = document.getElementById("selectFlightOrigin").value;
    var destiny = document.getElementById("selectFlightDestiny").value;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var readFlight = JSON.parse(this.responseText);
            var numberOfFlights = readFlight.numeroVuelos;
            var arrayOfFlight = readFlight.vuelos;
            // Bucle que permite mostrar los datos en um párrafo
            for (let index = 0; index < numberOfFlights; index++) {
                if ((origin == arrayOfFlight[index].origen) && (destiny == arrayOfFlight[index].destino)) {
                    console.log("Has elegido el vuelo con origen " + arrayOfFlight[index].origen + " y destino " + arrayOfFlight[index].destino);
                    while (table.rows.length > 0) {
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
/* ----- ACTUALIZAR LOS DATOS DE UN VUELO ----- */
function openCodeToUpdate(){
   document.getElementById("codeToUpdateForm").style.display = "flex";
}
function openUpdateForm() {
     xhttp.open("GET", "http://localhost/Javier/adat_vuelos/main/read_flight.php", true);
     xhttp.setRequestHeader("Content-Type", "application/json");
    var code = document.getElementById("updateFlightCode").value;
     xhttp.onreadystatechange = function () {
         if (this.readyState == 4 && this.status == 200) {
             var readFlight = JSON.parse(this.responseText);
             var numberOfFlights = readFlight.numeroVuelos;
            var arrayOfFlight = readFlight.vuelos;
             for (let index = 0; index < numberOfFlights; index++) {
                 if ((code == arrayOfFlight[index].codigo)) {
                     document.getElementById("updateForm").style.display = "flex";
                 }
             }
         }
     }
     xhttp.send();
document.getElementById("codeToUpdateForm").style.display = "none";
document.getElementById("updateForm").style.display = "flex";
}
function updateFlight() {
    xhttp.open("POST", "http://localhost/Javier/adat_vuelos/main/update_flight_PHP.php", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader("Content-Type", "application/json");
    var code = document.getElementById("updateFlightCode").value;
    var origin = document.getElementById("flightOriginToUpdate").value;
    var destiny = document.getElementById("flightDestinyToUpdate").value;
    var date = document.getElementById("flightDateToUpdate").value;
    var time = document.getElementById("flightTimeToUpdate").value;
    var totalNumberPlaces = document.getElementById("flightTotalNumberPlacesToUpdate").value;
    var availablePlaces = document.getElementById("flightAvailablePlacesToUpdate").value;
    var updateFlight = {"codigo": code, "origen": origin, "destino": destiny, "fecha": date, "hora": time, "plazas_totales": totalNumberPlaces, "plazas_disponibles": availablePlaces };
    var updateRequest = { "peticion": "update", "vuelo": updateFlight };
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            alert("Datos actualizados");
            location.reload();
        }
    };

    var data = JSON.stringify(updateRequest);
    xhttp.send(data);
}
/* ----- CERRAR LOS DISTINTOS FURMULARIOS ----- */
function closeForm() {
    document.getElementById("insertForm").style.display = "none";
    document.getElementById("deleteForm").style.display = "none";
    document.getElementById("filterForm").style.display = "none";
    document.getElementById("updateForm").style.display = "none";
    document.getElementById("codeToUpdateForm").style.display = "none";

    
}