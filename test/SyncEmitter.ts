import { expect } from "chai"
import { SyncEmitter } from "../src/events/SyncEmitter";

describe("Test SyncEmitter", () => {
    it("should emit events", () => {
        const emitter = new SyncEmitter()
        emitter.emit("event", {})
    })
    it("should notify event listeners", (done) => {
        const emitter = new SyncEmitter()
        emitter.on("event", () => {
            done()
        })
        emitter.emit("event", {})
    })
    it("should give the correct value to listeners", (done) => {
        const emitter = new SyncEmitter()
        emitter.on("event", (value) => {
            expect(value).to.be.equal("yes")
            done()
        })
        emitter.emit("event", "yes")
    })
    it("should notify event listeners twice", (done) => {
        const emitter = new SyncEmitter()
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
        const emitter = new SyncEmitter()
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
            const emitter = new SyncEmitter()
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
            const emitter = new SyncEmitter()
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
    it("events should arrive in order", (done) => {
        const emitter = new SyncEmitter()
        let messages = ["yes", "yo", "yowza", "test", "nice"]
        let messageIndex = 0
        emitter.on("event", (value) => {
            expect(value).to.be.equal(messages[messageIndex])
            messageIndex++
            if (messageIndex == messages.length) {
                done()
            }
        })
        messages.forEach(message => emitter.emit("event", message))
    })
})