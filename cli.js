const fs = require('fs');
const gestionCompte = require('./gestionCompte');

// const vg = require('vega');
// const vegalite = require('vega-lite');

const cli = require("@caporal/core").default;

// Global variable for the logged user
let logSystem = new gestionCompte();

cli
    .version('qcm-maker-cli')
    .version('0.01')

    // Login
    .command('login', 'Login to the application')
    .argument('<username>', 'Username')
    .argument('<password>', 'Password')
    .action(({args, options, logger}) => {
        if(logSystem.login(args.username, args.password)){
            logger.info("You are now logged in as " + logSystem.logged_user.username);
        } else {
            logger.info("Wrong username or password");
        }
    })

    // Check the current user
    .command('whoami', 'Display the current user')
    .action(({args, options, logger}) => {
        logger.info(logSystem.logged_user.username);
    })

cli.run(process.argv.slice(2));