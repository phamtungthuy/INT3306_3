async function handle() {
    arr = ['name', 'username', 'phone', 'email', 'company', 'address']
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    const table = document.querySelector('table');
    let columnLength = table.rows[0].cells.length;
    console.log(columnLength);
    data.forEach((infor, idx) => {
        let row = table.insertRow(table.rows.length)
        for(let i = 0; i < columnLength; i++) {
            let cell = row.insertCell(i);
            if(i < 4) {
                cell.innerHTML = infor[arr[i]]
            } else if(i == 4) {
                cell.innerHTML = infor['company']['name']
            } else {
                cell.innerHTML = infor['address']['street']
            }
        }

    })
}

handle()

