export function handle(node) {

    node.addEventListener('dragstart', () => {
        node.classList.add('dragging')
    });

    node.addEventListener('dragend', () => {
        node.classList.remove('dragging')
    });
}

export function cont(node) {
    node.addEventListener('dragover', e => {
        e.preventDefault()
        const afterElem = drag(node, e.clientY);
        console.log(afterElem)
        const draggable = document.querySelector('.dragging');
        if (afterElem == null) {
            node.appendChild(draggable)
        } else {
            node.insertBefore(draggable, afterElem)
        }
    });


    function drag(node, y) {
        const draggableElem = [...node.querySelectorAll('.draggable:not(.dragging)')]

        draggableElem.reduce((closest, child) => {
            const box = child.getBoundingClientRect()
            const offset = y - box.top - box.height / 2
            if (offset < 0 && offset > closest.offset) {
                return {offset: offset, element: child}
            } else {
                return closest
            }
        }, { offset: Number.NEGATIVE_INFINITY })
    }

}

