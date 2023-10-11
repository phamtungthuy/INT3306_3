const btnList = document.querySelectorAll('input[type="button"]')
const textInput = document.querySelector('input[type="text"]');
btnList.forEach((btn) => {
    btn.onclick = function(e) {
        let value = e.target.value;
        if(value =='=') {
            let text = textInput.value
            text = text.replace('x', '*');
            var a = eval(text) + "<br>";
            try {
                console.log(a)
            } catch(e) {
                console.log('Expression in invalid')
            }
        } else if(value == 'AC') {
            textInput.value = ''
        } else {
            textInput.value += value
        }
    }
})