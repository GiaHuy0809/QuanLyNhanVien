/*
  Quản lý nhân viên:
  - Thêm nhân viên
  - Xoá nhân viên
  - Cập nhật thông tin nhân viên
  - Tìm kiếm nhân viên
  - Local Storage
*/

var mangNhanVien = [];
var validation = new Validation();

// clean modal
function Modal(value) {
  if (value === 1) {
    // làm mới giá trị của input
    document.getElementById("msnv").value = "";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("chucvu").selectedIndex = 0;

    // tắt thông báo của span mỗi input
    document.getElementById("tbMaNV").style.display = "none";
    document.getElementById("tbTen").style.display = "none";
    document.getElementById("tbEmail").style.display = "none";
    document.getElementById("tbMatKhau").style.display = "none";
    document.getElementById("tbChucVu").style.display = "none";

    document.getElementById("btnThemNV").setAttribute("data-dismiss", "modal");
    document.getElementById("btnCapNhat").setAttribute("data-dismiss", "modal");
  } else {
    document.getElementById("btnThemNV").setAttribute("data-dismiss", "");
    document.getElementById("btnCapNhat").setAttribute("data-dismiss", "");
  }
}
// Thêm nhân viên
function themNhanVien() {
  //  B1: Lấy thông tin nhân viên
  var maNV = document.getElementById("msnv").value;
  var hoTenNV = document.getElementById("name").value;
  var emailNV = document.getElementById("email").value;
  var matKhauNV = document.getElementById("password").value;
  var ngayDiLam = document.getElementById("datepicker").value;
  var chucVuNV = document.getElementById("chucvu").value;

  var isValid = true;

  //Kiem tra du lieu
  //Ma nhan vien: kiem tra rong và kiem tra ma trùng
  isValid &=
    validation.kiemTraRong(maNV, "tbMaNV", "Ma nhan vien khong de trong") &&
    validation.kiemTraMaTrung(
      maNV,
      "tbMaNV",
      "Ma nhan vien da ton tai",
      mangNhanVien
    );

  //Ho ten : kiem tra rong và kiem tra ky tu
  isValid &=
    validation.kiemTraRong(hoTenNV, "tbTen", "Ten nhan vien khong de trong") &&
    validation.kiemTraKyTu(hoTenNV, "tbTen", "Ho ten khong hop le");

  //email: kiem tra rong và kiem tra hop le cho email
  isValid &=
    validation.kiemTraRong(emailNV, "tbEmail", "Email khong de trong") &&
    validation.kiemTraEmail(emailNV, "tbEmail", "Email khong hop le");

  //password: kiem tra rong và kiem tra do dai
  isValid &=
    validation.kiemTraRong(matKhauNV, "tbMatKhau", "Password khong de trong") &&
    validation.kiemTraDoDai(
      matKhauNV,
      "tbMatKhau",
      "Mat khau phai dai tu 6 den 8 ky tu",
      6,
      8
    );

  //chuc vu: kiem tra khong lay gia tri dau tien
  isValid &= validation.kiemTraChucVu(
    "chucvu",
    "tbChucVu",
    "Chuc vu chua duoc chon"
  );

  console.log(isValid);
  Modal(isValid);

  if (isValid) {
    //  B2: Tạo 1 đối tượng nhân viên
    var nhanVien = new NhanVien(
      maNV,
      hoTenNV,
      emailNV,
      matKhauNV,
      ngayDiLam,
      chucVuNV
    );
    nhanVien.tinhTongLuong();
    //  B3: Thêm nhân viên vào mảng
    mangNhanVien.push(nhanVien);
    LuuLS();
    HienThi(mangNhanVien);
    swal("Thêm nhân viên thành công", "", "success");
  }
}

function HienThi(mangHienThi) {
  var content = "";
  for (var i = 0; i < mangHienThi.length; i++) {
    var nhanVien = mangHienThi[i];
    content += `
      <tr>
        <td>${nhanVien.maNhanVien}</td>
        <td>${nhanVien.hoTen}</td>
        <td>${nhanVien.email}</td>
        <td>${nhanVien.ngayDiLam}</td>
        <td>${nhanVien.chucVu}</td>
        <td>${nhanVien.tongLuong}</td>
        <td>
          <button class="btn btn-danger"
            data-id="${nhanVien.maNhanVien}" onclick="XoaNhanVien(event)">Xoá</button> 
            <button class="btn btn-warning"
            data-id="${nhanVien.maNhanVien}" data-toggle="modal" data-target="#myModal" onclick="LoadThongTinNV(event)">Sửa</button>        
        </td>
      </tr>
    `;
  }
  var tableDanhSach = document.getElementById("tableDanhSach");
  tableDanhSach.innerHTML = content;
}
// Local Storage : chuoi
function LuuLS() {
  // Chuyen kieu du lieu --> chuoi
  // JSON:
  // {
  //   "diemToan": "10"
  // }
  // [
  //   {
  //     "maNhanVien": "001"
  //   }
  // ];
  var jsonData = JSON.stringify(mangNhanVien); // phuong thuc se bi loai bo, chi con thuoc tinh
  // Luu vao LS
  localStorage.setItem("DSNV", jsonData);
}

