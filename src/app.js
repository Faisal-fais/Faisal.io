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


Alpine.store('cart', {
    items: [],
    total: 0,
    quantity:0,
    add(newItem) {
        const cartItem = this.items.find((item) => item.id === newItem.id);
        if(!cartItem) {
            this.items.push({...newItem, quantity: 1, total: newItem.price});
            this.quantity++;
            this.total += newItem.price;
        } else {
            this.items = this.items.map((item) => {
                if (item.id !== newItem.id) {
                    return item;
                } else {
                    item.quantity++;
                    item.total = item.price * item.quantity;
                    this.quantity++;
                    this.total += item.price;
                    return item;
                }
            })
        }

        },
        remove(id) {
            const cartItem = this.items.find((item) => item.id === id);
            if(cartItem.quantity > 1){
                this.items = this.items.map((item) => {
                    if(item.id !== id) {
                        return item;
                    } else {
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= item.price;
                        return item;
                    }
                }) 
            } else if (cartItem.quantity === 1) {
                this.items = this.items.filter((item) => item.id !== id);
                this.quantity--;
                this.total -= cartItem.price;
            }
        }
        },
    )});

    // form validation
    const checkoutButton = document.querySelector('.checkout-button');
    checkoutButton.disabled = true;

    const form = document.querySelector('#checkoutForm');
    form.addEventListener('keyup', function(){
        for(let i = 0; i < form.elements.length; i++) {
            if(form.elements[i].value.length !== 0) {
                checkoutButton.classList.remove('disabled');
                checkoutButton.classList.add('disabled');
            } else {
                return false;
            }
        }
        checkoutButton.disabled = false;
        checkoutButton.classList.remove('disabled');
    })


    // kirim data ketika tombol diklik

    checkoutButton.addEventListener('click', function (e) {
        e.preventDefault();
        const formData = new FormData(form);
        const data = new URLSearchParams(formData);
        const objData = Object.fromEntries(data);
        const message = formatMessage(objData);
        console.log(objData);
        window.open('http://wa.me/6287791170309?text=' + encodeURIComponent(message));
    });

    // format pesan whatssapp
    const formatMessage = (obj) => {
        return ` Data Customer
            Nama: ${obj.name}
            Email: ${obj.email}
            No Hp: ${obj.phone}
    Data Pesanan
        ${JSON.parse(obj.items).map((item) => `${item.name} (${item.quantity} x ${rupiah(item.total)})\n`)}
    TOTAL: ${rupiah(obj.total)}
    Terima Kasih
    `
    }

// konversi ke rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits:0.
    }).format(number);
};