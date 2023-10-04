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

