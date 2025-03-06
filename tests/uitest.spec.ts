import { test, expect } from "@playwright/test";
import path from "path";

test("Radio button", async ({ page }) => {
  test.setTimeout(10000);
  await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

  // page.on("dialog", (dialog)=>{
  //     expect(dialog.message()).toBe("I am a JS Alert");
  //     dialog.accept();
  // });

  // await page.getByText("Click for JS Alert").click();

  // await expect(page.locator("#result")).toHaveText("You successfully clicked an alert");

  page.on("dialog", (dialog) => {
    console.log(dialog.type());
    if (dialog.type() == "confirm") {
      expect(dialog.message()).toBe("I am a JS Confirm");
      dialog.dismiss();
    } else if (dialog.type() == "prompt") {
        dialog.accept("Saksham Walia")
    }
  });
  await page.getByText("Click for JS Prompt").click();
  await expect(page.locator("#result")).toHaveText("You entered: Saksham Walia");
  await page.screenshot({path:`./Screenshots/sak.png`});

});
