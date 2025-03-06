import { test, expect } from "@playwright/test";
import { log } from "console";

// write test
test("Create Post req testing using static body", async ({ request }) => {
  const postAPIResponse = await request.post(`/booking`, {
    data: {
      firstname: "Rock",
      lastname: "Y",
      totalprice: 1000,
      depositpaid: true,
      bookingdates: {
        checkin: "2018-01-01",
        checkout: "2019-01-01",
      },
      additionalneeds: "super bowls",
    },
  });

  const postAPIResponseBody = await postAPIResponse.json();
  log(postAPIResponseBody);

  // validate status code
  expect(postAPIResponse.ok).toBeTruthy();
  expect(postAPIResponse.status()).toBe(200);
  // validate json api response
  expect(postAPIResponseBody.booking).toHaveProperty("firstname","Rock")
  expect(postAPIResponseBody.booking).toHaveProperty("lastname","Y")
  // validate nested json objects
  expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkin","2018-01-01");
  expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkout","2019-01-01");

});

// create post api req
