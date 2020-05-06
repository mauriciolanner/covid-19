function gera_cor() {
    var hexadecimais = '0123456789ABCDEF';
    var cor = '#';

    for (var i = 0; i < 6; i++) {
        cor += hexadecimais[Math.floor(Math.random() * 16)];
    }
    return cor;
}

function americaDados(pais) {
    var retorno
    $.ajax({
        url: "https://bigdata-api.fiocruz.br/numero/casos/pais/" + pais,
        async: false,
        success: function (dados) {
            //console.log(dados);
            var cor = gera_cor();
            var caixa = `
                        <div class="col-sm-3 card text-center">
                            <h3 style="color: `+ cor + `;">` + pais + `</h3>
                            <h6 id="total_casos">Total de mortos: <strong>`+ dados.total_mortes + `</strong></h6>
                        </div>
                        `;

            var tempo = dados.detalhes_por_dia;

            var datas = [];
            var mortos = [];
            var casos = [];

            function preencheData(index) {
                datas.push(index.date);
            }
            function preencheMortos(index) {
                mortos.push(index.new_deaths);
            }
            function preencheCasos(index) {
                casos.push(index.new_cases);
            }

            tempo.forEach(preencheData);
            tempo.forEach(preencheMortos);
            tempo.forEach(preencheCasos);

            retorno = {
                caixa: caixa,
                datas: datas,
                mortos: mortos,
                casos: casos,
                pais: pais,
                cor: cor,
            }

        }
    });
    return retorno;
}

//função de preencimento das variáveis
var vetorPaises = [
    'Argentina',
    'Bolívia',
    'Brasil',
    'Chile',
    'Colômbia',
    'Costa Rica',
    'Cuba', 'El Salvador',
    'Equador',
    'Guatemala',
    'Haiti',
    'Honduras',
    'México',
    'Nicarágua',
    'Panamá',
    'Paraguai',
    'Peru',
    'República Dominicana',
    'Uruguai',
    'Venezuela'];
var dados = [];
function preencheDadosPaises(pais) {
    var dadosPais = americaDados(pais);
    dados.push({
        caixa: dadosPais.caixa,
        date: dadosPais.datas,
        data: dadosPais.mortos,
        label: dadosPais.pais,
        borderColor: dadosPais.cor,
        fill: false
    })
}

function caixa(array) {
    document.getElementById("cartoes").innerHTML += array.caixa
}

vetorPaises.forEach(preencheDadosPaises);

dados.forEach(caixa)

//preenchimento da tabela
var ctx = document.getElementById("curvaMorte");
var curvaMorte = new Chart(ctx, {
    type: 'line',
    data: {
        labels: dados[0].date,
        datasets: dados
    }
});

new Chart(document.getElementById("bar-chart"), {
    type: 'bar',
    data: {
        labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
        datasets: [
            {
                label: "Morte por país",
                backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                data: [2478, 5267, 734, 784, 433]
            }
        ]
    },
    options: {
        legend: { display: false },
        title: {
            display: true,
            text: 'Predicted world population (millions) in 2050'
        }
    }
});



/*
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
            var casos = [];

            function preencheData(index) {
                datas.push(index.date);
            }
            function preencheMortos(index) {
                mortos.push(index.new_deaths);
            }
            function preencheCasos(index) {
                casos.push(index.new_cases);
            }

            tempo.forEach(preencheData);
            tempo.forEach(preencheMortos);
            tempo.forEach(preencheCasos);

            var ctx = document.getElementById("myChart");
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: datas,

                    datasets: [
                        {
                            data: mortos,
                            label: "Mortos",
                            borderColor: "#FF6347",
                            fill: false
                        },
                        {
                            data: casos,
                            label: "Novos Casos",
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
*/