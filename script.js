const amount = document.getElementById('amount');
const tipButtons = document.querySelectorAll('.btn[data-tip]');
const customTip = document.getElementById('customTip');
const noOfPeople = document.getElementById('person');
const generateBill = document.getElementById('generate-bill');
const tipValue = document.querySelector('.tipValue');
const totalValue = document.querySelector('.totalValue');
const eachPersonBill = document.querySelector('.bill');
const resetBtn = document.getElementById('reset');

let billValue = 0;

function updateButtonState() {
    const isValidInput = billValue > 0 && noOfPeople.value > 0;

    generateBill.disabled = !isValidInput;

    tipButtons.forEach((btn) => {
        btn.disabled = !isValidInput;
        btn.classList.toggle('true', isValidInput);
        if (isValidInput) btn.addEventListener('click', handleTipSelection);
        else btn.removeEventListener('click', handleTipSelection);
        
        customTip.disabled = !isValidInput; 
        noOfPeople.disabled = !isValidInput; 
    });
}

function handleTipSelection(event) {
    const tipPercentage = parseFloat(event.target.dataset.tip);
    
    if (tipPercentage) {
        calculateBill(tipPercentage);
        highlightSelectedButton(event.target);
        customTip.value = '';
        customTip.disabled = true; // Disable custom tip when a button is selected
        return; 
    }
}

function highlightSelectedButton(selectedButton) {
   tipButtons.forEach(btn => btn.classList.remove('active'));
   selectedButton.classList.add('active');
}

function calculateBill(tipPercentage) {
   const peopleCount = parseInt(noOfPeople.value);
   const tipAmount = (billValue * tipPercentage) / 100;

   const totalAmount = billValue + tipAmount;

   tipValue.textContent = `Tip Amount: &#8377; ${tipAmount.toFixed(2)}`;
   totalValue.textContent = `Total Amount: &#8377; ${totalAmount.toFixed(2)}`;
   eachPersonBill.textContent = `Each Person's Bill: &#8377; ${(totalAmount / peopleCount).toFixed(2)}`;
}

function resetFields() {
   amount.value = '';
   noOfPeople.value = '1';
   customTip.value = '';
   tipValue.textContent = 'Tip Amount: &#8377; 0.00';
   totalValue.textContent = 'Total Amount: &#8377; 0.00';
   eachPersonBill.textContent = 'Each Person\'s Bill: &#8377; 0.00';

   billValue = 0;

   updateButtonState();
}

// Event Listeners
amount.addEventListener('input', (event) => {
   billValue = parseFloat(event.target.value) || 0; 
   updateButtonState();
});

noOfPeople.addEventListener('input', updateButtonState);

customTip.addEventListener('input', () => {
   const customTipPercentage = parseFloat(customTip.value) || 0;

   if (customTipPercentage > 0) calculateBill(customTipPercentage);
});

resetBtn.addEventListener('click', resetFields);

// ===============================================================================================

// const amount = document.getElementById('amount'); 
// const tipButton = document.querySelectorAll('.btn'); 
// const customTip = document.getElementById('customTip'); 
// const noOfPeople = document.getElementById('person'); 
// const generateBill = document.getElementById('generate-bill'); 
// const tipValue = document.querySelector('.tipValue'); 
// const totalValue = document.querySelector('.totalValue'); 
// const eachPersonBill = document.querySelector('.bill'); 
// const resetBtn = document.getElementById('reset'); 

// let billValue = 0;
// let tip = 0;
// let people = 0;

// function validateInput() {
//     if (billValue > 0 && tip > 0 && people > 0) {
//         generateBill.classList.add('active');
//         generateBill.disabled = false;
//         return true;
//     } else {
//         generateBill.classList.remove('active');
//         generateBill.disabled = true;
//         return false;
//     }
// }

// function validateBill() {
//     billValue = parseFloat(amount.value);
//     tipButton.forEach((btn) => {
//         if (billValue > 0) {
//             btn.classList.add('true');
//             btn.disabled = false;
//             customTip.disabled = false;
//             noOfPeople.disabled = false;
//         } else {
//             btn.classList.remove('true');
//             btn.disabled = true;
//             customTip.disabled = true;
//             noOfPeople.disabled = true;
//         }
//     });
// }

