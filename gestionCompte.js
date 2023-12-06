const fs = require('fs');

var gestionCompte = function(){
    this.logged_user = undefined;
    this.status = undefined;
}

// Retoune une liste de tous les utilisateurs
gestionCompte.prototype.getAllUser = function() { 
    let rawData = fs.readFileSync('./userData/user.txt', 'utf8');
    let lines = rawData.split('\r\n');
    let users = [];
    lines.forEach(element => {
        let user = {};
        let data = element.split(':');
        user.username = data[0];
        user.password = data[1];
        user.status = data[2];
        users.push(user);
    });
    return users;
}

// Retourne un utilisateur en fonction de son username
gestionCompte.prototype.getUser = function(username){
    let users = this.getAllUser();
    for(let i = 0; i < users.length; i++){
        if(users[i].username == username){
            return users[i];
        }
    }
    return "User not found";
}

// Ajoute un utilisateur 
gestionCompte.prototype.addUser = function(username, password, status){
    let user = this.getUser(username);
    if(user.username == undefined){
        let data = '\r\n' + username + ':' + password + ':' + status;
        fs.appendFileSync('./userData/user.txt', data);
        return true;
    }
    return false;
}

// Supprime un utilisateur
gestionCompte.prototype.removeUser = function(username){
    let users = this.getAllUser();
    users.filter(user => user.username != username);
    let data = '';
    users.forEach(user => {
        data += '\r\n' + user.username + ':' + user.password + ':' + user.status;
    });
    fs.writeFileSync('./userData/user.txt', data);
}

// Change le mot de passe d'un utilisateur
gestionCompte.prototype.changePasswordUser = function(username, password){
    let users = this.getAllUser();
    let data = '';
    users.forEach(user => {
        if(user.username == username){
            user.password = password;
        }
        data += '\r\n' + user.username + ':' + user.password + ':' + user.status;
    });
    fs.writeFileSync('./userData/user.txt', data);
}

// Vérifie si le mot de passe correspond à l'utilisateur
gestionCompte.prototype.checkPassword = function(username, password){
    let user = this.getUser(username);
    if(user.password == password){
        return true;
    }
    return false;
}

gestionCompte.prototype.login = function(username, password){
    let user = this.getUser(username);
    if(user.username == undefined){
        return false;
    }
    if(user.password == password){
        this.logged_user = user;
        this.status = user.status;
        return true;
    }
    return false;
}

module.exports = gestionCompte;