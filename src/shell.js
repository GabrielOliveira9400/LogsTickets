import shell from 'shelljs';

export default async function updateFrontEnd() {
    const pathFrontend = 'C:/Projects/easypac.portal';
    const pathLog = 'C:/Users/gabriel.oliveira/Documents/MERGE1/'
    const gitLog = `git log --format='%s' master..release > ${pathLog}log_commits_front.txt`;

    try {
        shell.exec(`mkdir "${pathLog}"`);
        console.log('Atualizando repositório frontend...');
        shell.exec(`cd ${pathFrontend} && git pull origin release && git pull origin master && git pull origin develop`);
        console.log('Atualizando log de commits...');
        shell.exec(`cd ${pathFrontend} && ${gitLog}`);
        console.log('Log de commits atualizado com sucesso!');
    }
    catch (e) {
        console.log(e);
    }
}

