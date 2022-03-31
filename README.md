# My Restaurant--ver1.0

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

<h2 id="2"> 開發工具與環境(Prerequisites)</h2>



01. Windows 10
02. [VSCode](https://code.visualstudio.com/download)
03. [Git](https://git-scm.com/)
04. [Fork](https://git-fork.com//)
05. [nvm](https://github.com/coreybutler/nvm-windows/releases) ([nvm安裝教學](https://www.onejar99.com/nvm-install-for-windows/))
06. Node.js (LTS 16.14.2)([安裝教學](https://www.onejar99.com/nvm-install-for-windows/))
07. Express(@4.16.4)
08. JavaScript
09. [Bootstrap (v4.5)](https://getbootstrap.com/docs/4.5/getting-started/introduction/)

<h2 id="3"> 測試用資料(Testing Data)</h2>

1.搜尋義式餐廳
2.搜尋a

<h2 id="4"> 專案畫面(Running the tests)</h2>

### 首頁
![homePage](/public/img/homePage.png)

### 搜尋畫面
![searchPage](/public/img/searchPage.png)

### 詳細資料畫面
![showPage](/public/img/showPage.png)

<h2 id="5"> 使用者故事(User Story)</h2>

1. 使用者可以在搜尋框輸入餐廳中、英關鍵字進行搜尋
2. 使用者可以在搜尋框輸入餐廳類別關鍵字進行搜尋
3. 使用者可以瀏覽全部餐廳
4. 使用者可以點擊某一餐廳卡片查看該餐廳詳細資訊
5. 使用者可以點擊箭頭符號跳轉至Google Map

<h2 id="6">專案安裝流程(Installing)</h2>

>1. 打開終端機(Git Bash or Terminal)，進入您要clone此專案的目錄底下(EX：D槽)
>```
>$ cd d:
>```

>2. Clone 此專案至該目錄底下
>```
>$  git clone https://github.com/HungXingYu/07.My_Restaurant.git
>```

>3. 進入此專案資料夾
>```
>$ cd 07.My_Restaurant
>```

>4. 安裝npm套件
>```
>$  npm install
>```

>5. 啟動伺服器並執行app.js
>```
>$ nodemon app.js
>```
>當終端機最後出現以下內容，及代表伺服器成功啟動
>```
>Express app listening on port 3000.
>```

>6. 開啟任一瀏覽器，輸入 http://localhost:3000 即可開始使用此專案

<h2 id="7">專案開發人員(Contributor)</h2>

> ### Clarehung 、ALPHAcamp學期2-3課程教案