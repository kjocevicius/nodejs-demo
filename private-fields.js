class MyClass {
    #x = 10

    get x() {
        return this.#x
    }
}

const o = new MyClass();
console.log(o.#x);
// console.log(o.x);