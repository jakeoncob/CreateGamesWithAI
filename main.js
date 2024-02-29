
import { ALL } from 'dns';
import { link } from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import { OpenAI } from "openai";
require('dotenv').config() //create a process.env for api key if you feel like it if not just delete this

import { setTimeout } from 'timers/promises';
const openai = new OpenAI({
    apiKey: '', //your api key here
    
})
const express = require("express")
const app = express()
const path = require('path')

const http = require('http')

const MODEL = 'gpt-4'
const MODELEASY = 'ft:gpt-3.5-turbo-1106:personal:onlyhtmltrytwo:8xJoJRV2'
const SYSTEMONE = "The assistant generates complete HTML, CSS, and JavaScript code for simple web-based games, providing the full code necessary to play the game without additional explanations (remember, no explanations, only whats inside the <html> brackets), black background and make it visually appealing aswell as preferably centered .(dont add anything like Below is a simple implementation of _____, just pure html code)(also remember to not invole the ```html start and ``` finishing things)"
const SYSTEMTWO = "ChatGPT responds exclusively in HTML code."
const ENDPOINT = 'https://api.openai.com/v1/chat/completions'
const hostOne = 'localhost'
const portOne = 8000
const listGPT = []
const fs = require('fs/promises')
const bodyParser = require('body-parser')



async function callGPT(var1,modelchange) {
    var systemforGPT = ''
    if (modelchange === MODEL) {
        systemforGPT = SYSTEMONE
    }
    if (modelchange === MODELEASY) {
        systemforGPT = SYSTEMTWO
    }
    const completion = await openai.chat.completions.create({
        model: modelchange,
        messages: [
            {'role':'system','content':`${systemforGPT}`},
            {'role':"user",'content':`${var1}`}
        ]
    })
    listGPT.push(completion.choices[0].message.content)
    
    //console.log(listGPT[listGPT.length - 1])
}

app.get('/', (req, res) => {
    
    res.sendFile(path.join('/Users/jakecoble/Desktop/BaseForGPT/index.html')); // your path for index.html here
});
app.use(bodyParser.urlencoded({extended:true}))
app.post('/submit', async (req,res) => {
    const userInput = req.body.userInput;
    const modelget = req.body.promptType
    var themodel = ''
    if (modelget === 'simple') {
        themodel = MODELEASY
    }
    if (modelget === 'complex') {
        themodel = MODEL
    }
    
    await callGPT(userInput,themodel);
    res.send(`${listGPT[listGPT.length - 1]}`)
})

app.listen(portOne, () => {
    console.log(`Server is running on http://${hostOne}:${portOne}`)
})
