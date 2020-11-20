import axios from 'axios';

class HomeController {

    async calculate(req, res) {

        const { exchangebuy, exchangesell, coin, amount } = req.body;

        if(!exchangebuy || !exchangesell || !coin || !amount) {
            res.status(401).json({
                error: 'Must complete all fields.'
            });
            return;
        }

        // exchange buy 
        const urlbuy = `https://criptoya.com/api/${exchangebuy}/${coin}/ars`;
        const responseBuy = await axios.get(urlbuy);
        const totalBuy = responseBuy.data.totalAsk;
        

        // exchange sell
        const urlsell = `https://criptoya.com/api/${exchangesell}/${coin}/ars`;
        const responseSell = await axios.get(urlsell);
        const totalSell = responseSell.data.totalBid;

        res.json({
            totalBuy, totalSell
        });
    }

    async showQuotes(req, res) {

        let dai = [];
        let ethereum = [];
        let bitcoin = [];

        // ################################ DAI

        let buenbitDAI = await axios.get(`https://criptoya.com/api/buenbit/dai/ars`);
        dai.push({
            exchange: 'Buenbit',
            coin: 'dai',
            fiat: 'ars',
            buy: buenbitDAI.data.ask,
            totalbuy: buenbitDAI.data.totalAsk,
            sell: buenbitDAI.data.bid,
            totalsell: buenbitDAI.data.totalBid

        });

        let qubitDAI = await axios.get(`https://criptoya.com/api/qubit/dai/ars`);
        dai.push({
            exchange: 'Qubit',
            coin: 'dai',
            fiat: 'ars',
            buy: qubitDAI.data.ask,
            totalbuy: qubitDAI.data.totalAsk,
            sell: qubitDAI.data.bid,
            totalsell: qubitDAI.data.totalBid

        });

        let ripioDAI = await axios.get(`https://criptoya.com/api/ripio/dai/ars`);
        dai.push({
            exchange: 'Ripio',
            coin: 'dai',
            fiat: 'ars',
            buy: ripioDAI.data.ask,
            totalbuy: ripioDAI.data.totalAsk,
            sell: ripioDAI.data.bid,
            totalsell: ripioDAI.data.totalBid

        });

        // ################################ ETHEREUM

        let qubitETH = await axios.get(`https://criptoya.com/api/qubit/eth/ars`);
        ethereum.push({
            exchange: 'Qubit',
            coin: 'ethereum',
            fiat: 'ars',
            buy: qubitETH.data.ask,
            totalbuy: qubitETH.data.totalAsk,
            sell: qubitETH.data.bid,
            totalsell: qubitETH.data.totalBid

        });

        let ripioETH = await axios.get(`https://criptoya.com/api/ripio/eth/ars`);
        ethereum.push({
            exchange: 'Ripio',
            coin: 'ethereum',
            fiat: 'ars',
            buy: ripioETH.data.ask,
            totalbuy: ripioETH.data.totalAsk,
            sell: ripioETH.data.bid,
            totalsell: ripioETH.data.totalBid

        });

        // ################################ BITCOIN

        let buenbitBTC = await axios.get(`https://criptoya.com/api/buenbit/btc/ars`);
        bitcoin.push({
            exchange: 'Buenbit',
            coin: 'bitcoin',
            fiat: 'ars',
            buy: buenbitBTC.data.ask,
            totalbuy: buenbitBTC.data.totalAsk,
            sell: buenbitBTC.data.bid,
            totalsell: buenbitBTC.data.totalBid

        });

        let qubitBTC = await axios.get(`https://criptoya.com/api/qubit/btc/ars`);
        bitcoin.push({
            exchange: 'Qubit',
            coin: 'bitcoin',
            fiat: 'ars',
            buy: qubitBTC.data.ask,
            totalbuy: qubitBTC.data.totalAsk,
            sell: qubitBTC.data.bid,
            totalsell: qubitBTC.data.totalBid

        });

        let ripioBTC = await axios.get(`https://criptoya.com/api/ripio/btc/ars`);
        bitcoin.push({
            exchange: 'Ripio',
            coin: 'bitcoin',
            fiat: 'ars',
            buy: ripioBTC.data.ask,
            totalbuy: ripioBTC.data.totalAsk,
            sell: ripioBTC.data.bid,
            totalsell: ripioBTC.data.totalBid
        });

        res.json({
            dai,
            ethereum,
            bitcoin
        });
    }
}

export const homeCtrl = new HomeController();