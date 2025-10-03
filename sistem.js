class Customer {
    constructor(nomor, nama, service) {
        this.nomor = nomor;
        this.nama = nama;
        this.service = service;
    }
}

class BankQueue {
    constructor(prefix="T") {
        this.items = [];   // array antrian
        this.prefix = prefix;
        this.counter = 0;
        this.history = []; // history nasabah selesai
    }

    generateNumber() {
        this.counter++;
        return this.prefix + String(this.counter).padStart(3,"0");
    }

    enqueue(nama, service) {
        const num = this.generateNumber();
        const cust = new Customer(num, nama, service);
        this.items.push(cust);
        return cust;
    }

    dequeue() { return this.items.shift() || null; }
    peek() { return this.items[0] || null; }
    all() { return [...this.items]; }
    allHistory() { return [...this.history]; }
}

// ===== App logic =====
const q = new BankQueue();
let current = null;

const nameInput = document.getElementById("nameInput");
const serviceSelect = document.getElementById("serviceSelect");
const list = document.getElementById("queueList");
const now = document.getElementById("now");
const historyList = document.getElementById("historyList");


function render() {
    // Tampilkan nasabah yang sedang dilayani
    if (current) {
        now.innerHTML = `
            ${current.nomor} - ${current.nama} (${current.service})
            <button id="doneBtn">Selesai</button>
        `;
        document.getElementById("doneBtn").onclick = () => {
            q.history.push(current);   // simpan ke history
            current = q.dequeue();     // ambil berikutnya
            render();
        };
    } else {
        now.textContent = "-";
    }

    // Render daftar antrian
    list.innerHTML = "";
    q.all().forEach(c => {
        const li = document.createElement("li");
        li.textContent = `${c.nomor} - ${c.nama} (${c.service})`;
        list.appendChild(li);
    });

    // Render history
    historyList.innerHTML = "";
    q.allHistory().forEach(h => {
        const li = document.createElement("li");
        li.textContent = `${h.nomor} - ${h.nama} (${h.service}) ✅`;
        historyList.appendChild(li);
    });
}

document.getElementById("addBtn").onclick = () => {
    if (!nameInput.value.trim()) return;
    q.enqueue(nameInput.value.trim(), serviceSelect.value);
    if (!current) current = q.dequeue(); // otomatis layani pertama
    nameInput.value = "";
    render();
};

render();