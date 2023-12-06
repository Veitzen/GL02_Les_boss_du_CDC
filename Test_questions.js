const fs = require('fs');
//const colors = require('colors');
const Parser = require('./parser.js');

const vg = require('vega');
const vegalite = require('vega-lite');

const cli = require("@caporal/core").default;

cli
	
	// search
	.command('select', 'Free text search on parser')
	.argument('<numero>', 'numéro de la question on parser')
    .argument('<action>', 'action sur la question on parser')
	.action(({args, options, logger}) => {
	fs.readFile( './parser.js','utf8', function (err,data) {
            
            if (err) {
                return console.log(err);
            }
            let parser = new Parser();
            if (parser.errorCount === 0) {
            } else {
                console.log("The .gift file contains error");
            }
            
            console.log(parser.tokenize(data));
            parser.parse(data);
            console.log("yo bonsoir");
            console.log(parser.parsedQuestions);
            parser.QuestionSelection(args.numero,args.action);
        
		
		});
	})

	
	
	
	
cli.run(process.argv.slice(2));
	