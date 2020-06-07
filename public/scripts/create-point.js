function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {
            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateUFs()

function getCitites(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    // quando o usuário selecionar outro estado e limpar as opções das cidades
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disable = true

    fetch(url)
        .then(res => res.json())
        .then(cities => {

            for (const city of cities) {
                // enviano na url o nome da cidade e do estado
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false
        })
}


document
// seleciona o seletor de nome uf
    .querySelector("select[name=uf]")
    // acionado quando tiver uma mudança
    .addEventListener("change", getCitites)


// Itens de coleta
// adicionando um ouvidor de eventos em cada item da lista
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {

    const itemLi = event.target

    // adicionar ou remover a classe, dependendo do estado
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    // console.log('ITEM ID: ', itemId)


    // verificar se existem itens selecionados, se sim
    // pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex(item => {
        // isso será true ou false
        const itemFound = item == itemId
        return itemFound
    })

    // se já estiver selecionado
    if (alreadySelected >= 0) {
        // tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        // se não estiver selecionado, adicionar a seleção
        // adicionar a seleção
        selectedItems.push(itemId)
    }

    // console.log('selectedItems: ', selectedItems)

    // atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems

}