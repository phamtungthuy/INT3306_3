const checkboxList = document.getElementsByName("checkbox");
var checked_array = [];
checkboxList.forEach((checkbox) => {
    checkbox.onchange = function() {
        if(this.checked) {
            this.parentNode.parentNode.classList.add("selected-row");
            const allChecked = Array.from(checkboxList).every((ck) => {
                return ck.checked;
            })
            document.querySelector("#checkbox-all").checked = allChecked;
            document.querySelector("div.group-op").classList.remove("nodisplay");
        } else {
            this.parentNode.parentNode.classList.remove("selected-row");
            document.querySelector("#checkbox-all").checked = false;
            const someChecked = Array.from(checkboxList).some((ck) => {
                return ck.checked;
            })
            if(!someChecked) {
                document.querySelector("div.group-op").classList.add("nodisplay");
            }
        }
    }
})

document.querySelector("#checkbox-all").onchange = function() {
    checkboxList.forEach((checkbox) => {
        checkbox.checked = this.checked;
        if(this.checked) {
            checkbox.parentNode.parentNode.classList.add("selected-row");
        } else {
            checkbox.parentNode.parentNode.classList.remove("selected-row");
        }
    })
    if(this.checked) {
        document.querySelector("div.group-op").classList.remove("nodisplay");
    } else {
        document.querySelector("div.group-op").classList.add("nodisplay");

    }
}

document.querySelector(".group-op-delete").onclick = function() {
    const elementsToRemove = [];
    checkboxList.forEach((checkbox) => {
        if(checkbox.checked) {
            elementsToRemove.push(checkbox.parentNode.parentNode);
        }
    })
    elementsToRemove.forEach((element) => {
        element.parentNode.removeChild(element);
    });
}



const sortColList = document.querySelectorAll('th.sortcol');

function sort() {
    let columnIndex = -1;
    let dir = "";
    const thList = document.querySelectorAll('th');
    thList.forEach((thElement, idx) => {
        classList = Array.from(thElement.classList);
        if(classList.includes('asc')) {
            columnIndex = idx;
            dir = "asc";
        } else if(classList.includes('desc')) {
            columnIndex = idx;
            dir = "desc";
        }
    })
    const tbody = document.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));

    rows.sort((a, b) => {
        const cellA = a.querySelector(`td:nth-child(${columnIndex + 1})`).textContent.trim();
        const cellB = b.querySelector(`td:nth-child(${columnIndex + 1})`).textContent.trim();
        console.log(cellA, cellB);
        return cellA - cellB;
    })

    rows.forEach(row => tbody.removeChild(row));

    // Thêm lại các hàng đã sắp xếp
    rows.forEach(row => tbody.appendChild(row));
}

function compareName(name1, name2) {
    let wordList1 = name1.split(' ');
    wordList1.reverse();
    let wordList2 = name2.split(' ');
    wordList2.reverse();
    middleName1 = wordList1.slice(2, wordList1.length - 1).join(' ');
    middleName2 = wordList2.slice(2, wordList2.length - 1).join(' ');
    lastName1 = wordList1[wordList1.length - 1];
    lastName2 = wordList2[wordList2.length - 1];
    if(wordList1[0] < wordList2[0]) {
        return false;
    } else if(wordList1[0] > wordList2[0]) {
        return true;
    } else if(middleName1 < middleName2) {
        return false;
    } else if(middleName1 > middleName2) {
        return true;
    } else if(lastName1 < lastName2) {
        return false;
    } else {
        return true;
    }
}

function compareDate(date1, date2) {
    dateList1 = date1.split('/');
    dateList1.reverse();
    dateList2 = date2.split('/');
    dateList2.reverse();
    for(let i = 0; i <= 1; i++) {
        if(dateList1[i].length < 2) {
            dateList1[i] = "0" + dateList1[i];
        }
        if(dateList2[i].length < 2) {
            dateList2[i] = "0" + dateList2[i];
        }
    }
    date1 = dateList1.join('/');
    date2 = dateList2.join('/');
    if(date1 < date2) {
        return false;
    } else {
        return true;
    }
}

function compareGender(gender1, gender2) {
    return gender1 > gender2
}

function swap(i, j, rows) {

    for (let k = 1; k < rows[i].cells.length; k++) {
        checked_tmp = checked_array[i];
        checked_array[i] = checked_array[j];
        checked_array[j] = checked_tmp;
        tmp = rows[i].cells[k].innerHTML;
        rows[i].cells[k].innerHTML = rows[j].cells[k].innerHTML;
        rows[j].cells[k].innerHTML = tmp;
    }   

}

function tblSort() {
    let columnIndex = -1;
    let dir = "";
    const thList = document.querySelectorAll('th');
    thList.forEach((thElement, idx) => {
        classList = Array.from(thElement.classList);
        if(classList.includes('asc')) {
            columnIndex = idx;
            dir = "asc";
        } else if(classList.includes('desc')) {
            columnIndex = idx;
            dir = "desc";
        }
    })
    const tbl = document.querySelector('table');
	var rows = tbl.rows;
    checked_array = [];
    for(let i = 0; i < rows.length; i++) {
        classList = Array.from(rows[i].classList);
        checked_array.push(classList.includes('selected-row'));
    }
	for (var i = 1; i < rows.length; i++) {
		for (var j = i+1; j < rows.length; j++) {
            name1 = rows[i].cells[1].textContent;
            name2 = rows[j].cells[1].textContent;
            date1 = rows[i].cells[2].textContent;
            date2 = rows[j].cells[2].textContent;
            gender1 = rows[i].cells[3].textContent;
            gender2 = rows[j].cells[3].textContent;
			if (columnIndex == 1)
			{	
                if(
                    (dir == "asc" && compareName(name1, name2)) || (dir == "desc" && !compareName(name1, name2))
                    ) {
                    swap(i, j, rows);
                }

			} else if(columnIndex == 2) {
                if(
                    (dir == "asc" && compareDate(date1, date2))|| (dir == "desc" && !compareDate(date1, date2))
                    
                    ) {
                    swap(i, j, rows);
                }
            } else if(columnIndex == 3) {
                if(
                    (gender1 != gender2 && ((dir == "asc" && compareGender(gender1, gender2)) || dir == "desc" && !compareGender(gender1, gender2)))
                    || (gender1 == gender2 && compareName(name1, name2))
                    ) {
                    swap(i, j, rows);
                }
            }
        }
    }
    Array.from(rows).forEach((row, idx) => {
        row.classList.remove('selected-row');
        row.querySelector('input').checked=false;
        if(checked_array[idx]) {
            row.classList.add('selected-row');
            row.querySelector('input').checked=true;
        }
    })
};

sortColList.forEach((thElement) => {
    thElement.onclick = function() {
        classList = Array.from(this.classList)
        if (classList.includes('asc')) {
            this.classList.remove('asc');
            this.classList.add('desc');
        } else if(classList.includes('desc')) {
            this.classList.remove('desc');
            this.classList.add('asc');
        } else {
            sortColList.forEach((th) => {
                th.classList.remove('asc');
                th.classList.remove('desc');
            })
            this.classList.add('asc');
        }
        tblSort();
    }
})