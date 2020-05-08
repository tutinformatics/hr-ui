function drag() {
    const draggables = document.querySelectorAll(".draggable");
    const containers = document.querySelectorAll('.container');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging')
        });

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging')
        })
    });

    containers.forEach(container => {
        container.addEventListener('dragover', e => {
            e.preventDefault();
            const afterElem = getDragAfterElem(container, e.clientY);
            const draggable = document.querySelector('.dragging');
            if (afterElem == null) {
                container.appendChild(draggable)
            } else {
                container.insertBefore(draggable, afterElem)
            }
        })
    })
}

function getDragAfterElem(container, y) {
    const draggableElems = [...container.querySelectorAll('.draggable:not(.dragging)')];
    return draggableElems.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return {offset: offset, element: child};
        } else {
            return closest
        }
    }, {offset: Number.NEGATIVE_INFINITY}).element
}