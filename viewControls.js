function itemDragging(event) {

    event.preventDefault();
    const dragged = document.getElementById('cartItemList').querySelector('.dragging');

    const draggableInCart = [...document.querySelectorAll('#cartItemList .itemWarper:not(dragging)')];
    const itemHeight = draggableInCart[0].getBoundingClientRect().height;
    const clientY = event.clientY;

    const closest = draggableInCart.reduce((lastLowest, current)=>{
        // These are item centers on y
        let currentY = current.getBoundingClientRect().y + itemHeight/2;
        let lastY = lastLowest.getBoundingClientRect().y + itemHeight/2;

        if( Math.abs(currentY - clientY) < Math.abs(lastY - clientY)) return current;
        return lastLowest;

    }, draggableInCart[0]);

    console.log(closest)


    if( (closest.getBoundingClientRect().y + itemHeight/2) - clientY >= 0 ) {
        // if I'm above closest element
        document.getElementById('cartItemList').insertBefore(dragged, closest);
        // .cloneNode(true) dragged.remove();
    } else {
        // if I'm below closest element
        document.getElementById('cartItemList').insertBefore(dragged, closest.nextSibling);
    }
}



function toggleGridView() {

    console.log('hello')

    let toggleGrid = document.getElementById('toggleGridView');
        
    if( toggleGrid.getAttribute('class') === 'globalButton fas fa-th-large') {
        // If it is grid
        toggleGrid.classList.remove('fa-th-large');
        toggleGrid.classList.add('fa-bars');

        document.getElementById('shopItemList').classList.add('itemListFlex');
        
        document.querySelectorAll("#shopItemList .itemWarper .itemDescription").forEach(function (el){
            el.style.display = 'none';
        });
        document.querySelectorAll("#shopItemList .itemWarper").forEach(function (el){
            el.style.display = 'inline-block';
        });
    } else {
        // If it is list view set to grid
        toggleGrid.classList.remove('fa-bars');
        toggleGrid.classList.add('fa-th-large');

        document.getElementById('shopItemList').classList.remove('itemListFlex');
        
        document.querySelectorAll("#shopItemList .itemWarper .itemDescription").forEach(function (el){
            el.style.display = '';
        });
        document.querySelectorAll("#shopItemList .itemWarper").forEach(function (el){
            el.style.display = 'block';
        });
    }
}