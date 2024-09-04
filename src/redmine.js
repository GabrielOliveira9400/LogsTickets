import axios from "axios";
import 'dotenv/config';


export default async function getIssues(newListIssues) {
    let issues = [];
    for (let i = 0; i < newListIssues.length; i++) {
        //limpa # do inicio da string
        newListIssues[i] = newListIssues[i].replace('#', '');
        const url = `http://${process.env.REDMINE_URL}/issues/${newListIssues[i]}.json`;
        const options = {
            url: url,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Redmine-API-Key': process.env.REDMINE_APIKEY
            }
        };

        let response;

        try {
            response = await axios(options);
            let issue = `#${response.data.issue.id} - ${response.data.issue.status.name}`;
            issues.push(issue);
        } catch (error) {
            console.log(error);
        }
    }
    console.log(issues);
    return issues;
}