// ==========================================
// ATP Fleet Management 4.0
// البيانات الأساسية
// ==========================================

const vehicles = [];


// ==========================================
// دالة إنشاء مركبة
// ==========================================

function createVehicle(id, number, type) {

    return {

        id: id,
        number: number,
        type: type,
        driver: "",
        status: "working",
        notes: "",
        updatedAt: ""

    };

}


// ==========================================
// PRIVATE
// ==========================================

const privateNumbers = [

    "7983",
    "2175",
    "2181",
    "9306",
    "9311",
    "9520",
    "9521",
    "7293",
    "6163",
    "6167",
    "2190",
    "2204",
    "2141",
    "2199",
    "4682",
    "4683",
    "4685",
   "5383",
    "6102",
    "7843",
    "8191",
    "4284",
    "6989"
];


privateNumbers.forEach((number, index) => {

    vehicles.push(

        createVehicle(
            index + 1,
            number,
            "private"
        )

    );

});


// ==========================================
// TRUCKS
// ==========================================

const truckNumbers = [

    "4552",
    "4553",
    "4554",
    "4556",
    "4557",
    "4558",
    "4559",
    "2924",
    "2932",
    "2950",
    "4676",
    "4677",
    "2062",
    "2087",
    "6031",
    "6032",
    "6033",
    "3162",
    "6758",
    "6835",
    "6839",
    "7542",
    "7661",
    "7668",
    "7759",
    "2633",
    "5018"

];


truckNumbers.forEach((number, index) => {

    vehicles.push(

        createVehicle(

            privateNumbers.length + index + 1,
            number,
            "truck"

        )

    );

});


// ==========================================
// EQUIPMENTS
// ==========================================

for (let i = 1; i <= 35; i++) {

    vehicles.push(

        createVehicle(

            privateNumbers.length +
            truckNumbers.length +
            i,

            "EQ-" + String(i).padStart(3, "0"),

            "equipment"

        )

    );

}


// ==========================================
// إجمالي المركبات
// ==========================================

console.log(
    "Total Vehicles:",
    vehicles.length
);
