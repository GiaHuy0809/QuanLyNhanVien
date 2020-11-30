// Tao lop doi tuong
function NhanVien(_maNV, _hoTen, _email, _matKhau, _ngayDiLam, _chucVu) {
  // key: value
  this.maNhanVien = _maNV;
  this.hoTen = _hoTen;
  this.email = _email;
  this.matKhau = _matKhau;
  this.ngayDiLam = _ngayDiLam;
  this.chucVu = _chucVu;
  this.luongCoBan = 400;
  this.tongLuong = 0;

  // Sếp: hệ số lương 3;
  // Trưởng phòng: 2;
  // Nhân viên: 1;
  this.tinhTongLuong = function () {
    if (this.chucVu === "Sếp") {
      this.tongLuong = this.luongCoBan * 3;
    } else if (this.chucVu === "Trưởng phòng") {
      this.tongLuong = this.luongCoBan * 2;
    } else if (this.chucVu === "Nhân viên") {
      this.tongLuong = this.luongCoBan;
    }
  }
}