function collectCartDataForCheckOut() {
    const cartItems = [...document.querySelectorAll('#cartItemList .itemWarper')];
    let formData = new FormData();
    
    for(i=0; i < cartItems.length; i++){
        // We use name since there are no ids set
        
        itemName = cartItems[i].childNodes[0].childNodes[1].innerHTML;
        amount = cartItems[i].childNodes[0].childNodes[2].childNodes[1].value;

        formData.append(itemName, amount);
    }
    
    

    console.log('This should go to the server');
    for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }
}



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

    // Adding button resets value of amount field to 1
    const amount = clone.childNodes[0].childNodes[2].childNodes[1].value;
    cloneAddToCartChild.innerHTML += '<button class="removeFromCartList">Remove</button>';
    clone.childNodes[0].childNodes[2].childNodes[1].value = amount;


    cart.insertBefore(clone, firstChildOfCart);

    updateTotalPrice();
}