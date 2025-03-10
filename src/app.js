document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        items: [
            {id: 1, name: 'Robusta Brazil', img: '1.jpg', price: 20000},
            {id: 2, name: 'Arabica Blend', img: '2.jpg', price: 25000},
            {id: 3, name: 'Primo Passo', img: '3.jpg', price: 27000},
            {id: 4, name: 'Aceh Gayo', img: '4.jpg', price: 44000},
            {id: 5, name: 'Sumatera Madheling', img: '5.jpg', price: 27000},
],
}));
});