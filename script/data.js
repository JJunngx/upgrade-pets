"use strict";

const exportInput = document.getElementById("export-btn");
const importInput = document.getElementById("import-btn");
const fileInput = document.getElementById("input-file");

let petArr = JSON.parse(getFromStorage("pets")) ?? [];

exportInput.addEventListener("click", function () {
  const data = JSON.stringify(petArr); // chuyển dữ liệu thành chuỗi JSON
  const blob = new Blob([data], { type: "application/json;charset=utf-8" }); // tạo blob từ chuỗi JSON

  saveAs(blob, "dynamic.json"); // lưu file JSON xuống máy người dùng bằng thư viện FileSaver.js
});

importInput.addEventListener("click", async () => {
  const fileUpload = fileInput.files[0]; //lấy vị trí file
  const result = await fileUpload.text(); // read file
  //biến thành chuôi
  const petArrUpLoad = JSON.parse(result); //chuyển thành object

  const loopPet = petArr.filter(
    (item1) => !petArrUpLoad.find((item2) => item2.id === item1.id)
  );

  console.log(petArr);
  petArr = petArrUpLoad.concat(loopPet);
  console.log(petArr);

  // lưu dữ liệu vào cục bộ

  saveToStorage("pets", JSON.stringify(petArr));

  fileInput.value = ""; //xóa file input được hiển thj
  location.reload(); //tự động tải lại
});
