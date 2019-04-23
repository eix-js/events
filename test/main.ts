import { test_func } from "../src/main"
import { expect } from "chai"

describe("Test function", () => {
    it("returns \"test\"", () => {
        expect(test_func()).to.be.equal("test")
    })
})