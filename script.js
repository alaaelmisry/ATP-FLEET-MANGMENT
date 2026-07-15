//==================================================
// ATP Fleet Management 4.0
// Main Script
//==================================================


//==================================================
// LISTS
//==================================================

const privateList =
    document.getElementById("privateList");

const truckList =
    document.getElementById("truckList");

const equipmentList =
    document.getElementById("equipmentList");


//==================================================
// SEARCH
//==================================================

const search =
    document.getElementById("search");


//==================================================
// PRIVATE STATS
//==================================================

const privateTotal =
    document.getElementById("privateTotal");

const privateWorking =
    document.getElementById("privateWorking");

const privateFault =
    document.getElementById("privateFault");


//==================================================
// TRUCK STATS
//==================================================

const truckTotal =
    document.getElementById("truckTotal");

const truckWorking =
    document.getElementById("truckWorking");

const truckFault =
    document.getElementById("truckFault");


//==================================================
// EQUIPMENT STATS
//==================================================

const equipmentTotal =
    document.getElementById("equipmentTotal");

const equipmentWorking =
    document.getElementById("equipmentWorking");

const equipmentFault =
    document.getElementById("equipmentFault");


//==================================================
// VEHICLE MODAL
//==================================================

const vehicleModal =
    document.getElementById("vehicleModal");

const modalNumber =
    document.getElementById("modalNumber");

const modalDriver =
    document.getElementById("modalDriver");

const modalStatus =
    document.getElementById("modalStatus");

const saveVehicleButton =
    document.getElementById("saveVehicle");

const cancelVehicleButton =
    document.getElementById("cancelVehicle");


//==================================================
// NOTES MODAL
//==================================================

const notesModal =
    document.getElementById("notesModal");

const notesText =
    document.getElementById("notesText");

const notesUpdatedAt =
    document.getElementById("notesUpdatedAt");

const saveNotesButton =
    document.getElementById("saveNotes");

const closeNotesButton =
    document.getElementById("closeNotes");


//==================================================
// GLOBAL VARIABLES
//==================================================

let selectedVehicle = null;

let selectedNotesVehicle = null;


//==================================================
// ADMIN PASSWORD
//==================================================

const ADMIN_PASSWORD = "16896";


//==================================================
// SAVE DATA
//==================================================

function saveData(){

    localStorage.setItem(

        "ATP_FLEET_DATA",

        JSON.stringify(vehicles)

    );

}


//==================================================
// LOAD DATA
//==================================================

function loadData(){

    const data =
        localStorage.getItem(
            "ATP_FLEET_DATA"
        );


    if(!data)
        return;


    const saved =
        JSON.parse(data);


    saved.forEach(item => {

        const vehicle =
            vehicles.find(
                v => v.id === item.id
            );


        if(vehicle){

            // لا يتم تحميل رقم المركبة
            // ولا اسم السائق من Local Storage

            vehicle.status =
                item.status || "working";

            vehicle.notes =
                item.notes || "";

            vehicle.updatedAt =
                item.updatedAt || "";

        }

    });

}
//==================================================
// DISPLAY VEHICLES
//==================================================

function displayVehicles(list = vehicles){

    // تفريغ القوائم

    privateList.innerHTML = "";
    truckList.innerHTML = "";
    equipmentList.innerHTML = "";


    // الإحصائيات

    let stats = {

        private: {
            total:0,
            working:0,
            fault:0
        },

        truck: {
            total:0,
            working:0,
            fault:0
        },

        equipment: {
            total:0,
            working:0,
            fault:0
        }

    };


    // عرض المركبات المتوقفة أولاً

    list.sort((a, b) => {

        if(
            a.status === "fault" &&
            b.status === "working"
        ){
            return -1;
        }

        if(
            a.status === "working" &&
            b.status === "fault"
        ){
            return 1;
        }

        return 0;

    });



    list.forEach(vehicle => {


        // تحديث الإحصائيات

        stats[vehicle.type].total++;

        if(vehicle.status === "working"){

            stats[vehicle.type].working++;

        }else{

            stats[vehicle.type].fault++;

        }


        // إنشاء الصف

        const row =
            document.createElement("div");

        row.className =
            "vehicle-row";


        // تحديد لون حالة المركبة

        const statusClass =

            vehicle.status === "working"

            ? "status-working"

            : "status-fault";


        // أيقونة الملاحظات

        const notesIcon =

            vehicle.notes &&
            vehicle.notes.trim() !== ""

            ? "📩"

            : "✉️";


        const notesClass =

            vehicle.notes &&
            vehicle.notes.trim() !== ""

            ? "has-notes"

            : "no-notes";



        // محتويات الصف

        row.innerHTML = `

            <div class="vehicle-cell">

                <span class="status-dot ${statusClass}">
                </span>

            </div>


            <div class="vehicle-cell vehicle-number">

                ${vehicle.number}

            </div>


            <div class="vehicle-cell vehicle-driver">

                ${vehicle.driver || "-"}

            </div>


            <div class="vehicle-cell
                        vehicle-notes
                        ${notesClass}">

                ${notesIcon}

            </div>

        `;


        //==================================================
        // الضغط على الصف
        //==================================================

        row.addEventListener(
            "click",
            function(){

                openVehicleModal(
                    vehicle
                );

            }
        );


        //==================================================
        // الضغط على الملاحظات
        //==================================================

        const notesButton =

            row.querySelector(
                ".vehicle-notes"
            );


        notesButton.addEventListener(

            "click",

            function(event){

                // منع فتح نافذة المركبة

                event.stopPropagation();


                openNotesModal(
                    vehicle
                );

            }

        );


        //==================================================
        // إضافة الصف للقسم المناسب
        //==================================================

        if(vehicle.type === "private"){

            privateList.appendChild(
                row
            );

        }

        else if(vehicle.type === "truck"){

            truckList.appendChild(
                row
            );

        }

        else{

            equipmentList.appendChild(
                row
            );

        }

    });


    //==================================================
    // تحديث الإحصائيات
    //==================================================

    privateTotal.textContent =
        stats.private.total;

    privateWorking.textContent =
        stats.private.working;

    privateFault.textContent =
        stats.private.fault;


    truckTotal.textContent =
        stats.truck.total;

    truckWorking.textContent =
        stats.truck.working;

    truckFault.textContent =
        stats.truck.fault;


    equipmentTotal.textContent =
        stats.equipment.total;

    equipmentWorking.textContent =
        stats.equipment.working;

    equipmentFault.textContent =
        stats.equipment.fault;

}
//==================================================
// OPEN VEHICLE MODAL
//==================================================

