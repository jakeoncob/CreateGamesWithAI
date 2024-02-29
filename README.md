# CreateGamesWithAI
Put in your simple Prompt for a game and using chatgpt it will do its best to create this game. Must have a chatGPT api key.

Inside Terminal first you do : npm init
Accept everything
when your package.json is installed add a new part: ("type": "module",)
then run the code and npm install everything you need inside the terminal: (npm install express)

you will also need to change the api code to your api code aswell as the path.join() file location.

the variable MODELEASY will be a fine tuned model. to fine tune a model you need to go to openAI account and choose fine tuning. use the onlyHTML.jsonl to fine tune a model and copy the name of this new fine tuned model into MODELEASY. 
*this model is only good at creating the snake game
