document.addEventListener('DOMContentLoaded', () => {
    const dayInput = document.getElementById('day');
    const monthInput = document.getElementById('month');
    const yearInput = document.getElementById('year');
    const dayResult = document.getElementById('DD');
    const monthResult = document.getElementById('MM');
    const yearResult = document.getElementById('YY');
    const form = document.querySelector('form');

    form.addEventListener('submit', handleSubmit);

    function validate() {
        let isValid = true;
        const inputs = document.querySelectorAll('input');
        
        inputs.forEach((input) => {
            const parent = input.parentElement;
            const small = parent.querySelector('small');
            input.style.borderColor = "";

            if (!input.value) {
                input.style.borderColor = "red";
                small.innerText = "This field is required";
                isValid = false;
            } else {
                small.innerText = "";
            }
        });

        const day = parseInt(dayInput.value, 10);
        const month = parseInt(monthInput.value, 10);
        const year = parseInt(yearInput.value, 10);
        
        if (month < 1 || month > 12) {
            monthInput.style.borderColor = "red";
            monthInput.parentElement.querySelector('small').innerText = "Must be a valid month";
            isValid = false;
        } else {
            monthInput.parentElement.querySelector('small').innerText = "";
        }

        if (day < 1 || day > getDaysInMonth(month, year)) {
            dayInput.style.borderColor = "red";
            dayInput.parentElement.querySelector('small').innerText = "Must be a valid day";
            isValid = false;
        } else {
            dayInput.parentElement.querySelector('small').innerText = "";
        }

        return isValid;
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        if (validate()) {
            const today = new Date();
            const currentDay = today.getDate();
            const currentMonth = today.getMonth() + 1;
            const currentYear = today.getFullYear();

            let inputDay = parseInt(dayInput.value, 10);
            let inputMonth = parseInt(monthInput.value, 10);
            let inputYear = parseInt(yearInput.value, 10);

            if (inputDay > currentDay) {
                inputDay -= getDaysInMonth(currentMonth - 1, currentYear);
                inputMonth++;
            }

            if (inputMonth > currentMonth) {
                inputMonth -= 12;
                inputYear++;
            }

            const dayDifference = currentDay - inputDay;
            const monthDifference = currentMonth - inputMonth;
            const yearDifference = currentYear - inputYear;

            dayResult.textContent = dayDifference;
            monthResult.textContent = monthDifference;
            yearResult.textContent = yearDifference;
        }
    }

    function getDaysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }
});
