var checkboxList = document.getElementsByName("checkbox");
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