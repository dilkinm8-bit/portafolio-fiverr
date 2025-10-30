class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        
        switch (this.operation) {
            case 'add':
                computation = prev + current
                break
            case 'subtract':
                computation = prev - current
                break
            case 'multiply':
                computation = prev * current
                break
            case 'divide':
                computation = prev / current
                break
            default:
                return
        }
        // Redondeo para evitar errores de coma flotante de JS
        this.currentOperand = parseFloat(computation.toFixed(10)).toString() 
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay

        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            // Formato de número con separador de miles (ej: 1,000)
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = 
            this.getDisplayNumber(this.currentOperand)

        if (this.operation != null) {
            let symbol;
            // Traducir el nombre de la operación a un símbolo
            switch (this.operation) {
                case 'add': symbol = '+'; break;
                case 'subtract': symbol = '-'; break;
                case 'multiply': symbol = '×'; break;
                case 'divide': symbol = '÷'; break;
                default: symbol = '';
            }
            this.previousOperandTextElement.innerText = 
                `${this.getDisplayNumber(this.previousOperand)} ${symbol}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }

        // Si el valor actual está vacío, mostrar '0'
        if (this.currentOperand === '') {
            this.currentOperandTextElement.innerText = '0'
        }
    }
}

// ----------------------------------------------------
// Lógica de Eventos (Conexión entre HTML y JavaScript)
// ----------------------------------------------------

// Seleccionar todos los botones del DOM
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-operation="equals"]')
const deleteButton = document.querySelector('[data-operation="delete"]')
const allClearButton = document.querySelector('[data-operation="all-clear"]')
const previousOperandTextElement = document.getElementById('previous-operand')
const currentOperandTextElement = document.getElementById('current-operand')

// Inicializar la calculadora
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

// 1. Manejo de botones de NÚMERO
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

// 2. Manejo de botones de OPERACIÓN
operationButtons.forEach(button => {
    const operation = button.getAttribute('data-operation')

    if (operation === 'equals') {
        // El botón de igual se maneja por separado
        return 
    }
    if (operation === 'all-clear') {
        allClearButton.addEventListener('click', () => {
            calculator.clear()
            calculator.updateDisplay()
        })
        return
    }
    if (operation === 'delete') {
        deleteButton.addEventListener('click', () => {
            calculator.delete()
            calculator.updateDisplay()
        })
        return
    }

    // Lógica para +, -, *, /
    button.addEventListener('click', () => {
        calculator.chooseOperation(operation)
        calculator.updateDisplay()
    })
})

// 3. Manejo del botón IGUAL
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})