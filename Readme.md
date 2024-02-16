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
npm install @babel/plugin-transform-runtime

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

menambahkan file babel.config.json
```
{
  "presets": [
    "@babel/preset-env"
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "regenerator": true
      }
    ]
  ]
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

```
//src/async.js
export const sayHelloAsync = (name) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (name) {
                resolve(`Hello ${name}`);
            } else {
                reject("Name is empty");
            }
        }, 1000);
    });
};

export const getBalance = async (name, from) => {
    const balance = await from();
    return {
        name: name,
        balance: balance
    };
};
```

```
//test/async.test.js
import {sayHelloAsync} from "../src/async.js";

test("test async function", async () => {
    const result = await sayHelloAsync("Edy");
    expect(result).toBe("Hello Edy");
});

test("test async matchers", async () => {
    await expect(sayHelloAsync("Edy")).resolves.toBe("Hello Edy");
    await expect(sayHelloAsync()).rejects.toBe("Name is empty");
});
```

npx jest async.test.js
expect(promise).resolves : Ekspektasi bahwa promise sukses, dan selanjutnya kita bisa gunakan Matchers function lainnya

expect(promise).rejects : Ekspektasi bahwa promise gagal, dan selanjutnya kita bisa gunakan Matchers function lainnya


14. Setup Function
beforeEach(function) :
Function akan dieksekusi sebelum unit test berjalan, jika terdapat lima unit test dalam file, artinya akan dieksekusi juga sebanyak lima kali

afterEach(function) :
Function akan dieksekusi setelah unit test selesai, jika terdapat lima unit test dalam file, artinya akan dieksekusi juga sebanyak lima kali

One-Time Setup Function
beforeAll(function) : Function akan dieksekusi sekali sebelum semua unit test berjalan di file unit test

afterAll(function) : Function akan dieksekusi sekali setelah semua unit test selesai di file unit test



```
//test/setup.test.js
import {sum} from "../src/sum.js";

beforeAll(async () => {
    console.info("Before All");
});

afterAll(async () => {
    console.info("After All");
});

beforeEach(async () => {
    console.info("Before Each");
});

afterEach(async () => {
    console.info("After Each");
});

test("first test", async () => {
    expect(sum(10, 10)).toBe(20);
    console.info("First Test");
})

test("second test", () => {
    expect(sum(10, 10)).toBe(20);
    console.info("Second Test");
})
```

15. Scoping

Saat kita menggunakan Setup Function, secara default akan dieksekusi pada setiap test() function yang terdapat di file unit test
Jest memiliki fitur scoping atau grouping, dimana kita bisa membuat group unit test menggunakan function describe()
Setup Function yang dibuat di dalam describe() hanya digunakan untuk unit test di dalam describe() tersebut
Namun Setup Function diluar describe() secara otomatis juga digunakan di dalam describe()

```
//test/scoping.test.js
beforeAll(() => console.info("Before All Outer"));
afterAll(() => console.info("After All Outer"));
beforeEach(() => console.info("Before Each Outer"));
afterEach(() => console.info("After Each Outer"));

test("Test Outer", () => console.info("Test Outer"));

