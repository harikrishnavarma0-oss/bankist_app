//data 
const storedAccounts = JSON.parse(localStorage.getItem("accounts"));


const account1 = {
  owner: "Earner",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300,300],
  intrestRate: 1.2,
  pin: 1111,
};
const account2 = {
  owner: "Sathwika reddy",
  movements: [700, 550, -450, 7000,],
  intrestRate: 1.2,
  pin: 2222,
};
const account3 = {
  owner: "ManiKanta",
  movements: [300, 650, -850, 6000, -650,],
  intrestRate: 1.2,
  pin: 3333,
};
const account4 = {
  owner: "Mythli reddy",
  movements: [700,900,100,-400,300],
  intrestRate: 1.2,
  pin: 4444,
};

const accounts = [account1,account2,account3,account4];
//elements

const labelWelcome = document.querySelector('.welcome-a');
const labelDate = document.querySelector('.date');
const lableCurrentBalance= document.querySelector(".current-balance-value");
const labelSummaryValueIn = document.querySelector('.summary__value--in');
const labelSummaryValueOut= document.querySelector(".summary__value--out");
const labelSummaryInterest = document.querySelector(".summary__value--interest");
const labelSummarySort = document.querySelector( ".summary__value--sort");


const ContainerApp = document.querySelector('.app');
const ContainerMovements = document.querySelector('.movemnts__section');
const testdata = document.querySelector('.test-data')
const loginPortal = document.querySelector(".c");


const btnTransfer = document.querySelector('.form__btn--transfer')
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnLogin = document.querySelector('.login__btn');
const btnlogout = document.querySelector('.logout')
const inputLogin = document.querySelector('.login__input--user');
const inputLoginpin = document.querySelector('.login__input--pin');
const inputLoginUser = document.querySelector('.login__input--user')

const inputAmount = document.querySelector('.form__input--amount')
const inputTo = document.querySelector('.form__input--to');

const inputLoan = document.querySelector(".form__input--loan");
const inputCloseUser = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


//movemnets
const displayMovements = function (movements , sort=false) {
  ContainerMovements.innerHTML = ""; // clear old rows
const movs = sort ?  movements.slice().sort((a,b) => a-b) : movements

  movs.forEach((mov, i) => {
    // Match the HTML spelling
    const type = mov > 0 ? "deposite" : "withdrawl";

    const html = `
      <div class="movemnts__row">
        <div class="movemnts__row__${type}">${i + 1} ${type}</div>
        <div class="movemnts__date">${now1}/${now2}/${now3}</div>
        <div class="movemnts__${type}">${mov}₹</div>
      </div>
    `;

    ContainerMovements.insertAdjacentHTML("afterbegin", html);
  });
};


//fixing date
const now = new Date()
const now1  = `${now.getDate ()}`.padStart(2,0);
const now2 = `${now.getMonth() +1}`.padStart(2,0);
const now3 = now.getFullYear();
const now4 = now.getHours();
const now5 = now.getMinutes();

labelDate.textContent = `${now1}/${now2}/${now3},${now4}:${now5}`



//current balance 
const CalcDisplayBalance = function (acc) {
  acc.currentBalance = acc.movements.reduce((sum, mov) => sum + mov, 0);
  lableCurrentBalance.textContent = `${acc.currentBalance}₹`;
};

//update ui
const UpdateUI = function (acc){
  //display movements
  displayMovements(acc.movements);
  //display balance
  CalcDisplayBalance(acc);

  //display summery
  CalcDisplaySummery(acc);
}

//test

const createUserName = function(accs){
  accs.forEach(function(accs){

    accs.userName = accs.owner.toLowerCase().split(" ").map(function (mov) {
      return mov[0];
    }).join("");

  });
};
createUserName(accounts)

//in
const CalcDisplaySummery = function(acc){
const inBalance =acc.movements.filter(mov => mov >0 )
.reduce((acc,mov) => acc + mov,0 )
labelSummaryValueIn.textContent = `${inBalance}₹ `;



  const inBalance1 = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSummaryValueOut.textContent = `${Math.abs(inBalance1)}₹ `;




 
  const inBalance2 =acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.intrestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, mov) => acc + mov, 0);
   
  labelSummaryInterest.textContent = `${ Math.round(inBalance2)}₹`;

};



//login functionality
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.userName === inputLoginUser.value
  );

  if (currentAccount?.pin === Number(inputLoginpin.value)) {
    console.log("login");

    labelWelcome.textContent = `Welcome back, ${currentAccount.owner}`;
    ContainerApp.style.opacity = 100;
    testdata.style.opacity = 0;
    loginPortal.style.opacity = 0;
    labelWelcome.style.opacity = 1;
    btnlogout.style.opacity = 1;
    labelSummarySort.style.opacity = 1;
UpdateUI(currentAccount)
  
  
  } else {
   alert("Invalid credentials. Please try again.");

  }
});

//logout functionality
btnlogout.addEventListener("click", function (e) {
  e.preventDefault();
ContainerApp.style.opacity = 0;
testdata.style.opacity = 1;
loginPortal.style.opacity = 1;
labelWelcome.style.opacity = 0;
btnlogout.style.opacity = 0;
labelSummarySort.style.opacity= 0;
});

//transfer amount functionallity
btnTransfer.addEventListener('click',function(e){
e.preventDefault();
const amount =Number(inputAmount.value)
const receiverAccount = accounts.find((acc) => acc.userName === inputTo.value)
if( amount > 0 && amount <= currentAccount.currentBalance && receiverAccount?.userName !== currentAccount.userName ){
  currentAccount.movements.push(-amount);
  receiverAccount.movements.push(amount);
  // Update UI
  UpdateUI(currentAccount);

  //Save to localStorage so it persists
     localStorage.setItem("accounts", JSON.stringify(accounts));
}
 inputAmount.value = inputTo.value = "";
});

//loan
btnLoan.addEventListener('click',function(e){
e.preventDefault();
const amount = Math.floor(inputLoan.value);

if ( amount>0 && currentAccount.movements.some(mov => mov >= amount * 0.1 )){
    currentAccount.movements.push(amount);
     UpdateUI(currentAccount);
}
else{
  alert("You are not eligible for this loan amount.");

}
})

//closing account
btnClose.addEventListener('click',function (e){
e.preventDefault();

if( currentAccount.userName === inputCloseUser.value && currentAccount.pin === Number(inputClosePin.value)){

  const index = accounts.findIndex(acc =>acc.userName === currentAccount.userName)

//delete
accounts.splice(index,1);
//hide ui

ContainerApp.style.opacity = 0;
testdata.style.opacity = 1;
loginPortal.style.opacity = 1;
labelWelcome.style.opacity = 0;
btnlogout.style.opacity = 0;
labelSummarySort.style.opacity = 1;
labelSummarySort.style.opacity = 0;

}
else{
  alert(`invaild creditnals`)
}
inputCloseUser.value = inputClosePin.value ='';
})
let sorted;
labelSummarySort.addEventListener('click',function(e){

e.preventDefault()
displayMovements(currentAccount.movements, !sorted)
sorted = !sorted

});

const x = account1.movements

const groupMovemnts = Object.groupBy(x , acc=> acc>0 ? "deposite" : "withdrawls")


const active = Object.groupBy(accounts, acc=> {
  const movementscount = acc.movements.length;

  if(movementscount >7) return "Very Active";
    if (movementscount > 3) return " Active";
      if (movementscount > 0) return "less Active";
      if(movementscount === 0)return "inactive";
})

//create date
const new1 = new Date()
console.log(new1)