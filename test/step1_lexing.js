import { createToken, Lexer } from "chevrotain";
//On établit Lexer (=parser)

            //On précise tous les tokens
            const UsernameToken = createToken({
                name: "UsernameToken",
                pattern: /Username:/,
            });

            const PasswordToken = createToken({
                name: "PasswordToken",
                pattern: /Password:/,
            });

            let allTokens = [
                UsernameToken,
                PasswordToken,
              ];

            
            export const selectLexer = new Lexer(allTokens);

            export function lex(inputText) {
            const lexingResult = selectLexer.tokenize(inputText);
              
            if (lexingResult.errors.length > 0) {
                console.log('err');
            }
              
            return lexingResult;
            }