describe("Inner", () => {

    beforeAll(() => console.info("Before All Inner"));
    afterAll(() => console.info("After All Inner"));
    beforeEach(() => console.info("Before Each Inner"));
    afterEach(() => console.info("After Each Inner"));

    test("Test Inner", () => console.info("Test Inner"));

});
```
16. Code Coverage

Saat kita membuat unit test, kadang kita ingin tahu apakah semua kode kita sudah tercakupi dengan semua skenario unit test kita atau belum
Jest memiliki fitur yang bernama Code Coverage, dengan ini, kita bisa melihat kode mana yang sudah tercakupi dengan unit test, dan mana yang belum
Praktek ini merupakan salah satu best practice dengan menentukan jumlah persentase kode yang harus tercakupi oleh unit test, misal 80%

package.json
```
 "jest": {
    "maxConcurrency" : 2,
    "verbose": true,
    "transform": {
      "^.+\\.[t|j]sx?$": "babel-jest"
    },
    "collectCoverage": true,
```

Jest Code Coverage secara otomatis membuat folder coverage di project kita
Jangan lupa untuk meng-ignore folder tersebut agar tidak ter commit ke project kita
Folder coverage tersebut berisi laporan Code Coverage berupa file html yang bisa kita lihat dengan mudah

Coverage Threshold

Kadang ada kalanya kita ingin memastikan persentase Code Coverage, hal ini agar programmer dalam project pasti membuat unit test dengan baik
Jest memiliki fitur untuk menentukan Coverage Threshold dengan persentase, dimana jika Threshold nya dibawah persentase yang sudah ditentukan, secara otomatis maka unit test akan gagal

package.json

```
  "jest": {
    "maxConcurrency" : 2,
    "verbose": true,
    "transform": {
      "^.+\\.[t|j]sx?$": "babel-jest"
    },
    "collectCoverage": true,
    "coverageThreshold": {
      "global": {
        "branches": 100,
        "functions": 100,
        "lines": 100,
        "statements": 100
      }
    },
    "collectCoverageFrom": [
      "src/**/*.{js,jsx}",
      "!vendor/**/*.{js,jsx}"
    ]
  },
```

Collect Coverage

Kadang saat project kita sudah besar, kita ingin menentukan bagian kode mana yang ingin digunakan untuk menghitung Code Coverage nya
Kita bisa menggunakan atribut collectCoveerageFrom

17. It Function

Sebelumnya untuk membuat unit test, kita menggunakan function test()
Di Jest, terdapat alias untuk function test(), yaitu it()
Sebenarnya tidak ada bedanya dengan function test(), hanya saja, kadang ada programmer yang lebih suka menggunakan function it() agar unit test yang dibuat mirip dengan cerita ketika dibaca kodenya

```
import {sumAll} from "../src/sum.js";

describe("when call sumAll()", () => {
    it("should get 30 with parameter [10, 10, 10]", () => {
        expect(sumAll([10, 10, 10])).toBe(30);
    });
    it("should get 50 with parameter [10, 10, 10, 10, 10]", () => {
        expect(sumAll([10, 10, 10, 10, 10])).toBe(50);
    });
});
```

18. Skip Function

Saat membuat unit test, lalu kita mendapatkan masalah di salah satu unit test, kadang kita ingin meng-ignore unit test tersebut terlebih dahulu
Kita tidak perlu menambahkan komentar pada unit test tersebut
Kita bisa menggunakan skip function, yang secara otomatis akan menjadikan unit test tersebut ter-ignore dan tidak akan di eksekusi

```
test("test 1", () => console.info("test 1"));
test("test 2", () => console.info("test 2"));
test.skip("test 3", () => console.info("test 3"));
test("test 4", () => console.info("test 4"));
test("test 5", () => console.info("test 5"));
```

19. Only Function

Ketika kita melakukan proses debugging di unit test di dalam sebuah file yang unit test nya banyak, kadang kita ingin fokus ke unit test tertentu
Jika kita menggunakan skip unit test yang lain, maka akan sulit jika terlalu banyak
Kita bisa menggunakan Only Function, untuk memaksa dalam file tersebut, hanya unit test yang ditandai dengan Only yang di eksekusi

```
test("test 1", () => console.info("test 1"));
test("test 2", () => console.info("test 2"));
test.only("test 3", () => console.info("test 3"));
test("test 4", () => console.info("test 4"));
test("test 5", () => console.info("test 5"));
```

20. Each Function

Duplicate Unit Test
Salah satu kesalahan yang biasa dilakukan adalah membuat unit test yang duplicate
Biasanya alasan melakukan duplicate unit test, hanya karena data yang di test nya saja berbeda

```
import {sumAll} from "../src/sum.js";


test("sumAll [10, 10, 10]", () => {
        expect(sumAll([10, 10, 10])).toBe(30);
    });

test("sumAll [10, 10, 10, 10, 10]", () => {
     expect(sumAll([10, 10, 10, 10, 10])).toBe(50);
    });

```

Each Function

Pada kasus seperti ini, dimana kode unit test nya tidak berbeda, yang berbeda hanya datanya saja, sangat direkomendasikan menggunakan Each Function di Jest
Each Function memungkinkan kita menggunakan data dalam bentuk array, yang akan di iterasi ke dalam kode unit test yang sama

```
import {sumAll} from "../src/sum.js";

const table = [
    [
        [],
        0
    ],
    [
        [10],
        10
    ],
    [
        [10, 10, 10],
        30
    ],
    [
        [10, 10, 10, 10, 10],
        50
    ],
    [
        [10, 10, 10, 10, 10, 10, 10],
        70
    ]
];

test.each(table)("test sumAll(%s) should result %i", (numbers, expected) => {
    expect(sumAll(numbers)).toBe(expected);
})
```

Object Sebagai Data
Kadang, saat menggunakan data Array, jika terlalu banyak parameternya, maka akan membingungkan
Each Function juga bisa menggunakan data Object, namun kita perlu melakukan destructuring

```
import {sumAll} from "../src/sum.js";

const table = [
    {
        numbers: [],
        expected: 0
    },
    {
        numbers: [10],
        expected: 10
    },
    {
        numbers: [10, 10, 10],
        expected: 30
    },
    {
        numbers: [10, 10, 10, 10, 10],
        expected: 50
    },
    {
        numbers: [10, 10, 10, 10, 10, 10, 10],
        expected: 70
    },
];

test.each(table)("test sumAll($numbers) should result $expected", ({numbers, expected}) => {
    expect(sumAll(numbers)).toBe(expected);
})
```

21. Todo Function

Gunakan Todo Function ketika kita berencana membuat unit test, namun dilakukan
Todo Function akan ditampilkan sebagai summary ketika kita menjalankan unit test, untuk mengingatkan kita

```
test.todo("Create test for sumAll() with big numbers");

test.todo("Create test for sumAll() with negative numbers");
```

22. Failing Function
Dalam membuat unit test, jangan hanya membuat skenario sukses
Kadang kita juga perlu membuat skenario gagal, atau ekspektasi kita gagal, contoh misal ketika kita mengirim data tidak valid, maka kita berharap kalo kode nya terjadi error
Pada kasus ini, Jest menyediakan fitur Failing Function

```
import {sayHello} from "../src/sayHello.js";

test("sayHello success", () => {
    expect(sayHello("Edy")).toBe("Hello Edy");
});

test.failing("sayHello error", () => {
    sayHello(null);
});

test("sayHello error matchers", () => {
    expect(() => sayHello(null)).toThrow();
});
```

23. Mock

Kesulitan Unit Test

Saat membuat unit test, kadang kita terkendala dengan bagian kode yang sulit di test
Misal, terdapat kode yang melakukan interaksi dengan sistem lain, misal database, message broker, third party web service, dan lain-lain
Jika kita lakukan unit test dengan cara berinteraksi secara langsung, maka akan sulit untuk konsisten, misal unit test pertama sukses, ketika dijalankan lagi, ternyata gagal karena datanya sudah ada yang sebelumnya
Pada kasus seperti ini, ada baiknya kita melakukan Mocking

Dalam pemrograman, Mock Object adalah object tiruan yang kita buat, yang tingkah lakunya menyerupai dengan object aslinya
Salah satu fitur dalam Mock Object adalah, kita bisa memberitahu tingkah laku dari object tersebut sesuai dengan yang kita inginkan
Mock Object ini menjadi sangat cocok untuk kita gunakan ketika melakukan unit test yang berhubungan dengan sistem lain, sehingga kita tidak perlu berinteraksi dengan sistem lain tersebut

Jenis Mock

Jest mendukung banyak jenis Mock, diantaranya
Mock Function, yang bisa kita gunakan untuk membuat tiruan dari sebuah function
Mock Class, yang bisa kita gunakan untuk membuat tiruan dari object Class
Mock Modules, yang bisa kita gunakan untuk membuat tiruan dari Modules

23.a. Mock Function

Jest bisa digunakan untuk membuat mock function
Dimana kita bisa membuat tiruan dari sebuah function
Salah satu fitur dari mock function adalah, kita bisa melihat detail dari parameter yang digunakan untuk memanggil mock function tersebut
Untuk membuat mock function, kita bisa menggunakan jest.fn()

