import {emitirCadastro} from './socket-front-cadastro.js'

const form = document.getElementById('form-cadastro')

form.addEventListener('submit',(event) => {
    event.preventDefault()

    const user = form['input-usuario'].value
    const pass = form['input-senha'].value

    emitirCadastro({user, pass})
})

function clearForm(){
    form['input-usuario'].value = ''
    form['input-senha'].value = ''
}

export { clearForm }