const numberButtons = document.querySelectorAll('[data-number]');
      const operatorButtons = document.querySelectorAll('[data-operator]');
      const equalsButton = document.querySelector('[data-equals]');
      const deleteButton = document.querySelector('[data-delete]');
      const clearButton = document.querySelector('[data-clear]');

      const previousText = document.querySelector('[data-previous]');
      const currentText = document.querySelector('[data-current');

      class Calculator {
        constructor(previousText, currentText) {
          this.previousText = previousText.innerHTML;
          this.currentText = currentText.innerHTML;
        }
        operator;
        clear () {
          this.currentText = '';
          this.previousText = '';
          this.operator = undefined;
          this.display();
        }
        delete() {
          if (this.currentText === '') {
            return
          }
          this.currentText = this.currentText.toString().slice(0, -1)
          this.display()
        }
        addNumber(number) {
          //bunch of if statements creating rules
          if (this.currentText.length >= 15) {
            return
          }
          if (number === '0' && this.currentText === '0') {
            return
          }
          if (number === '.' && this.currentText === '') {
            return
          }
          if (number === '.' && this.currentText.includes('.')) {
            return
          }
          this.currentText = this.currentText + number
          this.display();
        }
        addOperator(operator) {
          //bunch of if statements creating rules
          if (this.operator !== '' && this.currentText === '') {
            return
          }
          if (this.operator !== '' && this.previousText !== '') {
            this.resultMath()
            return
          }
          this.operator = operator
          this.previousText = `${this.currentText} ${this.operator}`
          this.currentText = '';
          this.display();
        }
        resultMath() {
          //bunch of if statements creating rules
          if (this.previousText === '' || this.currentText === '') {
            return
          }
          const prev = parseFloat(this.previousText);
          const curr = parseFloat(this.currentText);
          let calc;
          if (curr === 0 && this.operator === '/') {
            currentText.innerHTML = `don't do that! :(`;
            return
          }
          if (isNaN(prev) && isNaN(curr)) {
            return
          }
          switch (this.operator) {
            case '+':
              calc = prev + curr;
              break;
            case '-':
              calc = prev - curr;
              break;
            case '*':
              calc = prev * curr;
              break;
            case '/':
              calc = prev / curr;
              break;
            default:
              return;
          }
          this.currentText = calc;
          this.previousText = '';
          this.display()
        }
        display() {
          currentText.innerHTML = this.currentText;
          previousText.innerHTML = this.previousText;
        }
      }
      const calculator = new Calculator(previousText, currentText);
      numberButtons.forEach((number) =>{
        number.addEventListener('click', () => {
          calculator.addNumber(number.innerHTML);
        })
      })
      operatorButtons.forEach((operator) =>{
        operator.addEventListener('click', () => {
          calculator.addOperator(operator.innerHTML);
        })
      })
      equalsButton.addEventListener('click', () => {
        calculator.resultMath();
      })
      clearButton.addEventListener('click', () => {
        calculator.clear();
      })
      deleteButton.addEventListener('click', () => {
        calculator.delete();
      })

      //to use keyboard on calculator
      document.body.addEventListener('keydown', (event) => {
        if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
          calculator.addOperator(event.key);
          return;
        } else if (event.key === '=' || event.key === 'Enter') {
          calculator.resultMath();
          return;
        } else if (event.key === 'Backspace') {
          calculator.delete();
          return;
        } else if (event.key === 'Delete') {
          calculator.clear();
          return;
        } else if (isNaN(event.key)) {
          return
        }
        calculator.addNumber(event.key)
      })

