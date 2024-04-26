<script setup>
    import Accordion from "../src/components/accordion.vue"
    import AccordionPanel from "../src/components/accordion-panel.vue"
    import { ref } from "vue"

    const accordionIndex = ref({ multiple: [1], single: 0 })
</script>

# Accordion and AccordionPanel

The accordion component requires the AccordionPanel component.

## Component With an Array as Active Index

If activeIndex is an array multiple panels can be open at the same time. In this example one of the panels has its `disabled` property set to true preventing it from being opened.
```html
<div class="space-y-1">
    <accordion v-model:active-index="accordionIndex.multiple">
        <accordion-panel>
            <template #header><strong>Header 1</strong></template>
            <div class="p-4 border-b-2 border-slate-300">
                <p>...</p>
            </div>
        </accordion-panel>
        <accordion-panel>
            <template #header><strong>Header 2</strong></template>
            <div class="p-4 border-b-2 border-slate-300">
                <p>...</p>
                <p>...</p>
            </div>
        </accordion-panel>
        <accordion-panel :disabled="true">
            <template #header>Header 3</template>
            <div class="p-4 border-b-2 border-slate-300">
                <p>...</p>
            </div>
        </accordion-panel>
        <accordion-panel>
            <template #header><strong>Header 4</strong></template>
            <div class="p-4 border-b-2 border-slate-300">
                <p>...</p>
            </div>
        </accordion-panel>
    </accordion>
</div>
```
::: info Result
<div class="space-y-1">
    <accordion v-model:active-index="accordionIndex.multiple">
        <accordion-panel>
            <template #header><strong>Header 1</strong></template>
            <div class="p-4 border-b-2 border-slate-300">
                <p>Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
            </div>
        </accordion-panel>
        <accordion-panel>
            <template #header><strong>Header 2</strong></template>
            <div class="p-4 border-b-2 border-slate-300">
                <p>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane.</p>
                <p>Pityful a rethoric question ran over her cheek, then she continued her way. On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word "and" and the Little Blind Text should turn around and return to its own, safe country. But nothing the copy said could convince her and so it didn’t take long until a few insidious Copy Writers ambushed her, made her drunk with Longe and Parole and dragged her into their agency, where they abused her for their projects again and again. And if she hasn’t been rewritten, then they are still using her.</p>
            </div>
        </accordion-panel>
        <accordion-panel :disabled="true">
            <template #header>Header 3</template>
            <div class="p-4 border-b-2 border-slate-300">
                <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
            </div>
        </accordion-panel>
        <accordion-panel>
            <template #header><strong>Header 4</strong></template>
            <div class="p-4 border-b-2 border-slate-300">
                <p>The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary. The languages only differ in their grammar, their pronunciation and their most common words. Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators. To achieve this, it would be necessary to have uniform grammar, pronunciation and more common words. If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual languages. The new common language will be more simple and regular than the existing European languages.</p>
            </div>
        </accordion-panel>
    </accordion>
</div>
:::

## Component With a Number as Active Index

If activeIndex is a single number only one panel can be open at the same time.
```html
<div class="space-y-1">
    <accordion v-model:active-index="accordionIndex.single">
        <accordion-panel>
            <template #header><strong>Header 1</strong></template>
            <div class="p-4 border-b-2 border-slate-300">
                <p>...</p>
            </div>
        </accordion-panel>
        <accordion-panel>
            <template #header><strong>Header 2</strong></template>
            <div class="p-4 border-b-2 border-slate-300">
                <p>...</p>
            </div>
        </accordion-panel>
        <accordion-panel>
            <template #header><strong>Header 3</strong></template>
            <div class="p-4 border-b-2 border-slate-300">
                <p>...</p>
            </div>
        </accordion-panel>
        <accordion-panel>
            <template #header><strong>Header 4</strong></template>
            <div class="p-4 border-b-2 border-slate-300">
                <p>...</p>
            </div>
        </accordion-panel>
    </accordion>
</div>
```
::: info Result
<div class="space-y-1">
    <accordion v-model:active-index="accordionIndex.single">
        <accordion-panel>
            <template #header><strong>Header 1</strong></template>
            <div class="p-4 border-b-2 border-slate-300">
                <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
            </div>
        </accordion-panel>
        <accordion-panel>
            <template #header><strong>Header 2</strong></template>
            <div class="p-4 border-b-2 border-slate-300">
                <p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen.</p>
            </div>
        </accordion-panel>
        <accordion-panel>
            <template #header><strong>Header 3</strong></template>
            <div class="p-4 border-b-2 border-slate-300">
                <p>She packed her seven versalia, put her initial into the belt and made herself on the way.</p>
            </div>
        </accordion-panel>
        <accordion-panel>
            <template #header><strong>Header 4</strong></template>
            <div class="p-4 border-b-2 border-slate-300">
                <p>When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then she continued her way. On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word "and" and the Little Blind Text should turn around and return to its own, safe country. But nothing the copy said could convince her and so it didn’t take long until a few insidious Copy Writers ambushed her, made her drunk with Longe and Parole and dragged her into their agency, where they abused her for their projects again and again. And if she hasn’t been rewritten, then they are still using her. Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
            </div>
        </accordion-panel>
    </accordion>
</div>
:::

## Properties of Accordion
| Name          | Type                 | Default | Description                                                                                                  |
|---------------|----------------------|---------|--------------------------------------------------------------------------------------------------------------|
| `activeIndex` | `Number`, `Number[]` |         | determines which panel is displayed; if activeIndex is an array several panels can be open at the same time  |

## Properties of AccordionPanel
| Name       | Type      | Default | Description                                                           |
|------------|-----------|---------|-----------------------------------------------------------------------|
| `show`     | `Boolean` |         | if true the panel is shown, hidden otherwise                          |
| `disabled` | `Boolean` |         | prevents panel from being shown and keydown events from being handled |

## Events of Accordion
| Name                  | Arguments                            | Description                              |
|-----------------------|--------------------------------------|------------------------------------------|
| `update:activeIndex`  | `index` - Number or array of numbers | Emitted when panels are opened or closed |

## Events of AccordionPanel
| Name      | Arguments | Description                                                                     |
|-----------|-----------|---------------------------------------------------------------------------------|
| `select`  |           | Emitted when toggle button in header is clicked, won't fire on a disabled panel |
| `keyup`   |           | Emitted when keyUp is pressed, won't fire on a disabled panel                   |
| `keydown` |           | Emitted when keyDown is pressed, won't fire on a disabled panel                 |

## Slots of AccordionPanel
| Name      | Scoped | Description                               |
|-----------|--------|-------------------------------------------|
| `default` |        | Content of panel                          |
| `header`  |        | Header text displayed along toggle button |

## Keys

Since the toggle elements are buttons they can be focussed.

| Key    | Action                                                                                                                  |
|--------|-------------------------------------------------------------------------------------------------------------------------|
| `down` | Go to next panel which is not disabled and toggle it, when reaching the last panel wrap around to the topmost panel     |
| `up`   | Go to previous panel which is not disabled and toggle it, when reaching the topmost panel wrap around to the last panel |
