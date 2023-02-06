
function definirCookie(key, value){
    document.cookie = `${key}=${value};path=/`
}

function obterCookie(key){
    return document.cookie.split('; ').find((cookie) => cookie.startsWith(`${key}=`))?.split('=')[1]
}

function removerCookie(key){
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00`
}

export { definirCookie, obterCookie, removerCookie }