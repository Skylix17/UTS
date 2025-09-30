class Customer {
    constructor(nomor, nama, service) {
        this.nomor = nomor;
        this.nama = nama;
        this.service = service;
    }
}

class bankantrian {
    constructor(prefix="T") {
    this.items = []; //array antrian
    this.prefix = prefix; // hitung nomor
    this.counter = 0;
  }
generateNumber(){
    this.counter++;
    return this.prefix + String(this.counter).padStart(3,"0");
  }
  enqueue(nama, service){
    const num = this.generateNumber();
    const cust = new Customer(num, nama, service);
    this.items.push(cust); // masuk ke belakang
    return cust;
  }
  dequeue(){ return this.items.shift() || null; } // keluar dari depan
  peek(){ return this.items[0] || null; } // lihat depan
  all(){ return [...this.items]; } // copy isi array
}

// ===== App logic =====
const q = new bankantrian();
let current = null;

const nameInput = document.getElementById("nameInput");
const list = document.getElementById("queueList");
const now = document.getElementById("now");

function render(){
  now.textContent = current ? `${current.nomor} - ${current.nama}` : "-";
  list.innerHTML = "";
  q.all().forEach(c=>{
    const li = document.createElement("li");
    li.textContent = `${c.nomor} - ${c.nama}`;
    list.appendChild(li);
  });
}

document.getElementById("addBtn").onclick = ()=>{
  if(!nameInput.value.trim()) return;
  q.enqueue(nameInput.value.trim());
  if(!current) current = q.dequeue(); // otomatis layani pertama
  nameInput.value="";
  render();
};

document.getElementById("nextBtn").onclick = ()=>{
  current = q.dequeue();
  render();
};

render();
