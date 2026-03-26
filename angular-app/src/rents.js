// Initialize Rental Counter
let rentalList = JSON.parse(localStorage.getItem('rentalCart')) || [];
updateCounter();

function addToRental(name, img, price) {
    const item = {
        id: Date.now(),
        name: name,
        image: img,
        price: price
    };

    // Add to array
    rentalList.push(item);
    
    // Save to LocalStorage
    localStorage.setItem('rentalCart', JSON.stringify(rentalList));
    
    // UI Feedback
    updateCounter();
    showToast(`${name} added to your selection!`);
}

function updateCounter() {
    const counter = document.getElementById('rental-count');
    if(counter) {
        counter.innerText = rentalList.length;
    }
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.innerText = msg;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}