function Validation() {
    this.kiemTraRong = function (inputVal, spanID, message) {
        //Khong hop le
        if (inputVal === "") {
            document.getElementById(spanID).style.display = "block";
            document.getElementById(spanID).innerHTML = message;
            return false;
        }

        //hop le
        document.getElementById(spanID).style.display = "none";
        document.getElementById(spanID).innerHTML = "";
        return true;
    },
        this.kiemTraMaTrung = function (inputVal, spanID, message, mangNV) {

            //duyet mang nhan vien
            //so sanh inputVal và ma nhan vien trong mangNV
            // some
            var check = mangNV.some(function (items) {
                return inputVal === items.maNhanVien;
            });

            //khong hop le
            //ma co ton tai check la true
            if (check) {
                document.getElementById(spanID).style.display = "block";
                document.getElementById(spanID).innerHTML = message;
                return false;
            }

            //hop le
            document.getElementById(spanID).style.display = "none";
            document.getElementById(spanID).innerHTML = "";
            return true;


        },
        this.kiemTraKyTu = function (inputVal, spanID, message) {
            var pattern = new RegExp(
                "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
                "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
                "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
            );

            //hop le
            if (pattern.test(inputVal)) {
                document.getElementById(spanID).style.display = "none";
                document.getElementById(spanID).innerHTML = "";
                return true;
            }

            //khong hop le
            document.getElementById(spanID).style.display = "block";
            document.getElementById(spanID).innerHTML = message;
            return false;
        },
        this.kiemTraEmail = function (inputVal, spanID, message) {
            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

            //hop le
            if (inputVal.match(mailformat)) {
                document.getElementById(spanID).style.display = "none";
                document.getElementById(spanID).innerHTML = "";
                return true;
            }

            //khong hop le
            document.getElementById(spanID).style.display = "block";
            document.getElementById(spanID).innerHTML = message;
            return false;
        },
        this.kiemTraDoDai = function (inputVal, spanID, message, min, max) {

            //hop le
            if (inputVal.length >= min && inputVal.length <= max) {
                document.getElementById(spanID).style.display = "none";
                document.getElementById(spanID).innerHTML = "";
                return true;
            }

            //khong hop le
            document.getElementById(spanID).style.display = "block";
            document.getElementById(spanID).innerHTML = message;
            return false;
        },
        this.kiemTraChucVu = function (selectID, spanID, message) {

            //hop le
            if (document.getElementById(selectID).selectedIndex !== 0) {
                document.getElementById(spanID).style.display = "none";
                document.getElementById(spanID).innerHTML = "";
                return true;
            }

            //khong hop le
            document.getElementById(spanID).style.display = "block";
            document.getElementById(spanID).innerHTML = message;
            return false;

        }
}