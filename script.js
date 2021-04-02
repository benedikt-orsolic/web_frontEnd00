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
        toggleGridView();
    };

    if( event.target.getAttribute('id') === 'checkOut') {
        collectCartDataForCheckOut();
    };

});

document.getElementById('cartItemList').addEventListener('dragover', (event)=>{
    itemDragging(event);
});



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

