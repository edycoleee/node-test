## BELAJAR NODE JS UNIT TEST

1. Persiapan
```
npm init
npm install jest --save-dev

```
2. Konfigurasi package.json
```
  "main": "./src/index.js",
  "type": "module",
  "scripts": {
    "test": "jest"
  },
```

3. Masalah Babel
Sayangnya, Jest sampai dibuatnya materi ini, belum mendukung JavaScript Modules, masih menggunakan cara lama menggunakan CommonJS dengan memanfaatkan function require()
Untungnya, ada library bernama Babel, yang bisa kita gunakan untuk membantu Jest
Babel adalah JavaScript Compiler, yang digunakan untuk melakukan kompilasi kode JavaScript ke kode JavaScript yang berbeda versi, biasanya untuk ke versi yang lebih lama agar kompatibel dengan Browser versi lama


```
npm install --save-dev babel-jest
npm install @babel/preset-env --save-dev
```

Menambahkan script di package.json
```
  "scripts": {
    "test": "jest"
  },
    "jest": {
    "verbose": true,
    "transform": {
      "^.+\\.[t|j]sx?$": "babel-jest"
    }
  },
```

Membuat file babel.config.json :

```
{
  "presets": ["@babel/preset-env"]
}
```


4. Sum Function
membuat file \src\sum.js

```
export const sum = (first, second) => {
    return first + second;
}
```
membuat file \test\sum.jest.js

```
import {sum, sumAll} from "../src/sum.js";

test("test sum function 1", () => {

    const result = sum(1, 2);

    expect(result).toBe(3);

});
```

5. Jalankan Test 
```
//Jalankan test semua
npm test 

 PASS  test/sum.test.js
  √ test sum function 1 (2 ms)

//Jalankan test per function dalam file
npx jest --testNamePattern "test sum function 2" 

//Jalankan test satu file
npx jest sum.test.js
```

6. Equals Matchers Functions

expect(value).toBe(expected) : 
Value sama dengan expected, biasanya digunakan untuk value bukan object

expect(value).toEqual(expected) : 
Value sama dengan expected, dimana membandingkan semua properties secara recursive, atau dikenal dengan deep equality


```

```