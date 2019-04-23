import { expect } from "chai"
import { EventEmitter } from "../src/events/EventEmitter";

describe("Test EventEmitter", () => {
    it("should emit events", () => {
        const emitter = new EventEmitter()
        emitter.emit("event", {})
    })
    it("should notify event listeners", (done) => {
        const emitter = new EventEmitter()
        emitter.on("event", () => {
            done()
        })
        emitter.emit("event", {})
    })
    it("should give the correct value to listeners", (done) => {
        const emitter = new EventEmitter()
        emitter.on("event", (value) => {
            expect(value).to.be.equal("yes")
            done()
        })
        emitter.emit("event", "yes")
    })
    it("should notify event listeners twice", (done) => {
        const emitter = new EventEmitter()
        let event_emitted = 0
        emitter.on("event", () => {
            event_emitted++
            if (event_emitted == 2) {
                done()
            }
        })
        emitter.emit("event", {})
        emitter.emit("event", {})
    })
    it("should notify event listeners N times where 0 <= N < 100", (done) => {
        const n = Math.floor(Math.random() * 100)
        const emitter = new EventEmitter()
        let event_emitted = 0
        emitter.on("event", () => {
            event_emitted++
            if (event_emitted == n) {
                done()
            }
        })
        for (let i = 0; i < n; i++) {
            emitter.emit("event", {})
        }
    })
    it(
        "should notify event listeners that use .once() only once when two events are emitted",
        (done) => {
            const emitter = new EventEmitter()
            let event_emitted = 0
            emitter.once("event", () => {
                event_emitted++
                expect(event_emitted).to.be.lessThan(2)
            })
            emitter.emit("event", {})
            emitter.emit("event", {})
            setTimeout(() => {
                if (event_emitted == 1) {
                    done()
                }
            }, 10)
        })

    it(
        "should notify event listeners that use .once() only once when N < 100 events are emitted",
        (done) => {
            const n = Math.floor(Math.random() * 100)
            const emitter = new EventEmitter()
            let event_emitted = 0
            emitter.once("event", () => {
                event_emitted++
                expect(event_emitted).to.be.lessThan(2)
            })
            for (let i = 0; i < n; i++) {
                emitter.emit("event", {})
            }
            setTimeout(() => {
                if (event_emitted == 1) {
                    done()
                }
            }, 10)
        })
})