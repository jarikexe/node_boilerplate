# Requirements

U need to have nodemon installed to make dev script works

`sudo npm i -g nodemon`

Install mongodb for storing data

# Instalation

`npm i`

Coppy configs and fill out all empty strings
`cp config/default.json config/dev.json`

Export envierment variable
`export NODE_ENV=development`

#Run
`npm run dev` development mode

To run production dome recomended to use PM2 or supervisord. Or simply run it inside of docker.
