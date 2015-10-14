### brewのインストール
```
# ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

### phantomjsのインストール
```
# brew install phantomjs
# phantomjs -v
1.9.8
```

### casperjsのインストール
```
# brew install casperjs --devel
# casperjs --version
1.1.0-beta3
```

### 実行方法
```
# git clone <このリポジトリURL>
# npm install

backgroundでサーバーを立ち上げる
# npm start

backgroundでサーバーを立ち上がっている状態で
# casperjs main.js <対象のURL>
例) casperjs main.js http://yahoo.co.jp
```

### メモ
- screenshots/yyyymmdd-hhmmss のディレクトリにスクリーンショットが作成される。
- htdocsでpdfにする元のhtmlを配置しブラウザからアクセスする。
- 最終成果物はPDF
