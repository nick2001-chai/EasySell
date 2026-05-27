// import { fetchDoctorList } from "../api/opd-patient-api.js";

// const searchcriteriael = document.createElement("emr-criteria-search");
// document
//   .querySelector("#outpatient-searchcriteria-host")
//   .appendChild(searchcriteriael);
// searchcriteriael.setAttribute("orientation", "horizontal"); //vertical | horizontal

// // searchcriteriael.addEventListener("criteria_search", (e) => {
// //   console.log("criteria_search (HTML):", e.detail);
// // });

// const doctorList = await fetchDoctorList().then(res => res.data);
// console.log("Doctor List:", doctorList);
// const doctorNames = doctorList.map(d => d.name);
// const searchcriteriaschema = [
//   {
//     key: "hn",
//     control: "input",
//     label: "HN",
//     type: "text",
//     width: "fit",
//     size: "90px",
//   },
//   {
//     key: "name",
//     control: "input",
//     label: "ชื่อ-สกุล",
//     type: "text",
//     width: "fit",
//   },
//   {
//     key: "vn",
//     control: "input",
//     label: "VN",
//     type: "text",
//     width: "fit",
//   },

//   {
//     key: "status",
//     control: "select",
//     label: "สถานะ",
//     // value: ["รอพบแพทย์", "รอตรวจคัดกรอง", "รอชำระเงิน","รอจ่ายยา","รักษาเสร็จสิ้น","รอขึ้นวอร์ด"],
//     value: [
//       "Registered",
//       "Arrived",
//       "Send to doctor",
//       "Awaiting result",
//       "Medical discharge",
//       "Financial discharge",
//       "Admit",
//     ],
//     ismultiselect: true,
//     width: "fit",
//   },
//   {
//     key: "doctor",
//     control: "select",
//     label: "แพทย์ผู้ตรวจ",
//     value: ["", ...doctorNames],
//     ismultiselect: false,
//     width: "fit",
//   },
//   {
//     key: "date",
//     control: "input",
//     label: "Visit Date",
//     type: "date",
//     value: "today",
//     width: "auto",
//   },
// ];

// // ตั่งค่า Title
// searchcriteriael.setTitle("<h3>🔎 ค้นหาข้อมูลผู้ป่วย</h3>");
// searchcriteriael.mountCriteriaTemplate(searchcriteriaschema);
// // searchcriteriael.setValues({ status: ["รอตรวจคัดกรอง", "รอฟังผล", "รอพบแพทย์"] });
// // searchcriteriael.setValues({ doctor: "Doctor 2" });

// // document.addEventListener("DOMContentLoaded", async () => {
// //   // ตั่งค่า Title
// //   searchcriteriael.setTitle('<h3>🔎 ค้นหาข้อมูลผู้ป่วย</h3>');
// //   searchcriteriael.mountCriteriaTemplate(searchcriteriaschema);
// //   // searchcriteriael.setValues({ status: ["รอตรวจคัดกรอง", "รอฟังผล", "รอพบแพทย์"] });
// //   // searchcriteriael.setValues({ doctor: "Doctor 2" });
// // });


import { fetchAPI } from './test2.js';

document.addEventListener("DOMContentLoaded", async () => {
    // รอผลจาก API
    const data = await fetchAPI();

    // หา element ใน HTML
    const resultDiv = document.querySelector(".result");

    // แสดงข้อมูลเป็น list
    resultDiv.innerHTML = ""; // เคลียร์ก่อน
    for (const key in data) {
        const p = document.createElement("p");
        p.textContent = `${key}: ${data[key]}`;
        resultDiv.appendChild(p);
    }
});
