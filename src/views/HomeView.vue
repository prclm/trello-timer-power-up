<script setup lang="ts">
// eslint-disable-next-line no-undef
const t = TrelloPowerUp;
var GRAY_ICON =
  "https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg";

t.initialize({
  // "card-buttons": function (t, options) {
  //   return [
  //     {
  //       icon: "https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421",
  //       text: "Hello Nuxt.js",
  //       callback: function (t) {
  //         return t.popup({
  //           title: "Estimation",
  //           url: "estimate",
  //         });
  //       },
  //     },
  //   ];
  // },
  // "card-badges": function (t, options) {
  //   return t.get("card", "shared", "estimate").then(function (estimate) {
  //     return [
  //       {
  //         icon: estimate ? GREY_ROCKET_ICON : WHITE_ROCKET_ICON,
  //         text: estimate || "No Estimate!",
  //         color: estimate ? null : "red",
  //       },
  //     ];
  //   });
  // },
  "card-back-section": (t, options) => {
    return {
      title: "Timer",
      icon: GRAY_ICON,
      content: {
        type: "iframe",
        url: t.signUrl("./timer"),
        height: 10,
      },
      action: {
        // text: "Start Timer",
        // callback: (t) => {
        //   return t.popup({
        //     title: "Timer",
        //     url: "./timer",
        //     height: 230,
        //   });
        // },
      },
    };
  },
});
</script>

<template>
  <main>Home</main>
</template>
