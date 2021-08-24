window.addEventListener("DOMContentLoaded", () => {
  //画像の取得
  //引数  : string, number
  //返り値: array
  const getImages = async (dogType, number) => {
    const url = `https://dog.ceo/api/breed/${dogType}/images/random/${number}`;
    const response = await fetch(url);
    const json = await response.json();

    return json.message;
  };

  //画像を表示
  //引数  : array
  const updateImages = (images) => {
    const app = document.getElementById("app");
    app.hasChildNodes() ? app.removeChild(app.querySelector("ul")) : "";

    const ul = document.createElement("ul");
    images.forEach((url) => {
      const li = document.createElement("li");
      const img = document.createElement("img");
      img.setAttribute("src", url);
      li.appendChild(img);
      ul.appendChild(li);
    });

    app.appendChild(ul);
  };

  //犬種セレクトエリアの生成
  const createSelectorType = async () => {
    const url = "https://dog.ceo/api/breeds/list/all";
    const response = await fetch(url);
    const json = await response.json();
    const types = json.message;

    const selectorType = document.getElementById("selector-type");
    const select = document.createElement("select");

    for (const type in types) {
      const option = document.createElement("option");
      option.setAttribute("value", type);
      option.textContent = type;
      select.appendChild(option);
    }

    selectorType.appendChild(select);
  };

  //数値セレクトエリアの生成
  const createSelectorNumber = () => {
    const defaultNumber = 3;
    const min = 1;
    const max = 9;
    const numbers = [...Array(max - min + 1)].map((_, i) => min + i);

    const selectorNumber = document.getElementById("selector-number");
    const select = document.createElement("select");

    numbers.forEach((v) => {
      const option = document.createElement("option");
      option.setAttribute("value", v);
      option.textContent = v;
      v === defaultNumber ? option.setAttribute("selected", true) : "";
      select.appendChild(option);
    });

    selectorNumber.appendChild(select);
  };

  //メイン
  const main = async () => {
    const dogType = document.querySelector("#selector-type select").value;
    const number = document.querySelector("#selector-number select").value;
    const images = await getImages(dogType, number);
    updateImages(images);
  };

  //ボタンクリック時に実行
  document.getElementById("button-submit").addEventListener("click", main);

  //ページ読み込み時に1回だけ実行
  (async () => {
    Promise.all([createSelectorType(), createSelectorNumber()]).then(() => {
      main();
    });
  })();
});
