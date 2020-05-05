function atualizaDados(country) {
    $.ajax({
        url: "https://bigdata-api.fiocruz.br/numero/casos/pais/" + country.value,
        type: 'get',
        beforeSend: function () {
            $("#loader").html("Lendo dados...");
        }
    })
        .done(function (msg) {
            $("#loader").html("Dados da COVID-19 " + country.value);
            console.log(msg);
            $("#total_casos").html(msg.total_casos.toLocaleString('pt-BR'));
            $("#total_mortes").html(msg.total_mortes.toLocaleString('pt-BR'));
            var tempo = msg.detalhes_por_dia;
            var datas = [];
            var mortos = [];
            function preencheData(index) {
                datas.push(index.date);
            }
            function preencheMortos(index) {
                mortos.push(index.new_deaths);
            }

            tempo.forEach(preencheData);
            tempo.forEach(preencheMortos);

            var ctx = document.getElementById("myChart");
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: datas,

                    datasets: [
                        {
                            data: mortos,
                            label: "Mortos",
                            borderColor: "#3e95cd",
                            fill: false
                        }
                    ]
                }
            });

        })
        .fail(function (jqXHR, textStatus, msg) {
            $("#loader").html("Erro ao carregar os dados");
        });
}