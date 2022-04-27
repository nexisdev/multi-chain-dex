var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index')
});
app.use('/static', express.static('public'))

app.listen(8081);
console.log('Server is listening on port 8081');

const mumbaiQuickSwapFactoryContract = '0x572b45382706345b7A91F4cFC2d224f1d4203F79';
const mumbaiQuickSwapRouterContract = '0xcEF8ed2ED9FBF122005786321fbba9eDb37b4A55';
