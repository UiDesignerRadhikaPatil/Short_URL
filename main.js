let link = document.getElementById('link')
let shortBtn = document.getElementById('short-btn')
let error = document.getElementById('error')
let output  = document.getElementById('output')
let footer = document.querySelector('.footer')
let expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi

link.onblur = () =>{
    if(link.value == ""){
        if(error.innerText == ""){
            link.style.marginBottom = "2rem"
            errorMsg = 'Please enter a link'
        let msg = document.createTextNode(errorMsg)
        error.appendChild(msg)
        }
        link.style.border = '2px solid var(--Red)'
    }else{
        error.innerText = ""
        link.style.marginBottom = "1rem"
        link.style.border= 'unset'
    }
}

shortBtn.onclick = () =>{
    if(link.value.match(expression)){
        fetch(`https://api.shrtco.de/v2/shorten?url=${link.value}`)
        .then(response => response.json())
        .then(async data =>{
            let html = `
            <div class="shorten-link">
            <p>${link.value}</p>
            <div class="result">
            <p id="shortenLink" data="${data.result.code}" class="shLink">${data.result.full_short_link}</p>
            <button id="copy-btn" data="${data.result.code}" class="not-copied copyButton">Copy</button>
          </div>
          </div>
            `
            output.innerHTML += html;
            link.value = "";
        })
    }else if(link.value == ""){
        link.style.marginBottom = "2rem"
        error.innerText = 'Please enter a link'
        link.style.border = '2px solid var(--Red)'
    }else{
        link.style.marginBottom = "2rem"
        error.innerText = 'Please etner a valid link'
        link.style.border = '2px solid var(--Red)'
    }
    
}

output.onclick = (e) =>{
    if(e.target.classList.contains('copyButton')){
        let links = document.querySelectorAll('#shortenLink')
        links.forEach(el =>{
            if(el.getAttribute('data') === e.target.getAttribute('data')){
                navigator.clipboard.writeText(el.innerText)  
                e.target.classList.remove('not-copied')
                e.target.classList.add('copied')
                e.target.innerText = "Copied!"
                setInterval(()=>{
                    e.target.classList.remove('copied')
                    e.target.classList.add('not-copied')
                    e.target.innerText = "Copy"
                }, 3000)
            }
        })
    }
}
footer.onclick = (e) =>{
    if(e.target.hasAttribute('href') || e.target.hasAttribute('name')){
        e.preventDefault()
    }
}
