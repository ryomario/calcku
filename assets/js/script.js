class Calculator {
    idElements = {};
    _dataProcess = [];
    _dataResult = '';
    _activeField = true;
    constructor(config={
        resultScreenId: 'result',
        processScreenId: 'process',
        btnCId: 'btn-c',
        btnDeleteId: 'btn-del',
        btnPercentId: 'btn-percnt',
        btnDivideId: 'btn-divide',
        btnTimesId: 'btn-times',
        btnMinusId: 'btn-minus',
        btnPlusId: 'btn-plus',
        btnPlusId: 'btn-plus',
        btnEqId: 'btn-equal',
        btnPointId: 'btn-point',
        btn0Id: 'btn-0',
        btn00Id: 'btn-00',
        btn1Id: 'btn-1',
        btn2Id: 'btn-2',
        btn3Id: 'btn-3',
        btn4Id: 'btn-4',
        btn5Id: 'btn-5',
        btn6Id: 'btn-6',
        btn7Id: 'btn-7',
        btn8Id: 'btn-8',
        btn9Id: 'btn-9',
    }){
        this.idElements['resultScreenId'] = config.resultScreenId;
        this.idElements['processScreenId'] = config.processScreenId;
        this.idElements['btnCId'] = config.btnCId;
        this.idElements['btnDeleteId'] = config.btnDeleteId;
        this.idElements['btnPercentId'] = config.btnPercentId;
        this.idElements['btnDivideId'] = config.btnDivideId;
        this.idElements['btnTimesId'] = config.btnTimesId;
        this.idElements['btnMinusId'] = config.btnMinusId;
        this.idElements['btnPlusId'] = config.btnPlusId;
        this.idElements['btnPlusId'] = config.btnPlusId;
        this.idElements['btnEqId'] = config.btnEqId;
        this.idElements['btnPointId'] = config.btnPointId;
        this.idElements['btn0Id'] = config.btn0Id;
        this.idElements['btn00Id'] = config.btn00Id;
        this.idElements['btn1Id'] = config.btn1Id;
        this.idElements['btn2Id'] = config.btn2Id;
        this.idElements['btn3Id'] = config.btn3Id;
        this.idElements['btn4Id'] = config.btn4Id;
        this.idElements['btn5Id'] = config.btn5Id;
        this.idElements['btn6Id'] = config.btn6Id;
        this.idElements['btn7Id'] = config.btn7Id;
        this.idElements['btn8Id'] = config.btn8Id;
        this.idElements['btn9Id'] = config.btn9Id;

        this.init();
    }
    init() {
        this.clear();

        this._preventFocus();
        this._initButtonHandle();
    }
    clear() {
        this._dataProcess = [];
        this._dataResult = '';

        this.show();
    }
    delete() {
        if (this._activeField){
            let lastProc = this._dataProcess.pop();
            if (!isNaN(lastProc)){
                let num = lastProc.toString();
                num = Number(num.substring(0,num.length - 1));

                if (num !== 0) this._dataProcess.push(num);
            }
        } else {
            this._dataProcess = [];
            if (this._dataResult !== '' && !isNaN(this._dataResult)){
                let num = this._dataResult.toString();
                num = Number(num.substring(0,num.length - 1));

                if (num !== 0){
                    this._dataProcess.push(num);
                    this._dataResult = '';
                }
            }
        }

        this.show();
    }
    calculate(arr = []) {
        if (arr.length == 0) return '';
        if (arr.length == 1 && !isNaN(arr[0])) return arr[0];

        let opFirst = arr.findIndex(val => val == '*' || val == '/');
        if (opFirst == -1) {
            opFirst = arr.findIndex(val => val == '-' || val == '+');
        }

        if (opFirst !== -1) {
            let num1 = arr[opFirst - 1];
            let op = arr[opFirst];
            let num2 = arr[opFirst + 1];
            
            if (num1 !== undefined && num2 !== undefined) {
                num1 = Number(num1);
                num2 = Number(num2);
                let result = 0;
                switch(op){
                    case '*': result = num1 * num2; break;
                    case '/': result = num1 / num2; break;
                    case '-': result = num1 - num2; break;
                    case '+': result = num1 + num2; break;
                    default: return 0;
                }
                return this.calculate(arr.slice(0,opFirst-1).concat(result).concat(arr.slice(opFirst+2,arr.length)));
            } else {
                if (num1 === undefined) return this.calculate(arr.slice(opFirst+1,arr.length));
                if (num2 === undefined) return this.calculate(arr.slice(0,opFirst));
            }
        }
    }
    show() {
        const screenRes = document.getElementById(this.idElements['resultScreenId']);
        const screenProc = document.getElementById(this.idElements['processScreenId']);
    
        screenProc.innerHTML = this._dataProcess.map(val => {
            if(!isNaN(val)){
                return new Intl.NumberFormat('id-ID',{style: 'decimal', maximumFractionDigits: 20}).format(val);
            }else {
                switch(val) {
                    case '/': return '&div;';
                    // case '%': return '&percnt;';
                    case '*': return '&times;';
                    case '-': return '&minus;';
                    case '+': return '&plus;';
                    default: return val;
                }
            }
        }).join('');

        this._dataResult = this.calculate(this._dataProcess.copyWithin());

        screenRes.innerText = '=' + new Intl.NumberFormat('id-ID',{style: 'decimal', maximumFractionDigits: 20}).format(this._dataResult);

        this._showActiveField();
    }
    _showActiveField(newActive) {
        const screenRes = document.getElementById(this.idElements['resultScreenId']);
        const screenProc = document.getElementById(this.idElements['processScreenId']);
    
        if(newActive !== undefined) this._activeField = newActive;

        if(this._activeField){
            screenProc.classList.add('active');
            screenRes.classList.remove('active');
        }else{
            screenProc.classList.remove('active');
            screenRes.classList.add('active');
        }
    }
    _initButtonHandle() {
        const btnC = document.getElementById(this.idElements['btnCId']);
        const btnDel = document.getElementById(this.idElements['btnDeleteId']);
        const btnEq = document.getElementById(this.idElements['btnEqId']);
        const btnPercent = document.getElementById(this.idElements['btnPercentId']);
        const numBtns = [
            {id: this.idElements['btn00Id'],num: '00'},
            {id: this.idElements['btn0Id'],num: '0'},
            {id: this.idElements['btn1Id'],num: '1'},
            {id: this.idElements['btn2Id'],num: '2'},
            {id: this.idElements['btn3Id'],num: '3'},
            {id: this.idElements['btn4Id'],num: '4'},
            {id: this.idElements['btn5Id'],num: '5'},
            {id: this.idElements['btn6Id'],num: '6'},
            {id: this.idElements['btn7Id'],num: '7'},
            {id: this.idElements['btn8Id'],num: '8'},
            {id: this.idElements['btn9Id'],num: '9'},
        ];
        const operandBtns = [
            // {id: this.idElements['btnPercentId'],operand: '%'},
            {id: this.idElements['btnDivideId'],operand: '/'},
            {id: this.idElements['btnTimesId'],operand: '*'},
            {id: this.idElements['btnMinusId'],operand: '-'},
            {id: this.idElements['btnPlusId'],operand: '+'},
        ];

        btnC.addEventListener('click',()=>{this.clear()});
        btnDel.addEventListener('click',()=>{this.delete()});
        btnEq.addEventListener('click',()=>{this._activeField = false; this.show()});
        btnPercent.addEventListener('click',()=>{this._handleClickButtonPercent()});

        numBtns.forEach(({id,num}) => {
            document.getElementById(id).addEventListener('click', () => {
                this._handleClickNumber(num);
            })
        })
        operandBtns.forEach(({id,operand}) => {
            document.getElementById(id).addEventListener('click', () => {
                this._handleClickOperand(operand);
            })
        })

    }
    _handleClickNumber(num='') {
        if(this._activeField){
            let lastProc = this._dataProcess.pop();
            if (!isNaN(lastProc)){
                lastProc = lastProc.toString().concat(num);
                this._dataProcess.push(lastProc);
            } else {
                if (lastProc !== undefined && lastProc !== ''){
                    this._dataProcess.push(lastProc);
                }
                this._dataProcess.push(num);
            }
        } else {
            this._activeField = true;
            this._dataProcess = [];
            this._dataResult = '';
            this._dataProcess.push(num);
        }

        this.show();
    }
    _handleClickOperand(oprand='') {
        if(this._activeField){
            let lastProc = this._dataProcess.pop();
            if (!isNaN(lastProc)){
                this._dataProcess.push(lastProc);
            }
            
            if (this._dataProcess.length > 0){
                if (oprand !== undefined && oprand !== ''){
                    this._dataProcess.push(oprand);
                }
            } else if (this._dataResult !== '' && !isNaN(this._dataResult)) {
                this._dataProcess.push(this._dataResult);
                if (oprand !== undefined && oprand !== ''){
                    this._dataProcess.push(oprand);
                }
            }
        } else {
            if (this._dataResult !== '' && !isNaN(this._dataResult)){
                this._activeField = true;
                this._dataProcess = [];
                this._dataProcess.push(this._dataResult);
                this._dataResult = '';
                if (oprand !== undefined && oprand !== ''){
                    this._dataProcess.push(oprand);
                }
            }
        }

        this.show();
    }
    _handleClickButtonPercent() {
        if (this._dataResult !== '' && !isNaN(this._dataResult)) {
            this._dataProcess = [this._dataResult,'/',100];

            this._dataResult = this._dataResult / 100;

            this.show();
        }
    }
    _preventFocus() {
        Object.values(this.idElements).forEach(id => {
            const el = document.getElementById(id);
            el.setAttribute('tabindex', '-1');
            el.addEventListener('focus', function(event){
                if (event.relatedTarget instanceof HTMLElement){
                    event.relatedTarget.focus();
                } else {
                    this.blur();
                }
            });
        });
    }
}


document.addEventListener('DOMContentLoaded',function(){
    const calc = new Calculator();
});