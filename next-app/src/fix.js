const fs = require('fs');
const path = require('path');
function fixLinks(dir) {
    for (let file of fs.readdirSync(dir)) {
        let p = path.join(dir, file);
        if (fs.statSync(p).isDirectory()) fixLinks(p);
        else if (p.endsWith('.tsx')) {
            let content = fs.readFileSync(p, 'utf8');
            if (content.includes('<=\"')) {
                content = content.replace(/<=\"/g, '<Link href=\"');
                fs.writeFileSync(p, content);
                console.log('Fixed', p);
            }
        }
    }
}
fixLinks('./src');
