const express=require("express");
const app=express();
const path=require('path');
const fs=require('fs');
const axios=require('axios');
var cors = require('cors')

var bodyParser = require('body-parser')

const port = 3000

app.use(cors());
app.use(express.static(__dirname + '/images'));
app.use(bodyParser.json())
app.get('/', (req, res) => {
    imagen();
    res.send('Hello World!')
});

app.post('/wmtURL',(req,res)=>{
    let value=imagen(req.body.colors);
    if(value){
        console.log("test");
        let colorValue=req.body;
        let newURL=`https://services.sentinel-hub.com/ogc/wcs/488ad8e7-6d89-4ed1-b5d5-7131a888dd61?SERVICE=WCS&REQUEST=GetCoverage&COVERAGE=${req.body.colors}&BBOX=3238005,5039853,3244050,5045897&MAXCC=20&WIDTH=1000&HEIGHT=600&FORMAT=image/jpeg&TIME=2019-03-29/2019-05-29`
        console.log(newURL);
        res.json(newURL);
        console.log(colorValue);
    }

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})



async function imagen(color){
    try{
    const url1=`https://services.sentinel-hub.com/ogc/wcs/488ad8e7-6d89-4ed1-b5d5-7131a888dd61?SERVICE=WCS&REQUEST=GetCoverage&COVERAGE=${color}&BBOX=3238005,5039853,3244050,5045897&MAXCC=20&WIDTH=1000&HEIGHT=600&FORMAT=image/jpeg&TIME=2019-03-29/2019-05-29`
    const ruta = path.resolve(__dirname+'/images/imageTest.jpg');
    const ruta1 = path.resolve(__dirname+'/images/imageTest.tiff');

    let response=await axios({
      url:url1,
      responseType: "stream",
      method: "GET"
    });
    response.data.pipe(fs.createWriteStream(ruta))
    response.data.pipe(fs.createWriteStream(ruta1))

    return 'hola';
    console.log('Hola Mundo');
  }catch(err){
    console.log(err);
  }
}



console.log('Hola Mundo');


