import inquirer from "inquirer";
import chalk from "chalk";
import fs from'fs';
//Data Structure to store customer information

interface Customer{
    name:string;
    debitCardNumber:string;
    Pin:number;
    balance:number;
}
//to initialize an array to store customer data;

let customer: Customer[] = [];  

// for each customer data in the array;

let currentCustomer: Customer | undefined=undefined;
// function to save customers data into a json format
const saveCustomerData =(data: Customer[]):void=>{
    const jsonData= JSON.stringify(data,null,2);
    fs.writeFileSync('customerData.Json',jsonData,'utf8');
}

// function to create a new debit card number;

const generateRandOmDebitCardNumber = ()=>{
    const cardNumber =`4` + Array.from({length:15}, () => Math.floor(Math.random() *10)).join('');
return cardNumber;
    
}

// ATM Menu or functionalies
const atmMenu = async() =>{
    if(currentCustomer) {
        console.log(`Welcome, ${currentCustomer.name}`);
        console.log(`Debit Card Number:${currentCustomer.debitCardNumber}`);
        console.log(`Ballance:${currentCustomer.balance}`);
        const answer = await inquirer.prompt([{
            type:'list',
            name:'choice',
            message:'please select the option',
            choices:['Withdraw','Deposit Money','Check balance','exit']
        }])
    }
}
//console.log(generateRandOmDebitCardNumber());

// function to open a new account;

const openAccount =async () =>{
console.log(chalk.green(`Welcome to the ATM`))
const answer = await inquirer.prompt([{
    type:'input',
    name:'name',
    message:'Enter your name:',
    validate:(input)=>{
        // check if the name is already exist in customers
        const existingCustomer= customer.find((c)=>c.name === input);
        if(existingCustomer){
            return 'The customer with this name is already exists,please choose another name.';
        }
        return true
    }
    
},
{
    type:'input',
    name:'initialDeposit',
    message:'Please enter your initial deposit amount:',

},
{
type:'password',// use the password type to hide pin Input;
name:'pin,',
message:'create your 4 digit pin: ',
validate:(input)=>{
    if(/^\d{4}$/.test(input)){
        return true;
    }
    return'pin must be a 4 digit number';
},
}
])
const newCustomer: Customer = {
name:answer.name,
debitCardNumber:generateRandOmDebitCardNumber(),
Pin:answer.pin,
balance:answer.balance
}
customer.push(newCustomer);
saveCustomerData(customer);
console.log(`Account created successfully for ${newCustomer.name}`);
console.log(`your Debit Card Number is: ${newCustomer.debitCardNumber}`);
console.log(`your initial ballance is: ${newCustomer.balance.toFixed(2)}USD`);

atmMenu()
};

openAccount();

