const deleteText = document.querySelectorAll('.fa-trash')
const thumbText = document.querySelectorAll('.fa-thumbs-up')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteCharacter)
})

Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', addLike)
})

async function deleteCharacter(){
    const charName = this.parentNode.childNodes[1].innerText
    const clsName = this.parentNode.childNodes[3].innerText
    try{
        const res = await fetch('deleteCharacter', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'characterNameS': charName,
                'classNameS': clsName
            })
        })
        const data = await res.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function addLike(){
    const charName = this.parentNode.childNodes[1].innerText
    const clsName = this.parentNode.childNodes[3].innerText
    const tLikes = Number(this.parentNode.childNodes[5].innerText)
    try{
        const res = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'characterNameS': charName,
                'classNameS': clsName,
                'likesS': tLikes
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}