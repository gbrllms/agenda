var url = './controller/getCurrentSelected.php';


function getDate() {

    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);
    const id_received = urlParams.get("id")

    let form = new FormData()

    form.append('id', id_received)
    fetch(url, {
        method: 'POST', // or 'PUT'
        body: form
    }).then(res => res.json())
        .then(response => {

            const months = [
                "Enero",
                "Febrero",
                "Marzo",
                "Abril",
                "Mayo",
                "Junio",
                "Julio",
                "Agosto",
                "Septiembre",
                "Octubre",
                "Noviembre",
                "Diciembre",
            ];

            for (let i in response) {
                let fechaString = response[i].fecha.split(',')[1].trim()
                let fechaArr = fechaString.split(" ")

                var index = 0;
                for (let i in months) {
                    if (months[i].toUpperCase() === fechaArr[2].toUpperCase()) {
                        index = parseInt(i) + 1;
                    }
                }

                document.getElementById('inputLugar').value = response[i].lugar
                document.getElementById('inputDescripcion').value = response[i].descripcion
                document.getElementById('fecha_f').value = fechaArr[4] + '-' + 0 + index + '-' + fechaArr[0]
                document.getElementById('id_fecha').value = response[i].id
            }

        });
}

getDate()

document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();

    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    var fecha_Html = document.getElementById('fecha_f').value
    var fecha = new Date(fecha_Html)
    fecha.setDate(fecha.getDate() + 1)
    var sendFecha = document.getElementById('fecha')

    sendFecha.value = fecha.toLocaleDateString(undefined, options)

    // console.log(sendFecha.value)

    document.getElementById('form').submit()

})