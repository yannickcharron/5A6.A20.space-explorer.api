import './env.js';
import chalk from 'chalk';

import app from './src/app.js';

const PORT = 5600;

app.listen(PORT, err => {

    if(err) {
        process.exit(1);
    }
    
    console.log(chalk.blue(`Serveur en écoute sur le port: ${PORT}`));
    
});


