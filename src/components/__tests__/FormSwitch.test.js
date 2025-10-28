import  { mount } from "@vue/test-utils";
import FormSwitch from "../FormSwitch.vue";
import { describe, expect, test } from "vitest";

describe("FormSwitch", () => {
    test("emits update:modelValue when clicked", async () => {
        const wrapper = mount(FormSwitch, {
            props: {
                modelValue: false
            },
            // required so that the click event registers
            attachTo: document.body,
        });
        const input = wrapper.find("input");
        await input.trigger("click");
        expect (wrapper.emitted()).toHaveProperty("update:modelValue");
        expect (wrapper.emitted()["update:modelValue"]).toBeTruthy();
    })
})