function LayLS() {
  // Lay LS
  var jsonData = localStorage.getItem("DSNV");

  //localStorage có giá trị
  if (jsonData !== null) {
    // Chuyen ve lai kieu du lieu cu
    mangNhanVien = JSON.parse(jsonData);
    HienThi(mangNhanVien);
  }
}

//Xoa
/*
  - Lấy id của nhân viên cần xoá
  - Tìm id có trong mảng hay không
  - Xoá. splice(start, deleteCount)
*/

function TimViTri(id) {
  for (var i = 0; i < mangNhanVien.length; i++) {
    if (mangNhanVien[i].maNhanVien === id) {
      return i;
    }
  }
  return -1;
}

function XoaNhanVien(e) {
  var btn = e.target;
  console.log(btn);
  // <input class="" style="color: red"/>
  var id = btn.getAttribute("data-id");
  console.log(id);
  var index = TimViTri(id);
  mangNhanVien.splice(index, 1);
  LuuLS();
  HienThi(mangNhanVien);
  swal("Đã xóa nhân viên", "", "success");
}

LayLS();

//Sửa
function LoadThongTinNV(e) {
  // B1: Lấy mã nhân viên cần sửa
  var btn = e.target;
  var id = btn.getAttribute("data-id");
  // B2: Tìm nhân viên trong mảng --> lấy được thông tin
  var index = TimViTri(id);
  var nhanVien = mangNhanVien[index];
  // B3: Lấy thông tin hiển thị lên trên popup (modal)
  document.getElementById("msnv").value = nhanVien.maNhanVien;
  document.getElementById("name").value = nhanVien.hoTen;
  document.getElementById("email").value = nhanVien.email;
  document.getElementById("password").value = nhanVien.matKhauNV;
  document.getElementById("datepicker").value = nhanVien.ngayDiLam;
  document.getElementById("chucvu").value = nhanVien.chucVu;

  document.getElementById("msnv").disabled = true;
  document.getElementById("btnThemNV").style.display = "none";
  document.getElementById("btnCapNhat").style.display = "block";
}

function CapNhatNV() {
  // B4: Cho người dùng sửa thông tin
  var maNV = document.getElementById("msnv").value;
  var hoTenNV = document.getElementById("name").value;
  var emailNV = document.getElementById("email").value;
  var matKhauNV = document.getElementById("password").value;
  var ngayDiLam = document.getElementById("datepicker").value;
  var chucVuNV = document.getElementById("chucvu").value;
  // B5: Cập nhật lại NV mới trong mảng.
  var nhanVienMoi = new NhanVien(
    maNV,
    hoTenNV,
    emailNV,
    matKhauNV,
    ngayDiLam,
    chucVuNV
  );
  nhanVienMoi.tinhTongLuong();
  var index = TimViTri(maNV);
  mangNhanVien[index] = nhanVienMoi;
  Modal(1);
  swal("Cập nhật thành công", "", "success");
  HienThi(mangNhanVien);
}

function TimNhanVien() {
  var mangNVTimThay = [];
  var keyword = document.getElementById("searchName").value;
  // Version 1: Tim dung ten
  // for (var i = 0; i < mangNhanVien.length; i++) {
  //   if (mangNhanVien[i].hoTen === keyword) {
  //     mangNVTimThay.push(mangNhanVien[i]);
  //   }
  // }

  // Version 2+: Tim ky tu co trong ten
  for (var i = 0; i < mangNhanVien.length; i++) {
    var nhanVien = mangNhanVien[i];
    // In hoa, in thuong, Xu ly khoang cach t       u
    keyword = keyword.toLowerCase().replace(/\s/g, "");
    if (
      nhanVien.hoTen.toLowerCase().replace(/\s/g, "").indexOf(keyword) !== -1
    ) {
      mangNVTimThay.push(mangNhanVien[i]);
    }
  }

  if (mangNVTimThay.length !== 0) {
    HienThi(mangNVTimThay);
  } else {
    alert("Không tìm ra");
  }
}

//Gọi hàm
var btnThemNV = document.getElementById("btnThemNV");
btnThemNV.addEventListener("click", function () {
  themNhanVien();
}); // callback function

// button đóng modal
var btnDong = document.getElementById("btnDong");
btnDong.addEventListener("click", function () {
  Modal(1);
});

var btnThem = document.getElementById("btnThem");
btnThem.addEventListener("click", function () {
  document.getElementById("msnv").disabled = false;
  document.getElementById("btnThemNV").style.display = "block";
  document.getElementById("btnCapNhat").style.display = "none";
});

var btnCapNhat = document.getElementById("btnCapNhat");
btnCapNhat.addEventListener("click", function () {
  CapNhatNV();
});

var btnTimNV = document.getElementById("btnTimNV");
btnTimNV.addEventListener("click", TimNhanVien);

var inputSearchName = document.getElementById("searchName");
inputSearchName.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    TimNhanVien();
  }
});

// var btnLuuLS = document.getElementById("btnLuuLS");
// btnLuuLS.addEventListener("click", LuuLS);

// var btnLayLS = document.getElementById("btnLayLS");
// btnLayLS.addEventListener("click", LayLS);
