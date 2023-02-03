let khuvucList = {
    'KVMB': [
        "codegym Hà Nội", "codegym Phú Thọ", "codegym Bắc Giang"
    ],
    'KVMT':[
        "codegym Nghệ An", " codegym Đà Nẵng","codegym Quảng Nam"
    ],
    'KVMN':[
        "codegym Hò Chí Minh", "codegym Bình Dương", "codegym Vũng Tàu"
    ]
}
let khuvucTag = document.getElementById('khuVuc')
for( key in khuvucList) {
    khuvucTag.innerHTML+= `<option value='${key}'>${key}</option>`
}

function thaydoiKhuvuc() {
    key = khuvucTag.value
    truongLíst = khuvucList[key]
    console.log(truongLíst)
    let truongTag = document.getElementById('truong')
    truongTag.innerHTML =''
    if (truongLíst != null) {
        for (let i = 0; i < truongLíst.length; i++) {
            truongTag.innerHTML += `<option value='${truongLíst[i]}'>${truongLíst[i]}</option>`
        }
    }
}
function capnhapDiemthi() {
    let diemthi = document.getElementById('diemThi').value
    if(diemthi<50){
        document.getElementById("xepLoai").value = 'Loại'
    }else if(diemthi<75){
        document.getElementById("xepLoai").value = 'Đạt'
    }else if(diemthi<90){
        document.getElementById("xepLoai").value = 'Khá'
    }else {
        document.getElementById("xepLoai").value = 'Giỏi'
    }
}

function luuthongtin() {
    let mahocsinh = document.getElementById('maHocSinh').value
    let tenhocsinh = document.getElementById('tenHocSinh').value
    let khuvucthi = document.getElementById('khuVuc').value
    let truongthi = document.getElementById('truong').value
    let diemthi = document.getElementById('diemThi').value
    let xepLoai = document.getElementById('xepLoai').value

    if (mahocsinh == '') {
        mahocsinh = ''
        document.getElementById('mahocsinh-error').innerHTML = "Vui lòng nhập mã học sinh"
    } else {
        document.getElementById('mahocsinh-error').innerHTML = ""
    }

    if (tenhocsinh == '') {
        tenhocsinh = ''
        document.getElementById('tenhocsinh-error').innerHTML = "Vui lòng nhập tên học sinh"
    } else if (tenhocsinh.length <= 2) {
        tenhocsinh = ''
        document.getElementById('tenhocsinh-error').innerHTML = "Tên học sinh phải lớn hơn 2 ký tự"
    } else {
        document.getElementById('tenhocsinh-error').innerHTML = ""
    }

    if (diemthi == '') {
        diemthi = ''
        document.getElementById('diemthi-error').innerHTML = "Vui lòng nhập điểm thi"
    } else if (diemthi > 100) {
        diemthi = ''
        document.getElementById('diemthi-error').innerHTML = "Điểm thi tối đa là 100"
    } else {
        document.getElementById('diemthi-error').innerHTML = ""
    }

    if (mahocsinh && tenhocsinh && khuvucthi && truongthi && diemthi && xepLoai) {
        let hocsinhlist = localStorage.getItem('hocsinhlist') ? JSON.parse(localStorage.getItem('hocsinhlist')) : [];
        hocsinhlist.push({
            mahocsinh: mahocsinh,
            tenhocsinh: tenhocsinh,
            khuvucthi: khuvucthi,
            truongthi: truongthi,
            diemthi: diemthi,
            xeploai: xepLoai,
        });
        localStorage.setItem('hocsinhlist',JSON.stringify(hocsinhlist));
        this.renderhocsinhList()
    }
    }

    function renderhocsinhList() {
        let hocsinhlist = localStorage.getItem('hocsinhlist') ? JSON.parse(localStorage.getItem('hocsinhlist')) : [];

        if (hocsinhlist.length === 0) {
            document.getElementById('hocsinh-list').style.display = 'none'
            return false;
        }
        document.getElementById('hocsinh-list').style.display = 'block'
        let tablecontent = `<tr>
                    <th>STT</th>
                    <th style="width:40px ">Mã học sinh</th>
                    <th>Họ và tên</th>
                    <th>Khu vực</th>
                    <th>Trường thi</th>
                    <th> Điểm thi </th>
                    <th>Xếp hạng</th>
                    <th></th>
                    <th></th> 
                </tr>`;
        hocsinhlist.forEach((hocsinh, index) => {
            index++
            tablecontent += `<tr>
                <td>${index}</td>
                <td>${hocsinh.mahocsinh}</td>
                <td>${hocsinh.tenhocsinh}</td>
                <td>${hocsinh.khuvucthi}</td>
                <td>${hocsinh.truongthi}</td>
                <td>${hocsinh.diemthi}</td>
                <td>${hocsinh.xeploai}</td>
                <td><button class="btn btn-warning">Edit</button></td>
                <td><button class="btn btn-danger" >Xóa</button></td>
            </tr>`
        })
        document.getElementById('table').innerHTML = tablecontent;
}

function myFunction() {

    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}