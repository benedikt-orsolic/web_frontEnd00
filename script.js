generateItems();

document.addEventListener('click', event=>{
    

    if( event.target.getAttribute('class') === 'itemAddToCartButton') {
        addItemToCart(event.target.parentNode.parentNode.parentNode);
    };

    if( event.target.getAttribute('id') === 'openCartButton') {
        
        if( document.getElementById('cartItemList').style.display === 'block' ){
            document.getElementById('cartItemList').style.display = 'none';
        } else {
            document.getElementById('cartItemList').style.display = 'block';
        }
    };

    if( document.getElementById('cartItemList').contains(event.target) &&
        event.target.getAttribute('class') === 'itemAmountField') {
        // Triggered when user clicks on amount input in cart
        updateTotalPrice();
        //updateTotalPrice();
    }

    if( event.target.getAttribute('class') === 'removeFromCartList') {
        
        event.target.parentNode.parentNode.parentNode.remove();
        updateTotalPrice();
    };
    
    // Toggle grid view
    if( event.target.getAttribute('id') === 'toggleGridView') {
        
        let toggleGrid = document.getElementById('toggleGridView');
        
        if( toggleGrid.getAttribute('class') === 'fas fa-th-large') {
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
    };


});

document.getElementById('cartItemList').addEventListener('dragover', (event)=>{
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
});



function updateTotalPrice() {

    /* 
        This part would call server to update list in db,
        and potentially just return total price
    */
    const cartList = document.getElementById('cartItemList').childNodes;
    let totalPrice = 0;
    cartList.forEach( function(item) {
        let amount = parseInt(item.childNodes[0].childNodes[2].childNodes[1].value);
        let cost = parseInt(item.childNodes[0].childNodes[2].childNodes[2].innerHTML);

        if( typeof(amount) === 'number' && typeof(cost) === 'number' &&
            !isNaN(amount) && !isNaN(cost) ){
            
            totalPrice += amount * cost;
        }
    });

    document.getElementById('openCartButton').innerHTML = ' ' + totalPrice + ' $';
}



function addItemToCart(item) {
    const cart = document.getElementById('cartItemList');
    const firstChildOfCart = cart.childNodes[0];
    const clone = item.cloneNode(true);
    const cloneAddToCartChild = clone.childNodes[0].childNodes[2];

    // Set to block so when node cloned it is not 'inline-block' when in grid view
    clone.style.display = 'block';
    clone.setAttribute('draggable', 'true');
    
    clone.addEventListener('dragstart', ()=>{
        clone.classList.add('dragging');
    })
    clone.addEventListener('dragend', ()=>{
        clone.classList.remove('dragging');
    })

    cloneAddToCartChild.innerHTML += '<button class="removeFromCartList">Remove</button>';
    cart.insertBefore(clone, firstChildOfCart);

    updateTotalPrice();
}







// Generate shop Items







function generateItems() {
    let items = ['Apple', 'Orange', 'Pear', 'Grapes', 'Banana', 'Potatoes', 'Bread', 'Milk', 'Eggs', 'Yogurts', 'Fish', 'Steak', 'Hotdogs', 'Butter', 'Oil', 'Mayonnaise', 'Beer', 'Bear', 'Wine', 'Soda', 'Sparkling water', 'Salami', 'Marshmallow', 'Candy cotton', 'Candy sticks'];

    const itemList = document.getElementById('shopItemList');

    items.forEach(el=>{
        
        itemList.innerHTML += 
        '<li class="itemWarper">' +
            '<section class="itemBasicInfo">' +
                '<img class="itemThumbnail" src="" alt="">' +
                '<h6 class="itemName">' + el + '</h6>' +
                '<section class="itemAddToCart">' +
                    '<label>Amount</label>' +
                    '<input class="itemAmountField" type="number" value="1" max="999" min="0">' +
                    '<p class="itemPrice">' + String(getRandomInt(10, 150)) + ' $</p>' +
                    '<button class="itemAddToCartButton">Add to cart</button>' +
                '</section>' +
            '</section>' +
            '<section class="itemDescription">' +
                '<hr>' +
                '<p class="itemDescription">' +
                    'Some text about item' +
                '</p>' +
            '</section>' +
        '</li>';
    });


}
    


function getRandomInt(min, max) {
    return Math.floor(Math.random() * max + min);
}

