document.addEventListener('DOMContentLoaded', () => {
    
    function sanityCheck() {
        console.log('!Sanity check: all good!');
    }

    sanityCheck();

    const bookingForm = document.getElementById('bookingForm');
    const contactForm = document.getElementById('contactForm');

    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingFormSubmit);
    }
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
    function toggleAccordion(button) {
        const content = button.nextElementSibling; 
        const sign = button.querySelector('.sign'); 
        
        if (content.style.maxHeight) {
            
            content.style.maxHeight = null;
            sign.textContent = '+'; 
            button.classList.remove('active'); 
        } else {

            content.style.maxHeight = content.scrollHeight + 'px'; 
            sign.textContent = '-'; 
            button.classList.add('active'); 
        }
    }
        
    function handleBookingFormSubmit(event) {
        event.preventDefault();
        const data = new FormData(bookingForm);
        fetch('https://example.com/api/bookings', {
            method: 'POST',
            body: data
        })
        .then(response => response.json())
        .then(data => {
            console.log('Booking submitted:', data);
            alert('Your booking has been submitted successfully!');
        })
        .catch(error => {
            console.error('Error submitting booking:', error);
            alert('There was an error submitting your booking. Please try again.');
        });
    }

    function handleContactFormSubmit(event) {
        event.preventDefault();
        const data = new FormData(contactForm);
        fetch('https://example.com/api/messages', {
            method: 'POST',
            body: data
        })
        .then(response => response.json())
        .then(data => {
            console.log('Message submitted:', data);
            alert('Your message has been sent successfully!');
        })
        .catch(error => {
            console.error('Error sending message:', error);
            alert('There was an error sending your message. Please try again.');
        });
    }
});

function fetchCountryData() {
    const countryNameInput = document.getElementById('country-name-input').value.trim();
    if (!countryNameInput) {
        alert('Please enter a country name');
        return;
    }

    const countryApiUrl = `https://restcountries.com/v3.1/name/${countryNameInput.toLowerCase()}`; 

    fetch(countryApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const country = data[0];
            const countryName = country.name.common;
            const capitalCity = country.capital[0];
            const population = country.population;

            document.getElementById('country-name').textContent = countryName;
            document.getElementById('capital-city').textContent = capitalCity;
            document.getElementById('population').textContent = population;
        })
        .catch(error => {
            console.error('Error fetching country data:', error);
            const errorMessage = 'Error loading data. Please try again later.';
            document.getElementById('country-name').textContent = errorMessage;
            document.getElementById('capital-city').textContent = errorMessage;
            document.getElementById('population').textContent = errorMessage;
        });
}