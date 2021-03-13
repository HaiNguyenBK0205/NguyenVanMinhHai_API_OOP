function Validation() {
    this.checkEmpty = function(value, id, mess) {
        if (value === "") {
            getEle(id).innerHTML = mess;
            getEle(id).style.display = "block";
            return false;
        }
        getEle(id).innerHTML = "";
        getEle(id).style.display = "none";
        return true;
    }
    this.checkContain = function(value, array, id, mess) {
        for (var i = 0; i < array.length; i++) {
            if (value === array[i].TaskName) {
                getEle(id).innerHTML = mess;
                getEle(id).style.display = "block";
                return false;
            }
        }
        getEle(id).innerHTML = "";
        getEle(id).style.display = "none";
        return true;
    }
}