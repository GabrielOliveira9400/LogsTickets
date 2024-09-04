import shell from 'shelljs';

export default async function updateFrontEnd() {
    const pathFrontend = 'C:/Projects/easypac.portal';
    const pathLog = 'C:/Users/gabriel.oliveira/Documents/MERGE/'
    const gitLog = `git log --format='%s' master..release > ${pathLog}log_commits_front.txt`;

    try {
        shell.exec(`mkdir ${pathLog}`);
        shell.exec(`cd ${pathFrontend} && git pull origin release && git pull origin master && git pull origin develop`);
        shell.exec(`cd ${pathFrontend} && ${gitLog}`);
    }
    catch (e) {
        console.log(e);
    }
}

