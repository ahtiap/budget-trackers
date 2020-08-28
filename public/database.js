//  // create record
//  let transaction = {
//     name: nameEl.value,
//     value: amountEl.value,
//     date: new Date().toISOString()
//   };

const indexDb = window.indexedDB;
let db;
const req = indexDb.open("budget", 1);

req.onupgradeneeded = ({ target }) => {
  db = target.result;
  db.createObjectStore("pending", { autoIncrement: true });
};

req.onsuccess = ({ target }) => {
  db = target.result;
  if (navigator.onLine) {
    checkDb();
  }
};

function saveRecord(record) {
  const trans = db.transanction(["pending"], "readwrite");
  const store = trans.objectStore("pending");
  store.add(record);
}

function checkDb() {
  const trans = db.transanction(["pending"], "readwrite");
  const store = trans.objectStore("pending");
  const get = store.getAll();
  get.onsuccess = function () {
    // post all the records saved offline to the online db
    // fetch("/api/transaction", {
    //     method: "POST",
    //     body: JSON.stringify(transaction),
    //     headers: {
    //       Accept: "application/json, text/plain, */*",
    //       "Content-Type": "application/json"
    //     }
    //   })
    fetch();
  };
}

window.addEventListener("online", checkDb());
