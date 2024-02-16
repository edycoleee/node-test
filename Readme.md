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

Contoh Test Equal
```
//src/equal.js
export const stringSama = (nama) => {
    return nama;
}

export const objectSama = (person) => {
    return person;
}
```

```
//test/equal.test.js
import { objectSama, stringSama } from "../src/equal";

test("test toBe", () => {
    const name = stringSama("Edi") ;
    const hello = `Hello ${name}`;

    expect(hello).toBe('Hello Edi');
});

test("test toEqual", () => {
    let person = {id: "1"};
    Object.assign(person, {name: "Edi"});

    const testObject = objectSama(person)
    expect(testObject).toEqual({id: "1", name: "Edi"});
})
```
jalankan test : npx jest equal.test.js

7. Truthiness Matchers

Dalam unit test, kadang kita ingin membedakan antara undefined, null dan false

expect(value).toBeNull()
expect(value).toBeUndefined()
expect(value).toBeDefined()
expect(value).toBeTruthy()
Memastikan value bernilai apapun, asal if statement menganggap true
expect(value).toBeFalsy()
Memastikan value bernilai apapun, asal if statement menganggap false

```
test("truthiness", () => {

    let value = null;
    expect(value).toBeNull();
    expect(value).toBeDefined();
    expect(value).toBeFalsy();

    value = undefined;
    expect(value).toBeUndefined();
    expect(value).toBeFalsy();

    value = "Edy";
    expect(value).toBeTruthy();
    expect(value).toBe("Edy");

});
```

8. Numbers Matchers Functions

.toBeGreaterThan(n) : Memastikan value lebih besar dari n

.toBeGreaterThanOrEqual(n) :Memastikan value lebih besar atau sama dengan n

.toBeLessThan(n) : Memastikan value lebih kecil dari n

.toBeLessThanOrEqual(n) : Memastikan value lebih kecil atau sama dengan n

```
test("numbers", () => {

    const value = 2 + 2;

    expect(value).toBeGreaterThan(3);
    expect(value).toBeGreaterThanOrEqual(4);

    expect(value).toBeLessThan(5);
    expect(value).toBeLessThanOrEqual(4);

    expect(value).toBe(4);

});
```

9. Strings Matchers

.toMatch(regex) : Memastikan value sesuai dengan regex

toBe() atau toEqual()

```
test("string", () => {
    const name = "Eko Kurniawan Khannedy";

    expect(name).toBe("Eko Kurniawan Khannedy");
    expect(name).toMatch(/awan/);
});
```

10. Arrays Matchers

Jika ingin memastikan bahwa array sama, kita bisa menggunakan toEqual()

.toContain(item) : Memastikan value array memiliki item, dimana pengecekan item menggunakan toBe()

.toContainEqual(item) : Memastikan value array memiliki item, dimana pengecekan item menggunakan toEqual()

```
test("array simple", () => {
    const names = ["edy", "kholid", "mawardi"];
    expect(names).toEqual(["edy", "kholid", "mawardi"]);
    expect(names).toContain("edy");
});

test("array object", () => {
    const persons = [
        {
            name: "Edy"
        },
        {
            name: "kholid"
        }
    ];
    expect(persons).toContainEqual({
        name: "Edy"
    });
});
```

11. Exceptions Matchers

Khusus untuk jenis matchers exception, kita perlu menggunakan closure function di value expect() nya, hal ini untuk memastikan exception ditangkap oleh matchers, jika tidak menggunakan closure function, maka exception akan terlanjur terjadi sebelum kita memanggil expect() function

.toThrow() : Memastikan terjadi exception apapun

.toThrow(exception) : Memastikan terjadi exception sesuai dengan expected exception

.toThrow(message) : Memastikan terjadi exception sesuai dengan expected exception

```
export class MyException extends Error {

}

export const callMe = (name) => {
    if (name === "Edy") {
        throw new MyException("Ups my exceptions happens");
    } else {
        return "OK";
    }
};
```

```
import {callMe, MyException} from "../src/exception.js";

test("exception", () => {
    expect(() => callMe("Edy")).toThrow();
    expect(() => callMe("Edy")).toThrow(MyException);
    expect(() => callMe("Edy")).toThrow("Ups my exceptions happens");
});

test("exception not happens", () => {
    expect(callMe("Budi")).toBe("OK");
});
```

12. Not Matchers

Jest memiliki fitur untuk melakukan “not” di Matchers nya, dengan menggunakan property not di matchers, secara otomatis kita akan melakukan pengecekan kebalikannya.
Misal tidak sama dengan, tidak lebih dari, tidak contains, dan lain-lain

```
test("string.not", () => {
    const name = "Edy Kholid Mawardi";

    expect(name).not.toBe("Joko");
    expect(name).not.toEqual("Joko");
    expect(name).not.toMatch(/joko/);
});

test("number.not", () => {
    const value = 2 + 2;

    expect(value).not.toBeGreaterThan(6);
    expect(value).not.toBeLessThan(3);
    expect(value).not.toBe(10);
});
```

13. Test Async Code

Jest terintegrasi dengan baik jika kita ingin melakukan pengetesan terhadap kode yang async
Namun saat kita melakukan pengetesan kode async, kita harus memberi tahu ke Jest, hal ini agar Jest tahu dan bisa menunggu kode async nya, sebelum melanjutkan ke unit test selanjutnya


