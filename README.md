# My Restaurant--ver2.0

## 目錄(Summary)

* [專案概述(Project Description)](#1)
* [開發工具與環境(Prerequisites)](#2)
* [測試用資料(Testing Data)](#3)
* [專案畫面(Running the tests)](#4)
* [使用者故事(User Story)](#5)
* [專案安裝流程(Installing)](#6)
* [專案開發人員(Contributor)](#7)

<h2 id="1"> 專案概述(Project Description)</h2>

>--ver1.0--
>
>使用者可在搜尋框輸入餐廳名稱或餐廳分類進行餐廳搜尋，點擊餐廳卡片會顯示該餐廳詳細資訊

>--ver2.0--
>
>使用者可在後台管理介面進行餐廳清單的增刪查改作業，首頁與後台管理皆有排序與分頁功能

<h2 id="2"> 開發工具與環境(Prerequisites)</h2>



01. Windows 10
02. [VSCode](https://code.visualstudio.com/download)
03. [Git](https://git-scm.com/)
04. [Fork](https://git-fork.com//)
05. [nvm](https://github.com/coreybutler/nvm-windows/releases) ([nvm安裝教學](https://www.onejar99.com/nvm-install-for-windows/))
06. Node.js (LTS 16.14.2)([安裝教學](https://www.onejar99.com/nvm-install-for-windows/))
07. Express(@4.16.4)
08. JavaScript
09. [Bootstrap (v5.0.2)](https://getbootstrap.com/docs/5.0/getting-started/introduction/)
10. MongoDB database

<h2 id="3"> 測試用資料(Testing Data)</h2>
可參考下表或自行新增

| Option         | Description                                                              |
|----------------|--------------------------------------------------------------------------|
| 餐廳中文名     | RW Coffee                                                                |
| 餐廳英文名     | RW Coffee                                                                |
| 餐廳類別       | 咖啡                                                                     |
| 餐廳照片       | https://pic.pimg.tw/lili0504/1591525154-33873464_l.jpg                  |
| 餐廳地址       | 台南市東區東興路4號                                                      |
| 餐廳電話       | 06 235 9600                                                              |
| 餐廳Google Map | https://g.page/RWcoffee?share                                            |
| 餐廳評分       | 4.9                                                                      |
| 餐廳簡介       | 自家烘培的豆子，帶給你口味多樣的各式咖啡，也有其他飲品喔～歡迎大家前來品嚐。 |



<h2 id="4"> 專案畫面(Running the tests)</h2>

### 首頁
[index](https://i.imgur.com/NvnWvou.gifv)

### 後台管理
[backstage](https://i.imgur.com/2h0j5Sf.gifv)

### Heroku
https://nameless-woodland-00373.herokuapp.com/


<h2 id="5"> 使用者故事(User Story)</h2>

1. 使用者可以在搜尋框輸入餐廳中、英關鍵字進行搜尋
2. 使用者可以在搜尋框輸入餐廳類別關鍵字進行搜尋
3. 使用者可以瀏覽全部餐廳
4. 使用者可以點擊某一餐廳卡片查看該餐廳詳細資訊
5. 使用者可以點擊箭頭符號跳轉至Google Map
6. 使用者可以選擇排序類型將內容進行排序
7. 使用者可以點擊分頁按鈕切換內容
8. 使用者可以新增新的餐廳資料
9. 使用者可以修改舊的餐廳資料
10. 使用者可以批次刪除餐廳資料
11. 使用者可以單獨刪除餐廳資料
12. 使用者可以新增餐廳類別
13. 使用者可以在增刪查改錯誤時得到對應的提示視窗

<h2 id="6">專案安裝流程(Installing)</h2>

>1. 打開終端機(Git Bash or Terminal)，進入您要clone此專案的目錄底下(EX：D槽)
```
$ cd d:
```

>2. Clone 此專案至該目錄底下
```
$  git clone https://github.com/HungXingYu/07.My_Restaurant.git
```

>3. 進入此專案資料夾
```
$ cd 07.My_Restaurant
```

>4. 安裝npm套件
```
$  npm install
```

>5. 新增.env建立環境變數
```
在/07.My_Restaurant底下，也就是該專案的根目錄資料夾新增.env，並在.env內設定環境變數:MONGODB_URI
```

>6. 新增種子資料
```
$ npm run seed
當終端機出現以下內容，代表資料新增完成
Restaurants collection done
RestaurantCategory collection done
```

>7. 啟動伺服器並執行app.js
```
$ nodemon app.js
當終端機最後出現以下內容，代表伺服器成功啟動
Express app listening on port 3000.
mongodb connected!
```

>8. 開啟任一瀏覽器，輸入 http://localhost:3000 即可開始使用此專案

>9. 若要關閉程式請在終端機使用Ctrl+C

<h2 id="7">專案開發人員(Contributor)</h2>

> ### Clarehung 、ALPHAcamp學期2-3課程教案
