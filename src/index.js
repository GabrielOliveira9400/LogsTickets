import fs from 'fs';
import readline from 'readline';
import UpdateFront from './shell.js';

let listIssues = [];
//const path = "C:\\Users\\gabriel.oliveira\\Documents\\MERGE\\log_commits_front.txt";
const path = "log/log_commits_front1.txt";
async function readFileByLine(file) {
    const fileStream = fs.createReadStream(file);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        if (line.includes('#')) {
            //pega os 5 proximos caracretes com o #, incluindo o #
            const issue = line.slice(line.indexOf('#'), line.indexOf('#') + 6)

            if(issue.length !== 6) {
                return
            }
            listIssues.push(issue)
        }
    }
}

async function tratarDuplicates(listIssues) {
    let newListIssues = [];
    listIssues.forEach(issue => {
        if (!newListIssues.includes(issue)) {
            newListIssues.push(issue)
        }
    });
    return newListIssues;
}

async function salvarIssues(newListIssues) {
    const path = "log/issues.txt";

    //caso o arquivo já exista, substitui o conteudo
    fs.writeFileSync(path, newListIssues.join('\n'), 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
    });

}

//await UpdateFront();
await readFileByLine(path);
let newListIssues = await tratarDuplicates(listIssues);
await salvarIssues(newListIssues);
