"use strict";

const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const submitBtn = document.getElementById("submit-btn");
const tableBody = document.getElementById("tbody");

let breedArr = JSON.parse(getFromStorage("breeds")) ?? []; //luu trữ
if (breedArr) {
  renderBreedTable(breedArr); //reload hiển thị tất cả dữ liệu
}
//tao bang khi người dùng nhập dữ liệu
function renderBreedTable(breedArr) {
  tableBody.innerHTML = "";
  for (let i = 0; i < breedArr.length; i++) {
    const row = document.createElement("tr"); //tạo element
    row.innerHTML = `
    <th>${i + 1}</th>  
    <td>${breedArr[i].breed}</td>
    <td>${breedArr[i].type}</td>
    <td>
    <button class="btn btn-danger" onclick="deletePet('${i}')">Delete</button>
    </td>
    `;
    tableBody.appendChild(row); //thêm phần tử vào html
  }
}
// nut gui du lieu
submitBtn.addEventListener("click", function () {
  //nhận dữ liệu người dùng nhạpa
  const data = {
    breed: breedInput.value,
    type: typeInput.value,
  };
  //validate data
  if (data.breed === "") {
    alert("please fill data");
  } else if (data.type === "Select Type") {
    alert("Please select type ");
  } else {
    breedArr.push(data);
    renderBreedTable(breedArr);
    clearInput();
    saveToStorage("breeds", JSON.stringify(breedArr));
  }
  //xóa dữ liệu người dùng nhập
  function clearInput() {
    breedInput.value = "";
    typeInput.value = "Select Type";
  }
});
// xác nhận xóa (breed)
function deletePet(peti) {
  if (confirm("Are you sure")) {
    const index = breedArr.findIndex((breed, i) => i == peti);
    console.log(index);
    if (index !== 1) {
      breedArr.splice(index, 1);
    }
    renderBreedTable(breedArr);
    saveToStorage("breeds", JSON.stringify(breedArr));
  }
}
