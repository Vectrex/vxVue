import  { mount } from "@vue/test-utils";
import FormSwitch from "../FormSwitch.vue";
import { describe, expect, test } from "vitest";

describe("FormSwitch", () => {
    test("emits update:modelValue when clicked", async () => {
        const wrapper = mount(FormSwitch, { props: { modelValue: false }});
        await wrapper.find("input").trigger("change");
        expect(wrapper.emitted()).toHaveProperty("update:modelValue");
        expect(wrapper.emitted()["update:modelValue"][0]).toEqual([true]);
    })
})