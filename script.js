let arrOfNambers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    arrOfOperators = ['+', '-','*', '/', '='],
    buttons = document.querySelector('.keyboard'),
    numbers = document.querySelectorAll('.number'),
    operations = document.querySelectorAll('.operator'),
    clearBtns = document.querySelectorAll('.clear-btn'),
    decimalBtn = document.getElementById('decimal'),
    result = document.getElementById('result'),
    display = document.getElementById('display'),
    MemoryCurrentNumber = 0,
    MemoryNewNumber = false,
    MemoryPendingOperation = '';


const numberPress = (number) => {
        if (MemoryNewNumber) {
            display.value = number;
            MemoryNewNumber = false;
        } else {
            if(display.value === '0') {
                display.value = number;
        } else {
            display.value += number;
        };
    };
};

const operationPress = (op) => {
    let localOperationMemory = display.value;
    
    if (MemoryNewNumber && MemoryPendingOperation !== '=') {
        display.value = MemoryCurrentNumber;
    } else {
        MemoryNewNumber = true;
        if (MemoryPendingOperation === '+') {
            MemoryCurrentNumber += Number(localOperationMemory);  
        } else if (MemoryPendingOperation === '-') {
            MemoryCurrentNumber -= Number(localOperationMemory);  
        } else if (MemoryPendingOperation === '*') {
            MemoryCurrentNumber *= Number(localOperationMemory);  
        } else if (MemoryPendingOperation === '/') {
            MemoryCurrentNumber /= Number(localOperationMemory);  
        } else {
            MemoryCurrentNumber = Number(localOperationMemory);  
        }
    display.value = MemoryCurrentNumber;
    MemoryPendingOperation = op;
    };        
};

const decimal = () => {
    let localDecimalMemory = display.value;
    
    if (MemoryNewNumber) {
        localDecimalMemory = '0.';
        MemoryNewNumber = false;
    } else {
        if (localDecimalMemory.indexOf('.') === -1) {
            localDecimalMemory += '.';
        };
    };
    display.value = localDecimalMemory;
};

const clear = (id) => {
    if (id === 'ce') {
        display.value = '0'
        MemoryNewNumber = true;
    } else if (id === 'c') {
        display.value = '0'; 
        MemoryNewNumber = true;
        MemoryCurrentNumber = 0;
        MemoryPendingOperation = '';
    }
};

buttons.addEventListener('click', function(event) {
    const content = event.target.innerText;
    if(!content) return;
    else if (arrOfNambers.some(item => item === content)) {
        numberPress(content);
    } else if 
        (arrOfOperators.some(item => item === content)) {
        operationPress(content);
    } else if 
        (content.tagName === 'c' || 'ce') {
        clear(content.toLowerCase());
    } else {        
        decimal(content);
    }
})
