
// here we are doing check if we have anything in localstorage then add this to cart array
// we also have to check if user click multiple time on single product then only counter increASE RATHER THAN creating multiple instance of that product in local storage
// The Array. from() function is an inbuilt function in JavaScript which creates a new array instance from a given array. 
//In case of a string, every alphabet of the string is converted to an element of the new array instance and in case of integer values, 
//new array instance simple take the elements of the given array.

// set() ->it contains 
// ["sumit","amit","anil","anish"] 
//var set1 = new Set(["sumit","sumit","amit","anil","anish"]); 

// it contains 'f', 'o', 'd' 
//var set2 = new Set("fooooooood"); 

// it contains [10, 20, 30, 40] 
//var set3 = new Set([10, 20, 30, 30, 40, 40]); 

// it is an empty set 
//var set4 = new Set(); 

export const addItem = (item =[] , next ) => {
    let cart = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        cart.push({
            ...item,
            count: 1
        });

        // remove duplicates
        // build an Array from new Set and turn it back into array using Array.from
        // so that later we can re-map it
        // new set will only allow unique values in it
        // so pass the ids of each object/product
        // If the loop tries to add the same value again, it'll get ignored
        // ...with the array of ids we got on when first map() was used
        // run map() on it again and return the actual product from the cart

        cart = Array.from(new Set(cart.map(p => p._id))).map(id => {
            return cart.find(p => p._id === id);
        });

        localStorage.setItem('cart', JSON.stringify(cart));
        next();
    }
};

export const itemTotal = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart')).length;
        }
    }
    return 0;
};

export const getCart = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart'));
        }
    }
    return [];
};

export const updateItem = (productId, count) => {
    let cart = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        cart.map((product, i) => {
            if (product._id === productId) {
                cart[i].count = count;
            }
        });

        localStorage.setItem('cart', JSON.stringify(cart));
    }
};

export const removeItem = productId => {
    let cart = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        cart.map((product, i) => {
            if (product._id === productId) {
                cart.splice(i, 1);
            }
        });

        localStorage.setItem('cart', JSON.stringify(cart));
    }
    return cart;
};

export const emptyCart = next => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('cart');
        next();
    }
};