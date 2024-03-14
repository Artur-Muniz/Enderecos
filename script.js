const cepBotao = document.getElementById('cepBotao')
const ruaBotao = document.getElementById('ruaBotao')
const conteudo = document.getElementById('conteudo')
const resposta = document.getElementById('resposta')

cepBotao.addEventListener('click', function(){
  conteudo.innerHTML = ''
  resposta.innerHTML = ''
  conteudo.innerHTML = 
    `<form>
      <input type="text" placeholder="CEP" name="cep" id="cep">
      <div id="botoes">
        <button type="submit" id="buscar">Buscar</button>
      </div>
    </form>`

  const buscar = document.getElementById('buscar')
  
  buscar.addEventListener('click', function(e){
    e.preventDefault()
    const cep = document.querySelector('#cep').value

    if(cep.length !== 0 & cep.length === 8){
      buscaCep(cep)
    }else{
      alert('CEP INVALIDO')
    }
  })
})

function buscaCep(cep){
  const url = `https://viacep.com.br/ws/${cep}/json/`
  const linkMaps = `https://www.google.com.br/maps/place/${cep}`


  
  fetch(url).then(response => 
    response.json()
  ).then(data => {

      resposta.innerHTML = 
        `
        <div class="card">
          <img class="bandeiras" src="https://raw.githubusercontent.com/bgeneto/bandeiras-br/master/imagens/${data.uf}.png">
          <div class="info">
            <p>CEP: ${data.cep}</p>
            <p>UF: ${data.uf}</p>
            <p>Cidade: ${data.localidade}</p>
            <p>Bairro: ${data.bairro}</p>
            <p>Rua: ${data.logradouro}</p>
            <div id="btnMaps">
              <button id="mapsBtn">Link para o mapa</button>
            </div>
          </div>
        </div>
        `

    const mapsBtn = document.getElementById('mapsBtn')

    mapsBtn.addEventListener('click', function(){
      window.open(linkMaps)
    })
    })

}

ruaBotao.addEventListener('click', function(){
  conteudo.innerHTML = ''
  resposta.innerHTML = ''
  conteudo.innerHTML = 
    `<form>
      <input type="text" placeholder="UF" name="Estado" id="uf" required>
      <input type="text" placeholder="Cidade" name="cidade" id="cidade" required>
      <input type="text" placeholder="Logradouro" name="rua" id="logradouro" required>
      <div id="botoes">
        <button type="submit" id="buscar">Buscar</button>
      </div>
    </form>`

  
  const buscar = document.getElementById('buscar')

  buscar.addEventListener('click', function(e){
    e.preventDefault()
    const uf = document.querySelector('#uf').value
    const cidade = document.querySelector('#cidade').value
    const logradouro = document.querySelector('#logradouro').value

    buscaRua(uf, cidade, logradouro)

    
  })
  
})

function buscaRua(uf, cidade, logradouro){
  
  const url = `https://viacep.com.br/ws/${uf}/${cidade}/${logradouro}/json/`
  
  fetch(url).then(response => 
    response.json()
  ).then(data => {
    if(data.length > 0){
      resposta.innerHTML = ''

      const listaEnderecos = document.createElement('ul')
      
      data.forEach(endereco => {
        const linkMaps = `https://www.google.com.br/maps/place/${endereco.cep}`

        const itemLista = document.createElement('li')
        
        itemLista.innerHTML = 
          `
          <div class="card">
            <img class="bandeiras" src="https://raw.githubusercontent.com/bgeneto/bandeiras-br/master/imagens/${endereco.uf}.png">
            <div class="info">
              <p>CEP: ${endereco.cep}</p>
              <p>UF: ${endereco.uf}</p>
              <p>Cidade: ${endereco.localidade}</p>
              <p>Bairro: ${endereco.bairro}</p>
              <p>Rua: ${endereco.logradouro}</p>
              <div id="btnMaps">
                <button><a href="${linkMaps}" target="_blank">Link para o mapa</a></button>
              </div>
            </div>
          </div>
          `

        listaEnderecos.appendChild(itemLista)
      })
      resposta.appendChild(listaEnderecos)
    }else{
      alert('Endereço não encontrado')
    }
         
})
}

