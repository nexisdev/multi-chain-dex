/* Moralis init code */
const serverUrl = "https://xt52ilap3akq.usemoralis.com:2053/server";
const appId = "uHAw3DGsqJ9lwaYEKapXyj7rsDJyOpMogjNPfrVx";
const erc20Abi = [
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    }
];

Moralis.start({ serverUrl, appId });

let tokenSelection;
let tokens;

let swapPair = {
    "from": { "address": null },
    "to": { "address": null }
}

let liquidityPair = {
    "from": { "address": null },
    "to": { "address": null }
}


/* Authentication code */
async function login() {
    let user = Moralis.User.current();
    if (!user) {
    user = await Moralis.authenticate({ signingMessage: "Log in to QuickSwap Testnet" })
      .then(function (user) {
        document.getElementById("btn-login").innerHTML = Moralis.User.current().get("ethAddress");
      })
      .catch(function (error) {
        console(error);
      });
  }
}

async function init() {
    await Moralis.initPlugins();
    await Moralis.enable();
    await listAvailableTokens();
}

async function listAvailableTokens() {
    const tokenList = document.getElementById("token_list");
    tokens = {
        '0x326C977E6efc84E512bB9C30f76E30c160eD06FB': {
            'symbol': 'LINK',
            'address': '0x326C977E6efc84E512bB9C30f76E30c160eD06FB',
            'logoURI': 'https://tokens.1inch.io/0x514910771af9ca656af840dff83e8264ecf986ca.png'
        },
        '0x0fa8074acf7bbc635a44e0f22c3db7ffd3d8e39f': {
            'symbol': 'MEME',
            'address': '0x0fa8074acf7bbc635a44e0f22c3db7ffd3d8e39f',
            'logoURI': 'https://tokens.1inch.io/0x17ac188e09a7890a1844e5e65471fe8b0ccfadf3.png'
        }
    }

    for (const address in tokens) {
        let token = tokens[address];
        let div = document.createElement("div");

        div.className = "token_row";
        let html = `
            <img class="token_list_img" src="${token.logoURI}">
            <span class="token_list_text">${token.symbol}</span>
        `
        div.innerHTML = html;
        div.onclick = (() => { selectToken(token.address); });
        tokenList.appendChild(div);
    }
}

async function selectToken(address) {
    closeModal();

    mumbaiRpc = 'https://rpc-mumbai.maticvigil.com/';
    const provider = new Web3.providers.HttpProvider(mumbaiRpc);
    const web3 = new Web3(provider);

    const contract = new web3.eth.Contract(erc20Abi, address);
    let decimals = await contract.methods.decimals().call();
    let balance = await contract.methods.balanceOf(Moralis.User.current().get("ethAddress")).call();
    if (tokenSelection == 'from') {
        swapPair.from.address = address;
    } else if (tokenSelection == 'to') {
        swapPair.to.address = address;
    } else if (tokenSelection == 'liquidity_from') {
        liquidityPair.from.address = address;
    } else {
        liquidityPair.to.address = address;
    }
    updateUI();
}

function updateUI() {
    if (!!swapPair.from.address) {
        document.getElementById("from_token_icon").src = tokens[swapPair.from.address].logoURI;
        document.getElementById("from_token_text").innerHTML = tokens[swapPair.from.address].symbol;
    }

    if (!!swapPair.to.address) {
        document.getElementById("to_token_icon").src = tokens[swapPair.to.address].logoURI;
        document.getElementById("to_token_text").innerHTML = tokens[swapPair.to.address].symbol;
    }

    if (!!liquidityPair.from.address) {
        document.getElementById("liquidity_from_token_icon").src = tokens[liquidityPair.from.address].logoURI;
        document.getElementById("liquidity_from_token_text").innerHTML = tokens[liquidityPair.from.address].symbol;
    }

    if (!!liquidityPair.to.address) {
        document.getElementById("liquidity_to_token_icon").src = tokens[liquidityPair.to.address].logoURI;
        document.getElementById("liquidity_to_token_text").innerHTML = tokens[liquidityPair.to.address].symbol;
    }


}

async function logOut() {
  await Moralis.User.logOut();
  console.log("logged out");
}

function openModal(selection) {
    document.getElementById("token_modal").style.display = "block";
    tokenSelection = selection;
}

function closeModal() {
    document.getElementById("token_modal").style.display = "none";
}

async function getQuote() {
    let amount = Number(Moralis.Units.ETH(document.getElementById('from_token_amount').value));
    const quote = await Moralis.Plugins.oneInch.quote({
        chain: 'mumbai',
        fromTokenAddress: swapPair.from.address,
        toTokenAddress: swapPair.to.address,
        amount: amount
    });
    document.getElementById("to_token_amount").value = quote.toTokenAmount / 10 ** quote.toToken.decimals;
}

$(document).ready(() => {
    init();
    document.getElementById("from_token_select").onclick = (() => { openModal('from'); });
    document.getElementById("to_token_select").onclick = (() => { openModal('to'); });

    document.getElementById("liquidity_from_token_select").onclick = (() => { openModal('liquidity_from'); });
    document.getElementById("liquidity_to_token_select").onclick = (() => { openModal('liquidity_to'); });

    document.getElementById("model_close_btn").onclick = closeModal;
    document.getElementById("btn-login").onclick = login;
    document.getElementById("from_token_amount").onblur = getQuote;
    document.getElementById("to_token_amount").onblur = getQuote;

    if (Moralis.User.current()) {
        document.getElementById("btn-login").innerHTML = Moralis.User.current().get("ethAddress");
    }
    // document.getElementById("btn-logout").onclick = logOut;
})
