const departamento_json = document.querySelector('.departamento');
$(function() {
    $('.btn').click(function() {
        const id_button = this.id;
        var confirm = false;
        var index = 0;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var response = JSON.parse(xhttp.responseText);
                var casosCorona = response.Departamentos;
                for (var i = 0; i < casosCorona.length; i++) {
                    if (casosCorona[i].id == id_button) {
                        index = i;
                        confirm = true;
                        console.log(casosCorona[i].positivos);
                        break;
                    }
                }
                if (confirm) {
                    var { departamento, positivos, recuperados, fallecidos } = casosCorona[index];

                    $('#departamento').val(departamento);
                    $('#positivos').val(positivos);
                    $('#recuperados').val(recuperados);
                    $('#fallecidos').val(fallecidos);
                }
            }
        };
        xhttp.open("GET", "db.json", true);
        xhttp.send();
    });
});