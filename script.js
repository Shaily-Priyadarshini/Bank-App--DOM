'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const displayMovements=function(movements,sorted){
  containerMovements.innerHTML='';
  const movs=sorted ? movements.slice().sort((a,b) => a-b) : movements;
  
  movs.forEach(function(mov,i){
    const type=mov>0?'deposit':'withdrawal';
    const html=`
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">
      ${i+1} ${type}
    </div>
    <div class="movements__value">${mov}</div>
  </div>`;
  containerMovements.insertAdjacentHTML('afterbegin',html);
  });
}
// displayMovements(account3.movements)
let balance;
const calcPrintBalance=function(movements){
  balance=movements.reduce((acc,mov)=>acc+mov,0);
  labelBalance.textContent=`${balance}€`;
};
// calcPrintBalance(account1.movements)
 
const inoutBalance=function(account){
  const inBalance=account.movements.filter(mov=>mov>0)
  .reduce((acc,mov)=>acc+mov,0);
  // console.log(inBalance)
  labelSumIn.textContent=`${inBalance}€`
  const outBalance=account.movements.filter(mov=>mov<0)
  .reduce((acc,mov)=>acc+mov,0);
  // console.log(outBalance)
  labelSumOut.textContent=`${Math.abs(outBalance)}€`;
  const intBalance=account.movements.filter(mov=>mov>0).map(mov=>mov*account.interestRate/100,).filter(mov=>mov>1).reduce((acc,mov)=>mov+acc,0)
  labelSumInterest.textContent=`${intBalance}€`
  // console.log(intBalance)
}
const updateUI=function(customerAccount){
  displayMovements(customerAccount.movements);
  inoutBalance(customerAccount);
  calcPrintBalance(customerAccount.movements);

}

let customerAccount;
btnLogin.addEventListener('click',function(e){
  e.preventDefault();
  customerAccount=accounts.find(acc=>acc.username===inputLoginUsername.value);

  if (customerAccount?.pin == Number(inputLoginPin.value)){
    containerApp.style.opacity=100;
    labelWelcome.textContent=`Welcome back ${customerAccount.owner.split(' ')[0]}`
    updateUI(customerAccount);
    inputLoginUsername.value='';
    inputLoginPin.value='';
    inputLoginPin.blur();
  }
})

btnClose.addEventListener('click',function(e){
  e.preventDefault();
  if (inputCloseUsername.value==customerAccount.username && Number(inputClosePin.value)==customerAccount.pin){
    const accIndex=accounts.findIndex(cur=>cur.username===customerAccount.username);
    // console.log(accIndex);
    accounts.splice(accIndex,1);
    inputCloseUsername.value='';
    inputClosePin.value='';
    containerApp.style.opacity=0;
    
  }
})

btnLoan.addEventListener('click',function(e){
  e.preventDefault();
  const amount=Number(inputLoanAmount.value);
  if (amount>0 && customerAccount.movements.some(mov=>amount*0.1<=mov)){
  customerAccount.movements.push(amount);
  updateUI(customerAccount);
  inputLoanAmount.value='';

}
})

btnTransfer.addEventListener('click',function(e){
  e.preventDefault();
  const transferAmount= Number(inputTransferAmount.value);
  const receiverAcc=accounts.find(acc=>acc.username==inputTransferTo.value);
  inputTransferAmount.value='';
  inputTransferTo.value=''
  if (transferAmount>0 && 
    receiverAcc &&
    receiverAcc?.username!==customerAccount.username &&
    transferAmount<= balance)
    {
    //negative push to movement
    customerAccount.movements.push(-transferAmount);

    //positive push to recipient
    receiverAcc.movements.push(transferAmount);
    //update ui
      updateUI(customerAccount);
    
  }
})
let sorted=false
btnSort.addEventListener('click',function(e){
  e.preventDefault();
  displayMovements(customerAccount.movements,!sorted);
  sorted=!sorted;

})
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const array=account1.owner; 
let collect='';
const splitstring=array.split(' ')
array.split(' ').map(function(ele){
  collect+=ele[0]
});



// const strings='Shaily Priyadarshini';
const createUserName=function(user){
  const usrname=user
  .toLowerCase()
  .split(' ')
  .map(word=>word[0])
  .join('');
  return usrname;
}
accounts.forEach(function(acc){
  acc.username=createUserName(acc.owner);
})


// console.log(createUserName('Shaily Priyadarshini'))
////////////////////////////////////////////////
