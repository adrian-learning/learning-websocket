import {emitirAutenticar} from './socket-front-login.js'

const form = document.getElementById('form-login')

form.addEventListener('submit',(event) => {
    event.preventDefault()

    const user = form['input-usuario'].value
    const pass = form['input-senha'].value

    emitirAutenticar({user, pass})
})

function clearForm(){
    form['input-usuario'].value = ''
    form['input-senha'].value = ''
}

export { clearForm }