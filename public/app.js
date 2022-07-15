document.addEventListener('click',  (event) => {
    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id
        remove(id).then(() => {
            event.target.closest('li').remove()
        })
    } else if (event.target.dataset.type === 'edit') {
        const id = event.target.dataset.id
        const newTitle = prompt('Input new title')
        edit(id, newTitle).then(() => {
            event.target.closest('li').firstChild.textContent = newTitle
        })
    }
})

async function remove(id) {
    await fetch(`/${id}`, {
        method: 'DELETE'
    })
}

async function edit(id, title) {
    await fetch(`/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title })
    })
}