function openVehicleModal(vehicle){

    selectedVehicle = vehicle;


    modalNumber.value =
        vehicle.number;

    modalDriver.value =
        vehicle.driver || "";

    modalStatus.value =
        vehicle.status;


    // جعل رقم المركبة واسم السائق للقراءة فقط

    modalNumber.disabled = true;

    modalDriver.disabled = true;


    vehicleModal.classList.remove(
        "hidden"
    );

}


//==================================================
// CLOSE VEHICLE MODAL
//==================================================

function closeVehicleModal(){

    vehicleModal.classList.add(
        "hidden"
    );

    selectedVehicle = null;

}


cancelVehicleButton.addEventListener(

    "click",

    function(){

        closeVehicleModal();

    }

);


//==================================================
// SAVE VEHICLE DATA
//==================================================

saveVehicleButton.addEventListener(

    "click",

    function(){


        if(!selectedVehicle)
            return;


        let protectedDataChanged =
            false;


        // يتم التحقق من تغيير حالة المركبة فقط

        if(

            modalStatus.value

            !==

            selectedVehicle.status

        ){

            protectedDataChanged =
                true;

        }


        // التحقق من الرقم السري

        if(protectedDataChanged){

            const password = prompt(

                "🔐 أدخل الرقم السري"

            );


            if(password !== ADMIN_PASSWORD){

                alert(

                    "❌ الرقم السري غير صحيح"

                );

                return;

            }

        }


        // حفظ حالة المركبة فقط

        selectedVehicle.status =

            modalStatus.value;


        selectedVehicle.updatedAt =

            new Date().toLocaleString(
                "ar-SA"
            );


        saveData();

        displayVehicles();

        closeVehicleModal();


    }

);
//==================================================
// OPEN NOTES MODAL
//==================================================

function openNotesModal(vehicle){

    selectedNotesVehicle = vehicle;


    notesText.value =

        vehicle.notes || "";


    if(

        vehicle.updatedAt &&
        vehicle.updatedAt.trim() !== ""

    ){

        notesUpdatedAt.textContent =

            "آخر تحديث : " +

            vehicle.updatedAt;

    }

    else{

        notesUpdatedAt.textContent =

            "لا يوجد تحديث سابق";

    }


    notesModal.classList.remove(
        "hidden"
    );

}


//==================================================
// CLOSE NOTES MODAL
//==================================================

function closeNotesModal(){

    notesModal.classList.add(
        "hidden"
    );

    selectedNotesVehicle = null;

}


closeNotesButton.addEventListener(

    "click",

    function(){

        closeNotesModal();

    }

);


//==================================================
// SAVE NOTES
//==================================================

saveNotesButton.addEventListener(

    "click",

    function(){


        if(!selectedNotesVehicle)
            return;


        selectedNotesVehicle.notes =

            notesText.value.trim();


        selectedNotesVehicle.updatedAt =

            new Date().toLocaleString(
                "ar-SA"
            );


        saveData();

        displayVehicles();

        closeNotesModal();


    }

);
//==================================================
// SEARCH
//==================================================

search.addEventListener(

    "input",

    function(){

        const value =

            this.value
            .trim()
            .toLowerCase();


        // إذا كانت خانة البحث فارغة

        if(value === ""){

            displayVehicles();

            return;

        }


        // البحث في البيانات

        const result =

            vehicles.filter(vehicle => {


                return(

                    vehicle.number
                    .toLowerCase()
                    .includes(value)

                    ||

                    vehicle.driver
                    .toLowerCase()
                    .includes(value)

                    ||

                    vehicle.notes
                    .toLowerCase()
                    .includes(value)

                );

            });


        displayVehicles(
            result
        );

    }

);


//==================================================
// CLOSE MODALS BY CLICKING OUTSIDE
//==================================================

window.addEventListener(

    "click",

    function(event){

        // نافذة بيانات المركبة

        if(

            event.target ===
            vehicleModal

        ){

            closeVehicleModal();

        }


        // نافذة الملاحظات

        if(

            event.target ===
            notesModal

        ){

            closeNotesModal();

        }

    }

);


//==================================================
// INITIALIZE SYSTEM
//==================================================


// حذف البيانات القديمة مرة واحدة فقط عند أول تشغيل
// بعد التأكد من ظهور جميع البيانات الجديدة بشكل صحيح
// قم بحذف السطر التالي من الملف.

localStorage.removeItem(
    "ATP_FLEET_DATA"
);


loadData();

displayVehicles();


//==================================================
// END OF FILE
//==================================================
