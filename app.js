const fs = require('fs');
let sqlText = '';

fs.readFile('./test_data/SQL_data.csv', 'utf8', function (err, data) {
    var dataArray = data.split('\n');
    dataArray.forEach(row => {
        let rowText = '('

        rowArray = row.split(',');
        rowArray.forEach((segment, index) => {
            if (segment.includes("'")) {
                segment = segment.replaceAll("'","");
            }
            if (segment === '') {
                rowText += 'NULL';
            } else if (segment.includes(':') || /[a-zA-Z]/.test(segment)) {
                rowText += "'" + segment + "'";
            } else {
                rowText += segment;
            }
            if (index !== rowArray.length - 1) {
                rowText += ','
            }
        });
        sqlText += rowText + '),\n';
    });
    sqlText = sqlText.replaceAll('24:00:00', '23:59:59');
    console.log(sqlText);
})
// .then(sqlText => {

//         fs.writeFile('./dist/SQL_text.txt', sqlText, 'utf8', function (err) {
//             if (err) {
//                 console.log(err);
//             }
//             console.log('Done!');
//         })
//     })