document.addEventListener('click',  (event) => {
    const type = event.target.dataset.type

    const saveBtn = event.target.closest('div').querySelector('[data-type=save]');
    const cancelBtn = event.target.closest('div').querySelector('[data-type=cancel]');
    const editBtn = event.target.closest('div').querySelector('[data-type=edit]');
    const removeBtn = event.target.closest('div').querySelector('[data-type=remove]');
    const title = event.target.closest('li').querySelector('[data-type=title]');
    const titleInput = event.target.closest('li').querySelector('[data-type=title-input]');

    if (type === 'remove') {
        const id = event.target.dataset.id
        remove(id).then(() => {
            event.target.closest('li').remove()
        })
    }
    else if (type === 'edit') {
        toogleEdit()
        const titleValue = title.textContent
        titleInput.value = titleValue.trim()
        titleInput.focus()
    } else if (type === 'save') {
        toogleEdit()
        const id = event.target.dataset.id
        const newTitle = titleInput.value.trim()
        if (newTitle) {
            edit(id, newTitle).then(() => {
                event.target.closest('li')
                    .querySelector('[data-type=title]').textContent = newTitle
            })
        }

    } else if (type === 'cancel') {
        toogleEdit()
    }

    function toogleEdit() {
        saveBtn.classList.toggle('d-none')
        cancelBtn.classList.toggle('d-none')
        editBtn.classList.toggle('d-none')
        removeBtn.classList.toggle('d-none')
        title.classList.toggle('d-none')
        titleInput.classList.toggle('d-none')
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