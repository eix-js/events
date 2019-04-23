import { expect } from "chai"
import { EventEmitter } from "events";

describe("Test EventEmitter", () => {
    it("should emit events", () => {
        const emitter = new EventEmitter()
        emitter.emit("event")
    })
    it("should notify event listeners", (done) => {
        const emitter = new EventEmitter()
        emitter.addListener("event", () => {
            done()
        }).emit("event")
    })
    it("should give the correct value to listeners", (done) => {
        const emitter = new EventEmitter()
        emitter.addListener("event", (value) => {
            expect(value).to.be.equal("yes")
            done()
        }).emit("event", "yes")
    })
})