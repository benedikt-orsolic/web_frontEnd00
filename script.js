generateItems();

document.addEventListener('click', event=>{
    if( event.target.getAttribute('class') === 'itemAddToCartButton') {
        console.log( event.target.parentNode.parentNode.parentNode);
    };
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

