let count = 0;
let clickPower = 1; // 1クリックで増える量
let rebornIndex = 0; // 現在のリボーン回数
let rebornThresholds = [100, 300, 500, 900, 1500]; 

let countDisplay = document.getElementById('count');
let clickPowerDisplay = document.getElementById('click-power');
let myButton = document.getElementById('my-button');
let rebornButton = document.getElementById('reborn-button');

let modal = document.getElementById('modal');
let modalText = document.getElementById('modal-text');
let modalOk = document.getElementById('modal-ok');
let modalCancel = document.getElementById('modal-cancel');

// ショップモーダル用の変数
let shopButton = document.getElementById('shop-text');
let modalShop = document.getElementById('modal-shop');
let modalShopText = document.getElementById('modal-shop-text');

// クリックカウンター
myButton.addEventListener('click', function() {
  count += clickPower;
  countDisplay.textContent = count;

  if (count === 10) countDisplay.style.color = 'red';
  if (count === 50) countDisplay.style.color = 'blue';
  if (count >= 100) countDisplay.style.color = 'green';
});

// リボーンボタン
rebornButton.addEventListener('click', function() {
  let threshold = rebornThresholds[rebornIndex] || Infinity; 
  if (count < threshold) {
    modalText.textContent = `クリック数が${threshold}回行ったらリボーンできるよ`;
    modalCancel.style.display = "none";
  } else {
    modalText.textContent = `リボーンしますか？（クリックパワー +1）`;
    modalCancel.style.display = "inline-block";
  }
  modal.classList.remove('hidden');
});

// ショップボタンをクリックでモーダルを表示
shopButton.addEventListener('click', function() {
  modalShop.classList.remove('hidden-shop'); // 表示
  modalShopText.textContent = "ショップを開きました！"; // テキスト更新
});

// OKボタン
modalOk.addEventListener('click', function() {
  let threshold = rebornThresholds[rebornIndex] || Infinity;
  if (count >= threshold) {
    count = 0;
    clickPower++;
    rebornIndex++;
    countDisplay.textContent = count;
    clickPowerDisplay.textContent = clickPower; // ← ここで更新
    countDisplay.style.color = '#555555';
  }
  modal.classList.add('hidden');
});

// キャンセル
modalCancel.addEventListener('click', function() {
  modal.classList.add('hidden');
});

let modalShopClose = document.getElementById('modal-shop-close');
modalShopClose.addEventListener('click', function() {
  modalShop.classList.add('hidden-shop'); // 非表示
});

//ショップボタン１
let shopone = document.getElementById('shop-one');
let shoponeCount = 0; // 購入回数を管理
let nanshopone = document.getElementById('nanshop-one'); // ←これが必要

shopone.addEventListener('click', function() {
  if (count < 10) {
    alert("クリック数が足りません！");
    return;
  }

  // 10クリックを消費
  count -= 10;
  countDisplay.textContent = count;

  // 自動クリック開始（1秒ごとに1増加）
  setInterval(function() {
    count += 1;
    countDisplay.textContent = count;

    if (count === 10) countDisplay.style.color = 'red';
    if (count === 50) countDisplay.style.color = 'blue';
    if (count >= 100) countDisplay.style.color = 'green';
  }, 1000);


  // 購入回数を増やす
  shoponeCount++;
  nanshopone.textContent = shoponeCount; // ←ここでspanに数字を反映
});


