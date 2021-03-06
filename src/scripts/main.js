import { gsap } from "gsap";

console.log(gsap.version)

function rqr(alc, prix) {
    return (alc / prix) * 10
}

const list = document.querySelector('#results');
const search_field = document.querySelector("#search");
let biereTabl = []
let barsTabl = []
let valueBiere = []

fetch('scripts/bars.json')
.then(
    (response) => {
        console.log(response)
            response.json().then((bars) => {
                for (let i = 0; i < bars.length; i++) {
                    for (let y = 0; y < bars[i].bieres.length; y++) {
                        barsTabl.push([`${bars[i].name}`, `${bars[i].bieres[y].id}`, `${bars[i].bieres[y].prix}`]);
                      };
                };

                fetchBiere();

            });
    },
    (response) => {
        console.error("erreur")
    }
)

function fetchBiere() {

    fetch('scripts/biere.json')
    .then(
        (response) => {
            console.log(response);
                response.json().then((binouses) => {
                    var bieres = binouses.biere

                    for (let binouse of bieres) {
                        biereTabl.push([`${binouse.id}`, `${binouse.name}`, `${binouse.type}`, `${binouse.alcool}`]);
                    }

                    for(let j = 0; j < biereTabl.length; j++){
                            let currentId = biereTabl[j][0]
                            let currentName = biereTabl[j][1]
                            let currentType = biereTabl[j][2]
                            let currentAlcool = biereTabl[j][3]

                            for (let g = 0; g < barsTabl.length; g++){
                                if (barsTabl[g][1] == currentId){
                                    let currentBarName = barsTabl[g][0]
                                    let currentPrice = barsTabl[g][2]
                                    let currentRQR = rqr(currentAlcool, currentPrice)

                                    valueBiere.push(
                                        { name: currentName, type: currentType, alcool: currentAlcool, barName: currentBarName, prix: currentPrice, rqr: currentRQR.toFixed(1)}
                                    )

                                }
                            }
                    }

                    list.innerHTML = '';

                    valueBiere.sort(function (a, b){
                        return b.rqr - a.rqr
                    });
                    for (let k = 0; k < valueBiere.length; k++){
                        addResults(valueBiere[k]);
                    } 


                    search_field.addEventListener('input', (e) => {
                        let search_value = e.currentTarget.value
                        valueBiere = []

                        if(search_value.length > 1){
                            for(let j = 0; j < biereTabl.length; j++){
                                if (biereTabl[j][1].toLowerCase().includes(search_value.toLowerCase())){
                                    let currentId = biereTabl[j][0]
                                    let currentName = biereTabl[j][1]
                                    let currentType = biereTabl[j][2]
                                    let currentAlcool = biereTabl[j][3]

                                    for (let g = 0; g < barsTabl.length; g++){
                                        if (barsTabl[g][1] == currentId){
                                            let currentBarName = barsTabl[g][0]
                                            let currentPrice = barsTabl[g][2]
                                            let currentRQR = rqr(currentAlcool, currentPrice)

                                            valueBiere.push(
                                                { name: currentName, type: currentType, alcool: currentAlcool, barName: currentBarName, prix: currentPrice, rqr: currentRQR.toFixed(1)}
                                            )
                                        }
                                    }
                                }
                            }
                        }

                        if (search_value.length < 1){
                            for(let j = 0; j < biereTabl.length; j++){
                                let currentId = biereTabl[j][0]
                                let currentName = biereTabl[j][1]
                                let currentType = biereTabl[j][2]
                                let currentAlcool = biereTabl[j][3]
    
                                for (let g = 0; g < barsTabl.length; g++){
                                    if (barsTabl[g][1] == currentId){
                                        let currentBarName = barsTabl[g][0]
                                        let currentPrice = barsTabl[g][2]
                                        let currentRQR = rqr(currentAlcool, currentPrice)
                                        valueBiere.push(
                                            { name: currentName, type: currentType, alcool: currentAlcool, barName: currentBarName, prix: currentPrice, rqr: currentRQR.toFixed(1)}
                                        )
                                    }
                                }
                            }
                        }

                        list.innerHTML = '';

                        valueBiere.sort(function (a, b){
                            return b.rqr - a.rqr
                        });
                        for (let k = 0; k < valueBiere.length; k++){
                            addResults(valueBiere[k]);
                        } 
                    });


                })
        },
        (response) => {
            console.error("erreur");
        }
    )

}



function addResults(biere) {
    let result_el = document.createElement('li');
    result_el.innerHTML = `<b>${biere.name}</b> - ${biere.type} - ${biere.alcool} - ${biere.barName} - ${biere.prix} - <b>${biere.rqr}</b>`;
    list.append(result_el)
}

